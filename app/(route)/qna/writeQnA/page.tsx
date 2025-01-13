"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Sidebar, Main, Title }  from './writeQnA.styled';

const writeQnA = () => {
      const router = useRouter();

    return(
        <Container>
            <Sidebar>
                <Title>고객지원</Title>
                <ul>
                    <li onClick={() => router.push('/faq')} style={{ cursor: 'pointer' }}>
                        자주 묻는 질문
                    </li>
                    <li onClick={() => router.push('/qna')} style={{ cursor: 'pointer' }}>
                        Q&A
                    </li>
                </ul>
            </Sidebar>
            <Main>
            </Main>
        </Container>
    )
};

export default writeQnA;