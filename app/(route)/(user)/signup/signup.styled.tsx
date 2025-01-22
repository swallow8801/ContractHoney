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

export const LoginCard = styled.div`
  width: 100%;
  max-width: 400px;
  padding: 40px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
  text-align: center;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #666;
  margin-bottom: 4px;
`;

export const Input = styled.input<{ $error?: boolean; $verified?: boolean }>`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid ${props => props.$error ? '#dc3545' : props.$verified ? '#28a745' : '#ddd'};
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.3s, background-color 0.3s;
  background-color: ${props => props.$verified ? '#e8f0fe' : 'white'};

  &:focus {
    outline: none;
    border-color: ${props => props.$error ? '#dc3545' : props.$verified ? '#28a745' : '#F2B024'};
  }

  &:disabled {
    background-color: #e9ecef;
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

export const SubmitButton = styled.button`
  width: 100%;
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

export const Divider = styled.div`
  display: flex;
  align-items: center;
  margin: 24px 0;
`;

export const Line = styled.div`
  flex: 1;
  height: 1px;
  background: #ddd;
`;

export const SignInButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #e0e0e0; // 밝은 회색으로 변경
  border: 1px solid #cccccc;
  border-radius: 4px;
  color: #333;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #d0d0d0; // 호버 시 약간 어두운 회색
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

export const ErrorMessage = styled.span`
  color: #dc3545;
  font-size: 12px;
  margin-top: 4px;
`;

export const VerifyButton = styled.button`
  padding: 10px 12px;
  height: 40px; // 입력창과 동일한 높이로 설정
  background: #F2B024;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
  white-space: nowrap; // 텍스트가 줄바꿈되지 않도록 설정
  min-width: 80px; // 최소 너비 설정

  &:hover {
    background:rgb(220, 163, 39);
  }

  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const SuccessMessage = styled.div`
  color: #28a745;
  font-size: 14px;
  margin-top: 5px;
`;

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background-color: white;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const ModalMessage = styled.p`
  margin-bottom: 30px;
  font-size: 18px;
  color: #333;
`;

export const ModalButton = styled.button`
  padding: 12px 24px;
  background-color: #808080; // 회색으로 변경
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #666666; // 호버 시 더 어두운 회색
  }
`;

