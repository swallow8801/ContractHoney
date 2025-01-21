// lib/azureBlobClient.ts
import { BlobServiceClient, StorageSharedKeyCredential } from "@azure/storage-blob";

// 환경 변수에서 정보를 불러옵니다.
const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME!;
const accountKey = process.env.AZURE_STORAGE_ACCOUNT_KEY!;
const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME!;

// Azure Storage 클라이언트 설정
const credentials = new StorageSharedKeyCredential(accountName, accountKey);
const blobServiceClient = new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, credentials);
const containerClient = blobServiceClient.getContainerClient(containerName);

export { containerClient };
