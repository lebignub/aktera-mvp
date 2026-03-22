"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-white text-black hover:bg-[#E5E5E5]",
  secondary:
    "bg-transparent text-white border border-[rgba(255,255,255,0.14)] hover:border-[rgba(255,255,255,0.3)] hover:bg-[rgba(255,255,255,0.04)]",
  ghost:
    "text-[#999] hover:text-white hover:bg-[rgba(255,255,255,0.04)]",
};

const sizeStyles: Record<string, string> = {
  sm: "h-8 px-3 text-[13px] rounded-lg gap-1.5",
  md: "h-9 px-4 text-[13px] rounded-lg gap-2",
  lg: "h-10 px-5 text-[14px] rounded-lg gap-2",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center font-medium
          transition-all duration-150 cursor-pointer
          disabled:opacity-30 disabled:cursor-not-allowed disabled:pointer-events-none
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
