import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f7f7f7;
  padding: 3rem 1rem;
`

export const Title = styled.h1`
  font-size: 2rem;
  color: #333;
  margin-bottom: 2rem;
`

export const Form = styled.form`
  background-color: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 800px;
`

export const AgreementSection = styled.div`
  margin-bottom: 2rem;
  text-align: center;
`

export const SectionTitle = styled.h2<{ $expanded: boolean }>`
  font-size: 1.6rem;
  color: ${(props) => (props.$expanded ? "#F2B024" : "#333")};
  margin-bottom: 1rem;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #F2B024;
  }
`

export const TermsContainer = styled.div<{ $expanded: boolean }>`
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: ${(props) => (props.$expanded ? "1rem" : "0")};
  margin-bottom: 1rem;
  height: ${(props) => (props.$expanded ? "400px" : "0")};
  overflow-y: ${(props) => (props.$expanded ? "auto" : "hidden")};
  opacity: ${(props) => (props.$expanded ? 1 : 0)};
  visibility: ${(props) => (props.$expanded ? "visible" : "hidden")};
  background-color: #fff;
  font-size: 0.9rem;
  line-height: 1.6;
  text-align: left;
  transition: all 0.3s ease-in-out;

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

  h3 {
    font-size: 1.1rem;
    margin-top: 1rem;
    margin-bottom: 0.5rem;
    color: #333;
  }

  p, ul, ol {
    margin-bottom: 1rem;
  }

  ul, ol {
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: 0.5rem;
  }
`

export const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  justify-content: flex-start;
`

export const Label = styled.label`
  margin-left: 0.5rem;
  color: #333;
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: bold;
`

export const AllAgreeContainer = styled(CheckboxContainer)`
  margin: 1.5rem 0;
  padding: 1rem;
  background-color: #f8f9fa;
  border-radius: 8px;

  ${Label} {
    font-size: 1.2rem;
    color: #F2B024;
  }
`

export const CheckboxInput = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #F2B024;
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;

  &:checked {
    background-color: #F2B024;

    &::after {
      content: '✓';
      position: absolute;
      color: white;
      font-size: 16px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`

export const Button = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #F2B024;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 1rem;

  &:hover {
    background-color: #E5A100;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

