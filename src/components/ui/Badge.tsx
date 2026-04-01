"use client";

interface BadgeProps {
  variant: "success" | "warning" | "error" | "info" | "neutral";
  children: React.ReactNode;
  className?: string;
}

/* Restrained badges — just a dot + text, no colored backgrounds */
const variantStyles: Record<BadgeProps["variant"], { dot: string; text: string }> = {
  success: { dot: "bg-success", text: "text-success" },
  warning: { dot: "bg-warning", text: "text-warning" },
  error: { dot: "bg-error", text: "text-error" },
  info: { dot: "bg-text-primary", text: "text-text-primary" },
  neutral: { dot: "bg-text-muted", text: "text-text-muted" },
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
