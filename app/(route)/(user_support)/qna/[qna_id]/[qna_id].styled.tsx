import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: calc(100vh - 90px);
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
  width: 80%;
  padding: 20px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
  margin-left: 20%;
`;

export const MainTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #F2B024;
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

export const ArchiveTable = styled.table`
  width: 100%; /* 테이블 전체 너비를 줄임 */
  margin: 0 auto; /* 테이블을 가운데 정렬 */
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  th,
  td {
    padding: 12px 15px; /* 패딩을 줄여서 컴팩트한 느낌 */
    text-align: left;
    border-bottom: 1px solid #eee;
    font-size: 14px;
    white-space: nowrap; /* 텍스트 줄바꿈 방지 */
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

  td:first-child,
  th:first-child {
    width: 25%; /* 작성일 컬럼 */
  }

  td:last-child,
  th:last-child {
    width: 75%; /* 내용 컬럼 */
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

export const ReplyButton = styled.button`
  padding: 10px 20px;
  background: #F2B024;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  transition: background 0.3s ease;
  align-self: flex-end; /* 버튼을 오른쪽 끝으로 정렬 */

  &:hover {
    background: #e0a00f;
  }

  &:disabled {
    background: #ddd;
    cursor: not-allowed;
  }
`;

export const ReplySection = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
  }
`;
