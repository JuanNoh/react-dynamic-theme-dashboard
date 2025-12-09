import AppLayout from "@/components/layout/AppLayoutTwo";
import {
  ScrollText,
  Gavel,
  Check,
  Copyright,
  AlertTriangle,
  FileCheck,
} from "lucide-react";

export default function TermsPage() {
  return (
    <AppLayout>
      <div className="min-h-screen px-4 pt-36 pb-24">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/20 bg-white/60 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-2xl md:p-16 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/20">
            <div className="mx-auto mb-20 max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 p-3 dark:border-white/10 dark:bg-white/5">
                <ScrollText
                  className="h-8 w-8 text-slate-700 dark:text-white"
                  strokeWidth={1.5}
                />
              </div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-balance text-slate-900 md:text-5xl dark:text-white">
                Términos de
                <span className="bg-gradient-to-b from-slate-700 to-black bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-500">
                  Servicio
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-balance text-slate-600 dark:text-slate-400">
                Bienvenido a Chuwen Palette. Estas son las reglas del juego,
                diseñadas para ser claras, justas y proteger tu libertad
                creativa.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 font-mono text-xs text-slate-500 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-400">
                <Gavel className="h-3 w-3" />
                Vigente desde: {new Date().toLocaleDateString()}
              </div>
            </div>

            <div className="mx-auto max-w-3xl space-y-20">
              <section className="relative">
                <div className="flex items-start gap-6">
                  <div className="hidden h-12 w-12 flex-none items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 font-mono text-lg font-bold text-slate-900 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-white">
                    01
                  </div>
                  <div>
                    <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                      <FileCheck className="h-6 w-6 text-slate-400 sm:hidden" />
                      Aceptación
                    </h2>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                      Al acceder a Chuwen Palette, aceptas estar sujeto a estos
                      términos. Si no estás de acuerdo con alguna parte, te
                      pedimos amablemente que no utilices el servicio. Queremos
                      construir una comunidad basada en la confianza.
                    </p>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-start gap-6">
                  <div className="hidden h-12 w-12 flex-none items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 font-mono text-lg font-bold text-slate-900 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-white">
                    02
                  </div>
                  <div className="w-full">
                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                      Licencia de Uso
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                      Chuwen Palette es una herramienta gratuita. Tienes total
                      libertad creativa:
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {[
                        "Paletas ilimitadas",
                        "Uso comercial permitido",
                        "Sin atribución requerida",
                        "Exportación de código libre",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5"
                        >
                          <div className="flex h-6 w-6 flex-none items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                            <Check
                              className="h-3.5 w-3.5 text-green-600 dark:text-green-400"
                              strokeWidth={3}
                            />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-start gap-6">
                  <div className="hidden h-12 w-12 flex-none items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 font-mono text-lg font-bold text-slate-900 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-white">
                    03
                  </div>
                  <div className="w-full">
                    <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                      <Copyright className="h-6 w-6 text-slate-400 sm:hidden" />
                      Propiedad Intelectual
                    </h2>

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="rounded-2xl border border-indigo-100 bg-indigo-50 p-6 dark:border-indigo-500/20 dark:bg-indigo-900/10">
                        <h3 className="mb-2 text-lg font-bold text-indigo-900 dark:text-indigo-300">
                          Tus Creaciones
                        </h3>
                        <p className="text-sm leading-relaxed text-indigo-800/80 dark:text-indigo-200/70">
                          Tú conservas el{" "}
                          <strong className="font-bold">
                            100% de los derechos
                          </strong>{" "}
                          sobre los colores y códigos que generas. Son tuyos
                          para vender, usar o regalar.
                        </p>
                      </div>

                      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 dark:border-white/5 dark:bg-white/5">
                        <h3 className="mb-2 text-lg font-bold text-slate-900 dark:text-white">
                          La Herramienta
                        </h3>
                        <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                          El código fuente, diseño, logotipos y algoritmos de
                          Chuwen Palette son propiedad exclusiva de nuestros
                          desarrolladores.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-start gap-6">
                  <div className="hidden h-12 w-12 flex-none items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 font-mono text-lg font-bold text-slate-900 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-white">
                    04
                  </div>
                  <div className="w-full">
                    <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                      <AlertTriangle className="h-6 w-6 text-slate-400 sm:hidden" />
                      Descargo de Responsabilidad
                    </h2>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-white/10 dark:bg-black/20">
                      <p className="text-lg leading-relaxed text-slate-600 italic dark:text-slate-300">
                        "El servicio se proporciona 'tal cual'. Trabajamos duro
                        para que todo funcione perfecto, pero no podemos
                        garantizar que el servicio sea ininterrumpido o esté
                        libre de errores al 100%."
                      </p>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
