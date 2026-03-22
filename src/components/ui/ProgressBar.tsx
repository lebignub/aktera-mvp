"use client";

interface ProgressBarProps {
  value: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ value, className = "", showLabel = true }: ProgressBarProps) {
  /* White fill, green when complete */
  const barColor = value === 100 ? "bg-[#00D47E]" : "bg-white";

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className="flex-1 h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full progress-bar-animated ${barColor}`}
          style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-[11px] font-medium text-[#555] tabular-nums w-7 text-right">
          {value}%
        </span>
      )}
    </div>
  );
}
