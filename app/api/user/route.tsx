import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { db } from '@/app/lib/database';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    // Fetch user data from database
    const [rows] = await db.query(
      'SELECT user_id, user_name, user_email, user_phone FROM user WHERE user_id = ?',
      [userId]
    );

    if ((rows as any[]).length === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const user = (rows as any[])[0];

    return NextResponse.json({
      userId: user.user_id,
      userName: user.user_name,
      userEmail: user.user_email,
      userPhone: user.user_phone
    });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

