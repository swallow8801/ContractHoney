'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { 
  Container, 
  Sidebar, 
  Main, 
  Title, 
  QNATitle, 
  Table, 
  WriteButton, 
  MenuItem, 
  MenuList,
  SearchSection,
  SearchSelect,
  SearchInput,
  SearchButton,
  Pagination,
  PageButton
} from './qna.styled';

interface QnAItem {
  id: string;
  type: 'question' | 'answer';
  parentId?: string;
  title: string;
  content: string;
  date: string;
}

const QNA = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchType, setSearchType] = useState('제목');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const qna: QnAItem[] = [
    { id: '1', type: 'question', title: 'Q&A1', content: 'Q&A1 질문 내용', date: '2025-01-10' },
    { id: '1-A', type: 'answer', parentId: '1', title: 'Q&A1 답변', content: 'Q&A1 답변 내용', date: '2025-01-11' },
    { id: '2', type: 'question', title: 'Q&A 제목 2', content: 'Q&A2 질문 내용', date: '2025-01-09' },
    { id: '3', type: 'question', title: 'Q&A 제목 3', content: 'Q&A3 질문 내용', date: '2025-01-08' },
    { id: '4', type: 'question', title: 'Q&A 제목 4', content: 'Q&A4 질문 내용', date: '2025-01-07' },
    { id: '5', type: 'question', title: 'Q&A 제목 5', content: 'Q&A5 질문 내용', date: '2025-01-06' },
    { id: '6', type: 'question', title: 'Q&A 제목 6', content: 'Q&A6 질문 내용', date: '2025-01-05' },
  ];

  const filteredQnA = qna.filter(item => {
    if (searchTerm === '') return true;
    
    switch (searchType) {
      case '제목':
        return item.title.toLowerCase().includes(searchTerm.toLowerCase());
      case '내용':
        return item.content.toLowerCase().includes(searchTerm.toLowerCase());
      case '제목+내용':
        return item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
               item.content.toLowerCase().includes(searchTerm.toLowerCase());
      default:
        return true;
    }
  });

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredQnA.length / itemsPerPage);
  const currentItems = filteredQnA.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleRowClick = (id: string) => {
    const parentId = id.includes('-A') ? id.split('-')[0] : id;
    router.push(`/qna/${parentId}`);
  };

  return (
    <Container>
      <Sidebar>
        <Title>고객지원</Title>
        <MenuList>
          <MenuItem 
            $active={pathname === '/faq'}
            onClick={() => router.push('/faq')}
          >
            자주 묻는 질문
          </MenuItem>
          <MenuItem
            $active={pathname === '/qna'}
            onClick={() => router.push('/qna')}
          >
            Q&A
          </MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <QNATitle>Q&A</QNATitle>
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
        <Table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성일</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item) => (
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
        <WriteButton onClick={() => router.push('/qna/writeQnA')}>질문하기</WriteButton>
      </Main>
    </Container>
  );
};

export default QNA;

