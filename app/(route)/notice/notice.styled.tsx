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

export const BoardContainer = styled.div`
  width: 100%;
`;

export const BoardTitle = styled.h2`
  font-size: 27px;
  color: #2d2d2d;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1.6px solid rgb(190, 190, 190);
`;

export const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;
  border-top: 2px solid #333;

  tbody tr:hover {
    background: #f8fbff;
  }

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    color: #666;
  }

  th {
    font-weight: 500;
    background: #f8f8f8;
    color: #333;
  }

  td {
    font-weight: normal;
  }

  td:nth-child(1), th:nth-child(1) {
    min-width: 60px;
    width: 10%;
    text-align: center;
  }

  th:nth-child(2) {
    text-align: center;
  }
    
  td:nth-child(3), th:nth-child(3) {
    min-width: 120px;
    width: 15%;
    text-align: center;
  }
`;

export const WriteButton = styled.button`
  width: 100px;
  align-self: flex-end; /* 오른쪽 정렬 */
  margin-top: 20px;
  margin-right: 25px;
  margin-bottom: 40px;
  padding: 7px 10px;
  background: rgb(169, 169, 169);
  border: none;
  border-radius: 5px;
  font-size: 16px;
  color: #ffffff;
  cursor: pointer;

  &:hover {
      background: rgb(141, 141, 141);
  }
        
`;

export const FooterContainer = styled.div`
  display: flex;
  flex-direction: column; /* 세로로 정렬 */
  align-items: flex-end; /* 오른쪽 정렬 */
  width: 100%;
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

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid ${props => props.$active ? '#333' : '#ddd'};
  background: ${props => props.$active ? '#333' : 'white'};
  color: ${props => props.$active ? 'white' : '#666'};
  cursor: pointer;
  font-size: 14px;

  &:hover {
    background: ${props => props.$active ? '#333' : '#f8f8f8'};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

