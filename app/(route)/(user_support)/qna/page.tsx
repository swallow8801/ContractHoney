"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Sidebar,
  Main,
  Title,
  QNATitle,
  MenuList,
  MenuItem,
  Table,
  WriteButton,
  Pagination,
  PageButton,
  DeleteButton,
} from "./qna.styled";

interface QnaType {
  qna_id: number;
  qna_title: string;
  qna_cont_date: string;
  user_name?: string;
  qna_answer: string | null;
  qna_answ_date: string | null;
  isOwner: boolean; // 본인이 작성한 Q&A 여부
}

const MainPage = () => {
  const router = useRouter();
  const [qnas, setQnas] = useState<QnaType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchQnas = async () => {
      try {
        setIsLoading(true);

        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("로그인이 필요합니다.");
        }

        const response = await fetch("/api/qna/qna_admin", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("데이터를 불러오는 데 실패했습니다.");
        }

        const { isAdmin: adminRole, data }: { isAdmin: boolean; data: QnaType[] } = await response.json();
        setIsAdmin(adminRole);
        setQnas(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQnas();
  }, []);

  const handleDelete = async (qnaId: number) => {
    if (!window.confirm("정말로 삭제하시겠습니까?")) return;

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("로그인이 필요합니다.");
        router.push("/login");
        return;
      }

      const response = await fetch(`/api/qna/deleteQnA`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ qnaId }),
      });

      if (!response.ok) {
        throw new Error("삭제 요청에 실패했습니다.");
      }

      alert("삭제가 완료되었습니다.");
      setQnas((prevQnas) => prevQnas.filter((qna) => qna.qna_id !== qnaId));
    } catch (error) {
      console.error("Error deleting Q&A:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = qnas.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(qnas.length / itemsPerPage);

  return (
    <Container>
      <Sidebar>
        <Title>Q&A</Title>
        <MenuList>
          <MenuItem onClick={() => router.push("/faq")}>자주 묻는 질문</MenuItem>
          <MenuItem $active>Q&A</MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <QNATitle>Q&A</QNATitle>
        {isLoading ? (
          <p>데이터를 불러오는 중입니다...</p>
        ) : error ? (
          <p style={{ color: "red", fontWeight: "bold" }}>{error}</p>
        ) : currentItems.length > 0 ? (
          <>
            <Table>
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
                    <td>{startIndex + index + 1}</td>
                    <td
                      style={{ cursor: "pointer" }}
                      onClick={() => router.push(`/qna/${qna.qna_id}`)}
                    >
                      {qna.qna_title}
                    </td>
                    {isAdmin && <td>{qna.user_name || "알 수 없음"}</td>}
                    <td>{new Date(qna.qna_cont_date).toLocaleDateString()}</td>
                    <td>{qna.qna_answer ? "답변 완료" : "답변 대기 중"}</td>
                    {!isAdmin && (
                      <td>
                        {!qna.qna_answer && (
                          <DeleteButton
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDelete(qna.qna_id);
                            }}
                          >
                            삭제
                          </DeleteButton>
                        )}
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination>
              <PageButton disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>
                이전
              </PageButton>
              {Array.from({ length: totalPages }, (_, i) => (
                <PageButton
                  key={i}
                  $active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PageButton>
              ))}
              <PageButton disabled={currentPage === totalPages} onClick={() => setCurrentPage(currentPage + 1)}>
                다음
              </PageButton>
            </Pagination>
          </>
        ) : (
          <p>등록된 Q&A가 없습니다.</p>
        )}
        {!isAdmin && <WriteButton onClick={() => router.push("/qna/writeQnA")}>문의하기</WriteButton>}
      </Main>
    </Container>
  );
};

export default MainPage;
