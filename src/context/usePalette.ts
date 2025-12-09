import { use } from "react";
import { PaletteContext } from "@/context/PaletteContext";

export function usePalette() {
  const ctx = use(PaletteContext);
  if (!ctx) {
    throw new Error("usePalette debe usarse dentro de <PaletteProvider>");
  }
  return ctx;
}
