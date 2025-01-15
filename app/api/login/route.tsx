import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';

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
  const { user_email, user_password }: { user_email: string; user_password: string } = await request.json();
  console.log('입력된 이메일:', user_email);

  try {
    // 데이터베이스에서 사용자 정보 가져오기
    const [rows]: [any[], any] = await pool.query('SELECT * FROM user WHERE user_email = ?', [user_email]);

    if (rows.length === 0) {
      console.log('사용자가 존재하지 않습니다.');
      return NextResponse.json({ error: '이메일이 존재하지 않습니다.' }, { status: 401 });
    }

    const user = rows[0]; // 사용자 데이터
    console.log('사용자 데이터:', user);

    // 비밀번호 확인
    const stored_password: string = user.user_password; // 암호화된 비밀번호
    const passwordMatch = await bcrypt.compare(user_password, stored_password);

    if (!passwordMatch) {
      return NextResponse.json({ error: '비밀번호가 일치하지 않습니다.' }, { status: 401 });
    }

    // JWT 토큰 생성 (유효기간은 1시간)
    const token = jwt.sign(
      { userId: user.user_id, userEmail: user.user_email, userAdmin: user.user_admin },
      process.env.JWT_SECRET_KEY!,
      { expiresIn: '1h' }
    );

    // 로그인 성공 시 토큰을 반환
    return NextResponse.json({ message: '로그인 성공!', token, userAdmin: user.user_admin });

  } catch (error) {
    console.error('로그인 중 오류 발생:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

