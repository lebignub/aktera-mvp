"use client";

import type { DossierStats } from "@/lib/types";
import { useT } from "@/lib/i18n";

interface KPIGridProps {
  stats: DossierStats;
}

interface KPICardProps {
  label: string;
  value: number;
  delay: number;
}

function KPICard({ label, value, delay }: KPICardProps) {
  return (
    <div
      className="fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-[11px] text-text-muted font-medium tracking-[-0.01em] mb-2">{label}</p>
      <p className="text-[28px] font-semibold text-text-primary tabular-nums leading-none tracking-[-0.03em]">
        {value}
      </p>
    </div>
  );
}

export function KPIGrid({ stats }: KPIGridProps) {
  const t = useT();
  return (
    <div className="grid grid-cols-4 gap-8 py-6 border-y border-border">
      <KPICard label={t("kpi.total")} value={stats.total} delay={0} />
      <KPICard label={t("kpi.complete")} value={stats.complete} delay={50} />
      <KPICard label={t("kpi.inProgress")} value={stats.inProgress} delay={100} />
      <KPICard label={t("kpi.new")} value={stats.pending} delay={150} />
    </div>
  );
}
