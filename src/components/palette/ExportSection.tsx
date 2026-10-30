import { Check, Copy } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { usePalette } from "@/context/usePalette";
import { useExportModal, type ColorFormat } from "@/hooks/useExportModal";
import { actionShade } from "@/lib/contrast";

const TABS = [
  { value: "tailwind-v4", label: "Tailwind v4" },
  { value: "tailwind-v3", label: "Tailwind v3" },
  { value: "css", label: "CSS" },
  { value: "json", label: "JSON" },
] as const;

const FORMATS: ColorFormat[] = ["hex", "oklch", "hsl", "rgb"];

const pillClass = (active: boolean) =>
  `min-h-11 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors ${
    active ? "bg-ink text-ground" : "text-soft hover:text-ink"
  }`;

export default function ExportSection() {
  const { palette } = usePalette();
  const {
    activeTab,
    setActiveTab,
    format,
    setFormat,
    copied,
    getContent,
    copyToClipboard,
  } = useExportModal();

  return (
    <section
      id="exporta"
      className="mx-auto flex max-w-[1280px] scroll-mt-28 flex-wrap items-start gap-x-14 gap-y-8 px-6 pt-12 pb-28"
    >
      <Reveal className="flex min-w-0 flex-[1_1_380px] flex-col items-start gap-5">
        <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] leading-none font-bold tracking-[-0.03em]">
          Llévatela a tu código.
        </h2>
        <p className="text-soft max-w-[440px] text-lg leading-normal text-pretty">
          Escoge tu formato y copia. Sin crear cuenta.
        </p>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Formato">
          {TABS.map((tab) => (
            <button
              key={tab.value}
              type="button"
              aria-pressed={activeTab === tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={pillClass(activeTab === tab.value)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-1" role="group" aria-label="Color">
          {FORMATS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={format === item}
              onClick={() => setFormat(item)}
              className={`${pillClass(format === item)} uppercase`}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copyToClipboard}
          style={{ backgroundColor: palette[actionShade(palette)] }}
          className="flex min-h-12 cursor-pointer items-center gap-2 rounded-full px-6 text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgb(255_255_255/0.16)] transition-colors duration-500"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
          {copied ? "Copiado" : "Copiar código"}
        </button>
      </Reveal>

      <Reveal className="min-w-0 flex-[1_1_420px]">
        <pre className="bg-raised text-soft ring-edge max-h-[420px] overflow-auto rounded-2xl p-6 font-mono text-sm leading-relaxed ring-1">
          <code>{getContent()}</code>
        </pre>
      </Reveal>
    </section>
  );
}
