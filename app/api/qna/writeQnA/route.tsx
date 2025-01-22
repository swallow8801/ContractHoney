import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

interface CustomJwtPayload extends JwtPayload {
  userId: string;
}

export async function POST(req: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 가져오기
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.replace('Bearer ', '');

    // JWT 디코드 및 검증
    let decoded: CustomJwtPayload;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as CustomJwtPayload;
    } catch (err) {
      console.error('Invalid token:', err);
      return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
    }

    const userId = decoded.userId;
    if (!userId) {
      return NextResponse.json({ error: 'Invalid Token Payload' }, { status: 401 });
    }

    // 요청 본문에서 데이터 추출
    const { title, content } = await req.json();

    const now = new Date();
    const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const qna_date = kstTime.toISOString().slice(0, 19).replace('T', ' ');

    if (!title || !content) {
      return NextResponse.json({ error: '모든 필드를 입력하세요.' }, { status: 400 });
    }

    // 데이터베이스에 Q&A 삽입
    const [result] = await pool.query(
      'INSERT INTO qna (user_id, qna_title, qna_content, qna_cont_date, qna_answer, qna_answ_date) VALUES (?, ?, ?, ?, NULL, NULL)',
      [userId, title, content, qna_date]
    );

    const insertId = (result as mysql.ResultSetHeader).insertId;

    return NextResponse.json({ message: 'Q&A가 성공적으로 등록되었습니다.', insertId });
  } catch (error) {
    console.error('Error processing Q&A:', error);
    return NextResponse.json({ error: '서버 오류로 Q&A 등록에 실패했습니다.' }, { status: 500 });
  }
}
