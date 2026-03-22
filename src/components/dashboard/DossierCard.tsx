"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { computeCompletion } from "@/lib/documents/config";

interface DossierCardProps {
  property: Property;
  index: number;
}

export function DossierCard({ property, index }: DossierCardProps) {
  const completion = computeCompletion(property.documents);

  // Count document statuses
  const uploaded = property.documents.filter((d) => d.status !== "missing").length;
  const verified = property.documents.filter((d) => d.status === "verified").length;
  const total = property.documents.length;

  // Determine overall status
  const statusBadge =
    completion === 100
      ? { variant: "success" as const, label: "Voltooid" }
      : uploaded > 0
        ? { variant: "info" as const, label: "In behandeling" }
        : { variant: "neutral" as const, label: "Nieuw" };

  return (
    <Link href={`/dossier/${property.id}`}>
      <div
        className="glass-card glass-card-hover p-5 cursor-pointer fade-in-up"
        style={{ animationDelay: `${index * 80}ms`, animationFillMode: "backwards" }}
      >
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[#F1F5F9] text-base">{property.address}</h3>
            <p className="text-sm text-[#64748B] mt-0.5">
              {property.postal_code} {property.city}
            </p>
          </div>
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        </div>

        <ProgressBar value={completion} className="mb-3" />

        <div className="flex items-center gap-4 text-xs text-[#64748B]">
          <span>{uploaded}/{total} documenten</span>
          <span>{verified} geverifieerd</span>
          <span className="ml-auto">
            {new Date(property.updated_at).toLocaleDateString("nl-BE", {
              day: "numeric",
              month: "short",
            })}
          </span>
        </div>
      </div>
    </Link>
  );
}
