import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "apca-w3";
import type { Palette } from "@/types/palette";

// Lc de APCA (sin signo) de un texto sobre un fondo
const apcaLc = (text: string, background: string) => {
  const [tr, tg, tb] = chroma(text).rgb();
  const [br, bg, bb] = chroma(background).rgb();
  return Math.abs(
    Number(APCAcontrast(sRGBtoY([tr, tg, tb]), sRGBtoY([br, bg, bb]))),
  );
};

// Texto teñido estilo uicolors: en vez de blanco o gris, el texto de cada tono
// sale de su misma escala (el 900 sobre los claros, el 100 sobre los oscuros),
// así se siente parte de la paleta. Gana el que tenga más contraste APCA y
// scoreAbs es el Lc de ese texto real, no el de blanco/negro.
export function getTintedText(background: string, palette: Palette) {
  const dark = palette["900"];
  const light = palette["100"];
  const lcDark = apcaLc(dark, background);
  const lcLight = apcaLc(light, background);
  const useLight = lcLight > lcDark;

  return {
    color: useLight ? light : dark,
    scoreAbs: Math.round(useLight ? lcLight : lcDark),
    useLight,
  };
}
