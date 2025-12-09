export type ShadeKey =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";

export type Palette = Record<ShadeKey, string>;
export const SHADE_KEYS: ShadeKey[] = [
  "50",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
  "950",
];

export type AIInsight = {
  name: string;
  description: string;
  sentiment: string;
  usageTip: string;
};

export interface LandingFeature {
  title: string;
  description: string;
}

export interface LandingCopy {
  eyebrow: string;
  title: string;
  subtitle: string;
  primaryCta: string;
  secondaryCta: string;
  features: LandingFeature[];
}

export type APIResponse = {
  palette: Palette;
  secondaryPalette?: Palette;
  insight?: AIInsight;
  landingCopy?: LandingCopy;
};

export type HistoryItem = {
  id: string;
  baseColor: string;
  palette: Palette;
  secondaryPalette?: Palette;
  timestamp: number;
  keywords?: string;
  insight?: AIInsight;
  landingCopy?: LandingCopy;
};
