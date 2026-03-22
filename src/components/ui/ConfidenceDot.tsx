"use client";

import type { ConfidenceLevel } from "@/lib/types";

interface ConfidenceDotProps {
  level: ConfidenceLevel;
  showLabel?: boolean;
}

const config: Record<ConfidenceLevel, { color: string; label: string }> = {
  high: { color: "bg-[#22C55E]", label: "Hoog" },
  medium: { color: "bg-[#F59E0B]", label: "Gemiddeld" },
  low: { color: "bg-[#EF4444]", label: "Laag" },
};

export function ConfidenceDot({ level, showLabel = false }: ConfidenceDotProps) {
  const { color, label } = config[level];
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className={`w-2 h-2 rounded-full ${color}`}
        title={`Betrouwbaarheid: ${label}`}
      />
      {showLabel && (
        <span className="text-xs text-[#64748B]">{label}</span>
      )}
    </span>
  );
}
