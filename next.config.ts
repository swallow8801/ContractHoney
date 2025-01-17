import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  /* config options here */
  compiler: {
    styledComponents: true, // styled-components 최적화 활성화
  },
};

export default nextConfig;
