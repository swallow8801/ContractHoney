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
  SidebarTitle,
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
  const params = useParams();
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);
  const [prevNotice, setPrevNotice] = useState<Notice | null>(null);
  const [nextNotice, setNextNotice] = useState<Notice | null>(null);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // 상태 추가

  useEffect(() => {
    const userAdmin = localStorage.getItem('admin');
    if (userAdmin === '1') {
      setIsAdmin(true);
    }
  }, []);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/notice');
        const data = await response.json();
        setNotices(data.notices);

        const currentId = parseInt(params.notice_index as string, 10);

        const current = data.notices.find((notice: Notice) => notice.id === currentId);
        const prev = data.notices
          .filter((notice: Notice) => notice.flag !== 1 && notice.id < currentId)
          .sort((a: Notice, b: Notice) => b.id - a.id)[0] || null;
        const next = data.notices
          .filter((notice: Notice) => notice.flag !== 1 && notice.id > currentId)
          .sort((a: Notice, b: Notice) => a.id - b.id)[0] || null;

        setCurrentNotice(current || null);
        setPrevNotice(prev);
        setNextNotice(next);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, [params.notice_index]);

  const handleDelete = () => {
    setNotification({ type: 'confirm-delete', message: '삭제하시겠습니까?' });
  };

  const handleEdit = () => {
    setShowNotification(true); // 수정 버튼 클릭 핸들러 수정
  };

  const handleConfirmEdit = () => { // 확인 버튼 클릭 핸들러 추가
    setShowNotification(false);
    if (currentNotice) {
      router.push(`/notice/editNoti/${currentNotice.id}`);
    }
  };

  const handleConfirm = async () => {
    if (notification?.type === 'confirm-delete') {
      try {
        const response = await fetch(`/api/notice/delete?id=${currentNotice?.id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          setNotification({ type: 'norm', message: '공지사항이 성공적으로 삭제되었습니다.' });
          setTimeout(() => {
            router.push('/notice');
          }, 1000);
        } else {
          const result = await response.json();
          setNotification({ type: 'error', message: result.error || '삭제 중 오류가 발생했습니다.' });
        }
      } catch (error) {
        console.error('Error deleting notice:', error);
        setNotification({ type: 'error', message: '서버와 통신 중 문제가 발생했습니다.' });
      }
    } else {
      setNotification(null);
    }
  };

  const handleCancel = () => {
    setNotification(null);
  };

  if (!currentNotice) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {notification && (
        <NotificationOverlay>
          <NotificationBox>
            <NotificationMessage>{notification.message}</NotificationMessage>
            {notification.type === 'confirm-delete' ? (
              <>
                {/* 삭제 확인 버튼은 error 색상 */}
                <ConfirmButton $type="error" onClick={handleConfirm}>
                  확인
                </ConfirmButton>
                {/* 취소 버튼은 norm 색상 */}
                <ConfirmButton $type="norm" onClick={handleCancel}>
                  취소
                </ConfirmButton>
              </>
            ) : (
              <ConfirmButton $type={notification.type as 'success' | 'error'} onClick={handleConfirm}>
                확인
              </ConfirmButton>
            )}
          </NotificationBox>
        </NotificationOverlay>
      )}
      {showNotification && (
        <NotificationOverlay>
          <NotificationBox>
            <NotificationMessage>수정하시겠습니까?</NotificationMessage>
            <ConfirmButton $type="success" onClick={handleConfirmEdit}>
              확인
            </ConfirmButton>
            <ConfirmButton $type="norm" onClick={() => setShowNotification(false)}>
              취소
            </ConfirmButton>
          </NotificationBox>
        </NotificationOverlay>
      )}
      <Sidebar>
        <SidebarTitle>공지사항</SidebarTitle>
      </Sidebar>
      <Main>
        <NoticeTitle>{currentNotice.title}</NoticeTitle>
        <NoticeInfo>작성일: {new Date(currentNotice.date).toLocaleDateString()}</NoticeInfo>
        <Content>{currentNotice.content}</Content>

        <NavigationTable>
          <tbody>
            <NavigationRow>
              <td>다음글</td>
              <td>
                {nextNotice ? (
                  <span onClick={() => router.push(`/notice/${nextNotice.id}`)}>
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
                  <span onClick={() => router.push(`/notice/${prevNotice.id}`)}>
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

