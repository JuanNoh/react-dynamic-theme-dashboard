import { Link } from "react-router-dom";
import { useState } from "react";
import ExportModal from "../palette/ExportModal";
import ThemeToggle from "./ThemeToggle";
import HistorySidebar from "../palette/HistorySidebar";
import { Palette, Download, History } from "lucide-react";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <>
      <header className="fixed top-6 right-0 left-0 z-50 flex justify-center px-4">
        <nav className="flex w-full max-w-5xl items-center justify-between rounded-2xl border border-white/20 bg-white/60 p-2 pr-2 pl-4 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] backdrop-blur-xl backdrop-saturate-150 transition-all duration-300 ease-in-out hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:border-white/10 dark:bg-[#0f172a]/60 dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] dark:hover:border-white/20">
          <Link to="/" className="group flex items-center gap-3">
            <div className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-lg bg-slate-900 text-white shadow-lg transition-transform duration-300 group-hover:scale-105 dark:bg-white dark:text-slate-900">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <Palette className="z-10 h-5 w-5" strokeWidth={2} />
            </div>
            <span className="hidden text-sm font-semibold tracking-tight text-slate-700 sm:block dark:text-slate-200">
              Chuwen Palette
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="rounded-lg p-2 text-slate-500 transition-all duration-200 hover:bg-slate-200/50 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/10 dark:hover:text-white"
              aria-label="Historial"
            >
              <History className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <div className="mx-1 hidden h-4 w-px bg-slate-200 sm:block dark:bg-slate-700" />

            <button
              onClick={() => setIsModalOpen(true)}
              className="group relative ml-2 inline-flex items-center gap-2 overflow-hidden rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition-all hover:scale-105 active:scale-95 dark:bg-white dark:text-black dark:shadow-white/20"
            >
              <div className="absolute inset-0 z-10 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1.5s_infinite] dark:via-black/10" />

              <span className="relative z-20 flex items-center gap-2">
                Exportar
                <Download
                  className="h-3.5 w-3.5 opacity-70 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2}
                />
              </span>
            </button>

            <div className="ml-2 border-l border-slate-200 pl-2 dark:border-slate-700">
              <ThemeToggle />
            </div>
          </div>
        </nav>
      </header>

      <ExportModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <HistorySidebar
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
      />
    </>
  );
}
