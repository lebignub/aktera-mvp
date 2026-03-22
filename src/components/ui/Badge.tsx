"use client";

interface BadgeProps {
  variant: "success" | "warning" | "error" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  success: "bg-[rgba(16,185,129,0.1)] text-[#10B981] border-[rgba(16,185,129,0.15)]",
  warning: "bg-[rgba(245,158,11,0.1)] text-[#F59E0B] border-[rgba(245,158,11,0.15)]",
  error: "bg-[rgba(239,68,68,0.1)] text-[#EF4444] border-[rgba(239,68,68,0.15)]",
  info: "bg-[rgba(59,130,246,0.1)] text-[#3B82F6] border-[rgba(59,130,246,0.15)]",
  neutral: "bg-[rgba(255,255,255,0.04)] text-[#454D5E] border-[rgba(255,255,255,0.04)]",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center h-[22px] px-2 rounded-md text-[11px] font-semibold border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
