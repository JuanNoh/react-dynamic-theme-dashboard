import { useState, type FormEvent } from "react";
import chroma from "chroma-js";
import { usePalette } from "@/context/usePalette";
import { fetchPaletteFromKeywords } from "@/lib/aiPalette";
import { findBaseColor, generateLocalScale } from "@/lib/localPalette";

// "#672d3c", "672d3c" o "#f0a" → hex normalizado; cualquier otra cosa es una
// descripción de marca para la IA
const HEX_RE = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

function parseHex(text: string): string | null {
  const match = text.trim().match(HEX_RE);
  return match ? chroma(`#${match[1]}`).hex() : null;
}

export function useBrandForm() {
  const {
    baseColor,
    setBaseColor,
    setAiInsight,
    setLandingCopy,
    addToHistory,
    setSecondaryPalette,
  } = usePalette();
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Color escogido a mano (picker o hex pegado): la escala sale al instante del
  // motor local, sin llamarle a la IA. Marca, secundario y landing se respetan.
  const pickColor = (color: string) => {
    const hex = chroma(color).hex(); // el input del picker acepta "#abc"
    const { family } = generateLocalScale(hex);
    setError(null);
    setBaseColor(hex); // el provider regenera la escala
    setAiInsight({
      name: hex.toUpperCase(),
      description: `Escala armada al instante con tu color sobre el molde «${family}» de Tailwind.`,
      sentiment: "Manual, Instantánea, Editable",
      usageTip:
        "Si quieres nombre, color secundario y textos de landing para este color, describe tu marca y la IA arma el resto.",
    });
  };

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    const trimmed = keywords.trim();
    if (!trimmed || loading) return;

    const typedHex = parseHex(trimmed);
    if (typedHex) {
      pickColor(typedHex);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const data = await fetchPaletteFromKeywords(trimmed);
      if (!data || !data.palette)
        throw new Error("Formato de respuesta inválido");

      if (!data.palette["500"]) {
        setError("La respuesta del backend no contiene el tono 500.");
        return;
      }

      // El base de la IA no siempre cae en el 500 (un vino oscuro queda en el
      // 900); lo sacamos de la escala para que historial y links la reproduzcan
      const base = findBaseColor(data.palette);

      setBaseColor(base); // la escala sale del motor local con los ajustes vigentes
      if (data.secondaryPalette) setSecondaryPalette(data.secondaryPalette);
      setAiInsight(data.insight || null);
      setLandingCopy(data.landingCopy || null);

      addToHistory({
        baseColor: base,
        palette: data.palette,
        secondaryPalette: data.secondaryPalette,
        keywords: trimmed,
        insight: data.insight,
        landingCopy: data.landingCopy,
      });
    } catch (err) {
      console.error(err);
      setError("No se pudo generar la paleta. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  };

  return {
    keywords,
    setKeywords,
    loading,
    error,
    setError,
    handleSubmit,
    hasKeywords: keywords.trim().length > 0,
    isHexTyped: parseHex(keywords) !== null,
    baseColor,
    pickColor,
  };
}
