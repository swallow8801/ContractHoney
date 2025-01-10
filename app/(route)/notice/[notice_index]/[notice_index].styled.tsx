import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 1640px;
  height: 1161px;
  background: #ffffff;
`;

export const Rectangle = styled.div`
  position: absolute;
  width: 1640px;
  height: 1124.2px;
  background: #ffffff;
`;

export const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 32px;
  gap: 24px;
  width: 100%;
  height: 99px;
  background: #ffffff;
  border-bottom: 1px solid #d9d9d9;
`;

export const Logo = styled.div`
  width: 40px;
  height: 35px;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
`;

export const Title = styled.h1`
  position: absolute;
  width: 133px;
  height: 49.54px;
  font-family: 'Nunito', sans-serif;
  font-size: 36px;
  line-height: 49px;
  color: #000000;
`;

export const NoticeContent = styled.div`
  position: absolute;
  width: 917px;
  height: 186.88px;
  font-family: 'Inter', sans-serif;
  font-size: 30px;
  line-height: 31px;
  color: #000000;
`;

export const Navigation = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: absolute;
  bottom: 50px;
`;

export const NavLink = styled.div`
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  color: #000000;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const BackButton = styled.button`
  padding: 10px 20px;
  background: rgba(205, 234, 255, 0.8);
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: rgba(175, 204, 235, 0.8);
  }
`;
