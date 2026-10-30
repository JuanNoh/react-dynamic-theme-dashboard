import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (document.documentElement.classList.contains("dark")) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="text-soft hover:text-ink flex h-11 w-9 cursor-pointer items-center justify-center rounded-full transition-colors sm:w-11"
      aria-label="Cambiar entre modo claro y oscuro"
    >
      {isDark ? (
        <Moon className="h-5 w-5" strokeWidth={1.5} />
      ) : (
        <Sun className="h-5 w-5" strokeWidth={1.5} />
      )}
    </button>
  );
}
