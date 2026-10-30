import { useState } from "react";
import chroma from "chroma-js";
import { RotateCcw, TriangleAlert } from "lucide-react";
import { HexColorInput } from "react-colorful";
import { usePalette } from "@/context/usePalette";
import { type ShadeKey, SHADE_KEYS } from "@/types/palette";

interface Hsl {
  h: number;
  s: number;
  l: number;
}

// Un gris trae el tono en NaN: en la barra cuenta como 0
const toHsl = (color: string): Hsl => {
  const [h, s, l] = chroma(color).hsl();
  return {
    h: Number.isNaN(h) ? 0 : Math.round(h),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
};

const toHex = ({ h, s, l }: Hsl) => chroma.hsl(h, s / 100, l / 100).hex();

// Cada barra pinta lo que pasaría al moverla
const hueTrack = ({ s, l }: Hsl) =>
  `linear-gradient(90deg, ${[0, 60, 120, 180, 240, 300, 360]
    .map((hue) => `hsl(${hue} ${s}% ${l}%)`)
    .join(", ")})`;
const saturationTrack = ({ h, l }: Hsl) =>
  `linear-gradient(90deg, hsl(${h} 0% ${l}%), hsl(${h} 100% ${l}%))`;
const lightnessTrack = ({ h, s }: Hsl) =>
  `linear-gradient(90deg, #000, hsl(${h} ${s}% 50%), #fff)`;

interface ShadeSliderProps {
  label: string;
  value: number;
  max: number;
  unit: string;
  track: string;
  onChange: (value: number) => void;
}

function ShadeSlider(props: ShadeSliderProps) {
  const { label, value, max, unit, track, onChange } = props;
  return (
    <label className="grid grid-cols-[88px_minmax(0,1fr)_44px] items-center gap-3 text-sm">
      <span className="text-soft">{label}</span>
      <input
        type="range"
        className="deslizador"
        min={0}
        max={max}
        value={value}
        aria-label={label}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ "--pista": track } as React.CSSProperties}
      />
      <span className="text-right font-mono text-xs">
        {value}
        {unit}
      </span>
    </label>
  );
}

interface ShadeEditorProps {
  shade: ShadeKey;
}

export default function ShadeEditor({ shade }: ShadeEditorProps) {
  const { palette, shadeEdits, setShadeEdits } = usePalette();
  const color = palette[shade];

  // El panel guarda su propio HSL: pasar por hex redondea y la barra brincaría.
  // Si el color cambia por fuera (restablecer, otro tono, APCA), se vuelve a leer.
  const [hsl, setHsl] = useState(() => toHsl(color));
  const [seen, setSeen] = useState(color);
  if (color !== seen) {
    setSeen(color);
    setHsl(toHsl(color));
  }

  const write = (next: Hsl) => {
    const hex = toHex(next);
    setHsl(next);
    setSeen(hex);
    setShadeEdits({ ...shadeEdits, [shade]: hex });
  };

  const writeHex = (hex: string) => {
    const clean = chroma(hex).hex();
    setHsl(toHsl(clean));
    setSeen(clean);
    setShadeEdits({ ...shadeEdits, [shade]: clean });
  };

  const reset = () => {
    const rest = { ...shadeEdits };
    delete rest[shade];
    setShadeEdits(rest);
  };

  // La escala tiene que seguir yendo de claro a oscuro
  const index = SHADE_KEYS.indexOf(shade);
  const lighter = SHADE_KEYS[index - 1];
  const darker = SHADE_KEYS[index + 1];
  const brightness = chroma(color).luminance();
  const outOfOrder =
    lighter && brightness > chroma(palette[lighter]).luminance()
      ? `Quedó más claro que el ${lighter}.`
      : darker && brightness < chroma(palette[darker]).luminance()
        ? `Quedó más oscuro que el ${darker}.`
        : null;

  return (
    <div className="bg-raised ring-edge mt-3 flex flex-wrap gap-x-6 gap-y-4 rounded-2xl p-5 ring-1">
      <div className="flex flex-[1_1_180px] flex-col gap-3">
        <div className="flex items-center gap-3">
          <span
            aria-hidden="true"
            className="ring-edge h-12 w-12 shrink-0 rounded-xl ring-1"
            style={{ backgroundColor: color }}
          />
          <div>
            <h3 className="text-base font-semibold">Tono {shade}</h3>
            <label className="text-soft flex items-center font-mono text-sm">
              #
              <HexColorInput
                color={color}
                onChange={writeHex}
                aria-label={`Código hex del tono ${shade}`}
                className="text-ink h-8 w-20 bg-transparent uppercase focus:outline-none"
              />
            </label>
          </div>
        </div>
        {shadeEdits[shade] && (
          <button
            type="button"
            onClick={reset}
            className="text-soft hover:text-ink flex min-h-11 cursor-pointer items-center gap-2 self-start text-sm transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
            Restablecer este tono
          </button>
        )}
      </div>

      <div className="flex min-w-0 flex-[3_1_320px] flex-col">
        <ShadeSlider
          label="Tono"
          value={hsl.h}
          max={360}
          unit="°"
          track={hueTrack(hsl)}
          onChange={(h) => write({ ...hsl, h })}
        />
        <ShadeSlider
          label="Saturación"
          value={hsl.s}
          max={100}
          unit="%"
          track={saturationTrack(hsl)}
          onChange={(s) => write({ ...hsl, s })}
        />
        <ShadeSlider
          label="Claridad"
          value={hsl.l}
          max={100}
          unit="%"
          track={lightnessTrack(hsl)}
          onChange={(l) => write({ ...hsl, l })}
        />
        {outOfOrder && (
          <p className="text-soft mt-1 flex items-center gap-2 text-sm">
            <TriangleAlert className="h-4 w-4 shrink-0" />
            {outOfOrder}
          </p>
        )}
      </div>
    </div>
  );
}
