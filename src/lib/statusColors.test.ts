import chroma from "chroma-js";
import { describe, expect, it } from "vitest";
import { actionShade } from "./contrast";
import {
  neutralColor,
  STATUS_KINDS,
  statusColor,
  statusScales,
} from "./statusColors";

const BRANDS = [
  "#b4532f",
  "#672d3c",
  "#0f8b8d",
  "#4a55a2",
  "#f5e91d",
  "#808080",
];

const hueGap = (a: number, b: number) => {
  const gap = Math.abs(a - b) % 360;
  return gap > 180 ? 360 - gap : gap;
};

describe("colores de estado", () => {
  it.each(BRANDS)("con %s cada estado conserva su significado", (brand) => {
    for (const kind of STATUS_KINDS) {
      const [, , hue] = chroma(statusColor(kind, brand)).oklch();
      expect(hueGap(hue, kind.hue)).toBeLessThanOrEqual(13);
    }
  });

  it("se acercan un poco a la marca para combinar", () => {
    const error = STATUS_KINDS.find((kind) => kind.id === "error")!;
    const warm = statusColor(error, "#b4532f");
    const cool = statusColor(error, "#4a55a2");
    expect(warm).not.toBe(cool);
  });

  it("no son chillones aunque la marca lo sea", () => {
    for (const kind of STATUS_KINDS) {
      const intensity = chroma(statusColor(kind, "#ff0055")).oklch()[1];
      expect(intensity).toBeLessThanOrEqual(0.165);
    }
  });

  it("el mismo color da siempre lo mismo", () => {
    expect(statusScales("#0f8b8d")).toEqual(statusScales("#0f8b8d"));
  });

  it.each(BRANDS)("con %s los mensajes y botones llegan a AA", (brand) => {
    for (const { palette } of statusScales(brand)) {
      expect(
        chroma.contrast(palette["900"], palette["100"]),
      ).toBeGreaterThanOrEqual(4.5);
      const shade = actionShade(palette);
      expect(chroma.contrast("#ffffff", palette[shade])).toBeGreaterThanOrEqual(
        4.5,
      );
    }
  });

  it("el neutro lleva un toque de la marca, sin dejar de ser gris", () => {
    const [, intensity] = chroma(neutralColor("#b4532f")).oklch();
    expect(intensity).toBeGreaterThan(0.005);
    expect(intensity).toBeLessThan(0.03);
    expect(neutralColor("#808080")).toMatch(/^#[0-9a-f]{6}$/);
  });
});
