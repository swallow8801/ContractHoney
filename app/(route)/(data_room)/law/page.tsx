'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Check } from 'lucide-react';
import {
  Container,
  Sidebar,
  Main,
  Title,
  SearchSection,
  SearchSelect,
  SearchInput,
  SearchButton,
  LawTable,
  Pagination,
  PageButton,
  MenuList,
  MenuItem,
  MainTitle,
  InfoSection,
  InfoItem,
  CategoryButtons,
  CategoryButton,
  LawLink,
} from './law.styled';

const categories = ['전체', '공정거래법', '약관법', '전자상거래법', '대규모유통업법', '기타'];

const laws = [
  { category: '공정거래법', title: '독점규제 및 공정거래에 관한 법률', department: '경쟁정책과', link: 'https://www.law.go.kr/법령/독점규제및공정거래에관한법률' },
  { category: '공정거래법', title: '독점규제 및 공정거래에 관한 법률 시행령', department: '경쟁정책과', link: 'https://www.law.go.kr/법령/독점규제및공정거래에관한법률시행령' },
  { category: '약관법', title: '약관의 규제에 관한 법률', department: '약관심사과', link: 'https://www.law.go.kr/법령/약관의규제에관한법률' },
  { category: '전자상거래법', title: '전자상거래 등에서의 소비자보호에 관한 법률', department: '전자거래과', link: 'https://www.law.go.kr/법령/전자상거래등에서의소비자보호에관한법률' },
  { category: '대규모유통업법', title: '대규모유통업에서의 거래 공정화에 관한 법률', department: '유통정책과', link: 'https://www.law.go.kr/법령/대규모유통업에서의거래공정화에관한법률' },
];

const LawsAndRegulationsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [searchType, setSearchType] = useState('제목');
  const [searchTerm, setSearchTerm] = useState(''); // 입력 필드의 값
  const [searchKeyword, setSearchKeyword] = useState(''); // 검색 버튼 클릭 시 반영될 값
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const infoItems = [
    'http://www.law.go.kr에서도 위원회소관법령을 확인할 수 있습니다.',
    '고시, 지침 등의 행정규칙은 제·개정 사항이 발령되는 대 일주일 정도 소요되는 경우가 있으므로 최근 제·개정 사항은 중앙행정기관 홈페이지 제·개정 공지에서도 확인해 주시기 바랍니다.',
    '본 페이지의 다양한 법령정보는 국민생활의 편의를 위하여 권보 등에서 공포된 내용을 수집하여 제공됩니다.',
    '본 페이지에서 제공되는 법령정보는 법적 효력이 없으므로, 참고자료로 활용하시기 바랍니다.',
    '헌법, 법률, 조약, 대통령령, 행정규칙, 자치법규, 판례 등 대한민국 법령정보에 대한 포괄적 공보 등에 있습니다.',
    '외국어번역 법령정보는 공식적 효력이 있는 법령들이 아니므로 참고로만 사용하시기 바랍니다.',
    '국문 법령과 외국어번역 법령정보 간에 의미상 차이가 있는 경우에는 국문 법령정보가 우선함을 기억합니다.',
  ];

  const filteredLaws = laws.filter(law => {
    const matchesCategory = selectedCategory === '전체' || law.category === selectedCategory;
    const matchesSearch =
      searchKeyword === '' || // 버튼 클릭으로 설정된 값 사용
      (searchType === '제목' && law.title.toLowerCase().includes(searchKeyword.toLowerCase())) ||
      (searchType === '제목+내용' && law.title.toLowerCase().includes(searchKeyword.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredLaws.length / itemsPerPage);
  const currentItems = filteredLaws.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setSearchKeyword(searchTerm); // 버튼 클릭 시에만 검색어 반영
    setCurrentPage(1); // 검색 결과 첫 페이지로 이동
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
        <MainTitle>법령</MainTitle>

        <InfoSection>
          {infoItems.map((item, index) => (
            <InfoItem key={index}>
              <Check size={16} />
              <span>{item}</span>
            </InfoItem>
          ))}
        </InfoSection>

        <CategoryButtons>
          {categories.map((category) => (
            <CategoryButton
              key={category}
              $active={selectedCategory === category}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryButtons>

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

        <LawTable>
          <thead>
            <tr>
              <th>구분</th>
              <th>법령명</th>
              <th>담당부서</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((law, index) => (
              <tr key={index}>
                <td>{law.category}</td>
                <td>
                  <LawLink
                    href={law.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {law.title}
                  </LawLink>
                </td>
                <td>{law.department}</td>
              </tr>
            ))}
          </tbody>
        </LawTable>

        <Pagination>
          <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
            {'<<'}
          </PageButton>
          <PageButton
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
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
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            {'>'}
          </PageButton>
          <PageButton onClick={() => setCurrentPage(pageCount)} disabled={currentPage === pageCount}>
            {'>>'}
          </PageButton>
        </Pagination>
      </Main>
    </Container>
  );
};

export default LawsAndRegulationsPage;