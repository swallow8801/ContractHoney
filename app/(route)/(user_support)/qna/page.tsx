'use client';

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  Container,
  Sidebar,
  Main,
  SidebarTitle,
  MenuList,
  MenuItem,
  MainTitle,
  Table,
  WriteButton,
  Pagination,
  PageButton,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
} from "./qna.styled";

interface QnaType {
  qna_id: number;
  qna_title: string;
  qna_cont_date: string;
  user_name?: string;
  qna_answer: string | null;
  qna_answ_date: string | null;
  isOwner: boolean;
}

const QnAPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [qnas, setQnas] = useState<QnaType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const checkLoginAndFetchQnas = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login?redirect=/qna");
        return;
      }

      setIsLoggedIn(true);

      try {
        setIsLoading(true);
        const response = await fetch("/api/qna/qna_admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }

        const { isAdmin: adminRole, data }: { isAdmin: boolean; data: QnaType[] } =
          await response.json();
        setIsAdmin(adminRole);
        setQnas(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkLoginAndFetchQnas();
  }, [router]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = qnas.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(qnas.length / itemsPerPage);

  return (
    <Container>
      <Sidebar>
        <SidebarTitle>고객지원</SidebarTitle>
        <MenuList>
          <MenuItem
            $active={pathname === "/faq"}
            onClick={() => router.push("/faq")}
          >
            자주 묻는 질문
          </MenuItem>
          <MenuItem
            $active={pathname === "/qna"}
            onClick={() => router.push("/qna")}
          >
            Q&A
          </MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <MainTitle>Q&A</MainTitle>
        {isLoading ? (
          <Container>
            <LoadingContainer>
              <LoadingSpinner />
              <LoadingText>Q&A 목록을 불러오는 중입니다...</LoadingText>
            </LoadingContainer>
          </Container>
        ) : error ? (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        ) : currentItems.length > 0 ? (
          <>
            <Table $isAdmin={isAdmin}>
              <thead>
                <tr>
                  <th>번호</th>
                  <th>제목</th>
                  {isAdmin && <th>작성자</th>}
                  <th>작성일</th>
                  <th>답변 상태</th>
                  {!isAdmin && <th></th>}
                </tr>
              </thead>
              <tbody>
                {currentItems.map((qna, index) => (
                  <tr key={qna.qna_id}>
                    <td>{qnas.length - (startIndex + index)}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => router.push(`/qna/${qna.qna_id}`)}
                    >
                      {qna.qna_title}
                    </td>
                    {isAdmin && <td>{qna.user_name || "알 수 없음"}</td>}
                    <td>{new Date(qna.qna_cont_date).toLocaleDateString()}</td>
                    <td>{qna.qna_answer ? "답변 완료" : "답변 대기 중"}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <PageButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 10, 1))}
                disabled={currentPage <= 10}
              >
                {"<<"}
              </PageButton>
              <PageButton
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                {"<"}
              </PageButton>
              {[...Array(10)].map((_, i) => {
                const pageNumber = Math.floor((currentPage - 1) / 10) * 10 + i + 1;
                if (pageNumber > totalPages) return null;
                return (
                  <PageButton
                    key={pageNumber}
                    onClick={() => setCurrentPage(pageNumber)}
                    $active={currentPage === pageNumber}
                  >
                    {pageNumber}
                  </PageButton>
                );
              })}
              <PageButton
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                {">"}
              </PageButton>
              <PageButton
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 10, totalPages))
                }
                disabled={currentPage > totalPages - 10}
              >
                {">>"}
              </PageButton>
            </Pagination>
          </>
        ) : (
          <p>등록된 Q&A가 없습니다.</p>
        )}
        {isLoggedIn && !isAdmin && (
          <WriteButton onClick={() => router.push("/qna/writeQnA")}>
            문의하기
          </WriteButton>
        )}
      </Main>
    </Container>
  );
};

export default QnAPage;
