"use client";

interface BadgeProps {
  variant: "success" | "warning" | "error" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  success: "bg-[rgba(34,197,94,0.1)] text-[#22C55E]",
  warning: "bg-[rgba(234,179,8,0.1)] text-[#EAB308]",
  error: "bg-[rgba(239,68,68,0.1)] text-[#EF4444]",
  info: "bg-[rgba(59,130,246,0.1)] text-[#3B82F6]",
  neutral: "bg-[#18181B] text-[#52525B]",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center h-5 px-2 rounded text-[11px] font-medium ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
