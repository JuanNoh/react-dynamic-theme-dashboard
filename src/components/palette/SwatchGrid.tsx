import { motion } from "motion/react";
import { useSwatchGrid } from "@/hooks/useSwatchGrid";
import { usePalette } from "@/context/usePalette";
import { type Palette, SHADE_KEYS } from "@/types/palette";
import { getTintedText } from "@/lib/contrast";
import { Check, Copy, Pin } from "lucide-react";

interface SwatchGridProps {
  palette?: Palette;
}

export default function SwatchGrid({ palette: propPalette }: SwatchGridProps) {
  const { palette, copiedKey, handleCopy } = useSwatchGrid({
    palette: propPalette,
  });
  const { baseShade, scaleOptions, setScaleOptions } = usePalette();
  // En modo APCA el tono de la marca lo decide su contraste
  const canPin = !propPalette && scaleOptions.mode !== "apca";

  return (
    <div className="grid w-full grid-cols-[repeat(auto-fit,minmax(90px,1fr))] gap-3">
      {SHADE_KEYS.map((k, idx) => {
        const color = palette[k];
        const text = getTintedText(color, palette);
        const ringColorClass = text.useLight ? "ring-white/20" : "ring-black/5";

        const isCopied = copiedKey === k;
        const isBase = !propPalette && k === baseShade;
        const isPinned = isBase && scaleOptions.shade === k;

        return (
          // Fondo y texto se animan con Motion: al cambiar de paleta los tonos
          // cambian en ola, del 50 al 950. Por eso la transición de CSS sólo
          // cubre transform y sombra, para no pelearse con la animación.
          <motion.div
            key={k}
            className="group relative h-32 w-full rounded-2xl transition-[transform,box-shadow] duration-300 ease-out hover:z-10 hover:-translate-y-1 hover:shadow-lg"
            initial={false}
            animate={{ backgroundColor: color, color: text.color }}
            transition={{ duration: 0.45, delay: idx * 0.025, ease: "easeOut" }}
          >
            <button
              type="button"
              onClick={() => handleCopy(color, k)}
              title={`Copiar ${color}`}
              className="focus:ring-primary-500 relative flex h-full w-full cursor-pointer flex-col justify-between rounded-2xl p-3 text-left focus:ring-2 focus:outline-none"
            >
              <div
                className={`absolute inset-0 rounded-2xl ring-1 ring-inset ${ringColorClass} pointer-events-none`}
              />

              <div className="flex w-full items-start justify-between opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <span className="rounded-sm bg-black/10 px-1.5 font-mono text-[10px]">
                  {text.scoreAbs}Lc
                </span>
              </div>

              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                {isCopied ? (
                  <Check className="h-6 w-6" />
                ) : (
                  <Copy className="h-6 w-6" strokeWidth={2} />
                )}
              </div>

              <div className="space-y-0.5">
                <span className="flex items-center gap-1.5 text-xs font-bold tracking-tight">
                  {isBase && (
                    <span
                      className="h-1.5 w-1.5 rounded-full bg-current"
                      title="Aquí quedó tu color"
                    />
                  )}
                  {k}
                </span>
                <code className="font-mono text-[11px] uppercase opacity-80">
                  {isCopied ? "OK" : color.replace("#", "")}
                </code>
              </div>
            </button>

            {/* En pantallas táctiles no hay hover: el pin se queda visible */}
            {canPin && (isPinned || !isBase) && (
              <button
                type="button"
                onClick={() => setScaleOptions({ shade: isPinned ? null : k })}
                aria-label={
                  isPinned
                    ? `Quitar el color fijado en el ${k}`
                    : `Fijar mi color en el ${k}`
                }
                title={isPinned ? "Quitar fijado" : "Fijar mi color aquí"}
                className={`absolute top-2 right-2 z-10 cursor-pointer rounded-md p-1 transition-opacity hover:bg-black/10 focus:opacity-100 focus:outline-none ${
                  isPinned
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-100 [@media(hover:none)]:opacity-60"
                }`}
              >
                <Pin
                  className="h-3.5 w-3.5"
                  fill={isPinned ? "currentColor" : "none"}
                />
              </button>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
