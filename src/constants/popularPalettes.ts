// Galería curada de paletas populares: puro dato, las escalas se
// generan al vuelo con generateLocalPalette (cero llamadas a la IA)

export interface PopularPalette {
  id: string;
  name: string;
  vibe: string; // tres palabras de vibra, mismo formato que el sentiment de la IA
  baseColor: string;
  secondaryColor: string;
}

export const POPULAR_PALETTES: PopularPalette[] = [
  {
    id: "medianoche",
    name: "Medianoche",
    vibe: "Confiable, Moderno, SaaS",
    baseColor: "#4f46e5",
    secondaryColor: "#06b6d4",
  },
  {
    id: "oceano",
    name: "Océano",
    vibe: "Fresco, Limpio, Abierto",
    baseColor: "#0284c7",
    secondaryColor: "#f97316",
  },
  {
    id: "bosque",
    name: "Bosque",
    vibe: "Natural, Orgánico, Estable",
    baseColor: "#16a34a",
    secondaryColor: "#b45309",
  },
  {
    id: "atardecer",
    name: "Atardecer",
    vibe: "Energético, Cálido, Vibrante",
    baseColor: "#ea580c",
    secondaryColor: "#7c3aed",
  },
  {
    id: "lavanda",
    name: "Lavanda",
    vibe: "Creativo, Suave, Elegante",
    baseColor: "#8b5cf6",
    secondaryColor: "#ec4899",
  },
  {
    id: "menta",
    name: "Menta",
    vibe: "Salud, Bienestar, Calma",
    baseColor: "#10b981",
    secondaryColor: "#0ea5e9",
  },
  {
    id: "cereza",
    name: "Cereza",
    vibe: "Audaz, Apasionado, Directo",
    baseColor: "#e11d48",
    secondaryColor: "#f59e0b",
  },
  {
    id: "cacao",
    name: "Cacao",
    vibe: "Artesanal, Cálido, Auténtico",
    baseColor: "#92400e",
    secondaryColor: "#0d9488",
  },
  {
    id: "neon",
    name: "Neón",
    vibe: "Juvenil, Eléctrico, Atrevido",
    baseColor: "#d946ef",
    secondaryColor: "#84cc16",
  },
  {
    id: "corporativo",
    name: "Corporativo",
    vibe: "Serio, Profesional, Sólido",
    baseColor: "#2563eb",
    secondaryColor: "#64748b",
  },
  {
    id: "terracota",
    name: "Terracota",
    vibe: "Terroso, Mexicano, Acogedor",
    baseColor: "#c2410c",
    secondaryColor: "#65a30d",
  },
  {
    id: "artico",
    name: "Ártico",
    vibe: "Limpio, Tecnológico, Preciso",
    baseColor: "#0891b2",
    secondaryColor: "#6366f1",
  },
];
