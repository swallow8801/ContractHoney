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

const MainPage = () => {
  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedContract, setSelectedContract] = useState('새 업로드');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const contracts = ['새 업로드', '계약서 1', '계약서 2', '계약서 3'];

  const filteredContracts = contracts.filter(contract => 
    contract.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setSelectedContract('새 업로드');
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
      setSelectedContract('새 업로드');
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setIsDropdownOpen(true);
  };

  const handleContractSelect = (contract: string) => {
    setSelectedContract(contract);
    setSearchTerm('');
    setIsDropdownOpen(false);
    if (contract !== '새 업로드') {
      setSelectedFile(null);
    }
  };

  const handleReview = async () => {
    if (selectedFile || selectedContract !== '새 업로드') {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsLoading(false);
      
      // Pass file information to the result page
      const fileInfo = selectedFile 
        ? { name: selectedFile.name, type: selectedFile.type }
        : { name: selectedContract, type: 'existing' };
      
      router.push(`/result?file=${encodeURIComponent(JSON.stringify(fileInfo))}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as Element).closest('.searchable-select')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isLoading && (
        <LoadingOverlay>
          <LoadingSpinner />
          <LoadingText>계약서를 분석하고 있습니다...</LoadingText>
        </LoadingOverlay>
      )}
      <Container>
        <Group $backgroundImage="/images/메인.png">
          <Title>계약서 검토 AI 어시스턴트</Title>
          <InputContainer>
            <SearchableSelect className="searchable-select">
              <SearchInput
                type="text"
                placeholder="계약서 검색 또는 선택"
                value={searchTerm}
                onChange={handleSearchChange}
                onClick={() => setIsDropdownOpen(true)}
              />
              {isDropdownOpen && (
                <DropdownList>
                  {filteredContracts.map((contract, index) => (
                    <DropdownItem key={index} onClick={() => handleContractSelect(contract)}>
                      {contract}
                    </DropdownItem>
                  ))}
                </DropdownList>
              )}
            </SearchableSelect>
            {selectedContract === '새 업로드' && (
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
            )}
            <Button onClick={handleReview}>검토하기</Button>
          </InputContainer>
        </Group>

        <Group $backgroundImage="/images/자료실.png">
          <Title>법령 & 표준계약서 조회</Title>
          <InputContainer>
            <Select>
              <option>법령</option>
              <option>표준계약서</option>
            </Select>
            <Button>검색</Button>
          </InputContainer>
        </Group>

        <Group $backgroundImage="/images/공지사항.png">
          <Title>공지사항</Title>
          <Notice>
            <NoticeItem>공지사항 1</NoticeItem>
            <NoticeItem>공지사항 2</NoticeItem>
            <NoticeItem>공지사항 3</NoticeItem>
            <ViewAll>전체보기</ViewAll>
          </Notice>
        </Group>
      </Container>
    </>
  );
};

export default MainPage;

