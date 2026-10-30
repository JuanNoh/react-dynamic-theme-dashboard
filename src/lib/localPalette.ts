import chroma, { type Color } from "chroma-js";
import { type Palette, type ShadeKey, SHADE_KEYS } from "@/types/palette";
import { GRAY_FAMILIES, TAILWIND_FAMILIES } from "@/constants/tailwindFamilies";

// Mismo algoritmo que usa palette-api en el server (src/lib/generatePalette.ts),
// portado al front para armar escalas al instante sin llamarle a la IA:
// galería de populares, links compartidos y el color picker manual.
//
// Motor estilo uicolors: en vez de inventar la curva de claridad con fórmulas,
// agarra la familia de Tailwind que más se parece al color (ya viene afinada a
// mano tono por tono) y la "pinta" con el tono y la saturación del color base.
//
// 1. Grises con grises: arriba de 15% de saturación sólo compiten las familias
//    de color; de ahí para abajo, sólo slate/gray/zinc/stone.
// 2. Gana la familia que tenga UN tono más cercano al base (deltaE CIEDE2000).
// 3. El base se sienta en el tono de esa familia con la claridad HSL más
//    parecida y ahí se queda tal cual (un vino oscuro cae en el 900, no en el 500).
// 4. Al resto se le gira el tono lo mismo que hay entre el base y ese ancla, y
//    se le escala la saturación en la misma proporción. La claridad no se toca.

const GRAY_SATURATION_LIMIT = 0.15;

export interface PaletteScale {
  palette: Palette;
  family: string; // familia de Tailwind que sirvió de molde
  baseShade: ShadeKey; // tono donde quedó el color original, intacto
}

// Los grises puros traen hue NaN; para sumar y restar tonos cuentan como 0
const hueOf = (color: Color) => {
  const hue = color.get("hsl.h");
  return Number.isNaN(hue) ? 0 : hue;
};

export function generateLocalScale(baseColor: string): PaletteScale {
  const base = chroma(baseColor);
  const baseSaturation = base.get("hsl.s");
  const baseLightness = base.get("hsl.l");
  const wantsGray = baseSaturation <= GRAY_SATURATION_LIMIT;

  // 1 y 2. La familia con el tono más parecido al base
  let family = "";
  let minDelta = Infinity;
  for (const [name, shades] of Object.entries(TAILWIND_FAMILIES)) {
    if (GRAY_FAMILIES.includes(name) !== wantsGray) continue;
    for (const hex of shades) {
      const delta = chroma.deltaE(base, hex);
      if (delta <= minDelta) {
        minDelta = delta;
        family = name;
      }
    }
  }
  const shades = TAILWIND_FAMILIES[family];

  // 3. En qué tono se sienta el base
  let anchorIdx = 0;
  let minLightnessDiff = Infinity;
  shades.forEach((hex, idx) => {
    const diff = Math.abs(chroma(hex).get("hsl.l") - baseLightness);
    if (diff <= minLightnessDiff) {
      minLightnessDiff = diff;
      anchorIdx = idx;
    }
  });

  // 4. Cuánto girar el tono y cuánto escalar la saturación
  const anchor = chroma(shades[anchorIdx]);
  const hueShift = hueOf(base) - hueOf(anchor);
  const anchorSaturation = anchor.get("hsl.s");
  // Si el ancla es gris puro (zinc-50, por ejemplo) no hay proporción que sacar
  const saturationRatio =
    anchorSaturation > 0 ? baseSaturation / anchorSaturation : 1;

  const palette = {} as Palette;
  SHADE_KEYS.forEach((key, idx) => {
    if (idx === anchorIdx) {
      palette[key] = base.hex();
      return;
    }
    const ref = chroma(shades[idx]);
    const hue = (((hueOf(ref) + hueShift) % 360) + 360) % 360;
    // Saturación primero y tono después, redondeando a hex entre pasos: así
    // cuadra tono por tono con uicolors (en un solo paso se mueve ±1 en algún canal)
    const saturated = ref
      .set("hsl.s", ref.get("hsl.s") * saturationRatio)
      .hex();
    palette[key] = chroma(saturated).set("hsl.h", hue).hex();
  });

  return { palette, family, baseShade: SHADE_KEYS[anchorIdx] };
}

export function generateLocalPalette(baseColor: string): Palette {
  return generateLocalScale(baseColor).palette;
}
