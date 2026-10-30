import { motion } from "motion/react";
import { useBrandForm } from "@/hooks/useBrandForm";
import ColorPicker from "@/components/palette/ColorPicker";
import ScaleStrip from "@/components/palette/ScaleStrip";
import { Loader2, ArrowRight, AlertCircle } from "lucide-react";

// Entrada suave del hero: sube poquito y aparece, primero el texto y luego el buscador
const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

export default function BrandForm() {
  const {
    keywords,
    setKeywords,
    loading,
    error,
    setError,
    handleSubmit,
    hasKeywords,
    isHexTyped,
    baseColor,
    pickColor,
  } = useBrandForm();

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4">
      <motion.div {...fadeUp(0)} className="mb-12 space-y-6 text-center">
        <p className="inline-flex rounded-full border border-slate-200 bg-white/60 px-3.5 py-1 text-xs font-medium text-slate-600 backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          Gratis y sin cuenta
        </p>

        <h1 className="text-5xl font-extrabold tracking-tight text-balance text-slate-900 sm:text-6xl md:text-7xl dark:text-white">
          Paletas de{" "}
          <span className="text-primary-600 dark:text-primary-400">
            color
          </span>{" "}
          listas para tu producto
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-balance text-slate-600 md:text-xl dark:text-slate-400">
          Describe tu marca y la IA elige los colores, o escoge uno tú. Te damos
          la escala completa, con buen contraste y lista para exportar.
        </p>
      </motion.div>

      <motion.form
        {...fadeUp(0.1)}
        onSubmit={handleSubmit}
        className="relative z-10 mx-auto max-w-3xl"
      >
        <div className="group relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 opacity-20 blur-lg transition duration-1000 group-hover:opacity-40 group-hover:duration-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"></div>

          <div className="relative flex items-center">
            {/* Escoger el color a mano, sin pasar por la IA */}
            <div className="absolute top-1/2 left-3 z-20 -translate-y-1/2">
              <ColorPicker
                value={baseColor}
                onChange={pickColor}
                disabled={loading}
              />
            </div>

            <input
              type="text"
              value={keywords}
              onChange={(e) => {
                setKeywords(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Describe tu marca o pega un #hex..."
              className="w-full rounded-2xl border border-slate-200 bg-white/80 py-5 pr-16 pl-16 text-lg text-slate-900 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition-all placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-500/20 focus:outline-none sm:pr-40 dark:border-white/10 dark:bg-[#0B1120]/90 dark:text-white dark:shadow-black/50 dark:placeholder:text-slate-500 dark:focus:border-white/30 dark:focus:ring-white/20"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !hasKeywords}
              className="absolute top-2 right-2 bottom-2 flex items-center gap-2 rounded-xl bg-slate-900 px-3 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-black active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 sm:px-6 dark:bg-white dark:text-black dark:hover:bg-slate-200"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">
                    {isHexTyped ? "Usar color" : "Generar"}
                  </span>
                  <ArrowRight
                    className="h-5 w-5 sm:h-4 sm:w-4"
                    strokeWidth={2.5}
                  />
                </>
              )}
            </button>
          </div>
        </div>

        <ScaleStrip />

        <div className="mt-6">
          {!error && (
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="xs:inline mr-1 hidden text-xs font-medium opacity-70">
                Pruébalo:
              </span>
              {[
                { label: "🌱 Eco", val: "Tienda de plantas ecológica" },
                {
                  label: "🚀 SaaS",
                  val: "Startup SaaS de inteligencia artificial",
                },
                { label: "🍣 Sushi", val: "Restaurante de sushi premium" },
              ].map((item) => (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => setKeywords(item.val)}
                  className="cursor-pointer rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium transition-all duration-200 hover:border-slate-400 hover:text-slate-900 active:scale-95 dark:border-white/10 dark:bg-white/5 dark:hover:border-white/40 dark:hover:text-white"
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
          {error && (
            <div className="flex w-full animate-pulse items-center gap-2 rounded-lg border border-rose-100 bg-rose-50 px-4 py-2 text-rose-500 md:w-auto dark:border-rose-800 dark:bg-rose-900/20">
              <AlertCircle className="h-4 w-4" />
              <span className="font-medium">{error}</span>
            </div>
          )}
        </div>
      </motion.form>
    </div>
  );
}
