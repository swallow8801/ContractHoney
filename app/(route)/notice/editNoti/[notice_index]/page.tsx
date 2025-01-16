"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Container,
  Sidebar,
  Main,
  Title,
  NoticeTitle,
  Form,
  FormInput,
  FormLabel,
  FormTextarea,
  SubmitButton,
  CancelButton,
  ButtonContainer, // 스타일 추가
} from "./[notice_index].styled";

const EditNoti = () => {
  const params = useParams(); // useParams로 notice_index 가져오기
  const router = useRouter();

  // 상태 관리
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자인지 확인하는 상태 추가
    
    // 사용자 권한 확인 (localStorage에서 가져오기)
    useEffect(() => {
      const userAdmin = localStorage.getItem('admin');
      if (userAdmin === '1') {
        setIsAdmin(true); // 관리자인 경우
      }
    }, []);

  // 공지사항 ID
  const noticeId = params.notice_index;

  // 공지사항 데이터 가져오기
  useEffect(() => {
    const fetchNotice = async () => {
      try {
        const response = await fetch(`/api/notice/edit?id=${noticeId}`);
        const data = await response.json();

        if (response.ok) {
          setTitle(data.notice.title);
          setContent(data.notice.content);
        } else {
          console.error("Failed to fetch notice:", data.error);
        }
      } catch (error) {
        console.error("Error fetching notice:", error);
      } finally {
        setLoading(false);
      }
    };

    if (noticeId) {
      fetchNotice();
    }
  }, [noticeId]);

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/notice/edit?id=${noticeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        router.push(`/notice/${noticeId}`); // 수정 후 notice/{id}로 이동
      } else {
        console.error("Failed to update notice");
      }
    } catch (error) {
      console.error("Error updating notice:", error);
    }
  };

  // 취소 버튼 핸들러
  const handleCancel = () => {
    router.push(`/notice/${noticeId}`); // 취소하면 notice/{id}로 이동
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <Container>
      <Sidebar>
        <Title>공지사항</Title>
      </Sidebar>
      <Main>
        <NoticeTitle>공지사항 수정</NoticeTitle>
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="notice_title">제목</FormLabel>
          <FormInput
            id="title"
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={!isAdmin}
            required
          />

          <FormLabel htmlFor="notice_content">내용</FormLabel>
          <FormTextarea
            id="content"
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={!isAdmin}
            required
          />

          <ButtonContainer>
            <SubmitButton type="submit" disabled={!isAdmin}>
              수정
            </SubmitButton>
            <CancelButton type="button" onClick={handleCancel}>
              취소
            </CancelButton>
          </ButtonContainer>
        </Form>
      </Main>
    </Container>
  );
};

export default EditNoti;
