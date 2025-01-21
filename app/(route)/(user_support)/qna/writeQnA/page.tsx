"use client";

import React, { useState } from "react";
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
  FormInput,
  FormLabel,
  FormTextarea,
  SubmitButton,
  NotificationOverlay,
  NotificationBox,
  ConfirmButton,
  NotificationMessage,
  ButtonContainer,
  CancelButton,
} from "./writeQnA.styled";

const WriteQnA = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const title = (document.getElementById("title") as HTMLInputElement)?.value.trim();
    const content = (document.getElementById("content") as HTMLTextAreaElement)?.value.trim();
    const token = localStorage.getItem("authToken");

    if (!title || !content) {
      setNotification({ type: "error", message: "제목과 내용을 모두 입력하세요." });
      return;
    }

    if (!token) {
      setNotification({ type: "error", message: "로그인이 필요합니다." });
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

      setNotification({ type: "success", message: "Q&A가 등록되었습니다." });
    } catch (error: any) {
      console.error("Error submitting Q&A:", error.message);
      setNotification({ type: "error", message: "서버와 통신 중 문제가 발생했습니다." });
    }
  };

  const handleConfirm = () => {
    if (notification?.type === "success") {
      router.push("/qna");
    }
    setNotification(null);
  };

  const handleCancel = () => {
    router.push("/qna");
  };

  return (
    <Container>
      {notification && (
        <NotificationOverlay>
          <NotificationBox>
            <NotificationMessage>{notification.message}</NotificationMessage>
            <ConfirmButton $type='ok' onClick={handleConfirm}>확인</ConfirmButton>
          </NotificationBox>
        </NotificationOverlay>
      )}

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
            $active={pathname === "/qna" || pathname === "/qna/writeQnA"}
            onClick={() => router.push("/qna")}
          >
            Q&A
          </MenuItem>
        </MenuList>
      </Sidebar>

      <Main>
        <MainTitle>Q&A 작성</MainTitle>
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="title">제목</FormLabel>
          <FormInput id="title" type="text" placeholder="제목을 입력하세요." />

          <FormLabel htmlFor="content" style={{marginTop:'20px'}}>내용</FormLabel>
          <FormTextarea id="content" placeholder="내용을 입력하세요." />

          <ButtonContainer>
            <SubmitButton type="submit">등록</SubmitButton>
            <CancelButton type="button" onClick={handleCancel}>취소</CancelButton>
          </ButtonContainer>
        </Form>
      </Main>
    </Container>
  );
};

export default WriteQnA;
