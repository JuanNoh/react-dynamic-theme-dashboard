import { type Palette, SHADE_KEYS } from "@/types/palette";

export function applyPalettesToRoot(
  primary: Palette,
  secondary: Palette | null = null,
) {
  const root = document.documentElement;

  SHADE_KEYS.forEach((key) => {
    root.style.setProperty(`--color-primary-${key}`, primary[key]);
  });

  if (secondary) {
    SHADE_KEYS.forEach((key) => {
      root.style.setProperty(`--color-secondary-${key}`, secondary[key]);
    });
  }
}
