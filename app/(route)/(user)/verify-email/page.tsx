'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
    <div>
      <h1>이메일 인증</h1>
      <p>{status}</p>
    </div>
  );
};

export default VerifyEmail;
