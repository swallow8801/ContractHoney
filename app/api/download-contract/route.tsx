import { type NextRequest, NextResponse } from "next/server";
import { BlobServiceClient } from "@azure/storage-blob";
import { db } from "@/app/lib/database";

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const contractId = url.searchParams.get("contractId");

    if (!contractId) {
      return NextResponse.json({ error: "Contract ID is required" }, { status: 400 });
    }

    // Fetch file information from database
    const [contractFile] = (await db.query(
      "SELECT con_filename FROM contract_postfile WHERE con_id = ?",
      [Number.parseInt(contractId)]
    )) as [any[], any];

    if (!Array.isArray(contractFile) || contractFile.length === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const { con_filename } = contractFile[0];

    // Generate public URL
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!);
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME!);
    const blobClient = containerClient.getBlobClient(con_filename);

    const publicUrl = blobClient.url;
    console.log("Generated Public URL:", publicUrl);

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error("Error generating public URL:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
