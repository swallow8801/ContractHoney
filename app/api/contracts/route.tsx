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

    const [rows] = await db.query(`
      SELECT 
        c.*,
        (SELECT COUNT(*) FROM contract_iden ci WHERE ci.con_id = c.con_id AND ci.iden_unfair = 1) as unfair_count,
        (SELECT COUNT(*) FROM contract_iden ci WHERE ci.con_id = c.con_id AND ci.iden_toxic = 1) as toxic_count
      FROM contract c
      WHERE c.user_id = ?
      ORDER BY c.con_updatetime DESC
    `, [userId]);

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

