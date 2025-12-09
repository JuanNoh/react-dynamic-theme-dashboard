import chroma from "chroma-js";
import { APCAcontrast, sRGBtoY } from "apca-w3";

export function getContrastInfo(color: string) {
  const rgb = chroma(color).rgb();
  const Y_bg = sRGBtoY([rgb[0], rgb[1], rgb[2]]);
  const Y_white = sRGBtoY([255, 255, 255]);
  const Y_black = sRGBtoY([0, 0, 0]);

  const lcWhite = APCAcontrast(Y_white, Y_bg);
  const lcBlack = APCAcontrast(Y_black, Y_bg);
  const useWhite = Math.abs(Number(lcWhite)) > Math.abs(Number(lcBlack));
  const scoreAbs = Math.abs(Math.round(Number(useWhite ? lcWhite : lcBlack)));

  return {
    scoreAbs,
    useWhite,
  };
}
