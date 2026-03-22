"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-[#4F8EFF] text-white hover:bg-[#6BA1FF] active:bg-[#3B7AE8] shadow-[0_0_20px_rgba(79,142,255,0.15)]",
  secondary:
    "bg-[#1E293B] text-[#F1F5F9] border border-[#334155] hover:bg-[#334155] hover:border-[#4F8EFF]/30",
  ghost:
    "text-[#94A3B8] hover:text-[#F1F5F9] hover:bg-[#1E293B]/50",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3 py-1.5 text-xs rounded-lg",
  md: "px-4 py-2 text-sm rounded-xl",
  lg: "px-6 py-3 text-sm rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center gap-2 font-semibold
          transition-all duration-200 cursor-pointer
          disabled:opacity-40 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
