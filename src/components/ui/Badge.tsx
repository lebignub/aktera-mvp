"use client";

interface BadgeProps {
  variant: "success" | "warning" | "error" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  success: "bg-[#22C55E]/15 text-[#22C55E] border-[#22C55E]/20",
  warning: "bg-[#F59E0B]/15 text-[#F59E0B] border-[#F59E0B]/20",
  error: "bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/20",
  info: "bg-[#4F8EFF]/15 text-[#4F8EFF] border-[#4F8EFF]/20",
  neutral: "bg-[#334155]/40 text-[#94A3B8] border-[#334155]/60",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
