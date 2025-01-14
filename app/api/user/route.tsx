import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'No token provided' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number, userEmail: string };
    return NextResponse.json({ userId: decoded.userId, userEmail: decoded.userEmail });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
  }
}

