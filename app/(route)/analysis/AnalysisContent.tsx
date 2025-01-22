"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { Share, Download, ChevronLeft, ChevronRight, FileText, Check } from "lucide-react"
import {
  Container,
  PreviewSection,
  AnalysisSection,
  NavigationBar,
  PageNavigation,
  NavButton,
  PageInfo,
  DocumentTitle,
  PreviewContent,
  TabContainer,
  Tab,
  Badge,
  AnalysisContent,
  ActionButtons,
  ActionButton,
  HancomPlaceholder,
  ClauseContainer,
  ClauseHeader,
  ClauseContent,
  ClauseExplanation,
  PaginationContainer,
  PaginationButton,
  ClauseCheckbox,
  SummaryContent,
  ProbabilitySection,
  ProbabilityBar,
  ProbabilityFill,
  ProbabilityLabel,
  ProbabilityContainer,
  ExplanationTitle,
  LawReference,
  LawReferenceLabel,
  LawReferenceContent,
  CheckboxContainer,
  Divider,
} from "./analysis.styled"

interface Contract {
  con_id: number
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
      link.download = `${contract.con_title}_ver${contract.con_version}.${contract.con_type}`;
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

  const renderPreview = () => {
    if (!contract) return null

    return (
      <HancomPlaceholder>
        <FileText size={48} />
        <p>{contract.con_title}</p>
        <p>계약서 미리보기는 현재 지원되지 않습니다.</p>
        <ActionButton className="download" onClick={handleDownload}>
          <Download size={16} />
          파일 다운로드
        </ActionButton>
      </HancomPlaceholder>
    )
  }

  const renderClauseContent = () => {
    if (!currentClause) return null

    const probability = activeTab === "unfair" ? currentClause.iden_unfair_percent : currentClause.iden_toxic_percent

    return (
      <>
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
              {activeTab === "unfair" ? "불공정조항 위험도" : "독소조항 위험도"}
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
              <p>이 조항은 계약 당사자 중 한쪽에게 불리한 조건을 포함하고 있습니다.</p>
            </>
          )}
        </ClauseExplanation>
      </>
    )
  }

  const renderSummaryContent = () => {
    if (!contract || !contractSummaries.length) return null

    return (
      <SummaryContent>
        <h3>계약 종류: {contract.con_type}</h3>
        <h3>계약 요약:</h3>
        {contractSummaries.map((summary) => (
          <div key={summary.sum_id}>
            <h4>
              {summary.sum_article_number}조: {summary.sum_article_title}
            </h4>
            <p>{summary.sum_summary}</p>
          </div>
        ))}
      </SummaryContent>
    )
  }

  const getUnfairCount = () => filteredUnfairClauses.filter((c) => !c.checked).length
  const getToxicCount = () => filteredToxicClauses.filter((c) => !c.checked).length

  if (!contract) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <PreviewSection>
        <NavigationBar>
          <DocumentTitle>{contract.con_title}</DocumentTitle>
          <PageNavigation>
            <NavButton onClick={handlePrevPage} disabled={currentPage === 1}>
              <ChevronLeft size={20} />
            </NavButton>
            <PageInfo>
              {currentPage} / {totalPages}
            </PageInfo>
            <NavButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight size={20} />
            </NavButton>
          </PageNavigation>
        </NavigationBar>
        <PreviewContent>{renderPreview()}</PreviewContent>
      </PreviewSection>

      <AnalysisSection>
        <TabContainer>
          <Tab $active={activeTab === "summary"} onClick={() => setActiveTab("summary")}>
            요약
          </Tab>
          <Tab $active={activeTab === "unfair"} onClick={() => setActiveTab("unfair")}>
            불공정조항
            {getUnfairCount() > 0 && <Badge>{getUnfairCount()}</Badge>}
          </Tab>
          <Tab $active={activeTab === "toxic"} onClick={() => setActiveTab("toxic")}>
            독소조항
            {getToxicCount() > 0 && <Badge>{getToxicCount()}</Badge>}
          </Tab>
        </TabContainer>

        <AnalysisContent>{activeTab === "summary" ? renderSummaryContent() : renderClauseContent()}</AnalysisContent>

        {activeTab !== "summary" && (
          <PaginationContainer>
            <PaginationButton
              onClick={handlePrevClause}
              disabled={activeTab === "unfair" ? currentUnfairIndex === 0 : currentToxicIndex === 0}
            >
              이전
            </PaginationButton>
            <PageInfo>
              {activeTab === "unfair"
                ? `${currentUnfairIndex + 1} / ${filteredUnfairClauses.length}`
                : `${currentToxicIndex + 1} / ${filteredToxicClauses.length}`}
            </PageInfo>
            <PaginationButton
              onClick={handleNextClause}
              disabled={
                activeTab === "unfair"
                  ? currentUnfairIndex === filteredUnfairClauses.length - 1
                  : currentToxicIndex === filteredToxicClauses.length - 1
              }
            >
              다음
            </PaginationButton>
          </PaginationContainer>
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
        </ActionButtons>
      </AnalysisSection>
    </Container>
  )
}

