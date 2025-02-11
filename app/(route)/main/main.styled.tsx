import styled from "styled-components"

export const Container = styled.div`
    height: calc(100vh - 90px);
    scroll-snap-type: y mandatory;
    overflow-y: scroll;
    scroll-behavior: smooth;
    position: relative;
    
    /* Hide scrollbar */
    &::-webkit-scrollbar {
        display: none;
    }
    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;

    /* 모든 섹션에 스냅 적용 */
    & > * {
        scroll-snap-align: start;
    }

    /* 마지막 요소(Footer)에는 스냅 적용 X */
    & > *:last-child {
        scroll-snap-type: y proximity;
    }
`;


export const Group = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: calc(100vh - 90px);
    width: 100%;
    scroll-snap-align: start;
    scroll-snap-stop: always;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    overflow: hidden;
    transition: all 0.5s ease-in-out;
`

export const Title = styled.h1`
    font-size: 48px;
    font-weight: bold;
    color: white;
    margin-bottom: 20px;
    z-index: 20;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.1);

    @keyframes fadeInUp {
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`

export const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    z-index: 20;
    width: 100%;
    max-width: 400px;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards 0.2s;
`

export const CustomSelect = styled.div`
  position: relative;
  width: 100%;
`

export const SelectTrigger = styled.button`
  width: 100%;
  padding: 12px 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;
  color: #333;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    border-color: rgba(255, 255, 255, 0.4);
  }
`

export const DropdownContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  margin-top: 5px;
`

export const DropdownSearch = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  border-bottom: 1px solid #eee;
  font-size: 14px;
  outline: none;

  &::placeholder {
    color: #999;
  }
`

export const NewContractButton = styled.button`
  width: 100%;
  padding: 12px;
  background: none;
  border: none;
  border-bottom: 1px solid #eee;
  text-align: left;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background: #f5f5f5;
  }

  svg {
    color: #666;
  }
`

export const NewContractInput = styled.input<{ $hasWarning?: boolean }>`
  width: 100%;
  padding: 12px;
  border: 1px solid ${(props) => (props.$hasWarning ? "red" : "#ddd")};
  font-size: 14px;
  outline: none;
  &:focus {
    outline: none;
    border-color: ${(props) => (props.$hasWarning ? "red" : "#007bff")};
  }

  &::placeholder {
    color: #999;
  }
`

export const ContractList = styled.div`
  max-height: 200px;
  overflow-y: auto;

  /* 스크롤바 스타일링 (웹킷 기반 브라우저) */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export const ContractItem = styled.button`
  width: 100%;
  padding: 12px 15px;
  background: none;
  border: none;
  text-align: left;
  color: #333;
  font-size: 14px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #f5f5f5;
  }

  &.new {
    font-style: italic;
  }
`

export const ContractTitle = styled.span`
  color: #333;
  font-weight: 500;
`

export const ContractVersion = styled.span`
  color: #666;
  font-size: 12px;
  flex-shrink: 0;
  font-weight: 400;
  
  &.new {
    color: #4caf50;
    font-weight: 600;
  }
`

export const Button = styled.button`
    padding: 15px 30px;
    background-color:#F2B024;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 16px;
    transition: all 0.3s ease;

    &:hover {
        background-color: #e0a00f;
        transform: translateY(-2px);
    }

    &:disabled {
        background-color:rgb(95, 84, 57);
        cursor: not-allowed;
        transform: none;
    }
`

export const Notice = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 80%;
    max-width: 600px;
    z-index: 20;
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.8s forwards 0.2s;
`

export const NoticeItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px 20px; /* 전체 아이템에 패딩 추가 */
  border-radius: 8px;
  font-size: 16px;
  color: #333;
  cursor: pointer;
`

export const NoticeItemTitle = styled.span`
  text-align: left;
  flex: 1;
  padding-right: 20px; /* 제목 오른쪽에 패딩 추가 */
`

export const NoticeItemAuthor = styled.span`
  text-align: right;
  margin-right: 10px; /* 글쓴이와 날짜 사이 간격 추가 */
  color: #555; /* 글쓴이 색상 */
`

export const NoticeItemDate = styled.span`
  text-align: right;
  color: #888; /* 날짜 색상 */
`

export const ViewAll = styled.button`
    align-self: flex-end;
    margin-top: 10px;
    padding: 10px;
    font-size: 18px;
    background: none;
    border: none;
    cursor: pointer;
    color: white;
    transition: all 0.3s ease;

    &:hover {
        transform: translateX(5px);
    }
`

export const FileUploadContainer = styled.div`
    width: 100%;
    max-width: 400px;
`

export const FileUploadArea = styled.div<{ $isDragging?: boolean; $disabled?: boolean }>`
    padding: 15px;
    border: 2px dashed ${(props) => (props.$isDragging ? "#ffffff" : "rgba(87, 87, 87, 0.3)")};
    border-radius: 8px;
    background: ${(props) => (props.$isDragging ? "rgba(87, 87, 87, 0.1)" : "rgba(87, 87, 87, 0.05)")};
    color:rgb(119, 119, 119);
    text-align: center;
    cursor: ${(props) => (props.$disabled ? "not-allowed" : "pointer")};
    transition: all 0.3s ease;
    opacity: ${(props) => (props.$disabled ? 0.5 : 1)};

    &:hover {
        border-color: ${(props) => (props.$disabled ? "rgba(87, 87, 87, 0.3)" : "rgba(87, 87, 87, 0.35)")};
        background: ${(props) => (props.$disabled ? "rgba(87, 87, 87, 0.05)" : "rgba(87, 87, 87, 0.1)")};
    }
`

export const FileInput = styled.input`
    display: none;
`

export const FileName = styled.div`
    color: rgb(66, 66, 66);
    font-size: 15px;
    word-break: break-all;
`

export const SearchableSelect = styled.div`
  position: relative;
  width: 100%;
`

export const SearchInput = styled.input`
  width: 100%;
  padding: 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;

  &:hover, &:focus {
    border-color: rgba(255, 255, 255, 0.6);
    outline: none;
  }
`

export const Select = styled.select`
  width: 100%;
  padding: 15px;
  border: 2px solid rgba(255, 255, 255, 0.2);
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
  color: #333;
  cursor: pointer;

  &:hover, &:focus {
    border-color: rgba(255, 255, 255, 0.6);
    outline: none;
  }

  option {
    color: #333;
    background: white;
  }
`

export const DropdownList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 200px;
  overflow-y: auto;
  background: white;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 0 0 8px 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
`

export const DropdownItem = styled.li`
  padding: 10px 15px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }
`

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.9);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`

export const LoadingSpinner = styled.div`
  width: 50px;
  height: 50px;
  border: 3px solid #f3f3f3;
  border-top: 3px solid #333;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 20px;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

export const LoadingText = styled.div`
  color: #333;
  font-size: 16px;
  margin-top: 10px;
  text-align: center;
`

export const LoginMessage = styled.div`
  color: white;
  font-size: 18px;
  margin-top: 20px;
  text-align: center;
  z-index: 2;
`

export const WarningMessage = styled.div`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  padding: 0 12px;
`

export const GradientText = styled.span`
  background: linear-gradient(135deg, #3498db, #8e44ad);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
`

