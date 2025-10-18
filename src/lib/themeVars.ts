import { type Palette } from '@/types/palette';

export function applyPrimaryPaletteToRoot(palette: Palette) {
  const root = document.documentElement;
  for (const [k, color] of Object.entries(palette)) {
    root.style.setProperty(`--color-primary-${k}`, color);
  }
}

export function toThemeBlock(palette: Palette): string {
  const lines = Object.entries(palette)
    .map(([k, color]) => `  --color-primary-${k}: ${color};`)
    .join('\n');
  return `@theme {\n${lines}\n}`;
}
