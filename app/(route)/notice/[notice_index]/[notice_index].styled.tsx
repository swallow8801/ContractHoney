import styled from 'styled-components';

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

export const NoticeTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #F2B024;
  text-align: center; // 가운데 정렬 추가
`;

export const NoticeInfo = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  text-align: right; // 오른쪽 정렬 추가
`;

export const Content = styled.div`
  font-size: 16px;
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
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  td {
    padding: 10px;
    font-size: 14px;

    &:first-child {
      width: 100px;
      font-weight: 600;
      color: #666;
    }

    span {
      cursor: pointer;
      color: #0066cc;

      &:hover {
        text-decoration: underline;
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
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
`;

export const NotificationMessage = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
`;

export const ConfirmButton = styled.button<{ $type: 'success' | 'error' }>`
  padding: 8px 16px;
  margin: 0 5px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  background-color: ${props => props.$type === 'success' ? '#4caf50' : '#ff4444'};
  color: white;

  &:hover {
    background-color: ${props => props.$type === 'success' ? '#45a049' : '#ff3333'};
  }
`;

