import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

export async function GET() {
  try {
    // 데이터베이스 연결
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    // 최신 공지사항 3개 가져오기
    const [rows] = await connection.query(`
      SELECT 
        bp.post_id, 
        bp.post_title, 
        u.user_name AS author, 
        bp.post_datetime 
      FROM board_post bp
      JOIN User u ON bp.user_id = u.user_id
      ORDER BY bp.post_datetime DESC 
      LIMIT 3
    `);

    // 데이터 반환
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching recent notices:', error);
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}
