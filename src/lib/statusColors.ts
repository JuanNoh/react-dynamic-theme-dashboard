import chroma from "chroma-js";
import { fitToScreen } from "@/lib/harmony";
import { generateLocalPalette } from "@/lib/localPalette";
import type { Palette } from "@/types/palette";

export interface StatusKind {
  id: string; // nombre de la variable al exportar: --color-success-500
  label: string;
  sample: string;
  hue: number; // tono que mantiene el significado (OKLCH)
  lightness: number;
}

export const STATUS_KINDS: StatusKind[] = [
  {
    id: "success",
    label: "Éxito",
    sample: "Cambios guardados.",
    hue: 155,
    lightness: 0.6,
  },
  {
    id: "warning",
    label: "Aviso",
    sample: "Tu plan vence pronto.",
    hue: 80,
    lightness: 0.75,
  },
  {
    id: "error",
    label: "Error",
    sample: "No se pudo guardar.",
    hue: 25,
    lightness: 0.58,
  },
  {
    id: "info",
    label: "Información",
    sample: "Hay una versión nueva.",
    hue: 240,
    lightness: 0.6,
  },
];

// Cuánto se acerca cada estado al tono de la marca: lo justo para que combine
// sin que un error deje de leerse como error
const PULL_TO_BRAND = 0.12;
const MAX_PULL = 12;
// Intensidad media: ni estados apagados ni verdes y rojos chillones
const MIN_INTENSITY = 0.12;
const MAX_INTENSITY = 0.16;
const NEUTRAL_INTENSITY = 0.015;
const GRAY_BRAND_INTENSITY = 0.02;

const brandHue = (baseColor: string) => {
  const [, intensity, hue] = chroma(baseColor).oklch();
  return Number.isNaN(hue) || intensity < GRAY_BRAND_INTENSITY ? null : hue;
};

export function statusColor(kind: StatusKind, baseColor: string): string {
  const hue = brandHue(baseColor);
  const intensity = chroma(baseColor).oklch()[1];
  // El camino corto en la rueda, de -180 a 180
  const gap = hue === null ? 0 : ((hue - kind.hue + 540) % 360) - 180;
  const pull = Math.max(-MAX_PULL, Math.min(MAX_PULL, gap * PULL_TO_BRAND));

  return fitToScreen(
    kind.lightness,
    Math.max(MIN_INTENSITY, Math.min(MAX_INTENSITY, intensity)),
    kind.hue + pull,
  );
}

// El gris de la interfaz, con un toque del tono de la marca
export function neutralColor(baseColor: string): string {
  return fitToScreen(0.55, NEUTRAL_INTENSITY, brandHue(baseColor) ?? 0);
}

export function statusScales(baseColor: string) {
  return [
    ...STATUS_KINDS.map((kind) => ({
      ...kind,
      palette: generateLocalPalette(statusColor(kind, baseColor)),
    })),
    {
      id: "neutral",
      label: "Neutro",
      sample: "Borrador sin publicar.",
      palette: generateLocalPalette(neutralColor(baseColor)) as Palette,
    },
  ];
}
