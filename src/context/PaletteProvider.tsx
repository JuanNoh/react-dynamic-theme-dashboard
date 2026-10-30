import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { DEFAULT_BASE_COLOR } from "@/constants/defaults";
import { applyPalettesToRoot } from "@/lib/themeVars";
import { generateLocalPalette, type ScaleOptions } from "@/lib/localPalette";
import { PaletteContext, type PaletteCtx } from "@/context/PaletteContext";
import {
  SHADE_KEYS,
  type AIInsight,
  type LandingCopy,
  type HistoryItem,
  type Palette,
} from "@/types/palette";

export function PaletteProvider({ children }: { children: ReactNode }) {
  const [baseColor, setBaseColor] = useState(DEFAULT_BASE_COLOR);
  const [scaleOptions, setScaleOptionsState] = useState<ScaleOptions>({
    shade: null,
    mode: "tailwind",
  });
  // Espejos para regenerar desde callbacks estables sin depender del render
  const baseColorRef = useRef(baseColor);
  const scaleOptionsRef = useRef(scaleOptions);
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

  const [palette, setPalette] = useState<Palette>(() =>
    generateLocalPalette(DEFAULT_BASE_COLOR),
  );

  useEffect(() => {
    applyPalettesToRoot(palette, secondaryPalette);
  }, [palette, secondaryPalette]);

  const updateBaseColor = useCallback((color: string) => {
    baseColorRef.current = color;
    setBaseColor(color);
    // La escala siempre sale del motor local con los ajustes vigentes (tono
    // fijado, modo APCA); sólo el historial la pisa con su foto guardada
    setPalette(generateLocalPalette(color, scaleOptionsRef.current));
  }, []);

  const setScaleOptions = useCallback((patch: ScaleOptions) => {
    const next = { ...scaleOptionsRef.current, ...patch };
    scaleOptionsRef.current = next;
    setScaleOptionsState(next);
    setPalette(generateLocalPalette(baseColorRef.current, next));
  }, []);

  const baseShade = useMemo(
    () =>
      SHADE_KEYS.find((k) => palette[k] === baseColor.toLowerCase()) ?? null,
    [palette, baseColor],
  );

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
      baseShade,
      scaleOptions,
      setScaleOptions,
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
      baseShade,
      scaleOptions,
      setScaleOptions,
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
