import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const notice_title = formData.get('notice_title') as string;
    const notice_content = formData.get('notice_content') as string;

    const now = new Date();
    const kstTime = new Date(now.getTime() + 9 * 60 * 60 * 1000);
    const notice_date = kstTime.toISOString().slice(0, 19).replace('T', ' ');

    const query = `
      INSERT INTO notice (notice_title, notice_content, notice_date) 
      VALUES (?, ?, ?)
    `;
    const [result] = await pool.query(query, [notice_title, notice_content, notice_date]);

    return NextResponse.json({ message: '공지사항 등록 성공!', id: (result as any).insertId });
  } catch (error) {
    console.error('Error saving notice:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}
