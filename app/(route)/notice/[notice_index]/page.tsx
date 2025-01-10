'use client';

import React from "react";
import { useRouter, useParams } from "next/navigation";
import Navigation from "../../component/nav"; // 네비게이션 컴포넌트
import {
  Container,
  Rectangle,
  Header,
  Logo,
  Title,
  NoticeContent,
  Navigation as NavSection,
  NavLink,
  BackButton,
} from "../../styled/[notice_index].styled";

const NoticeDetailPage = () => {
  const router = useRouter();
  const { notice_index: rawNoticeIndex } = useParams();

  // notice_index가 배열일 경우 첫 번째 값 사용
  const notice_index = Array.isArray(rawNoticeIndex) ? rawNoticeIndex[0] : rawNoticeIndex || "";

  const notices = [
    { notice_index: "1", title: "공지사항1", content: "모코코", date: "2024-11-28" },
    { notice_index: "2", title: "공지사항2", content: "내용2", date: "2024-11-29" },
  ];

  const currentNotice = notices.find((n) => n.notice_index === notice_index);

  if (!currentNotice) {
    return (
      <Container>
        <Header>
          <Logo onClick={() => router.push("/")}>🐝</Logo>
        </Header>
        <Title>공지사항을 찾을 수 없습니다.</Title>
        <BackButton onClick={() => router.push("/notice")}>목록으로 돌아가기</BackButton>
      </Container>
    );
  }

  const previousNotice = notices.find((n) => n.notice_index === `${parseInt(notice_index) - 1}`);
  const nextNotice = notices.find((n) => n.notice_index === `${parseInt(notice_index) + 1}`);

  return (
    <>
      <Navigation />
      <Container>
        <Rectangle />
        <Header>
          <Logo onClick={() => router.push("/")}>🐝</Logo>
        </Header>
        <Title>{currentNotice.title}</Title>
        <NoticeContent>{currentNotice.content}</NoticeContent>
        <NavSection>
          <NavLink onClick={() => previousNotice && router.push(`/notice/${previousNotice.notice_index}`)}>
            {previousNotice ? `이전글: ${previousNotice.title}` : "이전글이 없습니다."}
          </NavLink>
          <NavLink onClick={() => nextNotice && router.push(`/notice/${nextNotice.notice_index}`)}>
            {nextNotice ? `다음글: ${nextNotice.title}` : "다음글이 없습니다."}
          </NavLink>
        </NavSection>
        <BackButton onClick={() => router.push("/notice")}>목록</BackButton>
      </Container>
    </>
  );
};

export default NoticeDetailPage;
