'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; // 페이지 이동을 위한 useRouter 추가
import Accordion from '../../../component/Accodion/Accodion';
import { Container, Sidebar, Main, Title, FAQTitle, MenuItem, MenuList } from './faq.styled';

const FAQ = () => {
    const router = useRouter(); // useRouter 훅 사용
    const pathname = usePathname();

  const faqItems = [
    { question: '계약서를 어떻게 업로드 하나요?', answer: '몰라요' },
    { question: '계약서를 어떻게 갱신하나요?', answer: '찾아보세요\n 몰라요\n' },
  ];

  return (
    <Container>
        <Sidebar>
            <Title>FAQ</Title>
            <MenuList>
                <MenuItem
                $active={pathname === '/qna'}
                onClick={() => router.push('/qna')}
                >
                Q&A
                </MenuItem>
                <MenuItem 
                $active={pathname === '/faq'}
                onClick={() => router.push('/faq')}
                >
                자주 묻는 질문
                </MenuItem>
            </MenuList>
        </Sidebar>
        <Main>
            <FAQTitle>자주 묻는 질문</FAQTitle>
            <Accordion items={faqItems} />
        </Main>
    </Container>
  );
};

export default FAQ;
