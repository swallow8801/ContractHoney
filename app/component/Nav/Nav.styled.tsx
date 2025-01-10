import styled from 'styled-components';

// 네비게이션 전체 컨테이너
export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  position: sticky; /* 고정 위치 설정 */
  top: 0; /* 화면 최상단에 고정 */
  z-index: 1000; /* 다른 요소 위에 표시되도록 */
`;

// 로고 스타일
export const Logo = styled.div`
  flex: 1; /* 로고의 비율 */
  font-size: 1.5rem;
  font-weight: bold;
  display: flex;
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center;
  span {
    cursor: pointer;
  }
  margin-left: 50px;
`;

// 네비게이션 아이템 컨테이너
export const NavItemsContainer = styled.div`
  flex: 4; /* 네비게이션 아이템의 비율 */
  display: flex; /* 가로 정렬 */
  flex-direction: row; /* 반드시 가로 방향 */
  justify-content: flex-start; /* 왼쪽 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  gap: 20px; /* 아이템 간 간격 추가 */
  width: 100%; /* 전체 너비를 강제로 차지 */
  height: auto; /* 세로 크기 자동 조정 */
  margin-left: 30px; /* 왼쪽 여백 추가 */
`;


// 네비게이션 아이템 스타일
export const NavItem = styled.div<{ active: boolean }>`
  margin: 0 15px;
  font-size: 1rem;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: ${({ active }) => (active ? '#e0e0e0' : 'transparent')};
  font-size: 18px;
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  white-space: nowrap; /* 줄바꿈 방지 */
  &:hover {
    background-color: #f2f2f2;
  }
`;

// 로그인 버튼 / 유저 정보 컨테이너
export const LoginContainer = styled.div`
  flex: 1; /* 로그인 버튼의 비율 */
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
  align-items: center;
  margin-right: 50px;
`;

// 로그인 버튼
export const LoginButton = styled.button`
  width: 100px;
  padding: 5px 15px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  white-space: nowrap; /* 줄바꿈 방지 */
  cursor: pointer;
  font-size: 18px;
  &:hover {
    background-color: #555;
  }
`;

// 유저 정보 (로그인 후 상태)
export const UserInfo = styled.div`
  display: flex;
  align-items: center;
  white-space: nowrap; /* 줄바꿈 방지 */
  gap: 25px;
  span {
    margin-right: 10px;
  }
  button {
    width: 100px;
    padding: 5px 15px;
    background-color: #e0e0e0;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 18px;
    &:hover {
      background-color: #c0c0c0;
    }
  }
`;
