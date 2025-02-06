import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 92vh;
  background: #f5f5f5;
  padding: 30px;
  gap: 20px;
`

export const ClauseEx = styled.div`
  font-size: 16px;
  line-height: 1.6;
  color: #333; /* 텍스트 색상 */
  margin-bottom: 12px; /* 여백 */
  display: flex;
  align-items: center; /* 아이콘과 텍스트 정렬 */
  gap: 10px; /* 아이콘과 텍스트 간격 */
`;

export const InfoIcon = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: #4a90e2; /* 아이콘 배경색 */
  color: white;
  font-size: 12px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;


export const PreviewSection = styled.div`
  flex: 1;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`

export const AnalysisSection = styled.div`
  flex: 1;
  height: 100%;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`

export const NavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
`

export const PageNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const NavButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
  color: #666;

  &:hover {
    color: #333;
  }

  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`

export const PageInfo = styled.span`
  color: #666;
  font-size: 14px;
`

export const DocumentTitle = styled.h1`
  font-size: 18px;
  color: #333;
  margin: 0;
`

export const PreviewContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;

  img, embed {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`

export const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid ${(props) => (props.$active ? "#333" : "transparent")};
  color: ${(props) => (props.$active ? "#333" : "#666")};
  font-weight: ${(props) => (props.$active ? "600" : "normal")};
  cursor: pointer;

  &:hover {
    color: #333;
  }
`

export const Badge = styled.span`
  background: #ff4444;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
`

export const AnalysisContent = styled.div`
  flex: 1;
  overflow-y: auto;
`

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`

export const ActionButton = styled.button`
  padding: 10px 20px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;

  &.share {
    background: #f5f5f5;
    color: #333;
  }

  &.download {
    background: #333;
    color: white;
  }

  &:hover {
    opacity: 0.9;
  }
`

export const HancomPlaceholder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: #666;

  svg {
    margin-bottom: 16px;
  }

  p {
    margin: 8px 0;
  }

  button {
    margin-top: 16px;
  }
`

export const ClauseContainer = styled.div<{ $checked?: boolean }>`
  background-color: ${(props) => (props.$checked ? "#f0f0f0" : "#f8f8f8")};
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$checked ? 0.7 : 1)};
`

export const ClauseHeader = styled.div<{ $checked?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 10px;
  opacity: ${(props) => (props.$checked ? 0.7 : 1)};
`

export const ClauseContent = styled.p<{ $checked?: boolean }>`
  font-size: 16px;
  color: ${(props) => (props.$checked ? "#999" : "#333")};
  line-height: 1.5;
  transition: color 0.3s ease, opacity 0.3s ease;
  opacity: ${(props) => (props.$checked ? 0.7 : 1)};
`

export const ClauseExplanation = styled.div<{ $checked?: boolean }>`
  background-color: ${(props) => (props.$checked ? "#f0f0f0" : "#f8f8f8")};
  border-radius: 8px;
  padding: 20px;
  margin-top: 20px;
  border: 1px solid #e0e0e0;
  transition: all 0.3s ease;
  opacity: ${(props) => (props.$checked ? 0.7 : 1)};
`

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`

export const PaginationButton = styled.button`
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: white;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;

  &:hover:not(:disabled) {
    background: #f5f5f5;
    border-color: #ccc;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`

export const ClauseCheckbox = styled.button<{ $checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid #ccc;
  background: ${(props) => (props.$checked ? "#333" : "white")};
  color: white;
  cursor: pointer;
  padding: 0;
  transition: all 0.2s;

  &:hover {
    border-color: #999;
  }

  svg {
    opacity: ${(props) => (props.$checked ? 1 : 0)};
  }
`

export const SummaryContent = styled.div`
  h3 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin-bottom: 15px;
  }

  h4 {
    font-size: 16px;
    font-weight: 600;
    color: #444;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    color: #555;
    line-height: 1.5;
    margin-bottom: 15px;
  }
`

export const ProbabilityBar = styled.div`
  width: 100%;
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 5px;
`

export const ProbabilityFill = styled.div<{ $percentage: number }>`
  width: ${(props) => props.$percentage}%;
  height: 100%;
  background-color: ${(props) => {
    if (props.$percentage < 33) return "#4caf50"
    if (props.$percentage < 66) return "#ffa000"
    return "#f44336"
  }};
  transition: width 0.3s ease-in-out;
`

export const ProbabilityLabel = styled.div<{ $percentage: number }>`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-top: 5px;
  font-size: 14px;
  font-weight: bold;
  color: ${(props) => {
    if (props.$percentage < 33) return "#4caf50"
    if (props.$percentage < 66) return "#ffa000"
    return "#f44336"
  }};
`

export const ProbabilityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ProbabilitySection = styled.div`
  margin-bottom: 20px;
`

export const ExplanationTitle = styled.h4<{ $checked?: boolean }>`
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-top: 10px;
  margin-bottom: 10px;
  opacity: ${(props) => (props.$checked ? 0.7 : 1)};
`

export const LawReference = styled.div`
  margin-bottom: 10px;
`

export const LawReferenceLabel = styled.div`
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 8px;
`

export const LawReferenceContent = styled.div`
  color: #333;
  line-height: 1.5;
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #e0e0e0;
  margin: 20px 0;
`

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  width: 100%;
  margin-top: 20px;
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

export const LoadingText = styled.p`
  color: #666;
  font-size: 1rem;
  margin: 0;
`