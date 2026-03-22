"use client";

import { useEffect, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastMessage { id: number; type: ToastType; message: string; }

let toastListeners: ((toast: ToastMessage) => void)[] = [];
let toastId = 0;

export function showToast(type: ToastType, message: string) {
  toastListeners.forEach((fn) => fn({ id: ++toastId, type, message }));
}

const dotColor: Record<ToastType, string> = {
  success: "bg-[#00D47E]",
  error: "bg-[#FF4545]",
  info: "bg-white",
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
          className="toast bg-[#111] border border-[rgba(255,255,255,0.12)] rounded-lg px-4 py-3 flex items-center gap-3 min-w-[240px]"
        >
          <div className={`w-1.5 h-1.5 rounded-full ${dotColor[toast.type]} shrink-0`} />
          <span className="text-[13px] text-white">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
