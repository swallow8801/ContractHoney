import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 90px);
  overflow-x: visible;
  overflow-y: auto;
  background: #ffffff;
`;

export const Sidebar = styled.aside`
  width: 20%;
  height: 100%;
  background: white;
  padding: 30px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 90px;
  left: 0;
  overflow-y: auto;
`;

export const SidebarTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 20px 0;
`;

export const Main = styled.main`
  width: 70%;
  padding: 20px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
  margin-left: 25%;
  margin-bottom: 5vh;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export const MainTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #F2B024;
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 10px;
  background: #ffffff;
  padding: 0 20px;
  border-radius: 8px;
  margin-bottom: 20px;
`;

export const SearchSelect = styled.select`
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  width: 120px;
  font-size: 14px;
  background-color: white;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;

  &:focus{
    outline: none;
    border-color: #F2B024;
  }
`;

export const SearchButton = styled.button`
  padding: 10px 20px;
  background: #F2B024;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s ease;

  &:hover {
    background: #e0a00f;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  table-layout: fixed;

  th, td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid #eee;
    font-size: 14.5px;
    &:first-child {
      width: 170px;
    }
    &:last-child {
      width: 170px;
    }
  }

  th {
    background: #f8f8f8;
    font-weight: 600;
    color: #333;
  }

  tr:last-child td {
    border-bottom: none;
  }

  tr:hover td {
    background: #fcfcfc;
  }
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

export const MenuItem = styled.li<{ $active?: boolean }>`
  font-size: 16px;
  padding: 15px 20px;
  cursor: pointer;
  color: ${props => props.$active ? '#F2B024' : '#666'};
  background: ${props => props.$active ? '#fff7e5' : 'transparent'};
  border-left: 4px solid ${props => props.$active ? '#F2B024' : 'transparent'};
  transition: all 0.3s ease;

  &:hover {
    color: #F2B024;
    background: #fff7e5;
  }
`;

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
`;

export const InfoItem = styled.div<{ icon?: boolean }>`  /* 'icon' prop 추가 */
  display: flex;
  gap: 5px;
  align-items: flex-start;
  color: #555;
  line-height: 1.4;
  margin: 1px 0;

  ${props => props.icon && css`
    svg {
      color: #F2B024;
      flex-shrink: 0;
      width: 16px;
      height: 14px;
    }
  `}
`;

export const CategoryButtons = styled.div`
  display: flex;
  margin-left: 20px;
  gap: 25px;
  margin-bottom: 20px;
  margin-top: 40px;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${props => props.$active ? '#F2B024' : '#e0e0e0'};
  color: ${props => props.$active ? 'white' : '#333'};
  cursor: pointer;
  font-size: 14.5px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#e0a00f' : '#d0d0d0'};
  }
`;

export const LawLink = styled.a`
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    font-weight: 500;
    text-decoration: underline;
  }
`;

export const PageInfo = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: #666;
`;

export const StyledIcon = styled.span`
  color: #F2B024;
  margin-right: 8px;
  display: inline-flex;
  align-items: center;
`;

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 400px;
  width: 100%;
  margin-top: 20px;
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