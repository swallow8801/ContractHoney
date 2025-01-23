"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Main,
  ChangePWCard,
  Form,
  FormGroup,
  Label,
  Input,
  SaveButton,
  FormDescription,
  Title,
  ShowPassword,
  PasswordField,
  CancelButton,
  ButtonContainer,
  Alert
} from './change-password.styled';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<'success' | 'error' | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [isConfirmPasswordFocused, setIsConfirmPasswordFocused] = useState(false);
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAlertMessage('');
    setAlertType('');

    // 새 비밀번호와 확인 비밀번호가 다르면 제출을 막음
    if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/change-password', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setAlertType('success');
        setAlertMessage('비밀번호가 성공적으로 변경되었습니다.');
        setTimeout(() => {
          router.push('/mypage');
        }, 2000);
      } else {
        setPasswordError(data.error || '현재 비밀번호가 일치하지 않습니다.');
      }
    } catch (err) {
      setPasswordError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.push('/mypage');
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewPassword(e.target.value);
    if (isConfirmPasswordFocused && e.target.value !== confirmPassword) {
      setPasswordError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value);
    if (newPassword !== e.target.value) {
      setPasswordError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    } else {
      setPasswordError('');
    }
  };

  const handleConfirmPasswordFocus = () => {
    setIsConfirmPasswordFocused(true);
    if (newPassword !== confirmPassword) {
      setPasswordError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.getModifierState('CapsLock')) {
      setIsCapsLockOn(true);
    } else {
      setIsCapsLockOn(false);
    }
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!e.getModifierState('CapsLock')) {
      setIsCapsLockOn(false);
    }
  };

  return (
    <Container>
      <Main>
        <ChangePWCard>
          <Title>비밀번호 변경</Title>
          <FormDescription>
            비밀번호 변경을 위해 현재 비밀번호를 입력한 뒤, 새 비밀번호를 설정해주세요.
          </FormDescription>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>현재 비밀번호</Label>
              <PasswordField>
                <Input
                  id="currentPassword"
                  type={showCurrentPassword ? 'text' : 'password'}
                  placeholder="현재 비밀번호"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <ShowPassword
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </ShowPassword>
              </PasswordField>
            </FormGroup>

            <FormGroup>
              <Label style={{ marginTop: '15px' }}>새 비밀번호</Label>
              <PasswordField>
                <Input
                  id="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="새 비밀번호"
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  required
                />
                <ShowPassword
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </ShowPassword>
              </PasswordField>
            </FormGroup>

            <FormGroup>
              <Label style={{ marginTop: '15px' }}>새 비밀번호 확인</Label>
              <PasswordField>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="새 비밀번호 확인"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  onFocus={handleConfirmPasswordFocus}
                  onKeyDown={handleKeyDown}
                  onKeyUp={handleKeyUp}
                  required
                />
                <ShowPassword
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </ShowPassword>
              </PasswordField>
              {isCapsLockOn && (
                <div style={{marginTop: '5px'}}>
                  Caps Lock이 켜져 있습니다.
                </div>
              )}
            </FormGroup>

            {passwordError && (
              <Alert
                type="error"
                style={{ whiteSpace: 'pre-line', marginTop: '10px' }}
              >
                {passwordError}
              </Alert>
            )}

            <ButtonContainer>
              <SaveButton
                type="submit"
                disabled={isSubmitting}
                style={{ marginTop: '10px' }}
              >
                {isSubmitting ? '변경 중...' : '비밀번호 변경'}
              </SaveButton>
              <CancelButton
                type="button"
                onClick={handleCancel}
                style={{ marginTop: '10px' }}
              >
                취소
              </CancelButton>
            </ButtonContainer>
            {alertMessage && (
              <Alert
                type={alertType}
                style={{ whiteSpace: 'pre-line', marginTop: '10px' }}
              >
                {alertMessage}
              </Alert>
            )}
          </Form>
        </ChangePWCard>
      </Main>
    </Container>
  );
};

export default ChangePassword;
