"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Sidebar,
  Main,
  Title,
  QNATitle,
  QnaInfo,
  Content,
  ReplySection,
  ReplyTextarea,
  SubmitButton,
  Reply,
  ReplyAuthor,
  ButtonContainer,
  BackButton,
} from "./[qna_id].styled";

interface QnaType {
  qna_id: number;
  qna_title: string;
  qna_content: string;
  qna_cont_date: string;
  qna_answer: string | null;
  qna_answ_date: string | null;
}

// 날짜 포맷팅 함수
const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

const QnaDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const [qna, setQna] = useState<QnaType | null>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchQnaDetail = async () => {
      try {
        const response = await fetch(`/api/qna/${params.qna_id}`);
        const data = await response.json();
        setQna(data.qna);
      } catch (error) {
        console.error("Error fetching Q&A details:", error);
      }
    };

    fetchQnaDetail();
  }, [params.qna_id]);

  const handleReplySubmit = async () => {
    if (!reply.trim()) {
      alert("답변 내용을 입력하세요.");
      return;
    }

    setLoading(true);

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const response = await fetch(`/api/qna/${params.qna_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: reply }),
      });

      if (!response.ok) {
        throw new Error("API 요청에 실패했습니다.");
      }

      const updatedQna = await response.json();
      setQna(updatedQna.qna);
      setReply("");
      alert("답변이 성공적으로 등록되었습니다.");
    } catch (error) {
      console.error("Error submitting reply:", error);
      alert("답변 등록 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (!qna) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      <Sidebar>
        <Title>Q&A</Title>
      </Sidebar>
      <Main>
        <QNATitle>{qna.qna_title}</QNATitle>
        <QnaInfo>작성일 : {formatDate(qna.qna_cont_date)}</QnaInfo>
        <Content>{qna.qna_content}</Content>
        {qna.qna_answer ? (
          <>
            <Reply>
              <ReplyAuthor>관리자 답변:</ReplyAuthor>
              <p>{qna.qna_answer}</p>
              <QnaInfo>답변일 : {qna.qna_answ_date ? formatDate(qna.qna_answ_date) : "없음"}</QnaInfo>
            </Reply>
          </>
        ) : (
          <ReplySection>
            <ReplyTextarea
              placeholder="답변을 입력하세요."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              disabled={loading}
            />
            <SubmitButton onClick={handleReplySubmit} disabled={loading}>
              {loading ? "등록 중..." : "답변 등록"}
            </SubmitButton>
          </ReplySection>
        )}
        <ButtonContainer>
          <BackButton onClick={() => router.push("/qna")}>목록으로</BackButton>
        </ButtonContainer>
      </Main>
    </Container>
  );
};

export default QnaDetailPage;
