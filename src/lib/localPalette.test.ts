import { describe, expect, it } from "vitest";
import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "apca-w3";
import { SHADE_KEYS } from "@/types/palette";
import { findBaseColor, generateLocalScale } from "./localPalette";

// Escalas sacadas de uicolors.app/generate/<hex> el 29-oct-2026: el motor tiene
// que dar exactamente lo mismo tono por tono (50 → 950)
const UICOLORS: Record<string, { shade: string; scale: string }> = {
  "672d3c": {
    shade: "900",
    scale:
      "fbf4f7 f7ecf1 f1d9e3 e7bacc d88eaa c96b8c b44e6d 9a3c56 803448 672d3c 401721",
  },
  "3b82f6": {
    shade: "500",
    scale:
      "eff6ff dbeafe bfdbfe 93c5fd 60a5fa 3b82f6 2563eb 1d4ed8 1e40af 1e3a8a 172554",
  },
  ff6b00: {
    shade: "600",
    scale:
      "fff8ec fff0d3 ffdca5 ffc36d ff9e32 ff810a ff6b00 cc4c02 a13c0b 82330c 461704",
  },
  "10b981": {
    shade: "500",
    scale:
      "ecfdf5 d1fae5 a7f3d0 6ee7b7 34d399 10b981 059669 047857 065f46 064e3b 022c22",
  },
  "7c3aed": {
    shade: "600",
    scale:
      "f5f3ff ede9fe ddd6fe c4b5fd a78bfa 8b5cf6 7c3aed 6d28d9 5b21b6 4c1d95 2e1065",
  },
  "64748b": {
    shade: "500",
    scale:
      "f6f7f9 eceef2 d5dae2 b1bac8 8695aa 64748b 526077 434e61 3a4352 343a46 23272e",
  },
  "1e293b": {
    shade: "950",
    scale:
      "f4f7fb e9eef5 cedae9 a3bad6 7196bf 4f79a8 3d608c 324d72 2c4260 293951 1e293b",
  },
  fde68a: {
    shade: "200",
    scale:
      "fffbeb fef3c7 fde68a fcd34d fbbf24 f59e0b d97706 b45309 92400e 78350f 451a03",
  },
  "808080": {
    shade: "500",
    scale:
      "fafafa f5f5f5 e6e6e6 d3d3d3 a3a3a3 808080 535353 404040 272727 1a1a1a 0b0b0b",
  },
  "0e7490": {
    shade: "700",
    scale:
      "ecfeff cffafe a5f3fc 67e8f9 22d3ee 06b6d4 0891b2 0e7490 155e75 164e63 083344",
  },
  c2185b: {
    shade: "700",
    scale:
      "fdf2f8 fce7f3 fbcfe7 f9a8d2 f472b3 ec4895 db2773 c2185b 9d174a 831841 500722",
  },
  "5b4636": {
    shade: "800",
    scale:
      "f6f5f0 eae7d7 d6ceb2 bfb085 ac9663 9d8455 866c48 6c543c 5b4636 503e33 2d211b",
  },
};

describe("generateLocalScale", () => {
  it.each(Object.entries(UICOLORS))(
    "#%s cuadra con uicolors",
    (hex, expected) => {
      const { palette, baseShade } = generateLocalScale(`#${hex}`);
      expect(SHADE_KEYS.map((key) => palette[key].slice(1)).join(" ")).toBe(
        expected.scale,
      );
      expect(baseShade).toBe(expected.shade);
    },
  );

  it("deja el color base intacto en su tono", () => {
    const { palette, baseShade } = generateLocalScale("#672D3C");
    expect(palette[baseShade]).toBe("#672d3c");
  });

  it("aguanta blanco y negro puros sin NaN", () => {
    for (const hex of ["#ffffff", "#000000"]) {
      const { palette } = generateLocalScale(hex);
      for (const key of SHADE_KEYS)
        expect(palette[key]).toMatch(/^#[0-9a-f]{6}$/);
    }
  });
});

describe("findBaseColor", () => {
  it.each(["#0f8b8d", "#ff6b00", "#672d3c", "#b5651d", "#3b82f6"])(
    "recupera %s aunque no esté en el 500",
    (hex) => {
      expect(findBaseColor(generateLocalScale(hex).palette)).toBe(hex);
    },
  );

  it("si la escala no es del motor, regresa el 500", () => {
    const palette = generateLocalScale("#0f8b8d").palette;
    const tweaked = { ...palette, "300": "#123456" };
    expect(findBaseColor(tweaked)).toBe(tweaked["500"]);
  });
});

// La escala siempre tiene que ir de más a menos brillo, sin brincos
const luminances = (palette: Record<string, string>) =>
  SHADE_KEYS.map((k) => chroma(palette[k]).luminance());
const isDescending = (values: number[]) =>
  values.every((v, i) => i === 0 || v < values[i - 1]);

const lcOn = (text: "black" | "white", hex: string) => {
  const textY = sRGBtoY(text === "black" ? [0, 0, 0] : [255, 255, 255]);
  return Math.abs(Number(APCAcontrast(textY, sRGBtoY(chroma(hex).rgb()))));
};

describe("fijar el color en un tono", () => {
  it.each([
    ["#672d3c", "500"],
    ["#0f8b8d", "500"],
    ["#fde68a", "400"],
    ["#1e293b", "700"],
  ] as const)("%s queda intacto en el %s", (hex, shade) => {
    const { palette, baseShade } = generateLocalScale(hex, { shade });
    expect(baseShade).toBe(shade);
    expect(palette[shade]).toBe(hex);
    expect(isDescending(luminances(palette))).toBe(true);
  });

  it("fijarlo donde cae solo da la misma escala de siempre", () => {
    const natural = generateLocalScale("#0f8b8d");
    const pinned = generateLocalScale("#0f8b8d", { shade: natural.baseShade });
    expect(pinned.palette).toEqual(natural.palette);
  });
});

describe("modo APCA", () => {
  const TARGETS: Record<string, ["black" | "white", number]> = {
    "50": ["black", 102],
    "100": ["black", 97],
    "200": ["black", 88],
    "300": ["black", 77],
    "400": ["black", 61],
    "500": ["white", 63],
    "600": ["white", 76],
    "700": ["white", 86],
    "800": ["white", 94],
    "900": ["white", 98],
    "950": ["white", 105],
  };

  it.each(["#0f8b8d", "#672d3c", "#ff6b00", "#808080"])(
    "%s: cada tono llega a su contraste y la marca no se toca",
    (hex) => {
      const { palette, baseShade } = generateLocalScale(hex, { mode: "apca" });
      expect(palette[baseShade]).toBe(hex);
      for (const key of SHADE_KEYS) {
        if (key === baseShade) continue;
        const [text, lc] = TARGETS[key];
        expect(Math.abs(lcOn(text, palette[key]) - lc)).toBeLessThan(1.5);
      }
      expect(isDescending(luminances(palette))).toBe(true);
    },
  );
});
