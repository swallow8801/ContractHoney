"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Main,
  LoginCard,
  Title,
  Form,
  Label,
  Input,
  PasswordField,
  ShowPassword,
  SubmitButton,
  ForgotPassword,
  Divider,
  Line,
  SignUpButton,
} from './login.styled';

const LoginPage = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/main');
  };

  return (
    <Container>
      <Main>
        <LoginCard>
          <Title>로그인</Title>
          <Form>
            <Label htmlFor="email">이메일</Label>
            <Input id="email" type="email" placeholder="이메일을 입력하세요" />

            <Label htmlFor="password">비밀번호</Label>
            <PasswordField>
              <Input id="password" type="password" placeholder="비밀번호를 입력하세요" />
              <ShowPassword type="button">숨기기</ShowPassword>
            </PasswordField>

            <SubmitButton type="button" onClick={handleLogin}>
              로그인
            </SubmitButton>
          </Form>
          <ForgotPassword href="#">비밀번호를 잊으셨나요?</ForgotPassword>
          <Divider>
            <Line />
            <span>OR</span>
            <Line />
          </Divider>
          <SignUpButton>회원가입</SignUpButton>
        </LoginCard>
      </Main>
    </Container>
  );
};

export default LoginPage;
