import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { generatePalette } from '@/lib/generatePalette';
import { applyPrimaryPaletteToRoot } from '@/lib/themeVars';
import { PaletteContext, type PaletteCtx } from '@/context/PaletteContext';

type Props = {
  initialColor?: string;
  children: ReactNode;
};

export function PaletteProvider({ initialColor = '#4f46e5', children }: Props) {
  const [baseColor, setBaseColor] = useState(initialColor);
  const palette = useMemo(() => generatePalette(baseColor), [baseColor]);

  useEffect(() => {
    applyPrimaryPaletteToRoot(palette);
  }, [palette]);

  const value = useMemo<PaletteCtx>(
    () => ({ baseColor, palette, setBaseColor }),
    [baseColor, palette]
  );

  return <PaletteContext.Provider value={value}>{children}</PaletteContext.Provider>;
}
