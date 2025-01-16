'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import React, { useState, useEffect } from 'react';
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
  PageInfo,
} from './archive.styled';

interface Archive {
  id: number;
  ar_title: string;
  ar_part: string;
  ar_date: string;
  ar_file_url: string;
}

const StandardContractsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState('제목');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contracts, setContracts] = useState<Archive[]>([]);

  // 페이지 로드 시 계약서 목록을 API에서 가져옵니다.
  useEffect(() => {
    // URL에서 search 파라미터 가져오기
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
    }

    // API에서 데이터 가져오기
    const fetchContracts = async () => {
      try {
        const response = await fetch('/api/archive');
        const data = await response.json();
        setContracts(data);  // 계약서 목록을 상태에 저장
      } catch (error) {
        console.error('Failed to fetch contracts:', error);
      }
    };

    fetchContracts();
  }, [searchParams]);

  const filteredContracts = contracts.filter((contract) => {
    const searchValue = searchTerm.toLowerCase();
    if (!searchValue) return true;
    if (searchType === '제목') {
      return contract.ar_title.toLowerCase().includes(searchValue);
    }
    return false;
  });

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredContracts.length / itemsPerPage);
  const currentItems = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // 검색 시 URL에 검색어 추가
  const handleSearch = () => {
    setCurrentPage(1);
    router.push(`/archive?search=${searchTerm}`);
  };

  // 날짜 형식 변경 함수
  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString('ko-KR');  // '2024-11-27' 형식으로 변환
  };

  const handleDownload = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    console.log('Downloading document:', id);
  };

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
            표준약품거래계약서는 대규모유통업법 및 업계 현실 등을 반영하여 법위반을 최소화하고 거래당사자 사이의 분쟁소지를 예방할 목적으로 보급하는 것이며, 공정위는 이 표준약품거래계약서의 사용을 권장하고 있습니다. 이와 관련하여 문의사항이 있으시면{' '}
            <a href="https://www.ftc.go.kr" target="_blank" rel="noopener noreferrer">
              유통거래정책과
            </a>{' '}
            로 문의하시기 바랍니다.
            <PhoneNumber>(044)200-4966</PhoneNumber>
          </ExplanationText>
        </ExplanationSection>
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
                <td>{contract.ar_title}</td>
                <td>{contract.ar_part}</td>
                <td>{formatDate(contract.ar_date)}</td> {/* 개정일 포맷 적용 */}
                <td style={{ textAlign: 'center', verticalAlign: 'middle' }}>
                  <AttachmentIcon
                    onClick={(e) => handleDownload(e, contract.id)}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    }}
                  >
                    <Download size={16} />
                  </AttachmentIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </ArchiveTable>

        <Pagination>
          <PageButton 
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            이전
          </PageButton>
          <PageInfo>{currentPage} / {pageCount}</PageInfo>
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
            aria-label="Next page"
          >
            다음
          </PageButton>
        </Pagination>
      </Main>
    </Container>
  );
};

export default StandardContractsPage;

