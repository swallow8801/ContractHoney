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
  NoticeItemDate,
  ViewAll,
  FileUploadContainer,
  FileUploadArea,
  FileInput,
  FileName,
  SearchableSelect,
  SearchInput,
  Select,
  LoadingOverlay,
  LoadingSpinner,
  LoadingText,
  LoginMessage,
} from './main.styled';

interface NoticeType {
  notice_id: number;
  notice_title: string;
  notice_date: string;
}

const MainPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchType, setSearchType] = useState('법령');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [notices, setNotices] = useState<NoticeType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token);

    const fetchNotices = async () => {
      try {
        const response = await fetch('/api/mainpage_notices');
        if (!response.ok) {
          throw new Error('Failed to fetch notices');
        }
        const data: NoticeType[] = await response.json();
        setNotices(data);
      } catch (err: any) {
        setError(err.message);
      }
    };

    fetchNotices();
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
    if (searchQuery.trim()) {
      if (searchType === '법령') {
        router.push(`/law?search=${searchQuery}`);
      } else if (searchType === '표준계약서') {
        router.push(`/archive?search=${searchQuery}`);
      }
    }
  };

  const handleReview = async () => {
    if (isLoggedIn && selectedFile) {
      setIsLoading(true);
      const fileName = selectedFile.name;
      const fileExtension = fileName.split('.').pop() || '';
      const fileNameWithoutExtension = fileName.replace(`.${fileExtension}`, '');

      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('fileName', fileNameWithoutExtension);
      formData.append('fileType', fileExtension);

      try {
        const token = localStorage.getItem('authToken');
        const response = await fetch('/api/upload-contract', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: formData,
        });

        if (!response.ok) {
          throw new Error('Failed to upload contract');
        }

        const data = await response.json();
        setIsLoading(false);
        router.push(`/analysis?contractId=${data.contractId}`);

      } catch (error) {
        console.error('Error uploading contract:', error);
        setIsLoading(false);
        setError('Failed to upload contract. Please try again.');
      }
    }
  };

  const handleNoticeClick = (id: number) => {
    router.push(`/notice/${id}`);
  };

  return (
    <Container>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>계약서를 분석 중입니다...</LoadingText>
        </LoadingOverlay>
      )}
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
              accept=".pdf,.doc,.docx,.hwp,.txt"
              disabled={!isLoggedIn}
            />
          </FileUploadContainer>
          <Button onClick={handleReview} disabled={!isLoggedIn || !selectedFile || isLoading}>
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
          {isLoading ? (
            <LoadingText>로딩 중...</LoadingText>
          ) : error ? (
            <p>공지사항을 불러오는 중 오류가 발생했습니다: {error}</p>
          ) : (
            notices.map((notice) => (
              <NoticeItem key={notice.notice_id} onClick={() => handleNoticeClick(notice.notice_id)}>
                <NoticeItemTitle>{notice.notice_title}</NoticeItemTitle>
                <NoticeItemDate>{new Date(notice.notice_date).toLocaleDateString()}</NoticeItemDate>
              </NoticeItem>
            ))
          )}
          <ViewAll onClick={() => router.push('/notice')}>전체보기</ViewAll>
        </Notice>
      </Group>
    </Container>
  );
};

export default MainPage;

