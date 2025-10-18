import chroma from 'chroma-js';
import { type Palette, SHADE_KEYS } from '@/types/palette';

const easeOut = (t: number) => 1 - Math.pow(1 - t, 1.4);
const clamp = (x: number, min: number, max: number) => Math.min(max, Math.max(min, x));

export function generatePalette(baseColor: string): Palette {
  const [h0, s0, l0] = chroma(baseColor).hsl();
  const idx500 = 5;
  const LMAX = 0.965;
  const LMIN = 0.26;
  const HUE_SHIFT_DARK_MAX = -1.2;

  const palette: Partial<Palette> = {};
  SHADE_KEYS.forEach((key, idx) => {
    if (key === '500') {
      palette[key] = chroma(baseColor).hex();
      return;
    }

    const pos = idx - idx500;
    const dir = Math.sign(pos);
    const t = Math.abs(pos) / 5;

    const Lt = dir < 0 ? l0 + (LMAX - l0) * easeOut(t) : l0 - (l0 - LMIN) * easeOut(t);

    let St = s0;
    if (dir < 0) {
      St = s0 * (1 - 0.3 * Math.pow(t, 0.9));
    } else {
      St = s0 * (1 + 0.05 * Math.pow(t, 0.9) - 0.2 * Math.pow(t, 1.6));
      if (t > 0.6) St *= 1 - (0.35 * (t - 0.6)) / 0.4;
    }

    const Ht = dir > 0 ? h0 + HUE_SHIFT_DARK_MAX * Math.pow(t, 0.8) : h0;

    const h = isFinite(Ht) ? Ht : h0;
    const s = clamp(St, 0, 1);
    const l = clamp(Lt, 0, 1);

    palette[key] = chroma.hsl(h, s, l).hex();
  });

  return palette as Palette;
}
