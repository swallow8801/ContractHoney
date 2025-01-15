import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export async function PUT(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    const { user_name, user_phone, newPassword } = await request.json();

    // If changing password
    if (newPassword) {
      const hashedNewPassword = await bcrypt.hash(newPassword, 10);
      await db.query('UPDATE user SET user_password = ? WHERE user_id = ?', [hashedNewPassword, userId]);

      return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.' });
    }

    // Update user information
    if (user_name || user_phone) {
      const updateFields = [];
      const updateValues = [];

      if (user_name) {
        updateFields.push('user_name = ?');
        updateValues.push(user_name);
      }

      if (user_phone) {
        updateFields.push('user_phone = ?');
        updateValues.push(user_phone);
      }

      updateValues.push(userId);

      await db.query(
        `UPDATE user SET ${updateFields.join(', ')} WHERE user_id = ?`,
        updateValues
      );

      return NextResponse.json({ message: '사용자 정보가 성공적으로 업데이트되었습니다.' });
    }

    return NextResponse.json({ error: '업데이트할 정보가 제공되지 않았습니다.' }, { status: 400 });
  } catch (error) {
    console.error('Error updating user:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

