import { useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();

  const hideLayout = pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col bg-bg text-text font-sans">
      {!hideLayout && <Navbar />}

      <main className="flex-1">{children}</main>

      {!hideLayout && <Footer />}
    </div>
  );
}
