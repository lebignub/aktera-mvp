"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { Badge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { IconFolder } from "@/components/ui/Icons";
import { computeCompletion } from "@/lib/documents/config";

interface DossierCardProps {
  property: Property;
  index: number;
}

export function DossierCard({ property, index }: DossierCardProps) {
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
      <div
        className="card p-5 cursor-pointer group fade-in"
        style={{ animationDelay: `${index * 60}ms` }}
      >
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
            completion === 100
              ? "bg-[rgba(16,185,129,0.08)] text-[#10B981]"
              : uploaded > 0
                ? "bg-[rgba(59,130,246,0.08)] text-[#3B82F6]"
                : "bg-[rgba(255,255,255,0.03)] text-[#454D5E]"
          }`}>
            <IconFolder size={18} />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-3 mb-1">
              <h3 className="text-[14px] font-semibold text-[#F0F2F5] group-hover:text-white transition-colors truncate">
                {property.address}
              </h3>
              <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
            </div>

            <p className="text-[12px] text-[#454D5E] mb-3">
              {property.postal_code} {property.city}
            </p>

            <ProgressBar value={completion} className="mb-2" />

            <div className="flex items-center justify-between text-[11px] text-[#454D5E]">
              <span>{uploaded}/{total} documenten &middot; {verified} geverifieerd</span>
              <span>
                {new Date(property.updated_at).toLocaleDateString("nl-BE", { day: "numeric", month: "short" })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
