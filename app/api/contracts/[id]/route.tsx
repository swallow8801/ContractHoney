import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

export async function GET(request: NextRequest) {
  // URL에서 id 추출 (params로 전달된 id)
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ error: 'Contract ID is required' }, { status: 400 });
  }

  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    // SQL 쿼리에서 id와 userId를 사용하여 계약 정보 조회
    const [rows] = await db.query<RowDataPacket[]>(
      'SELECT * FROM contract WHERE con_id = ? AND user_id = ?',
      [id, userId]
    );

    if (rows.length === 0) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    return NextResponse.json(rows[0]);
  } catch (error) {
    console.error('Error fetching contract:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
