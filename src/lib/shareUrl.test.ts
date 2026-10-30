import { describe, expect, it } from "vitest";
import { buildShareUrl, parseShareParams } from "./shareUrl";

describe("link compartido", () => {
  it("lleva el tono fijado de ida y vuelta", () => {
    const url = buildShareUrl("#672d3c", null, null, {
      shade: "500",
      mode: "tailwind",
    });
    const shared = parseShareParams(new URL(url).search);
    expect(shared).toMatchObject({
      baseColor: "#672d3c",
      shade: "500",
      mode: "tailwind",
    });
  });

  it("en modo APCA no manda tono fijado", () => {
    const url = buildShareUrl("#672d3c", null, null, {
      shade: "500",
      mode: "apca",
    });
    const shared = parseShareParams(new URL(url).search);
    expect(shared).toMatchObject({ shade: null, mode: "apca" });
  });

  it("sin ajustes el link queda limpio y tolera valores raros", () => {
    expect(buildShareUrl("#672d3c")).not.toMatch(/[?&][tm]=/);
    expect(parseShareParams("?p=672d3c&t=123&m=x")).toMatchObject({
      shade: null,
      mode: "tailwind",
    });
  });
});
