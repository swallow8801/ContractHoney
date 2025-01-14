import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import jwt from 'jsonwebtoken';

export async function POST(request: NextRequest) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileName = formData.get('fileName') as string;
    const fileType = formData.get('fileType') as string;

    if (!file || !fileName || !fileType) {
      return NextResponse.json({ error: 'Missing file information' }, { status: 400 });
    }

    // Here you would typically upload the file to a storage service
    // For this example, we'll just use the file name and type

    const [result] = await db.query(
      'INSERT INTO contract (con_title, con_type, con_updatetime, con_summary, con_toxic, con_toxic_level, con_unfair, con_unfair_level, con_law, con_version, user_id) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?, ?, ?, ?)',
      [fileName, fileType, 'Default Summary', 'Default Toxic', 'Low', 'Default Unfair', 'Low', 'Default Law', 1, userId]
    );

    const insertId = (result as any).insertId;

    return NextResponse.json({ contractId: insertId });
  } catch (error) {
    console.error('Error uploading contract:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

