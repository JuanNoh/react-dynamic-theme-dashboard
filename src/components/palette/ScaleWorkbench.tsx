import { useState } from "react";
import ScaleSettings from "@/components/palette/ScaleSettings";
import ShadeEditor from "@/components/palette/ShadeEditor";
import SwatchGrid from "@/components/palette/SwatchGrid";
import { usePalette } from "@/context/usePalette";
import type { ShadeKey } from "@/types/palette";

// La escala con sus controles: modo, tono fijado y retoques a mano
export default function ScaleWorkbench() {
  const { baseShade } = usePalette();
  const [editing, setEditing] = useState(false);
  const [selected, setSelected] = useState<ShadeKey | null>(null);

  const toggleEditing = () => {
    setEditing((prev) => !prev);
    setSelected(null);
  };

  return (
    <>
      <ScaleSettings editing={editing} onToggleEditing={toggleEditing} />
      <SwatchGrid
        editing={editing}
        selectedShade={selected}
        onSelectShade={setSelected}
      />
      {editing && selected && selected !== baseShade && (
        <ShadeEditor shade={selected} />
      )}
      {editing && selected && selected === baseShade && (
        <p className="text-soft mt-3 text-sm">
          Este es tu color: de él sale toda la escala. Se cambia arriba, en el
          buscador.
        </p>
      )}
    </>
  );
}
