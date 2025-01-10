import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0;
  height: 94vh;
  background: #ffffff;
`;

export const MainContent = styled.main`
  flex: 1;
  padding: 24px;
  background: #f8f8f8;
  width: 100vw;
`;

export const Rectangle23 = styled.div`
  width: 100%;
  height: 25vh;
  background: #d9d9d9;
  border-radius: 15px;
  margin-bottom: 24px;
`;

export const AnalysisSection = styled.section`
  background: #ffffff;
  border-radius: 15px;
  padding: 16px;
  width: 100%;
  
  h2 {
    font-family: "Inter", sans-serif;
    font-size: 18px;
    margin-bottom: 16px;
  }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    text-align: left;
    padding: 8px 16px;
    border-bottom: 1px solid #cac4d0;
    font-family: "Inter", sans-serif;
    font-size: 14px;
  }

  select {
    padding: 4px;
    border: 1px solid #cac4d0;
    border-radius: 4px;
    font-family: "Inter", sans-serif;
  }
`;
