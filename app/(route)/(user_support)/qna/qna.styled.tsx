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

export const QNATitle = styled.h2`
  font-size: 27px;
  color: #2d2d2d;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1.6px solid rgb(190, 190, 190);
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

export const Table = styled.table`
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

  td:nth-child(1), th:nth-child(1) {
    width: 10%;
    text-align: center;
  }
    
  td:nth-child(2) {
    text-align: left;
  }

  td:nth-child(3), th:nth-child(3) {
    width: 15%;
    text-align: center;
  }

`;

export const WriteButton = styled.button`
  padding: 8px 20px;
  background: #666;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-end;
  margin-top: 20px;

  &:hover {
    background: #555;
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

export const ToggleButton = styled.button`
  background: #3b3b3b; /* 기존보다 약간 밝은 색 */
  border: none;
  color: white;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:hover {
    background: #505050; /* Hover 시 더 밝은 회색 */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }

  &:active {
    background: #393939; /* Active 시 어두운 색 */
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid #505050; /* Hover와 같은 색감으로 포커스 처리 */
    outline-offset: 2px;
  }

  &:disabled {
    background: #a1a1a1; /* 비활성화 시 더 밝은 회색 */
    color: #d1d1d1;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
`;

export const AnswerRow = styled.tr`
  background-color: #f9f9f9;
  td {
    padding: 10px;
    border-top: 1px solid #ddd;
  }
`;

export const AnswerContent = styled.div`
  background: #f8f8f8;
  padding: 15px;
  margin-top: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #333;

  h4 {
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 10px;
    color: #444;
  }

  p {
    margin: 0;
    line-height: 1.5;
    color: #555;
  }

  span {
    display: block;
    margin-top: 10px;
    font-size: 12px;
    color: #888;
  }
`;
