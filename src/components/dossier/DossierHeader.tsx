"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { IconArrowLeft } from "@/components/ui/Icons";
import { computeCompletion } from "@/lib/documents/config";
import { useT } from "@/lib/i18n";

interface DossierHeaderProps {
  property: Property;
}

export function DossierHeader({ property }: DossierHeaderProps) {
  const t = useT();
  const completion = computeCompletion(property.documents);
  const verified = property.documents.filter((d) => d.status === "verified").length;
  const total = property.documents.length;

  const statusBadge =
    completion === 100
      ? { variant: "success" as const, label: t("status.complete") }
      : verified > 0 || property.documents.some((d) => d.status !== "missing")
        ? { variant: "info" as const, label: t("status.inProgress") }
        : { variant: "neutral" as const, label: t("status.new") };

  return (
    <div className="mb-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[12px] text-[#666] hover:text-white transition-colors mb-4"
      >
        <IconArrowLeft size={12} />
        {t("dossier.back")}
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[20px] font-semibold text-white tracking-[-0.02em]">{property.address}</h1>
          <p className="text-[12px] text-[#666] mt-0.5">
            {property.postal_code} {property.city}
          </p>
        </div>
        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
      </div>

      <div className="mt-4 max-w-xs">
        <ProgressBar value={completion} className="mb-1.5" />
        <p className="text-[11px] text-[#666]">
          {t("dossier.documentsVerified", { verified: String(verified), total: String(total) })}
        </p>
      </div>
    </div>
  );
}
