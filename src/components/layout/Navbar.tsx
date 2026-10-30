import { Link } from "react-router-dom";
import { useState } from "react";
import ExportModal from "../palette/ExportModal";
import ThemeToggle from "./ThemeToggle";
import HistorySidebar from "../palette/HistorySidebar";
import { Palette, History } from "lucide-react";

export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  return (
    <>
      <header className="fixed top-[18px] right-0 left-0 z-50 flex justify-center px-4 sm:px-6">
        <nav className="flex w-full max-w-[1280px] items-center justify-between rounded-full bg-white/60 p-1.5 pl-4 shadow-[0_0_0_1px_var(--edge),0_12px_32px_rgb(0_0_0/0.14)] backdrop-blur-xl backdrop-saturate-150 sm:p-2 sm:pl-5 dark:bg-[#201e1a]/60">
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <Palette className="h-5 w-5" strokeWidth={1.75} />
            <span className="text-ink text-[15px] font-semibold whitespace-nowrap sm:text-base">
              Chuwen Palette
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsHistoryOpen(true)}
              className="text-soft hover:text-ink flex h-11 w-9 cursor-pointer items-center justify-center rounded-full transition-colors sm:w-11"
              aria-label="Historial"
            >
              <History className="h-5 w-5" strokeWidth={1.5} />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-ink text-ground ml-1 inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-4 text-sm font-semibold transition-transform active:scale-95 sm:px-5"
            >
              Exportar
            </button>

            <ThemeToggle />
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
