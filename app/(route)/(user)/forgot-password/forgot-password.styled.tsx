import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 90px);
  overflow-x: visible;
  overflow-y: auto;
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

export const ForgotPasswordCard = styled.div`
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

export const Input = styled.input`
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
  background: #808080;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background: #666666;
  }

  &:disabled {
    background: #cccccc;
    cursor: not-allowed;
  }
`;

export const BackToLogin = styled.a`
  display: block;
  text-align: center;
  margin-top: 16px;
  color: #007bff;
  text-decoration: none;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
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

