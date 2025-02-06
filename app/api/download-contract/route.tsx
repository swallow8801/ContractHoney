import { type NextRequest } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { db } from "@/app/lib/database";
import { Readable } from "stream";

const streamToBuffer = async (stream: NodeJS.ReadableStream): Promise<Buffer> => {
  const chunks: Buffer[] = [];
  for await (const chunk of stream) {
    chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
};

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const contractId = url.searchParams.get("contractId");

    if (!contractId) {
      return new Response(JSON.stringify({ error: "Contract ID is required" }), { status: 400 });
    }

    // 데이터베이스에서 파일명 가져오기
    const [contractFile] = (await db.query(
      "SELECT con_filename FROM contract_postfile WHERE con_id = ?",
      [Number.parseInt(contractId)]
    )) as [any[], any];

    if (!Array.isArray(contractFile) || contractFile.length === 0) {
      return new Response(JSON.stringify({ error: "File not found" }), { status: 404 });
    }

    const { con_filename } = contractFile[0];

    // Azure Blob Storage 연결
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    const containerClient = blobServiceClient.getContainerClient("contract"); // 컨테이너 명
    const blobClient = containerClient.getBlobClient(con_filename);

    // Blob 파일 다운로드
    const downloadBlockBlobResponse = await blobClient.download();
    const readableStream = downloadBlockBlobResponse.readableStreamBody; // Node.js ReadableStream

    if (!readableStream) {
      return new Response(JSON.stringify({ error: "Failed to download file" }), { status: 500 });
    }

    // Node.js ReadableStream을 Buffer로 변환
    const fileBuffer = await streamToBuffer(readableStream);

    // 파일 응답 반환 (자동 다운로드)
    return new Response(fileBuffer, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Disposition": `attachment; filename="${con_filename}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading file:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), { status: 500 });
  }
}
