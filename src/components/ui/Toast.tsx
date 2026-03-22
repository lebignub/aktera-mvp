"use client";

import { useEffect, useState, useCallback } from "react";

export type ToastType = "success" | "error" | "info";

interface ToastMessage {
  id: number;
  type: ToastType;
  message: string;
}

// Simple global toast state
let toastListeners: ((toast: ToastMessage) => void)[] = [];
let toastId = 0;

export function showToast(type: ToastType, message: string) {
  const toast: ToastMessage = { id: ++toastId, type, message };
  toastListeners.forEach((fn) => fn(toast));
}

const typeStyles: Record<ToastType, string> = {
  success: "border-[#22C55E]/30 bg-[#22C55E]/10",
  error: "border-[#EF4444]/30 bg-[#EF4444]/10",
  info: "border-[#4F8EFF]/30 bg-[#4F8EFF]/10",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: ToastMessage) => {
    setToasts((prev) => [...prev, toast]);
    // Auto-remove after 4s
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
          className={`toast glass-card border px-4 py-3 rounded-xl text-sm font-medium text-[#F1F5F9] min-w-[280px] ${typeStyles[toast.type]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
