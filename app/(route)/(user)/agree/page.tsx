"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import * as S from "./agree.styled"

export default function AgreePage() {
  const [agreeAll, setAgreeAll] = useState(false)
  const [agreeTerms, setAgreeTerms] = useState(false)
  const [agreePrivacy, setAgreePrivacy] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (agreeTerms && agreePrivacy) {
      setAgreeAll(true)
    } else {
      setAgreeAll(false)
    }
  }, [agreeTerms, agreePrivacy])

  const handleAgreeAll = () => {
    const newValue = !agreeAll
    setAgreeAll(newValue)
    setAgreeTerms(newValue)
    setAgreePrivacy(newValue)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (agreeTerms && agreePrivacy) {
      router.push("/signup")
    } else {
      alert("모든 약관에 동의해주세요.")
    }
  }

  return (
    <S.Container>
      <S.Form onSubmit={handleSubmit}>
        <S.AgreementSection>
          <S.SectionTitle>이용약관</S.SectionTitle>
          <S.TermsContainer>
            {/* 이용약관 내용 */}
            <h3>제 1 조 (목적)</h3>
            <p>
              본 약관은 [계꿀] 가 제공하는 계약서 분석 서비스(이하 "서비스")의 이용과 관련하여 회사와 회원 간의 권리,
              의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>

            <h3>제 2 조 (용어의 정의)</h3>
            <ol>
              <li>
                "서비스"란 회사가 제공하는 계약서 분석 및 관련 기능을 포함한 웹사이트 및 응용 프로그램을 의미합니다.
              </li>
              <li>"회원"이란 본 약관에 동의하고 회사가 제공하는 서비스를 이용하는 자를 의미합니다.</li>
              <li>"콘텐츠"란 회원이 업로드하는 계약서 및 기타 문서, 입력한 정보 등을 의미합니다.</li>
              <li>"유료 서비스"란 회원이 일정 금액을 지불하고 이용하는 서비스 기능을 의미합니다.</li>
            </ol>

            <h3>제 3 조 (약관의 효력 및 변경)</h3>
            <ol>
              <li>본 약관은 회원이 동의함으로써 효력이 발생합니다.</li>
              <li>
                회사는 관련 법령을 위배하지 않는 범위에서 약관을 개정할 수 있으며, 개정된 약관은 회사의 웹사이트에
                공지됩니다.
              </li>
              <li>회원이 개정된 약관에 동의하지 않을 경우 서비스 이용을 중단하고 탈퇴할 수 있습니다.</li>
            </ol>

            <h3>제 4 조 (회원 가입 및 관리)</h3>
            <ol>
              <li>회원 가입은 회사가 제공하는 가입 양식을 작성하고 약관에 동의한 후 승인 절차를 거쳐 완료됩니다.</li>
              <li>
                회원은 등록한 정보가 정확하고 최신 상태를 유지해야 하며, 허위 정보를 제공할 경우 서비스 이용이 제한될 수
                있습니다.
              </li>
              <li>회원은 계정 정보를 타인과 공유할 수 없으며, 계정 관리에 대한 책임은 회원에게 있습니다.</li>
            </ol>

            <h3>제 5 조 (서비스 이용)</h3>
            <ol>
              <li>회사는 회원에게 계약서 분석 기능 및 기타 부가 서비스를 제공합니다.</li>
              <li>
                서비스 이용 과정에서 회원이 업로드한 계약서는 내부 알고리즘을 통해 분석되며, 분석 결과는 회원에게
                제공됩니다.
              </li>
              <li>
                회사는 서비스 개선을 위해 회원이 업로드한 데이터를 익명화하여 내부 연구 및 AI 모델 개선에 활용할 수
                있습니다.
              </li>
              <li>
                회사는 서비스의 원활한 제공을 위해 일정 시간 동안 유지보수를 실시할 수 있으며, 이에 따른 서비스 중단이
                발생할 수 있습니다.
              </li>
            </ol>

            <h3>제 6 조 (유료 서비스 및 결제)</h3>
            <ol>
              <li>일부 서비스는 유료로 제공되며, 회원은 결제 후 해당 서비스를 이용할 수 있습니다.</li>
              <li>결제는 회사가 지정한 결제 수단을 통해 이루어지며, 환불 정책은 별도로 안내됩니다.</li>
            </ol>

            <h3>제 7 조 (회원의 의무)</h3>
            <ol>
              <li>회원은 본 약관 및 관련 법령을 준수해야 합니다.</li>
              <li>회원은 회사의 서비스를 악용하여 타인의 권리를 침해하거나 불법적인 목적으로 이용해서는 안 됩니다.</li>
              <li>
                회원이 허위 계약서를 등록하거나 악성코드를 포함한 파일을 업로드할 경우 서비스 이용이 제한될 수 있습니다.
              </li>
            </ol>

            <h3>제 8 조 (회사의 책임 제한)</h3>
            <ol>
              <li>회사는 회원이 업로드한 계약서의 정확성이나 분석 결과의 법적 효력을 보장하지 않습니다.</li>
              <li>
                회사는 회원 간 또는 회원과 제3자 간 발생한 분쟁에 개입하지 않으며, 이에 대한 책임을 지지 않습니다.
              </li>
              <li>회사는 서비스 장애나 유지보수로 인해 발생한 불가피한 서비스 중단에 대해 책임을 지지 않습니다.</li>
            </ol>

            <h3>제 9 조 (서비스 중단 및 이용 제한)</h3>
            <ol>
              <li>
                회사는 다음의 경우 회원의 서비스 이용을 제한할 수 있습니다.
                <ul>
                  <li>본 약관을 위반한 경우</li>
                  <li>불법적인 활동이 의심되는 경우</li>
                  <li>기타 회사의 정상적인 서비스 운영을 방해하는 행위를 한 경우</li>
                </ul>
              </li>
              <li>회원이 장기간 서비스에 접속하지 않는 경우, 일정 기간 후 계정이 삭제될 수 있습니다.</li>
            </ol>

            <h3>제 10 조 (개인정보 보호)</h3>
            <ol>
              <li>회사는 회원의 개인정보를 보호하며, 관련 법령에 따라 개인정보 처리방침을 운영합니다.</li>
              <li>회원의 개인정보는 본 서비스 제공을 위해 사용되며, 회원의 동의 없이 제3자에게 제공되지 않습니다.</li>
            </ol>

            <h3>제 11 조 (분쟁 해결 및 관할 법원)</h3>
            <ol>
              <li>본 약관과 관련하여 회사와 회원 간 발생한 분쟁은 원만하게 해결하도록 노력합니다.</li>
              <li>분쟁이 해결되지 않을 경우 대한민국 법령을 따르며, 관할 법원은 회사의 본사 소재지 법원으로 합니다.</li>
            </ol>
          </S.TermsContainer>
          <S.CheckboxContainer>
            <S.CheckboxInput id="agreeTerms" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
            <S.Label htmlFor="agreeTerms">이용약관 동의 (필수)</S.Label>
          </S.CheckboxContainer>
        </S.AgreementSection>

        <S.AgreementSection>
          <S.SectionTitle>개인정보 수집 및 이용 동의</S.SectionTitle>
          <S.TermsContainer>
            {/* 개인정보 수집 및 이용 동의 내용 */}
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
          </S.TermsContainer>
          <S.CheckboxContainer>
            <S.CheckboxInput
              id="agreePrivacy"
              checked={agreePrivacy}
              onChange={(e) => setAgreePrivacy(e.target.checked)}
            />
            <S.Label htmlFor="agreePrivacy">개인정보 수집 및 이용 동의 (필수)</S.Label>
          </S.CheckboxContainer>
        </S.AgreementSection>

        <S.AllAgreeContainer>
          <S.CheckboxInput id="agreeAll" checked={agreeAll} onChange={handleAgreeAll} />
          <S.Label htmlFor="agreeAll">전체 동의</S.Label>
        </S.AllAgreeContainer>

        <S.Button type="submit" disabled={!agreeTerms || !agreePrivacy}>
          동의하고 가입하기
        </S.Button>
      </S.Form>
    </S.Container>
  )
}

