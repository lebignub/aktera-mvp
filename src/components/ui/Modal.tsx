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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(0,0,0,0.7)] backdrop-blur-sm"
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <div className="bg-bg-elevated border border-border rounded-xl w-full max-w-md mx-4 p-6 fade-in">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em]">{title}</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text-primary transition-colors w-6 h-6 flex items-center justify-center rounded-md cursor-pointer text-lg leading-none"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
