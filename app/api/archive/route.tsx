import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';

export async function GET(request: NextRequest) {
  const searchTerm = request.nextUrl.searchParams.get('searchTerm');
  const searchType = request.nextUrl.searchParams.get('searchType');

  let query = 'SELECT * FROM archive WHERE 1 = 1 ORDER BY ar_id DESC';
  const params: string[] = [];

  // 검색 조건 적용
  if (searchTerm) {
    const searchValue = `%${searchTerm.toLowerCase()}%`;  // LIKE 검색을 위해 '%' 추가
    if (searchType === '제목') {
      query += ' AND LOWER(ar_title) LIKE ?';
      params.push(searchValue);
    } else if (searchType === '내용') {
      query += ' AND LOWER(ar_content) LIKE ?';
      params.push(searchValue);
    } else if (searchType === '제목+내용') {
      query += ' AND (LOWER(ar_title) LIKE ? OR LOWER(ar_content) LIKE ?)';
      params.push(searchValue, searchValue);
    }
  }

  try {
    const [rows] = await db.query(query, params);  // 쿼리 실행
    return NextResponse.json(rows);
  } catch (error) {
    console.error('Error fetching archive:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
