'use client';

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
  Alert,
} from './login.styled';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>(''); 
  const [passwordVisible, setPasswordVisible] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('authToken');
      if (token) {
        router.push('/');
      }
    }
  }, [router]);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_email: email, user_password: password }),
      });

      const data = await response.json();

      if (response.ok) {
        if (data.error) {
          // 이메일 인증이 안 된 경우 처리
          setAlertMessage('이메일 인증을 완료해주세요.');
          setAlertType('error');
        } else {
          localStorage.setItem('authToken', data.token);
          if (data.userAdmin === 1) {
            localStorage.setItem('admin', '1');
          }
          setAlertMessage('로그인에 성공했습니다.');
          setAlertType('success');
          window.dispatchEvent(new Event('authChange'));
          setTimeout(() => {
            router.push('/');
          }, 2000);
        }
      } else {
        setAlertMessage(data.error || '로그인에 실패했습니다.');
        setAlertType('error');
      }
    } catch (error) {
      setAlertMessage('서버와의 통신에 실패했습니다.');
      setAlertType('error');
    }
  };

  return (
    <Container>
      <Main>
        <LoginCard>
          <Title>로그인</Title>
          <Form onSubmit={handleLogin}>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <Label htmlFor="password">비밀번호</Label>
            <PasswordField>
              <Input
                id="password"
                type={passwordVisible ? "text" : "password"}
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <ShowPassword type="button" onClick={togglePasswordVisibility}>
                {passwordVisible ? <EyeOff size={20} /> : <Eye size={20} />}
              </ShowPassword>
            </PasswordField>

            <SubmitButton type="submit">
              로그인
            </SubmitButton>
          </Form>

          {alertMessage && (
            <Alert type={alertType}>{alertMessage}</Alert>
          )}

          <ForgotPassword onClick={() => router.push('/forgot-password')}>비밀번호를 잊으셨나요?</ForgotPassword>
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
