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
  LoginMessage,
} from './main.styled';

// Assuming you have a notices array. If not, you'll need to create one or fetch from an API.
const notices = [
  { id: 1, title: "공지사항 1", author: "관리자", datetime: "2025-01-10" },
  { id: 2, title: "공지사항 2", author: "관리자", datetime: "2025-01-09" },
  { id: 3, title: "공지사항 3", author: "관리자", datetime: "2025-01-08" },
];

const MainPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchType, setSearchType] = useState('법령');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);
  }, []);

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
    if (isLoggedIn) {
      const file = event.dataTransfer.files?.[0];
      if (file) {
        setSelectedFile(file);
      }
    }
  };

  const handleUploadClick = () => {
    if (isLoggedIn) {
      fileInputRef.current?.click();
    }
  };

  const handleSearch = () => {
    if (searchType === '법령') {
      router.push(`/archive/statute?query=${encodeURIComponent(searchQuery)}`);
    } else if (searchType === '표준계약서') {
      router.push(`/archive/standard_cont?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  const handleReview = () => {
    if (isLoggedIn && selectedFile) {
      // Implement your file review logic here
      console.log("Reviewing file:", selectedFile.name);
    }
  };

  const handleNoticeClick = (id: number) => {
    router.push(`/notice/${id}`);
  };

  return (
    <Container>
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
              {isLoggedIn ? (
                selectedFile ? (
                  <FileName>{selectedFile.name}</FileName>
                ) : (
                  '클릭하거나 파일을 드래그하여 업로드하세요'
                )
              ) : (
                '로그인 후 이용 가능합니다'
              )}
            </FileUploadArea>
            <FileInput
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              accept=".pdf,.doc,.docx,.hwp"
              disabled={!isLoggedIn}
            />
          </FileUploadContainer>
          <Button onClick={handleReview} disabled={!isLoggedIn || !selectedFile}>
            검토하기
          </Button>
          {!isLoggedIn && (
            <LoginMessage>
              로그인 후 이용 가능한 서비스입니다.
            </LoginMessage>
          )}
        </InputContainer>
      </Group>

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
  );
};

export default MainPage;

