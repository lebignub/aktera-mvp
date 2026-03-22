"use client";

import type { ConfidenceLevel } from "@/lib/types";

interface ConfidenceDotProps {
  level: ConfidenceLevel;
  showLabel?: boolean;
}

const config: Record<ConfidenceLevel, { color: string; label: string }> = {
  high: { color: "bg-[#34D399]", label: "Hoog" },
  medium: { color: "bg-[#FBBF24]", label: "Gemiddeld" },
  low: { color: "bg-[#F87171]", label: "Laag" },
};

export function ConfidenceDot({ level, showLabel = false }: ConfidenceDotProps) {
  const { color, label } = config[level];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`w-1.5 h-1.5 rounded-full ${color}`}
        title={`Betrouwbaarheid: ${label}`}
      />
      {showLabel && (
        <span className="text-[11px] text-[#576580]">{label}</span>
      )}
    </span>
  );
}
