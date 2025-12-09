import { useBrandForm } from "@/hooks/useBrandForm";
import { Loader2, ArrowRight, AlertCircle } from "lucide-react";

export default function BrandForm() {
  const {
    keywords,
    setKeywords,
    loading,
    error,
    setError,
    handleSubmit,
    hasKeywords,
  } = useBrandForm();

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4">
      <div className="mb-12 space-y-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 text-[11px] font-bold tracking-widest text-slate-600 uppercase shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-slate-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-slate-500 dark:bg-slate-200"></span>
          </span>
          Soporta Tailwind v4
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight text-balance text-slate-900 drop-shadow-sm sm:text-6xl md:text-7xl dark:text-white">
          Generador de
          <span className="bg-gradient-to-b from-slate-700 to-black bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-500">
            Paletas
          </span>
        </h1>

        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-balance text-slate-600 md:text-xl dark:text-slate-400">
          Crea esquemas de color profesionales (OKLCH, HEX) optimizados para UI
          moderna con un solo prompt.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="relative z-10 mx-auto max-w-3xl">
        <div className="group relative">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-slate-200 via-white to-slate-200 opacity-20 blur-lg transition duration-1000 group-hover:opacity-40 group-hover:duration-200 dark:from-slate-800 dark:via-slate-600 dark:to-slate-800"></div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={keywords}
              onChange={(e) => {
                setKeywords(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Describe tu marca (ej. Fintech moderna, Eco-friendly...)"
              className="w-full rounded-2xl border border-slate-200 bg-white/80 py-5 pr-40 pl-6 text-lg text-slate-900 shadow-xl shadow-slate-200/40 backdrop-blur-xl transition-all placeholder:text-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-500/20 focus:outline-none dark:border-white/10 dark:bg-[#0B1120]/90 dark:text-white dark:shadow-black/50 dark:placeholder:text-slate-500 dark:focus:border-white/30 dark:focus:ring-white/20"
              disabled={loading}
            />

            <button
              type="submit"
              disabled={loading || !hasKeywords}
              className="absolute top-2 right-2 bottom-2 flex items-center gap-2 rounded-xl bg-slate-900 px-6 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:bg-black active:scale-95 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-white dark:text-black dark:hover:bg-slate-200"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  Generar
                  <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                </>
              )}
            </button>
          </div>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-4 px-2 text-sm text-slate-500 md:flex-row dark:text-slate-400">
          {!error && (
            <div className="flex flex-wrap justify-center gap-2 md:justify-start">
              <span className="mr-1 text-xs font-medium opacity-70">
                Pruébalo:
              </span>
              {[
                { label: "🌱 Eco-Friendly", val: "Eco Friendly Plant Shop" },
                { label: "🚀 Startup SaaS", val: "SaaS Startup AI" },
                { label: "🍣 Sushi Premium", val: "Sushi Restaurant Premium" },
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
      </form>
    </div>
  );
}
