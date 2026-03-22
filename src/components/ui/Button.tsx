"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-[#3B82F6] text-white hover:bg-[#2563EB] btn-glow",
  secondary:
    "bg-[#11151E] text-[#F0F2F5] border border-[rgba(255,255,255,0.06)] hover:border-[rgba(255,255,255,0.1)] hover:bg-[#161B26]",
  ghost:
    "text-[#7C8494] hover:text-[#F0F2F5] hover:bg-[rgba(255,255,255,0.04)]",
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3.5 text-[13px] rounded-lg gap-1.5",
  md: "h-9 px-4 text-[13px] rounded-lg gap-2",
  lg: "h-10 px-5 text-[14px] rounded-xl gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-semibold
          transition-all duration-200 cursor-pointer
          disabled:opacity-35 disabled:cursor-not-allowed disabled:pointer-events-none
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
