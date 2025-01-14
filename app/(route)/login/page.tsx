"use client";

import React, { useState, useEffect } from 'react';
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
  Alert, // 새 스타일 추가
} from './login.styled';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>(''); // 알림 유형 추가
  const [passwordVisible, setPasswordVisible] = useState(false);

  // 로그인된 상태라면 메인 페이지로 리디렉션
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      router.push('/main'); // 이미 로그인된 경우 메인 페이지로 이동
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email: email, user_password: password }), // user_email을 email 상태로 보내기
      });

      const data = await response.json();

      if (response.ok) {
        // 로그인 성공 시 토큰을 localStorage에 저장
        localStorage.setItem('authToken', data.token);
        setAlertMessage('로그인에 성공했습니다.');
        setAlertType('success');
        
        setTimeout(() => {
          // 페이지를 새로 고침하고 메인 페이지로 이동
          window.location.reload(); // 페이지 새로 고침
        }, 2000); // 2초 후 새로고침
      } else {
        setAlertMessage(data.message || '로그인에 실패했습니다.');
        setAlertType('error');
      }
    } catch (error) {
      setAlertMessage('서버와의 통신에 실패했습니다.');
      setAlertType('error');
    }
  };

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('authToken'); // 토큰 삭제
    router.push('/login'); // 로그인 페이지로 리디렉션
  };

  return (
    <Container>
      <Main>
        <LoginCard>
          <Title>로그인</Title>
          <Form>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <Label htmlFor="password">비밀번호</Label>
            <PasswordField>
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"} // 비밀번호 가리기/보이기
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <ShowPassword type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? "숨기기" : "보이기"}
              </ShowPassword>
            </PasswordField>

            <SubmitButton type="button" onClick={handleLogin}>
              로그인
            </SubmitButton>
          </Form>

          {alertMessage && (
            <Alert type={alertType}>{alertMessage}</Alert>
          )} {/* 알림 메시지 표시 */}

          <ForgotPassword href="#">비밀번호를 잊으셨나요?</ForgotPassword>
          <Divider>
            <Line />
            <span>OR</span>
            <Line />
          </Divider>
          <SignUpButton onClick={() => router.push('/signup')}>회원가입</SignUpButton>

        </LoginCard>
      </Main>
    </Container>
  );
};

export default LoginPage;
