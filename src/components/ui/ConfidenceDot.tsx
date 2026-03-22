"use client";

import type { ConfidenceLevel } from "@/lib/types";

interface ConfidenceDotProps {
  level: ConfidenceLevel;
  showLabel?: boolean;
}

/* Color-coded dots matching the design system palette */
const config: Record<ConfidenceLevel, { color: string; label: string }> = {
  high: { color: "bg-[#10B981]", label: "Hoog" },
  medium: { color: "bg-[#F59E0B]", label: "Gemiddeld" },
  low: { color: "bg-[#EF4444]", label: "Laag" },
};

export function ConfidenceDot({ level, showLabel = false }: ConfidenceDotProps) {
  const { color, label } = config[level];
  return (
    <span className="inline-flex items-center gap-1.5 shrink-0">
      <span className={`w-1.5 h-1.5 rounded-full ${color}`} title={`Betrouwbaarheid: ${label}`} />
      {showLabel && <span className="text-[11px] text-[#454D5E]">{label}</span>}
    </span>
  );
}
