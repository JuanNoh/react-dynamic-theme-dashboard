// Galería curada de paletas populares: puro dato, las escalas se
// generan al vuelo con generateLocalPalette (cero llamadas a la IA).
// Colores propios inspirados en México y el Caribe: ninguno es de Tailwind a
// propósito, porque con uno de Tailwind el motor regresa su familia tal cual y
// la tarjeta sale igual a la de cualquier otro sitio.

export interface PopularPalette {
  id: string;
  name: string;
  vibe: string; // tres palabras de vibra, mismo formato que el sentiment de la IA
  baseColor: string;
  secondaryColor: string;
}

export const POPULAR_PALETTES: PopularPalette[] = [
  {
    id: "cenote",
    name: "Cenote",
    vibe: "Fresco, Profundo, Sereno",
    baseColor: "#1f7a8c",
    secondaryColor: "#d9a05b",
  },
  {
    id: "bugambilia",
    name: "Bugambilia",
    vibe: "Alegre, Floral, Expresivo",
    baseColor: "#a23b72",
    secondaryColor: "#3d7c8a",
  },
  {
    id: "selva",
    name: "Selva",
    vibe: "Natural, Frondoso, Estable",
    baseColor: "#2f6b4f",
    secondaryColor: "#c98b3f",
  },
  {
    id: "talavera",
    name: "Talavera",
    vibe: "Clásico, Artesanal, Confiable",
    baseColor: "#2a5c9a",
    secondaryColor: "#d6a84b",
  },
  {
    id: "barro",
    name: "Barro",
    vibe: "Terroso, Cálido, Acogedor",
    baseColor: "#b4532f",
    secondaryColor: "#2f6f73",
  },
  {
    id: "jacaranda",
    name: "Jacaranda",
    vibe: "Creativo, Suave, Elegante",
    baseColor: "#6a4fa3",
    secondaryColor: "#c9a24d",
  },
  {
    id: "cacao",
    name: "Cacao",
    vibe: "Artesanal, Cálido, Auténtico",
    baseColor: "#6b4433",
    secondaryColor: "#2f7d74",
  },
  {
    id: "jade",
    name: "Jade",
    vibe: "Salud, Bienestar, Calma",
    baseColor: "#2e8b7a",
    secondaryColor: "#b5654a",
  },
  {
    id: "jamaica",
    name: "Jamaica",
    vibe: "Audaz, Apasionado, Directo",
    baseColor: "#8f2d42",
    secondaryColor: "#5f8a6b",
  },
  {
    id: "anil",
    name: "Añil",
    vibe: "Serio, Profesional, Sólido",
    baseColor: "#2d3674",
    secondaryColor: "#d99a6c",
  },
  {
    id: "henequen",
    name: "Henequén",
    vibe: "Sobrio, Natural, Refinado",
    baseColor: "#9a8450",
    secondaryColor: "#4d6b8a",
  },
  {
    id: "obsidiana",
    name: "Obsidiana",
    vibe: "Elegante, Tecnológico, Preciso",
    baseColor: "#2f3640",
    secondaryColor: "#b4532f",
  },
];
