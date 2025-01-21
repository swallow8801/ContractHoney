"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter, usePathname } from "next/navigation";
import {
  Container,
  Sidebar,
  SidebarTitle,
  Main,
  MainTitle,
  MenuList,
  MenuItem,
  ArchiveTable,
  ReplySection,
  ReplyButton,
  BackButton,
  ButtonContainer,
  TextareaContainer,
  ConfirmButton,
  NotificationBox,
  NotificationMessage,
  NotificationOverlay,
  MainInfo,
  DeleteButton,
} from "./[qna_id].styled";

interface QnaType {
  qna_id: number;
  qna_title: string;
  qna_content: string;
  qna_cont_date: string;
  qna_answer: string | null;
  qna_answ_date: string | null;
}

const formatDate = (isoString: string) => {
  const date = new Date(isoString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
};

const QnaDetailPage = () => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [qna, setQna] = useState<QnaType | null>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQnaDetail = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          throw new Error("로그인이 필요합니다.");
        }

        const adminResponse = await fetch(`/api/qna/qna_admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!adminResponse.ok) {
          throw new Error("관리자 확인에 실패했습니다.");
        }

        const adminData = await adminResponse.json();
        setIsAdmin(adminData.isAdmin);

        const qnaResponse = await fetch(`/api/qna/${params.qna_id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!qnaResponse.ok) {
          throw new Error("QnA 데이터를 가져오지 못했습니다.");
        }

        const qnaData = await qnaResponse.json();
        setQna(qnaData.qna);
      } catch (error) {
        console.error("Error fetching Q&A details:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQnaDetail();
  }, [params.qna_id]);

  const handleDeleteClick = () => {
    setNotification({ type: "confirm-delete", message: "삭제하시겠습니까?" });
  };

  const handleConfirm = async () => {
    if (notification?.type === "confirm-delete" && qna) {
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
          body: JSON.stringify({ qnaId: qna.qna_id }),
        });

        if (!response.ok) {
          throw new Error("삭제 요청에 실패했습니다.");
        }

        setNotification({ type: "success", message: "삭제가 완료되었습니다." });
        setTimeout(() => {
          router.push("/qna");
        }, 1500);
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

  const handleReplySubmit = async () => {
    if (!reply.trim()) {
      setNotification({ type: "error", message: "답변 내용을 입력하세요." });
      return;
    }
  
    setLoading(true);
  
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setNotification({ type: "error", message: "로그인이 필요합니다." });
        router.push("/login");
        return;
      }
  
      const response = await fetch(`/api/qna/${params.qna_id}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: reply }),
      });
  
      if (!response.ok) {
        throw new Error("답변 등록에 실패했습니다.");
      }
  
      const updatedQna = await response.json();
      setQna(updatedQna.qna);
      setReply("");
      setNotification({ type: "ok", message: "답변이 등록되었습니다." });
    } catch (error) {
      console.error("Error submitting reply:", error);
      setNotification({ type: "error", message: "답변 등록 중 오류가 발생했습니다." });
    } finally {
      setLoading(false);
    }
  };  

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <Container>
      {notification && (
  <NotificationOverlay>
    <NotificationBox>
      <NotificationMessage>{notification.message}</NotificationMessage>
      {notification.type === "ok" ? (
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
        <SidebarTitle>Q&A</SidebarTitle>
        <MenuList>
          <MenuItem
            $active={pathname === "/faq"}
            onClick={() => router.push("/faq")}
          >
            자주 묻는 질문
          </MenuItem>
          <MenuItem
            $active={pathname.includes("/qna")}
            onClick={() => router.push("/qna")}
          >
            Q&A
          </MenuItem>
        </MenuList>
      </Sidebar>
      <Main>
        <MainTitle>{qna?.qna_title}</MainTitle>
        <MainInfo>작성일 : {qna ? formatDate(qna.qna_cont_date) : ""}</MainInfo>
        <ArchiveTable>
          <tbody>
            <tr>
              <th>질문</th>
              <td>{qna?.qna_content}</td>
            </tr>
            {qna?.qna_answer && (
              <tr>
                <th>답변</th>
                <td>{qna.qna_answer}</td>
              </tr>
            )}
          </tbody>
        </ArchiveTable>
        {isAdmin && !qna?.qna_answer && (
          <ReplySection>
            <TextareaContainer>
              <textarea
                placeholder="답변을 입력하세요."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                disabled={loading}
              />
              <button onClick={handleReplySubmit} disabled={loading}>
                {loading ? "등록 중..." : "답변 등록"}
              </button>
            </TextareaContainer>
          </ReplySection>
        )}
        <ButtonContainer>
          {!isAdmin && !qna?.qna_answer && (
            <DeleteButton onClick={handleDeleteClick}>삭제</DeleteButton>
          )}
          <BackButton onClick={() => router.push("/qna")}>목록</BackButton>
        </ButtonContainer>
      </Main>
    </Container>
  );
};

export default QnaDetailPage;
