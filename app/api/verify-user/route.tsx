import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';

export async function POST(request: NextRequest) {
  const { email, name, phone } = await request.json();

  try {
    const [rows]: [any[], any] = await db.query(
      'SELECT * FROM user WHERE user_email = ? AND user_name = ? AND user_phone = ?',
      [email, name, phone]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: '사용자 정보가 일치하지 않습니다.' }, { status: 400 });
    }

    return NextResponse.json({ message: '사용자 정보가 확인되었습니다.' });
  } catch (error) {
    console.error('사용자 정보 확인 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

