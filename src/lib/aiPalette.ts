import type { APIResponse } from "@/types/palette";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:4000";

export async function fetchPaletteFromKeywords(
  keywords: string,
): Promise<APIResponse> {
  const res = await fetch(`${API_URL}/api/palette/keywords`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ keywords }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || "Error en la API de paleta");
  }

  const json = await res.json();
  if (json.palette && json.palette.palette) {
    return json.palette as APIResponse;
  }
  return json as APIResponse;
}
