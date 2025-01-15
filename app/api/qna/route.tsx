import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// MySQL 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

function getErrorMessage(err: unknown): string {
  if (err instanceof Error) {
    return err.message;
  }
  return String(err);
}

export async function GET(req: NextRequest) {
  try {
    // Authorization 헤더에서 토큰 가져오기
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      console.error('Token not provided');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // JWT 토큰 검증 및 디코딩
    let decodedToken: any;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
      console.log('Decoded Token:', decodedToken);
    } catch (err) {
      console.error('Invalid token:', getErrorMessage(err));
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const userId = decodedToken.userId;
    console.log('Decoded userId:', userId);

    // 데이터베이스에서 Q&A 데이터 가져오기
    let rows: any[] = [];
    try {
      const [result]: [any[], any] = await pool.query(
        `
        SELECT 
          qna_id,
          qna_title,
          qna_cont_date,
          qna_answer,
          qna_answ_date
        FROM qna
        WHERE user_id = ?
        `,
        [userId]
      );
      rows = result;
      console.log('Fetched Q&A Rows:', rows);
    } catch (dbError) {
      console.error('Database query error:', getErrorMessage(dbError));
      return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }

    // 데이터 반환
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching Q&A:', getErrorMessage(error));
    return NextResponse.json({ error: 'Failed to fetch Q&A' }, { status: 500 });
  }
}
