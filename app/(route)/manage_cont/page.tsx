"use client"

import { Share, ChevronUp, ChevronDown, FileText } from "lucide-react"
import { useState, useMemo, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  Container,
  MainContent,
  HeaderContainer,
  TitleContainer,
  Title,
  TotalCount,
  Table,
  Th,
  Td,
  VersionSelect,
  ActionButton,
  FileDate,
  SummaryBox,
  SummaryTh,
  SummaryTd,
  DocumentName,
  SearchContainer,
  SearchInput,
  SortIcon,
  PaginationContainer,
  PaginationButton,
  PaginationInfo,
  EmptyStateContainer,
  EmptyStateIcon,
  EmptyStateTitle,
  EmptyStateDescription,
  EmptyStateButton,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
} from "./manage_cont.styled"

interface Contract {
  con_id: number
  con_title: string
  con_type: string
  con_updatetime: string
  con_summary: string | null
  con_version: number
}

interface GroupedContract {
  con_title: string
  con_type: string
  versions: {
    con_id: number
    con_version: number
    con_updatetime: string
  }[]
}

const groupContracts = (contracts: Contract[]): GroupedContract[] => {
  const grouped = contracts.reduce(
    (acc, contract) => {
      if (!acc[contract.con_title]) {
        acc[contract.con_title] = {
          con_title: contract.con_title,
          con_type: contract.con_type,
          versions: [],
        }
      }
      acc[contract.con_title].versions.push({
        con_id: contract.con_id,
        con_version: contract.con_version,
        con_updatetime: contract.con_updatetime,
      })
      return acc
    },
    {} as Record<string, GroupedContract>,
  )

  return Object.values(grouped).map((group) => ({
    ...group,
    versions: group.versions.sort((a, b) => b.con_version - a.con_version),
  }))
}

