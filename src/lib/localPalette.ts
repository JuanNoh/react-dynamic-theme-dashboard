import chroma from "chroma-js";
import { type Palette, type ShadeKey, SHADE_KEYS } from "@/types/palette";

// Mismo algoritmo que usa palette-api en el server (src/lib/generatePalette.ts),
// portado al front para armar escalas al instante sin llamarle a la IA:
// galería de populares, links compartidos y el color picker manual.

const standardLuminance: Record<ShadeKey, number> = {
  "50": 0.95,
  "100": 0.9,
  "200": 0.8,
  "300": 0.75,
  "400": 0.7,
  "500": 0.55,
  "600": 0.25,
  "700": 0.15,
  "800": 0.1,
  "900": 0.05,
  "950": 0.01,
};

const standardLightness: Record<ShadeKey, number> = {
  "50": 0.98,
  "100": 0.96,
  "200": 0.9,
  "300": 0.8,
  "400": 0.6,
  "500": 0.45,
  "600": 0.35,
  "700": 0.25,
  "800": 0.15,
  "900": 0.1,
  "950": 0.05,
};

export function generateLocalPalette(baseColor: string): Palette {
  const [h, s, l] = chroma(baseColor).hsl();
  const lum = chroma(baseColor).luminance();

  // 1. Buscamos a qué tono estándar se parece más el color base
  let minDiff = Infinity;
  let baseKey: ShadeKey = "500";

  SHADE_KEYS.forEach((key) => {
    const diff = Math.abs(lum - standardLuminance[key]);
    if (diff < minDiff) {
      minDiff = diff;
      baseKey = key;
    }
  });

  if (lum > 0.99) baseKey = "50";
  if (lum < 0.01) baseKey = "950";

  const baseIdx = SHADE_KEYS.indexOf(baseKey);
  const palette: Partial<Palette> = {};

  // 2. Extremos dinámicos según la claridad del base
  const dyn50 = 0.96 + 0.04 * l;
  const dyn950 = 0.16 * l;

  // 3. Interpolamos el resto de la escala alrededor del base
  palette[baseKey] = chroma(baseColor).hex();

  SHADE_KEYS.forEach((key, idx) => {
    if (idx === baseIdx) return;

    const stdL = standardLightness[key];
    const stdBase = standardLightness[baseKey];
    let targetL = l;

    if (idx < baseIdx) {
      const std50 = standardLightness["50"];
      const ratio = (stdL - stdBase) / (std50 - stdBase);
      targetL = l + ratio * (dyn50 - l);
    } else {
      const std950 = standardLightness["950"];
      const ratio = (stdBase - stdL) / (stdBase - std950);
      targetL = l - ratio * (l - dyn950);
    }

    palette[key] = chroma.hsl(h, s, targetL).hex();
  });

  return palette as Palette;
}
