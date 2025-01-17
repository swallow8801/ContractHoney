import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  background: #f5f5f5;
  padding: 20px;
  gap: 20px;
`;

export const PreviewSection = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

export const AnalysisSection = styled.div`
  flex: 1;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const NavigationBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
`;

export const PageNavigation = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

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
`;

export const PageInfo = styled.span`
  color: #666;
  font-size: 14px;
`;

export const DocumentTitle = styled.h1`
  font-size: 18px;
  color: #333;
  margin: 0;
`;

export const PreviewContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;

  img, embed {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
`;

export const Tab = styled.button<{ $active?: boolean }>`
  padding: 10px 20px;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#333' : 'transparent'};
  color: ${props => props.$active ? '#333' : '#666'};
  font-weight: ${props => props.$active ? '600' : 'normal'};
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

export const Badge = styled.span`
  background: #ff4444;
  color: white;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 10px;
  margin-left: 5px;
`;

export const AnalysisContent = styled.div`
  flex: 1;
  overflow-y: auto;
`;

export const AnalysisItem = styled.div`
  margin-bottom: 20px;
`;

export const ItemLabel = styled.div`
  font-weight: 500;
  color: #666;
  margin-bottom: 8px;
`;

export const ItemContent = styled.div`
  color: #333;
  line-height: 1.5;
`;

export const ActionButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 20px;
`;

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
`;

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
`;

export const ClauseList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 20px;
`;

export const ClauseItem = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
  transition: background-color 0.2s;

  &:hover {
    background: #f5f5f5;
  }
`;

export const ClauseCheckbox = styled.button<{ checked: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  border: 2px solid ${props => props.checked ? '#333' : '#ccc'};
  background: ${props => props.checked ? '#333' : 'white'};
  color: white;
  cursor: pointer;
  flex-shrink: 0;
  padding: 0;
  transition: all 0.2s;

  &:hover {
    border-color: #333;
  }

  svg {
    opacity: ${props => props.checked ? 1 : 0};
  }
`;

export const ClauseTitle = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  margin: 0 0 8px 0;
`;

export const ClauseContent = styled.p`
  font-size: 14px;
  color: #666;
  margin: 0;
  line-height: 1.5;
`;

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 24px;
`;

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
`;

export const ClauseType = styled.div`
  font-size: 18px;
  font-weight: 500;
  color: #333;
  margin-bottom: 16px;
`;

