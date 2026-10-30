import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Contrast, X } from "lucide-react";
import { toast } from "sonner";
import { usePalette } from "@/context/usePalette";
import { formatRatio, measureContrast } from "@/lib/contrast";
import { SHADE_KEYS } from "@/types/palette";

type Metric = "wcag" | "apca";

const METRICS: { value: Metric; label: string; legend: string }[] = [
  {
    value: "wcag",
    label: "WCAG 2",
    legend:
      "AAA desde 7:1 · AA desde 4.5:1 · Grande desde 3:1, sólo para texto grande",
  },
  {
    value: "apca",
    label: "APCA",
    legend:
      "Cuerpo desde Lc 75 · Contenido desde Lc 60 · Grande desde Lc 45, sólo para títulos",
  },
];

interface ContrastMatrixProps {
  isOpen: boolean;
  onClose: () => void;
}

// Todos los tonos contra todos, más blanco y negro. Cada fila es un fondo y cada
// columna un color de texto; las celdas en blanco no llegan ni al nivel mínimo.
export default function ContrastMatrix({
  isOpen,
  onClose,
}: ContrastMatrixProps) {
  const { palette } = usePalette();
  const [metric, setMetric] = useState<Metric>("wcag");

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  const tones = useMemo(
    () => [
      { label: "Bco", token: "white", hex: "#ffffff" },
      ...SHADE_KEYS.map((key) => ({
        label: key,
        token: `primary-${key}`,
        hex: palette[key],
      })),
      { label: "Ngo", token: "black", hex: "#000000" },
    ],
    [palette],
  );

  const copyClasses = async (background: string, text: string) => {
    const classes = `bg-${background} text-${text}`;
    try {
      await navigator.clipboard.writeText(classes);
      toast.success(`Copiado: ${classes}`);
    } catch {
      toast.error("No se pudo copiar, inténtalo de nuevo.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm dark:bg-black/80"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contrast-matrix-title"
            initial={{ opacity: 0, scale: 0.97, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="relative flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-800 dark:bg-[#1e1c18]"
          >
            <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4 sm:p-5 dark:border-slate-800">
              <div className="rounded-lg border border-slate-200 bg-slate-100 p-2 dark:border-slate-700 dark:bg-slate-800">
                <Contrast className="h-5 w-5 text-slate-600 dark:text-slate-300" />
              </div>
              <div className="mr-auto">
                <h2
                  id="contrast-matrix-title"
                  className="text-lg leading-tight font-bold text-slate-900 dark:text-white"
                >
                  Matriz de contraste
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Filas: fondo. Columnas: texto. Toca una celda para copiar sus
                  clases.
                </p>
              </div>

              <div
                role="radiogroup"
                aria-label="Medida de contraste"
                className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800"
              >
                {METRICS.map((item) => (
                  <button
                    key={item.value}
                    type="button"
                    role="radio"
                    aria-checked={metric === item.value}
                    onClick={() => setMetric(item.value)}
                    className={`relative cursor-pointer rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
                      metric === item.value
                        ? "text-slate-900 dark:text-white"
                        : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
                    }`}
                  >
                    {metric === item.value && (
                      <motion.span
                        layoutId="contrast-metric-pill"
                        className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-slate-600"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 35,
                        }}
                      />
                    )}
                    <span className="relative">{item.label}</span>
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar"
                className="cursor-pointer rounded-lg p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* En celular la tabla se desliza de lado dentro de la ventana */}
            <div className="overflow-auto p-4 sm:p-5">
              <table className="w-full min-w-[720px] border-separate border-spacing-0.5 text-center">
                <thead>
                  <tr>
                    <th scope="col" className="w-10">
                      <span className="sr-only">Fondo</span>
                    </th>
                    {tones.map((tone) => (
                      <th
                        key={tone.token}
                        scope="col"
                        className="pb-1 font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400"
                      >
                        {tone.label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {tones.map((background) => (
                    <tr key={background.token}>
                      <th
                        scope="row"
                        className="pr-1 text-right font-mono text-[10px] font-medium text-slate-500 dark:text-slate-400"
                      >
                        {background.label}
                      </th>
                      {tones.map((text) => {
                        const pair = measureContrast(text.hex, background.hex);
                        const level = pair[metric];
                        const value =
                          metric === "wcag"
                            ? formatRatio(pair.ratio)
                            : String(pair.lc);

                        return (
                          <td key={text.token} className="p-0">
                            <button
                              type="button"
                              onClick={() =>
                                copyClasses(background.token, text.token)
                              }
                              title={`Texto ${text.label} sobre ${background.label}: ${formatRatio(pair.ratio)}:1 (${pair.wcag ?? "no pasa"}) · Lc ${pair.lc} (${pair.apca ?? "no pasa"})`}
                              className="flex h-10 w-full cursor-pointer flex-col items-center justify-center rounded-md leading-none ring-1 ring-black/5 transition-transform ring-inset hover:z-10 hover:scale-110 focus:ring-2 focus:outline-none dark:ring-white/5"
                              style={{
                                backgroundColor: background.hex,
                                color: text.hex,
                              }}
                            >
                              {level && (
                                <>
                                  <span className="font-mono text-[11px] font-semibold">
                                    {value}
                                  </span>
                                  <span className="mt-0.5 text-[8px] font-medium opacity-80">
                                    {level}
                                  </span>
                                </>
                              )}
                            </button>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="border-t border-slate-100 px-4 py-3 text-xs text-slate-500 sm:px-5 dark:border-slate-800 dark:text-slate-400">
              {METRICS.find((item) => item.value === metric)?.legend}
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
