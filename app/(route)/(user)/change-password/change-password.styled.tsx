import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: calc(100vh - 90px);
  background: #f5f5f5;
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  padding: 40px;
`;

export const ChangePWCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #333;
  text-align: center;
  margin-bottom: 20px;
`;


export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  margin-bottom: 4px;
`;

export const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.$error ? '#dc3545' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$error ? '#dc3545' : '#F2B024'};
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #666;
    cursor: not-allowed;
  }
`;
export const PasswordField = styled.div`
  position: relative;
`;

export const ShowPassword = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
`;

export const ErrorText = styled.p`
  font-size: 13px;
  color: #dc3545; /* 붉은색 */
`;

export const FormDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
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
  background: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

export const NotificationMessage = styled.p`
  font-size: 16px;
  margin-bottom: 20px;
  color: #333;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
`;

export const SaveButton = styled.button`
  width: 48%;
  padding: 12px;
  background: #808080; // 회색으로 변경
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #666666; // 호버 시 더 어두운 회색
  }
`;


export const CancelButton = styled(SaveButton)`
  background-color: #f0f0f0;
  color: #333;

  &:hover {
    background-color: #e0e0e0;
  }
`;

export const Alert = styled.div<{ type: 'success' | 'error' | '' }>`
  margin-top: 16px;
  padding: 12px;
  border-radius: 4px;
  text-align: center;
  font-size: 14px;
  color: ${(props) =>
    props.type === 'success' ? '#155724' : props.type === 'error' ? '#721c24' : '#383d41'};
  background-color: ${(props) =>
    props.type === 'success' ? '#d4edda' : props.type === 'error' ? '#f8d7da' : '#e9ecef'};
  border: 1px solid
    ${(props) =>
      props.type === 'success' ? '#c3e6cb' : props.type === 'error' ? '#f5c6cb' : '#d6d8db'};
`;

export const CapsLockMessage = styled.a`
  color: #666;
  font-size: 14px;
`;