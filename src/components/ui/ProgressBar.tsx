"use client";

interface ProgressBarProps {
  value: number; // 0-100
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className = "", showLabel = true }: ProgressBarProps) {
  // Color changes based on progress
  const barColor =
    value === 100
      ? "bg-[#22C55E]"
      : value >= 50
        ? "bg-[#4F8EFF]"
        : value > 0
          ? "bg-[#F59E0B]"
          : "bg-[#334155]";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-1 h-2 bg-[#1E293B] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full progress-bar-animated transition-all duration-500 ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-[#94A3B8] tabular-nums w-9 text-right">
          {value}%
        </span>
      )}
    </div>
  );
}
