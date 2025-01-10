'use client';

import React from 'react';
import {
  Container,
  Group,
  Title,
  InputContainer,
  Select,
  Button,
  Notice,
  NoticeItem,
  ViewAll,
} from './main.styled'; // styled-components 경로

const MainPage = () => {
  return (
    <>
      <Container>
        <Group $backgroundImage="/images/메인.png">
          <Title>계약서 검토 AI 어시스턴트</Title>
          <InputContainer>
            <Select>
              <option>계약서 1</option>
              <option>계약서 2</option>
              <option>계약서 3</option>
            </Select>
            <Button>검토</Button>
          </InputContainer>
        </Group>

        <Group $backgroundImage="/images/자료실.png">
          <Title>법령 & 표준계약서 조회</Title>
          <InputContainer>
            <Select>
              <option>법령</option>
              <option>표준계약서</option>
            </Select>
            <Button>검색</Button>
          </InputContainer>
        </Group>

        <Group $backgroundImage="/images/공지사항.png">
          <Title>공지사항</Title>
          <Notice>
            <NoticeItem>공지사항 1</NoticeItem>
            <NoticeItem>공지사항 2</NoticeItem>
            <NoticeItem>공지사항 3</NoticeItem>
            <ViewAll>전체보기</ViewAll>
          </Notice>
        </Group>
      </Container>
    </>
  );
};

export default MainPage;
