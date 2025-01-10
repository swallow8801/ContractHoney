import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise'; // MySQL2 라이브러리 사용
import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

// MySQL 연결 설정
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// POST 요청 처리
export async function POST(request: NextRequest) {
  const { user_name, user_email, user_phone, user_password }: { user_name: string; user_email: string; user_phone: string; user_password: string } = await request.json();

  try {
    // 사용자 이메일 중복 확인
    const [rows]: [any[], any] = await pool.query('SELECT * FROM user WHERE user_email = ?', [user_email]);
    if (rows.length > 0) {
      return NextResponse.json({ error: '이미 존재하는 이메일입니다.' }, { status: 400 });
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // 사용자 데이터 삽입
    await pool.query('INSERT INTO user (user_name, user_email, user_phone, user_password) VALUES (?, ?, ?, ?)', [user_name, user_email, user_phone, hashedPassword]);

    return NextResponse.json({ message: '회원가입 성공!' });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
