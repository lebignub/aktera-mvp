"use client";

interface BadgeProps {
  variant: "success" | "warning" | "error" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeProps["variant"], string> = {
  success: "bg-[rgba(52,211,153,0.1)] text-[#34D399] border-[rgba(52,211,153,0.2)]",
  warning: "bg-[rgba(251,191,36,0.1)] text-[#FBBF24] border-[rgba(251,191,36,0.2)]",
  error: "bg-[rgba(248,113,113,0.1)] text-[#F87171] border-[rgba(248,113,113,0.2)]",
  info: "bg-[rgba(126,180,255,0.1)] text-[#7EB4FF] border-[rgba(126,180,255,0.2)]",
  neutral: "bg-[rgba(120,150,190,0.08)] text-[#8B9BB8] border-[rgba(120,150,190,0.15)]",
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium border tracking-wide ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
