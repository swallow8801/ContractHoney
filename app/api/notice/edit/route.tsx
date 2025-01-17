import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import { RowDataPacket, ResultSetHeader } from 'mysql2';

// 공지사항 조회
export async function GET(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // `RowDataPacket[]` 타입 명시
    const [rows] = await db.query<RowDataPacket[]>(
      `SELECT
        notice_id AS id,
        notice_title AS title,
        notice_content AS content
      FROM notice
      WHERE notice_id = ?`,
      [id]
    );

    // 데이터가 없는 경우
    if (rows.length === 0) {
      return NextResponse.json({ error: "Notice not found" }, { status: 404 });
    }

    // 첫 번째 결과 반환
    return NextResponse.json({ notice: rows[0] });
  } catch (error) {
    console.error("DB Error:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

// 공지사항 수정
export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    const body = await request.json();
    const { title, content } = body;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    // `ResultSetHeader` 타입 명시
    const [result] = await db.query<ResultSetHeader>(
      `UPDATE notice SET notice_title = ?, notice_content = ? WHERE notice_id = ?`,
      [title, content, id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json(
        { error: "Notice not found or not updated" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, message: "Notice updated successfully" });
  } catch (error) {
    console.error("Error updating notice:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
