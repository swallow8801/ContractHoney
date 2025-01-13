'use client'

import { Share, ChevronUp, ChevronDown } from 'lucide-react'
import { useState, useMemo, useEffect } from 'react'
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
  FileSize,
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
} from './manage_cont.styled'

interface Document {
  id: string
  name: string
  format: string
  size: string
  date: string
  versions: number
  summary?: {
    parties: string
    duration: string
    unfairClauses: number
    toxicClauses: number
  }
}

const documents: Document[] = [
  {
    id: '1',
    name: '재엽계약서',
    format: '.hwp',
    size: '3.71MB',
    date: '2025. 01. 03',
    versions: 1,
    summary: {
      parties: '갑: 주식회사 A / 을: 주식회사 B',
      duration: '2025.01.03 ~ 2026.01.02',
      unfairClauses: 2,
      toxicClauses: 1,
    }
  },
  {
    id: '2',
    name: '미소계약서',
    format: '.hwp',
    size: '4.61MB',
    date: '2025. 01. 04',
    versions: 3,
    summary: {
      parties: '-',
      duration: '-',
      unfairClauses: 0,
      toxicClauses: 0,
    }
  },
  {
    id: '3',
    name: '종환계약서',
    format: '.hwp',
    size: '2.89MB',
    date: '2025. 01. 05',
    versions: 1,
    summary: {
      parties: '-',
      duration: '-',
      unfairClauses: 0,
      toxicClauses: 0,
    }
  },
  {
    id: '4',
    name: '광훈계약서',
    format: '.pdf',
    size: '2.83MB',
    date: '2025. 01. 06',
    versions: 1,
    summary: {
      parties: '-',
      duration: '-',
      unfairClauses: 0,
      toxicClauses: 0,
    }
  },
  {
    id: '5',
    name: '팡훈계약서',
    format: '.pdf',
    size: '6.48MB',
    date: '2025. 01. 07',
    versions: 1,
    summary: {
      parties: '-',
      duration: '-',
      unfairClauses: 0,
      toxicClauses: 0,
    }
  },
  {
    id: '6',
    name: '명재계약서',
    format: '.hwp',
    size: '3.92MB',
    date: '2025. 01. 08',
    versions: 2,
    summary: {
      parties: '-',
      duration: '-',
      unfairClauses: 0,
      toxicClauses: 0,
    }
  },
  {
    id: '7',
    name: '진석계약서',
    format: '.pdf',
    size: '5.17MB',
    date: '2025. 01. 09',
    versions: 1,
    summary: {
      parties: '-',
      duration: '-',
      unfairClauses: 0,
      toxicClauses: 0,
    }
  },
  {
    id: '8',
    name: '계승계약서',
    format: '.hwp',
    size: '4.23MB',
    date: '2025. 01. 10',
    versions: 2,
    summary: {
      parties: '-',
      duration: '-',
      unfairClauses: 0,
      toxicClauses: 0,
    }
  },
]

type SortField = 'name' | 'date'
type SortOrder = 'asc' | 'desc'

