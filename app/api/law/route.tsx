import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';

export async function GET(request: NextRequest) {
  try {
    // 데이터베이스에서 law 테이블 데이터를 가져오기
    const [rows] = await db.query('SELECT * FROM law ORDER BY law_id DESC');
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching laws:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
