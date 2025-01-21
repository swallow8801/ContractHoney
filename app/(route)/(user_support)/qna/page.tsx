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
  NotificationBox,
  NotificationMessage,
  ConfirmButton,
  NotificationOverlay,
  DeleteButton,
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

const MainPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [qnas, setQnas] = useState<QnaType[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [notification, setNotification] = useState<{ type: string; message: string; qnaId?: number } | null>(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const checkLoginAndFetchQnas = async () => {
      const token = localStorage.getItem("authToken");

      if (!token) {
        router.push("/login");
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

  const handleDeleteClick = (qnaId: number) => {
    setNotification({ type: "confirm-delete", message: "정말 삭제하시겠습니까?", qnaId });
  };

  const handleConfirm = async () => {
    if (notification?.type === "confirm-delete" && notification.qnaId) {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          router.push("/login");
          return;
        }

        const response = await fetch(`/api/qna/deleteQnA`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ qnaId: notification.qnaId }),
        });

        if (!response.ok) {
          throw new Error("삭제 요청에 실패했습니다.");
        }

        setNotification({ type: "success", message: "삭제가 완료되었습니다." });
        setQnas((prevQnas) => prevQnas.filter((qna) => qna.qna_id !== notification.qnaId));
        setTimeout(() => setNotification(null), 1500);
      } catch (error) {
        console.error("Error deleting Q&A:", error);
        setNotification({ type: "error", message: "삭제 중 오류가 발생했습니다." });
      }
    } else {
      setNotification(null);
    }
  };

  const handleCancel = () => {
    setNotification(null);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = qnas.slice(startIndex, startIndex + itemsPerPage);
  const totalPages = Math.ceil(qnas.length / itemsPerPage);

  return (
    <Container>
      {notification && (
        <NotificationOverlay>
          <NotificationBox>
            <NotificationMessage>{notification.message}</NotificationMessage>
            {notification.type === "success" ? (
              <ConfirmButton $type="ok" onClick={handleCancel}>
                확인
              </ConfirmButton>
            ) : (
              <>
                <ConfirmButton $type="error" onClick={handleConfirm}>
                  확인
                </ConfirmButton>
                <ConfirmButton $type="norm" onClick={handleCancel}>
                  취소
                </ConfirmButton>
              </>
            )}
          </NotificationBox>
        </NotificationOverlay>
      )}
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
                    {!isAdmin && !qna.qna_answer && (
                      <td>
                        <DeleteButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteClick(qna.qna_id);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashCan} />
                        </DeleteButton>
                      </td>
                    )}
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

export default MainPage;
