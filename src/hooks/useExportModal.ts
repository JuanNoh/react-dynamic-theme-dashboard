import { useState } from "react";
import { toast } from "sonner";
import { usePalette } from "@/context/usePalette";
import { statusScales } from "@/lib/statusColors";
import type { Palette } from "@/types/palette";
import chroma from "chroma-js";

type Tab = "css" | "tailwind-v3" | "tailwind-v4" | "json";
export type ColorFormat = "hex" | "oklch" | "hsl" | "rgb";

interface ExtraScale {
  id: string;
  label: string;
  palette: Palette;
}

export function useExportModal(initialTab: Tab = "tailwind-v4") {
  const { palette, secondaryPalette, baseColor, includeStatus } = usePalette();

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [format, setFormat] = useState<ColorFormat>("hex");
  const [copied, setCopied] = useState(false);

  // Todo lo que acompaña al primario, en el orden en que se exporta
  const extraScales: ExtraScale[] = [
    ...(secondaryPalette
      ? [
          {
            id: "secondary",
            label: "Secondary Palette",
            palette: secondaryPalette,
          },
        ]
      : []),
    ...(includeStatus ? statusScales(baseColor) : []),
  ];

  const formatColor = (color: string) => {
    switch (format) {
      case "oklch": {
        const [l, c, h] = chroma(color).oklch();
        return `oklch(${l.toFixed(3)} ${c.toFixed(3)} ${isNaN(h) ? 0 : h.toFixed(3)})`;
      }
      case "hsl": {
        const [h2, s, l2] = chroma(color).hsl();
        return `hsl(${isNaN(h2) ? 0 : h2.toFixed(1)} ${(s * 100).toFixed(1)}% ${(l2 * 100).toFixed(1)}%)`;
      }
      case "rgb": {
        const [r, g, b] = chroma(color).rgb();
        return `rgb(${r} ${g} ${b})`;
      }
      default:
        return color;
    }
  };

  const cssVariables = (id: string, scale: Palette) =>
    Object.entries(scale)
      .map(([key, value]) => `  --color-${id}-${key}: ${formatColor(value)};`)
      .join("\n");

  const configEntries = (scale: Palette) =>
    Object.entries(scale)
      .map(([key, value]) => `          ${key}: '${formatColor(value)}',`)
      .join("\n");

  const getCssContent = () => {
    const extras = extraScales
      .map(
        (scale) =>
          `\n\n  /* ${scale.label} */\n${cssVariables(scale.id, scale.palette)}`,
      )
      .join("");

    return `:root {
  /* Color Base: ${baseColor} */
${cssVariables("primary", palette)}${extras}
}`;
  };

  const getTailwindV3Content = () => {
    const extras = extraScales
      .map(
        (scale) => `
        ${scale.id}: {
${configEntries(scale.palette)}
        },`,
      )
      .join("");

    return `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
${configEntries(palette)}
        },${extras}
      },
    },
  },
};`;
  };

  const getTailwindV4Content = () => {
    const extras = extraScales
      .map((scale) => `\n\n${cssVariables(scale.id, scale.palette)}`)
      .join("");

    return `@theme {
${cssVariables("primary", palette)}${extras}
}`;
  };

  const getJsonContent = () => {
    const formatScale = (scale: Palette) =>
      Object.fromEntries(
        Object.entries(scale).map(([key, value]) => [key, formatColor(value)]),
      );

    return JSON.stringify(
      {
        primary: formatScale(palette),
        ...Object.fromEntries(
          extraScales.map((scale) => [scale.id, formatScale(scale.palette)]),
        ),
      },
      null,
      2,
    );
  };

  const getContent = () => {
    switch (activeTab) {
      case "css":
        return getCssContent();
      case "tailwind-v3":
        return getTailwindV3Content();
      case "tailwind-v4":
        return getTailwindV4Content();
      case "json":
        return getJsonContent();
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getContent());
      setCopied(true);
      toast.success("¡Código copiado!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("No se pudo copiar el código, inténtalo de nuevo.");
    }
  };

  return {
    activeTab,
    setActiveTab,
    format,
    setFormat,
    copied,
    getContent,
    copyToClipboard,
  };
}
