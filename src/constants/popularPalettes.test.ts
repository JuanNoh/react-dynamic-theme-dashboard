import chroma from "chroma-js";
import { describe, expect, it } from "vitest";
import { actionShade } from "@/lib/contrast";
import { generateLocalPalette } from "@/lib/localPalette";
import { POPULAR_PALETTES } from "./popularPalettes";
import { TAILWIND_FAMILIES } from "./tailwindFamilies";

const TAILWIND_HEXES = new Set(Object.values(TAILWIND_FAMILIES).flat());

describe("paletas populares", () => {
  it.each(POPULAR_PALETTES.map((item) => [item.name, item] as const))(
    "%s usa colores propios, no de Tailwind",
    (_name, item) => {
      expect(TAILWIND_HEXES.has(item.baseColor)).toBe(false);
      expect(TAILWIND_HEXES.has(item.secondaryColor)).toBe(false);
    },
  );

  it("son de intensidad media: nada chillón", () => {
    for (const item of POPULAR_PALETTES) {
      expect(chroma(item.baseColor).oklch()[1]).toBeLessThanOrEqual(0.16);
    }
  });

  it("no hay dos que se parezcan", () => {
    POPULAR_PALETTES.forEach((a, i) => {
      for (const b of POPULAR_PALETTES.slice(i + 1)) {
        const gap = chroma.deltaE(a.baseColor, b.baseColor);
        expect(gap, `${a.name} y ${b.name}`).toBeGreaterThanOrEqual(12);
      }
    });
  });

  it("todas dan un botón legible con texto blanco", () => {
    for (const item of POPULAR_PALETTES) {
      const palette = generateLocalPalette(item.baseColor);
      const button = palette[actionShade(palette)];
      expect(chroma.contrast("#ffffff", button)).toBeGreaterThanOrEqual(4.5);
    }
  });

  it("los ids no se repiten", () => {
    const ids = POPULAR_PALETTES.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
