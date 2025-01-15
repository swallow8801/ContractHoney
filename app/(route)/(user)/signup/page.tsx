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
  Alert,
} from './signup.styled';

const SignupPage = () => {
  const router = useRouter();
  const [user_name, setUserName] = useState('');
  const [user_email, setUserEmail] = useState('');
  const [user_password, setUserPassword] = useState('');
  const [confirm_password, setConfirmPassword] = useState('');
  const [user_phone, setUserPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (user_password !== confirm_password) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_name, user_email, user_password, user_phone }),
      });

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setSuccess('회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
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
          <Form onSubmit={handleSignup}>
            <Label htmlFor="user_name">이름</Label>
            <Input
              id="user_name"
              type="text"
              value={user_name}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="이름을 입력하세요"
              required
            />

            <Label htmlFor="user_email">이메일</Label>
            <Input
              id="user_email"
              type="email"
              value={user_email}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
              required
            />

            <Label htmlFor="user_password">비밀번호</Label>
            <PasswordField>
              <Input
                id="user_password"
                type={showPassword ? "text" : "password"}
                value={user_password}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                required
              />
              <ShowPassword type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? "숨기기" : "보이기"}
              </ShowPassword>
            </PasswordField>

            <Label htmlFor="confirm_password">비밀번호 확인</Label>
            <PasswordField>
              <Input
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호를 다시 입력하세요"
                required
              />
              <ShowPassword type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? "숨기기" : "보이기"}
              </ShowPassword>
            </PasswordField>

            <Label htmlFor="user_phone">전화번호</Label>
            <Input
              id="user_phone"
              type="tel"
              value={user_phone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="전화번호를 입력하세요"
              required
            />

            <SubmitButton type="submit">
              회원가입
            </SubmitButton>
          </Form>
          {error && <Alert type="error">{error}</Alert>}
          {success && <Alert type="success">{success}</Alert>}
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

