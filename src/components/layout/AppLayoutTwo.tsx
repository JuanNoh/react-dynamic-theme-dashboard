import { type ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-ground text-ink relative flex min-h-screen flex-col overflow-x-clip font-sans transition-colors duration-300">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
