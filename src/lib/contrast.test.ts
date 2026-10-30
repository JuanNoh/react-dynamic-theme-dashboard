import { describe, expect, it } from "vitest";
import { apcaLevel, formatRatio, measureContrast, wcagLevel } from "./contrast";

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
