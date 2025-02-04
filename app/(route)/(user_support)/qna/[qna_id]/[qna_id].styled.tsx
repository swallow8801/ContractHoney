import styled from 'styled-components';

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
`;

export const MainTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  text-align: center; // 가운데 정렬 추가
`;

export const MainInfo = styled.div`
  font-size: 15px;
  color: #666;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #F2B024;
  text-align: right; // 오른쪽 정렬 추가
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
  margin-top: 15px;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 15px;
    border-bottom: 1px solid #eee;
    font-size: 14.5px;
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

  td:nth-child(1), th:nth-child(1) {
    width: 10%;
    text-align: center;
  }

  td:nth-child(2), th:nth-child(2) {
    text-align: left;
  }
`;


export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
  gap: 5px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 40px;
`;

export const Button = styled.button`
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
`;

export const DeleteButton = styled(Button)`
  background-color: #ff4444;
  color: #FFF;

  &:hover {
    background-color:rgb(181, 49, 49);
  }
`;

export const BackButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
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
  /* 버튼을 오른쪽 끝으로 정렬 */
  align-self: center;

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
  position: relative; /* 부모 요소를 기준으로 배치 */
`;

export const TextareaContainer = styled.div`
  position: relative; /* textarea를 기준으로 버튼 배치 */
  width: 100%;

  textarea {
    width: 100%;
    min-height: 150px;
    padding: 15px 20px 55px 20px; /* 하단과 우측 공간 확보 */
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 14px;
    box-sizing: border-box;
  }

  textarea:focus {
    outline: none;
    border-color: #F2B024;
  }

  button {
    position: absolute;
    bottom: 20px;
    right: 20px;
    padding: 7px 12px;
    background: #F2B024;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: background 0.3s ease;

    &:hover {
      background: #e0a00f;
    }

    &:disabled {
      background: #ddd;
      cursor: not-allowed;
    }
  }
`;

export const NotificationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const NotificationBox = styled.div`
  width: 350px;
  height: 150px;
  padding: 20px 30px;
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

export const NotificationMessage = styled.p`
  margin-top: 12.5px;
  margin-bottom: 20px;
  font-size: 16px;
`;

export const ConfirmButton = styled.button<{ $type: 'success' | 'error' | 'norm' | 'ok' }>`
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props =>
    props.$type === 'success'
      ? '#4caf50'
      : props.$type === 'error'
      ? '#ff4444'
      : props.$type === 'ok'
      ? '#F2B024'
      : '#f0f0f0'};
  color: ${props => (props.$type === 'norm' ? '#333' : 'white')};

  &:hover {
    background-color: ${props =>
      props.$type === 'success'
        ? '#45a049'
        : props.$type === 'error'
        ? '#ff3333'
        : props.$type === 'ok'
        ? '#e0a00f'
        : '#e0e0e0'};
  }
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