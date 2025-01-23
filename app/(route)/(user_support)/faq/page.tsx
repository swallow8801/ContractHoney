'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Accordion from '../../../component/Accodion/Accodion';
import {
  Container,
  Sidebar,
  SidebarTitle,
  Main,
  MainTitle,
  MenuItem,
  MenuList,
} from './faq.styled';

const FAQ = () => {
  const router = useRouter();
  const pathname = usePathname();

  const faqItems = [
    {
      question: '계약서를 어떻게 업로드 하나요?',
      answer:
        '회원가입 후 로그인하면 계약서 업로드 페이지에서 파일을 업로드할 수 있습니다. PDF, Word, 텍스트 파일 등 다양한 형식을 지원합니다.',
    },
    {
      question: '분석 결과는 얼마나 정확한가요?',
      answer:
        'AI 모델은 대량의 계약서를 학습하여 높은 정확도를 자랑하지만, 최종 결과는 참고용으로 제공되며, 반드시 전문가의 검토를 받는 것이 좋습니다.',
    },
    {
      question: '분석 시간은 얼마나 걸리나요?',
      answer:
        '계약서의 길이와 복잡성에 따라 다르지만, 대부분의 경우 분석 결과는 몇 초에서 몇 분 이내에 제공됩니다.',
    },
    {
      question: '위법 조항과 독소 조항의 차이가 무엇인가요?',
      answer:
        '위법 조항 : 양측의 이익 균형을 해치는 조항으로, 공정성 기준에 따라 문제가 될 수 있습니다.\n독소 조항 : 계약 당사자 중 한쪽에 심각한 피해를 초래할 수 있는 위험한 조항을 의미합니다.',
    },
    {
      question: '업로드된 계약서는 안전하게 보호되나요?',
      answer:
        '네, 모든 파일은 업로드 후 암호화되며, 분석이 완료되면 서버에서 자동으로 삭제됩니다. 고객의 개인정보와 계약서 내용은 철저히 보호됩니다.',
    },
  ];

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>고객지원</SidebarTitle>
        <MenuList>
          <MenuItem
            $active={pathname === '/faq'}
            onClick={() => router.push('/faq')}
          >
            자주 묻는 질문
          </MenuItem>
          <MenuItem
            $active={pathname === '/qna'}
            onClick={() => router.push('/qna')}
          >
            Q&A
          </MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <MainTitle>자주 묻는 질문</MainTitle>
        <Accordion items={faqItems} />
      </Main>
    </Container>
  );
};

export default FAQ;
