import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 92vh;
  background: #ffffff;
`;

export const Sidebar = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  padding: 30px 0;
  background: #f5f5f5;
`;

export const Main = styled.main`
  flex: 1;
  padding: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-y: auto;
  box-sizing: border-box;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color: rgb(75, 75, 75);
`;

export const QNATitle = styled.h2`
  font-size: 28px;
  font-weight: 500;
  color: #2d2d2d;
  text-align: center;
  border-top: 1px solid #e0e0e0;
  padding-bottom: 10px;
  padding-top: 30px;
`;

export const QnaInfo = styled.div`
  font-size: 16.5px;
  color: #737373;
  text-align: right;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 30px;
  padding-right: 70px;
  margin-bottom: 20px;
`;

export const Content = styled.div`
  font-size: 17px;
  color: #2d2d2d;
  line-height: 1.8;
  white-space: pre-line; /* 줄바꿈 적용 */
  overflow-wrap: break-word; /* 긴 단어를 줄 바꿈 */
  padding: 20px 30px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background: #f9f9f9;
`;

export const ReplySection = styled.div`
  margin-top: 20px;
`;

export const ReplyTextarea = styled.textarea`
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  resize: none;
  font-size: 16px;
  min-height: 100px;
`;

export const SubmitButton = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background: #2c2c2c;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;

  &:hover {
    background:rgb(120, 123, 126);
  }
`;

export const Reply = styled.div`
  margin-top: 20px;
  padding: 15px 20px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background: #f1f1f1;
  display: flex;
  flex-direction: column;
`;

export const ReplyAuthor = styled.span`
  font-weight: bold;
  font-size: 16px;
  color: #444;
  margin-bottom: 5px;
`;

export const ReplyContent = styled.p`
  font-size: 15px;
  color: #333;
  line-height: 1.5;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  gap: 10px;
`;

export const BackButton = styled.button`
  padding: 8px 16px;
  background: rgb(169, 169, 169);
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: white;
  cursor: pointer;

  &:hover {
    background: rgb(141, 141, 141);
  }
`;

export const NotificationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const NotificationBox = styled.div`
  width: 400px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  text-align: center;
`;

export const ConfirmButton = styled.button`
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  font-size: 16px;

  &:hover {
    background: #0056b3;
  }
`;
