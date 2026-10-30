import { SHADE_KEYS, type ShadeKey } from "@/types/palette";
import type { ScaleMode, ScaleOptions, ShadeEdits } from "@/lib/localPalette";

// Compartir paletas por URL: ?p=<base>&s=<secundario>&n=<nombre>&t=<tono>&m=apca&e=<ediciones>
// Los hex van sin # para que el link quede limpio. t y m sólo aparecen si se
// cambiaron, para que quien abra el link vea exactamente la misma escala. Las
// ediciones van como tono.hex separados por guion bajo: e=300.e5b38c_400.da8c5d

const HEX_RE = /^[0-9a-fA-F]{6}$/;

export interface SharedPalette {
  baseColor: string;
  secondaryColor: string | null;
  name: string | null;
  shade: ShadeKey | null;
  mode: ScaleMode;
  edits: ShadeEdits;
}

function parseEdits(value: string | null): ShadeEdits {
  const edits: ShadeEdits = {};
  for (const entry of value?.split("_") ?? []) {
    const [shade, hex] = entry.split(".");
    const key = SHADE_KEYS.find((item) => item === shade);
    if (key && hex && HEX_RE.test(hex)) edits[key] = `#${hex.toLowerCase()}`;
  }
  return edits;
}

export function buildShareUrl(
  baseColor: string,
  secondaryColor?: string | null,
  name?: string | null,
  options?: ScaleOptions & { edits?: ShadeEdits },
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

  const edits = Object.entries(options?.edits ?? {});
  if (edits.length > 0) {
    const value = edits.map(([key, hex]) => `${key}.${hex.slice(1)}`);
    params.set("e", value.join("_"));
  }

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
    edits: parseEdits(params.get("e")),
  };
}
