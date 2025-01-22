'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Container,
  Main,
  ProfileCard,
  Form,
  FormGroup,
  Label,
  Input,
  SaveButton,
  ErrorText,
  FormDescription,
} from './change-password.styled';

const ChangePassword = () => {
  const router = useRouter();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

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
        setSuccess('비밀번호가 성공적으로 변경되었습니다.');
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

  return (
    <Container>
      <Main>
        <ProfileCard>
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
              <Label>새 비밀번호</Label>
              <Input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>새 비밀번호 확인</Label>
              <Input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {newPassword !== confirmPassword && confirmPassword !== '' && (
                <ErrorText>새 비밀번호와 확인 비밀번호가 일치하지 않습니다.</ErrorText>
              )}
            </FormGroup>

            {error && <ErrorText>{error}</ErrorText>}
            {success && <ErrorText style={{ color: '#2e7d32' }}>{success}</ErrorText>}

            <SaveButton type="submit" disabled={isSubmitting}>
              {isSubmitting ? '변경 중...' : '비밀번호 변경'}
            </SaveButton>
          </Form>
        </ProfileCard>
      </Main>
    </Container>
  );
};

export default ChangePassword;
