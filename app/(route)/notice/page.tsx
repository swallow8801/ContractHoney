'use client'

import { useRouter, usePathname } from 'next/navigation';
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
  author: string;
  date: string;
}

const NoticeListPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchType, setSearchType] = useState('제목');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isAdmin, setIsAdmin] = useState(false); // 관리자인지 확인하는 상태 추가

  // 사용자 권한 확인 (localStorage에서 가져오기)
  useEffect(() => {
    const userAdmin = localStorage.getItem('admin');
    if (userAdmin === '1') {
      setIsAdmin(true); // 관리자인 경우
    }
  }, []);

  // 공지사항 목록 데이터
  const notices: Notice[] = [
    { id: 1, title: '공지사항 제목 1', author: '관리자', date: '2025-01-04' },
    { id: 2, title: '공지사항 제목 2', author: '관리자', date: '2025-01-05' },
    { id: 3, title: '공지사항 제목 3', author: '관리자', date: '2025-01-06' },
    { id: 4, title: '공지사항 제목 4', author: '관리자', date: '2025-01-07' },
    { id: 5, title: '공지사항 제목 5', author: '관리자', date: '2025-01-08' },
    { id: 6, title: '공지사항 제목 6', author: '관리자', date: '2025-01-09' },
    { id: 7, title: '공지사항 제목 7', author: '관리자', date: '2025-01-10' },
  ];

  const filteredNotices = notices.filter(notice => {
    if (searchTerm === '') return true;
    
    switch (searchType) {
      case '제목':
        return notice.title.toLowerCase().includes(searchTerm.toLowerCase());
      case '내용':
        // Assuming we don't have content in our current data structure
        return false;
      case '제목+내용':
        return notice.title.toLowerCase().includes(searchTerm.toLowerCase());
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

  const handleSearch = () => {
    setCurrentPage(1);
  };

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
                <option value="내용">내용</option>
                <option value="제목+내용">제목+내용</option>
                </SearchSelect>
                <SearchInput
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <SearchButton onClick={handleSearch}>검색</SearchButton>
            </SearchSection>
            <BoardTable>
                <thead>
                <tr>
                    <th>번호</th>
                    <th>제목</th>
                    <th>작성자</th>
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
                    <td>{notice.author}</td>
                    <td>{notice.date}</td>
                    </tr>
                ))}
                </tbody>
            </BoardTable>
            <Pagination>
                <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>{'<<'}</PageButton>
                <PageButton onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1}>{'<'}</PageButton>
                {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
                <PageButton
                    key={page}
                    $active={currentPage === page}
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </PageButton>
                ))}
                <PageButton onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount}>{'>'}</PageButton>
                <PageButton onClick={() => setCurrentPage(pageCount)} disabled={currentPage === pageCount}>{'>>'}</PageButton>
            </Pagination>
            {isAdmin && (
              <FooterContainer>
                <WriteButton onClick={() => router.push('/notice/writeNoti')}>작성하기</WriteButton>
              </FooterContainer>
            )}
            </BoardContainer>
        </Main>
    </Container>
  );
};

export default NoticeListPage;
