"use client";

import { useEffect, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastMessage { id: number; type: ToastType; message: string; }

let toastListeners: ((toast: ToastMessage) => void)[] = [];
let toastId = 0;

export function showToast(type: ToastType, message: string) {
  toastListeners.forEach((fn) => fn({ id: ++toastId, type, message }));
}

const icons: Record<ToastType, string> = {
  success: "text-[#10B981]",
  error: "text-[#EF4444]",
  info: "text-[#3B82F6]",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: ToastMessage) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== toast.id)), 3500);
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => { toastListeners = toastListeners.filter((fn) => fn !== addToast); };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="toast bg-[#11151E] border border-[rgba(255,255,255,0.06)] rounded-xl px-4 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] flex items-center gap-3 min-w-[260px]"
        >
          <div className={`w-1.5 h-1.5 rounded-full ${icons[toast.type]} bg-current shrink-0`} />
          <span className="text-[13px] text-[#F0F2F5]">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
