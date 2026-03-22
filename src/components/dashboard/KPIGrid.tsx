"use client";

import type { DossierStats } from "@/lib/types";

interface KPIGridProps {
  stats: DossierStats;
}

interface KPICardProps {
  label: string;
  value: number;
  color?: string;
}

function KPICard({ label, value, color = "#FAFAFA" }: KPICardProps) {
  return (
    <div className="bg-[#131316] border border-[#1E1E21] rounded-xl p-5 fade-in">
      <p className="text-[11px] text-[#52525B] font-medium mb-1.5">{label}</p>
      <p className="text-2xl font-semibold tabular-nums" style={{ color }}>{value}</p>
    </div>
  );
}

export function KPIGrid({ stats }: KPIGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <KPICard label="Totaal" value={stats.total} />
      <KPICard label="Voltooid" value={stats.complete} color="#22C55E" />
      <KPICard label="In behandeling" value={stats.inProgress} color="#3B82F6" />
      <KPICard label="Nieuw" value={stats.pending} color="#EAB308" />
    </div>
  );
}
