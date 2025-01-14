import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    const [rows] = await db.query(
      'SELECT * FROM contract WHERE con_id = ? AND user_id = ?',
      [params.id, userId]
    );

    if ((rows as any[]).length === 0) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching contract:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

