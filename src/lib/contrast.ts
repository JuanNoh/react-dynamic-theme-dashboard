import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "apca-w3";
import type { Palette, ShadeKey } from "@/types/palette";

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

const AA = 4.5;

const mostContrast = (background: string, colors: string[]) =>
  colors.reduce((best, color) =>
    chroma.contrast(color, background) > chroma.contrast(best, background)
      ? color
      : best,
  );

// Texto de cada tono: de su misma escala para que se sienta parte de la paleta
// (950 o 50, el que dé más contraste) y, si ni así llega a AA, negro o blanco.
// Antes elegía entre 900 y 100 por APCA, y del 400 al 600 quedaba en 3.0–4.3:1.
export function getTintedText(background: string, palette: Palette) {
  const tinted = mostContrast(background, [palette["950"], palette["50"]]);
  const color =
    chroma.contrast(tinted, background) >= AA
      ? tinted
      : mostContrast(background, ["#000000", "#ffffff"]);

  return {
    color,
    scoreAbs: Math.round(apcaLc(color, background)),
    ratio: chroma.contrast(color, background),
    useLight: chroma(color).luminance() > chroma(background).luminance(),
  };
}

// Tono para botones con texto blanco: el primero desde el 500 que llega a AA
export function actionShade(palette: Palette): ShadeKey {
  const shades: ShadeKey[] = ["500", "600", "700", "800", "900"];
  return (
    shades.find((key) => chroma.contrast("#ffffff", palette[key]) >= AA) ??
    "950"
  );
}

// Lo que conviene saber del color de la marca con texto blanco encima
export function baseContrastAdvice(palette: Palette, baseColor: string) {
  const ratio = chroma.contrast("#ffffff", baseColor);
  const measured = `Con texto blanco, tu color da ${formatRatio(ratio)}:1`;
  const level = wcagLevel(ratio);
  if (level === "AAA") return `${measured} y pasa AAA.`;
  if (level === "AA") {
    return `${measured} y pasa AA, así que sirve directo para botones.`;
  }

  const shade = actionShade(palette);
  const best = formatRatio(chroma.contrast("#ffffff", palette[shade]));
  const reach = level
    ? ": sólo alcanza para texto grande"
    : " y no se lee bien";
  return `${measured}${reach}. Para botones usa el ${shade}, que da ${best}:1.`;
}
