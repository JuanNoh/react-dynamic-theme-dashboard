declare module "apca-w3" {
  export function APCAcontrast(txtY: number, bgY: number): number | string;
  export function sRGBtoY(rgb: [number, number, number]): number;
  export function alphaBlend(
    fg: [number, number, number, number],
    bg: [number, number, number],
    alpha?: number,
  ): [number, number, number];
}
