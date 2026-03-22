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
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={backdropRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(4,6,10,0.75)] backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="bg-[#0C1017] border border-[rgba(255,255,255,0.06)] rounded-2xl w-full max-w-md mx-4 p-6 fade-in shadow-[0_24px_64px_rgba(0,0,0,0.5)]">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[14px] font-semibold text-white">{title}</h2>
          <button
            onClick={onClose}
            className="text-[#454D5E] hover:text-[#7C8494] transition-colors w-7 h-7 flex items-center justify-center rounded-lg hover:bg-[rgba(255,255,255,0.04)] cursor-pointer text-lg leading-none"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
