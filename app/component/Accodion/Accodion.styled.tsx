import styled from 'styled-components';

export const AccordionContainer = styled.div`
    width: 100%;
    background: #ffffff;
    border: 1px solid #e0e0e0;
    border-radius: 5px;
`;

export const AccordionItem = styled.div`
    border-bottom: 1px solid #e0e0e0;

    &:last-child {
        border-bottom: none;
    }
`;

export const AccordionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 20px;
    font-size: 17.3px;
    color: rgb(75, 75, 75);
    font-weight: 500;
    cursor: pointer;
    background: #f9f9f9;

    &:hover {
        background: #f1f1f1;
    }
`;

export const AccordionContent = styled.div`
    display: flex;
    align-items: flex-start; /* 아이콘과 텍스트의 상단 정렬 */
    gap: 10px; /* 아이콘과 텍스트 사이의 간격 */
    padding: 15px 20px;
    font-size: 16.5px;
    color:rgb(90, 90, 90);
    line-height: 1.8;
    text-align: left;
    white-space: pre-line; /* 줄바꿈 적용 */
    overflow-wrap: break-word; /* 긴 단어를 줄 바꿈 */

    div {
        flex: 1; /* 텍스트가 남은 공간을 차지하도록 설정 */
        display: flex;
        flex-direction: column; /* 텍스트가 세로로 나열되도록 설정 */
    }
`;

export const PlusIcon = styled.div`
    width: 16px;
    height: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    color: #555;
    font-weight: bold;

    &:before {
        content: '+';
    }
`;

export const MinusIcon = styled(PlusIcon)`
    &:before {
        content: '-';
    }
`;
