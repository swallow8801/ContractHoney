import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function POST(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    const body = await request.json();
    const currentPassword = body.currentPassword;

    const [user] = await db.query('SELECT user_password FROM user WHERE user_id = ?', [userId]);
    const isPasswordValid = await bcrypt.compare(currentPassword, (user as any)[0].user_password);

    if (isPasswordValid) {
      return NextResponse.json({ message: '현재 비밀번호가 확인되었습니다.' });
    } else {
      return NextResponse.json({ error: '현재 비밀번호가 일치하지 않습니다.' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error checking password:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

