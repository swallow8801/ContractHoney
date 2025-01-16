import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 92vh;
  background: #ffffff;
`;

export const Sidebar = styled.aside`
  width: 20%;
  min-width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 0;
`;

export const Main = styled.main`
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: rgb(75, 75, 75);
  text-align: center;
`;

export const MainTitle = styled.h2`
  font-size: 27px;
  color: #2d2d2d;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1.6px solid rgb(190, 190, 190);
`;

export const SearchSection = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
  background: #ffffff;
  padding: 15px;
  border-radius: 4px;
`;

export const SearchSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 120px;
  font-size: 14px;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
`;

export const SearchButton = styled.button`
  padding: 8px 20px;
  background: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: #555;
  }
`;

export const ArchiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-top: 2px solid #333;

  th, td {
    padding: 15px;
    text-align: center;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
  }

  th {
    background: #f8f8f8;
    font-weight: 500;
    color: #333;
  }

  td {
    color: #666;
  }

  tr:hover td {
    background: #f8fbff;
  }

  td:nth-child(2) {
    text-align: left;
  }

  td:nth-child(3), th:nth-child(3) {
    width: 13%;
    text-align: center;
  }

  td:nth-child(4), th:nth-child(4) {
    width: 15%;
    text-align: center;
  }
`;

export const AttachmentIcon = styled.span`
  cursor: pointer;
  color: #666;
  margin-left: 5px;

  &:hover {
    color: #333;
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
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: white;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #f0f0f0;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

export const MenuList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 20px 0 0 0;
  width: 70%;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const MenuItem = styled.li<{ $active?: boolean }>`
  font-size: 16px;
  padding: 15px 10px;
  cursor: pointer;
  border-bottom: 1px solid #e0e0e0;
  color: ${props => props.$active ? 'rgb(206, 161, 0)' : '#666'};
  background: ${props => props.$active ? '#f1f1f1' : 'transparent'};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    color: rgb(206, 161, 0);
    background: #f1f1f1;
  }
`;

// Add new styled components for the explanation section
export const ExplanationSection = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  margin: 20px 0;
`;

export const LogoImage = styled.img`
  width: 200px;
  height: 40px;
  object-fit: contain;
`;

export const ExplanationText = styled.div`
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: #555;

  a {
    color: #0066cc;
    text-decoration: none;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const PhoneNumber = styled.div`
  color: #666;
  margin-top: 5px;
`;

export const PageInfo = styled.span`
  margin: 0 10px;
  font-size: 14px;
  color: #666;
`;

