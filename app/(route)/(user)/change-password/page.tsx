'use client';

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
  ErrorText,
  FormDescription,
  NotificationOverlay,
  NotificationBox,
  NotificationMessage,
  ConfirmButton,
  Title,
  ShowPassword,
  PasswordField, // 추가된 스타일
} from './change-password.styled';
import { Eye, EyeOff } from 'lucide-react';

const ChangePassword = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setNotification(null);

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호와 확인 비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      const token = localStorage.getItem('authToken');
      const response = await fetch('/api/change-password', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setNotification({ type: 'success', message: '비밀번호가 성공적으로 변경되었습니다.' });
        setTimeout(() => {
          router.push('/mypage');
        }, 2000); // 2초 뒤 리다이렉트
      } else {
        setError(data.error || '현재 비밀번호가 올바르지 않습니다.');
      }
    } catch (err) {
      setError('서버 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNotificationConfirm = () => {
    setNotification(null);
    router.push('/mypage');
  };

  return (
    <Container>
      {notification && (
        <NotificationOverlay>
          <NotificationBox>
            <NotificationMessage>{notification.message}</NotificationMessage>
            <ConfirmButton onClick={handleNotificationConfirm}>확인</ConfirmButton>
          </NotificationBox>
        </NotificationOverlay>
      )}
      <Main>
        <ChangePWCard>
          <Title>비밀번호 변경</Title> {/* 추가된 부분 */}
          <FormDescription>
            비밀번호 변경을 위해 현재 비밀번호를 입력한 뒤, 새 비밀번호를 설정해주세요.
          </FormDescription>
          <Form onSubmit={handleSubmit}>
            <FormGroup>
              <Label>현재 비밀번호</Label>
              <Input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
              />
              {error && currentPassword === '' && <ErrorText>{error}</ErrorText>}
            </FormGroup>

            <FormGroup>
              <Label style={{marginTop:"15px"}}>새 비밀번호</Label>
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
            </FormGroup>

            <FormGroup>
              <Label style={{marginTop:"15px"}}>새 비밀번호 확인</Label>
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
              {newPassword !== confirmPassword && confirmPassword !== '' && (
                  <ErrorText>비밀번호가 일치하지 않습니다.</ErrorText>
                )}
            </FormGroup>

            {error && <ErrorText>{error}</ErrorText>}

            <SaveButton type="submit" disabled={isSubmitting} style={{marginTop:"10px"}}>
              {isSubmitting ? '변경 중...' : '비밀번호 변경'}
            </SaveButton>
          </Form>
        </ChangePWCard>
      </Main>
    </Container>
  );
};

export default ChangePassword;
