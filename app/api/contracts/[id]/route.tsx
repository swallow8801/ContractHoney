import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    // Get contract data
    const [contractRows] = await db.query(
      'SELECT * FROM contract WHERE con_id = ? AND user_id = ?',
      [context.params.id, userId]
    );

    if ((contractRows as any[]).length === 0) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    // Get summaries
    const [summaryRows] = await db.query(
      'SELECT * FROM contract_summary WHERE con_id = ?',
      [context.params.id]
    );

    // Get identifications
    const [idenRows] = await db.query(
      'SELECT * FROM contract_iden WHERE con_id = ?',
      [context.params.id]
    );

    return NextResponse.json({
      contract: contractRows[0],
      summaries: summaryRows,
      idens: idenRows
    });

  } catch (error) {
    console.error('Error fetching contract:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
