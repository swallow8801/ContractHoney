import { NextRequest, NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise"; // RowDataPacket 추가
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userId = decodedToken.userId;

    const { qnaId } = await req.json();

    // Check if the user is the owner of the Q&A
    const [rows] = await pool.query<RowDataPacket[]>(
      `SELECT * FROM qna WHERE qna_id = ? AND user_id = ?`,
      [qnaId, userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // Delete the Q&A
    await pool.query(`DELETE FROM qna WHERE qna_id = ? AND user_id = ?`, [qnaId, userId]);

    return NextResponse.json({ message: "Q&A deleted successfully" });
  } catch (error) {
    console.error("Error deleting Q&A:", error);
    return NextResponse.json({ error: "Failed to delete Q&A" }, { status: 500 });
  }
}
