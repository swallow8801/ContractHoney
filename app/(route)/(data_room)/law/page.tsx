'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
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

interface Law {
  law_id: number;
  law_category: string;
  law_title: string;
  law_part: string;
  law_link: string;
}

const LawsAndRegulationsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [laws, setLaws] = useState<Law[]>([]);
  const [searchType, setSearchType] = useState('제목');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    // URL에서 search 파라미터 가져오기
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
      setSearchKeyword(searchQuery);
    }

    // API에서 데이터 가져오기
    const fetchLaws = async () => {
      try {
        const response = await fetch('/api/law');
        const data = await response.json();
        setLaws(data);
      } catch (error) {
        console.error('Failed to fetch laws:', error);
      }
    };

    fetchLaws();
  }, [searchParams]);

  const filteredLaws = laws.filter((law) => {
    const matchesCategory = selectedCategory === '전체' || law.law_category === selectedCategory;
    const matchesSearch =
      searchKeyword === '' ||
      (searchType === '제목' && law.law_title.toLowerCase().includes(searchKeyword.toLowerCase()))
    return matchesCategory && matchesSearch;
  });

  const itemsPerPage = 5;
  const pageCount = Math.ceil(filteredLaws.length / itemsPerPage);
  const currentItems = filteredLaws.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setSearchKeyword(searchTerm);
    setCurrentPage(1);
    // URL에 검색어 추가
    router.push(`/law?search=${searchTerm}`);
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
          <InfoItem>
            <Check size={16} />
            <span>http://www.law.go.kr에서도 위원회소관법령을 확인할 수 있습니다.</span>
          </InfoItem>
          <InfoItem>
            <Check size={16} />
            <span>
              고시 · 지침 등의 행정규칙은 제 · 개정 사항이 반영되는 데 일주일 정도 소요되는 경우가 있으므로
              최근 제 · 개정 사항은 '공정위뉴스 {'>'} 행정규칙 제 · 개정 공지'에서도 확인해 주시기 바랍니다.
            </span>
          </InfoItem>
          <InfoItem>
            <Check size={16} />
            <span>본 페이지의 다양한 법령정보는 국민생활의 편의를 위하여 관보 등에서 공포된 내용을 수집하여 제공됩니다.</span>
          </InfoItem>
          <InfoItem>
            <Check size={16} />
            <span>본 페이지에서 제공되는 법령정보는 법적 효력이 없으므로, 참고자료로 활용하시기 바랍니다.</span>
          </InfoItem>
          <InfoItem>
            <Check size={16} />
            <span>헌법, 법률, 조약, 대통령령, 행정규칙, 자치법규, 판례 등 대한민국 법령정보에 대한 효력은 관보 등에 있습니다.</span>
          </InfoItem>
          <InfoItem>
            <Check size={16} />
            <span>외국어번역 법령정보는 공식적 효력이 있는 번역물이 아니므로 참고로만 사용하시기 바랍니다.</span>
          </InfoItem>
          <InfoItem>
            <Check size={16} />
            <span>국문 법령과 외국어번역 법령정보 간에 의미상 차이가 있는 경우에는 국문 법령정보가 우선권을 가집니다.</span>
          </InfoItem>
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
            {currentItems.map((law) => (
              <tr key={law.law_id}>
                <td>{law.law_category}</td>
                <td>
                  <LawLink
                    href={law.law_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {law.law_title}
                  </LawLink>
                </td>
                <td>{law.law_part}</td>
              </tr>
            ))}
          </tbody>
        </LawTable>

        <Pagination>
          <PageButton onClick={() => setCurrentPage(1)} disabled={currentPage === 1}>
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
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
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