export default function ManageContracts() {
  const router = useRouter()
  const [contracts, setContracts] = useState<Contract[]>([])
  const [selectedDoc, setSelectedDoc] = useState<GroupedContract | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortField, setSortField] = useState<"con_title" | "con_updatetime">("con_updatetime")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [currentPage, setCurrentPage] = useState(1)
  const [windowWidth, setWindowWidth] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const itemsPerPage = 5

  useEffect(() => {
    setWindowWidth(window.innerWidth)

    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const token = localStorage.getItem("authToken")
    if (!token) {
      router.push("/login")
      return
    }

    const fetchContracts = async () => {
      setIsLoading(true)
      const startTime = Date.now()

      try {
        const response = await fetch("/api/contracts", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        if (response.status === 401) {
          localStorage.removeItem("authToken")
          router.push("/login")
          return
        }
        if (!response.ok) {
          throw new Error("Failed to fetch contracts")
        }
        const data = await response.json()
        setContracts(data)
      } catch (error) {
        console.error("Error fetching contracts:", error)
      } finally {
        const endTime = Date.now()
        const loadingTime = endTime - startTime
        const remainingTime = Math.max(2000 - loadingTime, 0)

        setTimeout(() => {
          setIsLoading(false)
        }, remainingTime)
      }
    }

    fetchContracts()
  }, [router])

  const filteredAndSortedContracts = useMemo(() => {
    const grouped = groupContracts(contracts)
    return grouped
      .filter((contract) => contract.con_title.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        if (sortField === "con_title") {
          return sortOrder === "asc" ? a.con_title.localeCompare(b.con_title) : b.con_title.localeCompare(a.con_title)
        } else if (sortField === "con_updatetime") {
          return sortOrder === "asc"
            ? new Date(a.versions[0].con_updatetime).getTime() - new Date(b.versions[0].con_updatetime).getTime()
            : new Date(b.versions[0].con_updatetime).getTime() - new Date(a.versions[0].con_updatetime).getTime()
        }
        return 0
      })
  }, [contracts, searchTerm, sortField, sortOrder])

  const pageCount = Math.ceil(filteredAndSortedContracts.length / itemsPerPage)
  const currentItems = filteredAndSortedContracts.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleSort = (field: "con_title" | "con_updatetime") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortOrder("asc")
    }
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  const handleViewResults = (contractTitle: string, version: number) => {
    const contract = contracts.find((c) => c.con_title === contractTitle && c.con_version === version)
    if (contract) {
      router.push(`/analysis?contractId=${contract.con_id}`)
    }
  }

  if (isLoading) {
    return (
      <Container>
        <MainContent>
          <HeaderContainer>
            <TitleContainer>
              <Title>계약서 분석 기록</Title>
            </TitleContainer>
          </HeaderContainer>
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>계약서 목록을 불러오는 중입니다...</LoadingText>
          </LoadingContainer>
        </MainContent>
      </Container>
    )
  }

  if (contracts.length === 0) {
    return (
      <Container>
        <MainContent>
          <HeaderContainer>
            <TitleContainer>
              <Title>계약서 분석 기록</Title>
            </TitleContainer>
          </HeaderContainer>
          <EmptyStateContainer>
            <EmptyStateIcon>
              <FileText size={64} />
            </EmptyStateIcon>
            <EmptyStateTitle>분석된 계약서가 없습니다</EmptyStateTitle>
            <EmptyStateDescription>
              계약서를 업로드하고 분석을 시작해보세요. 분석된 계약서의 결과를 여기서 확인할 수 있습니다.
            </EmptyStateDescription>
            <EmptyStateButton onClick={() => router.push("/")}>메인으로 돌아가기</EmptyStateButton>
          </EmptyStateContainer>
        </MainContent>
      </Container>
    )
  }

  return (
    <Container>
      <MainContent>
        <HeaderContainer>
          <TitleContainer>
            <Title>계약서 분석 기록</Title>
            <TotalCount>총 {filteredAndSortedContracts.length}건</TotalCount>
          </TitleContainer>
          <SearchContainer>
            <SearchInput type="text" placeholder="계약서 이름으로 검색" value={searchTerm} onChange={handleSearch} />
          </SearchContainer>
        </HeaderContainer>

        <SummaryBox>
          <tbody>
            <tr>
              <SummaryTh>계약서 이름</SummaryTh>
              <SummaryTd>{selectedDoc?.con_title || "-"}</SummaryTd>
            </tr>
            <tr>
              <SummaryTh>계약 종류</SummaryTh>
              <SummaryTd>{selectedDoc?.con_type || "-"}</SummaryTd>
            </tr>
            <tr>
              <SummaryTh>계약 요약</SummaryTh>
              <SummaryTd>{selectedDoc?.versions[0]?.con_updatetime || "-"}</SummaryTd>
            </tr>
          </tbody>
        </SummaryBox>

        <Table>
          <thead>
            <tr>
              <Th $sortable onClick={() => handleSort("con_title")}>
                계약서 이름
                {sortField === "con_title" && (
                  <SortIcon>{sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</SortIcon>
                )}
              </Th>
              <Th>계약 종류</Th>
              <Th $sortable onClick={() => handleSort("con_updatetime")}>
                최근 분석날짜
                {sortField === "con_updatetime" && (
                  <SortIcon>{sortOrder === "asc" ? <ChevronUp size={14} /> : <ChevronDown size={14} />}</SortIcon>
                )}
              </Th>
              <Th>버전</Th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((contract) => (
              <tr key={contract.con_title}>
                <Td className="title">
                  <DocumentName onClick={() => setSelectedDoc(contract)}>{contract.con_title}</DocumentName>
                </Td>
                <Td className="type">{contract.con_type}</Td>
                <Td className="date">
                  <FileDate>{new Date(contract.versions[0].con_updatetime).toLocaleDateString()}</FileDate>
                </Td>
                <Td className="version">
                  <VersionSelect
                    onChange={(e) => handleViewResults(contract.con_title, Number(e.target.value))}
                    defaultValue={contract.versions[0].con_version}
                  >
                    {contract.versions.map((version) => (
                      <option key={version.con_version} value={version.con_version}>
                        ver {version.con_version}
                      </option>
                    ))}
                  </VersionSelect>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>

        <PaginationContainer>
          <PaginationButton onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
            이전
          </PaginationButton>
          <PaginationInfo>
            {currentPage} / {pageCount}
          </PaginationInfo>
          <PaginationButton onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === pageCount}>
            다음
          </PaginationButton>
        </PaginationContainer>
      </MainContent>
    </Container>
  )
}

