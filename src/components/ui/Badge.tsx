"use client";

interface BadgeProps {
  variant: "success" | "warning" | "error" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

/* Restrained badges — just a dot + text, no colored backgrounds */
const variantStyles: Record<BadgeProps["variant"], { dot: string; text: string }> = {
  success: { dot: "bg-[#00D47E]", text: "text-[#00D47E]" },
  warning: { dot: "bg-[#FFB224]", text: "text-[#FFB224]" },
  error: { dot: "bg-[#FF4545]", text: "text-[#FF4545]" },
  info: { dot: "bg-white", text: "text-white" },
  neutral: { dot: "bg-[#666]", text: "text-[#666]" },
};

export function Badge({ variant, children, className = "" }: BadgeProps) {
  const style = variantStyles[variant];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[11px] font-medium ${style.text} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot}`} />
      {children}
    </span>
  );
}
