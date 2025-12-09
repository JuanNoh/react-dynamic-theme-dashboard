import { useExportModal } from "@/hooks/useExportModal";
import Toast from "../ui/Toast";
import { X, Copy, Check, FileCode, Hash } from "lucide-react";

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ExportModal({ isOpen, onClose }: ExportModalProps) {
  const {
    activeTab,
    setActiveTab,
    format,
    setFormat,
    toast,
    setToast,
    copied,
    getContent,
    copyToClipboard,
  } = useExportModal();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity dark:bg-black/80"
        onClick={onClose}
      />

      <div className="animate-in fade-in zoom-in-95 relative flex w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl duration-200 dark:border-slate-800 dark:bg-[#0f172a]">
        <div className="flex items-center justify-between border-b border-slate-100 bg-white p-5 dark:border-slate-800 dark:bg-[#0f172a]">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-slate-200 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-800">
              <FileCode className="h-5 w-5 text-slate-600 dark:text-slate-300" />
            </div>
            <div>
              <h2 className="text-lg leading-tight font-bold text-slate-900 dark:text-white">
                Exportar Sistema
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Selecciona tu formato preferido
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-b border-slate-200 bg-slate-50 p-4 md:flex-row dark:border-slate-800 dark:bg-[#0B0F19]">
          <div className="flex w-full overflow-x-auto rounded-xl bg-slate-200/50 p-1 md:w-auto dark:bg-slate-800/50">
            {(["tailwind-v4", "tailwind-v3", "css", "json"] as const).map(
              (tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 rounded-lg px-4 py-1.5 text-xs font-semibold whitespace-nowrap transition-all md:flex-none ${activeTab === tab ? "bg-white text-slate-900 shadow-sm dark:bg-slate-700 dark:text-white" : "text-slate-500 dark:text-slate-400"}`}
                >
                  {tab === "tailwind-v4"
                    ? "Tailwind v4"
                    : tab === "tailwind-v3"
                      ? "v3 Config"
                      : tab.toUpperCase()}
                </button>
              ),
            )}
          </div>

          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-1.5 dark:border-slate-700 dark:bg-slate-800">
            <Hash className="h-4 w-4 text-slate-400" />
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value as any)}
              className="cursor-pointer border-none bg-transparent py-0 pr-8 text-xs font-medium text-slate-700 outline-none focus:ring-0 dark:text-slate-300"
            >
              <option value="hex">HEX</option>
              <option value="oklch">OKLCH</option>
              <option value="hsl">HSL</option>
              <option value="rgb">RGB</option>
            </select>
          </div>
        </div>

        <div className="group relative h-[400px] overflow-hidden border-y border-slate-800 bg-[#09090b]">
          <div className="custom-scrollbar h-full overflow-auto p-6">
            <pre className="font-mono text-xs leading-relaxed text-slate-300 sm:text-sm">
              {getContent()}
            </pre>
          </div>

          <button
            onClick={copyToClipboard}
            className="absolute top-4 right-4 rounded-xl border border-white/10 bg-white/5 p-2.5 text-white opacity-0 shadow-xl backdrop-blur-md transition-all group-hover:opacity-100 hover:bg-white/10 focus:opacity-100"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>

        <div className="flex justify-end gap-3 bg-white p-5 dark:bg-[#0f172a]">
          <button
            onClick={onClose}
            className="rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Cerrar
          </button>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-xl bg-slate-900 px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-transform hover:bg-black active:scale-95 dark:bg-white dark:text-black dark:hover:bg-slate-200"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4" /> Copiado
              </>
            ) : (
              "Copiar Código"
            )}
          </button>
        </div>
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
