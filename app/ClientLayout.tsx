"use client";

import { usePathname } from "next/navigation";
import Nav from "./component/Nav/Nav";
import Footer from "./component/Footer/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isStandalonePage = pathname === "/privacy" || pathname === "/terms";

  return (
    <div className="layout-container">
      {!isStandalonePage && <Nav />}
      <main className="content">{children}</main>
      {!isStandalonePage && <Footer />}
    </div>
  );
}
