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
} from './qna.styled';

// Q&A 데이터 타입 정의
interface QnaType {
  qna_title: string;
  qna_cont_date: string;
}

const MainPage = () => {
  const router = useRouter();
  const [qnas, setQnas] = useState<QnaType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자 여부
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQnas = async () => {
      try {
        setIsLoading(true);

        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem('authToken');
        if (!token) {
          throw new Error('로그인이 필요합니다.');
        }

        // API 호출
        const response = await fetch('/api/qna/qna_admin', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 403) {
            throw new Error('접근 권한이 없습니다.');
          }
          throw new Error('데이터를 불러오는 데 실패했습니다.');
        }

        const { isAdmin: adminRole, data }: { isAdmin: boolean; data: QnaType[] } = await response.json();
        setIsAdmin(adminRole); // 관리자인지 여부 설정
        setQnas(data); // Q&A 데이터 설정
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQnas();
  }, []);

  return (
    <Container>
      <Sidebar>
        <Title>내 Q&A</Title>
        <MenuList>
          <MenuItem $active>홈</MenuItem>
          <MenuItem>공지사항</MenuItem>
          <MenuItem>문의하기</MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <QNATitle>{isAdmin ? '모든 사용자 Q&A' : '내 Q&A'}</QNATitle>
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
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {qnas.map((qna, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{qna.qna_title}</td>
                    <td>{new Date(qna.qna_cont_date).toLocaleDateString()}</td>
                  </tr>
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
        {!isAdmin && <WriteButton onClick={() => router.push('/qna/write')}>문의하기</WriteButton>}
      </Main>
    </Container>
  );
};

export default MainPage;
