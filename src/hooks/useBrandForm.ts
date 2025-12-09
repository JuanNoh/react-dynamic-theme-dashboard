import { useState, type FormEvent } from "react";
import { usePalette } from "@/context/usePalette";
import { fetchPaletteFromKeywords } from "@/lib/aiPalette";

export function useBrandForm() {
  const {
    setBaseColor,
    setPalette,
    setAiInsight,
    setLandingCopy,
    addToHistory,
    setSecondaryPalette,
  } = usePalette();
  const [keywords, setKeywords] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();

    const trimmed = keywords.trim();
    if (!trimmed || loading) return;

    try {
      setLoading(true);
      setError(null);

      const data = await fetchPaletteFromKeywords(trimmed);
      if (!data || !data.palette)
        throw new Error("Formato de respuesta inválido");

      const base = data.palette["500"];
      if (!base) {
        setError("La respuesta del backend no contiene el tono 500.");
        return;
      }

      setBaseColor(base);
      setPalette(data.palette);
      if (data.secondaryPalette) setSecondaryPalette(data.secondaryPalette);
      setAiInsight(data.insight || null);
      setLandingCopy(data.landingCopy || null);

      addToHistory({
        baseColor: data.palette["500"],
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
  };
}
