import chroma from 'chroma-js';
import { usePalette } from '@/context/usePalette';
import { SHADE_KEYS } from '@/types/palette';

export default function SwatchGrid() {
  const { palette } = usePalette();

  return (
    <div className="flex gap-2 flex-wrap">
      {SHADE_KEYS.map((k) => {
        const color = palette[k];
        const isLight = chroma(color).luminance() > 0.5;
        return (
          <div
            key={k}
            className={`w-[75px] h-24 rounded-lg flex flex-col justify-end p-2 text-xs shadow-inner ${isLight ? 'text-slate-800' : 'text-white'}`}
            style={{ backgroundColor: color }}
          >
            <div className="text-center">
              <strong className="font-semibold">{k}</strong>
              <code className="uppercase block">{color.substring(1)}</code>
            </div>
          </div>
        );
      })}
    </div>
  );
}
