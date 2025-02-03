import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Nav from "./component/Nav/Nav";
import Footer from "./component/Footer/Footer";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="ko" suppressHydrationWarning>
          <body>
              <Nav style={{ height: "90px", width: "100%", position: "fixed", top: 0, left: 0 }} />
              <div className="layout-container">
                  <main className="content">{children}</main>
                  <Footer />
              </div>
          </body>
      </html>
  );
}

