import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';

export async function POST(request: NextRequest) {
  const { email } = await request.json();

  try {
    const [rows]: [any[], any] = await db.query('SELECT * FROM user WHERE user_email = ?', [email]);

    if (rows.length > 0) {
      return NextResponse.json({ available: false });
    } else {
      return NextResponse.json({ available: true });
    }
  } catch (error) {
    console.error('이메일 확인 오류:', error);
    return NextResponse.json({ error: '서버 오류' }, { status: 500 });
  }
}

