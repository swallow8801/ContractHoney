import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/database";
import jwt from "jsonwebtoken";
import { BlobServiceClient } from "@azure/storage-blob";

// CloudConvert 작업 상태를 주기적으로 확인하는 함수
async function checkCloudConvertJobStatus(jobId: string): Promise<any> {
  const response = await fetch(`https://api.cloudconvert.com/v2/jobs/${jobId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjYyZDc0NjZmMTAyMDIxZmQzNjZmNzc1ZWE3Nzc4YmM2OWU4YmMzN2FmMmU5YjliNThiNzQ3YmFiNGVjM2VhMTk0MDRlYThlNjBiOGVmOTMiLCJpYXQiOjE3Mzg2NDUyMjMuODMyNTY2LCJuYmYiOjE3Mzg2NDUyMjMuODMyNTY3LCJleHAiOjQ4OTQzMTg4MjMuODI4MDUyLCJzdWIiOiI3MDkzNDIxMSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSJdfQ.kpL6WjjS_V2n4K54NN5dd9xOSaMV5pQRscQ7lZHVozwynq4gYY20qZVnNBsLlb3BBOOR-RyAjIZOlNxvPQEi4UtPchdpchTWte3zrDk5PmXHCyPrzW5gJj-5EUXqheID5dnLvnHqOp8-w4w0zVO-MjWTF1Fyy-fIaiZpZ1UmHehQw3WXbXR12bfN3DlHcE5CN-17Z3tE0kn1nWnSI1QdbW5Fb9SGNp-CoAIcU1q4ct22DtV9bJU2g1lIEyly4kezXFls9ehi-w48GIKaYKFjg953i8uQQw1MOn5aD8M6MtdEbNjY8oo5L2a6zEdajnf9a5rPeCr4DywRsvbrD_BKrZxqE95zznp0ZvgTJzSr0yDdPO3Zs62Vdkj5UvuOPSWf4LsyV2pWsC16tElORuH1HoTW0z8brJY072zWLTGFZ601KQex-eEQHOttqbE3CrLCvfyrl90aI3Tyv_H60cDnzKwoxm0TN0IcpnnbYGHynWXnFa5sOPTKEK0MZPmWGIDSLr--yqKOF0JrqP2yANg_vzsm672vLzSMn2dVWcCotiniMXGpElshG0_KLkdQPw9xN4hY5nlsS1uYHvP7mflMVGZLUCQMqUoBsckKHG5kx4Y8qR4BXYNiY5oprp9LpOiKnIAYxoUfR6Od5jmByIg49Ob6YSZdq4OKGcY2zw2CG4E`,
    },
  });

  if (!response.ok) {
    console.error('🚨 CloudConvert 상태 조회 실패:', response.statusText);
    return null;
  }

  const data = await response.json();
  return data.data;
}

