import { usePalette } from '@/context/usePalette';

export default function ColorPicker() {
  const { baseColor, setBaseColor } = usePalette();

  return (
    <div className="flex items-center gap-4">
      <span className="font-medium text-slate-700">Color Base:</span>
      <label className="relative w-48 h-14">
        <div className="absolute inset-0 flex items-center gap-3 px-4 rounded-lg border border-slate-300 bg-white pointer-events-none">
          <div
            className="w-8 h-8 rounded-full border-2 border-white shadow-md"
            style={{ background: baseColor }}
          />
          <code className="font-mono uppercase text-slate-800 font-semibold">{baseColor}</code>
        </div>
        <input
          id="baseColor"
          type="color"
          value={baseColor}
          onChange={(e) => setBaseColor(e.target.value)}
          className="w-full h-full opacity-0 cursor-pointer"
        />
      </label>
    </div>
  );
}
