"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { computeCompletion } from "@/lib/documents/config";
import { useI18n } from "@/lib/i18n";

interface DossierCardProps {
  property: Property;
  index: number;
}

export function DossierCard({ property, index }: DossierCardProps) {
  const { locale, t } = useI18n();
  const completion = computeCompletion(property.documents);
  const uploaded = property.documents.filter((d) => d.status !== "missing").length;
  const verified = property.documents.filter((d) => d.status === "verified").length;
  const total = property.documents.length;

  const statusBadge =
    completion === 100
      ? { variant: "success" as const, label: t("status.complete") }
      : uploaded > 0
        ? { variant: "info" as const, label: t("status.inProgress") }
        : { variant: "neutral" as const, label: t("status.new") };

  // Date locale — nl-BE for Dutch, fr-BE for French
  const dateLocale = locale === "fr" ? "fr-BE" : "nl-BE";

  return (
    <Link href={`/dossier/${property.id}`}>
      <div
        className="card px-5 py-4 cursor-pointer group fade-in"
        style={{ animationDelay: `${index * 50}ms` }}
      >
        <div className="flex items-start justify-between gap-3 mb-1">
          <h3 className="text-[14px] font-medium text-white tracking-[-0.01em] group-hover:opacity-80 transition-opacity truncate">
            {property.address}
          </h3>
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        </div>

        <p className="text-[12px] text-[#666] mb-4">
          {property.postal_code} {property.city}
        </p>

        <ProgressBar value={completion} className="mb-2.5" />

        <div className="flex items-center justify-between text-[11px] text-[#666]">
          <span>{t("dossier.cardSummary", { uploaded: String(uploaded), total: String(total), verified: String(verified) })}</span>
          <span>
            {new Date(property.updated_at).toLocaleDateString(dateLocale, { day: "numeric", month: "short" })}
          </span>
        </div>
      </div>
    </Link>
  );
}
