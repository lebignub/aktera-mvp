"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  primary:
    "bg-accent text-accent-foreground hover:bg-accent-hover",
  secondary:
    "bg-transparent text-text-primary border border-[rgba(var(--t-contrast),0.14)] hover:border-[rgba(var(--t-contrast),0.3)] hover:bg-[rgba(var(--t-contrast),0.04)]",
  ghost:
    "text-text-secondary hover:text-text-primary hover:bg-[rgba(var(--t-contrast),0.04)]",
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
