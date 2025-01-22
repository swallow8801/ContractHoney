import { type NextRequest, NextResponse } from "next/server"
import { db } from "@/app/lib/database"
import jwt from "jsonwebtoken"

export async function GET(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const token = request.headers.get("Authorization")?.split(" ")[1]

  if (!token) {
    return NextResponse.json({ error: "Authentication required" }, { status: 401 })
  }

  try {
    const { id } = await params
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number }
    const userId = decoded.userId

    // First get the contract title from the given contract id
    const [titleResult] = await db.query("SELECT con_title FROM contract WHERE con_id = ? AND user_id = ?", [
      id,
      userId,
    ])

    if ((titleResult as any[]).length === 0) {
      return NextResponse.json({ error: "Contract not found" }, { status: 404 })
    }

    const contractTitle = (titleResult as any[])[0].con_title

    // Get all versions of contracts with the same title
    const [contractRows] = await db.query(
      "SELECT * FROM contract WHERE con_title = ? AND user_id = ? ORDER BY con_version DESC",
      [contractTitle, userId],
    )

    if ((contractRows as any[]).length === 0) {
      return NextResponse.json({ error: "No versions found" }, { status: 404 })
    }

    const versions = await Promise.all(
      (contractRows as any[]).map(async (contract) => {
        // Get summaries for this version
        const [summaryRows] = await db.query("SELECT * FROM contract_summary WHERE con_id = ?", [contract.con_id])

        // Get identifications for this version
        const [idenRows] = await db.query("SELECT * FROM contract_iden WHERE con_id = ?", [contract.con_id])

        return {
          con_id: contract.con_id,
          con_version: contract.con_version,
          con_title: contract.con_title,
          con_updatetime: contract.con_updatetime,
          summaries: summaryRows,
          idens: idenRows,
        }
      }),
    )

    return NextResponse.json(versions)
  } catch (error) {
    console.error("Error fetching contract versions:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

