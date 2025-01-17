"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  Container,
  Sidebar,
  Main,
  SidebarTitle,
  MenuList,
  MenuItem,
  MainTitle,
  Form,
  FormFileInput,
  FormInput,
  FormLabel,
  FormTextarea,
  NoticeBox,
  SubmitButton,
} from "./writeQnA.styled";

const WriteQnA = () => {
  const router = useRouter();
  const pathname = usePathname(); // 현재 경로를 확인

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = (document.getElementById("title") as HTMLInputElement)?.value.trim();
    const content = (document.getElementById("content") as HTMLTextAreaElement)?.value.trim();
    const token = localStorage.getItem("authToken"); // 로컬 스토리지에서 토큰 가져오기

    if (!title || !content) {
      alert("제목과 내용을 모두 입력하세요.");
      return;
    }

    if (!token) {
      alert("로그인이 필요합니다.");
      router.push("/login");
      return;
    }

    try {
      const response = await fetch("/api/qna/writeQnA", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Error response:", errorText);
        throw new Error("API 요청에 실패했습니다.");
      }

      alert("Q&A가 성공적으로 등록되었습니다.");
      router.push("/qna");
    } catch (error: any) {
      console.error("Error submitting Q&A:", error.message);
    }
  };

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>고객지원</SidebarTitle>
        <MenuList>
          <MenuItem
            $active={pathname === "/faq"}
            onClick={() => router.push("/faq")}
          >
            자주 묻는 질문
          </MenuItem>
          <MenuItem
            $active={pathname === "/qna" || pathname === "/qna/writeQnA"} // Q&A 작성 페이지 포함
            onClick={() => router.push("/qna")}
          >
            Q&A
          </MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <MainTitle>Q&A 작성하기</MainTitle>
        <NoticeBox>
          <p>Q&A 이용안내</p>
          <span>답변 등록 시 가입한 이메일로 메일이 발송될 예정입니다.</span>
        </NoticeBox>
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="title">제목</FormLabel>
          <FormInput id="title" type="text" placeholder="제목을 입력하세요." />

          <FormLabel htmlFor="content">내용</FormLabel>
          <FormTextarea id="content" placeholder="내용을 입력하세요." />

          <SubmitButton type="submit">등록하기</SubmitButton>
        </Form>
      </Main>
    </Container>
  );
};

export default WriteQnA;
