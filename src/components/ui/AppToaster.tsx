import { useEffect, useState } from "react";
import { Toaster } from "sonner";

const currentTheme = () =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

// Avisos con Sonner. El modo oscuro vive como clase .dark en <html> (la pone
// ThemeToggle), así que la vigilamos para que el aviso cambie junto con la página
export default function AppToaster() {
  const [theme, setTheme] = useState<"light" | "dark">(currentTheme);

  useEffect(() => {
    const observer = new MutationObserver(() => setTheme(currentTheme()));
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  return (
    <Toaster
      theme={theme}
      position="bottom-right"
      closeButton
      toastOptions={{ className: "!rounded-2xl" }}
    />
  );
}
