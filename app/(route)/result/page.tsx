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
  const [fileInfo, setFileInfo] = useState<{ name: string; type: string } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages] = useState(27);
  const [activeTab, setActiveTab] = useState('요약');
  const [unfairClauses, setUnfairClauses] = useState<Clause[]>([
    {
      id: '1',
      chapter: '제 2장',
      title: '어쩌구 저쩌구',
      content: '머시기 머시기한 내용',
      type: 'unfair',
      checked: false,
    },
    {
      id: '2',
      chapter: '제 3장',
      title: '이러쿵 저러쿵',
      content: '이러저러한 내용',
      type: 'unfair',
      checked: false,
    },
    // Add more clauses as needed
  ]);
  const [toxicClauses, setToxicClauses] = useState<Clause[]>([
    {
      id: '3',
      chapter: '제 4장',
      title: '독소조항 1',
      content: '독소조항 내용',
      type: 'toxic',
      checked: false,
    },
    // Add more toxic clauses
  ]);

  const [currentClausePage, setCurrentClausePage] = useState(1);
  const clausesPerPage = 5;

  useEffect(() => {
    const fileParam = searchParams.get('file');
    if (fileParam) {
      try {
        const parsedFileInfo = JSON.parse(decodeURIComponent(fileParam));
        setFileInfo(parsedFileInfo);
      } catch (error) {
        console.error('Error parsing file info:', error);
      }
    }
  }, [searchParams]);

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
    if (!fileInfo) return null;

    switch (fileInfo.type) {
      case 'application/pdf':
        return <embed src={URL.createObjectURL(new Blob([fileInfo]))} type="application/pdf" width="100%" height="100%" />;
      case 'application/haansofthwp':
      case 'application/x-hwp':
        return (
          <HancomPlaceholder>
            <FileText size={48} />
            <p>{fileInfo.name}</p>
            <p>한컴 오피스 파일은 미리보기를 지원하지 않습니다.</p>
            <ActionButton className="download">
              <Download size={16} />
              파일 다운로드
            </ActionButton>
          </HancomPlaceholder>
        );
      default:
        return <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CAjJQckns1CPDnI9XT9KII54vQpw3W.png" alt="Contract Preview" />;
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case '요약':
        return (
          <>
            <AnalysisItem>
              <ItemLabel>계약 종류</ItemLabel>
              <ItemContent>공급계약서</ItemContent>
            </AnalysisItem>
            <AnalysisItem>
              <ItemLabel>계약 당사자</ItemLabel>
              <ItemContent>
                갑: 주식회사 A (공급자)<br />
                을: 주식회사 B (구매자)
              </ItemContent>
            </AnalysisItem>
            <AnalysisItem>
              <ItemLabel>계약 기간</ItemLabel>
              <ItemContent>2025년 1월 1일 ~ 2025년 12월 31일 (12개월)</ItemContent>
            </AnalysisItem>
            <AnalysisItem>
              <ItemLabel>주요 계약 내용</ItemLabel>
              <ItemContent>
                1. 물품 공급 범위 및 수량<br />
                2. 공급가격 및 대금지급 조건<br />
                3. 납품 일정 및 방법<br />
                4. 품질보증 및 하자담보책임<br />
                5. 기밀유지 의무
              </ItemContent>
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

  return (
    <ReviewContainer>
      <PreviewSection>
        <NavigationBar>
          <DocumentTitle>{fileInfo?.name || '문서 제목'}</DocumentTitle>
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

