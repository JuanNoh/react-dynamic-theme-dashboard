import { useEffect } from "react";
import { Check, AlertCircle, X, Info } from "lucide-react";

export type ToastType = "success" | "error" | "info";

interface ToastProps {
  message: string;
  type?: ToastType;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type = "info",
  onClose,
  duration = 3000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const bgColors = {
    success: "bg-green-500",
    error: "bg-rose-500",
    info: "bg-slate-800",
  };

  return (
    <div className={`animate-fade-in-up fixed right-4 bottom-4 z-50`}>
      <div
        className={`${bgColors[type]} flex min-w-[300px] items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg`}
      >
        {type === "success" && <Check className="h-5 w-5" />}
        {type === "error" && <AlertCircle className="h-5 w-5" />}
        {type === "info" && <Info className="h-5 w-5" />}

        <span className="text-sm font-medium">{message}</span>
        <button
          onClick={onClose}
          className="ml-auto opacity-80 hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
