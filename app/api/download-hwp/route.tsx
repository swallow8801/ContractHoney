import { BlobServiceClient } from "@azure/storage-blob";
import { NextApiRequest, NextApiResponse } from "next";
import path from "path";
import fs from "fs";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    const containerClient = blobServiceClient.getContainerClient("your-container-name");

    // 다운로드할 Blob의 이름 (Blob 이름은 스토리지에 저장된 이름 그대로 사용)
    const blobName = req.query.fileName as string;
    const blobClient = containerClient.getBlobClient(blobName);

    // Blob 파일을 스트림으로 다운로드
    const downloadResponse = await blobClient.download(0);
    const downloadedContent = await streamToBuffer(downloadResponse.readableStreamBody!);

    // 로컬에 파일 저장 (저장 경로 설정)
    const localFilePath = path.join("C:\\path\\to\\downloads", blobName);
    fs.writeFileSync(localFilePath, downloadedContent);

    res.status(200).json({ message: "File downloaded successfully", filePath: localFilePath, fileName: blobName });
  } catch (error) {
    console.error("Error downloading file:", error);
    res.status(500).json({ error: "Failed to download file" });
  }
}

// Helper function: Converts a readable stream to a buffer
async function streamToBuffer(readableStream: NodeJS.ReadableStream) {
  const chunks: Buffer[] = [];
  for await (const chunk of readableStream) {
    chunks.push(Buffer.from(chunk));
  }
  return Buffer.concat(chunks);
}
