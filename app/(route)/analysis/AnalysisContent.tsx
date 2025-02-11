"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Share, Download, Check, GitCompare, Copy } from "lucide-react"
import {
  Container,
  PreviewSection,
  AnalysisSection,
  NavigationBar,
  DocumentTitle,
  PreviewContent,
  PdfViewerContainer,
  TabContainer,
  Tab,
  Badge,
  AnalysisContent,
  ActionButtons,
  ActionButton,
  ClauseEx,
  InfoIcon,
  ClauseContainer,
  ClauseHeader,
  ClauseContent,
  ClauseExplanation,
  ClauseCheckbox,
  SummaryContent,
  ProbabilitySection,
  ProbabilityBar,
  ProbabilityFill,
  ProbabilityLabel,
  ProbabilityContainer,
  ExplanationTitle,
  LawReference,
  LawReferenceContent,
  CheckboxContainer,
  Divider,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  SummaryContainer,
  CopyButton,
  IconWrapper,
  PageButton,
  Pagination,
} from "./analysis.styled"
import { Worker, Viewer, SpecialZoomLevel } from '@react-pdf-viewer/core';
import "@react-pdf-viewer/core/lib/styles/index.css";


interface Contract {
  con_id: number
  user_id: number
  con_title: string
  con_type: string
  con_updatetime: string
  con_version: number
}

interface ContractSummary {
  sum_id: number
  con_id: number
  sum_article_number: number
  sum_article_title: string
  sum_summary: string | null
}

interface ContractIden {
  iden_id: number
  con_id: number
  iden_article_number: number
  iden_clause_number: number | null
  iden_subclause_number: number | null
  iden_sentence: string
  iden_unfair: boolean
  iden_unfair_percent: number | null
  iden_toxic: boolean
  iden_toxic_percent: number | null
  law_article_number: number | null
  law_clause_number: number | null
  law_subclause_number: number | null
  law_explain: string | null
  checked: boolean
}

interface MyPdfViewerProps {
  contract: Contract | null;
}

function MyPdfViewer({ contract }: MyPdfViewerProps) {
  if (!contract) return null;

  return (
    <PdfViewerContainer>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.js">
        <Viewer
          fileUrl={`https://conhoneystorage.blob.core.windows.net/contract/${contract.con_title}_ver${contract.con_version}_user${contract.user_id}.pdf`}
          defaultScale={SpecialZoomLevel.PageWidth}
          withCredentials={false}
        />
      </Worker>
    </PdfViewerContainer>
  );
}



