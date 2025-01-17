"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Container,
  Sidebar,
  Main,
  Title,
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
  ar_file_url: string;
}

const StandardContractsPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchType, setSearchType] = useState("제목");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [contracts, setContracts] = useState<Archive[]>([]);

  useEffect(() => {
    const searchQuery = searchParams?.get("search") || "";
    setSearchTerm(searchQuery);

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

  const filteredContracts = contracts.filter((contract) => {
    const searchValue = searchTerm.toLowerCase();
    if (!searchValue) return true;
    if (searchType === "제목") {
      return contract.ar_title.toLowerCase().includes(searchValue);
    }
    return false;
  });

  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredContracts.length / itemsPerPage);
  const currentItems = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setCurrentPage(1);
    router.push(`/archive?search=${searchTerm}`);
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("ko-KR");
  };

  const handleDownload = (e: React.MouseEvent, ar_id: number) => {
    e.stopPropagation();
    console.log("Downloading document:", ar_id);
  };

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>자료실</SidebarTitle>
        <MenuList>
          <MenuItem
            $active={pathname === "/archive"}
            onClick={() => router.push("/archive")}
          >
            표준계약서
          </MenuItem>
          <MenuItem
            $active={pathname === "/law"}
            onClick={() => router.push("/law")}
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
          <ExplanationTextContainer>
            <ExplanationText>
              표준약품거래계약서는 대규모유통업법 및 업계 현실 등을 반영하여 법위반을
              최소화하고 거래당사자 사이의 분쟁소지를 예방할 목적으로 보급하는
              것이며, 공정위는 이 표준약품거래계약서의 사용을 권장하고 있습니다.
              이와 관련하여 문의사항이 있으시면{' '}
              <a
                href="https://www.ftc.go.kr"
                target="_blank"
                rel="noopener noreferrer"
              >
                유통거래정책과
              </a>{' '}
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
              <tr key={contract.ar_id}>
                <td>{contract.ar_id}</td>
                <td>{contract.ar_title}</td>
                <td>{contract.ar_part}</td>
                <td>{formatDate(contract.ar_date)}</td>
                <td>
                  <AttachmentIcon
                    onClick={(e) => handleDownload(e, contract.ar_id)}
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
          >
            {'<'}
          </PageButton>
          {[...Array(5)].map((_, i) => {
            const pageNumber = currentPage - 2 + i;
            if (pageNumber > 0 && pageNumber <= pageCount) {
              return (
                <PageButton
                  key={`page-${pageNumber}`}
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
      </Main>
    </Container>
  );
};

export default dynamic(() => Promise.resolve(StandardContractsPage), {
  ssr: false,
});
