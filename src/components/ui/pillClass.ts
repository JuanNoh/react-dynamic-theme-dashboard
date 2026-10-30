// Píldora de selección: la usan los formatos de exportar y las armonías
export const pillClass = (active: boolean) =>
  `min-h-11 cursor-pointer rounded-full px-4 text-sm font-medium transition-colors ${
    active ? "bg-ink text-ground" : "text-soft hover:text-ink"
  }`;
