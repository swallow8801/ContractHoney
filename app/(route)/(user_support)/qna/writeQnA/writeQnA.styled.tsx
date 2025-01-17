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

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 80%;
  margin: 0 auto;
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
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 24px;
`;

export const SubmitButton = styled.button`
  padding: 8px 20px;
  background: #F2B024;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  align-self: flex-end;
  margin-top: 20px;

  &:hover {
    background: #e0a00f;
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