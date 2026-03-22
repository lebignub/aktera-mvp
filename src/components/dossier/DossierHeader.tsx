"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
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
    <div className="glass-card p-6 mb-6 fade-in-up">
      <div className="flex items-start justify-between mb-4">
        <div>
          <Link
            href="/"
            className="text-xs text-[#4F8EFF] hover:text-[#6BA1FF] transition-colors mb-2 inline-block"
          >
            ← Terug naar dashboard
          </Link>
          <h1 className="text-2xl font-bold text-[#F1F5F9]">{property.address}</h1>
          <p className="text-sm text-[#64748B] mt-0.5">
            {property.postal_code} {property.city}
          </p>
        </div>
        <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
      </div>

      <ProgressBar value={completion} className="mb-2" />
      <div className="flex items-center gap-4 text-xs text-[#64748B]">
        <span>{verified}/{total} documenten geverifieerd</span>
        <span>
          Aangemaakt op{" "}
          {new Date(property.created_at).toLocaleDateString("nl-BE", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}
