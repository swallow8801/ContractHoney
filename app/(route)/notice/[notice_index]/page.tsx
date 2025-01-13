'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
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

const NoticeDetailPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const currentId = parseInt(params.id, 10);

  // 예시 데이터
  const notices = [
    { id: 1, title: '공지사항1' },
    { id: 2, title: '공지사항2' },
    { id: 3, title: '공지사항3' },
  ];

  // 현재 글
  const currentNotice = notices.find((notice) => notice.id === currentId);

  // 이전 글 및 다음 글
  const prevNotice = notices.find((notice) => notice.id === currentId - 1);
  const nextNotice = notices.find((notice) => notice.id === currentId + 1);

  return (
    <Container>
      <Sidebar>
        <Title>공지사항</Title>
      </Sidebar>
      <Main>
        <NoticeTitle>공지사항1</NoticeTitle>
        <NoticeInfo>
          작성일: 2024-11-28
        </NoticeInfo>
        <Content>모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코<br/> 모코코</Content>

        <NavigationTable>
          <tbody>
            <NavigationRow></NavigationRow>
            <NavigationRow>
              <td>이전글</td>
              <td>
                {prevNotice ? (
                  <span
                    style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                    onClick={() => router.push(`/notice/${prevNotice.id}`)}
                  >
                    {prevNotice.title}
                  </span>
                ) : (
                  '이전글이 없습니다.'
                )}
              </td>
            </NavigationRow>
            <NavigationRow>
              <td>다음글</td>
              <td>
                {nextNotice ? (
                  <span
                    style={{ cursor: 'pointer', color: '#007bff', textDecoration: 'underline' }}
                    onClick={() => router.push(`/notice/${nextNotice.id}`)}
                  >
                    {nextNotice.title}
                  </span>
                ) : (
                  '다음글이 없습니다.'
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
