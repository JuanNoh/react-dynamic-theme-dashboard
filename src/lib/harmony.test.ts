import chroma from "chroma-js";
import { describe, expect, it } from "vitest";
import { HARMONIES, harmonyColors } from "./harmony";

const hueGap = (a: string, b: string) => {
  const gap = Math.abs(chroma(a).oklch()[2] - chroma(b).oklch()[2]) % 360;
  return gap > 180 ? 360 - gap : gap;
};

describe("armonías de color", () => {
  it("cada esquema da un color por giro", () => {
    for (const harmony of HARMONIES) {
      const colors = harmonyColors("#b4532f", harmony.offsets);
      expect(colors).toHaveLength(harmony.offsets.length);
      for (const color of colors) expect(color).toMatch(/^#[0-9a-f]{6}$/);
    }
  });

  it("el complementario queda del otro lado de la rueda", () => {
    const [opposite] = harmonyColors("#b4532f", [180]);
    expect(hueGap(opposite, "#b4532f")).toBeGreaterThan(170);
  });

  it("los análogos quedan cerca a los dos lados", () => {
    const [left, right] = harmonyColors("#0f8b8d", [-30, 30]);
    expect(hueGap(left, "#0f8b8d")).toBeLessThan(40);
    expect(hueGap(right, "#0f8b8d")).toBeLessThan(40);
    expect(left).not.toBe(right);
  });

  it("no usa azar: el mismo color da lo mismo", () => {
    expect(harmonyColors("#672d3c", [120, 240])).toEqual(
      harmonyColors("#672d3c", [120, 240]),
    );
  });

  it("conserva el brillo percibido del color", () => {
    const base = chroma("#3f6b4f").oklch()[0];
    for (const color of harmonyColors("#3f6b4f", [90, 180, 270])) {
      expect(Math.abs(chroma(color).oklch()[0] - base)).toBeLessThan(0.03);
    }
  });

  it.each(["#808080", "#ffffff", "#000000", "#f5e91d"])(
    "%s también da sugerencias con color",
    (hex) => {
      const colors = harmonyColors(hex, [90, 180, 270]);
      expect(new Set(colors).size).toBe(3);
      for (const color of colors) {
        expect(chroma(color).oklch()[1]).toBeGreaterThan(0.05);
      }
    },
  );
});
