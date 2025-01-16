"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Sidebar,
  SidebarTitle,
  Main,
  MainTitle,
  SearchSection,
  SearchInput,
  SearchButton,
  BoardTable,
  Pagination,
  PageButton,
  WriteButton,
  ExplanationSection,
  ExplanationText,
} from './notice.styled';

interface Notice {
  id: number;
  title: string;
  date: string;
}

const NoticeListPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

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
      } catch (error) {
        console.error('Error fetching notices:', error);
      }
    };

    fetchNotices();
  }, []);

  const filteredNotices = notices.filter((notice) => {
    if (appliedSearchTerm === '') return true;
    return notice.title.toLowerCase().includes(appliedSearchTerm.toLowerCase());
  });

  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredNotices.length / itemsPerPage);
  const currentItems = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm);
    setCurrentPage(1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleRowClick = (id: number) => {
    router.push(`/notice/${id}`);
  };

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>공지사항</SidebarTitle>
      </Sidebar>
      <Main>
        <MainTitle>공지사항</MainTitle>
        <ExplanationSection>
          <ExplanationText>
            이 페이지는 계약서 AI 분석 서비스와 관련된 최신 소식, 업데이트 사항, 서비스 개선 내용 등을 안내하는 공간입니다.
            항상 더 나은 서비스를 제공하기 위해 노력하고 있으니 중요한 공지사항을 확인해 주세요.
          </ExplanationText>
        </ExplanationSection>
        <SearchSection>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <SearchButton onClick={handleSearch}>검색</SearchButton>
        </SearchSection>
        <BoardTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((notice) => (
              <tr
                key={notice.id}
                onClick={() => handleRowClick(notice.id)}
                style={{ cursor: 'pointer' }}
              >
                <td>{notice.id}</td>
                <td>{notice.title}</td>
                <td>{new Date(notice.date).toISOString().split('T')[0]}</td>
              </tr>
            ))}
          </tbody>
        </BoardTable>
        <Pagination>
          <PageButton 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {'<'}
          </PageButton>
          {[...Array(5)].map((_, i) => {
            const pageNumber = currentPage - 2 + i;
            if (pageNumber > 0 && pageNumber <= pageCount) {
              return (
                <PageButton
                  key={pageNumber}
                  onClick={() => setCurrentPage(pageNumber)}
                  $active={currentPage === pageNumber}
                >
                  {pageNumber}
                </PageButton>
              );
            }
            return null;
          })}
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            {'>'}
          </PageButton>
        </Pagination>
        {isAdmin && (
          <WriteButton onClick={() => router.push('/notice/writeNoti')}>
            작성하기
          </WriteButton>
        )}
      </Main>
    </Container>
  );
};

export default NoticeListPage;

