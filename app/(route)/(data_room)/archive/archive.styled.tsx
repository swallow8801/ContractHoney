import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

export const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? '100%' : '0')};
  height: auto;
  background: white;
  padding: ${(props) => (props.$isOpen ? '30px 0' : '0')};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 90px;
  left: 0;
  overflow-y: auto;
  transition: width 0.3s ease-in-out, padding 0.3s ease-in-out;
  display: ${(props) => (props.$isOpen ? 'block' : 'none')};

  @media (min-width: 768px) {
    width: 20%;
    height: 100vh;
    display: block;
  }
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 20px;
  border-bottom: 2px solid #F2B024;
`;

export const SidebarToggle = styled.button`
  background: #F2B024;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.3s ease;

  &:hover {
    background: #e0a00f;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const CloseButton = styled.button`
  background: #e0e0e0;
  color: black;
  border: none;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;
  margin-top: 20px;
  border-radius: 4px;
  transition: background 0.3s ease;
  display: block;
  width: fit-content;
  margin-left: auto;
  margin-right: auto;

  &:hover {
    background: #c0c0c0;
  }

  @media (min-width: 768px) {
    display: none;
  }
`;

export const SidebarTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  text-align: center;
  margin: 20px 0;
`;

export const Main = styled.main`
  width: 100%;
  padding: 20px;
  margin-left: 0;
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    width: 75%;
    margin-left: 22.5%;
  }
`;

export const MainTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #F2B024;
`;

export const ExplanationSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  background: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

export const SearchSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: #ffffff;
  padding: 20px;
  border-radius: 8px;
  margin-top: 20px;
  
  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
`;

export const SearchButton = styled.button`
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
`;

export const ArchiveTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  th, td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #eee;
    font-size: 14px;
  }

  th {
    background: #f8f8f8;
    font-weight: 600;
    color: #333;
  }

  @media (max-width: 600px) {
    th, td {
      padding: 10px;
      font-size: 12px;
    }
  }
`;

export const AttachmentIcon = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  cursor: pointer;
`;

export const LogoImage = styled.img`
  width: 150px;
  height: auto;
  object-fit: contain;
`;

export const ExplanationTextContainer = styled.div`
  flex: 1;
`;

export const ExplanationText = styled.div`
  font-size: 14px;
  line-height: 1.6;
  color: #555;
`;

export const PhoneNumber = styled.div`
  color: #666;
  font-weight: 600;
  margin-top: 10px;
`;

export const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 5px;
`;

export const PageButton = styled.button<{ $active?: boolean }>`
  padding: 8px 12px;
  border: 1px solid #ddd;
  background: ${(props) => (props.$active ? '#F2B024' : 'white')};
  color: ${(props) => (props.$active ? 'white' : '#666')};
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? '#e0a00f' : '#f0f0f0')};
  }
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
  color: ${(props) => (props.$active ? '#F2B024' : '#666')};
  background: ${(props) => (props.$active ? '#fff7e5' : 'transparent')};
  border-left: 4px solid ${(props) => (props.$active ? '#F2B024' : 'transparent')};
  transition: all 0.3s ease;

  &:hover {
    color: #F2B024;
    background: #fff7e5;
  }
`;