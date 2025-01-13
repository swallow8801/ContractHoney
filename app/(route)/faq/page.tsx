'use client';

import React from 'react';
import { useRouter } from 'next/navigation'; // 페이지 이동을 위한 useRouter 추가
import Accordion from '../../component/Accodion/Accodion';
import { Container, Sidebar, Main, Title, FAQTitle } from './faq.styled';

const FAQ = () => {
  const router = useRouter(); // useRouter 훅 사용

  const faqItems = [
    { question: '계약서를 어떻게 업로드 하나요?', answer: '몰라요' },
    { question: '계약서를 어떻게 갱신하나요?', answer: '찾아보세요\n 몰라요\n' },
  ];

  return (
    <Container>
      <Sidebar>
        <Title>고객지원</Title>
        <ul>
          {/* 자주 묻는 질문 클릭 시 '/faq'로 이동 */}
          <li onClick={() => router.push('/faq')} style={{ cursor: 'pointer' }}>
            자주 묻는 질문
          </li>
          {/* Q&A 클릭 시 '/qna'로 이동 */}
          <li onClick={() => router.push('/qna')} style={{ cursor: 'pointer' }}>
            Q&A
          </li>
        </ul>
      </Sidebar>
      <Main>
        <FAQTitle>자주 묻는 질문</FAQTitle>
        <Accordion items={faqItems} />
      </Main>
    </Container>
  );
};

export default FAQ;
