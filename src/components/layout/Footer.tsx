import { Link } from "react-router-dom";
import { Github } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto w-full border-t border-slate-200/60 bg-white/30 backdrop-blur-xl dark:border-white/5 dark:bg-[#0f172a]/30">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="space-y-1 text-center md:text-left">
            <h3 className="flex items-center justify-center gap-2 text-sm font-bold tracking-tight text-slate-900 md:justify-start dark:text-white">
              <span className="h-2 w-2 animate-pulse rounded-full bg-slate-900 dark:bg-white/80"></span>
              Brand UI Generator
            </h3>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
              © {currentYear} Todos los derechos reservados.
            </p>
          </div>

          <nav className="flex items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-400">
            <Link
              to="/privacidad"
              className="group relative transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Privacidad
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-slate-900 transition-all group-hover:w-full dark:bg-white"></span>
            </Link>

            <Link
              to="/terminos"
              className="group relative transition-colors hover:text-slate-900 dark:hover:text-white"
            >
              Términos
              <span className="absolute -bottom-1 left-0 h-px w-0 bg-slate-900 transition-all group-hover:w-full dark:bg-white"></span>
            </Link>

            <a
              href="https://github.com/juannoh"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-3 py-1.5 transition-all hover:bg-slate-200 hover:text-slate-900 dark:border-white/10 dark:bg-white/5 dark:hover:bg-white/10 dark:hover:text-white"
            >
              <Github className="h-4 w-4" />
              <span>GitHub</span>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
