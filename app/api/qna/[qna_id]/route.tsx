import { NextRequest, NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// MySQL 연결 풀 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// GET: Fetch a Q&A item by ID
export async function GET(req: NextRequest) {
  // 경로에서 qna_id 추출
  const qnaId = parseInt(req.nextUrl.pathname.split("/").pop() as string, 10);

  console.log("Received QNA ID:", req.nextUrl.pathname, "Parsed ID:", qnaId);

  // qna_id가 유효한지 체크
  if (isNaN(qnaId)) {
    return NextResponse.json({ error: "Invalid Q&A ID" }, { status: 400 });
  }

  try {
    // Q&A 항목을 데이터베이스에서 조회
    const [rows] = await pool.query<RowDataPacket[]>("SELECT * FROM qna WHERE qna_id = ?", [qnaId]);

    // Q&A 항목이 없으면 404 반환
    if (rows.length === 0) {
      return NextResponse.json({ error: "Q&A not found" }, { status: 404 });
    }

    // Q&A 항목 반환
    return NextResponse.json({ qna: rows[0] });
  } catch (error) {
    console.error("Error fetching Q&A:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// POST: Submit an answer to a Q&A item
export async function POST(req: NextRequest) {
  const qnaId = parseInt(req.nextUrl.pathname.split("/").pop() as string, 10);

  console.log("Received QNA ID:", req.nextUrl.pathname, "Parsed ID:", qnaId);

  // qna_id가 유효한지 체크
  if (isNaN(qnaId)) {
    return NextResponse.json({ error: "Invalid Q&A ID" }, { status: 400 });
  }

  try {
    // 요청 본문에서 답변 데이터 가져오기
    const { answer } = await req.json();

    // 답변이 없거나 유효하지 않으면 400 반환
    if (!answer || typeof answer !== "string") {
      return NextResponse.json({ error: "Invalid answer" }, { status: 400 });
    }

    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.get("authorization");
    const token = authHeader?.replace("Bearer ", "");

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // JWT 토큰을 검증
    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    // 사용자 권한 확인
    if (!decodedToken.userAdmin) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }

    // 답변을 데이터베이스에 업데이트
    const now = new Date();
    const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const answer_date = kstTime.toISOString().slice(0, 19).replace('T', ' ');

    console.log("answer_date:", answer_date);

    const [result] = await pool.query(
      `UPDATE qna 
       SET qna_answer = ?, qna_answ_date = ? 
       WHERE qna_id = ?`,
      [answer, answer_date, qnaId]
    );

    // 업데이트된 행이 없으면 404 반환
    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: "Q&A not found or already answered" }, { status: 404 });
    }

    // 업데이트된 Q&A 항목 조회
    const [updatedRows] = await pool.query<RowDataPacket[]>("SELECT * FROM qna WHERE qna_id = ?", [qnaId]);

    // 업데이트된 Q&A 항목 반환
    return NextResponse.json({ qna: updatedRows[0] });
  } catch (error) {
    console.error("Error submitting answer:", error);
    return NextResponse.json({ error: "Failed to submit answer" }, { status: 500 });
  }
}
