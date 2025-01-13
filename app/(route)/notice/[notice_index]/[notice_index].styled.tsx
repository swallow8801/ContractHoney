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
    min-height: auto; /* 높이를 자동으로 조정 */
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

export const BackButton = styled.button`
    width: 80px;
    align-self: flex-end; /* 오른쪽 정렬 */
    margin-top: 20px;
    margin-right: 25px;
    padding: 10px 10px;
    background: rgb(169, 169, 169);
    border: none;
    border-radius: 5px;
    font-size: 17px;
    color: #ffffff;
    cursor: pointer;

    &:hover {
        background: rgb(141, 141, 141);
    }
        
`;
