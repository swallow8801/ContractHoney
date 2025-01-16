import styled, { css } from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

export const Sidebar = styled.aside`
  width: 20%;
  background: white;
  padding: 30px 0;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 8vh;
  left: 0;
  height: 92vh;
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
  width: 80%;
  min-height: 92vh;
  padding: 20px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
  margin-left: 20%;
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
  margin: 0px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
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
    font-size: 14px;
    &:first-child {
      width: 15%;
    }
    &:nth-child(2) {
      width: 55%;
    }
    &:last-child {
      width: 30%;
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
    opacity: 0.5;
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
  font-size: 12px;
`;

export const InfoItem = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-start;
  color: #555;
  line-height: 1.4;

  ${props => props.icon && css`
    svg {
      color: #F2B024;
      flex-shrink: 0;
      margin-top: 2px;
      width: 14px;
      height: 14px;
    }
  `}
`;

export const CategoryButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

export const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${props => props.$active ? '#F2B024' : '#e0e0e0'};
  color: ${props => props.$active ? 'white' : '#333'};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$active ? '#e0a00f' : '#d0d0d0'};
  }
`;

export const LawLink = styled.a`
  color: #0066cc;
  text-decoration: none;
  transition: color 0.3s ease;
  
  &:hover {
    color: #004499;
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

