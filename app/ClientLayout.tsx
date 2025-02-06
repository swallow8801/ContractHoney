"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Nav from "./component/Nav/Nav";
import Footer from "./component/Footer/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalonePage = pathname === "/privacy" || pathname === "/terms";
  const isMain = pathname === "/";

  const [isPageHidden, setIsPageHidden] = useState(false);

  useEffect(() => {
    // 창이 백그라운드로 가는지 감지 (즉, 새로고침인지 창 닫기인지 확인하기 위함)
    const handleVisibilityChange = () => {
      setIsPageHidden(document.visibilityState === "hidden");
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    // 창이 닫힐 때 localStorage 데이터 삭제 (단, 새로고침이 아닐 경우)
    const handleUnload = (event: BeforeUnloadEvent) => {
      if (isPageHidden) {
        localStorage.clear();
      }
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, [isPageHidden]);

  return (
    <div className="layout-container">
      {!isStandalonePage && <Nav />}
      <main className="content">{children}</main>
      {!isStandalonePage && !isMain && <Footer />}
    </div>
  );
}
