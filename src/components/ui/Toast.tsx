"use client";

import { useEffect, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

let toastListeners: ((toast: ToastMessage) => void)[] = [];
let toastId = 0;

export function showToast(type: ToastType, message: string) {
  const toast: ToastMessage = { id: ++toastId, type, message };
  toastListeners.forEach((fn) => fn(toast));
}

const typeStyles: Record<ToastType, string> = {
  success: "border-[rgba(52,211,153,0.25)] bg-[rgba(52,211,153,0.08)]",
  error: "border-[rgba(248,113,113,0.25)] bg-[rgba(248,113,113,0.08)]",
  info: "border-[rgba(126,180,255,0.25)] bg-[rgba(126,180,255,0.08)]",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: ToastMessage) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 4000);
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== addToast);
    };
  }, [addToast]);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast backdrop-blur-xl border px-5 py-3 rounded-2xl text-sm font-medium text-white min-w-[280px] ${typeStyles[toast.type]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
