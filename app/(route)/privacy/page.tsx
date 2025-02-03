"use client";

import Image from "next/image";
import { PageContainer, LogoContainer, ContentBox, Title, SectionTitle } from "./privacy.styled";

export default function PrivacyPolicy() {
  return (
    <PageContainer>
      <LogoContainer>
        <Image src="/logo.png" alt="로고" width={50} height={50} priority />
      </LogoContainer>
      <ContentBox>
        <Title>개인정보처리방침</Title>
        <h3>제 1 조 (수집하는 개인정보 항목)</h3>
            <p>회사는 회원 가입 및 서비스 제공을 위해 다음과 같은 개인정보를 수집할 수 있습니다.</p>
            <ul>
              <li>필수 정보: 이름, 이메일 주소, 비밀번호, 연락처</li>
            </ul>

            <h3>제 2 조 (개인정보의 수집 및 이용 목적)</h3>
            <p>회사는 다음의 목적을 위해 개인정보를 수집하고 이용합니다.</p>
            <ol>
              <li>회원가입 및 서비스 이용 관리</li>
              <li>계약서 분석 서비스 제공 및 결과 안내</li>
              <li>고객 지원 및 문의 대응</li>
              <li>서비스 개선 및 맞춤형 서비스 제공</li>
              <li>법적 의무 이행</li>
            </ol>

            <h3>제 3 조 (개인정보 보유 및 이용 기간)</h3>
            <p>
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 단, 관련 법령에 따라
              보관이 필요한 경우 일정 기간 보관할 수 있습니다.
            </p>

            <h3>제 4 조 (개인정보 제3자 제공)</h3>
            <p>
              회사는 원칙적으로 회원의 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 법적 의무에 따라 제공이
              필요한 경우는 예외로 합니다.
            </p>

            <h3>제 5 조 (개인정보 보호 조치)</h3>
            <p>회사는 회원의 개인정보를 보호하기 위해 기술적, 관리적 보안 조치를 시행하고 있습니다.</p>

            <h3>제 6 조 (동의 거부 권리 및 불이익)</h3>
            <p>
              회원은 개인정보 수집 및 이용에 대한 동의를 거부할 수 있으며, 이 경우 서비스 이용이 제한될 수 있습니다.
            </p>

            <h3>제 7 조 (분쟁 해결 및 관할 법원)</h3>
            <ol>
              <li>본 동의와 관련하여 회사와 회원 간 발생한 분쟁은 원만하게 해결하도록 노력합니다.</li>
              <li>분쟁이 해결되지 않을 경우 대한민국 법령을 따르며, 관할 법원은 회사의 본사 소재지 법원으로 합니다.</li>
            </ol>
      </ContentBox>
    </PageContainer>
  );
}
