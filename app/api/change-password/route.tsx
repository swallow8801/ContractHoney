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

// PUT 요청 처리
export async function PUT(request: NextRequest) {
  const { currentPassword, newPassword }: { currentPassword: string; newPassword: string } = await request.json();

  try {
    // JWT 토큰에서 사용자 ID 추출
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json({ error: '인증 정보가 없습니다.' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY!);
    const userId = (decodedToken as { userId: number }).userId;

    console.log('Decoded Token User ID:', userId);

    // 사용자 정보 조회
    const [rows]: [any[], any] = await pool.query('SELECT * FROM user WHERE user_id = ?', [userId]);

    if (rows.length === 0) {
      return NextResponse.json({ error: '사용자를 찾을 수 없습니다.' }, { status: 404 });
    }

    const user = rows[0];
    const isPasswordMatch = await bcrypt.compare(currentPassword, user.user_password);

    // 현재 비밀번호가 일치하지 않을 경우
    if (!isPasswordMatch) {
      return NextResponse.json({ error: '현재 비밀번호가 일치하지 않습니다.' }, { status: 400 });
    }

    // 새로운 비밀번호 암호화 및 업데이트
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await pool.query(
      'UPDATE user SET user_password = ? WHERE user_id = ?',
      [hashedNewPassword, userId]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: '비밀번호 변경에 실패했습니다.' }, { status: 500 });
    }

    return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (error) {
    console.error('비밀번호 변경 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}
