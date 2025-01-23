"use client";

import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { NavContainer, NavItemsContainer, LoginContainer, NavItem, Logo, LoginButton, UserInfo, LogoutButton } from './Nav.styled';
import Image from 'next/image';

const Nav = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  const handleLogout = () => {
    if (sessionStorage.getItem('isReloaded')) {
      sessionStorage.removeItem('isReloaded'); // 새로고침 상태 초기화
      return;
    }

    setIsLoggedIn(false);
    setUserName('');
    localStorage.removeItem('authToken');
    localStorage.removeItem('admin');
    window.dispatchEvent(new Event('authChange'));

    // 새로고침 플래그 설정
    sessionStorage.setItem('isReloaded', 'true');
    window.location.reload(); // 창 새로고침
  };

  const checkTokenValidity = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      if (isLoggedIn) handleLogout();
      return;
    }

    try {
      const response = await fetch('/api/user', {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        if (response.status === 401) {
          console.log('토큰이 만료되었습니다. 로그아웃 처리합니다.');
          handleLogout();
        }
      } else {
        const data = await response.json();
        if (!isLoggedIn) {
          setUserName(data.userName);
          setIsLoggedIn(true);
        }
      }
    } catch (error) {
      console.error('토큰 확인 중 오류 발생:', error);
      handleLogout();
    }
  };

  useEffect(() => {
    checkTokenValidity();

    const intervalId = setInterval(() => {
      checkTokenValidity();
    }, 5 * 60 * 1000);

    const handleAuthChange = () => {
      checkTokenValidity();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      clearInterval(intervalId);
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  return (
    <NavContainer>
      <Logo>
        <Link href="/">
          <Image src="/logo.png" alt="로고" width={50} height={50} priority />
        </Link>
      </Logo>

      <NavItemsContainer>
        <NavItem $active={pathname === '/'}>
          <Link href="/">홈</Link>
        </NavItem>
        <NavItem $active={pathname === '/manage_cont' || pathname.startsWith('/analysis') || pathname.startsWith('/compare')}>
          <Link href="/manage_cont">계약서 관리</Link>
        </NavItem>
        <NavItem $active={pathname === '/archive' || pathname === '/law'}>
          <Link href="/archive">자료실</Link>
        </NavItem>
        <NavItem $active={pathname.startsWith('/notice')}>
          <Link href="/notice">공지사항</Link>
        </NavItem>
        <NavItem $active={pathname === '/faq' || pathname.startsWith('/qna')}>
          <Link href="/faq">Q&A</Link>
        </NavItem>
      </NavItemsContainer>

      <LoginContainer>
        {!isLoggedIn ? (
          <LoginButton onClick={() => router.push('/login')}>로그인</LoginButton>
        ) : (
          <UserInfo>
            <span>{userName} 님</span>
            <span
              onClick={() => router.push('/mypage')}
              style={{ cursor: 'pointer', fontSize: '1.6em' }}
            >
              <FontAwesomeIcon icon={faCircleUser} size="lg" />
            </span>
            <LogoutButton onClick={handleLogout}>로그아웃</LogoutButton>
          </UserInfo>
        )}
      </LoginContainer>
    </NavContainer>
  );
};

export default Nav;
