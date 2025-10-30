# Brand UI — Generador de Paleta Dinámica (React19 + Tailwind v4)

[![Brand UI — captura](./docs/cover.jpg)](https://react-dynamic-theme-dashboard.vercel.app/)

> 🔗 **Demo en Vercel:** https://react-dynamic-theme-dashboard.vercel.app/

> UI kit personal con **tematización dinámica** en tiempo real: define un color base, genera una paleta completa (`50..950`) y aplica **design tokens** a toda la interfaz con Tailwind CSS v4.  
> Arquitectura limpia, componentes reutilizables y stack moderno **React 19 + Vite + TypeScript**.

---

## ✨ Características

- 🎨 **Theming en tiempo real**: cambia `--color-primary-*` desde JS y las utilidades de Tailwind (`bg/text/border/ring/stroke`) se actualizan al instante.
- 🧠 **Algoritmo propio de paleta** con **chroma-js** (LCH/HSL, curvas suaves, saturación y luminancia calibradas).
  - Layout completo: `AppLayout`, `Sidebar`, `Header`
- 🧱 **Arquitectura limpia**: separación de lógica pura, efectos, contexto y UI.
- ⚛️ **React 19**: uso de `use()` para consumir contexto + `babel-plugin-react-compiler`.
- 🧭 **Aliases de imports** con `@/` (Vite + TypeScript).
- 🧵 **Tailwind v4** con `@theme` (design tokens nativos CSS).

---

## 🛠️ Stack Técnico

- **Frontend:** React 19, TypeScript, Vite
- **Estilos:** Tailwind CSS v4 (`@theme`, tokens CSS nativos)
- **Color:** chroma-js (`@types/chroma-js`)
- **Build tooling:** Vite, React Compiler (`babel-plugin-react-compiler`)

---

## 🧬 Arquitectura y Patrones

- **SRP & Clean Code:** cada archivo hace una sola cosa; nombres explícitos.
- **Separación de responsabilidades:**
  - `lib/` → lógica pura (ej. `generatePalette.ts`)
  - `lib/` → efectos (ej. `themeVars.ts` aplica tokens al `:root`)
  - `context/` + `providers/` → estado global de paleta
  - `components/` → presentacionales y reutilizables
  - `pages/` → composición de vistas
- **React Context + `use()`:** hook moderno de React 19 para consumir el contexto sin `useContext`.
- **Design Tokens:** `@theme { --color-primary-50..950 }` como **fuente de verdad**; las utilidades de Tailwind referencian `var(--color-...)`.
- **DX mejorada:** alias `@/` para imports claros y mantenimiento sencillo.

---
