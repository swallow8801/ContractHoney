"use client";

import React from "react";
import { FooterContainer, FooterText, FooterLink } from "./Footer.styled";

const Footer: React.FC = () => {
    const openNewWindow = (url: string, title: string) => {
      window.open(
        url,
        title,
        "width=800,height=600,left=300,top=100,resizable=yes,scrollbars=yes"
      );
    };
  
    return (
      <FooterContainer>
        <FooterText>
          <FooterLink onClick={() => openNewWindow("/privacy", "개인정보 처리방침")}>
            개인정보 처리방침
          </FooterLink>
          {"\u00A0\u00A0\u00A0|\u00A0\u00A0\u00A0"}
          <FooterLink onClick={() => openNewWindow("/terms", "이용약관")}>
            이용약관
          </FooterLink>
        </FooterText>
        <FooterText>
            (주)케이티 경기도 성남시 분당구 불정로 90 (정자동) | AIVLE School 6기 27조
        </FooterText>
        <FooterText>© 2025 계꿀. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
