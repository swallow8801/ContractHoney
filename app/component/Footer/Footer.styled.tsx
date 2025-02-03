import styled from "styled-components";

export const FooterContainer = styled.footer`
  text-align: center;
  padding: 20px;
  background: #f8f8f8;
  color: #333;
  font-size: 14px;
  width: 100%;
  position: relative;
`;

export const FooterText = styled.p`
  margin: 5px 0;
`;

export const FooterLink = styled.span`
  color: #0073e6;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;
