import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  // 토큰이 없는 경우에도 DB 조회 가능하게 처리
  try {
    if (token) {
      // JWT 토큰 검증 및 사용자 정보 추출
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
      const userId = decoded.userId;

      // 로그인한 사용자에 대한 데이터만 조회
      const [rows] = await db.query('SELECT * FROM contract WHERE user_id = ? ORDER BY con_updatetime DESC', [userId]);
      return NextResponse.json(rows);
    } else {
      // 토큰 없이 모든 계약 정보를 조회 (예: 공통 계약서 조회)
      const [rows] = await db.query('SELECT * FROM contract ORDER BY con_updatetime DESC');
      return NextResponse.json(rows);
    }
  } catch (error) {
    console.error('Error fetching contracts:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
