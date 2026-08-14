import { useMemo, useState } from "react";
import { Flame } from "lucide-react";
import { usePalette } from "@/context/usePalette";
import { generateLocalPalette } from "@/lib/localPalette";
import {
  POPULAR_PALETTES,
  type PopularPalette,
} from "@/constants/popularPalettes";
import type { ShadeKey } from "@/types/palette";

// Tonos que se asoman en la tirita de preview de cada tarjeta
const PREVIEW_SHADES: ShadeKey[] = ["100", "300", "500", "700", "900"];

export default function PopularPalettes() {
  const {
    setBaseColor,
    setPalette,
    setSecondaryPalette,
    setBrandName,
    setAiInsight,
    setLandingCopy,
  } = usePalette();
  const [activeId, setActiveId] = useState<string | null>(null);

  // Las escalas se calculan una sola vez; es puro chroma-js, ni se siente
  const items = useMemo(
    () =>
      POPULAR_PALETTES.map((item) => ({
        ...item,
        palette: generateLocalPalette(item.baseColor),
      })),
    [],
  );

  const applyPalette = (item: PopularPalette) => {
    setActiveId(item.id);
    setBaseColor(item.baseColor);
    setPalette(generateLocalPalette(item.baseColor));
    setSecondaryPalette(generateLocalPalette(item.secondaryColor));
    setBrandName(item.name);
    setAiInsight({
      name: item.name,
      description: "Paleta curada de la galería de populares, lista para usarse o como punto de partida para pedirle una variante a la IA.",
      sentiment: item.vibe,
      usageTip:
        "Usa el primario para acciones y navegación; reserva el secundario para acentos puntuales.",
    });
    setLandingCopy(null);
  };

  return (
    <section className="mx-auto mb-16 max-w-7xl px-2">
      <div className="mb-6 flex items-center justify-center gap-2">
        <Flame className="h-5 w-5 text-orange-500" />
        <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
          Paletas Populares
        </h2>
      </div>

      <div className="scrollbar-none -mx-2 flex snap-x gap-4 overflow-x-auto px-2 pb-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => applyPalette(item)}
            aria-label={`Usar paleta ${item.name}`}
            className={`group min-w-44 shrink-0 cursor-pointer snap-start rounded-2xl border bg-white/60 p-4 text-left shadow-sm backdrop-blur-xl transition-all hover:-translate-y-0.5 hover:shadow-md dark:bg-slate-900/60 ${
              activeId === item.id
                ? "border-primary-500 ring-primary-500/30 ring-2"
                : "border-white/20 hover:border-primary-400 dark:border-white/10"
            }`}
          >
            <div className="mb-3 flex h-8 gap-1 overflow-hidden rounded-lg">
              {PREVIEW_SHADES.map((shade) => (
                <div
                  key={shade}
                  className="h-full flex-1 transition-transform group-hover:scale-y-110"
                  style={{ backgroundColor: item.palette[shade] }}
                />
              ))}
              <div
                className="h-full w-2 rounded-r-lg"
                style={{ backgroundColor: item.secondaryColor }}
                title="Color secundario"
              />
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {item.name}
            </p>
            <p className="truncate text-xs text-slate-500 dark:text-slate-400">
              {item.vibe}
            </p>
          </button>
        ))}
      </div>
    </section>
  );
}
