"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { Container, Sidebar, Main, Title, NoticeTitle, Form, FormFileInput, FormInput, FormLabel, FormTextarea, NoticeBox, SubmitButton }  from './writeQnA.styled';

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
            <NoticeTitle>Q&A 작성하기</NoticeTitle>
            <NoticeBox>
                <p>Q&A 이용안내</p>
                <span>답변 등록 시 가입한 이메일로 메일이 발송될 예정입니다.</span>
            </NoticeBox>
            <Form>
                <FormLabel htmlFor="title">제목</FormLabel>
                <FormInput id="title" type="text" placeholder="제목을 입력하세요." />

                <FormLabel htmlFor="content">내용</FormLabel>
                <FormTextarea id="content" placeholder="내용을 입력하세요." />

                <FormLabel htmlFor="file">파일 첨부</FormLabel>
                <FormFileInput id="file" type="file" />

                <SubmitButton type="submit">등록하기</SubmitButton>
            </Form>
            </Main>
        </Container>
    )
};

export default writeQnA;