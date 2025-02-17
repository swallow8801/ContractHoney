import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';

export async function DELETE(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    // Delete related records first
    await db.query('DELETE FROM qna WHERE user_id = ?', [userId]);
    await db.query('DELETE FROM contract WHERE user_id = ?', [userId]);
    // Finally delete the user
    await db.query('DELETE FROM user WHERE user_id = ?', [userId]);

    return NextResponse.json({ message: '계정이 성공적으로 삭제되었습니다.' });
  } catch (error) {
    console.error('Error deleting user:', error);
    return NextResponse.json({ error: '계정 삭제 중 오류가 발생했습니다.' }, { status: 500 });
  }
}

