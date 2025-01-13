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