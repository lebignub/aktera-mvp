"use client";

import { useEffect, useRef } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-40 flex items-center justify-center bg-[rgba(4,6,12,0.7)] backdrop-blur-md"
      onClick={(e) => {
        if (e.target === backdropRef.current) onClose();
      }}
    >
      <div className="glass-card w-full max-w-lg mx-4 p-7 fade-in-up border border-[rgba(120,160,210,0.15)]">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-white tracking-tight">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#576580] hover:text-white transition-colors text-xl leading-none cursor-pointer w-8 h-8 flex items-center justify-center rounded-full hover:bg-[rgba(120,160,210,0.1)]"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
