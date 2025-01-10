import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  width: 1640px;
  height: 1161px;
  background: #ffffff;
`;

export const Main = styled.main`
  flex: 1;
  width: 100%;
  padding: 40px;
  position: relative;
`;

export const Title = styled.h1`
  font-family: "Nunito", sans-serif;
  font-size: 36px;
  font-weight: 400;
  line-height: 49px;
  color: #000000;
  margin-bottom: 20px;
`;

export const BoardContainer = styled.div`
  width: 100%;
  margin-top: 20px;
`;

export const BoardTitle = styled.h2`
  font-family: "Inter", sans-serif;
  font-size: 30px;
  font-weight: 400;
  color: #2d2d2d;
  margin-bottom: 10px;
`;

export const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    border-bottom: 1px solid #cac4d0;
    text-align: left;
    padding: 10px 16px;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    color: #737373;
  }

  th {
    font-weight: bold;
  }

  td {
    font-weight: normal;
  }
`;
