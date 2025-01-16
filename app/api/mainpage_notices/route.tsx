import { NextResponse } from 'next/server';
import { db } from '@/app/lib/database';

export async function GET() {
  try {
    // 최신 공지사항 3개 가져오기 (삭제되지 않은 것만)
    const [rows] = await db.query(`
      SELECT 
        notice_id, 
        notice_title, 
        notice_date
      FROM notice
      WHERE notice_flag != 1
      ORDER BY notice_date DESC 
      LIMIT 3
    `);

    // 데이터 반환
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching recent notices:', error);
    return NextResponse.json({ error: 'Failed to fetch notices' }, { status: 500 });
  }
}

