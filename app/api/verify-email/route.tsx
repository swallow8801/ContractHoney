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

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  
  if (!token) {
    return NextResponse.json({ error: '유효하지 않은 요청입니다.' }, { status: 400 });
  }

  try {
    // JWT_SECRET_KEY가 잘 로드되었는지 확인
    if (!process.env.JWT_SECRET_KEY) {
      console.error('JWT_SECRET_KEY가 환경 변수에 없습니다.');
      return NextResponse.json({ error: '서버 설정 오류' }, { status: 500 });
    }

    // 토큰 검증
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET_KEY!);

    // 이메일 추출
    const userEmail = decoded.email;

    // 사용자 인증 상태 업데이트
    const [result]: [any[], any] = await pool.query(
      'UPDATE user SET is_verified = 1 WHERE user_email = ?',
      [userEmail]
    );


    return NextResponse.json({ message: '이메일 인증이 완료되었습니다!' });
  } catch (error) {
    console.error('인증 오류:', error);
    return NextResponse.json(
      { error: '유효하지 않거나 만료된 토큰입니다.' },
      { status: 400 }
    );
  }
}
