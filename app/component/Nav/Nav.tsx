"use client";

import { useRouter, usePathname } from 'next/navigation'; // usePathname 훅 사용
import Link from 'next/link';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { NavContainer, NavItemsContainer, LoginContainer, NavItem, Logo, LoginButton, UserInfo } from './Nav.styled';
import Image from 'next/image';

const Nav = () => {
    const pathname = usePathname(); // 현재 경로 가져오기
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false); // 로그인 상태

    const isActive = (paths: string[]) => paths.includes(pathname);

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
                <NavItem active={pathname === '/'}>
                    <Link href="/">홈</Link>
                </NavItem>
                <NavItem active={pathname === '/manage_cont'}>
                    <Link href="/manage_cont">계약서 관리</Link>
                </NavItem>
                <NavItem active={isActive(['/archive','/law'])}>
                    <Link href="/archive">자료실</Link>
                </NavItem>
                <NavItem active={pathname === '/notice'}>
                    <Link href="/notice">공지사항</Link>
                </NavItem>
                <NavItem active={isActive(['/faq', '/qna'])}>
                    <Link href="/faq">Q&A</Link>
                </NavItem>
            </NavItemsContainer>

            {/* 로그인 / 유저 정보 */}
            <LoginContainer>
                {isLoggedIn ? (
                    <UserInfo>
                        <span onClick={() => router.push('/mypage')} style={{ cursor: 'pointer', fontSize: '1.6em' }}>
                            <FontAwesomeIcon icon={faCircleUser} size="lg" />
                        </span>
                        <button onClick={() => setIsLoggedIn(false)}>로그아웃</button>
                    </UserInfo>
                ) : (
                    <LoginButton onClick={() => setIsLoggedIn(true)}>로그인</LoginButton>
                )}
            </LoginContainer>
        </NavContainer>
    );
};

export default Nav;
