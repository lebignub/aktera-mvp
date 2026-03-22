"use client";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className = "", showLabel = true }: ProgressBarProps) {
  const barColor =
    value === 100
      ? "bg-[#34D399]"
      : value >= 50
        ? "bg-[#7EB4FF]"
        : value > 0
          ? "bg-[#FBBF24]"
          : "bg-[rgba(120,150,190,0.2)]";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-1.5 bg-[rgba(120,150,190,0.1)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full progress-bar-animated transition-all duration-500 ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] font-medium text-[#8B9BB8] tabular-nums w-9 text-right">
          {value}%
        </span>
      )}
    </div>
  );
}
