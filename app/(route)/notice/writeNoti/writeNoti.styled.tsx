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

export const Main = styled.main`
  width: 80%;
  min-height: 92vh;
  padding: 20px 30px 30px 30px;
  display: flex;
  flex-direction: column;
  margin-top: 3vh;
  margin-left: 20%;
`;

export const SidebarTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 20px 0;
`;

export const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
    color: rgb(75, 75, 75);
    text-align: center; /* 제목 중앙 정렬 */
`;

export const NoticeTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #F2B024;
`;

export const NoticeBox = styled.div`
  width: 80%;
  background-color: #e0e0e0;
  padding: 20px;
  border-radius: 5px;
  margin: 0 auto 20px auto; /* 가로 중앙 정렬 */
  text-align: left; /* 텍스트는 왼쪽 정렬 유지 */

  p {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #333;
  }

  span {
    font-size: 16px;
    color: #555;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

export const FormInput = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #F2B024;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #666;
    cursor: not-allowed;
  }
`;

export const FormTextarea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  resize: vertical;
  transition: border-color 0.3s;

  &:focus {
    outline: none;
    border-color: #F2B024;
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #666;
    cursor: not-allowed;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

export const SubmitButton = styled.button`
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

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const CancelButton = styled(SubmitButton)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
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

export const ConfirmButton = styled.button<{ $type: 'success' | 'error' | 'norm' }>`
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
      : '#f0f0f0'};
  color: ${props => (props.$type === 'norm' ? '#333' : 'white')};

  &:hover {
    background-color: ${props =>
      props.$type === 'success'
        ? '#45a049'
        : props.$type === 'error'
        ? '#ff3333'
        : '#e0e0e0'};
  }
`;
