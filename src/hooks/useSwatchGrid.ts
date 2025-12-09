import { useState } from "react";
import { usePalette } from "@/context/usePalette";
import { type Palette } from "@/types/palette";

interface UseSwatchGridProps {
  palette?: Palette;
}

export function useSwatchGrid({ palette: propPalette }: UseSwatchGridProps) {
  const { palette: contextPalette } = usePalette();
  const palette = propPalette || contextPalette;
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (color: string, key: string) => {
    navigator.clipboard.writeText(color);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1500);
  };

  return {
    palette,
    copiedKey,
    handleCopy,
  };
}
