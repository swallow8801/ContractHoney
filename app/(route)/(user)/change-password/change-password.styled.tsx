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

export const ProfileCard = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 40px;
  background: #f8f8f8;
  border-radius: 16px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Label = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

export const Input = styled.input<{ $error?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${props => props.$error ? '#dc3545' : '#ddd'};
  border-radius: 8px;
  font-size: 14px;
  background: white;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.$error ? '#dc3545' : '#999'};
  }

  &:disabled {
    background-color: #f0f0f0;
    color: #666;
    cursor: not-allowed;
  }
`;

export const ErrorText = styled.p`
  font-size: 12px;
  color: #dc3545; /* 붉은색 */
  margin-top: -8px;
  margin-bottom: 16px;
`;

export const SaveButton = styled.button`
  padding: 4px 12px;
  background: #e0e0e0;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  color: #666;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background: #d0d0d0;
  }
`;

export const FormDescription = styled.p`
  font-size: 14px;
  color: #666;
  margin-bottom: 20px;
  line-height: 1.6;
`;
