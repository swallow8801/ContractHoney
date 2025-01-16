"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Main,
  ForgotPasswordCard,
  Title,
  Form,
  Label,
  Input,
  SubmitButton,
  BackToLogin,
  Alert,
} from './forgot-password.styled';

const ForgotPasswordPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/verify-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, name, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsVerified(true);
        setAlertType('success');
        setAlertMessage('사용자 정보가 확인되었습니다. 새 비밀번호를 입력해주세요.');
      } else {
        setAlertType('error');
        setAlertMessage(data.error || '사용자 정보 확인에 실패했습니다.');
      }
    } catch (error) {
      setAlertType('error');
      setAlertMessage('서버와의 통신에 실패했습니다.');
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setAlertType('error');
      setAlertMessage('새 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, newPassword }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertType('success');
        setAlertMessage('비밀번호가 성공적으로 변경되었습니다.');
        setTimeout(() => {
          router.push('/login');
        }, 2000);
      } else {
        setAlertType('error');
        setAlertMessage(data.error || '비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      setAlertType('error');
      setAlertMessage('서버와의 통신에 실패했습니다.');
    }
  };

  return (
    <Container>
      <Main>
        <ForgotPasswordCard>
          <Title>비밀번호 찾기</Title>
          {!isVerified ? (
            <Form onSubmit={handleVerify}>
              <Label htmlFor="email">이메일</Label>
              <Input
                id="email"
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label htmlFor="name">이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="이름을 입력하세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Label htmlFor="phone">전화번호</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="전화번호를 입력하세요"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <SubmitButton type="submit">
                사용자 정보 확인
              </SubmitButton>
            </Form>
          ) : (
            <Form onSubmit={handleResetPassword}>
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="새 비밀번호를 입력하세요"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="새 비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <SubmitButton type="submit">
                비밀번호 변경
              </SubmitButton>
            </Form>
          )}
          {alertMessage && (
            <Alert type={alertType}>{alertMessage}</Alert>
          )}
          <BackToLogin href="/login">로그인 페이지로 돌아가기</BackToLogin>
        </ForgotPasswordCard>
      </Main>
    </Container>
  );
};

export default ForgotPasswordPage;

