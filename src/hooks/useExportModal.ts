import { useState } from "react";
import { usePalette } from "@/context/usePalette";
import type { ToastType } from "@/components/ui/Toast";
import chroma from "chroma-js";

type Tab = "css" | "tailwind-v3" | "tailwind-v4" | "json";
type ColorFormat = "hex" | "oklch" | "hsl" | "rgb";

export function useExportModal(initialTab: Tab = "tailwind-v4") {
  const { palette, secondaryPalette, baseColor } = usePalette();

  const [activeTab, setActiveTab] = useState<Tab>(initialTab);
  const [format, setFormat] = useState<ColorFormat>("hex");
  const [copied, setCopied] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

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

  const getCssContent = () => {
    let css = `:root {
  /* Color Base: ${baseColor} */
${Object.entries(palette)
  .map(([key, value]) => `  --color-primary-${key}: ${formatColor(value)};`)
  .join("\n")}`;

    if (secondaryPalette) {
      css += `\n\n  /* Secondary Palette */
${Object.entries(secondaryPalette)
  .map(([key, value]) => `  --color-secondary-${key}: ${formatColor(value)};`)
  .join("\n")}`;
    }

    css += "\n}";
    return css;
  };

  const getTailwindV3Content = () => {
    let content = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: {
${Object.entries(palette)
  .map(([key, value]) => `          ${key}: '${formatColor(value)}',`)
  .join("\n")}
        },`;

    if (secondaryPalette) {
      content += `
        secondary: {
${Object.entries(secondaryPalette)
  .map(([key, value]) => `          ${key}: '${formatColor(value)}',`)
  .join("\n")}
        },`;
    }

    content += `
      },
    },
  },
};`;
    return content;
  };

  const getTailwindV4Content = () => {
    let content = `@theme {
${Object.entries(palette)
  .map(([key, value]) => `  --color-primary-${key}: ${formatColor(value)};`)
  .join("\n")}`;

    if (secondaryPalette) {
      content += `\n
${Object.entries(secondaryPalette)
  .map(([key, value]) => `  --color-secondary-${key}: ${formatColor(value)};`)
  .join("\n")}`;
    }

    content += "\n}";
    return content;
  };

  const getJsonContent = () => {
    const formattedPalette = Object.entries(palette).reduce(
      (acc, [key, value]) => {
        acc[key] = formatColor(value);
        return acc;
      },
      {} as Record<string, string>,
    );

    const result: {
      primary: Record<string, string>;
      secondary?: Record<string, string>;
    } = {
      primary: formattedPalette,
    };

    if (secondaryPalette) {
      const formattedSecondary = Object.entries(secondaryPalette).reduce(
        (acc, [key, value]) => {
          acc[key] = formatColor(value);
          return acc;
        },
        {} as Record<string, string>,
      );
      result.secondary = formattedSecondary;
    }

    return JSON.stringify(result, null, 2);
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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getContent());
    setCopied(true);
    setToast({ message: "¡Código copiado!", type: "success" });
    setTimeout(() => setCopied(false), 2000);
  };

  return {
    activeTab,
    setActiveTab,
    format,
    setFormat,
    toast,
    setToast,
    copied,
    getContent,
    copyToClipboard,
  };
}
