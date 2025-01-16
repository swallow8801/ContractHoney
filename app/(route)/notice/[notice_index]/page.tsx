'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Container,
  Sidebar,
  Main,
  Title,
  NoticeTitle,
  NoticeInfo,
  Content,
  NavigationTable,
  NavigationRow,
  BackButton,
  ButtonContainer,
  DeleteButton,
  EditButton,
  NotificationBox,
  NotificationMessage,
  ConfirmButton,
  NotificationOverlay,
} from './[notice_index].styled';

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
  flag: number;
}

const NoticeDetailPage = () => {
  const router = useRouter();
  const params = useParams(); // useParams로 params 가져오기
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);
  const [prevNotice, setPrevNotice] = useState<Notice | null>(null);
  const [nextNotice, setNextNotice] = useState<Notice | null>(null);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자인지 확인하는 상태 추가
  
  // 사용자 권한 확인 (localStorage에서 가져오기)
  useEffect(() => {
    const userAdmin = localStorage.getItem('admin');
    if (userAdmin === '1') {
      setIsAdmin(true); // 관리자인 경우
    }
  }, []);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/notice');
        const data = await response.json();
        setNotices(data.notices);
  
        const currentId = parseInt(params.notice_index, 10);
  
        // 현재 공지사항 찾기
        const current = data.notices.find((notice: Notice) => notice.id === currentId);
  
        // flag가 1이 아닌 이전 공지사항 찾기
        const prev = data.notices
          .filter((notice: Notice) => notice.flag !== 1 && notice.id < currentId)
          .sort((a: Notice, b: Notice) => b.id - a.id)[0] || null; // 가장 큰 id 선택
  
        // flag가 1이 아닌 다음 공지사항 찾기
        const next = data.notices
          .filter((notice: Notice) => notice.flag !== 1 && notice.id > currentId)
          .sort((a: Notice, b: Notice) => a.id - b.id)[0] || null; // 가장 작은 id 선택
  
        setCurrentNotice(current || null);
        setPrevNotice(prev);
        setNextNotice(next);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };
  
    fetchNotices();
  }, [params.notice_index]);
  

  const handleDelete = async () => {
    if (!currentNotice) return;

    const confirmDelete = window.confirm('정말 삭제하시겠습니까?');
    if (!confirmDelete) return;

    try {
      const response = await fetch(`/api/notice/delete`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: currentNotice.id }),
      });

      if (response.ok) {
        setNotification({ type: 'success', message: '공지사항이 성공적으로 삭제되었습니다.' });
      } else {
        const result = await response.json();
        setNotification({ type: 'error', message: result.error || '삭제 중 오류가 발생했습니다.' });
      }
    } catch (error) {
      console.error('Error deleting notice:', error);
      setNotification({ type: 'error', message: '서버와 통신 중 문제가 발생했습니다.' });
    }
  };

  const handleEdit = () => {
    setNotification({ type: 'confirm', message: '수정하시겠습니까?' });
  };

  const handleConfirm = () => {
    if (notification?.type === 'success' || notification?.type === 'error') {
      setNotification(null);
    } else if (notification?.type === 'confirm') {
      // 수정 페이지로 이동
      if (currentNotice) {
        router.push(`/notice/editNoti/${currentNotice.id}`);
      }
    }
  };

  const handleCancel = () => {
    setNotification(null);
  }

  if (!currentNotice) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {notification && (
        <NotificationOverlay>
          <NotificationBox>
            <NotificationMessage>{notification.message}</NotificationMessage>
            <ConfirmButton onClick={handleConfirm}>확인</ConfirmButton>
            <ConfirmButton style={{ background: 'rgb(169, 169, 169)', marginLeft: '20px'}} onClick={handleCancel}>취소</ConfirmButton>
          </NotificationBox>
        </NotificationOverlay>
      )}
      <Sidebar>
        <Title>공지사항</Title>
      </Sidebar>
      <Main>
        <NoticeTitle>{currentNotice.title}</NoticeTitle>
        <NoticeInfo>작성일: {currentNotice.date}</NoticeInfo>
        <Content>{currentNotice.content}</Content>

        <NavigationTable>
          <tbody>
            <NavigationRow></NavigationRow>
            <NavigationRow>
              <td>다음글</td>
              <td>
                {nextNotice ? (
                  <span
                    style={{ cursor: 'pointer', color: '#202020' }}
                    onClick={() => router.push(`/notice/${nextNotice.id}`)}
                  >
                    {nextNotice.title}
                  </span>
                ) : (
                  '다음글이 없습니다.'
                )}
              </td>
            </NavigationRow>
            <NavigationRow>
              <td>이전글</td>
              <td>
                {prevNotice ? (
                  <span
                    style={{ cursor: 'pointer', color: '#202020' }}
                    onClick={() => router.push(`/notice/${prevNotice.id}`)}
                  >
                    {prevNotice.title}
                  </span>
                ) : (
                  '이전글이 없습니다.'
                )}
              </td>
            </NavigationRow>
          </tbody>
        </NavigationTable>
        <ButtonContainer>
        {isAdmin && (
          <>
          <EditButton onClick={handleEdit}>수정</EditButton>
          <DeleteButton onClick={handleDelete}>삭제</DeleteButton>
          </>
        )}
          <BackButton onClick={() => router.push('/notice')}>목록</BackButton>
        </ButtonContainer>
      </Main>
    </Container>
  );
};

export default NoticeDetailPage;
