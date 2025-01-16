'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation'; // 페이지 이동을 위한 useRouter 추가
import Accordion from '../../../component/Accodion/Accodion';
import { Container, Sidebar, Main, Title, FAQTitle, MenuItem, MenuList } from './faq.styled';

const FAQ = () => {
    const router = useRouter(); // useRouter 훅 사용
    const pathname = usePathname();

  const faqItems = [
    { question: '계약서를 어떻게 업로드 하나요?', answer: '홈 화면에서 파일 등록한 후, 검토하기 버튼을 눌러보세요.' },
    { question: '계약서를 어떻게 갱신하나요?', answer: '계약서를 기존과 동일한 이름으로 저장 후, 다시 업로드하세요.' },
  ];

  return (
    <Container>
        <Sidebar>
            <Title>FAQ</Title>
            <MenuList>
                <MenuItem $active={pathname === '/faq'} onClick={() => router.push('/faq')}>자주 묻는 질문</MenuItem>
                <MenuItem $active={pathname === '/qna'} onClick={() => router.push('/qna')}>Q&A</MenuItem>
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
