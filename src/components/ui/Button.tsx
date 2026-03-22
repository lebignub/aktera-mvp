"use client";

import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
}

const variantStyles: Record<string, string> = {
  // Outlined pill — the signature Aktera button style
  primary:
    "border border-[rgba(200,215,235,0.35)] text-white hover:bg-[rgba(200,215,235,0.08)] hover:border-[rgba(200,215,235,0.5)] active:bg-[rgba(200,215,235,0.12)]",
  // Subtle filled for secondary actions
  secondary:
    "bg-[rgba(45,65,100,0.3)] text-[#C8D7EB] border border-[rgba(120,160,210,0.12)] hover:bg-[rgba(55,80,115,0.35)] hover:border-[rgba(120,160,210,0.2)]",
  ghost:
    "text-[#8B9BB8] hover:text-white hover:bg-[rgba(120,160,210,0.08)]",
  // Solid accent for key CTAs
  outline:
    "border border-[rgba(126,180,255,0.3)] text-[#7EB4FF] hover:bg-[rgba(126,180,255,0.08)] hover:border-[rgba(126,180,255,0.5)]",
};

const sizeStyles: Record<string, string> = {
  sm: "px-3.5 py-1.5 text-xs rounded-full",
  md: "px-5 py-2 text-sm rounded-full",
  lg: "px-7 py-2.5 text-sm rounded-full",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = "primary", size = "md", className = "", disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={`
          inline-flex items-center justify-center gap-2 font-medium
          transition-all duration-200 cursor-pointer tracking-wide
          disabled:opacity-35 disabled:cursor-not-allowed
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
