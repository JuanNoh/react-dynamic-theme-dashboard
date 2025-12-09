import { usePalette } from "@/context/usePalette";

export default function ColorPicker() {
  const { baseColor, setBaseColor } = usePalette();

  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-slate-700">Color Base:</span>
      <label className="relative h-14 w-48">
        <div className="pointer-events-none absolute inset-0 flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-4">
          <div
            className="h-8 w-8 rounded-full border-2 border-white shadow-md"
            style={{ background: baseColor }}
          />
          <code className="font-mono font-semibold text-slate-800 uppercase">
            {baseColor}
          </code>
        </div>
        <input
          id="baseColor"
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="h-full w-full cursor-pointer opacity-0"
        />
      </label>
    </div>
  );
}
