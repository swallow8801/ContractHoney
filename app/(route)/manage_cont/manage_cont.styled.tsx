'use client'

import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 90px);
  padding: 0.5rem;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  overflow-x: hidden;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 0.25rem;
  }
`

export const HeaderContainer = styled.div`
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

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`

export const Title = styled.h2`
  font-size: 1.1rem;
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
  background: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  table-layout: fixed;
  font-size: 0.8rem;

  th, td {
    &:nth-child(1) { width: 25%; }
    &:nth-child(2) { width: 15%; }
    &:nth-child(3) { width: 15%; }
    &:nth-child(4) { width: 20%; }
    &:nth-child(5) { width: 15%; }
    &:nth-child(6) { width: 10%; }
  }

  @media (max-width: 768px) {
    font-size: 0.7rem;

    th, td {
      &:nth-child(1) { width: 30%; }
      &:nth-child(2) { width: 20%; }
      &:nth-child(3) { display: none; }
      &:nth-child(4) { width: 25%; }
      &:nth-child(5) { width: 15%; }
      &:nth-child(6) { width: 10%; }
    }
  }
`

export const Th = styled.th<{ $sortable?: boolean }>`
  text-align: left;
  padding: 0.3rem 0.5rem;
  color: #666;
  font-weight: normal;
  border-bottom: 1px solid #eee;
  background-color: #f0f0f0;
  cursor: ${props => props.$sortable ? 'pointer' : 'default'};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 0.8rem;

  &:hover {
    background-color: ${props => props.$sortable ? '#e0e0e0' : '#f0f0f0'};
  }
`

export const Td = styled.td`
  padding: 0.3rem 0.5rem;
  border-bottom: 1px solid #eee;
  vertical-align: middle;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  height: auto;
  min-height: 40px;
  font-size: 0.8rem;

  &.title {
    max-width: 200px;
    text-align: left;
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
`;

export const VersionSelect = styled.select`
  padding: 0.25rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  min-width: 80px;
`

export const ActionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: #666;
  padding: 0.5rem;
  
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
  margin-bottom: 0.5rem;
  font-size: 0.8rem;

  th, td {
    &:nth-child(1) { width: 30%; }
    &:nth-child(2) { width: 70%; }
  }
`

export const SummaryTh = styled(Th)`
  width: 30%;
  padding: 0.75rem 0.5rem;
`

export const SummaryTd = styled(Td)`
  padding: 0.75rem 0.5rem;
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

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
`

export const PaginationButton = styled.button`
  background: white;
  border: 1px solid #ddd;
  padding: 0.3rem 0.5rem;
  margin: 0 0.25rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.8rem;
  
  &:hover {
    background: #f0f0f0;
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const PaginationInfo = styled.span`
  margin: 0 1rem;
  color: #666;
  font-size: 0.8rem;
`

export const SearchContainer = styled.div`
  flex: 0 0 auto;
`

export const SearchInput = styled.input`
  padding: 0.3rem 0.5rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 0.9rem;
  width: 200px;
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
`;

export const EmptyStateIcon = styled.div`
  font-size: 4rem;
  color: #ccc;
  margin-bottom: 1rem;
`;

export const EmptyStateTitle = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const EmptyStateDescription = styled.p`
  font-size: 1rem;
  color: #666;
  margin-bottom: 1.5rem;
  max-width: 400px;
`;

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
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
`;

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
`;

export const LoadingText = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`;

