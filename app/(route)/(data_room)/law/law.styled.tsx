import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  background: #ffffff;
`;

export const Sidebar = styled.aside<{ $isOpen: boolean }>`
  width: ${(props) => (props.$isOpen ? "100%" : "0")};
  height: auto;
  background: white;
  padding: ${(props) => (props.$isOpen ? "30px 0" : "0")};
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 90px;
  left: 0;
  overflow-y: auto;
  transition: width 0.3s ease-in-out, padding 0.3s ease-in-out;
  display: ${(props) => (props.$isOpen ? "block" : "none")};

  @media (min-width: 768px) {
    width: 20%;
    height: 100vh;
    display: block;
  }
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

export const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 15px;
  background: #ffffff;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-size: 14px;
`;

export const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  color: #555;
  font-size: 14px;

  svg {
    color: #F2B024;
    flex-shrink: 0;
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

export const Table = styled.table`
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
  background: ${(props) => (props.$active ? "#F2B024" : "white")};
  color: ${(props) => (props.$active ? "white" : "#666")};
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  transition: all 0.3s ease;

  &:hover:not(:disabled) {
    background: ${(props) => (props.$active ? "#e0a00f" : "#f0f0f0")};
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
  color: ${(props) => (props.$active ? "#F2B024" : "#666")};
  background: ${(props) => (props.$active ? "#fff7e5" : "transparent")};
  border-left: 4px solid ${(props) => (props.$active ? "#F2B024" : "transparent")};
  transition: all 0.3s ease;

  &:hover {
    color: #F2B024;
    background: #fff7e5;
  }
`;

export const CategoryButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 20px;
`;

export const CategoryButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  background: ${(props) => (props.$active ? "#F2B024" : "#e0e0e0")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;

  &:hover {
    background: ${(props) => (props.$active ? "#e0a00f" : "#d0d0d0")};
  }
`;

export const LawLink = styled.a`
  text-decoration: none;
  transition: color 0.3s ease;

  &:hover {
    font-weight: 500;
    text-decoration: underline;
  }
`;

export const StyledIcon = styled.span`
  color: #F2B024;
  display: inline-flex;
  align-items: center;
  margin-right: 8px;

  svg {
    width: 16px;
    height: 16px;
    flex-shrink: 0;
  }
`;

export const MoreButton = styled.button`
  background: none;
  border: none;
  color: #007bff;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  text-align: left;
  padding: 5px 0;

  &:hover {
    color: #0056b3;
    text-decoration: underline;
  }

  @media (min-width: 769px) {
    display: none; /* 데스크탑에서는 숨김 */
  }
`;

export const InfoLink = styled.a`
  color: #007bff;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;

export const InfoSectionWrapper = styled.div`
  @media (max-width: 768px) {
    .collapsed {
      display: none;
    }
  }
`;
