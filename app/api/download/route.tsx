import { NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { Readable } from "stream";
import { db } from "@/app/lib/database"; // DB 연결 가져오기
import dotenv from "dotenv";

// 환경 변수에서 Azure Blob 인증 정보 가져오기
dotenv.config();
const containerName = "archive"; 

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId"); // fileId로 DB에서 파일 URL을 조회

  if (!fileId) {
    return NextResponse.json({ error: "File ID is required." }, { status: 400 });
  }

  try {
    // DB에서 파일 URL 가져오기
    const fileUrl = await getFileUrlFromDB(fileId);
    if (!fileUrl) {
      return NextResponse.json({ error: "File not found in the database." }, { status: 404 });
    }

    // Azure Blob Storage 연결
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blobClient = containerClient.getBlobClient(fileUrl);

    // Blob 데이터 다운로드
    const downloadBlockBlobResponse = await blobClient.download();
    const readableStream = downloadBlockBlobResponse.readableStreamBody;

    if (!readableStream) {
      return NextResponse.json({ error: "File not found." }, { status: 404 });
    }

    // ReadableStream을 Node.js Readable로 변환
    const nodeReadableStream = Readable.from(readableStream);

    // Content-Type 설정
    const headers = new Headers();
    headers.set("Content-Type", downloadBlockBlobResponse.contentType || "application/octet-stream");

    // 한글 파일명 처리
    const fileName = fileUrl.split("/").pop() || "downloaded_file";
    const encodedFileName = encodeURIComponent(fileName);  // 파일명 인코딩

    headers.set("Content-Disposition", `attachment; filename*=UTF-8''${encodedFileName}`);

    // Response 객체 반환
    return new Response(nodeReadableStream as any, { headers });
  } catch (error) {
    console.error("Error downloading file:", error);
    return NextResponse.json({ error: "Error downloading file." }, { status: 500 });
  }
}

// DB에서 파일 URL을 조회하는 함수
async function getFileUrlFromDB(fileId: string) {
  try {
    const [rows] = await db.execute('SELECT ar_file_url FROM archive WHERE ar_id = ?', [fileId]);

    // MySQL2에서 반환하는 타입을 명시적으로 지정합니다.
    const row = rows as { ar_file_url: string }[];

    if (row.length > 0) {
      return row[0].ar_file_url; // 첫 번째 행에서 URL 가져오기
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error querying database:', error);
    throw new Error('Database query failed');
  }
}
