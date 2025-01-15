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
} from './[notice_index].styled';

interface Notice {
  id: number;
  title: string;
  date: string;
  content: string;
}

const NoticeDetailPage = () => {
  const router = useRouter();
  const params = useParams(); // useParams로 params 가져오기
  const [notices, setNotices] = useState<Notice[]>([]);
  const [currentNotice, setCurrentNotice] = useState<Notice | null>(null);
  const [prevNotice, setPrevNotice] = useState<Notice | null>(null);
  const [nextNotice, setNextNotice] = useState<Notice | null>(null);

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/notice');
        const data = await response.json();
        setNotices(data.notices);

        const currentId = parseInt(params.notice_index, 10);

        // 현재 공지사항, 이전 공지사항, 다음 공지사항 찾기
        const current = data.notices.find((notice: Notice) => notice.id === currentId);
        const prev = data.notices.find((notice: Notice) => notice.id === currentId - 1);
        const next = data.notices.find((notice: Notice) => notice.id === currentId + 1);

        setCurrentNotice(current || null);
        setPrevNotice(prev || null);
        setNextNotice(next || null);
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, [params.notice_index]);

  if (!currentNotice) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
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
                        style={{ cursor: 'pointer', color: '#202020'}}
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
                        style={{ cursor: 'pointer', color: '#202020'}}
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

        <BackButton onClick={() => router.push('/notice')}>목록</BackButton>
      </Main>
    </Container>
  );
};

export default NoticeDetailPage;
