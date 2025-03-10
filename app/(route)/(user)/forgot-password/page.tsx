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
  PasswordField,
  ShowPassword,
} from './forgot-password.styled';
import { Eye, EyeOff } from 'lucide-react';

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
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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
        setAlertMessage('사용자 정보가 확인되었습니다.\n 새 비밀번호를 입력해주세요.');
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
      setAlertMessage('비밀번호가 일치하지 않습니다.');
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
                placeholder="이메일"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Label htmlFor="name" style={{marginTop:"15px"}}>이름</Label>
              <Input
                id="name"
                type="text"
                placeholder="이름"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <Label htmlFor="phone" style={{marginTop:"15px"}}>전화번호</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="전화번호"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                maxLength={11}
                required
              />
              <SubmitButton type="submit" style={{marginTop:"10px"}}>
                사용자 정보 확인
              </SubmitButton>
            </Form>
          ) : (
            <Form onSubmit={handleResetPassword}>
              <Label htmlFor="newPassword">새 비밀번호</Label>
              <PasswordField>
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <ShowPassword type="button" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </ShowPassword>
              </PasswordField>
              <Label htmlFor="confirmPassword" style={{marginTop:"15px"}}>새 비밀번호 확인</Label>
                <PasswordField>
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="새 비밀번호 확인"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <ShowPassword type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </ShowPassword>
                </PasswordField>
              <SubmitButton type="submit" style={{marginTop:"10px"}}>
                비밀번호 변경
              </SubmitButton>
            </Form>
          )}
          {alertMessage && (
            <Alert type={alertType} style={{ whiteSpace: 'pre-line' }}>{alertMessage}</Alert>
          )}
          <BackToLogin href="/login">로그인 페이지로 돌아가기</BackToLogin>
        </ForgotPasswordCard>
      </Main>
    </Container>
  );
};

export default ForgotPasswordPage;

