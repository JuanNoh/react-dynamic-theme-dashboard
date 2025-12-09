import { usePalette } from "@/context/usePalette";
import {
  Signal,
  Wifi,
  Battery,
  Bell,
  Home,
  CreditCard,
  PieChart,
  User,
  Plus,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
} from "lucide-react";

export default function MobilePreview() {
  const { brandName } = usePalette();

  return (
    <div className="mx-auto w-full max-w-[320px] font-sans antialiased sm:max-w-[360px]">
      <div className="relative overflow-hidden rounded-[3rem] border-[8px] border-slate-900 bg-slate-900 shadow-2xl ring-1 ring-white/10 dark:border-[#1a1a1a] dark:bg-[#1a1a1a]">
        <div className="absolute top-0 left-1/2 z-20 h-7 w-32 -translate-x-1/2 rounded-b-2xl bg-black"></div>

        <div className="h-[700px] w-full overflow-hidden bg-slate-50 transition-colors duration-300 dark:bg-[#0B0F19]">
          <div className="flex items-center justify-between px-6 pt-3 pb-2 text-xs font-medium text-slate-900 dark:text-white">
            <span>9:41</span>
            <div className="flex gap-1.5">
              <Signal className="h-3.5 w-3.5" />
              <Wifi className="h-3.5 w-3.5" />
              <Battery className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 overflow-hidden rounded-full border-2 border-white bg-slate-200 shadow-sm dark:border-[#1a1a1a]">
                <div className="h-full w-full bg-gradient-to-br from-slate-300 to-slate-400"></div>
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Bienvenido,
                </p>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Alex Morgan
                </h3>
              </div>
            </div>
            <button className="relative rounded-full bg-white p-2 shadow-sm transition-colors hover:bg-slate-50 dark:bg-white/5 dark:hover:bg-white/10">
              <Bell className="h-5 w-5 text-slate-700 dark:text-slate-300" />
              <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full border border-white bg-red-500 dark:border-[#0B0F19]"></span>
            </button>
          </div>

          <div className="custom-scrollbar h-[calc(100%-140px)] overflow-y-auto px-6 pb-6">
            <div className="bg-primary-600 shadow-primary-500/30 relative mb-8 overflow-hidden rounded-3xl p-6 text-white shadow-xl transition-colors">
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
              <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-black/10 blur-3xl"></div>

              <div className="mb-8 flex items-start justify-between">
                <div>
                  <p className="text-primary-100 text-xs font-medium">
                    Balance Total
                  </p>
                  <h2 className="mt-1 text-3xl font-bold tracking-tight">
                    $24,500.00
                  </h2>
                </div>
                <Wallet className="text-primary-200 h-6 w-6" />
              </div>

              <div className="flex items-center justify-between">
                <div className="text-primary-100 text-sm font-medium">
                  **** 4589
                </div>
                <div className="text-xs font-bold tracking-widest uppercase opacity-80">
                  {brandName || "VISA"}
                </div>
              </div>
            </div>

            <div className="mb-8 flex justify-between gap-2">
              {[
                {
                  label: "Enviar",
                  icon: ArrowUpRight,
                  color:
                    "bg-slate-900 text-white dark:bg-white dark:text-black",
                },
                {
                  label: "Recibir",
                  icon: ArrowDownLeft,
                  color:
                    "bg-white text-slate-900 dark:bg-white/5 dark:text-white",
                },
                {
                  label: "Top Up",
                  icon: Plus,
                  color:
                    "bg-white text-slate-900 dark:bg-white/5 dark:text-white",
                },
              ].map((action, i) => (
                <button
                  key={i}
                  className="flex flex-1 flex-col items-center gap-2"
                >
                  <div
                    className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-transform active:scale-95 ${action.color}`}
                  >
                    <action.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    {action.label}
                  </span>
                </button>
              ))}
            </div>

            <div>
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Actividad
                </h3>
                <button className="text-primary-600 dark:text-primary-400 text-xs font-medium">
                  Ver todo
                </button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Netflix Suscripción",
                    date: "Hoy, 9:00 AM",
                    amount: "-$15.00",
                    icon: "N",
                    bg: "bg-red-100 text-red-600",
                  },
                  {
                    title: "Spotify Premium",
                    date: "Ayer, 4:30 PM",
                    amount: "-$9.99",
                    icon: "S",
                    bg: "bg-green-100 text-green-600",
                  },
                  {
                    title: "Transferencia Recibida",
                    date: "Oct 24",
                    amount: "+$450.00",
                    icon: "T",
                    bg: "bg-blue-100 text-blue-600",
                  },
                  {
                    title: "Uber Ride",
                    date: "Oct 22",
                    amount: "-$24.50",
                    icon: "U",
                    bg: "bg-black/5 text-black dark:bg-white/10 dark:text-white",
                  },
                ].map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm transition-colors dark:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-xl font-bold ${item.bg}`}
                      >
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-900 dark:text-white">
                          {item.title}
                        </h4>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {item.date}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-sm font-bold ${item.amount.startsWith("+") ? "text-green-500" : "text-slate-900 dark:text-white"}`}
                    >
                      {item.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 border-t border-slate-200 bg-white/90 px-6 py-4 backdrop-blur-lg transition-colors dark:border-white/5 dark:bg-[#0B0F19]/90">
            <div className="flex items-center justify-between">
              {[
                { icon: Home, active: true },
                { icon: PieChart, active: false },
                { icon: CreditCard, active: false },
                { icon: Bell, active: false },
                { icon: User, active: false },
              ].map((item, i) => {
                if (i === 2) {
                  return (
                    <div
                      key={i}
                      className="-mt-8 rounded-full bg-slate-50 p-1 dark:bg-[#0B0F19]"
                    >
                      <button className="bg-primary-600 shadow-primary-500/40 hover:bg-primary-500 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95">
                        <Plus className="h-6 w-6" />
                      </button>
                    </div>
                  );
                }
                return (
                  <button
                    key={i}
                    className={`p-2 transition-colors ${item.active ? "text-primary-600 dark:text-primary-400" : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"}`}
                  >
                    <item.icon
                      className="h-6 w-6"
                      strokeWidth={item.active ? 2.5 : 2}
                    />
                  </button>
                );
              })}
            </div>
            <div className="mx-auto mt-5 h-1 w-1/3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
