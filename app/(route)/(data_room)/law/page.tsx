"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect, Suspense } from "react";
import { CheckCircle } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Container,
  Sidebar,
  SidebarToggle, // 추가: 모바일에서 사이드바 열기 버튼
  CloseButton, // 추가: 모바일에서 사이드바 닫기 버튼
  Main,
  SearchSection,
  SearchInput,
  SearchButton,
  Table,
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
  StyledIcon,
  SidebarTitle,
  MoreButton,
  InfoSectionWrapper,
  InfoLink,
} from "./law.styled";

const categories = ["전체", "공정거래법", "약관법", "전자상거래법", "대규모유통업법", "기타"];

interface Law {
  law_id: number;
  law_category: string;
  law_title: string;
  law_part: string;
  law_link: string;
}

function LawContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [laws, setLaws] = useState<Law[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [showMoreInfo, setShowMoreInfo] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false); // 추가: 사이드바 상태

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
      setSearchKeyword(searchQuery);
    }

    const fetchLaws = async () => {
      try {
        const response = await fetch("/api/law");
        const data = await response.json();
        setLaws(data);
      } catch (error) {
        console.error("Failed to fetch laws:", error);
      }
    };

    fetchLaws();
  }, [searchParams]);

  const filteredLaws = laws.filter((law) => {
    const matchesCategory = selectedCategory === "전체" || law.law_category === selectedCategory;
    const matchesSearch =
      searchKeyword === "" || law.law_title.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredLaws.length / itemsPerPage);
  const currentItems = filteredLaws.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  return (
    <Container>
      {/* 모바일용 사이드바 토글 버튼 */}
      <SidebarToggle onClick={() => setSidebarOpen(!isSidebarOpen)}>메뉴</SidebarToggle>

      {/* 사이드바 */}
      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarTitle>자료실</SidebarTitle>
        <MenuList>
          <MenuItem $active={pathname === "/archive"} onClick={() => router.push("/archive")}>
            표준계약서
          </MenuItem>
          <MenuItem $active={pathname === "/law"} onClick={() => router.push("/law")}>
            법령
          </MenuItem>
        </MenuList>
        <CloseButton onClick={() => setSidebarOpen(false)}>닫기</CloseButton>
      </Sidebar>

      <Main>
        <MainTitle>법령</MainTitle>

        <InfoSectionWrapper>
          <InfoSection>
            {[  
              {
                text: (
                  <>
                    <InfoLink href="http://www.law.go.kr" target="_blank" rel="noopener noreferrer">
                      http://www.law.go.kr
                    </InfoLink>
                    에서도 위원회소관법령을 확인할 수 있습니다.
                  </>
                ),
              },
              { text: "고시 · 지침 등의 행정규칙은 제 · 개정 사항이 반영되는 데 일주일 정도 소요되는 경우가 있으므로 최근 제 · 개정 사항은 '공정위뉴스 > 행정규칙 제 · 개정 공지'에서도 확인해 주시기 바랍니다." },
              { text: "본 페이지의 다양한 법령정보는 국민생활의 편의를 위하여 관보 등에서 공포된 내용을 수집하여 제공됩니다." },
              { text: "본 페이지에서 제공되는 법령정보는 법적 효력이 없으므로, 참고자료로 활용하시기 바랍니다." },
              { text: "헌법, 법률, 조약, 대통령령, 행정규칙, 자치법규, 판례 등 대한민국 법령정보에 대한 효력은 관보 등에 있습니다." },
              { text: "외국어번역 법령정보는 공식적 효력이 있는 번역물이 아니므로 참고로만 사용하시기 바랍니다." },
              { text: "국문 법령과 외국어번역 법령정보 간에 의미상 차이가 있는 경우에는 국문 법령정보가 우선권을 가집니다." },
            ].map((info, index) => (
              <InfoItem key={index} className={index >= 3 && !showMoreInfo ? "collapsed" : ""}>
                <StyledIcon>
                  <CheckCircle size={16} />
                </StyledIcon>
                <span>{info.text}</span>
              </InfoItem>
            ))}

            <MoreButton onClick={() => setShowMoreInfo(!showMoreInfo)}>
              {showMoreInfo ? "접기 ▲" : "더보기 ▼"}
            </MoreButton>
          </InfoSection>
        </InfoSectionWrapper>

        <CategoryButtons>
          {categories.map((category) => (
            <CategoryButton key={category} $active={selectedCategory === category} onClick={() => setSelectedCategory(category)}>
              {category}
            </CategoryButton>
          ))}
        </CategoryButtons>

        <SearchSection>
          <SearchInput type="text" placeholder="검색어를 입력하세요" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <SearchButton onClick={() => setSearchKeyword(searchTerm)}>검색</SearchButton>
        </SearchSection>

        <Table>
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
                  <LawLink href={law.law_link} target="_blank">{law.law_title}</LawLink>
                </td>
                <td>{law.law_part}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Pagination>
          <PageButton onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>{"<"}</PageButton>
          {[...Array(pageCount)].map((_, i) => (
            <PageButton key={i} onClick={() => setCurrentPage(i + 1)} $active={currentPage === i + 1}>
              {i + 1}
            </PageButton>
          ))}
          <PageButton onClick={() => setCurrentPage(Math.min(pageCount, currentPage + 1))}>{">"}</PageButton>
        </Pagination>
      </Main>
    </Container>
  );
}

export default function LawsAndRegulationsPage() {
  return <Suspense fallback={<div>Loading...</div>}><LawContent /></Suspense>;
}
