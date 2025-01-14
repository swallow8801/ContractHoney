'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Share, Download, ChevronLeft, ChevronRight, FileText, Check } from 'lucide-react';
import {
  ReviewContainer,
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
} from './result.styled';

interface Contract {
  con_id: number;
  con_title: string;
  con_type: string;
  con_updatetime: string;
  con_summary: string;
  con_toxic: string;
  con_toxic_level: string;
  con_unfair: string;
  con_unfair_level: string;
  con_law: string;
  con_version: number;
}

interface Clause {
  id: string;
  chapter: string;
  title: string;
  content: string;
  type: 'unfair' | 'toxic';
  checked: boolean;
}

const ResultPage = () => {
  const searchParams = useSearchParams();
  const [contract, setContract] = useState<Contract | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(27);
  const [activeTab, setActiveTab] = useState('요약');
  const [unfairClauses, setUnfairClauses] = useState<Clause[]>([]);
  const [toxicClauses, setToxicClauses] = useState<Clause[]>([]);
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
      setContract(data);
      // Here you would typically set the unfairClauses and toxicClauses based on the fetched data
      // For now, we'll just use some dummy data
      setUnfairClauses([
        {
          id: '1',
          chapter: '제 2장',
          title: '어쩌구 저쩌구',
          content: '머시기 머시기한 내용',
          type: 'unfair',
          checked: false,
        },
        // ... add more unfair clauses
      ]);
      setToxicClauses([
        {
          id: '3',
          chapter: '제 4장',
          title: '독소조항 1',
          content: '독소조항 내용',
          type: 'toxic',
          checked: false,
        },
        // ... add more toxic clauses
      ]);
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
    if (type === 'unfair') {
      setUnfairClauses(prev =>
        prev.map(clause =>
          clause.id === id ? { ...clause, checked: !clause.checked } : clause
        )
      );
    } else {
      setToxicClauses(prev =>
        prev.map(clause =>
          clause.id === id ? { ...clause, checked: !clause.checked } : clause
        )
      );
    }
  };

  const renderPreview = () => {
    if (!contract) return null;

    // For now, we'll just show a placeholder. In a real application, you'd render the actual contract content here.
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
              <ItemContent>{contract.con_summary}</ItemContent>
            </AnalysisItem>
            <AnalysisItem>
              <ItemLabel>독소조항</ItemLabel>
              <ItemContent>{contract.con_toxic} (레벨: {contract.con_toxic_level})</ItemContent>
            </AnalysisItem>
            <AnalysisItem>
              <ItemLabel>불공정조항</ItemLabel>
              <ItemContent>{contract.con_unfair} (레벨: {contract.con_unfair_level})</ItemContent>
            </AnalysisItem>
            <AnalysisItem>
              <ItemLabel>관련 법령</ItemLabel>
              <ItemContent>{contract.con_law}</ItemContent>
            </AnalysisItem>
          </>
        );
      case '불공정조항':
      case '독소조항':
        const clauses = activeTab === '불공정조항' ? unfairClauses : toxicClauses;
        const totalClauses = clauses.length;
        const uncheckedCount = clauses.filter(c => !c.checked).length;
        const startIdx = (currentClausePage - 1) * clausesPerPage;
        const endIdx = startIdx + clausesPerPage;
        const currentClauses = clauses.slice(startIdx, endIdx);
        const totalClausePages = Math.ceil(totalClauses / clausesPerPage);

        return (
          <>
            <ClauseType>
              {activeTab === '불공정조항' ? '불공정조항' : '독소조항'} ({uncheckedCount}/{totalClauses})
            </ClauseType>
            <ClauseList>
              {currentClauses.map((clause) => (
                <ClauseItem key={clause.id}>
                  <ClauseCheckbox
                    checked={clause.checked}
                    onChange={() => handleClauseCheck(clause.id, clause.type)}
                  >
                    <Check size={16} />
                  </ClauseCheckbox>
                  <div>
                    <ClauseTitle>{clause.chapter} - {clause.title}</ClauseTitle>
                    <ClauseContent>{clause.content}</ClauseContent>
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
      default:
        return null;
    }
  };

  const getUnfairCount = () => unfairClauses.filter(c => !c.checked).length;
  const getToxicCount = () => toxicClauses.filter(c => !c.checked).length;

  if (!contract) {
    return <div>Loading...</div>;
  }

  return (
    <ReviewContainer>
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
    </ReviewContainer>
  );
};

export default ResultPage;

