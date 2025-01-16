import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
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

export async function POST(request: NextRequest) {
  // 이메일 중복 확인 처리
  const { email } = await request.json(); // 클라이언트에서 보낸 이메일을 요청 본문에서 가져옴

  if (!email) {
    return NextResponse.json({ error: '이메일이 제공되지 않았습니다.' }, { status: 400 });
  }

  try {
    const [rows]: [any[], any] = await pool.query(
      'SELECT COUNT(*) as count FROM user WHERE user_email = ?',
      [email]
    );

    if (rows[0].count > 0) {
      return NextResponse.json({ available: false }); // 이미 사용 중인 이메일
    }

    return NextResponse.json({ available: true }); // 사용 가능한 이메일
  } catch (error) {
    console.error('이메일 확인 오류:', error);
    return NextResponse.json({ error: '서버 오류가 발생했습니다.' }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  // 이메일 인증 처리
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return NextResponse.json({ error: '유효하지 않은 요청입니다.' }, { status: 400 });
  }

  try {
    if (!process.env.JWT_SECRET_KEY) {
      console.error('JWT_SECRET_KEY가 환경 변수에 없습니다.');
      return NextResponse.json({ error: '서버 설정 오류' }, { status: 500 });
    }

    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userEmail = decoded.email;

    const [result]: [any[], any] = await pool.query(
      'UPDATE user SET is_verified = 1 WHERE user_email = ?',
      [userEmail]
    );

    return NextResponse.json({ message: '이메일 인증이 완료되었습니다!' });
  } catch (error) {
    console.error('인증 오류:', error);
    return NextResponse.json({ error: '유효하지 않거나 만료된 토큰입니다.' }, { status: 400 });
  }
}
