import styled from "styled-components";

export const Group = styled.div<{ $backgroundImage: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  height: 92vh;
  scroll-snap-align: start;
  background-size: cover;
  background-position: center;
  overflow: hidden;

  background-image: ${({ $backgroundImage }) => `url(${$backgroundImage})`};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    opacity: 0.7;
    z-index: -1;
  }
`;

export const Container = styled.div`
  height: 92vh;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

export const Title = styled.h1`
  font-size: 48px;
  font-weight: bold;
  color: white;
  margin-bottom: 20px;
  z-index: 1;
`;

export const InputContainer = styled.div`
  display: flex;
  gap: 10px;
  z-index: 1;
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background: rgba(255, 255, 255, 0.9);
`;

export const Button = styled.button`
  padding: 10px 20px;
  background-color: #2c2c2c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #444;
  }
`;

export const Notice = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 80%;
  z-index: 1;
`;

export const NoticeItem = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  padding: 10px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
`;

export const ViewAll = styled.button`
  align-self: flex-end;
  margin-top: 10px;
  padding: 10px;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
  text-decoration: underline;
  color: white;
`;

