import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';

export async function GET(request: NextRequest) {
  try {
    // 최신순으로 정렬된 공지사항 데이터를 가져옴
    const [rows] = await db.query(`
      SELECT 
        notice_id AS id, 
        notice_title AS title, 
        notice_content AS content,
        DATE_FORMAT(notice_date, '%Y-%m-%d %H:%i:%s') AS date,
        notice_flag AS flag
      FROM 
        notice
      WHERE 
        notice_flag = 0
      ORDER BY notice_id DESC
    `);

    return NextResponse.json({ notices: rows });
  } catch (error) {
    console.error('Error fetching notices:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
