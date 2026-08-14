// Compartir paletas por URL: ?p=<base>&s=<secundario>&n=<nombre>
// Los hex van sin # para que el link quede limpio

const HEX_RE = /^[0-9a-fA-F]{6}$/;

export interface SharedPalette {
  baseColor: string;
  secondaryColor: string | null;
  name: string | null;
}

export function buildShareUrl(
  baseColor: string,
  secondaryColor?: string | null,
  name?: string | null,
): string {
  const params = new URLSearchParams();
  params.set("p", baseColor.replace("#", ""));
  if (secondaryColor) params.set("s", secondaryColor.replace("#", ""));

  const cleanName = name?.trim();
  if (cleanName && cleanName !== "My Brand") {
    params.set("n", cleanName.slice(0, 40));
  }

  return `${window.location.origin}/?${params.toString()}`;
}

export function parseShareParams(search: string): SharedPalette | null {
  const params = new URLSearchParams(search);
  const p = params.get("p");
  if (!p || !HEX_RE.test(p)) return null;

  const s = params.get("s");
  return {
    baseColor: `#${p.toLowerCase()}`,
    secondaryColor: s && HEX_RE.test(s) ? `#${s.toLowerCase()}` : null,
    name: params.get("n"),
  };
}
