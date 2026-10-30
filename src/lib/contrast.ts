import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "apca-w3";
import type { Palette } from "@/types/palette";

// Lc de APCA (sin signo) de un texto sobre un fondo
export const apcaLc = (text: string, background: string) => {
  const [tr, tg, tb] = chroma(text).rgb();
  const [br, bg, bb] = chroma(background).rgb();
  return Math.abs(
    Number(APCAcontrast(sRGBtoY([tr, tg, tb]), sRGBtoY([br, bg, bb]))),
  );
};

export type WcagLevel = "AAA" | "AA" | "Grande";
export type ApcaLevel = "Cuerpo" | "Contenido" | "Grande";

// WCAG 2: AAA desde 7:1, AA desde 4.5:1 y 3:1 sólo alcanza para texto grande
export function wcagLevel(ratio: number): WcagLevel | null {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "Grande";
  return null;
}

// Guía de APCA: Lc 75 para texto de lectura, 60 para contenido, 45 para títulos
export function apcaLevel(lc: number): ApcaLevel | null {
  if (lc >= 75) return "Cuerpo";
  if (lc >= 60) return "Contenido";
  if (lc >= 45) return "Grande";
  return null;
}

// Para mostrar la razón se redondea hacia abajo: 4.46 no pasa AA y escribir
// "4.5" diría lo contrario
export const formatRatio = (ratio: number) =>
  (Math.floor(ratio * 10) / 10).toFixed(1);

// Las dos medidas de una combinación. WCAG da lo mismo en cualquier orden; APCA
// no, porque un texto claro sobre oscuro no se lee igual que al revés.
export function measureContrast(text: string, background: string) {
  const ratio = chroma.contrast(text, background);
  const lc = apcaLc(text, background);
  return {
    ratio,
    wcag: wcagLevel(ratio),
    lc: Math.round(lc),
    apca: apcaLevel(lc),
  };
}

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
  const color = useLight ? light : dark;

  return {
    color,
    scoreAbs: Math.round(useLight ? lcLight : lcDark),
    ratio: chroma.contrast(color, background),
    useLight,
  };
}
