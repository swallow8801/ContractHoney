import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(req: NextRequest) {
  try {
    const { qnaId, answer } = await req.json();

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

    return NextResponse.json({ message: "Answer submitted successfully" });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 });
  }
}
