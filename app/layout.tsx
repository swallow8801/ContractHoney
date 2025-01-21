import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from './component/Nav/Nav';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "계꿀",
  description: "계약서 분석 AI 어시스턴트",
};

export default function RootLayout({ children, }: { children: React.ReactNode })
{ 
    return (
    <html
      lang="ko"
      suppressHydrationWarning>
        <body>
        <Nav />
        <div style={{ height: "calc(100vh - 90px)" }}>
            {children}
        </div>
        </body>
    </html>
    )
}