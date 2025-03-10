"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";
import {
  Container,
  Sidebar,
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
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
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
  const [searchType, setSearchType] = useState('제목');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [contracts, setContracts] = useState<Archive[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const searchQuery = searchParams.get('search');
    if (searchQuery) {
      setSearchTerm(searchQuery);
      setSearchKeyword(searchQuery);
    }

    const fetchContracts = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/archive");
        const data = await response.json();
        setContracts(data);
      } catch (error) {
        console.error("Failed to fetch contracts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContracts();
  }, [searchParams]);

  const filteredContracts = contracts.filter((contract) => {
    const matchesSearch =
    searchKeyword === '' ||
    (searchType === '제목' && contract.ar_title.toLowerCase().includes(searchKeyword.toLowerCase()));

    return matchesSearch;
  });

  const itemsPerPage = 10;
  const pageCount = Math.ceil(filteredContracts.length / itemsPerPage);
  const currentItems = filteredContracts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    setSearchKeyword(searchTerm);
    setCurrentPage(1);
    router.push(`/archive?search=${searchTerm}`);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
  
    // 검색어가 비어 있으면 전체 목록 표시
    if (value.trim() === '') {
      setSearchKeyword('');
      setCurrentPage(1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSearch();
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toLocaleDateString("ko-KR");
  };

  const handleDownload = async (e: React.MouseEvent, ar_id: number) => {
    e.stopPropagation();
  
    // 선택된 계약서 정보 가져오기
    const contract = contracts.find((c) => c.ar_id === ar_id);
    if (!contract) {
      console.error("Contract not found.");
      return;
    }
  
    try {
      // API 호출하여 파일 다운로드
      const response = await fetch(`/api/download?fileId=${contract.ar_id}`);
  
      if (!response.ok) {
        throw new Error(`Failed to download file: ${response.statusText}`);
      }
  
      // Blob 데이터를 생성하여 브라우저에서 다운로드 처리
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      // 파일 이름을 안전하게 처리
      const fileName = contract.ar_filename.split("/").pop() || "downloaded_file";
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      // 다운로드 후 URL 해제
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("파일 다운로드에 실패했습니다. 다시 시도해주세요.");
    }
  };

  if (isLoading) {
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
                  onChange={handleChange}
                  onKeyDown={handleKeyDown}
                />
                <SearchButton onClick={handleSearch}>검색</SearchButton>
              </SearchSection>
              <LoadingContainer>
                <LoadingSpinner />
                <LoadingText>표준계약서 목록을 불러오는 중입니다...</LoadingText>
              </LoadingContainer>
            </Main>
          </Container>
        )
      }
  
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
            onChange={handleChange}
            onKeyDown={handleKeyDown}
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
          {/* 이전 그룹으로 이동 */}
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 10, 1))}
            disabled={currentPage <= 10}
          >
            {"<<"}
          </PageButton>

          {/* 이전 페이지로 이동 */}
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            {"<"}
          </PageButton>

          {/* 페이지 번호 표시 */}
          {[...Array(10)].map((_, i) => {
            const pageNumber = Math.floor((currentPage - 1) / 10) * 10 + i + 1;
            if (pageNumber > pageCount) return null; // 페이지 번호가 최대 페이지 수를 초과하면 렌더링 안 함
            return (
              <PageButton
                key={pageNumber}
                onClick={() => setCurrentPage(pageNumber)}
                $active={currentPage === pageNumber}
              >
                {pageNumber}
              </PageButton>
            );
          })}

          {/* 다음 페이지로 이동 */}
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            {">"}
          </PageButton>

          {/* 다음 그룹으로 이동 */}
          <PageButton
            onClick={() => setCurrentPage((prev) => Math.min(prev + 10, pageCount))}
            disabled={currentPage > pageCount - 10}
          >
            {">>"}
          </PageButton>
        </Pagination>
      </Main>
    </Container>
  );
};

export default dynamic(() => Promise.resolve(StandardContractsPage), {
  ssr: false,
});
