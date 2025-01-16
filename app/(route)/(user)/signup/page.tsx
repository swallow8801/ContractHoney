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
  ErrorMessage,
  VerifyButton,
  InputGroup,
  SuccessMessage,
  ModalOverlay,
  ModalContent,
  ModalMessage,
  ModalButton,
} from './signup.styled';
import { Eye, EyeOff } from 'lucide-react';

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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [emailSuccess, setEmailSuccess] = useState('');
  const [showModal, setShowModal] = useState(false);


  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailVerify = async () => {
    if (!isValidEmail(user_email)) {
      setEmailError('올바른 이메일 형식이 아닙니다.');
      setEmailSuccess('');
      return;
    }

    try {
      const response = await fetch('/api/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user_email }),
      });
      const data = await response.json();
      if (data.available) {
        setIsEmailVerified(true);
        setEmailError('');
        setEmailSuccess('사용 가능한 이메일입니다.');
      } else {
        setEmailError('중복된 이메일이 존재합니다.');
        setIsEmailVerified(false);
        setEmailSuccess('');
      }
    } catch (error) {
      console.error('이메일 확인 오류:', error);
      setEmailError('이메일 확인 중 오류가 발생했습니다.');
      setEmailSuccess('');
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setPasswordError('');

    if (!isEmailVerified) {
      setError('이메일 중복 확인을 해주세요.');
      return;
    }

    if (user_password !== confirm_password) {
      setPasswordError('비밀번호가 일치하지 않습니다.');
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
        setShowModal(true);
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
            <InputGroup>
              <Input
                id="user_email"
                type="email"
                value={user_email}
                onChange={(e) => {
                  const newEmail = e.target.value;
                  setUserEmail(newEmail);
                  setIsEmailVerified(false);
                  setEmailSuccess('');
                  if (newEmail && !isValidEmail(newEmail)) {
                    setEmailError('올바른 이메일 형식이 아닙니다.');
                  } else {
                    setEmailError('');
                  }
                }}
                placeholder="이메일을 입력하세요"
                required
                $error={!!emailError}
                $verified={isEmailVerified}
                disabled={isEmailVerified}
              />
              <VerifyButton type="button" onClick={handleEmailVerify} disabled={isEmailVerified}>
                중복 확인
              </VerifyButton>
            </InputGroup>
            {emailError && <ErrorMessage>{emailError}</ErrorMessage>}
            {emailSuccess && <SuccessMessage>{emailSuccess}</SuccessMessage>}

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
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
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
                $error={!!passwordError}
              />
              <ShowPassword type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </ShowPassword>
            </PasswordField>
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

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
          <Divider>
            <Line />
            <span>OR</span>
            <Line />
          </Divider>
          <SignInButton onClick={() => router.push('/login')}>로그인 페이지로 이동</SignInButton>
        </LoginCard>
      </Main>
      {showModal && (
        <ModalOverlay>
          <ModalContent>
            <ModalMessage>회원가입이 완료되었습니다.</ModalMessage>
            <ModalButton onClick={() => router.push('/login')}>
              로그인 페이지로 이동
            </ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SignupPage;

