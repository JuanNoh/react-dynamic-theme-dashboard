import { motion } from "motion/react";
import { AlertCircle, ArrowRight, Loader2 } from "lucide-react";
import ColorPicker from "@/components/palette/ColorPicker";
import { usePalette } from "@/context/usePalette";
import { useBrandForm } from "@/hooks/useBrandForm";
import { actionShade } from "@/lib/contrast";

const TRY_COLORS = [
  { name: "Vino", hex: "#672d3c" },
  { name: "Turquesa", hex: "#0f8b8d" },
  { name: "Terracota", hex: "#b4532f" },
  { name: "Bosque", hex: "#3f6b4f" },
  { name: "Añil", hex: "#4a55a2" },
];

export default function BrandSearch() {
  const {
    keywords,
    setKeywords,
    loading,
    error,
    setError,
    handleSubmit,
    hasKeywords,
    isHexTyped,
    baseColor,
    pickColor,
  } = useBrandForm();
  const { palette } = usePalette();

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="vivo">
          <span className="vivo-borde" aria-hidden="true" />
          <div className="bg-raised relative flex items-center gap-2 rounded-full p-1.5">
            <ColorPicker
              value={baseColor}
              onChange={pickColor}
              disabled={loading}
            />
            <label htmlFor="marca" className="sr-only">
              Describe tu marca o pega un color
            </label>
            <input
              id="marca"
              type="text"
              value={keywords}
              onChange={(e) => {
                setKeywords(e.target.value);
                if (error) setError(null);
              }}
              placeholder="Vinoteca en Mérida, o un #hex"
              disabled={loading}
              className="text-ink placeholder:text-soft/70 h-11 min-w-0 flex-1 bg-transparent text-base focus:outline-none"
            />
            <motion.button
              type="submit"
              disabled={loading || !hasKeywords}
              whileTap={{ scale: 0.96 }}
              style={{ backgroundColor: palette[actionShade(palette)] }}
              className="flex h-11 shrink-0 cursor-pointer items-center gap-2 rounded-full px-4 text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgb(255_255_255/0.16)] transition-[background-color,opacity] duration-500 disabled:cursor-not-allowed disabled:opacity-75 sm:px-5"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <>
                  <span className="hidden sm:inline">
                    {isHexTyped ? "Usar color" : "Generar"}
                  </span>
                  <ArrowRight className="h-5 w-5 sm:hidden" strokeWidth={2.5} />
                  <span className="sr-only sm:hidden">Generar</span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </form>

      {error ? (
        <p
          role="alert"
          className="flex items-center gap-2 text-sm font-medium text-red-600 dark:text-red-300"
        >
          <AlertCircle className="h-4 w-4 shrink-0" />
          {error}
        </p>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          <span className="opcional text-soft mr-1 text-sm">Prueba con</span>
          {TRY_COLORS.map((color) => {
            const isActive = baseColor === color.hex;
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => pickColor(color.hex)}
                aria-pressed={isActive}
                aria-label={color.name}
                title={color.name}
                style={{ backgroundColor: color.hex }}
                className={`h-11 w-11 cursor-pointer rounded-full transition-shadow ${
                  isActive
                    ? "ring-ink ring-offset-ground ring-2 ring-offset-2"
                    : "ring-edge ring-1"
                }`}
              />
            );
          })}
        </div>
      )}
    </>
  );
}
