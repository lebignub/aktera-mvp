"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { computeCompletion } from "@/lib/documents/config";

interface DossierCardProps {
  property: Property;
}

export function DossierCard({ property }: DossierCardProps) {
  const completion = computeCompletion(property.documents);
  const uploaded = property.documents.filter((d) => d.status !== "missing").length;
  const verified = property.documents.filter((d) => d.status === "verified").length;
  const total = property.documents.length;

  const statusBadge =
    completion === 100
      ? { variant: "success" as const, label: "Voltooid" }
      : uploaded > 0
        ? { variant: "info" as const, label: "In behandeling" }
        : { variant: "neutral" as const, label: "Nieuw" };

  return (
    <Link href={`/dossier/${property.id}`}>
      <div className="bg-[#131316] border border-[#1E1E21] rounded-xl p-5 hover:border-[#27272A] hover:bg-[#18181B] transition-colors cursor-pointer group">
        <div className="flex items-start justify-between mb-3">
          <div>
            <h3 className="text-[13px] font-semibold text-[#FAFAFA] group-hover:text-white">
              {property.address}
            </h3>
            <p className="text-[12px] text-[#52525B] mt-0.5">
              {property.postal_code} {property.city}
            </p>
          </div>
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        </div>

        <ProgressBar value={completion} className="mb-3" />

        <div className="flex items-center justify-between text-[11px] text-[#52525B]">
          <span>{uploaded}/{total} documenten &middot; {verified} geverifieerd</span>
          <span>
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
