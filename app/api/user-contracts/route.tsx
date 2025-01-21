import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    const [rows] = await db.query(
      'SELECT con_id as id, con_title as title, con_version as version FROM contract WHERE user_id = ? ORDER BY con_updatetime DESC',
      [userId]
    );

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching user contracts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

