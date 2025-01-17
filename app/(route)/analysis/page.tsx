'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Share, Download, ChevronLeft, ChevronRight, FileText, Check } from 'lucide-react';
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
  AnalysisItem,
  ItemLabel,
  ItemContent,
  ActionButtons,
  ActionButton,
  HancomPlaceholder,
  ClauseList,
  ClauseItem,
  ClauseCheckbox,
  ClauseTitle,
  ClauseContent,
  PaginationContainer,
  PaginationButton,
  ClauseType,
} from './analysis.styled';

interface Contract {
  con_id: number;
  user_id: number;
  con_title: string;
  con_type: string;
  con_updatetime: string;
  con_version: number;
}

interface ContractSummary {
  sum_id: number;
  con_id: number;
  sum_article_number: number;
  sum_article_title: string;
  sum_summary: string | null;
}

interface ContractIden {
  iden_id: number;
  con_id: number;
  iden_article_number: number;
  iden_clause_number: number | null;
  iden_subclause_number: number | null;
  iden_sentence: string;
  iden_unfair: boolean;
  iden_unfair_percent: number | null;
  iden_toxic: boolean;
  iden_toxic_percent: number | null;
  law_article_number: number | null;
  law_clause_number: number | null;
  law_subclause_number: number | null;
  law_explain: string | null;
}

const AnalysisPage = () => {
  const searchParams = useSearchParams();
  const [contract, setContract] = useState<Contract | null>(null);
  const [contractSummaries, setContractSummaries] = useState<ContractSummary[]>([]);
  const [contractIdens, setContractIdens] = useState<ContractIden[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(27);
  const [activeTab, setActiveTab] = useState('요약');
  const [currentClausePage, setCurrentClausePage] = useState(1);
  const clausesPerPage = 5;

  useEffect(() => {
    const contractId = searchParams.get('contractId');
    if (contractId) {
      fetchContractData(contractId);
    }
  }, [searchParams]);

  const fetchContractData = async (contractId: string) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await fetch(`/api/contracts/${contractId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch contract data');
      }
      const data = await response.json();
      setContract(data.contract);
      setContractSummaries(data.summaries);
      setContractIdens(data.idens);
    } catch (error) {
      console.error('Error fetching contract data:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleClauseCheck = (id: string, type: 'unfair' | 'toxic') => {
    setContractIdens(prev =>
      prev.map(clause =>
        clause.iden_id.toString() === id ? {
          ...clause,
          checked: !clause.checked
        } : clause
      )
    );
  };

  const renderPreview = () => {
    if (!contract) return null;

    return (
      <HancomPlaceholder>
        <FileText size={48} />
        <p>{contract.con_title}</p>
        <p>계약서 미리보기는 현재 지원되지 않습니다.</p>
        <ActionButton className="download">
          <Download size={16} />
          파일 다운로드
        </ActionButton>
      </HancomPlaceholder>
    );
  };

  const renderContent = () => {
    if (!contract) return null;

    switch (activeTab) {
      case '요약':
        return (
          <>
            <AnalysisItem>
              <ItemLabel>계약 종류</ItemLabel>
              <ItemContent>{contract.con_type}</ItemContent>
            </AnalysisItem>
            <AnalysisItem>
              <ItemLabel>계약 요약</ItemLabel>
              <ItemContent>
                {contractSummaries.map((summary) => (
                  <div key={summary.sum_id}>
                    <h4>{summary.sum_article_number}조: {summary.sum_article_title}</h4>
                    <p>{summary.sum_summary}</p>
                  </div>
                ))}
              </ItemContent>
            </AnalysisItem>
          </>
        );
      case '불공정조항':
        return renderClauses('unfair');
      case '독소조항':
        return renderClauses('toxic');
      default:
        return null;
    }
  };

  const renderClauses = (type: 'unfair' | 'toxic') => {
    const clauses = contractIdens.filter(iden => type === 'unfair' ? iden.iden_unfair : iden.iden_toxic);
    const totalClauses = clauses.length;
    const uncheckedCount = clauses.filter(c => !c.checked).length;
    const startIdx = (currentClausePage - 1) * clausesPerPage;
    const endIdx = startIdx + clausesPerPage;
    const currentClauses = clauses.slice(startIdx, endIdx);
    const totalClausePages = Math.ceil(totalClauses / clausesPerPage);

    return (
      <>
        <ClauseType>
          {type === 'unfair' ? '불공정조항' : '독소조항'} ({uncheckedCount}/{totalClauses})
        </ClauseType>
        <ClauseList>
          {currentClauses.map((clause) => (
            <ClauseItem key={clause.iden_id}>
              <ClauseCheckbox
                checked={clause.checked || false}
                onClick={() => handleClauseCheck(clause.iden_id.toString(), type)}
              >
                <Check size={16} />
              </ClauseCheckbox>
              <div>
                <ClauseTitle>{clause.iden_article_number}조 {clause.iden_clause_number && `${clause.iden_clause_number}항`} {clause.iden_subclause_number && `${clause.iden_subclause_number}호`}</ClauseTitle>
                <ClauseContent>{clause.iden_sentence}</ClauseContent>
                <p>확률: {type === 'unfair' ? clause.iden_unfair_percent : clause.iden_toxic_percent}%</p>
                {clause.law_explain && <p>설명: {clause.law_explain}</p>}
                {type === 'unfair' && clause.law_article_number && (
                  <p>관련 법령: {clause.law_article_number}조 {clause.law_clause_number && `${clause.law_clause_number}항`} {clause.law_subclause_number && `${clause.law_subclause_number}호`}</p>
                )}
              </div>
            </ClauseItem>
          ))}
        </ClauseList>
        <PaginationContainer>
          <PaginationButton
            onClick={() => setCurrentClausePage(prev => Math.max(prev - 1, 1))}
            disabled={currentClausePage === 1}
          >
            이전
          </PaginationButton>
          <PageInfo>{currentClausePage} / {totalClausePages}</PageInfo>
          <PaginationButton
            onClick={() => setCurrentClausePage(prev => Math.min(prev + 1, totalClausePages))}
            disabled={currentClausePage === totalClausePages}
          >
            다음
          </PaginationButton>
        </PaginationContainer>
      </>
    );
  };

  const getUnfairCount = () => contractIdens.filter(c => c.iden_unfair).length;
  const getToxicCount = () => contractIdens.filter(c => c.iden_toxic).length;

  if (!contract) {
    return <div>Loading...</div>;
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
            <PageInfo>{currentPage} / {totalPages}</PageInfo>
            <NavButton onClick={handleNextPage} disabled={currentPage === totalPages}>
              <ChevronRight size={20} />
            </NavButton>
          </PageNavigation>
        </NavigationBar>
        <PreviewContent>
          {renderPreview()}
        </PreviewContent>
      </PreviewSection>

      <AnalysisSection>
        <TabContainer>
          <Tab $active={activeTab === '요약'} onClick={() => setActiveTab('요약')}>
            요약
          </Tab>
          <Tab $active={activeTab === '불공정조항'} onClick={() => setActiveTab('불공정조항')}>
            불공정조항
            {getUnfairCount() > 0 && <Badge>{getUnfairCount()}</Badge>}
          </Tab>
          <Tab $active={activeTab === '독소조항'} onClick={() => setActiveTab('독소조항')}>
            독소조항
            {getToxicCount() > 0 && <Badge>{getToxicCount()}</Badge>}
          </Tab>
        </TabContainer>

        <AnalysisContent>
          {renderContent()}
        </AnalysisContent>

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
  );
};

export default AnalysisPage;

