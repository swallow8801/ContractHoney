"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Nav from "./component/Nav/Nav";
import Footer from "./component/Footer/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalonePage = pathname === "/privacy" || pathname === "/terms";
  const isMain = pathname === "/";

  useEffect(() => {
    // 창이 닫힐 때 localStorage 데이터 삭제
    const handleUnload = () => {
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  return (
    <div className="layout-container">
      {!isStandalonePage && <Nav />}
      <main className="content">{children}</main>
      {!isStandalonePage && !isMain && <Footer />}
    </div>
  );
}
