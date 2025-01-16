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
  ButtonContainer,
  NotificationOverlay,
  NotificationBox,
  NotificationMessage,
  ConfirmButton,
} from "./[notice_index].styled";

const EditNoti = () => {
  const params = useParams();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error', message: string } | null>(null);
    
  useEffect(() => {
    const userAdmin = localStorage.getItem('admin');
    if (userAdmin === '1') {
      setIsAdmin(true);
    } else {
      router.push('/notice');
    }
  }, [router]);

  const noticeId = params.notice_index;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/notice/edit?id=${noticeId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      if (response.ok) {
        setNotification({ type: 'success', message: '공지사항이 수정되었습니다.' });
      } else {
        setNotification({ type: 'error', message: '공지사항 수정에 실패했습니다.' });
      }
    } catch (error) {
      console.error("Error updating notice:", error);
      setNotification({ type: 'error', message: '서버 오류가 발생했습니다.' });
    }
  };

  const handleCancel = () => {
    router.push(`/notice/${noticeId}`);
  };

  const handleNotificationConfirm = () => {
    setNotification(null);
    if (notification?.type === 'success') {
      router.push(`/notice/${noticeId}`);
    }
  };

  if (loading) {
    return <p>로딩 중...</p>;
  }

  return (
    <Container>
      {notification && (
        <NotificationOverlay>
          <NotificationBox>
            <NotificationMessage>{notification.message}</NotificationMessage>
            <ConfirmButton $type='norm' onClick={handleNotificationConfirm}>
              확인
            </ConfirmButton>
          </NotificationBox>
        </NotificationOverlay>
      )}
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

