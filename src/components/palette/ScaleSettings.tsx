import { motion } from "motion/react";
import { Pencil, X } from "lucide-react";
import { usePalette } from "@/context/usePalette";
import type { ScaleMode } from "@/lib/localPalette";

const MODES: { value: ScaleMode; label: string; hint: string }[] = [
  {
    value: "tailwind",
    label: "Tailwind",
    hint: "Pasa el mouse por un tono y toca el pin para fijar tu color ahí.",
  },
  {
    value: "apca",
    label: "APCA",
    hint: "Cada tono llega a un contraste exacto; el lugar de tu color lo decide su contraste.",
  },
];

interface ScaleSettingsProps {
  editing: boolean;
  onToggleEditing: () => void;
}

// Cómo se arma la escala primaria: curva de Tailwind (con tono fijable) o
// contraste APCA, que son excluyentes, más los retoques a mano
export default function ScaleSettings({
  editing,
  onToggleEditing,
}: ScaleSettingsProps) {
  const { scaleOptions, setScaleOptions, shadeEdits, setShadeEdits } =
    usePalette();
  const editedCount = Object.keys(shadeEdits).length;
  const mode = scaleOptions.mode ?? "tailwind";
  const pinnedShade = mode === "tailwind" ? scaleOptions.shade : null;

  return (
    <div className="mb-5 flex flex-wrap items-center gap-x-3 gap-y-2">
      <div
        role="radiogroup"
        aria-label="Modo de la escala"
        className="flex rounded-lg bg-slate-100 p-0.5 dark:bg-slate-800"
      >
        {MODES.map((item) => (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={mode === item.value}
            onClick={() => setScaleOptions({ mode: item.value })}
            className={`relative cursor-pointer rounded-md px-3 py-1 text-xs font-semibold transition-colors ${
              mode === item.value
                ? "text-slate-900 dark:text-white"
                : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            {mode === item.value && (
              <motion.span
                layoutId="scale-mode-pill"
                className="absolute inset-0 rounded-md bg-white shadow-sm dark:bg-slate-600"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <span className="relative">{item.label}</span>
          </button>
        ))}
      </div>

      {pinnedShade && (
        <button
          type="button"
          onClick={() => setScaleOptions({ shade: null })}
          aria-label={`Quitar el color fijado en el ${pinnedShade}`}
          className="flex cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
        >
          Fijado en {pinnedShade}
          <X className="h-3 w-3" />
        </button>
      )}

      <button
        type="button"
        onClick={onToggleEditing}
        aria-pressed={editing}
        className={`flex min-h-8 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs font-semibold transition-colors ${
          editing
            ? "bg-ink text-ground"
            : "bg-slate-100 text-slate-500 hover:text-slate-700 dark:bg-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
        }`}
      >
        <Pencil className="h-3.5 w-3.5" />
        Editar tonos
      </button>

      {editedCount > 0 && (
        <button
          type="button"
          onClick={() => setShadeEdits({})}
          aria-label="Restablecer todos los tonos editados"
          className="flex cursor-pointer items-center gap-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 transition-colors hover:border-slate-400 dark:border-slate-700 dark:text-slate-300 dark:hover:border-slate-500"
        >
          {editedCount === 1
            ? "1 tono editado"
            : `${editedCount} tonos editados`}
          <X className="h-3 w-3" />
        </button>
      )}

      <p className="basis-full text-xs text-slate-500 dark:text-slate-400">
        {editing
          ? "Toca un tono para ajustarlo."
          : MODES.find((item) => item.value === mode)?.hint}
      </p>
    </div>
  );
}
