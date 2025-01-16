"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Sidebar,
  Main,
  Title,
  NoticeTitle,
  Form,
  FormFileInput,
  FormInput,
  FormLabel,
  FormTextarea,
  SubmitButton,
  NotificationOverlay,
  NotificationBox,
  ConfirmButton,
} from './writeNoti.styled';

const WriteNoti = () => {
  const router = useRouter();

  // 상태 관리
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자인지 확인하는 상태 추가
  
  // 사용자 권한 확인 (localStorage에서 가져오기)
  useEffect(() => {
    const userAdmin = localStorage.getItem('admin');
    if (userAdmin === '1') {
      setIsAdmin(true); // 관리자인 경우
    }
  }, []);

  // 파일 선택 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
  };

  // 제출 핸들러
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // 서버로 데이터 전송
      const formData = new FormData();
      formData.append('notice_title', title);
      formData.append('notice_content', content);
      if (file) {
        formData.append('file', file);
      }

      const response = await fetch('/api/notice/write', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setNotification({ type: 'success', message: '공지사항이 성공적으로 등록되었습니다.' });
      } else {
        const result = await response.json();
        setNotification({ type: 'error', message: result.error || '오류가 발생했습니다.' });
      }
    } catch (error) {
      console.error('Error submitting notice:', error);
      setNotification({ type: 'error', message: '서버와 통신 중 문제가 발생했습니다.' });
    }
  };

  // 확인 버튼 클릭 시 처리
  const handleConfirm = () => {
    if (notification?.type === 'success') {
      // 성공 시 입력 값 초기화 및 페이지 이동
      setTitle('');
      setContent('');
      setFile(null);
      router.push('/notice');
    }
    setNotification(null); // 알림 박스 숨기기
  };

  return (
    <Container>
      {/* 알림 박스와 배경 어둡게 */}
      {notification && (
        <NotificationOverlay>
          <NotificationBox $type={notification.type}>
            <p>{notification.message}</p>
            <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
          </NotificationBox>
        </NotificationOverlay>
      )}
      <Sidebar>
        <Title>공지사항</Title>
      </Sidebar>
      <Main>
        <NoticeTitle>공지사항 작성</NoticeTitle>
        <Form onSubmit={handleSubmit}>
          <FormLabel htmlFor="notice_title">제목</FormLabel>
          <FormInput
            id="title"
            type="text"
            placeholder="제목을 입력하세요."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <FormLabel htmlFor="notice_content">내용</FormLabel>
          <FormTextarea
            id="content"
            placeholder="내용을 입력하세요."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />

          <FormLabel htmlFor="notice_file">파일 첨부</FormLabel>
          <FormFileInput
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.hwp,.txt"
          />

          <SubmitButton type="submit" disabled={!isAdmin}>등록하기</SubmitButton>
        </Form>
      </Main>
    </Container>
  );
};

export default WriteNoti;
