import { type NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/database";
import jwt from "jsonwebtoken";
import { BlobServiceClient } from "@azure/storage-blob";

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
    const fileType = formData.get("fileType") as string;
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

    const blobClient = containerClient.getBlockBlobClient(newFileName);
    const buffer = Buffer.from(await file.arrayBuffer());
    await blobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: fileType },
    });

    await db.execute(
      "INSERT INTO contract_postfile (con_id, con_filetype, con_datetype, con_filename) VALUES (?, ?, NOW(), ?)",
      [newContractId, fileType, newFileName],
    );

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
        // ✅ `contract_summary` 저장 (sum_article_number를 문자열로 저장)
        for (const summary of analysisData.summary_results) {
          await db.execute(
            "INSERT INTO contract_summary (con_id, sum_article_number, sum_article_title, sum_summary) VALUES (?, ?, ?, ?)",
            [newContractId, summary.article_number, summary.article_title, summary.summary],
          );
        }

        // ✅ `contract_iden` 저장 (`VARCHAR(20)` 컬럼 반영 & law_article_number에서 "Article" 제거)
        for (const iden of analysisData.indentification_results) {
          await db.execute(
            `INSERT INTO contract_iden 
             (con_id, iden_article_number, iden_clause_number, iden_subclause_number, iden_sentence, 
              iden_unfair, iden_unfair_percent, iden_toxic, iden_toxic_percent, 
              law_article_number, law_clause_number, law_subclause_number, law_explain) 
             VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,

            [
              newContractId,
              iden.contract_article_number || null,  // ✅ `VARCHAR(20)` 반영
              iden.contract_clause_number || null,
              iden.contract_subclause_number || null,
              iden.Sentence,
              iden.Unfair,
              parseFloat((iden.Unfair_percent * 100).toFixed(2)),  // ✅ 소수점 2자리 반올림
              iden.Toxic,
              parseFloat((iden.Toxic_percent * 100).toFixed(2)),  // ✅ 소수점 2자리 반올림
              iden.law_article_number
                ? iden.law_article_number.replace(/Article\s*/i, "").trim() || null
                : null, // ✅ "Article" 제거 후 저장
                iden.law_clause_number_law || null,
              iden.law_subclause_numbe_lawr || null,
              iden.explain,
            ],
          );
        }
      } catch (error) {
        console.error("🚨 DB 저장 중 오류 발생:", error);
      }
    }

    return NextResponse.json({
      contractId: newContractId,
      version: newVersion,
      analysisData,
    });

  } catch (error) {
    console.error("🚨 Error in upload-contract:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
