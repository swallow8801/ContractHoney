"use client";

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { NavContainer, NavItemsContainer, LoginContainer, NavItem, Logo, LoginButton, UserInfo, LogoutButton } from './Nav.styled';
import Image from 'next/image';

const Nav = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('home'); // 현재 활성화된 탭
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

  // 로그인 상태 확인 (로컬 스토리지에서 확인)
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setIsLoggedIn(!!token); // 토큰이 있으면 true, 없으면 false
  }, []); // 컴포넌트가 처음 마운트될 때 한 번만 실행

  // 로그아웃 기능
  const handleLogout = () => {
    setIsLoggedIn(false); // 로그인 상태 업데이트
    localStorage.removeItem('authToken'); // 토큰 제거
    router.push('/'); // 로그아웃 후 홈 페이지로 이동
  };

  return (
    <NavContainer>
      {/* 로고 */}
      <Logo>
        <Link href="/">
          <Image src="/logo.png" alt="로고" width={50} height={50} priority />
        </Link>
      </Logo>

      {/* 네비게이션 아이템 */}
      <NavItemsContainer>
        <NavItem $active={activeTab === 'home'} onClick={() => setActiveTab('home')}>
          <Link href="/">홈</Link>
        </NavItem>
        <NavItem $active={activeTab === 'contract'} onClick={() => setActiveTab('contract')}>
          <Link href="/manage_cont">계약서 관리</Link>
        </NavItem>
        <NavItem $active={activeTab === 'archive'} onClick={() => setActiveTab('archive')}>
          <Link href="/archive">자료실</Link>
        </NavItem>
        <NavItem $active={activeTab === 'notice'} onClick={() => setActiveTab('notice')}>
          <Link href="/notice">공지사항</Link>
        </NavItem>
        <NavItem $active={activeTab === 'qna'} onClick={() => setActiveTab('qna')}>
          <Link href="/faq">Q&A</Link>
        </NavItem>
      </NavItemsContainer>

      {/* 로그인 / 유저 정보 */}
      <LoginContainer>
        {!isLoggedIn ? ( // 로그인 버튼을 상단에 배치
          <LoginButton
            onClick={() => {
              router.push('/login');
            }}
          >
            로그인
          </LoginButton>
        ) : (
          <UserInfo>
            {/* 아이콘 */}
            <span 
              onClick={() => router.push('/mypage')} 
              style={{ cursor: 'pointer', fontSize: '1.6em' }}
            >
              <FontAwesomeIcon icon={faCircleUser} size="lg" />
            </span>
            <LogoutButton
              onClick={() => {
                handleLogout(); // 로그아웃 처리
              }}
            >
              로그아웃
            </LogoutButton>
          </UserInfo>
        )}
      </LoginContainer>
    </NavContainer>
  );
};

export default Nav;
