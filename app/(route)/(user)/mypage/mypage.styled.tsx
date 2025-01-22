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

export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 8px;
`;

export const UserName = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin: 0;
`;

export const EditButton = styled.button`
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

export const ChangeButton = styled.button`
  width: 20%;
  padding: 6px 12px;
  background: #808080;
  border: none;
  border-radius: 4px;
  font-size: 13px;
  color: #ffffff;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-left: auto;

  &:hover {
    background: #666666;
  }
`;

export const UserEmail = styled.p`
  font-size: 16px;
  color: #666;
  margin: 0 0 32px 0;
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

export const InputWithCheck = styled.div`
  position: relative;
  width: 100%;
`;

export const VerifiedCheck = styled.span`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #2ecc71;
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

export const StatsContainer = styled.div`
  margin-top: 40px;
  padding: 24px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background: #f8f8f8;
  border-radius: 12px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  color: #333;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const StatInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const StatLabel = styled.div`
  font-size: 16px;
  font-weight: 500;
`;

export const StatValue = styled.div`
  font-size: 16px;
  font-weight: 700;
  margin-left: 10px;
`;

export const StatIcon = styled.div`
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  border-radius: 50%;
  margin-right: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;


export const StatGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const StatGroupLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 8px;
`;

export const StatGroupItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DeleteButton = styled.button`
  width: 100%;
  padding: 16px;
  margin-top: 40px;
  background: #ff6b6b;
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  transition: background-color 0.3s ease;

  &:hover {
    background: #ff5252;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 32px;
  border-radius: 16px;
  width: 90%;
  max-width: 400px;
`;

export const ModalTitle = styled.h2`
  font-size: 20px;
  color: #333;
  margin: 0 0 16px 0;
`;

export const ModalText = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0 0 24px 0;
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
`;

export const ModalButton = styled.button<{ $danger?: boolean }>`
  padding: 8px 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  background: ${props => props.$danger ? '#ff6b6b' : '#e0e0e0'};
  color: ${props => props.$danger ? 'white' : '#333'};
  transition: background-color 0.3s ease;

  &:hover {
    background: ${props => props.$danger ? '#ff5252' : '#d0d0d0'};
  }
`;

export const Alert = styled.div<{ type: 'success' | 'error' }>`
  padding: 12px;
  border-radius: 8px;
  margin-bottom: 16px;
  background: ${props => props.type === 'success' ? '#e0f7e0' : '#ffe0e0'};
  color: ${props => props.type === 'success' ? '#2e7d32' : '#c62828'};
  font-size: 14px;
`;

