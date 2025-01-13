import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 92vh;
    background: #ffffff;
`;

export const Sidebar = styled.aside`
    width: 20%; /* 사이드바 너비 */
    display: flex;
    flex-direction: column; /* 세로로 배치 */
    align-items: center; /* 중앙 정렬 */
    padding: 30px 0;

    ul {
        list-style: none;
        padding: 0;
        margin: 20px 0 0 0; /* 제목과 간격 추가 */
        width: 70%; /* 박스 너비 */
        background: #ffffff; /* 박스 배경색 */
        border: 1px solid #e0e0e0; /* 박스 테두리 */
        border-radius: 5px; /* 모서리 둥글게 */
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

        li {
        font-size: 16px;
        padding: 15px 10px; /* 내부 여백 */
        cursor: pointer;
        border-bottom: 1px solid #e0e0e0; /* 리스트 구분선 */

        &:last-child {
            border-bottom: none; /* 마지막 리스트 구분선 제거 */
        }

        &:hover {
            color:rgb(206, 161, 0); /* 호버 시 색상 변경 */
            background: #f1f1f1; /* 호버 시 배경색 변경 */
        }
        }
    }
`;

export const Main = styled.main`
    flex: 1;
    padding: 40px;
    width: 80%;
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
    text-align: center; /* 제목 중앙 정렬 */
`;

export const NoticeTitle = styled.div`
    font-size: 27px;
    color: #2d2d2d;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1.6px solid rgb(190, 190, 190);
`;

export const NoticeBox = styled.div`
  width: 80%;
  background-color: #e0e0e0;
  padding: 20px;
  border-radius: 5px;
  margin: 0 auto 20px auto; /* 가로 중앙 정렬 */
  text-align: left; /* 텍스트는 왼쪽 정렬 유지 */

  p {
    font-size: 18px;
    font-weight: 500;
    margin-bottom: 5px;
    color: #333;
  }

  span {
    font-size: 16px;
    color: #555;
  }
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%; /* Main의 80%로 설정 */
  margin: 0 auto; /* 가로 중앙 정렬 */
  text-align: left; /* 텍스트는 왼쪽 정렬 */
`;

export const FormLabel = styled.label`
  font-size: 19px;
  font-weight: 600;
  color: #737373;
  text-align: left; /* 텍스트는 왼쪽 정렬 유지 */
`;

export const FormInput = styled.input`
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  margin-bottom: 30px;
`;

export const FormTextarea = styled.textarea`
  padding: 10px;
  font-size: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  height: 200px; /* 기본 높이 설정 */
  resize: vertical; /* 사용자가 수직 방향으로 크기 조정 가능 */
  margin-bottom: 30px;
  overflow-y: auto; /* 텍스트가 많아질 경우 스크롤 표시 */
`;


export const FormFileInput = styled.input`
  font-size: 14px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

export const SubmitButton = styled.button`
  padding: 10px 20px;
align-self: flex-end;
  background-color: rgb(169, 169, 169);
  color: white;
  font-size: 17px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 50px auto; /* 가로 중앙 정렬 */

  &:hover {
    background-color: rgb(141, 141, 141);
  }
`;