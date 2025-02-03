import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  min-height: 100vh;
`;

export const LogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
  background-color: #f9f9f9;
  border-bottom: 1px solid #e0e0e0;
  position: sticky; /* 고정 위치 설정 */
  top: 0; /* 화면 최상단에 고정 */
  z-index: 1000; /* 다른 요소 위에 표시되도록 */
  width: 100vw;
  justify-content: flex-start; /* 왼쪽 정렬 */
  padding: 20px 0 20px 50px;
  margin-bottom: 30px;
`;

export const ContentBox = styled.div`
  background: #f8f8f8;
  padding: 30px;
  border-radius: 10px;
  width: 85%;
  text-align: left;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  line-height: 1.6;  
  margin-bottom: 50px;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #222;
`;

export const SectionTitle = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 30px;
  margin-bottom: 5px;
  color: #222;
`;

export const Text = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.6;
`;

/* 리스트 스타일 */
export const List = styled.ol`
  font-size: 14px;
  color: #666;
  padding-left: 20px;
  line-height: 1.6;
`;

export const UnorderedList = styled.ul`
  font-size: 14px;
  color: #666;
  padding-left: 20px;
  line-height: 1.6;
`;

/* - 모양 리스트 */
export const ListItem = styled.li`
  margin-bottom: 8px;
  list-style-type: none;
  position: relative;
  padding-left: 18px;

  &::before {
    content: "-";
    position: absolute;
    left: 0;
    color: #666;
  }
`;

/* ● 모양 리스트 */
export const UnorderedListItem = styled.li`
  margin-bottom: 8px;
  list-style-type: none;
  position: relative;
  padding-left: 18px;

  &::before {
    content: "●";
    position: absolute;
    left: 0;
    color: #666;
    font-size: 10px;
  }
`;
