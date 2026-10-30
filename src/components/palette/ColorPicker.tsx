import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HexColorInput, HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  value: string;
  onChange: (color: string) => void;
  disabled?: boolean;
}

// Muestra del color actual que abre un panel para escogerlo a mano. Mientras
// arrastras, la escala se regenera en vivo (el motor tarda menos de 1 ms).
export default function ColorPicker({
  value,
  onChange,
  disabled,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Se cierra con clic afuera o con Escape
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div ref={rootRef} className="relative">
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        disabled={disabled}
        aria-label="Escoger un color a mano"
        aria-expanded={open}
        title="Escoger un color"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
        className="block h-10 w-10 cursor-pointer rounded-xl shadow-inner ring-1 ring-black/10 disabled:cursor-not-allowed disabled:opacity-60 dark:ring-white/15"
        style={{ backgroundColor: value }}
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="absolute top-full left-0 z-30 mt-3 w-60 origin-top-left rounded-2xl border border-slate-200 bg-white/90 p-3 shadow-xl shadow-slate-300/40 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/40"
          >
            <HexColorPicker
              color={value}
              onChange={onChange}
              style={{ width: "100%", height: 168 }}
            />
            <label className="mt-3 flex items-center gap-2 rounded-lg border border-slate-200 bg-white/70 px-3 py-2 dark:border-white/10 dark:bg-white/5">
              <span className="font-mono text-sm text-slate-400">#</span>
              <HexColorInput
                color={value}
                onChange={onChange}
                aria-label="Código hex del color"
                className="w-full bg-transparent font-mono text-sm text-slate-800 uppercase focus:outline-none dark:text-slate-100"
              />
            </label>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
