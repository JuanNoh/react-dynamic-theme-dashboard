import { type Palette, SHADE_KEYS } from "@/types/palette";

// Una escala completa en una tira, para compararla de un vistazo
export default function ScaleBar({ palette }: { palette: Palette }) {
  return (
    <span aria-hidden="true" className="flex h-14 overflow-hidden rounded-xl">
      {SHADE_KEYS.map((key) => (
        <span
          key={key}
          className="flex-1 transition-colors duration-500"
          style={{ backgroundColor: palette[key] }}
        />
      ))}
    </span>
  );
}
