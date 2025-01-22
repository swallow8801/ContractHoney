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
  const { email }: { email: string } = await request.json();

  try {
    const [rows]: [any[], any] = await pool.query(
      'SELECT is_verified FROM user WHERE user_email = ?',
      [email]
    );

    if (rows.length === 0) {
      return NextResponse.json(
        { error: '사용자를 찾을 수 없습니다.' },
        { status: 404 }
      );
    }

    const { is_verified } = rows[0];
    return NextResponse.json({ is_verified });
  } catch (error) {
    console.error('인증 상태 확인 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
