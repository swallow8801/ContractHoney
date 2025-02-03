"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Container,
  Sidebar,
  SidebarToggle,
  CloseButton,
  Main,
  SearchSection,
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
  SidebarTitle,
  ExplanationTextContainer,
} from "./archive.styled";

interface Archive {
  ar_id: number;
  ar_title: string;
  ar_part: string;
  ar_date: string;
  ar_filename: string;
}

const StandardContractsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState("제목");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contracts, setContracts] = useState<Archive[]>([]);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const searchQuery = searchParams.get("search");
    if (searchQuery) {
      setSearchTerm(searchQuery);
      setSearchKeyword(searchQuery);
    }

    const fetchContracts = async () => {
      try {
        const response = await fetch("/api/archive");
        const data = await response.json();
        setContracts(data);
      } catch (error) {
        console.error("Failed to fetch contracts:", error);
      }
    };

    fetchContracts();
  }, [searchParams]);

  return (
    <Container>
      {/* 모바일용 사이드바 토글 버튼 */}
      <SidebarToggle onClick={() => setSidebarOpen(!isSidebarOpen)}>메뉴</SidebarToggle>

      {/* 오버레이 사이드바 */}
      <Sidebar $isOpen={isSidebarOpen}>
        <SidebarTitle>자료실</SidebarTitle>
        <MenuList>
          <MenuItem
            $active={pathname === "/archive"}
            onClick={() => {
              setSidebarOpen(false);
              router.push("/archive");
            }}
          >
            표준계약서
          </MenuItem>
          <MenuItem
            $active={pathname === "/law"}
            onClick={() => {
              setSidebarOpen(false);
              router.push("/law");
            }}
          >
            법령
          </MenuItem>
        </MenuList>

        {/* 닫기 버튼을 아래로 이동 */}
        <CloseButton onClick={() => setSidebarOpen(false)}>닫기</CloseButton>
      </Sidebar>

      <Main>
        <MainTitle>표준계약서</MainTitle>
        <ExplanationSection>
          <LogoImage src="/images/공정거래위원회.png" alt="공정거래위원회" />
          <ExplanationTextContainer>
            <ExplanationText>
              표준약품거래계약서는 대규모유통업법 및 업계 현실 등을 반영하여 법위반을
              최소화하고 거래당사자 사이의 분쟁소지를 예방할 목적으로 보급하는
              것이며, 공정위는 이 표준약품거래계약서의 사용을 권장하고 있습니다.
              이와 관련하여 문의사항이 있으시면{" "}
              <a href="https://www.ftc.go.kr" target="_blank" rel="noopener noreferrer">
                유통거래정책과
              </a>{" "}
              로 문의하시기 바랍니다.
              <PhoneNumber>(044)200-4966</PhoneNumber>
            </ExplanationText>
          </ExplanationTextContainer>
        </ExplanationSection>
        <SearchSection>
          <SearchInput
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && setSearchKeyword(searchTerm)}
          />
          <SearchButton onClick={() => setSearchKeyword(searchTerm)}>검색</SearchButton>
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
            {contracts.slice((currentPage - 1) * 10, currentPage * 10).map((contract) => (
              <tr key={contract.ar_id}>
                <td>{contract.ar_id}</td>
                <td>{contract.ar_title}</td>
                <td>{contract.ar_part}</td>
                <td>{contract.ar_date}</td>
                <td>
                  <AttachmentIcon>
                    <Download size={16} />
                  </AttachmentIcon>
                </td>
              </tr>
            ))}
          </tbody>
        </ArchiveTable>
        <Pagination>
          <PageButton onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}>{"<"}</PageButton>
          {[...Array(Math.ceil(contracts.length / 10))].map((_, i) => (
            <PageButton key={i} onClick={() => setCurrentPage(i + 1)} $active={currentPage === i + 1}>{i + 1}</PageButton>
          ))}
          <PageButton onClick={() => setCurrentPage(Math.min(Math.ceil(contracts.length / 10), currentPage + 1))}>{">"}</PageButton>
        </Pagination>
      </Main>
    </Container>
  );
};

export default dynamic(() => Promise.resolve(StandardContractsPage), { ssr: false });
