import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 92vh;
    background: #ffffff;
`;

export const Sidebar = styled.div`
    width: 20%; /* 사이드바 너비 */
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 30px 0;
`;

export const Main = styled.main`
    flex: 1;
    padding: 40px;
    display: flex;
    flex-direction: column; /* 세로로 배치 */
    gap: 20px;
    margin-bottom: 20px;
    overflow-y: auto;
    box-sizing: border-box;
`;

export const Title = styled.h1`
    font-size: 30px;
    font-weight: 600;
    color: rgb(75, 75, 75);
`;

export const NoticeTitle = styled.h2`
    font-size: 28px;
    font-weight: 500;
    color: #2d2d2d;
    text-align: center;
    border-top: 1px solid #e0e0e0;
    padding-bottom: 10px;
    padding-top: 30px;
`;

export const NoticeInfo = styled.div`
    font-size: 16.5px;
    color: #737373;
    text-align: right;
    border-bottom: 1px solid #e0e0e0;
    padding-bottom: 30px;
    padding-right: 70px;
    margin-bottom: 20px;
`;

export const Content = styled.p`
    min-height: 300px; /* 높이를 자동으로 조정 */
    width: 100%; /* 최대 너비 설정 */
    max-width: 100%;
    font-size: 17px;
    color: #2d2d2d;
    line-height: 1.8;
    text-align: left;
    padding-left: 30px;
    margin-bottom: 20px;
    white-space: pre-line; /* 줄바꿈 적용 */
    overflow-wrap: break-word; /* 긴 단어를 줄 바꿈 */
`;

export const NavigationTable = styled.table`
    width: 100%;
    border-collapse: collapse;

    td {
        font-size: 15px;
        color: #737373;
        padding: 12px 8px;
        vertical-align: top;
    }

    td:first-child {
        width: 10%;
        font-weight: 600;
        color: #2d2d2d;
    }
`;

export const NavigationRow = styled.tr`
    border-bottom: 1px solid #e0e0e0;
`;

export const ButtonContainer = styled.button`
    align-self: flex-end; /* 오른쪽 정렬 */
    margin-top: 20px;
    margin-right: 25px;
    gap: 10px;
`

export const EditButton = styled.button`
    width: 80px;
    align-self: flex-end; /* 오른쪽 정렬 */
    margin-top: 20px;
    margin-right: 25px;
    padding: 7px 10px;
    background: rgb(91, 155, 215);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
        background: rgb(64, 133, 197);
    }
        
`;

export const DeleteButton = styled.button`
    width: 80px;
    align-self: flex-end; /* 오른쪽 정렬 */
    margin-top: 20px;
    margin-right: 25px;
    padding: 7px 10px;
    background: rgb(213, 55, 55);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
        background: rgb(174, 49, 49);
    }
        
`;

export const BackButton = styled.button`
    width: 80px;
    align-self: flex-end; /* 오른쪽 정렬 */
    margin-top: 20px;
    margin-right: 25px;
    padding: 7px 10px;
    background: rgb(169, 169, 169);
    border: none;
    border-radius: 5px;
    font-size: 16px;
    color: #ffffff;
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
  background-color: rgba(0, 0, 0, 0.3); /* 배경 어둡게 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const NotificationBox = styled.div`
  width: 400px;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

export const NotificationMessage = styled.p`
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
`;

export const ConfirmButton = styled.button`
  background: #007bff;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 7px 20px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: #0056b3;
  }
`;