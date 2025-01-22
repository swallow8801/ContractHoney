import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/app/lib/database"
import jwt from "jsonwebtoken"
import { BlobServiceClient } from "@azure/storage-blob"

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    const blobServiceClient = BlobServiceClient.fromConnectionString(process.env.AZURE_STORAGE_CONNECTION_STRING!)
    const containerClient = blobServiceClient.getContainerClient(process.env.AZURE_STORAGE_CONTAINER_NAME!)

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number }
    const userId = decoded.userId

    const formData = await request.formData()
    const file = formData.get("file") as File
    const fileName = formData.get("fileName") as string
    const fileType = formData.get("fileType") as string
    const contractId = formData.get("contractId") as string | null
    const version = formData.get("version") as string | null
    const newContractTitle = formData.get("newContractTitle") as string | null

    if (!file || !fileName || !fileType) {
      return NextResponse.json({ error: "Missing file information" }, { status: 400 })
    }

    let newVersion: number
    let newFileName: string
    let newContractId: number

    if (newContractTitle) {
      // New contract
      newVersion = 1
      newFileName = `${newContractTitle}_ver${newVersion}_user${userId}.${fileType}`

      const [result] = (await db.query(
        "INSERT INTO contract (user_id, con_title, con_type, con_updatetime, con_version) VALUES (?, ?, ?, NOW(), ?)",
        [userId, newContractTitle, fileType, newVersion],
      )) as [any[], any]
      newContractId = (result as any).insertId
    } else if (contractId && version) {
      // Existing contract
      const currentVersion = Number.parseInt(version, 10)
      newVersion = currentVersion + 1

      const [existingContract] = (await db.query(
        "SELECT con_title, con_type FROM contract WHERE con_id = ? AND user_id = ?",
        [Number.parseInt(contractId), userId],
      )) as [any[], any]

      if (!Array.isArray(existingContract) || existingContract.length === 0) {
        return NextResponse.json({ error: "Contract not found" }, { status: 404 })
      }

      const { con_title, con_type } = existingContract[0] as { con_title: string; con_type: string }

      newFileName = `${con_title}_ver${newVersion}_user${userId}.${fileType}`

      const [result] = (await db.query(
        "INSERT INTO contract (user_id, con_title, con_type, con_updatetime, con_version) VALUES (?, ?, ?, NOW(), ?)",
        [userId, con_title, con_type, newVersion],
      )) as [any[], any]
      newContractId = (result as any).insertId
    } else {
      return NextResponse.json({ error: "Invalid contract information" }, { status: 400 })
    }

    // Upload file to Azure Blob Storage
    const blobClient = containerClient.getBlockBlobClient(newFileName)
    const buffer = Buffer.from(await file.arrayBuffer())
    await blobClient.upload(buffer, buffer.length, {
      blobHTTPHeaders: { blobContentType: fileType },
    })

    console.log(`File ${newFileName} uploaded to Azure Blob Storage for user ${userId}`)

    // Insert file information into database
    ;(await db.query(
      "INSERT INTO contract_postfile (con_id, con_filetype, con_datetype, con_filename) VALUES (?, ?, NOW(), ?)",
      [newContractId, fileType, newFileName],
    )) as [any[], any]

    return NextResponse.json({ contractId: newContractId, version: newVersion })
  } catch (error) {
    console.error("Error uploading contract:", error)
    if (error instanceof Error) {
      console.error("Azure Storage Error:", error.message)
    }
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

