"use client";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className = "", showLabel = true }: ProgressBarProps) {
  /* Color shifts from muted → warning → accent → success as completion increases */
  const barColor =
    value === 100
      ? "bg-[#10B981]"
      : value >= 50
        ? "bg-[#3B82F6]"
        : value > 0
          ? "bg-[#F59E0B]"
          : "bg-[rgba(255,255,255,0.04)]";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex-1 h-[3px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full progress-bar-animated ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] font-medium text-[#454D5E] tabular-nums w-8 text-right">
          {value}%
        </span>
      )}
    </div>
  );
}
