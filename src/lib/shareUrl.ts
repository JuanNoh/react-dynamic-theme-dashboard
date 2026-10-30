import { SHADE_KEYS, type ShadeKey } from "@/types/palette";
import type { ScaleMode, ScaleOptions } from "@/lib/localPalette";

// Compartir paletas por URL: ?p=<base>&s=<secundario>&n=<nombre>&t=<tono>&m=apca
// Los hex van sin # para que el link quede limpio. t y m sólo aparecen si se
// cambiaron, para que quien abra el link vea exactamente la misma escala.

const HEX_RE = /^[0-9a-fA-F]{6}$/;

export interface SharedPalette {
  baseColor: string;
  secondaryColor: string | null;
  name: string | null;
  shade: ShadeKey | null;
  mode: ScaleMode;
}

export function buildShareUrl(
  baseColor: string,
  secondaryColor?: string | null,
  name?: string | null,
  options?: ScaleOptions,
): string {
  const params = new URLSearchParams();
  params.set("p", baseColor.replace("#", ""));
  if (secondaryColor) params.set("s", secondaryColor.replace("#", ""));

  const cleanName = name?.trim();
  if (cleanName && cleanName !== "My Brand") {
    params.set("n", cleanName.slice(0, 40));
  }

  // En modo APCA el tono fijado no aplica (son excluyentes)
  if (options?.mode === "apca") params.set("m", "apca");
  else if (options?.shade) params.set("t", options.shade);

  return `${window.location.origin}/?${params.toString()}`;
}

export function parseShareParams(search: string): SharedPalette | null {
  const params = new URLSearchParams(search);
  const p = params.get("p");
  if (!p || !HEX_RE.test(p)) return null;

  const s = params.get("s");
  const t = params.get("t");
  return {
    baseColor: `#${p.toLowerCase()}`,
    secondaryColor: s && HEX_RE.test(s) ? `#${s.toLowerCase()}` : null,
    name: params.get("n"),
    shade: SHADE_KEYS.find((key) => key === t) ?? null,
    mode: params.get("m") === "apca" ? "apca" : "tailwind",
  };
}
