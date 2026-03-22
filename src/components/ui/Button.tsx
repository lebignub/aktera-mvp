"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-[#3B82F6] text-white hover:bg-[#2563EB] active:bg-[#1D4ED8]",
  secondary:
    "bg-[#18181B] text-[#FAFAFA] border border-[#27272A] hover:bg-[#27272A] hover:border-[#3F3F46]",
  ghost:
    "text-[#A1A1AA] hover:text-[#FAFAFA] hover:bg-[#18181B]",
  danger:
    "bg-[#18181B] text-[#EF4444] border border-[#27272A] hover:bg-[#EF4444]/10 hover:border-[#EF4444]/30",
};

const sizeStyles: Record<string, string> = {
  sm: "h-7 px-3 text-xs rounded-md gap-1.5",
  md: "h-8 px-3.5 text-[13px] rounded-lg gap-2",
  lg: "h-9 px-4 text-[13px] rounded-lg gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-medium
          transition-colors duration-150 cursor-pointer
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
