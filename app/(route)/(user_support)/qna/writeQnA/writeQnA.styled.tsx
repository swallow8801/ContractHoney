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
  min-height: 92vh;
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

export const NoticeBox = styled.div`
  padding: 20px;
  background: #fff7e5;
  border: 1px solid #F2B024;
  border-radius: 8px;
  margin-bottom: 20px;

  p {
    font-size: 16px;
    font-weight: 600;
    color: #2d2d2d;
  }

  span {
    font-size: 14px;
    color: #666;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  color: #333;
  font-weight: 600;
`;

export const FormInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const FormTextarea = styled.textarea`
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 4px;
  resize: vertical;
`;

export const FormFileInput = styled.input`
  font-size: 14px;
  border: 1px solid #ddd;
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

