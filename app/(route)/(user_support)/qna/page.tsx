'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Sidebar,
  Main,
  Title,
  QNATitle,
  MenuList,
  MenuItem,
  Table,
  WriteButton,
  Pagination,
  PageButton,
  AnswerRow,
  AnswerContent,
  ToggleButton,
} from './qna.styled';

// Q&A 데이터 타입 정의
interface QnaType {
  qna_id: number;
  qna_title: string;
  qna_cont_date: string;
  user_name?: string; // 작성자의 이름 (관리자용)
  qna_answer: string | null; // 답변 내용
  qna_answ_date: string | null; // 답변 날짜
}

const MainPage = () => {
  const router = useRouter();
  const [qnas, setQnas] = useState<QnaType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openAnswers, setOpenAnswers] = useState<{ [key: number]: boolean }>({}); // 답변 표시 상태

  useEffect(() => {
    const fetchQnas = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('로그인이 필요합니다.');
        }

        const response = await fetch('/api/qna/qna_admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('데이터를 불러오는 데 실패했습니다.');
        }

        const { isAdmin: adminRole, data }: { isAdmin: boolean; data: QnaType[] } = await response.json();
        setIsAdmin(adminRole);
        setQnas(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQnas();
  }, []);

  const toggleAnswer = (qnaId: number) => {
    setOpenAnswers((prev) => ({ ...prev, [qnaId]: !prev[qnaId] }));
  };

  return (
    <Container>
      <Sidebar>
        <Title>Q&A</Title>
        <MenuList>
          <MenuItem $active>홈</MenuItem>
          <MenuItem onClick={() => router.push('/notice')}>공지사항</MenuItem>
          <MenuItem onClick={() => router.push('/faq')}>자주 묻는 질문</MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <QNATitle>Q&A</QNATitle>
        {isLoading ? (
          <p>데이터를 불러오는 중입니다...</p>
        ) : error ? (
          <p style={{ color: 'red', fontWeight: 'bold' }}>{error}</p>
        ) : qnas.length > 0 ? (
          <>
            <Table>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  {isAdmin && <th>작성자</th>}
                  <th>작성일</th>
                  <th>답변 상태</th>
                </tr>
              </thead>
              <tbody>
                {qnas.map((qna, index) => (
                  <React.Fragment key={qna.qna_id}>
                    <tr>
                      <td>{index + 1}</td>
                      <td>{qna.qna_title}</td>
                      {isAdmin && <td>{qna.user_name || '알 수 없음'}</td>}
                      <td>{new Date(qna.qna_cont_date).toLocaleDateString()}</td>
                      <td>
                        {qna.qna_answer ? (
                          <ToggleButton onClick={() => toggleAnswer(qna.qna_id)}>
                            {openAnswers[qna.qna_id] ? '닫기' : '답변 확인'}
                          </ToggleButton>
                        ) : (
                          '답변 대기 중'
                        )}
                      </td>
                    </tr>
                    {openAnswers[qna.qna_id] && qna.qna_answer && (
                      <AnswerRow>
                        <td colSpan={isAdmin ? 5 : 4}>
                          <AnswerContent>
                            <p>{qna.qna_answer}</p>
                            <p>답변 날짜: {new Date(qna.qna_answ_date!).toLocaleDateString()}</p>
                          </AnswerContent>
                        </td>
                      </AnswerRow>
                    )}
                  </React.Fragment>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <PageButton disabled>이전</PageButton>
              <PageButton $active>1</PageButton>
              <PageButton>2</PageButton>
              <PageButton>다음</PageButton>
            </Pagination>
          </>
        ) : (
          <p>등록된 Q&A가 없습니다.</p>
        )}
        {!isAdmin && <WriteButton onClick={() => router.push('/qna/writeQnA')}>문의하기</WriteButton>}
      </Main>
    </Container>
  );
};

export default MainPage;
