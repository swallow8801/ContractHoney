import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
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

// Nodemailer 설정
const transporter = nodemailer.createTransport({
  service: 'Gmail', // 다른 SMTP 서버를 사용하려면 설정 변경
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(request: NextRequest) {
  const {
    user_name,
    user_email,
    user_phone,
    user_password,
  }: {
    user_name: string;
    user_email: string;
    user_phone: string;
    user_password: string;
  } = await request.json();

  try {
    // 사용자 이메일 중복 확인
    const [rows]: [any[], any] = await pool.query(
      'SELECT * FROM user WHERE user_email = ?',
      [user_email]
    );
    if (rows.length > 0) {
      return NextResponse.json(
        { error: '이미 존재하는 이메일입니다.' },
        { status: 400 }
      );
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(user_password, 10);

    // 사용자 데이터 삽입 (is_verified는 기본값 false)
    await pool.query(
      'INSERT INTO user (user_name, user_email, user_phone, user_password, user_admin, is_verified) VALUES (?, ?, ?, ?, 0, 0)',
      [user_name, user_email, user_phone, hashedPassword]
    );

    // 인증 토큰 생성 (JWT)
    const token = jwt.sign({ email: user_email }, process.env.JWT_SECRET_KEY!, {
      expiresIn: '1h', // 토큰 유효기간 1시간
    });

    // 이메일 인증 URL
    const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

    // 인증 이메일 전송
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user_email,
      subject: '이메일 인증 요청',
      html: `
        <p>${user_name}님, 회원가입을 축하드립니다!</p>
        <p>아래 버튼을 클릭하여 이메일 인증을 완료해주세요:</p>
        <a href="${verifyUrl}" style="display:inline-block;padding:10px 20px;margin:20px 0;background-color:#007bff;color:#fff;text-decoration:none;">이메일 인증</a>
        <p>이 링크는 1시간 동안 유효합니다.</p>
      `,
    };
    await transporter.sendMail(mailOptions);

    return NextResponse.json({
      message: '회원가입 성공! 인증 이메일을 확인하세요.',
    });
  } catch (error) {
    console.error('회원가입 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
