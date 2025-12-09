import { usePalette } from "@/context/usePalette";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Settings,
  Lock,
  CircleDollarSign,
  TrendingUp,
} from "lucide-react";

export default function DashboardPreview() {
  const { brandName } = usePalette();

  return (
    <div className="mx-auto w-full max-w-6xl font-sans antialiased">
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl ring-1 shadow-slate-200 ring-slate-900/5 transition-colors duration-300 dark:border-white/10 dark:bg-[#0B0F19] dark:shadow-indigo-500/20 dark:ring-white/5">
        <div className="flex items-center gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 transition-colors duration-300 dark:border-white/5 dark:bg-[#0B0F19]">
          <div className="flex gap-2">
            <div className="h-3 w-3 rounded-full border border-black/10 bg-[#FF5F57]"></div>
            <div className="h-3 w-3 rounded-full border border-black/10 bg-[#FEBC2E]"></div>
            <div className="h-3 w-3 rounded-full border border-black/10 bg-[#28C840]"></div>
          </div>
          <div className="flex flex-1 justify-center">
            <div className="flex w-full max-w-sm items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-1.5 font-mono text-[10px] text-slate-500 shadow-sm transition-colors duration-300 dark:border-white/5 dark:bg-white/5 dark:text-slate-400 dark:shadow-none">
              <Lock className="h-3 w-3 opacity-50" />
              https://app.
              {brandName.toLowerCase().replace(/\s+/g, "") || "mimarca"}
              .com/dashboard
            </div>
          </div>
          <div className="w-16"></div>
        </div>

        <div className="flex h-[600px] bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0B0F19] dark:text-slate-300">
          <aside className="flex w-64 flex-col gap-6 border-r border-slate-200 bg-white p-4 transition-colors duration-300 md:flex dark:border-white/5 dark:bg-[#0B0F19]">
            <div className="flex items-center gap-3 px-2">
              <div className="from-primary-500 to-primary-600 shadow-primary-500/20 flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br font-bold text-white shadow-lg">
                {brandName.charAt(0) || "B"}
              </div>
              <span className="font-semibold tracking-tight text-slate-900 dark:text-white">
                {brandName || "Marca"}
              </span>
            </div>

            <nav className="space-y-1">
              {[
                {
                  name: "Resumen",
                  icon: LayoutDashboard,
                  active: true,
                },
                {
                  name: "Analíticas",
                  icon: BarChart2,
                  active: false,
                },
                {
                  name: "Clientes",
                  icon: Users,
                  active: false,
                },
                {
                  name: "Ajustes",
                  icon: Settings,
                  active: false,
                },
              ].map((item) => (
                <button
                  key={item.name}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    item.active
                      ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
                      : "text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-white/5 dark:hover:text-white"
                  }`}
                >
                  <item.icon className="h-5 w-5" strokeWidth={2} />
                  {item.name}
                </button>
              ))}
            </nav>

            <div className="mt-auto flex items-center gap-3 border-t border-slate-200 pt-4 dark:border-white/5">
              <div className="relative h-8 w-8 rounded-full bg-slate-200 ring-2 ring-green-500/50 dark:bg-slate-700">
                <div className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500 dark:border-[#0B0F19]"></div>
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900 dark:text-white">
                  Usuario Admin
                </p>
                <p className="truncate text-xs text-slate-500">
                  admin@marca.com
                </p>
              </div>
            </div>
          </aside>

          <main className="flex-1 overflow-y-auto p-6">
            <header className="mb-8 flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                  ¡Hola de nuevo!
                </h1>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Aquí está lo que sucede hoy.
                </p>
              </div>
              <div className="flex gap-3">
                <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-white dark:shadow-none dark:hover:bg-white/10">
                  Exportar Reporte
                </button>
                <button className="bg-primary-600 shadow-primary-500/20 hover:bg-primary-500 rounded-lg px-4 py-2 text-sm font-medium text-white shadow-lg transition-colors">
                  + Nuevo Proyecto
                </button>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-white/5 dark:bg-[#131825] dark:shadow-none">
                <div className="absolute top-0 right-0 p-5 opacity-5 transition-opacity group-hover:opacity-10">
                  <CircleDollarSign className="text-primary-500 h-20 w-20" />
                </div>
                <p className="mb-1 text-sm font-medium text-slate-500 dark:text-slate-400">
                  Ingresos Totales
                </p>
                <h3 className="font-mono text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                  $84,200
                </h3>
                <div className="mt-4 flex items-center gap-2">
                  <span className="flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-0.5 text-xs font-bold text-green-600 dark:text-green-400">
                    <TrendingUp className="h-3 w-3" strokeWidth={3} />
                    12.5%
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500">
                    vs mes anterior
                  </span>
                </div>
              </div>

              <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 md:col-span-2 dark:border-white/5 dark:bg-[#131825] dark:shadow-none">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Crecimiento
                  </h3>
                  <select className="focus:border-primary-500/50 rounded-lg border border-slate-200 bg-slate-50 px-2 py-1 text-xs text-slate-600 outline-none dark:border-white/10 dark:bg-white/5 dark:text-slate-300">
                    <option>Últimos 7 días</option>
                    <option>Últimos 30 días</option>
                  </select>
                </div>
                <div className="relative h-32 w-full flex-1">
                  <svg
                    className="h-full w-full overflow-visible"
                    preserveAspectRatio="none"
                    viewBox="0 0 100 50"
                  >
                    <defs>
                      <linearGradient
                        id="chartGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="0%"
                          stopColor="var(--color-primary-500)"
                          stopOpacity="0.4"
                        />
                        <stop
                          offset="100%"
                          stopColor="var(--color-primary-500)"
                          stopOpacity="0"
                        />
                      </linearGradient>
                    </defs>
                    <line
                      x1="0"
                      y1="10"
                      x2="100"
                      y2="10"
                      stroke="currentColor"
                      className="text-slate-100 dark:text-white/5"
                      strokeDasharray="2 2"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="25"
                      x2="100"
                      y2="25"
                      stroke="currentColor"
                      className="text-slate-100 dark:text-white/5"
                      strokeDasharray="2 2"
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="40"
                      x2="100"
                      y2="40"
                      stroke="currentColor"
                      className="text-slate-100 dark:text-white/5"
                      strokeDasharray="2 2"
                      strokeWidth="0.5"
                    />

                    <path
                      d="M0,50 L0,35 C15,30 25,40 35,25 C45,10 55,30 65,20 C75,10 85,15 95,5 L100,15 L100,50 Z"
                      fill="url(#chartGradient)"
                    />

                    <path
                      d="M0,35 C15,30 25,40 35,25 C45,10 55,30 65,20 C75,10 85,15 95,5 L100,15"
                      fill="none"
                      stroke="var(--color-primary-500)"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="drop-shadow-[0_0_8px_rgba(var(--color-primary-500),0.5)]"
                    />
                  </svg>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 dark:border-white/5 dark:bg-[#131825] dark:shadow-none">
                <h3 className="mb-4 font-semibold text-slate-900 dark:text-white">
                  Configuración Rápida
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Notificaciones Email
                    </label>
                    <div className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 p-3 dark:border-white/5 dark:bg-white/5">
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        Resumen Semanal
                      </span>
                      <div className="bg-primary-600 relative h-6 w-10 cursor-pointer rounded-full shadow-inner">
                        <div className="absolute top-1 right-1 h-4 w-4 rounded-full bg-white shadow-sm"></div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Nombre de Perfil
                    </label>
                    <input
                      type="text"
                      placeholder="Ingresa nombre..."
                      className="focus:border-primary-500/50 focus:ring-primary-500/50 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 transition-all placeholder:text-slate-400 focus:ring-1 focus:outline-none dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-600"
                    />
                  </div>
                  <button className="bg-primary-600 shadow-primary-500/20 hover:bg-primary-500 w-full rounded-lg py-2 text-sm font-medium text-white shadow-lg transition-colors">
                    Guardar Cambios
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-colors duration-300 md:col-span-2 dark:border-white/5 dark:bg-[#131825] dark:shadow-none">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Transacciones Recientes
                  </h3>
                  <button className="text-primary-600 dark:text-primary-400 hover:text-primary-500 text-xs font-medium">
                    Ver Todo
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-500 dark:border-white/5">
                        <th className="pb-3 pl-2 font-medium">Transacción</th>
                        <th className="pb-3 font-medium">Fecha</th>
                        <th className="pb-3 font-medium">Monto</th>
                        <th className="pr-2 pb-3 font-medium">Estado</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600 dark:text-slate-300">
                      {[
                        {
                          name: "Pago a Stripe",
                          date: "Oct 24, 2025",
                          amount: "$1,200.00",
                          status: "Completado",
                        },
                        {
                          name: "Servidores AWS",
                          date: "Oct 23, 2025",
                          amount: "$450.50",
                          status: "Pendiente",
                        },
                        {
                          name: "Licencia Figma",
                          date: "Oct 22, 2025",
                          amount: "$89.00",
                          status: "Completado",
                        },
                      ].map((row, i) => (
                        <tr
                          key={i}
                          className="group transition-colors even:bg-slate-50/50 hover:bg-slate-50 dark:even:bg-white/[0.02] dark:hover:bg-white/5"
                        >
                          <td className="py-3 pl-2 font-medium text-slate-900 dark:text-white">
                            {row.name}
                          </td>
                          <td className="py-3 text-slate-500">{row.date}</td>
                          <td className="py-3 font-mono text-slate-700 dark:text-slate-300">
                            {row.amount}
                          </td>
                          <td className="py-3 pr-2">
                            <span
                              className={`rounded-full px-2 py-1 text-xs font-medium ${
                                row.status === "Completado"
                                  ? "border border-green-500/10 bg-green-500/10 text-green-600 dark:text-green-400"
                                  : "bg-secondary-500/10 text-secondary-600 dark:text-secondary-400 border-secondary-500/10 border"
                              }`}
                            >
                              {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
