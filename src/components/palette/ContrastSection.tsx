import { useState } from "react";
import { Contrast } from "lucide-react";
import ContrastMatrix from "@/components/palette/ContrastMatrix";
import Reveal from "@/components/ui/Reveal";
import { usePalette } from "@/context/usePalette";
import {
  baseContrastAdvice,
  formatRatio,
  measureContrast,
} from "@/lib/contrast";
import { SHADE_KEYS } from "@/types/palette";

const LEVEL_LABEL = { AAA: "AAA", AA: "AA", Grande: "Sólo grande" };

export default function ContrastSection() {
  const { palette, baseColor } = usePalette();
  const [matrixOpen, setMatrixOpen] = useState(false);

  return (
    <section
      id="mide"
      className="mx-auto flex max-w-[1280px] scroll-mt-28 flex-col gap-10 px-6 py-20"
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-x-14 gap-y-4">
        <h2 className="flex-[1_1_480px] text-[clamp(2.2rem,5vw,4.2rem)] leading-none font-bold tracking-[-0.03em]">
          Mide antes de publicar.
        </h2>
        <p className="text-soft max-w-[460px] flex-[1_1_320px] text-lg leading-normal text-pretty">
          {baseContrastAdvice(palette, baseColor)}
        </p>
      </Reveal>

      <Reveal className="flex flex-col gap-3.5">
        <h3 className="text-base font-semibold">
          Texto blanco sobre cada tono
        </h3>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(92px,100%),1fr))] gap-2">
          {SHADE_KEYS.map((key) => {
            const { ratio, wcag } = measureContrast("#ffffff", palette[key]);
            return (
              <div key={key} className="flex flex-col gap-2">
                <div
                  aria-hidden="true"
                  className="flex h-[72px] items-center justify-center rounded-xl text-xl font-semibold text-white transition-colors duration-500"
                  style={{ backgroundColor: palette[key] }}
                >
                  Aa
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold">{key}</span>
                  <span className="text-soft font-mono text-xs">
                    {formatRatio(ratio)}:1
                  </span>
                  <span className="text-soft text-xs">
                    {wcag ? LEVEL_LABEL[wcag] : "No pasa"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>

      <Reveal>
        <button
          type="button"
          onClick={() => setMatrixOpen(true)}
          className="bg-raised text-ink ring-edge flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 transition-transform hover:-translate-y-0.5"
        >
          <Contrast className="h-4 w-4" />
          Ver todas las combinaciones
        </button>
      </Reveal>

      <ContrastMatrix
        isOpen={matrixOpen}
        onClose={() => setMatrixOpen(false)}
      />
    </section>
  );
}
