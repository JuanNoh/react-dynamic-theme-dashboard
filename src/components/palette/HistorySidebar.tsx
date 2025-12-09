import { usePalette } from "@/context/usePalette";
import { useEffect, useRef } from "react";
import { X } from "lucide-react";

interface HistorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function HistorySidebar({
  isOpen,
  onClose,
}: HistorySidebarProps) {
  const {
    history,
    setBaseColor,
    setPalette,
    setAiInsight,
    setLandingCopy,
    clearHistory,
  } = usePalette();
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 z-50 flex h-full w-80 transform flex-col border-l border-slate-200 bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:border-slate-800 dark:bg-slate-900 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-slate-100 p-4 dark:border-slate-800">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Historial
          </h2>
          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-500 transition-colors hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" strokeWidth={2} />
          </button>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto p-4">
          {history.length === 0 ? (
            <div className="py-10 text-center text-slate-400 dark:text-slate-500">
              <p>No hay paletas guardadas.</p>
              <p className="mt-2 text-sm">Genera una nueva para verla aquí.</p>
            </div>
          ) : (
            history.map((item) => (
              <button
                key={item?.id}
                onClick={() => {
                  if (!item) return;
                  setBaseColor(item.baseColor);
                  if (item.palette) setPalette(item.palette);
                  if (item.insight) setAiInsight(item.insight);
                  if (item.landingCopy) setLandingCopy(item.landingCopy);
                  onClose();
                }}
                className="group hover:border-primary-500 dark:hover:border-primary-500 focus:ring-primary-500 w-full cursor-pointer rounded-xl border border-slate-200 bg-slate-50 p-3 text-left transition-all hover:shadow-md focus:ring-2 focus:outline-none dark:border-slate-800 dark:bg-slate-800/50"
                aria-label={`Cargar paleta ${item?.keywords || item?.baseColor}`}
              >
                <div className="mb-2 flex items-center gap-3">
                  <div
                    className="h-8 w-8 rounded-full shadow-sm"
                    style={{ backgroundColor: item?.baseColor }}
                  />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                      {item?.keywords || item?.baseColor}
                    </p>
                    <p className="text-xs text-slate-500">
                      {new Date(item?.timestamp || 0).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex h-4 gap-1 overflow-hidden rounded-md opacity-80 transition-opacity group-hover:opacity-100">
                  {Object.values(item?.palette || {})
                    .slice(0, 5)
                    .map((color, i) => (
                      <div
                        key={i}
                        className="h-full flex-1"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                </div>
              </button>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="border-t border-slate-100 p-4 dark:border-slate-800">
            <button
              onClick={clearHistory}
              className="w-full rounded-lg py-2 text-sm text-rose-500 transition-colors hover:bg-rose-50 dark:hover:bg-rose-900/20"
            >
              Borrar Historial
            </button>
          </div>
        )}
      </div>
    </>
  );
}
