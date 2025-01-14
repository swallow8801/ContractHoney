'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Group,
  Title,
  InputContainer,
  Button,
  Notice,
  NoticeItem,
  NoticeItemTitle,
  NoticeItemAuthor,
  NoticeItemDate,
  ViewAll,
  FileUploadContainer,
  FileUploadArea,
  FileInput,
  FileName,
  SearchableSelect,
  SearchInput,
  DropdownList,
  DropdownItem,
  Select,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
} from './main.styled';
import { notices } from '../notice_data/notices'; // 공통 데이터 import

const MainPage = () => {
  const router = useRouter();

  // 첫 번째 그룹 관련 상태 및 함수
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 두 번째 그룹 상태 및 함수
  const [searchType, setSearchType] = useState('법령');
  const [searchQuery, setSearchQuery] = useState('');

  // 세 번째 그룹 관련 함수
  const handleNoticeClick = (id: number) => {
    router.push(`/notice/${id}`);
  };

  // 첫 번째 그룹: 파일 업로드 핸들링
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSearch = () => {
    if (searchType === '법령') {
      router.push(`/archive/statute?query=${encodeURIComponent(searchQuery)}`);
    } else if (searchType === '표준계약서') {
      router.push(`/archive/standard_cont?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <>
      <Container>
        {/* 첫 번째 그룹 */}
        <Group $backgroundImage="/images/메인.png">
          <Title>계약서 검토 AI 어시스턴트</Title>
          <InputContainer>
            <FileUploadContainer>
              <FileUploadArea
                $isDragging={isDragging}
                onClick={handleUploadClick}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {selectedFile ? (
                  <FileName>{selectedFile.name}</FileName>
                ) : (
                  '클릭하거나 파일을 드래그하여 업로드하세요'
                )}
              </FileUploadArea>
              <FileInput
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                accept=".pdf,.doc,.docx,.hwp"
              />
            </FileUploadContainer>
            <Button>검토하기</Button>
          </InputContainer>
        </Group>

        {/* 두 번째 그룹 */}
        <Group $backgroundImage="/images/자료실.png">
          <Title>법령 & 표준계약서 조회</Title>
          <InputContainer>
            <Select
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option>법령</option>
              <option>표준계약서</option>
            </Select>
            <SearchInput
              type="text"
              placeholder="검색어를 입력하세요"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button onClick={handleSearch}>검색</Button>
          </InputContainer>
        </Group>

        {/* 세 번째 그룹 */}
        <Group $backgroundImage="/images/공지사항.png">
          <Title>공지사항</Title>
          <Notice>
            {notices.slice(0, 3).map((notice) => (
              <NoticeItem
                key={notice.id}
                onClick={() => handleNoticeClick(notice.id)}
              >
                <NoticeItemTitle>{notice.title}</NoticeItemTitle>
                <NoticeItemAuthor>{notice.author}</NoticeItemAuthor>
                <NoticeItemDate>{notice.datetime}</NoticeItemDate>
              </NoticeItem>
            ))}
            <ViewAll onClick={() => router.push('/notice')}>전체보기</ViewAll>
          </Notice>
        </Group>
      </Container>
    </>
  );
};

export default MainPage;
