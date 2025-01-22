import styled from "styled-components"

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 30px;
`

export const Title = styled.h1`
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
  font-weight: 600;
`

export const VersionSelector = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`

export const Select = styled.select`
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 16px;
  background-color: white;
  cursor: pointer;
  transition: border-color 0.3s;

  &:hover, &:focus {
    border-color: #F2B024;
    outline: none;
  }
`

export const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 5px;
`

export const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => (props.$active ? "#F2B024" : "transparent")};
  color: ${(props) => (props.$active ? "white" : "#333")};
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s, color 0.3s;
  border-radius: 6px;

  &:hover {
    background-color: ${(props) => (props.$active ? "#e0a00f" : "#e0e0e0")};
  }
`

export const ComparisonContainer = styled.div`
  display: flex;
  gap: 20px;
`

export const VersionColumn = styled.div`
  flex: 1;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

export const VersionTitle = styled.h2`
  font-size: 20px;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
  padding-bottom: 10px;
  border-bottom: 2px solid #F2B024;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  &:after {
    content: '▼';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    font-size: 12px;
  }
`

export const Section = styled.div`
  margin-bottom: 30px;
`

export const SectionTitle = styled.h3`
  font-size: 18px;
  color: #666;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 5px;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ContentItem = styled.div`
  margin-bottom: 15px;
  padding: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  border: 1px solid #eee;
  transition: box-shadow 0.3s;

  &:hover {
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  }

  strong {
    display: block;
    margin-bottom: 10px;
    color: #333;
    font-size: 16px;
  }

  p {
    font-size: 14px;
    color: #666;
    margin: 5px 0;
    line-height: 1.6;
  }
`

export const NoDataMessage = styled.p`
  text-align: center;
  font-size: 18px;
  color: #666;
  margin-top: 50px;
`

export const BackButton = styled.button`
  padding: 10px 20px;
  background-color: #F2B024;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #e0a00f;
  }
`

export const DiffHighlight = styled.span<{ $added: boolean }>`
  background-color: ${(props) => (props.$added ? "#e6ffec" : "#ffeef0")};
  padding: 2px 0;
`

export const VersionDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  max-height: 200px;
  overflow-y: auto;
`

export const DropdownItem = styled.div`
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #f0f0f0;
  }
`

export const ClauseCount = styled.div`
  display: inline-flex;
  align-items: center;
  margin-left: 8px;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    background-color: #ff4444;
    color: white;
    border-radius: 50%;
    font-size: 14px;
    font-weight: bold;
  }
`

