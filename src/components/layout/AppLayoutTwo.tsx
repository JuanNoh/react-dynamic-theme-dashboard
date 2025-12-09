import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import BackgroundEffects from "./BackgroundEffects";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-slate-50 font-sans text-slate-900 transition-colors duration-300 dark:bg-[#0B0F19] dark:text-slate-100">
      <BackgroundEffects />
      <Navbar />
      <main className="flex-grow py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </div>
  );
}
