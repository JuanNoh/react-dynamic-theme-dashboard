import { motion } from "motion/react";
import { usePalette } from "@/context/usePalette";
import { SHADE_KEYS } from "@/types/palette";

// La paleta a la vista desde el hero: es el producto, no debe quedar hasta abajo.
// Cambia en ola con cada color y el tono de la marca se ve un poco más ancho.
export default function ScaleStrip() {
  const { palette, baseShade } = usePalette();

  return (
    <a
      href="#sistema"
      aria-label="Ver la escala completa"
      className="mt-5 flex h-14 overflow-hidden rounded-2xl shadow-lg ring-1 shadow-slate-200/50 ring-black/5 transition-transform duration-300 hover:-translate-y-0.5 sm:h-16 dark:shadow-black/40 dark:ring-white/10"
    >
      {SHADE_KEYS.map((key, idx) => (
        <motion.span
          key={key}
          className="block h-full"
          initial={false}
          animate={{
            backgroundColor: palette[key],
            flexGrow: key === baseShade ? 1.8 : 1,
          }}
          transition={{ duration: 0.45, delay: idx * 0.025, ease: "easeOut" }}
        />
      ))}
    </a>
  );
}
