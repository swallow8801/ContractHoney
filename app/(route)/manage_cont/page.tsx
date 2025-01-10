'use client';

import React from "react";
import { 
  Container, 
  MainContent, 
  Rectangle23, 
  AnalysisSection, 
  Table 
} from "./manage_cont.styled"; // styled-components 경로

const ManagePage = () => {
  return (
    <>
      <Container>
        {/* 메인 컨텐츠 */}
        <MainContent>
          <Rectangle23 />
          <AnalysisSection>
            <h2>계약서 분석 기록</h2>
            <Table>
              <thead>
                <tr>
                  <th>계약서 이름</th>
                  <th>파일 포맷</th>
                  <th>파일 크기</th>
                  <th>분석 날짜</th>
                  <th>버전</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>재엽 계약서</td>
                  <td>.hwp</td>
                  <td>3.71MB</td>
                  <td>2025.01.03</td>
                  <td>
                    <select>
                      <option>ver 1</option>
                      <option>ver 2</option>
                      <option>ver 3</option>
                    </select>
                  </td>
                </tr>
                {/* 추가 데이터 행 */}
              </tbody>
            </Table>
          </AnalysisSection>
        </MainContent>
      </Container>
    </>
  );
};

export default ManagePage;
