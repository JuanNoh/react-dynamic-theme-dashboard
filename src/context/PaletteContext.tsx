import { createContext } from "react";
import type {
  Palette,
  AIInsight,
  LandingCopy,
  HistoryItem,
} from "@/types/palette";

export interface PaletteCtx {
  baseColor: string;
  palette: Palette;
  secondaryPalette: Palette | null;
  setBaseColor: (color: string) => void;
  setPalette: (palette: Palette) => void;
  setSecondaryPalette: (palette: Palette) => void;

  brandName: string;
  setBrandName: (name: string) => void;

  aiInsight: AIInsight | null;
  setAiInsight: (insight: AIInsight | null) => void;

  landingCopy: LandingCopy | null;
  setLandingCopy: (copy: LandingCopy | null) => void;

  history: HistoryItem[];
  addToHistory: (item: Omit<HistoryItem, "id" | "timestamp">) => void;
  clearHistory: () => void;
}

export const PaletteContext = createContext<PaletteCtx | null>(null);
