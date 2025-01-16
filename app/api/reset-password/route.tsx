import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const { email, newPassword } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const [result] = await db.query(
      'UPDATE user SET user_password = ? WHERE user_email = ?',
      [hashedPassword, email]
    );

    if ((result as any).affectedRows === 0) {
      return NextResponse.json({ error: '비밀번호 변경에 실패했습니다.' }, { status: 400 });
    }

    return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
  } catch (error) {
    console.error('비밀번호 변경 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

