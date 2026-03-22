"use client";

import type { DossierStats } from "@/lib/types";

interface KPIGridProps {
  stats: DossierStats;
}

interface KPICardProps {
  label: string;
  value: number;
  accent?: string;
}

function KPICard({ label, value, accent = "#EDF2F7" }: KPICardProps) {
  return (
    <div className="glass-card p-6 fade-in-up">
      <p className="text-[12px] uppercase tracking-[0.08em] text-[#576580] mb-2 font-medium">{label}</p>
      <p className="text-3xl font-bold tabular-nums tracking-tight" style={{ color: accent }}>
        {value}
      </p>
    </div>
  );
}

export function KPIGrid({ stats }: KPIGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard label="Totaal dossiers" value={stats.total} accent="#EDF2F7" />
      <KPICard label="Voltooid" value={stats.complete} accent="#34D399" />
      <KPICard label="In behandeling" value={stats.inProgress} accent="#7EB4FF" />
      <KPICard label="Nieuw" value={stats.pending} accent="#FBBF24" />
    </div>
  );
}
