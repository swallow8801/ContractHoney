import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: calc(100vh - 90px);
  overflow-x: visible;
  overflow-y: auto;
  background-color: #f4f4f4;
  padding: 20px;
`

export const Card = styled.div`
  background-color: #ffffff;
  border-radius: 16px;
  padding: 32px;
  max-width: 500px;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
`

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 600;
  color: #333;
  margin-bottom: 16px;
`

export const StatusMessage = styled.p`
  font-size: 16px;
  color: #666;
  margin-bottom: 24px;
`

export const Button = styled.button`
  padding: 12px 24px;
  background-color: #F2B024;
  border: none;
  border-radius: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #e0a00f;
  }
`

