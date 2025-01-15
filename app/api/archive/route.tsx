import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';

export async function GET(request: NextRequest) {
  try {
    // archive 테이블에서 모든 데이터를 조회 (토큰 확인 없이)
    const [rows] = await db.query('SELECT * FROM archive ORDER BY ar_date DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching archive:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
