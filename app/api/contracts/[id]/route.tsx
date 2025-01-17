import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';
import { RowDataPacket } from 'mysql2';

interface ContractRow extends RowDataPacket {
  con_id: string;
  user_id: number;
  // 필요한 다른 필드들을 추가
}

interface SummaryRow extends RowDataPacket {
  con_id: string;
  summary: string;
  // 필요한 다른 필드들을 추가
}

interface IdentitiesRow extends RowDataPacket {
  con_id: string;
  identity: string;
  // 필요한 다른 필드들을 추가
}

export async function GET(request: NextRequest) {
  // 'id'를 확실히 추출하려면 `pop()`의 반환값이 undefined일 수 있음을 처리
  const pathname = request.nextUrl.pathname;
  const id = pathname.split('/').pop() || ''; // 빈 문자열로 처리

  if (!id) {
    return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
  }

  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    // Get contract data
    const [contractRows] = await db.query<ContractRow[]>(
      'SELECT * FROM contract WHERE con_id = ? AND user_id = ?',
      [id, userId]
    );

    if (contractRows.length === 0) {
      return NextResponse.json({ error: 'Contract not found' }, { status: 404 });
    }

    // Get summaries
    const [summaryRows] = await db.query<SummaryRow[]>(
      'SELECT * FROM contract_summary WHERE con_id = ?',
      [id]
    );

    // Get identifications
    const [idenRows] = await db.query<IdentitiesRow[]>(
      'SELECT * FROM contract_iden WHERE con_id = ?',
      [id]
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
