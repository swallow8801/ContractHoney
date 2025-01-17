import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/app/lib/database';
import { ResultSetHeader } from 'mysql2'; // MySQL 클라이언트에서 제공하는 타입

// 공지사항 삭제
export async function DELETE(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id"); // URL에서 id 가져오기

  if (!id) {
    return NextResponse.json({ error: "ID is required" }, { status: 400 });
  }

  try {
    // notice_flag를 1로 업데이트하여 삭제 처리
    const [result] = await db.query<ResultSetHeader>(
      `UPDATE notice SET notice_flag = 1 WHERE notice_id = ?`,
      [id]
    );

    if (result.affectedRows === 0) {
      return NextResponse.json({ error: "Notice not found or already deleted" }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: "Notice deleted successfully" });
  } catch (error) {
    console.error("Error deleting notice:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
