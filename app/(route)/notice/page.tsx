'use client';

import React from "react";
import { useRouter } from "next/navigation"; // useRouter 가져오기
import {
  Container,
  Main,
  Title,
  BoardContainer,
  BoardTitle,
  BoardTable,
} from "./notice.styled"; // styled-components 경로

const BoardPage = () => {
  const router = useRouter();

  // 공지사항 데이터
  const notices = [
    { notice_index: 1, title: "공지사항 제목 1", author: "관리자", date: "2025-01-10" },
    { notice_index: 2, title: "공지사항 제목 2", author: "관리자", date: "2025-01-09" },
  ];

  // 클릭 시 해당 notice_index로 이동
  const handleRowClick = (index: number) => {
    router.push(`/notice/${index}`);
  };

  return (
    <>
      <Container>
        <Main>
          <Title>공지사항</Title>
          <BoardContainer>
            <BoardTitle>게시판</BoardTitle>
            <BoardTable>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  <th>작성자</th>
                  <th>작성일</th>
                </tr>
              </thead>
              <tbody>
                {notices.map((notice) => (
                  <tr
                    key={notice.notice_index}
                    onClick={() => handleRowClick(notice.notice_index)} // 클릭 이벤트 추가
                    style={{ cursor: "pointer" }} // 클릭 가능 스타일
                  >
                    <td>{notice.notice_index}</td>
                    <td>{notice.title}</td>
                    <td>{notice.author}</td>
                    <td>{notice.date}</td>
                  </tr>
                ))}
              </tbody>
            </BoardTable>
          </BoardContainer>
        </Main>
      </Container>
    </>
  );
};

export default BoardPage;
