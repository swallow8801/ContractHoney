import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100vw;
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
  flex-direction: column;
`;

export const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
  color:rgb(75, 75, 75);
`;

export const BoardContainer = styled.div`
  width: 100%;
`;

export const BoardTitle = styled.h2`
  font-size: 27px;
  color: #2d2d2d;
  font-weight: 500;
  margin-top: 20px;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1.6px solid rgb(190, 190, 190);
`;

export const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 30px;

  tbody tr:hover {
    background: #f1f1f1; /* 행 hover 시 배경색 변경 */
  }

  th,
  td {
    border-bottom: 1px solid #cac4d0;
    text-align: left;
    padding: 10px 16px;
    font-size: 16px;
    color: #737373;
  }

  th {
    font-weight: 600;
  }

  td {
    font-weight: normal;
  }

  /* 순서별 너비 지정 */
  td:nth-child(1), th:nth-child(1) {
    width: 10%; /* 첫 번째 열 */
    text-align: center;
  }

  td:nth-child(2), th:nth-child(2) {
    width: 60%; /* 두 번째 열 */
  }

  th:nth-child(2) {
    text-align: center;
  }

  td:nth-child(3), th:nth-child(3) {
    width: 13%; /* 세 번째 열 */
    text-align: center;
  }

  td:nth-child(4), th:nth-child(4) {
    width: 17%; /* 네 번째 열 */
    text-align: center;
  }
`;
