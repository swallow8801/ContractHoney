import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get('authorization');
    const token = authHeader?.replace('Bearer ', '');

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userAdmin = decodedToken.userAdmin;
    const userId = decodedToken.userId;

    let rows;

    if (userAdmin === 1) {
      // 관리자: 모든 Q&A 데이터 가져오기
      [rows] = await pool.query(`
        SELECT 
          q.qna_id,
          q.qna_title,
          q.qna_cont_date,
          q.qna_answer,
          q.qna_answ_date,
          u.user_name 
        FROM qna q
        JOIN user u ON q.user_id = u.user_id
        ORDER BY q.qna_cont_date DESC
      `);
    } else {
      // 일반 사용자: 자신의 Q&A 데이터만 가져오기
      [rows] = await pool.query(`
        SELECT 
          qna_id,
          qna_title,
          qna_cont_date,
          qna_answer,
          qna_answ_date
        FROM qna
        WHERE user_id = ?
        ORDER BY qna_cont_date DESC
      `, [userId]);
    }

    return NextResponse.json({ isAdmin: userAdmin === 1, data: rows });
  } catch (error) {
    console.error('Error fetching Q&A data:', error);
    return NextResponse.json({ error: 'Failed to fetch Q&A data' }, { status: 500 });
  }
}