// 변환 후 파일 URL을 가져오는 함수
async function getFileUrlAfterConversion(jobId: string): Promise<string | null> {
  let jobStatusData = await checkCloudConvertJobStatus(jobId);

  // 작업 상태가 'finished'가 될 때까지 주기적으로 상태를 확인
  while (jobStatusData && jobStatusData.status !== 'finished') {
    console.log('🚀 작업 진행 중... 상태:', jobStatusData.status);
    await new Promise(resolve => setTimeout(resolve, 5000)); // 5초마다 상태 확인
    jobStatusData = await checkCloudConvertJobStatus(jobId);
  }

  if (jobStatusData && jobStatusData.status === 'finished') {
    const result = jobStatusData.tasks.find((task: any) => task.operation === 'export/url');
    if (result && result.result && result.result.files && result.result.files.length > 0) {
      return result.result.files[0].url;
    }
  }

  return null; // 파일 URL을 찾을 수 없는 경우
}

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME!);

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const fileName = formData.get("fileName") as string;
    const fileTypeRaw = formData.get("fileType") as string;
    const fileType = fileTypeRaw === "application/pdf" ? "pdf" : fileTypeRaw;
    const contractId = formData.get("contractId") as string | null;
    const version = formData.get("version") as string | null;
    const newContractTitle = formData.get("newContractTitle") as string | null;

    if (!file || !fileName || !fileType) {
      return NextResponse.json({ error: "Missing file information" }, { status: 400 });
    }

    let newVersion: number;
    let newFileName: string;
    let newContractId: number;

    if (newContractTitle) {
      newVersion = 1;
      newFileName = `${newContractTitle}_ver${newVersion}_user${userId}.${fileType}`;

      const [result] = await db.execute(
        "INSERT INTO contract (user_id, con_title, con_type, con_updatetime, con_version) VALUES (?, ?, ?, NOW(), ?)",
        [userId, newContractTitle, fileType, newVersion],
      );
      newContractId = (result as any).insertId;
    } else if (contractId && version) {
      const currentVersion = Number.parseInt(version, 10);
      newVersion = currentVersion + 1;

      const [existingContract] = await db.execute(
        "SELECT con_title, con_type FROM contract WHERE con_id = ? AND user_id = ?",
        [Number.parseInt(contractId), userId],
      );

      if (!Array.isArray(existingContract) || existingContract.length === 0) {
        return NextResponse.json({ error: "Contract not found" }, { status: 404 });
      }

      const { con_title, con_type } = (existingContract as any)[0];

      newFileName = `${con_title}_ver${newVersion}_user${userId}.${fileType}`;

      const [result] = await db.execute(
        "INSERT INTO contract (user_id, con_title, con_type, con_updatetime, con_version) VALUES (?, ?, ?, NOW(), ?)",
        [userId, con_title, con_type, newVersion],
      );
      newContractId = (result as any).insertId;
    } else {
      return NextResponse.json({ error: "Invalid contract information" }, { status: 400 });
    }

    const cloudConvertResponse = await fetch("https://api.cloudconvert.com/v2/jobs", {
      method: "POST",
      headers: {
        "Authorization": `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYjYyZDc0NjZmMTAyMDIxZmQzNjZmNzc1ZWE3Nzc4YmM2OWU4YmMzN2FmMmU5YjliNThiNzQ3YmFiNGVjM2VhMTk0MDRlYThlNjBiOGVmOTMiLCJpYXQiOjE3Mzg2NDUyMjMuODMyNTY2LCJuYmYiOjE3Mzg2NDUyMjMuODMyNTY3LCJleHAiOjQ4OTQzMTg4MjMuODI4MDUyLCJzdWIiOiI3MDkzNDIxMSIsInNjb3BlcyI6WyJ1c2VyLnJlYWQiLCJ1c2VyLndyaXRlIiwidGFzay5yZWFkIiwidGFzay53cml0ZSJdfQ.kpL6WjjS_V2n4K54NN5dd9xOSaMV5pQRscQ7lZHVozwynq4gYY20qZVnNBsLlb3BBOOR-RyAjIZOlNxvPQEi4UtPchdpchTWte3zrDk5PmXHCyPrzW5gJj-5EUXqheID5dnLvnHqOp8-w4w0zVO-MjWTF1Fyy-fIaiZpZ1UmHehQw3WXbXR12bfN3DlHcE5CN-17Z3tE0kn1nWnSI1QdbW5Fb9SGNp-CoAIcU1q4ct22DtV9bJU2g1lIEyly4kezXFls9ehi-w48GIKaYKFjg953i8uQQw1MOn5aD8M6MtdEbNjY8oo5L2a6zEdajnf9a5rPeCr4DywRsvbrD_BKrZxqE95zznp0ZvgTJzSr0yDdPO3Zs62Vdkj5UvuOPSWf4LsyV2pWsC16tElORuH1HoTW0z8brJY072zWLTGFZ601KQex-eEQHOttqbE3CrLCvfyrl90aI3Tyv_H60cDnzKwoxm0TN0IcpnnbYGHynWXnFa5sOPTKEK0MZPmWGIDSLr--yqKOF0JrqP2yANg_vzsm672vLzSMn2dVWcCotiniMXGpElshG0_KLkdQPw9xN4hY5nlsS1uYHvP7mflMVGZLUCQMqUoBsckKHG5kx4Y8qR4BXYNiY5oprp9LpOiKnIAYxoUfR6Od5jmByIg49Ob6YSZdq4OKGcY2zw2CG4E`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tasks: {
          "import-file": {
            operation: "import/upload",
            file: file.name,
          },
          "convert": {
            operation: "convert",
            input: "import-file",
            output_format: "pdf",
          },
          "export-pdf": {
            operation: "export/url",
            input: "convert",
          }
        }
      })
    });

    if (!cloudConvertResponse.ok) {
      console.error("🚨 CloudConvert API 요청 실패", cloudConvertResponse.statusText);
      return NextResponse.json({ error: "CloudConvert API 요청 실패" }, { status: 500 });
    }

    const cloudConvertData = await cloudConvertResponse.json();
    console.log(cloudConvertData); // 응답 내용 출력

    const task = cloudConvertData.data.tasks.find((task: any) => task.operation === 'import/upload');
    if (!task) {
      return NextResponse.json({ error: "CloudConvert에서 업로드 작업을 찾을 수 없음" }, { status: 500 });
    }
    
    const uploadUrl = task.result.form.url;
    const uploadParams = task.result.form.parameters;
    
    // CloudConvert에 파일 업로드
    const uploadFormData = new FormData();
    for (const key in uploadParams) {
      uploadFormData.append(key, uploadParams[key]);
    }
    uploadFormData.append("file", file);

    // 업로드 요청
    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      body: uploadFormData,
    });

    if (!uploadResponse.ok) {
      console.error("🚨 CloudConvert 파일 업로드 실패", uploadResponse.statusText);
      return NextResponse.json({ error: "CloudConvert 파일 업로드 실패" }, { status: 500 });
    }

    // 결과에서 files 배열이 존재하는지 확인
    const pdfDownloadUrl = await getFileUrlAfterConversion(cloudConvertData.data.id);
    if (!pdfDownloadUrl) {
      console.error("파일 URL을 가져오는 데 실패했습니다.");
      return NextResponse.json({ error: "파일 URL을 가져오는 데 실패했습니다." }, { status: 500 });
    }

    console.log("PDF 다운로드 URL:", pdfDownloadUrl);
    
    // 이후 Azure Blob Storage에 업로드할 Blob 클라이언트 생성
    const blobClient = containerClient.getBlockBlobClient(newFileName);
    
    // 변환된 PDF 파일을 다운로드
    const response = await fetch(pdfDownloadUrl);
    if (!response.ok) {
      console.error("🚨 PDF 파일 다운로드 실패", response.statusText);
      return NextResponse.json({ error: "PDF 파일 다운로드 실패" }, { status: 500 });
    }

    // 파일을 ArrayBuffer로 변환하여 Blob에 업로드
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await blobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: "application/pdf" },
    });

    // Blob 업로드 완료 후 응답 처리
    console.log(`🚀 Blob Storage에 ${newFileName} 업로드 완료`);

    const fastApiResponse = await fetch("http://20.39.191.235/api/upload/", {
      method: "POST",
      body: formData,
    });

    let analysisData = null;
    if (fastApiResponse.ok) {
      analysisData = await fastApiResponse.json();
    } else {
      console.error("🚨 FastAPI 호출 실패:", fastApiResponse.status);
    }

    if (analysisData) {
      try {
        for (const summary of analysisData.summary_results) {
          await db.execute(
            "INSERT INTO contract_summary (con_id, sum_article_number, sum_article_title, sum_summary) VALUES (?, ?, ?, ?)",
            [newContractId, summary.article_number, summary.article_title, summary.summary],
          );
        }

        for (const iden of analysisData.indentification_results) {
          await db.execute(
            `INSERT INTO contract_iden 
             (con_id, iden_article_number, iden_clause_number, iden_subclause_number, iden_sentence, 
              iden_unfair, iden_unfair_percent, iden_toxic, iden_toxic_percent, 
              law_article_number, law_title, law_section_number, law_is_public) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              newContractId, iden.article_number, iden.clause_number, iden.subclause_number, iden.sentence,
              iden.unfair, iden.unfair_percent, iden.toxic, iden.toxic_percent,
              iden.law_article_number, iden.law_title, iden.law_section_number, iden.law_is_public,
            ],
          );
        }

        return NextResponse.json({ message: "파일 처리 및 분석 완료" });
      } catch (error) {
        console.error("🚨 분석 결과 DB 저장 실패:", error);
        return NextResponse.json({ error: "분석 결과 DB 저장 실패" }, { status: 500 });
      }
    }
  } catch (error) {
    console.error("🚨 서버 오류:", error);
    return NextResponse.json({ error: "서버 오류" }, { status: 500 });
  }
}
