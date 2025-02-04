"use client"

import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  max-width: 1200px;
  width: 100%;
  min-height: calc(100vh - 90px);
  margin: 0 auto;
  overflow-x: visible;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 0.25rem;
  }
`

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 30px;
  padding-bottom: 10px;
  border-bottom: 2px solid #F2B024;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Title = styled.h2`
  font-size: 28px;
  font-weight: 600;
  color: #333;
  margin: 0.3rem 0;
`

export const TotalCount = styled.span`
  background-color: #f0f0f0;
  color: #666;
  font-size: 0.9rem;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  th, td {
    &:nth-child(1) { width: 25%; }
    &:nth-child(2) { width: 10%; }
    &:nth-child(3) { width: 15%; }
    &:nth-child(4) { width: 10%; }
    &:nth-child(5) { width: 10%; }
    &:nth-child(6) { width: 10%; }
    &:nth-child(7) { width: 10%; }
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;

    th, td {
      &:nth-child(1) { width: 30%; }
      &:nth-child(2) { width: 15%; }
      &:nth-child(3) { display: none; }
      &:nth-child(4) { width: 15%; }
      &:nth-child(5) { width: 10%; }
      &:nth-child(6) { width: 10%; }
      &:nth-child(7) { width: 10%; }
    }
  }
`

export const Th = styled.th<{ $sortable?: boolean }>`
  text-align: center;
  padding: 0.7rem 0.5rem;
  color: #666;
  font-weight: normal;
  border-bottom: 1px solid #eee;
  background-color: #f0f0f0;
  cursor: ${(props) => (props.$sortable ? "pointer" : "default")};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.95rem;
  font-weight: 500;
  text-align: center;

  &:hover {
    background-color: ${(props) => (props.$sortable ? "#e0e0e0" : "#f0f0f0")};
  }
`

export const Td = styled.td`
  padding: 0.4rem 0.5rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: auto;
  min-height: 40px;
  font-size: 0.8rem;
  text-align: center;

  &.title {
    max-width: 200px;
    text-align: left;
    padding-left: 20px;
  }

  &.type {
    max-width: 100px;
  }

  &.date {
    min-width: 100px;
  }

  &.version {
    min-width: 80px;
  }
`

export const VersionSelect = styled.select`
  width: 80px; // 가로 길이를 줄임
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  font-size: 0.8rem;
  cursor: pointer;

  &:hover {
    border-color: #aaa;
  }

  &:focus {
    outline: none;
    border-color: #666;
  }
`

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s ease;
  margin: 0 auto;

  &:hover {
    color: #333;
  }
`

export const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`

export const FileSize = styled.span`
  color: #666;
  font-size: 0.9rem;
`

export const FileDate = styled.span`
  color: #666;
  font-size: 0.9rem;
`

export const SummaryBox = styled(Table)`
  margin-bottom: 1rem;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  th, td {
    &:nth-child(1) { width: 25%; }
    &:nth-child(2) { width: 75%; }
  }
`

export const SummaryTh = styled(Th)`
  background: #f8f8f8;
  color: #444;
  font-size: 0.95rem;
  font-weight: 500;
  padding: 0.75rem 1rem;
`

export const SummaryTd = styled(Td)`
  font-size: 0.95rem;
  padding: 0.75rem 1rem;
  text-align: left;
`

export const DocumentName = styled.button`
  background: none;
  border: none;
  padding: 0;
  color: #333;
  font-size: 1rem;
  text-align: left;
  cursor: pointer;
  margin-right: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`
export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 70px;
  gap: 5px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: ${props => props.$active ? '#F2B024' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${props => props.$active ? '#e0a00f' : '#f0f0f0'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }
`;

export const SearchContainer = styled.div`
  flex: 0 0 auto;
`

export const SearchInput = styled.input`
  padding: 0.3rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.95rem;
  width: 200px;

  &:focus{
    outline: none;
    border-color: #F2B024;
  }
`

export const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.25rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
`

export const FilterSelect = styled.select`
  padding: 0.3rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  background-color: white;
`

export const SortIcon = styled.span`
  margin-left: 0.5rem;
  display: inline-flex;
  align-items: center;
`

export const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
`

export const CheckResultsButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #007bff;
  padding: 0.5rem;
  font-size: 0.8rem;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;
  }
`

export const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin-top: 2rem;
`

export const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 1rem;
`

export const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`

export const EmptyStateDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 400px;
`

export const EmptyStateButton = styled.button`
  background-color: #000000;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #333333;
  }
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
`

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export const LoadingText = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`

export const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: center;
`

