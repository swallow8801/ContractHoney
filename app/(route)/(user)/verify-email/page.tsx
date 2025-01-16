'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Container, Title, StatusMessage, Card, Button } from './verifyEmail.styled';

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('');

  useEffect(() => {
    if (token) {
      fetch(`/api/verify-email?token=${token}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            setStatus('인증 실패: ' + data.error);
          } else {
            setStatus('이메일 인증이 완료되었습니다!');
          }
        })
        .catch(() => {
          setStatus('서버 오류가 발생했습니다.');
        });
    }
  }, [token]);

  return (
    <Container>
      <Card>
        <Title>이메일 인증</Title>
        <StatusMessage>{status}</StatusMessage>
        <Button onClick={() => window.location.href = '/login'}>로그인 페이지로 돌아가기</Button>
      </Card>
    </Container>
  );
};

export default VerifyEmail;
