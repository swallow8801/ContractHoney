"use client";

import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import {
  Container,
  Sidebar,
  Main,
  Title,
  BoardContainer,
  BoardTitle,
  BoardTable,
  SearchSection,
  SearchSelect,
  SearchInput,
  SearchButton,
  Pagination,
  PageButton,
  WriteButton,
  FooterContainer,
} from './notice.styled';

interface Notice {
  id: number;
  title: string;
  date: string;
}

const NoticeListPage = () => {
  const router = useRouter();
  const [searchType, setSearchType] = useState('제목');
  const [searchTerm, setSearchTerm] = useState('');
  const [appliedSearchTerm, setAppliedSearchTerm] = useState(''); // 실제 검색에 사용할 값
  const [currentPage, setCurrentPage] = useState(1);
  const [notices, setNotices] = useState<Notice[]>([]);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자인지 확인하는 상태 추가

  // 사용자 권한 확인 (localStorage에서 가져오기)
  useEffect(() => {
    const userAdmin = localStorage.getItem('admin');
    if (userAdmin === '1') {
      setIsAdmin(true); // 관리자인 경우
    }
  }, []);

  // 서버에서 공지사항 데이터 가져오기
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

  // 검색된 결과 필터링
  const filteredNotices = notices.filter((notice) => {
    if (appliedSearchTerm === '') return true;

    switch (searchType) {
      case '제목':
        return notice.title.toLowerCase().includes(appliedSearchTerm.toLowerCase());
      default:
        return true;
    }
  });

  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredNotices.length / itemsPerPage);
  const currentItems = filteredNotices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    setAppliedSearchTerm(searchTerm); // 현재 입력값을 실제 검색어로 적용
    setCurrentPage(1); // 검색 시 첫 페이지로 이동
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter'){
        handleSearch();
    }
  }

  const handleRowClick = (id: number) => {
    router.push(`/notice/${id}`);
  };

  return (
    <Container>
      <Sidebar>
        <Title>공지사항</Title>
      </Sidebar>
      <Main>
        <BoardContainer>
          <BoardTitle>공지사항</BoardTitle>
          <SearchSection>
            <SearchSelect
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="제목">제목</option>
            </SearchSelect>
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
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
            >
              {'<<'}
            </PageButton>
            <PageButton
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              {'<'}
            </PageButton>
            {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
              <PageButton
                key={page}
                $active={currentPage === page}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </PageButton>
            ))}
            <PageButton
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, pageCount))
              }
              disabled={currentPage === pageCount}
            >
              {'>'}
            </PageButton>
            <PageButton
              onClick={() => setCurrentPage(pageCount)}
              disabled={currentPage === pageCount}
            >
              {'>>'}
            </PageButton>
          </Pagination>
          {isAdmin && (
            <FooterContainer>
              <WriteButton onClick={() => router.push('/notice/writeNoti')}>
                작성하기
              </WriteButton>
            </FooterContainer>
          )}
        </BoardContainer>
      </Main>
    </Container>
  );
};

export default NoticeListPage;
