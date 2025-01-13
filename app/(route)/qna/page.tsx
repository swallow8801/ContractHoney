'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { Container, Sidebar, Main, Title, QNATitle, Table } from './qna.styled';

const QNA = () => {
  const router = useRouter();

  // 공지사항 목록 데이터
  const qna = [
    { id: '1', type: 'question', title: 'Q&A1', content: 'Q&A1 질문 내용', date: '2025-01-10' },
    { id: '1-A', type: 'answer', parentId: '1', title: 'Q&A1 답변', content: 'Q&A1 답변 내용', date: '2025-01-11' },
    { id: '2', type: 'question', title: 'Q&A 제목 2', content: 'Q&A2 질문 내용', date: '2025-01-09' },
    { id: '3', type: 'question', title: 'Q&A 제목 3', content: 'Q&A3 질문 내용', date: '2025-01-08' },
  ];

  // 클릭 이벤트 핸들러
  const handleRowClick = (id: string) => {
    // 답변(`type: answer`)일 경우, parentId를 사용해 질문 페이지로 이동
    const parentId = id.includes('-A') ? id.split('-')[0] : id;
    router.push(`/qna/${parentId}`);
  };

  return (
    <Container>
      <Sidebar>
        <Title>고객지원</Title>
        <ul>
          <li onClick={() => router.push('/faq')} style={{ cursor: 'pointer' }}>
            자주 묻는 질문
          </li>
          <li onClick={() => router.push('/qna')} style={{ cursor: 'pointer' }}>
            Q&A
          </li>
        </ul>
      </Sidebar>
      <Main>
        <QNATitle>Q&A</QNATitle>
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {qna.map((item) => (
              <tr key={item.id} onClick={() => handleRowClick(item.id)} style={{ cursor: 'pointer' }}>
                <td>
                  {item.type === 'answer' ? (
                    <FontAwesomeIcon
                      icon={faReply}
                      style={{
                        transform: 'rotate(180deg)',
                        color: '#555',
                        fontSize: '1.2rem',
                      }}
                    />
                  ) : (
                    item.id
                  )}
                </td>
                <td>{item.title}</td>
                <td>{item.date}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Main>
    </Container>
  );
};

export default QNA;
