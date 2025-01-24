import { BlobServiceClient } from "@azure/storage-blob";
import { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Method 체크
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // 요청에서 파일 경로 및 Blob 이름 받기
    const { pdfFilePath, blobName } = req.body;

    if (!pdfFilePath || !blobName) {
      return res.status(400).json({ error: "PDF file path and blob name are required" });
    }

    // Azure Storage 연결 설정
    const connectionString = process.env.AZURE_STORAGE_CONNECTION_STRING;
    if (!connectionString) {
      throw new Error("Azure Storage connection string is not set");
    }

    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionString);
    const containerClient = blobServiceClient.getContainerClient("your-container-name");

    // Blob 클라이언트 생성
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);

    // PDF 파일 스트림 열기
    if (!fs.existsSync(pdfFilePath)) {
      return res.status(404).json({ error: "PDF file not found" });
    }

    const pdfStream = fs.createReadStream(pdfFilePath);

    // Blob Storage로 업로드
    await blockBlobClient.uploadStream(pdfStream, undefined, undefined, {
      blobHTTPHeaders: { blobContentType: "application/pdf" },
    });

    res.status(200).json({ message: "PDF uploaded successfully", pdfUrl: blockBlobClient.url });
  } catch (error) {
    console.error("Error uploading PDF:", error);
    res.status(500).json({ error: "Failed to upload PDF", details: error});
  }
}
