import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
  padding: 40px 20px;
`;

export const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

export const ContentBox = styled.div`
  background: #f8f8f8;
  padding: 30px;
  border-radius: 10px;
  width: 80%;
  max-width: 800px;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: bold;
  margin-top: 20px;
`;
