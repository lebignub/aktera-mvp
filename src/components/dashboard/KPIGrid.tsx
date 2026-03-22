"use client";

import type { DossierStats } from "@/lib/types";

interface KPIGridProps {
  stats: DossierStats;
}

interface KPICardProps {
  label: string;
  value: number;
  icon: string;
  accent?: string;
}

function KPICard({ label, value, icon, accent = "#4F8EFF" }: KPICardProps) {
  return (
    <div className="glass-card p-5 fade-in-up">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-[#64748B] mb-1">{label}</p>
          <p className="text-3xl font-bold tabular-nums" style={{ color: accent }}>
            {value}
          </p>
        </div>
        <span className="text-2xl opacity-60">{icon}</span>
      </div>
    </div>
  );
}

export function KPIGrid({ stats }: KPIGridProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <KPICard label="Totaal dossiers" value={stats.total} icon="📁" accent="#F1F5F9" />
      <KPICard label="Voltooid" value={stats.complete} icon="✅" accent="#22C55E" />
      <KPICard label="In behandeling" value={stats.inProgress} icon="⏳" accent="#4F8EFF" />
      <KPICard label="Nieuw" value={stats.pending} icon="📋" accent="#F59E0B" />
    </div>
  );
}
