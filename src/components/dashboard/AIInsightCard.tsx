import { usePalette } from "@/context/usePalette";
import { Lightbulb } from "lucide-react";

export default function AIInsightCard() {
  const { aiInsight } = usePalette();

  if (!aiInsight) return null;

  return (
    <div className="group relative overflow-hidden rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <div className="from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 absolute top-0 bottom-0 left-0 w-1 bg-gradient-to-b"></div>
      <div className="flex items-start gap-4">
        <div className="bg-primary-50 dark:bg-primary-900/20 text-primary-600 dark:text-primary-400 rounded-full p-3">
          <Lightbulb className="h-6 w-6" strokeWidth={1.5} />
        </div>
        <div>
          <h3 className="mb-1 text-lg font-bold text-slate-900 dark:text-white">
            Tips de Uso
          </h3>
          <p className="text-primary-600 dark:text-primary-400 mb-3 text-xs font-medium tracking-wide uppercase">
            {aiInsight.name} • {aiInsight.sentiment}
          </p>
          <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            {aiInsight.description}
          </p>

          <div className="flex items-center gap-2 rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
            <Lightbulb className="h-4 w-4 text-amber-500" strokeWidth={1.5} />
            <span>
              <strong>UX Tip:</strong> {aiInsight.usageTip}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
