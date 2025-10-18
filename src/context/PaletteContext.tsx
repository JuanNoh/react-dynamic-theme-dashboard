import { createContext } from 'react';
import type { Palette } from '@/types/palette';

export type PaletteCtx = {
  baseColor: string;
  palette: Palette;
  setBaseColor: (hex: string) => void;
};

export const PaletteContext = createContext<PaletteCtx | null>(null);