export default function ManageContracts() {
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc')
  const [currentPage, setCurrentPage] = useState(1)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 0)
  const itemsPerPage = 5

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const filteredAndSortedDocuments = useMemo(() => {
    return documents
      .filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .sort((a, b) => {
        if (sortField === 'name') {
          return sortOrder === 'asc' 
            ? a.name.localeCompare(b.name)
            : b.name.localeCompare(a.name)
        } else if (sortField === 'date') {
          return sortOrder === 'asc'
            ? new Date(a.date).getTime() - new Date(b.date).getTime()
            : new Date(b.date).getTime() - new Date(a.date).getTime()
        }
        return 0
      })
  }, [searchTerm, sortField, sortOrder])

  const pageCount = Math.ceil(filteredAndSortedDocuments.length / itemsPerPage)
  const currentItems = filteredAndSortedDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value)
    setCurrentPage(1)
  }

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortOrder('asc')
    }
    setCurrentPage(1)
  }

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
  }

  return (
    <Container>
      <MainContent>
        <HeaderContainer>
          <TitleContainer>
            <Title>계약서 분석 기록</Title>
            <TotalCount>총 {filteredAndSortedDocuments.length}건</TotalCount>
          </TitleContainer>
          <SearchContainer>
            <SearchInput
              type="text"
              placeholder="계약서 이름으로 검색"
              value={searchTerm}
              onChange={handleSearch}
            />
          </SearchContainer>
        </HeaderContainer>

        <SummaryBox>
          <tbody>
            <tr>
              <SummaryTh>계약서 이름</SummaryTh>
              <SummaryTd>{selectedDoc?.name || '-'}</SummaryTd>
            </tr>
            <tr>
              <SummaryTh>계약 당사자</SummaryTh>
              <SummaryTd>{selectedDoc?.summary?.parties || '-'}</SummaryTd>
            </tr>
            <tr>
              <SummaryTh>계약 기간</SummaryTh>
              <SummaryTd>{selectedDoc?.summary?.duration || '-'}</SummaryTd>
            </tr>
            <tr>
              <SummaryTh>판별된 불공정조항 수</SummaryTh>
              <SummaryTd>{selectedDoc?.summary?.unfairClauses || '0'}</SummaryTd>
            </tr>
            <tr>
              <SummaryTh>판별된 독소조항 수</SummaryTh>
              <SummaryTd>{selectedDoc?.summary?.toxicClauses || '0'}</SummaryTd>
            </tr>
          </tbody>
        </SummaryBox>

        <Table>
          <thead>
            <tr>
              <Th $sortable onClick={() => handleSort('name')}>
                계약서 이름
                {sortField === 'name' && (
                  <SortIcon>
                    {sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </SortIcon>
                )}
              </Th>
              <Th>파일 포맷</Th>
              <Th>파일 크기</Th>
              <Th $sortable onClick={() => handleSort('date')}>
                분석날짜
                {sortField === 'date' && (
                  <SortIcon>
                    {sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </SortIcon>
                )}
              </Th>
              <Th>버전</Th>
              <Th>결과</Th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((doc) => (
              <tr key={doc.id}>
                {windowWidth <= 768 && (
                  <>
                    <Td>{doc.name}</Td>
                    <Td>{doc.format}</Td>
                    <Td>
                      <FileDate>{doc.date}</FileDate>
                    </Td>
                    <Td>
                      <VersionSelect defaultValue="1">
                        {Array.from({ length: doc.versions }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            ver {i + 1}
                          </option>
                        ))}
                      </VersionSelect>
                    </Td>
                    <Td>
                      <ActionButton>
                        <Share size={20} />
                      </ActionButton>
                    </Td>
                  </>
                )}
                {windowWidth > 768 && (
                  <>
                    <Td>
                      <DocumentName onClick={() => setSelectedDoc(doc)}>
                        {doc.name}
                      </DocumentName>
                    </Td>
                    <Td>{doc.format}</Td>
                    <Td>
                      <FileSize>{doc.size}</FileSize>
                    </Td>
                    <Td>
                      <FileDate>{doc.date}</FileDate>
                    </Td>
                    <Td>
                      <VersionSelect defaultValue="1">
                        {Array.from({ length: doc.versions }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            ver {i + 1}
                          </option>
                        ))}
                      </VersionSelect>
                    </Td>
                    <Td>
                      <ActionButton>
                        <Share size={20} />
                      </ActionButton>
                    </Td>
                  </>
                )}
              </tr>
            ))}
          </tbody>
        </Table>

        <PaginationContainer>
          <PaginationButton 
            onClick={() => handlePageChange(currentPage - 1)} 
            disabled={currentPage === 1}
          >
            이전
          </PaginationButton>
          <PaginationInfo>
            {currentPage} / {pageCount}
          </PaginationInfo>
          <PaginationButton 
            onClick={() => handlePageChange(currentPage + 1)} 
            disabled={currentPage === pageCount}
          >
            다음
          </PaginationButton>
        </PaginationContainer>
      </MainContent>
    </Container>
  )
}

