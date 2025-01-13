'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Download } from 'lucide-react';
import {
  Container,
  Sidebar,
  Main,
  Title,
  SearchSection,
  SearchSelect,
  SearchInput,
  SearchButton,
  ArchiveTable,
  AttachmentIcon,
  Pagination,
  PageButton,
  MenuList,
  MenuItem,
  MainTitle,
  ExplanationSection,
  LogoImage,
  ExplanationText,
  PhoneNumber,
} from './archive.styled';

interface Contract {
  id: number;
  title: string;
  department: string;
  date: string;
}

const StandardContractsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchType, setSearchType] = useState('제목');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // 표준계약서 목록 데이터
  const standardContracts: Contract[] = [
    { 
      id: 10, 
      title: '(개정) 특약매입 표준거래계약서 (백화점, 대형마트)', 
      department: '유통대리점정책과',
      date: '2024-11-28',
    },
    { 
      id: 9, 
      title: '(개정) 특약매입 표준거래계약서 (면세점)', 
      department: '유통대리점정책과',
      date: '2024-11-28',
    },
    { 
      id: 8, 
      title: '(개정) 직매입 표준거래계약서 (편의점)', 
      department: '유통대리점정책과',
      date: '2024-11-28',
    },
    { 
      id: 7, 
      title: '(개정) 직매입 표준거래계약서(백화점, 대형마트)', 
      department: '유통대리점정책과',
      date: '2024-11-28',
    },
    { 
      id: 6, 
      title: '(개정) 직매입 표준거래계약서 (면세점)', 
      department: '유통대리점정책과',
      date: '2024-11-28',
    },
  ];

  const [filteredContracts, setFilteredContracts] = useState<Contract[]>(standardContracts);

  const handleSearch = () => {
    const filtered = standardContracts.filter(contract => {
      if (searchTerm === '') return true;
      
      switch (searchType) {
        case '제목':
          return contract.title.toLowerCase().includes(searchTerm.toLowerCase());
        case '내용':
          // Assuming 'content' is not available in the current data structure
          return false;
        case '제목+내용':
          return contract.title.toLowerCase().includes(searchTerm.toLowerCase());
        default:
          return true;
      }
    });
    setFilteredContracts(filtered);
    setCurrentPage(1);
  };

  const handleDownload = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log('Downloading document:', id);
  };

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredContracts.length / itemsPerPage);
  const currentItems = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Container>
      <Sidebar>
        <Title>자료실</Title>
        <MenuList>
          <MenuItem 
            $active={pathname === '/archive'}
            onClick={() => router.push('/archive')}
          >
            표준계약서
          </MenuItem>
          <MenuItem
            $active={pathname === '/law'}
            onClick={() => router.push('/law')}
          >
            법령
          </MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <MainTitle>표준계약서</MainTitle>
        <ExplanationSection>
          <LogoImage 
            src="/images/공정거래위원회.png" 
            alt="공정거래위원회" 
          />
          <ExplanationText>
            표준약품거래계약서는 대규모유통업법 및 업계 현실 등을 반영하여 법위반을 최소화하고 거래당사자 사이의 분쟁소지를 예방할 목적으로 보급하는 것이며, 공정위는 이 표준약품거래계약서의 사용을 권장하고 있습니다. 이와 관련하여 문의사항이 있으시면 <a href="https://www.ftc.go.kr" target="_blank" rel="noopener noreferrer">유통거래정책과</a>로 문의하시기 바랍니다.
            <PhoneNumber>(044)200-4966</PhoneNumber>
          </ExplanationText>
        </ExplanationSection>
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

        <ArchiveTable>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>담당부서</th>
              <th>개정일</th>
              <th>첨부</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((contract) => (
              <tr key={contract.id}>
                <td>{contract.id}</td>
                <td>{contract.title}</td>
                <td>{contract.department}</td>
                <td>{contract.date}</td>
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <AttachmentIcon 
                    onClick={(e) => handleDownload(e, contract.id)}
                    style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                  >
                    <Download size={16} />
                  </AttachmentIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </ArchiveTable>

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
      </Main>
    </Container>
  );
};

export default StandardContractsPage;

