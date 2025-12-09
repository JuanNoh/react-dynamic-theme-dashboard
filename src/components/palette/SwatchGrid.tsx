import { useSwatchGrid } from "@/hooks/useSwatchGrid";
import { type Palette, SHADE_KEYS } from "@/types/palette";
import { getContrastInfo } from "@/lib/contrast";
import { Check, Copy } from "lucide-react";

interface SwatchGridProps {
  palette?: Palette;
}

export default function SwatchGrid({ palette: propPalette }: SwatchGridProps) {
  const { palette, copiedKey, handleCopy } = useSwatchGrid({
    palette: propPalette,
  });

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-3">
      {SHADE_KEYS.map((k) => {
        const color = palette[k];
        const { scoreAbs, useWhite } = getContrastInfo(color);

        const textColorClass = useWhite ? "text-white/90" : "text-slate-900/90";
        const ringColorClass = useWhite ? "ring-white/20" : "ring-black/5";

        const isCopied = copiedKey === k;

        return (
          <button
            key={k}
            onClick={() => handleCopy(color, k)}
            className={`group /* Altura fija */ /* Ocupa todo el ancho de su celda */ focus:ring-primary-500 relative flex h-32 w-full cursor-pointer flex-col justify-between rounded-2xl p-3 transition-all duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:shadow-lg focus:ring-2 focus:outline-none`}
            style={{ backgroundColor: color }}
            title={`Copiar ${color}`}
          >
            <div
              className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${ringColorClass} pointer-events-none`}
            />

            <div className="flex w-full items-start justify-between opacity-0 transition-opacity duration-200 group-hover:opacity-100">
              <span
                className={`rounded-sm bg-black/10 px-1.5 font-mono text-[10px] ${textColorClass}`}
              >
                {scoreAbs}Lc
              </span>
            </div>

            <div
              className={`absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100 ${textColorClass}`}
            >
              {isCopied ? (
                <Check className="h-6 w-6" />
              ) : (
                <Copy className="h-6 w-6" strokeWidth={2} />
              )}
            </div>

            <div className="space-y-0.5 text-left">
              <span
                className={`block text-xs font-bold tracking-tight ${textColorClass}`}
              >
                {k}
              </span>
              <code
                className={`font-mono text-[11px] uppercase ${textColorClass} opacity-80`}
              >
                {isCopied ? "OK" : color.replace("#", "")}
              </code>
            </div>
          </button>
        );
      })}
    </div>
  );
}
