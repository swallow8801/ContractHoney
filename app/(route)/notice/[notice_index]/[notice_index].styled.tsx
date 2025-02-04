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
  margin: 0 auto;
  margin-top: 3vh;
  margin-left: 25%;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;

export const NoticeTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  text-align: center; // 가운데 정렬 추가
`;

export const NoticeInfo = styled.div`
  font-size: 15px;
  color: #666;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 2px solid #F2B024;
  text-align: right; // 오른쪽 정렬 추가
`;

export const Content = styled.div`
  min-height: 500px;
  padding: 5px 20px;
  font-size: 17px;
  line-height: 1.6;
  color: #333;
  margin-bottom: 30px;
  white-space: pre-wrap;
`;

export const NavigationTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

export const NavigationRow = styled.tr`
  border-bottom: 1px solid #ddd;

  &:last-child {
    border-bottom: none;
  }

  td {
    padding: 10px;
    font-size: 15px;

    &:first-child {
      width: 100px;
      font-weight: 600;
      color: #666;
    }

    span {
      cursor: pointer;
      color: #595959;
      }
    }
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
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

export const BackButton = styled(Button)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const EditButton = styled(Button)`
  background-color: #F2B024;
  color: white;

  &:hover {
    background-color: #e0a00f;
  }
`;

export const DeleteButton = styled(Button)`
  background-color: #ff4444;
  color: white;

  &:hover {
    background-color: #ff3333;
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