import {
  useEffect,
  useMemo,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { DEFAULT_PALETTE } from "@/constants/defaults";
import { applyPalettesToRoot } from "@/lib/themeVars";
import { PaletteContext, type PaletteCtx } from "@/context/PaletteContext";
import type {
  AIInsight,
  LandingCopy,
  HistoryItem,
  Palette,
} from "@/types/palette";

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [baseColor, setBaseColor] = useState(DEFAULT_PALETTE["500"]);
  const [secondaryPalette, setSecondaryPalette] = useState<Palette | null>(
    null,
  );
  const [brandName, setBrandName] = useState("My Brand");
  const [aiInsight, setAiInsight] = useState<AIInsight | null>(null);
  const [landingCopy, setLandingCopy] = useState<LandingCopy | null>(null);

  const [history, setHistory] = useState<HistoryItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const stored = localStorage.getItem("palette_history");
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error("Failed to load history", e);
      return [];
    }
  });

  const [palette, setPalette] = useState<Palette>(DEFAULT_PALETTE);

  useEffect(() => {
    applyPalettesToRoot(palette, secondaryPalette);
  }, [palette, secondaryPalette]);

  const updateBaseColor = useCallback((color: string) => {
    setBaseColor(color);
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem("palette_history", JSON.stringify(history));
    } catch (e) {
      console.error("Failed to save history", e);
    }
  }, [history]);

  const addToHistory = useCallback(
    (item: Omit<HistoryItem, "id" | "timestamp">) => {
      setHistory((prev) => {
        if (prev.some((h) => h?.baseColor === item.baseColor)) return prev;

        const newItem: HistoryItem = {
          ...item,
          id: crypto.randomUUID(),
          timestamp: Date.now(),
        };
        return [newItem, ...prev].slice(0, 50);
      });
    },
    [],
  );

  const clearHistory = useCallback(() => {
    setHistory([]);
    localStorage.removeItem("palette_history");
  }, []);

  const value = useMemo<PaletteCtx>(
    () => ({
      baseColor,
      palette,
      secondaryPalette,
      setBaseColor: updateBaseColor,
      setPalette,
      setSecondaryPalette,
      brandName,
      setBrandName,
      aiInsight,
      setAiInsight,
      landingCopy,
      setLandingCopy,
      history,
      addToHistory,
      clearHistory,
    }),
    [
      baseColor,
      palette,
      secondaryPalette,
      updateBaseColor,
      brandName,
      aiInsight,
      landingCopy,
      history,
      addToHistory,
      clearHistory,
    ],
  );

  return (
    <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>
  );
}
