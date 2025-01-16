import { NextRequest, NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET: Fetch a Q&A item by ID
export async function GET(req: NextRequest, context: { params: { qna_id: string } }) {
  const params = await context.params; // Await context.params
  const qnaId = parseInt(params.qna_id, 10);

  console.log("Received QNA ID:", params.qna_id, "Parsed ID:", qnaId);

  if (isNaN(qnaId)) {
    return NextResponse.json({ error: "Invalid Q&A ID" }, { status: 400 });
  }

  try {
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM qna WHERE qna_id = ?", [qnaId]);
    if (rows.length === 0) {
      return NextResponse.json({ error: "Q&A not found" }, { status: 404 });
    }
    return NextResponse.json({ qna: rows[0] });
  } catch (error) {
    console.error("Error fetching Q&A:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Submit an answer to a Q&A item
export async function POST(req: NextRequest, context: { params: { qna_id: string } }) {
  const params = await context.params; // Await context.params
  const qnaId = parseInt(params.qna_id, 10);

  console.log("Received QNA ID:", params.qna_id, "Parsed ID:", qnaId);

  if (isNaN(qnaId)) {
    return NextResponse.json({ error: "Invalid Q&A ID" }, { status: 400 });
  }

  try {
    const { answer } = await req.json();

    if (!answer || typeof answer !== "string") {
      return NextResponse.json({ error: "Invalid answer" }, { status: 400 });
    }

    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    if (!decodedToken.userAdmin) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    const [result] = await pool.query(
      `UPDATE qna 
       SET qna_answer = ?, qna_answ_date = NOW() 
       WHERE qna_id = ?`,
      [answer, qnaId]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Q&A not found or already answered" }, { status: 404 });
    }

    const [updatedRows] = await pool.query<RowDataPacket[]>("SELECT * FROM qna WHERE qna_id = ?", [qnaId]);
    return NextResponse.json({ qna: updatedRows[0] });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 });
  }
}
