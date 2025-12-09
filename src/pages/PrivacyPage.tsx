import AppLayout from "@/components/layout/AppLayoutTwo";
import { Shield, Lock, Server, Cpu, Cookie, CheckCircle2 } from "lucide-react";

export default function PrivacyPage() {
  return (
    <AppLayout>
      <div className="min-h-screen px-4 pt-36 pb-24">
        <div className="relative z-10 mx-auto max-w-4xl">
          <div className="rounded-3xl border border-white/20 bg-white/60 p-8 shadow-xl shadow-slate-200/50 backdrop-blur-2xl md:p-16 dark:border-white/10 dark:bg-slate-900/60 dark:shadow-black/20">
            <div className="mx-auto mb-20 max-w-2xl text-center">
              <div className="mb-6 inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 p-3 dark:border-white/10 dark:bg-white/5">
                <Shield
                  className="h-8 w-8 text-slate-700 dark:text-white"
                  strokeWidth={1.5}
                />
              </div>

              <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-balance text-slate-900 md:text-5xl dark:text-white">
                Política de
                <span className="bg-gradient-to-b from-slate-700 to-black bg-clip-text text-transparent dark:from-white dark:via-slate-200 dark:to-slate-500">
                  Privacidad
                </span>
              </h1>

              <p className="text-lg leading-relaxed text-balance text-slate-600 dark:text-slate-400">
                En Chuwen Palette, creemos que tus datos te pertenecen.
                Diseñamos nuestras herramientas para ser privadas por defecto y
                transparentes por diseño.
              </p>

              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-100 px-4 py-1.5 font-mono text-xs text-slate-500 dark:border-white/10 dark:bg-slate-800/50 dark:text-slate-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
                </span>
                Versión 2.0 • Actualizado: {new Date().toLocaleDateString()}
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
                      <Lock className="h-6 w-6 text-slate-400 sm:hidden" />
                      Compromiso con la Privacidad
                    </h2>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                      Valoramos profundamente tu privacidad. Esta política
                      describe cómo manejamos la información cuando utilizas
                      nuestra herramienta. Nuestra filosofía es simple:{" "}
                      <strong className="font-semibold text-slate-900 underline decoration-slate-300 underline-offset-4 dark:text-white dark:decoration-slate-600">
                        tus datos son tuyos
                      </strong>
                      .
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
                      <CheckCircle2 className="h-6 w-6 text-slate-400 sm:hidden" />
                      Minimización de Datos
                    </h2>

                    <div className="grid gap-4 sm:grid-cols-3">
                      {[
                        "Sin registro obligatorio",
                        "Sin rastreo de GPS",
                        "Sin servidores externos",
                      ].map((item, i) => (
                        <div
                          key={i}
                          className="rounded-xl border border-slate-100 bg-slate-50 p-4 dark:border-white/5 dark:bg-white/5"
                        >
                          <CheckCircle2 className="mb-3 h-5 w-5 text-teal-500" />
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
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
                    <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                      <Server className="h-6 w-6 text-slate-400 sm:hidden" />
                      Procesamiento Local
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                      Toda la generación y almacenamiento ocurre{" "}
                      <strong className="font-medium text-teal-600 dark:text-teal-400">
                        localmente en tu navegador
                      </strong>{" "}
                      utilizando tecnologías estándar.
                    </p>

                    {/* Code Snippet Style Quote */}
                    <div className="rounded-xl border border-slate-800 bg-[#09090b] p-5 shadow-inner">
                      <div className="mb-3 flex items-center gap-2 border-b border-white/10 pb-3">
                        <div className="h-3 w-3 rounded-full border border-red-500/50 bg-red-500/20"></div>
                        <div className="h-3 w-3 rounded-full border border-yellow-500/50 bg-yellow-500/20"></div>
                        <div className="h-3 w-3 rounded-full border border-green-500/50 bg-green-500/20"></div>
                        <span className="ml-2 font-mono text-xs text-slate-500">
                          privacy-policy.ts
                        </span>
                      </div>
                      <p className="font-mono text-sm text-slate-400">
                        <span className="text-purple-400">const</span>{" "}
                        <span className="text-blue-400">dataLocation</span> ={" "}
                        <span className="text-green-400">"localStorage"</span>;
                        <br />
                        <span className="text-slate-500">
                          // Tus preferencias nunca salen de tu dispositivo.
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-start gap-6">
                  <div className="hidden h-12 w-12 flex-none items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 font-mono text-lg font-bold text-slate-900 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-white">
                    04
                  </div>
                  <div>
                    <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                      <Cpu className="h-6 w-6 text-slate-400 sm:hidden" />
                      Uso de Inteligencia Artificial
                    </h2>
                    <p className="mb-6 text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                      Enviamos únicamente el texto de tu prompt a nuestros
                      proveedores de LLM.
                    </p>
                    <div className="flex gap-4 rounded-xl border border-orange-100 bg-orange-50 p-5 dark:border-orange-500/20 dark:bg-orange-900/10">
                      <div className="h-fit rounded-lg bg-orange-100 p-2 dark:bg-orange-900/30">
                        <Cpu className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                      </div>
                      <div>
                        <h4 className="mb-1 text-sm font-bold text-orange-900 dark:text-orange-200">
                          Datos Efímeros
                        </h4>
                        <p className="text-sm leading-relaxed text-orange-800/80 dark:text-orange-200/70">
                          No utilizamos tus prompts para entrenar modelos. Los
                          datos se procesan y se descartan inmediatamente
                          después de generar la paleta.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="flex items-start gap-6">
                  <div className="hidden h-12 w-12 flex-none items-center justify-center rounded-2xl border border-slate-200 bg-slate-100 font-mono text-lg font-bold text-slate-900 sm:flex dark:border-white/10 dark:bg-white/5 dark:text-white">
                    05
                  </div>
                  <div>
                    <h2 className="mb-4 flex items-center gap-3 text-2xl font-bold text-slate-900 dark:text-white">
                      <Cookie className="h-6 w-6 text-slate-400 sm:hidden" />
                      Cookies y Rastreo
                    </h2>
                    <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                      No utilizamos cookies de terceros para publicidad.
                      Utilizamos únicamente almacenamiento local esencial para
                      recordar si prefieres el tema{" "}
                      <span className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs dark:bg-slate-800">
                        Dark
                      </span>{" "}
                      o{" "}
                      <span className="rounded bg-slate-100 px-1 py-0.5 font-mono text-xs dark:bg-slate-800">
                        Light
                      </span>
                      .
                    </p>
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
