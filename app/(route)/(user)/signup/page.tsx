"use client";

import React, { useState } from 'react';
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
  Divider,
  Line,
  SignInButton,
} from './signup.styled'; // 스타일은 로그인과 동일하게 적용

const SignupPage = () => {
  const router = useRouter();
  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [user_password, setUserPassword] = useState('');
  const [user_phone, setUserPhone] = useState('');
  const [user_admin, setUserAdmin] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, user_email, user_password, user_phone, user_admin }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error); // 에러 메시지 처리
      } else {
        router.push('/login'); // 회원가입 후 로그인 페이지로 리다이렉트
      }
    } catch (error) {
      console.error('회원가입 오류:', error);
      setError('서버 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Main>
        <LoginCard>
          <Title>회원가입</Title>
          <Form>
            <Label htmlFor="user_name">이름</Label>
            <Input
              id="user_name"
              type="text"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="이름을 입력하세요"
            />

            <Label htmlFor="user_email">이메일</Label>
            <Input
              id="user_email"
              type="email"
              value={user_email}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />

            <Label htmlFor="user_password">비밀번호</Label>
            <PasswordField>
              <Input
                id="user_password"
                type="password"
                value={user_password}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
              <ShowPassword type="button">숨기기</ShowPassword>
            </PasswordField>

            <Label htmlFor="user_phone">전화번호</Label>
            <Input
              id="user_phone"
              type="text"
              value={user_phone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="전화번호를 입력하세요"
            />

            <SubmitButton type="button" onClick={handleSignup}>
              회원가입
            </SubmitButton>
          </Form>
          {error && <p style={{ color: 'red', fontSize: '14px' }}>{error}</p>}
          <Divider>
            <Line />
            <span>OR</span>
            <Line />
          </Divider>
          <SignInButton onClick={() => router.push('/login')}>로그인 페이지로 이동</SignInButton>
        </LoginCard>
      </Main>
    </Container>
  );
};

export default SignupPage;
