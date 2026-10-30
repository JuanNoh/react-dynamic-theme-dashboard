import { useMemo, useState } from "react";
import Reveal from "@/components/ui/Reveal";
import { usePalette } from "@/context/usePalette";
import { generateLocalPalette } from "@/lib/localPalette";
import {
  POPULAR_PALETTES,
  type PopularPalette,
} from "@/constants/popularPalettes";
import type { ShadeKey } from "@/types/palette";

// Tonos del mini abanico de cada tarjeta
const FAN_SHADES: ShadeKey[] = ["100", "300", "500", "700", "900"];

export default function PopularPalettes() {
  const {
    setBaseColor,
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
    setSecondaryPalette(generateLocalPalette(item.secondaryColor));
    setBrandName(item.name);
    setAiInsight({
      name: item.name,
      description:
        "Paleta curada de la galería de populares, lista para usarse o como punto de partida para pedirle una variante a la IA.",
      sentiment: item.vibe,
      usageTip:
        "Usa el primario para acciones y navegación; reserva el secundario para acentos puntuales.",
    });
    setLandingCopy(null);
  };

  return (
    <section className="mx-auto flex max-w-[1280px] flex-col gap-8 px-6 py-20">
      <Reveal>
        <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] leading-none font-bold tracking-[-0.03em]">
          Empieza con una de estas.
        </h2>
      </Reveal>

      {/* Seis por fila desde lg: con auto-fill eran 7 + 5 y la fila de abajo quedaba coja */}
      <Reveal className="grid grid-cols-[repeat(auto-fill,minmax(min(150px,100%),1fr))] gap-3 lg:grid-cols-6">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => applyPalette(item)}
            aria-pressed={activeId === item.id}
            aria-label={`Usar paleta ${item.name}`}
            className={`tarjeta bg-raised relative h-64 cursor-pointer overflow-hidden rounded-[18px] text-left ${
              activeId === item.id ? "ring-ink ring-2" : "ring-edge ring-1"
            }`}
          >
            <span aria-hidden="true" className="absolute inset-x-0 top-3 h-40">
              {FAN_SHADES.map((shade, index) => (
                <span
                  key={shade}
                  className="tira"
                  style={
                    {
                      "--g": -24 + index * 12,
                      zIndex: index + 1,
                      backgroundColor: item.palette[shade],
                    } as React.CSSProperties
                  }
                />
              ))}
            </span>
            {/* Anclado arriba: las vibras de dos renglones no mueven el nombre */}
            <span className="absolute inset-x-4 top-[182px] flex flex-col">
              <span className="text-[17px] font-semibold">{item.name}</span>
              <span className="text-soft text-xs leading-snug">
                {item.vibe}
              </span>
            </span>
          </button>
        ))}
      </Reveal>
    </section>
  );
}
