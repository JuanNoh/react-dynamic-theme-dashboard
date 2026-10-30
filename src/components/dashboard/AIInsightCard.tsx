import { usePalette } from "@/context/usePalette";

export default function AIInsightCard() {
  const { aiInsight } = usePalette();

  if (!aiInsight) return null;

  return (
    <div className="bg-raised ring-edge flex flex-col gap-3 rounded-2xl p-6 ring-1">
      <div>
        <h3 className="text-xl font-semibold tracking-tight">
          {aiInsight.name}
        </h3>
        <p className="text-soft text-sm">{aiInsight.sentiment}</p>
      </div>
      <p className="text-soft text-[15px] leading-relaxed">
        {aiInsight.description}
      </p>
      <p className="border-edge text-soft border-t pt-3 text-sm leading-relaxed">
        {aiInsight.usageTip}
      </p>
    </div>
  );
}
