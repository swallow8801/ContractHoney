import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: #ffffff;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 32px;
  border-bottom: 1px solid #d9d9d9;
`;

export const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

export const Nav = styled.nav`
  flex: 1;
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  margin: 0;
  gap: 24px;
`;

export const NavItem = styled.li`
  font-size: 16px;
  color: #1e1e1e;
  cursor: pointer;
`;

export const LoginButton = styled.button`
  padding: 8px 16px;
  background: #2c2c2c;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const Main = styled.main`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex: 1;
  padding: 40px;
`;

export const LoginCard = styled.div`
  width: 640px;
  padding: 40px;
  border: 1px solid rgba(102, 102, 102, 0.5);
  border-radius: 24px;
  text-align: center;
`;

export const Title = styled.h1`
  font-size: 32px;
  font-weight: 500;
  color: #333333;
  margin-bottom: 40px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Label = styled.label`
  font-size: 16px;
  color: #666666;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid rgba(102, 102, 102, 0.35);
  border-radius: 12px;
  font-size: 16px;
`;

export const PasswordField = styled.div`
  position: relative;
`;

export const ShowPassword = styled.button`
  position: absolute;
  right: 12px;
  top: 12px;
  background: none;
  border: none;
  color: rgba(102, 102, 102, 0.8);
  cursor: pointer;
`;

export const SubmitButton = styled.button`
  padding: 16px;
  background: #111111;
  color: #ffffff;
  border: none;
  border-radius: 40px;
  cursor: pointer;
`;

export const ForgotPassword = styled.a`
  display: block;
  margin: 16px 0;
  color: #111111;
  text-decoration: underline;
  cursor: pointer;
`;

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 16px 0;
`;

export const Line = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(102, 102, 102, 0.25);
`;

export const SignUpButton = styled.button`
  padding: 16px;
  width: 100%;
  background: none;
  border: 1px solid #111111;
  border-radius: 40px;
  cursor: pointer;
  color: #111111;
`;
