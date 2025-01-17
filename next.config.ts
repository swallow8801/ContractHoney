import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true, // styled-components 최적화 활성화
  },
  eslint: {
    // ESLint 옵션 설정
    dirs: ["pages", "components", "lib"], // ESLint를 실행할 디렉토리 설정
    ignoreDuringBuilds: true, // 빌드 중 ESLint 에러를 무시할지 여부
  },
};

export default nextConfig;
