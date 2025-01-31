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
  const [modalError, setModalError] = useState('');


  const isValidEmail = (email: string): boolean => {
    // RFC 5322 기반 정규식
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email.trim()); // 앞뒤 공백 제거 후 검사
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
  
      // 응답 상태 코드 확인
      if (!response.ok) {
        throw new Error('서버 오류');
      }
  
      const data = await response.json();
      
      if (data) {
        if (data.available) {
          setIsEmailVerified(true);
          setEmailError('');
          setEmailSuccess('사용 가능한 이메일입니다.');
        } else {
          setEmailError('중복된 이메일이 존재합니다.');
          setIsEmailVerified(false);
          setEmailSuccess('');
        }
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

  const handleVerifyModal = async () => {
    setModalError('');
    try {
      const response = await fetch('/api/check-verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: user_email }),
      });

      const data = await response.json();

      if (data.is_verified === 1) {
        router.push('/login');
      } else {
        setModalError('이메일 인증 후 확인 버튼을 눌러주세요.');
        setTimeout(() =>{
          setModalError('');
        }, 3000);
      }
    } catch (error) {
      console.error('인증 확인 오류:', error);
      setModalError('서버 오류가 발생했습니다.');
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
              placeholder="이름"
              maxLength={12}
              required
            />

            <Label htmlFor="user_email" style={{marginTop:"15px"}}>이메일</Label>
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
                placeholder="이메일"
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

            <Label htmlFor="user_password" style={{marginTop:"15px"}}>비밀번호</Label>
            <PasswordField>
              <Input
                id="user_password"
                type={showPassword ? "text" : "password"}
                value={user_password}
                onChange={(e) => setUserPassword(e.target.value)}
                placeholder="비밀번호"
                required
              />
              <ShowPassword type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </ShowPassword>
            </PasswordField>

            <Label htmlFor="confirm_password" style={{marginTop:"15px"}}>비밀번호 확인</Label>
            <PasswordField>
              <Input
                id="confirm_password"
                type={showConfirmPassword ? "text" : "password"}
                value={confirm_password}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="비밀번호 확인"
                required
                $error={!!passwordError}
              />
              <ShowPassword type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </ShowPassword>
            </PasswordField>
            {passwordError && <ErrorMessage>{passwordError}</ErrorMessage>}

            <Label htmlFor="user_phone" style={{marginTop:"15px"}}>전화번호</Label>
            <Input
              id="user_phone"
              type="tel"
              value={user_phone}
              onChange={(e) => setUserPhone(e.target.value)}
              placeholder="전화번호"
              maxLength={11}
              required
            />

            <SubmitButton type="submit" style={{marginTop:"10px"}}>
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
            <ModalMessage>
              회원가입이 완료되었습니다.<br />입력하신 이메일로 전송된 이메일 인증 후<br />확인을 눌러주세요.
            </ModalMessage>
            {modalError && <Alert type="error" style={{marginBottom:"10px"}}>{modalError}</Alert>}
            <ModalButton onClick={handleVerifyModal}>확인</ModalButton>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default SignupPage;

