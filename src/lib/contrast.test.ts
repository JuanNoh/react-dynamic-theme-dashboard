import { describe, expect, it } from "vitest";
import chroma from "chroma-js";
import { SHADE_KEYS } from "@/types/palette";
import { generateLocalPalette } from "./localPalette";
import {
  actionShade,
  apcaLevel,
  baseContrastAdvice,
  formatRatio,
  getTintedText,
  measureContrast,
  wcagLevel,
} from "./contrast";

describe("WCAG", () => {
  it("negro sobre blanco es el máximo, 21:1", () => {
    expect(measureContrast("#000000", "#ffffff").ratio).toBeCloseTo(21, 1);
  });

  it("#767676 sobre blanco es el gris más claro que pasa AA", () => {
    const { ratio, wcag } = measureContrast("#767676", "#ffffff");
    expect(ratio).toBeGreaterThanOrEqual(4.5);
    expect(wcag).toBe("AA");
  });

  it("respeta los cortes de cada nivel", () => {
    expect(wcagLevel(7)).toBe("AAA");
    expect(wcagLevel(6.99)).toBe("AA");
    expect(wcagLevel(4.5)).toBe("AA");
    expect(wcagLevel(4.49)).toBe("Grande");
    expect(wcagLevel(3)).toBe("Grande");
    expect(wcagLevel(2.99)).toBeNull();
  });

  it("redondea hacia abajo para no aprobar de más", () => {
    expect(formatRatio(4.46)).toBe("4.4");
    expect(formatRatio(4.5)).toBe("4.5");
    expect(formatRatio(21)).toBe("21.0");
  });
});

describe("APCA", () => {
  it("respeta los cortes de cada nivel", () => {
    expect(apcaLevel(75)).toBe("Cuerpo");
    expect(apcaLevel(74.9)).toBe("Contenido");
    expect(apcaLevel(60)).toBe("Contenido");
    expect(apcaLevel(45)).toBe("Grande");
    expect(apcaLevel(44.9)).toBeNull();
  });

  it("distingue quién es el texto y quién el fondo", () => {
    const blancoSobreAzul = measureContrast("#ffffff", "#2563eb");
    const azulSobreBlanco = measureContrast("#2563eb", "#ffffff");
    expect(blancoSobreAzul.lc).not.toBe(azulSobreBlanco.lc);
    expect(blancoSobreAzul.ratio).toBeCloseTo(azulSobreBlanco.ratio, 5);
  });
});

describe("texto de cada tono", () => {
  // Con la regla anterior estas paletas quedaban abajo de AA del 400 al 600
  it.each(["#672d3c", "#0f8b8d", "#b4532f", "#3f6b4f", "#4a55a2", "#f5e91d"])(
    "%s llega a AA en todos los tonos",
    (hex) => {
      const palette = generateLocalPalette(hex);
      for (const key of SHADE_KEYS) {
        const { ratio } = getTintedText(palette[key], palette);
        expect(ratio).toBeGreaterThanOrEqual(4.5);
      }
    },
  );
});

describe("botones", () => {
  it("el tono de acción siempre llega a AA con texto blanco", () => {
    for (const hex of ["#0f8b8d", "#f5e91d", "#3b82f6", "#ffffff"]) {
      const palette = generateLocalPalette(hex);
      const shade = actionShade(palette);
      expect(chroma.contrast("#ffffff", palette[shade])).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });

  it("avisa cuando el color sólo sirve para texto grande", () => {
    const palette = generateLocalPalette("#0f8b8d");
    const advice = baseContrastAdvice(palette, "#0f8b8d");
    expect(advice).toContain("4.1:1");
    expect(advice).toContain("sólo alcanza para texto grande");
    expect(advice).toContain("usa el 700");
  });

  it("no da consejo de sobra cuando ya pasa", () => {
    const palette = generateLocalPalette("#3f6b4f");
    expect(baseContrastAdvice(palette, "#3f6b4f")).toContain("pasa AA");
  });
});
