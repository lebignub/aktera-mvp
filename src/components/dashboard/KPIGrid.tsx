"use client";

import type { DossierStats } from "@/lib/types";

interface KPIGridProps {
  stats: DossierStats;
}

interface KPICardProps {
  label: string;
  value: number;
  color: string;
  delay: number;
  accent?: boolean;
}

function KPICard({ label, value, color, delay, accent }: KPICardProps) {
  return (
    <div
      className={`rounded-xl p-5 count-up ${accent ? "card-accent" : "card"}`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-[11px] text-[#454D5E] font-medium tracking-wide mb-3">{label}</p>
      <p className="text-[32px] font-bold tabular-nums leading-none tracking-tight" style={{ color }}>
        {value}
      </p>
    </div>
  );
}

export function KPIGrid({ stats }: KPIGridProps) {
  return (
    <div className="grid grid-cols-4 gap-3">
      <KPICard label="Totaal dossiers" value={stats.total} color="#F0F2F5" delay={0} />
      <KPICard label="Voltooid" value={stats.complete} color="#10B981" delay={60} />
      <KPICard label="In behandeling" value={stats.inProgress} color="#3B82F6" delay={120} accent />
      <KPICard label="Nieuw" value={stats.pending} color="#F59E0B" delay={180} />
    </div>
  );
}
