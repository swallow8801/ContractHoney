import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 92vh;
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
  padding: 15px 20px; /* 내부 여백 */
  cursor: pointer;
  border-left: 4px solid transparent; /* 기본 투명한 테두리 */
  color: ${props => (props.$active ? '#F2B024' : '#666')}; /* 활성화 색상 */
  background: ${props => (props.$active ? '#fff7e5' : 'transparent')}; /* 활성화 배경색 */
  transition: all 0.3s ease;

  &:hover {
    color: #F2B024; /* 호버 시 텍스트 색상 */
    background: #fff7e5; /* 호버 시 배경색 */
    border-left-color: #F2B024; /* 호버 시 왼쪽 테두리 색상 */
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

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: rgb(75, 75, 75);
  text-align: center;
`;

export const MainTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #F2B024;
`;

export const FAQTitle = styled.h2`
  font-size: 28px;
  color: #2d2d2d;
  font-weight: 600;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 2px solid #F2B024;
`;
