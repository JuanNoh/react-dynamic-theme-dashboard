import chroma from "chroma-js";

export interface Harmony {
  id: string;
  label: string;
  hint: string;
  offsets: number[]; // grados a girar en la rueda de color
}

export const HARMONIES: Harmony[] = [
  {
    id: "complementario",
    label: "Complementario",
    hint: "El opuesto en la rueda: el mayor contraste, bueno para resaltar una acción.",
    offsets: [180],
  },
  {
    id: "analogos",
    label: "Análogos",
    hint: "Los vecinos en la rueda: se ve tranquilo y natural.",
    offsets: [-30, 30],
  },
  {
    id: "dividido",
    label: "Dividido",
    hint: "Los vecinos del opuesto: contraste con menos tensión.",
    offsets: [150, 210],
  },
  {
    id: "triada",
    label: "Triada",
    hint: "Tres colores repartidos parejo: vivo y equilibrado.",
    offsets: [120, 240],
  },
  {
    id: "tetrada",
    label: "Tétrada",
    hint: "Dos pares de opuestos: da mucha variedad, úsala con medida.",
    offsets: [60, 180, 240],
  },
  {
    id: "cuadrado",
    label: "Cuadrado",
    hint: "Cuatro colores a la misma distancia: atrevido.",
    offsets: [90, 180, 270],
  },
];

// Un gris no tiene tono que girar y uno casi blanco o negro no deja lucir el
// nuevo color: se les da un mínimo para que la rueda siempre sirva de algo
const MIN_CHROMA = 0.09;
const MIN_LIGHTNESS = 0.4;
const MAX_LIGHTNESS = 0.8;

// Si el color se sale de lo que una pantalla muestra, se le baja la intensidad
// hasta que quepa, sin mover su tono ni su claridad
export function fitToScreen(lightness: number, intensity: number, hue: number) {
  let low = 0;
  let high = intensity;
  if (!chroma.oklch(lightness, high, hue).clipped()) {
    return chroma.oklch(lightness, high, hue).hex();
  }
  for (let i = 0; i < 16; i++) {
    const mid = (low + high) / 2;
    if (chroma.oklch(lightness, mid, hue).clipped()) high = mid;
    else low = mid;
  }
  return chroma.oklch(lightness, low, hue).hex();
}

// Gira el tono en OKLCH, que mantiene el brillo percibido mejor que HSL. Sin azar
// a propósito: el mismo color siempre da las mismas sugerencias.
export function harmonyColors(baseColor: string, offsets: number[]): string[] {
  const [lightness, intensity, hue] = chroma(baseColor).oklch();
  const baseHue = Number.isNaN(hue) ? 0 : hue;
  const fixedLightness = Math.min(
    MAX_LIGHTNESS,
    Math.max(MIN_LIGHTNESS, lightness),
  );
  const fixedIntensity = Math.max(MIN_CHROMA, intensity);

  return offsets.map((offset) =>
    fitToScreen(
      fixedLightness,
      fixedIntensity,
      (((baseHue + offset) % 360) + 360) % 360,
    ),
  );
}