export function AnalysisPage() {
  const searchParams = useSearchParams()
  const [contract, setContract] = useState<Contract | null>(null)
  const [contractSummaries, setContractSummaries] = useState<ContractSummary[]>([])
  const [contractIdens, setContractIdens] = useState<ContractIden[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(27)
  const [activeTab, setActiveTab] = useState<"summary" | "unfair" | "toxic">("summary")
  const [currentUnfairIndex, setCurrentUnfairIndex] = useState(0)
  const [currentToxicIndex, setCurrentToxicIndex] = useState(0)

  useEffect(() => {
    const contractId = searchParams.get("contractId")
    if (contractId) {
      fetchContractData(contractId)
    }
  }, [searchParams])

  const router = useRouter()

  const fetchContractData = async (contractId: string) => {
    try {
      const token = localStorage.getItem("authToken")
      const response = await fetch(`/api/contracts/${contractId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch contract data")
      }
      const data = await response.json()
      setContract(data.contract)
      setContractSummaries(data.summaries)
      setContractIdens(data.idens.map((iden: ContractIden) => ({ ...iden, checked: false })))
    } catch (error) {
      console.error("Error fetching contract data:", error)
    }
  }

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem("authToken");
  
      if (!contract) {
        console.error("No contract to download");
        return;
      }
  
      const response = await fetch(
        `/api/download-contract?contractId=${contract.con_id}&fileName=${contract.con_title}_ver${contract.con_version}.${contract.con_type}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (!response.ok) {
        throw new Error("Failed to download file");
      }
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
  
      link.href = url;
      link.download = `${contract.con_title}_ver${contract.con_version}_user${contract.user_id}.${contract.con_type}`;
      link.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const filteredUnfairClauses = contractIdens.filter((clause) => clause.iden_unfair)
  const filteredToxicClauses = contractIdens.filter((clause) => clause.iden_toxic)

  const currentClause =
    activeTab === "unfair" ? filteredUnfairClauses[currentUnfairIndex] : filteredToxicClauses[currentToxicIndex]

  const handlePrevClause = () => {
    if (activeTab === "unfair") {
      setCurrentUnfairIndex((prev) => Math.max(prev - 1, 0))
    } else if (activeTab === "toxic") {
      setCurrentToxicIndex((prev) => Math.max(prev - 1, 0))
    }
  }

  const handleNextClause = () => {
    if (activeTab === "unfair") {
      setCurrentUnfairIndex((prev) => Math.min(prev + 1, filteredUnfairClauses.length - 1))
    } else if (activeTab === "toxic") {
      setCurrentToxicIndex((prev) => Math.min(prev + 1, filteredToxicClauses.length - 1))
    }
  }

  const handleCheckClause = () => {
    setContractIdens((prevIdens) =>
      prevIdens.map((iden) => (iden.iden_id === currentClause.iden_id ? { ...iden, checked: !iden.checked } : iden)),
    )
  }


  const renderClauseContent = () => {
    if (!currentClause) return null

    const probability = activeTab === "unfair" ? currentClause.iden_unfair_percent : currentClause.iden_toxic_percent

    return (
      <>
        <ClauseEx>
          <InfoIcon>i</InfoIcon>
            {activeTab === "unfair"
              ? "위법 조항 - 법률에 명백하게 위배된 조항"
              : "독소 조항 - 위법이 아닌 경우라도 추후에 해석이나 상황에 따라 불리하게 작용할 가능성이 있는 조항"}
        </ClauseEx>
        <ClauseContainer $checked={currentClause.checked}>
          <ClauseHeader $checked={currentClause.checked}>
            <span>
              {currentClause.iden_article_number}조
              {currentClause.iden_clause_number && ` ${currentClause.iden_clause_number}항`}
              {currentClause.iden_subclause_number && ` ${currentClause.iden_subclause_number}호`}
            </span>
            <CheckboxContainer onClick={handleCheckClause}>
              <ClauseCheckbox $checked={currentClause.checked}>
                {currentClause.checked && <Check size={16} />}
              </ClauseCheckbox>
            </CheckboxContainer>
          </ClauseHeader>
          <ClauseContent $checked={currentClause.checked}>{currentClause.iden_sentence}</ClauseContent>
        </ClauseContainer>
        <ClauseExplanation $checked={currentClause.checked}>
          <ProbabilitySection>
            <ExplanationTitle $checked={currentClause.checked}>
              {activeTab === "unfair" ? "위법 조항 위험도" : "독소조항 위험도"}
            </ExplanationTitle>
            <ProbabilityContainer>
              <ProbabilityBar>
                <ProbabilityFill $percentage={probability || 0} />
              </ProbabilityBar>
              <ProbabilityLabel $percentage={probability || 0}>{probability}%</ProbabilityLabel>
            </ProbabilityContainer>
          </ProbabilitySection>
          <Divider />
          {activeTab === "unfair" && (
            <>
              <ExplanationTitle $checked={currentClause.checked}>위반 법령</ExplanationTitle>
              <LawReference>
                <LawReferenceContent>
                  {currentClause.law_article_number}조
                  {currentClause.law_clause_number && ` ${currentClause.law_clause_number}항`}
                  {currentClause.law_subclause_number && ` ${currentClause.law_subclause_number}호`}
                </LawReferenceContent>
              </LawReference>
              <ExplanationTitle $checked={currentClause.checked}>설명</ExplanationTitle>
              <p>{currentClause.law_explain}</p>
            </>
          )}
          {activeTab === "toxic" && (
            <>
              <ExplanationTitle $checked={currentClause.checked}>독소조항 설명</ExplanationTitle>
              <p>{currentClause.law_explain}</p>
            </>
          )}
        </ClauseExplanation>
      </>
    )
  }

  const [copiedId, setCopiedId] = useState<number | null>(null);

  const handleCopy = async (summary: ContractSummary) => {
    const textToCopy = `${summary.sum_article_number}조: ${summary.sum_article_title}\n\n${summary.sum_summary}`;
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(summary.sum_id);

      // ⏳ 2초 후 원래 상태로 복귀
      setTimeout(() => setCopiedId(null), 3000);
    } catch (error) {
      console.error("클립보드 복사 실패:", error);
    }
  };

  const renderSummaryContent = () => {
    if (!contract || !contractSummaries.length) return null;
  
    return (
      <SummaryContent>
        <h3>계약 요약</h3>
        {contractSummaries.map((summary) => (
          <SummaryContainer key={summary.sum_id}>
            <h4>
              {summary.sum_article_number}조: {summary.sum_article_title}
            </h4>
            <p>{summary.sum_summary}</p>
            <CopyButton onClick={() => handleCopy(summary)}>
              <IconWrapper>
                {copiedId === summary.sum_id ? <Check size={20} /> : <Copy size={20} />}
              </IconWrapper>
            </CopyButton>
          </SummaryContainer>
        ))}
      </SummaryContent>
    );
  };
  

  const getUnfairCount = () => filteredUnfairClauses.filter((c) => !c.checked).length
  const getToxicCount = () => filteredToxicClauses.filter((c) => !c.checked).length

  if (!contract) {
    return(
      <Container>
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>로딩 중입니다...</LoadingText>
        </LoadingContainer>
      </Container>
    )
  }

  return (
    <Container>
      <PreviewSection>
        <NavigationBar>
          <DocumentTitle>{contract.con_title}</DocumentTitle>
          <ActionButton className="download" onClick={handleDownload}>
          <Download size={16} />
          파일 다운로드
        </ActionButton>
        </NavigationBar>
        <PreviewContent>
          <MyPdfViewer contract={contract}/>
        </PreviewContent>
      </PreviewSection>

      <AnalysisSection>
        <TabContainer>
          <Tab $active={activeTab === "summary"} onClick={() => setActiveTab("summary")}>
            요약
          </Tab>
          <Tab $active={activeTab === "unfair"} onClick={() => setActiveTab("unfair")}>
            위법조항
            {getUnfairCount() > 0 && <Badge>{getUnfairCount()}</Badge>}
          </Tab>
          <Tab $active={activeTab === "toxic"} onClick={() => setActiveTab("toxic")}>
            독소조항
            {getToxicCount() > 0 && <Badge>{getToxicCount()}</Badge>}
          </Tab>
        </TabContainer>

        <AnalysisContent>{activeTab === "summary" ? renderSummaryContent() : renderClauseContent()}</AnalysisContent>

        {activeTab !== "summary" && (
          <Pagination>
          {/* 이전 그룹으로 이동 (10페이지씩 뒤로) */}
            <PageButton
              onClick={() => {
                if (activeTab === "unfair") {
                  setCurrentUnfairIndex((prev) => Math.max(prev - 10, 0));
                } else {
                  setCurrentToxicIndex((prev) => Math.max(prev - 10, 0));
                }
              }}
              disabled={
                activeTab === "unfair"
                  ? currentUnfairIndex < 10
                  : currentToxicIndex < 10
              }
            >
              {"<<"}
            </PageButton>
          
            {/* 이전 페이지로 이동 */}
            <PageButton
              onClick={() => {
                if (activeTab === "unfair") {
                  setCurrentUnfairIndex((prev) => Math.max(prev - 1, 0));
                } else {
                  setCurrentToxicIndex((prev) => Math.max(prev - 1, 0));
                }
              }}
              disabled={
                activeTab === "unfair"
                  ? currentUnfairIndex === 0
                  : currentToxicIndex === 0
              }
            >
              {"<"}
            </PageButton>
          
            {/* 페이지 번호 표시 (10개씩) */}
            {[...Array(10)].map((_, i) => {
              const pageNumber =
                Math.floor(
                  (activeTab === "unfair" ? currentUnfairIndex : currentToxicIndex) / 10
                ) *
                  10 +
                i +
                1;
              const maxPage =
                activeTab === "unfair"
                  ? filteredUnfairClauses.length
                  : filteredToxicClauses.length;
              if (pageNumber > maxPage) return null; // 페이지 번호가 최대 페이지 수를 초과하면 렌더링 안 함
          
              return (
                <PageButton
                  key={pageNumber}
                  onClick={() => {
                    if (activeTab === "unfair") {
                      setCurrentUnfairIndex(pageNumber - 1);
                    } else {
                      setCurrentToxicIndex(pageNumber - 1);
                    }
                  }}
                  $active={
                    activeTab === "unfair"
                      ? currentUnfairIndex === pageNumber - 1
                      : currentToxicIndex === pageNumber - 1
                  }
                >
                  {pageNumber}
                </PageButton>
              );
            })}
          
            {/* 다음 페이지로 이동 */}
            <PageButton
              onClick={() => {
                if (activeTab === "unfair") {
                  setCurrentUnfairIndex((prev) =>
                    Math.min(prev + 1, filteredUnfairClauses.length - 1)
                  );
                } else {
                  setCurrentToxicIndex((prev) =>
                    Math.min(prev + 1, filteredToxicClauses.length - 1)
                  );
                }
              }}
              disabled={
                activeTab === "unfair"
                  ? currentUnfairIndex === filteredUnfairClauses.length - 1
                  : currentToxicIndex === filteredToxicClauses.length - 1
              }
            >
              {">"}
            </PageButton>
          
            {/* 다음 그룹으로 이동 (10페이지씩 앞으로) */}
            <PageButton
              onClick={() => {
                if (activeTab === "unfair") {
                  setCurrentUnfairIndex((prev) =>
                    Math.min(prev + 10, filteredUnfairClauses.length - 1)
                  );
                } else {
                  setCurrentToxicIndex((prev) =>
                    Math.min(prev + 10, filteredToxicClauses.length - 1)
                  );
                }
              }}
              disabled={
                activeTab === "unfair"
                  ? currentUnfairIndex >= filteredUnfairClauses.length - 10
                  : currentToxicIndex >= filteredToxicClauses.length - 10
              }
            >
              {">>"}
            </PageButton>
          </Pagination>
        )}

        <ActionButtons>
          <ActionButton className="share">
            <Share size={16} />
            결과 공유하기
          </ActionButton>
          <ActionButton className="download">
            <Download size={16} />
            결과 다운로드
          </ActionButton>
          <ActionButton className="compare" onClick={() => router.push(`/compare?contractId=${contract.con_id}`)}>
            <GitCompare size={16} />
            버전 비교하기
          </ActionButton>
        </ActionButtons>
      </AnalysisSection>
    </Container>
  )
}

