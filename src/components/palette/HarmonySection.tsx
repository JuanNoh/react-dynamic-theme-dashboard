import { useMemo, useState } from "react";
import { Check } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { pillClass } from "@/components/ui/pillClass";
import { usePalette } from "@/context/usePalette";
import { HARMONIES, harmonyColors } from "@/lib/harmony";
import { findBaseColor, generateLocalPalette } from "@/lib/localPalette";
import { type Palette, SHADE_KEYS } from "@/types/palette";

function ScaleBar({ palette }: { palette: Palette }) {
  return (
    <span aria-hidden="true" className="flex h-14 overflow-hidden rounded-xl">
      {SHADE_KEYS.map((key) => (
        <span
          key={key}
          className="flex-1 transition-colors duration-500"
          style={{ backgroundColor: palette[key] }}
        />
      ))}
    </span>
  );
}

// El secundario a mano: hasta ahora sólo lo escogía la IA
export default function HarmonySection() {
  const { baseColor, palette, secondaryPalette, setSecondaryPalette } =
    usePalette();
  const [harmony, setHarmony] = useState(HARMONIES[0]);

  const suggestions = useMemo(
    () =>
      harmonyColors(baseColor, harmony.offsets).map((color) => ({
        color,
        palette: generateLocalPalette(color),
      })),
    [baseColor, harmony],
  );
  const current = secondaryPalette ? findBaseColor(secondaryPalette) : null;

  return (
    <section
      id="combina"
      className="mx-auto flex max-w-[1280px] scroll-mt-28 flex-col gap-8 px-6 py-12"
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-x-14 gap-y-4">
        <h2 className="flex-[1_1_480px] text-[clamp(2.2rem,5vw,4.2rem)] leading-none font-bold tracking-[-0.03em]">
          Combínalo.
        </h2>
        <p className="text-soft max-w-[460px] flex-[1_1_320px] text-lg leading-normal text-pretty">
          Escoge un color secundario con la rueda de color. Se suma a tu
          exportación y a la vista previa.
        </p>
      </Reveal>

      <Reveal className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <div
            className="flex flex-wrap gap-1"
            role="group"
            aria-label="Tipo de combinación"
          >
            {HARMONIES.map((item) => (
              <button
                key={item.id}
                type="button"
                aria-pressed={harmony.id === item.id}
                onClick={() => setHarmony(item)}
                className={pillClass(harmony.id === item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="text-soft px-1 text-sm">{harmony.hint}</p>
        </div>

        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(240px,100%),1fr))] gap-3">
          <div className="bg-raised ring-edge flex flex-col gap-3 rounded-2xl p-4 ring-1">
            <ScaleBar palette={palette} />
            <div className="flex min-h-11 flex-col justify-center">
              <span className="text-sm font-semibold">Tu color</span>
              <span className="text-soft font-mono text-xs uppercase">
                {baseColor}
              </span>
            </div>
          </div>

          {suggestions.map((item) => {
            const isCurrent = current === item.color;
            return (
              <button
                key={item.color}
                type="button"
                aria-pressed={isCurrent}
                onClick={() => setSecondaryPalette(item.palette)}
                className={`bg-raised flex cursor-pointer flex-col gap-3 rounded-2xl p-4 text-left transition-transform hover:-translate-y-0.5 ${
                  isCurrent ? "ring-ink ring-2" : "ring-edge ring-1"
                }`}
              >
                <ScaleBar palette={item.palette} />
                <span className="flex min-h-11 items-center justify-between gap-2">
                  <span className="flex flex-col">
                    <span className="text-sm font-semibold">
                      {isCurrent ? "Tu secundario" : "Usar de secundario"}
                    </span>
                    <span className="text-soft font-mono text-xs uppercase">
                      {item.color}
                    </span>
                  </span>
                  {isCurrent && <Check className="h-4 w-4 shrink-0" />}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
