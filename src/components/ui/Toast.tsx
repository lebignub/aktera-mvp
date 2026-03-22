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
  success: "border-[#22C55E]/20 text-[#22C55E]",
  error: "border-[#EF4444]/20 text-[#EF4444]",
  info: "border-[#3B82F6]/20 text-[#3B82F6]",
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback((toast: ToastMessage) => {
    setToasts((prev) => [...prev, toast]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== toast.id));
    }, 3500);
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
          className={`toast bg-[#131316] border rounded-lg px-4 py-2.5 text-[13px] font-medium shadow-lg min-w-[240px] ${typeStyles[toast.type]}`}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
}
