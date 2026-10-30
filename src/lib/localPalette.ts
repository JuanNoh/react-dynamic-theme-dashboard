import chroma, { type Color } from "chroma-js";
import { APCAcontrast, sRGBtoY } from "apca-w3";
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

export type ScaleMode = "tailwind" | "apca";

export interface ScaleOptions {
  shade?: ShadeKey | null; // tono donde fijar el color; null = donde caiga solo
  mode?: ScaleMode;
}

// Contraste APCA promedio de las 21 familias de Tailwind v3 en cada tono: del 50
// al 400 con texto negro encima, del 500 al 950 con texto blanco (calculado el
// 30-oct-2026). El modo APCA lleva cada tono justo a ese contraste.
const APCA_TARGETS: Record<ShadeKey, { text: "black" | "white"; lc: number }> =
  {
    "50": { text: "black", lc: 102 },
    "100": { text: "black", lc: 97 },
    "200": { text: "black", lc: 88 },
    "300": { text: "black", lc: 77 },
    "400": { text: "black", lc: 61 },
    "500": { text: "white", lc: 63 },
    "600": { text: "white", lc: 76 },
    "700": { text: "white", lc: 86 },
    "800": { text: "white", lc: 94 },
    "900": { text: "white", lc: 98 },
    "950": { text: "white", lc: 105 },
  };

// Los grises puros traen hue NaN; para sumar y restar tonos cuentan como 0
const hueOf = (color: Color) => {
  const hue = color.get("hsl.h");
  return Number.isNaN(hue) ? 0 : hue;
};

export function generateLocalScale(
  baseColor: string,
  options: ScaleOptions = {},
): PaletteScale {
  const scale = tailwindScale(chroma(baseColor));
  // En modo APCA el tono de la marca lo decide su contraste; fijarlo a mano
  // choca con los objetivos (los vecinos lo rebasaban casi siempre), así que
  // los dos modos son excluyentes
  if (options.mode === "apca") return toApca(scale);
  if (options.shade && options.shade !== scale.baseShade) {
    return pinToShade(chroma(baseColor), scale.family, options.shade);
  }
  return scale;
}

function tailwindScale(base: Color): PaletteScale {
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

// Fijar el color en otro tono: mismo molde de Tailwind, pero el brillo de toda
// la escala se estira para que el tono elegido quede con el brillo del base.
// Se estira la luminancia y no la claridad HSL: con HSL, al comprimir la escala
// (un verde claro fijado en el 950) dos tonos "en orden" se veían al revés por
// la saturación. El blanco (1) y el negro (0) no se mueven, así que la escala
// sigue yendo de claro a oscuro sin brincos.
function pinToShade(
  base: Color,
  family: string,
  shade: ShadeKey,
): PaletteScale {
  const shades = TAILWIND_FAMILIES[family];
  const anchorIdx = SHADE_KEYS.indexOf(shade);
  const anchor = chroma(shades[anchorIdx]);
  const baseLuminance = base.luminance();
  const anchorLuminance = anchor.luminance();
  const hueShift = hueOf(base) - hueOf(anchor);
  const anchorSaturation = anchor.get("hsl.s");
  const saturationRatio =
    anchorSaturation > 0 ? base.get("hsl.s") / anchorSaturation : 1;

  const stretch = (luminance: number) =>
    luminance >= anchorLuminance
      ? baseLuminance +
        ((luminance - anchorLuminance) / Math.max(1 - anchorLuminance, 1e-6)) *
          (1 - baseLuminance)
      : (luminance / anchorLuminance) * baseLuminance;

  const palette = {} as Palette;
  SHADE_KEYS.forEach((key, idx) => {
    if (idx === anchorIdx) {
      palette[key] = base.hex();
      return;
    }
    const ref = chroma(shades[idx]);
    const hue = (((hueOf(ref) + hueShift) % 360) + 360) % 360;
    const saturation = Math.min(1, ref.get("hsl.s") * saturationRatio);
    palette[key] = chroma
      .hsl(hue, saturation, ref.get("hsl.l"))
      .luminance(stretch(ref.luminance()))
      .hex();
  });

  return { palette, family, baseShade: shade };
}

const BLACK_Y = sRGBtoY([0, 0, 0]);
const WHITE_Y = sRGBtoY([255, 255, 255]);

// Lc (sin signo) del texto negro o blanco sobre un fondo
const lcOn = (text: "black" | "white", background: Color) => {
  const [r, g, b] = background.rgb();
  const textY = text === "black" ? BLACK_Y : WHITE_Y;
  return Math.abs(Number(APCAcontrast(textY, sRGBtoY([r, g, b]))));
};

// Modo APCA: cada tono conserva su tono y saturación, pero su claridad se busca
// (bisección) hasta dar el contraste objetivo. El color de la marca no se toca.
// La marca se sienta donde su propio contraste se parece más al objetivo:
// #ff6b00 para Tailwind cae en el 600, pero por contraste es un 500, y dejarlo
// en el 600 hacía que el 500 saliera más oscuro que él.
function toApca(scale: PaletteScale): PaletteScale {
  const base = chroma(scale.palette[scale.baseShade]);
  const baseShade = SHADE_KEYS.reduce((best, key) => {
    const miss = (k: ShadeKey) =>
      Math.abs(lcOn(APCA_TARGETS[k].text, base) - APCA_TARGETS[k].lc);
    return miss(key) < miss(best) ? key : best;
  });

  const palette = { ...scale.palette };
  for (const key of SHADE_KEYS) {
    if (key === baseShade) {
      palette[key] = base.hex();
      continue;
    }
    const current = chroma(palette[key]);
    const hue = hueOf(current);
    const saturation = current.get("hsl.s");
    const { text, lc } = APCA_TARGETS[key];

    let lighter = 1;
    let darker = 0;
    for (let i = 0; i < 24; i++) {
      const mid = (lighter + darker) / 2;
      const got = lcOn(text, chroma.hsl(hue, saturation, mid));
      // Con texto negro, más claro = más contraste; con blanco, al revés
      const goLighter = text === "black" ? got < lc : got > lc;
      if (goLighter) darker = mid;
      else lighter = mid;
    }
    palette[key] = chroma.hsl(hue, saturation, (lighter + darker) / 2).hex();
  }
  return { ...scale, palette, baseShade };
}

export function generateLocalPalette(
  baseColor: string,
  options?: ScaleOptions,
): Palette {
  return generateLocalScale(baseColor, options).palette;
}

// El motor deja el base intacto en su tono, así que se puede recuperar de la
// escala: es el tono que, al volver a pasar por el motor, da la misma escala.
// Hace falta porque el base de la IA no siempre cae en el 500, y regenerar desde
// el 500 cambia hasta 10 tonos. Escalas del motor viejo no cuadran → se queda el 500.
export function findBaseColor(palette: Palette): string {
  const reproduces = (key: ShadeKey) => {
    const again = generateLocalScale(palette[key]);
    return (
      again.baseShade === key &&
      SHADE_KEYS.every((k) => again.palette[k] === palette[k].toLowerCase())
    );
  };
  if (reproduces("500")) return palette["500"];
  return palette[SHADE_KEYS.find(reproduces) ?? "500"];
}
