import { NextRequest, NextResponse } from "next/server";
import { db } from "@/app/lib/database";
import jwt from "jsonwebtoken";

export async function POST(request: NextRequest) {
  const token = request.headers.get("Authorization")?.split(" ")[1];

  if (!token) {
    console.error("❌ 인증 토큰 없음");
    return NextResponse.json({ error: "Authentication required" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY!) as { userId: number };
    const userId = decoded.userId;

    const body = await request.json();
    console.log("✅ 저장할 분석 데이터:", body);

    const { contractId, analysisResults, summaryResults } = body;

    // 계약서 요약 데이터 저장
    for (const summary of summaryResults) {
      console.log("✅ 요약 데이터 저장 중:", summary);
      await db.query(
        "INSERT INTO contract_summary (con_id, sum_article_number, sum_article_title, sum_summary) VALUES (?, ?, ?, ?)",
        [contractId, summary.article_number, summary.article_title, summary.summary]
      );
    }

    // 계약서 분석 결과 저장
    for (const iden of analysisResults) {
      console.log("✅ 조항 분석 데이터 저장 중:", iden);
      await db.query(
        "INSERT INTO contract_iden (con_id, iden_article_number, iden_clause_number, iden_subclause_number, iden_sentence, iden_unfair, iden_unfair_percent, iden_toxic, iden_toxic_percent, law_article_number, law_clause_number, law_subclause_number, law_explain) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [
          contractId,
          iden.contract_article_number,
          iden.contract_clause_number,
          iden.contract_subclause_number,
          iden.Sentence,
          iden.Unfair,
          iden.Unfair_percent,
          iden.Toxic,
          iden.Toxic_percent,
          iden.law_article_number,
          iden.law_clause_number_law,
          iden.law_subclause_numbe_lawr,
          iden.explain
        ]
      );
    }

    console.log("✅ 분석 결과 DB 저장 완료");

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ 분석 결과 저장 중 오류 발생:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
