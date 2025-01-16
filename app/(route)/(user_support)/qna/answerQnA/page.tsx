"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Container,
  Sidebar,
  Main,
  Title,
  NoticeTitle,
  Form,
  FormTextarea,
  FormLabel,
  SubmitButton,
} from "./answerQnA.styled";

const AnswerQnA = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const qnaId = searchParams.get("qnaId");
  const [answer, setAnswer] = useState("");

  if (!qnaId) {
    alert("유효한 Q&A ID가 필요합니다.");
    router.push("/qna");
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer.trim()) {
      alert("답변 내용을 입력하세요.");
      return;
    }

    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch(`/api/qna/answerQnA`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qnaId: parseInt(qnaId), // 정수로 변환하여 전달
          answer,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error response:", errorData);
        throw new Error(errorData.error || "API 요청에 실패했습니다.");
      }

      alert("답변이 성공적으로 등록되었습니다.");
      router.push("/qna");
    } catch (error: any) {
      console.error("Error submitting answer:", error.message);
    }
  };

  return (
    <Container>
      <Sidebar>
        <Title>관리자</Title>
      </Sidebar>
      <Main>
        <NoticeTitle>Q&A 답변 작성하기</NoticeTitle>
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="answer">답변</FormLabel>
          <FormTextarea
            id="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="답변 내용을 입력하세요."
          />
          <SubmitButton type="submit">답변 등록</SubmitButton>
        </Form>
      </Main>
    </Container>
  );
};

export default AnswerQnA;
