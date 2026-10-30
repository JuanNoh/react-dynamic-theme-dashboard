// Un solo resplandor muy tenue teñido con la paleta actual: el fondo acompaña al
// color sin competir con él. Reemplaza al grano (el svg externo ya daba 402) y a
// las manchas cian y violeta, que chocaban con cualquier paleta.
export default function BackgroundEffects() {
  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] opacity-[0.12] dark:opacity-[0.16]"
      style={{
        background:
          "radial-gradient(ellipse 60% 70% at 50% 0%, var(--color-primary-500), transparent 72%)",
      }}
    />
  );
}
