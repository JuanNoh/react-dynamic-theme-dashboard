import { useEffect, useRef, useState } from "react";
import { Link2 } from "lucide-react";
import AppLayout from "@/components/layout/AppLayoutTwo";
import SwatchGrid from "@/components/palette/SwatchGrid";
import BrandForm from "@/components/palette/BrandFormTwo";
import PopularPalettes from "@/components/palette/PopularPalettes";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import DashboardPreview from "@/components/preview/DashboardPreview";
import MobilePreview from "@/components/preview/MobilePreview";
import Toast from "@/components/ui/Toast";
import { usePalette } from "@/context/usePalette";
import { generateLocalPalette } from "@/lib/localPalette";
import { buildShareUrl, parseShareParams } from "@/lib/shareUrl";

export default function PalettePage() {
  const {
    baseColor,
    secondaryPalette,
    brandName,
    setBaseColor,
    setPalette,
    setSecondaryPalette,
    setBrandName,
    setAiInsight,
  } = usePalette();
  const [toast, setToast] = useState<string | null>(null);
  const hydrated = useRef(false);

  // Si llegan con un link compartido (?p=...), cargamos esa paleta de entrada
  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const shared = parseShareParams(window.location.search);
    if (!shared) return;

    setBaseColor(shared.baseColor);
    setPalette(generateLocalPalette(shared.baseColor));
    if (shared.secondaryColor) {
      setSecondaryPalette(generateLocalPalette(shared.secondaryColor));
    }
    if (shared.name) setBrandName(shared.name);
    setAiInsight({
      name: shared.name ?? "Paleta compartida",
      description: "Cargada desde un link compartido, lista para explorar o exportar.",
      sentiment: "Compartida, Lista, Editable",
      usageTip:
        "Puedes ajustar el color base o describir tu marca para pedirle una variante a la IA.",
    });
  }, [
    setBaseColor,
    setPalette,
    setSecondaryPalette,
    setBrandName,
    setAiInsight,
  ]);

  const handleShare = async () => {
    const url = buildShareUrl(baseColor, secondaryPalette?.["500"], brandName);
    try {
      await navigator.clipboard.writeText(url);
      setToast("¡Link copiado! Compártelo donde quieras.");
    } catch {
      setToast("No se pudo copiar el link, inténtalo de nuevo.");
    }
  };

  return (
    <AppLayout>
      <div className="min-h-screen px-4 pt-28 pb-24">
        <section className="relative z-10 mx-auto mb-16 max-w-4xl">
          <BrandForm />
        </section>

        <PopularPalettes />

        <section className="mx-auto mb-20 max-w-7xl">
          <div className="mb-10 px-2 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Tu Sistema de Color
            </h2>
            <p className="mx-auto max-w-xl text-balance text-slate-500 dark:text-slate-400">
              Generado con inteligencia artificial y optimizado para UI.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-8">
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/60 p-6 shadow-xl shadow-slate-200/50 backdrop-blur-2xl sm:p-8 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/20">
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-sm font-bold tracking-widest text-slate-500 uppercase dark:text-slate-400">
                    Escala Primaria
                  </h3>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleShare}
                      aria-label="Copiar link de esta paleta"
                      className="hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400 flex cursor-pointer items-center gap-1.5 rounded border border-slate-200 bg-slate-100 px-2 py-1 text-xs text-slate-500 transition-colors dark:border-slate-700 dark:bg-slate-800"
                    >
                      <Link2 className="h-3.5 w-3.5" />
                      Compartir
                    </button>
                    <span className="rounded border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                      50-950
                    </span>
                  </div>
                </div>

                <div className="w-full">
                  <SwatchGrid />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-6 lg:col-span-4">
              <div className="h-full">
                <AIInsightCard />
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[90rem]">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
              Vista Previa en Contexto
            </h2>
            <p className="mx-auto max-w-xl text-balance text-slate-500 dark:text-slate-400">
              Aplicado en una interfaz real.
            </p>
          </div>
          <div className="px-2 sm:px-0">
            <div className="mt-10">
              <div className="hidden lg:block">
                <DashboardPreview />
              </div>

              <div className="block lg:hidden">
                <MobilePreview />
              </div>
            </div>
          </div>
        </section>
      </div>

      {toast && (
        <Toast
          message={toast}
          type="success"
          onClose={() => setToast(null)}
        />
      )}
    </AppLayout>
  );
}
