"use client";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className = "", showLabel = true }: ProgressBarProps) {
  const barColor =
    value === 100
      ? "bg-[#22C55E]"
      : value >= 50
        ? "bg-[#3B82F6]"
        : value > 0
          ? "bg-[#EAB308]"
          : "bg-[#27272A]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex-1 h-1 bg-[#18181B] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full progress-bar-animated ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] font-medium text-[#52525B] tabular-nums w-8 text-right">
          {value}%
        </span>
      )}
    </div>
  );
}
