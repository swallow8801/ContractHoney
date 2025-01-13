'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import {
  Container,
  Sidebar,
  Main,
  Title,
  BoardContainer,
  BoardTitle,
  BoardTable,
} from './notice.styled';

	const NoticeListPage = () => {
	const router = useRouter();

	// 공지사항 목록 데이터
	const notices = [
		{ id: 1, title: '공지사항 제목 1', author: '관리자', date: '2025-01-10' },
		{ id: 2, title: '공지사항 제목 2', author: '관리자', date: '2025-01-09' },
		{ id: 3, title: '공지사항 제목 3', author: '관리자', date: '2025-01-08' },
	];

	// 클릭 이벤트 핸들러
	const handleRowClick = (id: number) => {
		router.push(`/notice/${id}`);
	};

	return (
		<Container>
		<Sidebar>
			<Title>공지사항</Title>
		</Sidebar>
		<Main>
			<BoardContainer>
			<BoardTitle>공지사항</BoardTitle>
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
					key={notice.id}
					onClick={() => handleRowClick(notice.id)}
					style={{ cursor: 'pointer' }}
					>
					<td>{notice.id}</td>
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
	);
};

export default NoticeListPage;
