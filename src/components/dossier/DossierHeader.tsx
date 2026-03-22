"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { IconArrowLeft } from "@/components/ui/Icons";
import { computeCompletion } from "@/lib/documents/config";

interface DossierHeaderProps {
  property: Property;
}

export function DossierHeader({ property }: DossierHeaderProps) {
  const completion = computeCompletion(property.documents);
  const verified = property.documents.filter((d) => d.status === "verified").length;
  const total = property.documents.length;

  const statusBadge =
    completion === 100
      ? { variant: "success" as const, label: "Voltooid" }
      : verified > 0 || property.documents.some((d) => d.status !== "missing")
        ? { variant: "info" as const, label: "In behandeling" }
        : { variant: "neutral" as const, label: "Nieuw" };

  return (
    <div className="mb-6">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-[12px] text-[#52525B] hover:text-[#A1A1AA] transition-colors mb-4"
      >
        <IconArrowLeft size={13} />
        Dossiers
      </Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-lg font-semibold text-[#FAFAFA]">{property.address}</h1>
          <p className="text-[12px] text-[#52525B] mt-0.5">
            {property.postal_code} {property.city}
          </p>
        </div>
        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
      </div>

      <div className="mt-4 max-w-sm">
        <ProgressBar value={completion} className="mb-1.5" />
        <p className="text-[11px] text-[#52525B]">
          {verified}/{total} documenten geverifieerd
        </p>
      </div>
    </div>
  );
}
