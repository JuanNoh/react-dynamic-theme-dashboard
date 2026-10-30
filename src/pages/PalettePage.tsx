import { useEffect, useRef } from "react";
import { Link2 } from "lucide-react";
import { toast } from "sonner";
import AppLayout from "@/components/layout/AppLayoutTwo";
import SwatchGrid from "@/components/palette/SwatchGrid";
import ScaleSettings from "@/components/palette/ScaleSettings";
import ContrastSection from "@/components/palette/ContrastSection";
import ExportSection from "@/components/palette/ExportSection";
import FanStory from "@/components/story/FanStory";
import Reveal from "@/components/ui/Reveal";
import PopularPalettes from "@/components/palette/PopularPalettes";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import DashboardPreview from "@/components/preview/DashboardPreview";
import MobilePreview from "@/components/preview/MobilePreview";
import { usePalette } from "@/context/usePalette";
import { findBaseColor, generateLocalPalette } from "@/lib/localPalette";
import { buildShareUrl, parseShareParams } from "@/lib/shareUrl";

export default function PalettePage() {
  const {
    baseColor,
    secondaryPalette,
    brandName,
    aiInsight,
    scaleOptions,
    setBaseColor,
    setScaleOptions,
    setSecondaryPalette,
    setBrandName,
    setAiInsight,
  } = usePalette();
  const hydrated = useRef(false);

  // Si llegan con un link compartido (?p=...), cargamos esa paleta de entrada
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const shared = parseShareParams(window.location.search);
    if (!shared) return;

    setScaleOptions({ shade: shared.shade, mode: shared.mode });
    setBaseColor(shared.baseColor);
    if (shared.secondaryColor) {
      setSecondaryPalette(generateLocalPalette(shared.secondaryColor));
    }
    if (shared.name) setBrandName(shared.name);
    setAiInsight({
      name: shared.name ?? "Paleta compartida",
      description:
        "Cargada desde un link compartido, lista para explorar o exportar.",
      sentiment: "Compartida, Lista, Editable",
      usageTip:
        "Puedes ajustar el color base o describir tu marca para pedirle una variante a la IA.",
    });
  }, [
    setBaseColor,
    setScaleOptions,
    setSecondaryPalette,
    setBrandName,
    setAiInsight,
  ]);

  const handleShare = async () => {
    // El secundario no siempre tiene su base en el 500: lo sacamos de la escala
    // para que quien abra el link vea exactamente la misma paleta
    const url = buildShareUrl(
      baseColor,
      secondaryPalette ? findBaseColor(secondaryPalette) : null,
      brandName,
      scaleOptions,
    );
    try {
      await navigator.clipboard.writeText(url);
      toast.success("¡Link copiado! Compártelo donde quieras.");
    } catch {
      toast.error("No se pudo copiar el link, inténtalo de nuevo.");
    }
  };

  return (
    <AppLayout>
      <FanStory />

      <section
        id="sistema"
        className="mx-auto flex max-w-[1280px] scroll-mt-28 flex-col gap-8 px-6 pt-24 pb-12"
      >
        <Reveal className="flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-[clamp(2.2rem,5vw,4.2rem)] leading-none font-bold tracking-[-0.03em]">
            Ajusta tu escala.
          </h2>
          <button
            type="button"
            onClick={handleShare}
            aria-label="Copiar link de esta paleta"
            className="bg-raised text-ink ring-edge flex min-h-11 cursor-pointer items-center gap-2 rounded-full px-5 text-sm font-semibold ring-1 transition-transform hover:-translate-y-0.5"
          >
            <Link2 className="h-4 w-4" />
            Compartir
          </button>
        </Reveal>

        <Reveal className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className={aiInsight ? "lg:col-span-8" : "lg:col-span-12"}>
            <ScaleSettings />
            <SwatchGrid />
          </div>
          {aiInsight && (
            <div className="lg:col-span-4">
              <AIInsightCard />
            </div>
          )}
        </Reveal>
      </section>

      <ContrastSection />
      <PopularPalettes />

      <section className="mx-auto flex max-w-[90rem] flex-col gap-10 px-6 py-20">
        <Reveal>
          <h2 className="mx-auto max-w-[1232px] text-[clamp(2.2rem,5vw,4.2rem)] leading-none font-bold tracking-[-0.03em]">
            Así se ve en una interfaz real.
          </h2>
        </Reveal>
        <div className="hidden lg:block">
          <DashboardPreview />
        </div>
        <div className="block lg:hidden">
          <MobilePreview />
        </div>
      </section>

      <ExportSection />
    </AppLayout>
  );
}
