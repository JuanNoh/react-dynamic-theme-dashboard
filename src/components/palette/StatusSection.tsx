import { useMemo } from "react";
import { CircleAlert, CircleCheck, CircleX, Info, Minus } from "lucide-react";
import ScaleBar from "@/components/palette/ScaleBar";
import Reveal from "@/components/ui/Reveal";
import { usePalette } from "@/context/usePalette";
import { findBaseColor } from "@/lib/localPalette";
import { statusScales } from "@/lib/statusColors";

const ICONS = {
  success: CircleCheck,
  warning: CircleAlert,
  error: CircleX,
  info: Info,
  neutral: Minus,
};

export default function StatusSection() {
  const { baseColor, includeStatus, setIncludeStatus } = usePalette();
  const scales = useMemo(() => statusScales(baseColor), [baseColor]);

  return (
    <section
      id="estados"
      className="mx-auto flex max-w-[1280px] scroll-mt-28 flex-col gap-8 px-6 py-12"
    >
      <Reveal className="flex flex-wrap items-end justify-between gap-x-14 gap-y-4">
        <h2 className="flex-[1_1_480px] text-[clamp(2.2rem,5vw,4.2rem)] leading-none font-bold tracking-[-0.03em]">
          Éxito, aviso y error.
        </h2>
        <p className="text-soft max-w-[460px] flex-[1_1_320px] text-lg leading-normal text-pretty">
          Los mensajes de tu producto, con colores que ya combinan con tu marca
          y que se leen bien.
        </p>
      </Reveal>

      <Reveal className="flex flex-col gap-5">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(220px,100%),1fr))] gap-3">
          {scales.map((scale) => {
            const Icon = ICONS[scale.id as keyof typeof ICONS];
            return (
              <div
                key={scale.id}
                className="bg-raised ring-edge flex flex-col gap-3 rounded-2xl p-4 ring-1"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-sm font-semibold">{scale.label}</span>
                  <span className="text-soft font-mono text-xs uppercase">
                    {findBaseColor(scale.palette)}
                  </span>
                </div>
                <ScaleBar palette={scale.palette} />
                <p
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors duration-500"
                  style={{
                    backgroundColor: scale.palette["100"],
                    color: scale.palette["900"],
                  }}
                >
                  <Icon className="h-4 w-4 shrink-0" strokeWidth={2} />
                  {scale.sample}
                </p>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          role="switch"
          aria-checked={includeStatus}
          onClick={() => setIncludeStatus(!includeStatus)}
          className="flex min-h-11 cursor-pointer items-center gap-3 self-start text-left"
        >
          <span
            aria-hidden="true"
            className={`flex h-7 w-12 shrink-0 items-center rounded-full p-0.5 transition-colors ${
              includeStatus ? "bg-ink" : "bg-raised ring-edge ring-1"
            }`}
          >
            <span
              className={`h-6 w-7 rounded-full shadow-sm transition-transform duration-200 ${
                includeStatus
                  ? "bg-ground translate-x-[16px]"
                  : "bg-soft translate-x-0"
              }`}
            />
          </span>
          <span className="text-sm font-medium">
            Incluirlos en mi exportación
          </span>
        </button>
      </Reveal>
    </section>
  );
}
