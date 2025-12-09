import AppLayout from "@/components/layout/AppLayoutTwo";
import SwatchGrid from "@/components/palette/SwatchGrid";
import BrandForm from "@/components/palette/BrandFormTwo";
import AIInsightCard from "@/components/dashboard/AIInsightCard";
import DashboardPreview from "@/components/preview/DashboardPreview";

export default function PalettePage() {
  return (
    <AppLayout>
      <div className="min-h-screen px-4 pt-36 pb-24">
        <section className="relative z-10 mx-auto mb-16 max-w-4xl">
          <BrandForm />
        </section>

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
                  <span className="rounded border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800">
                    50-950
                  </span>
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
            <DashboardPreview />
          </div>
        </section>
      </div>
    </AppLayout>
  );
}
