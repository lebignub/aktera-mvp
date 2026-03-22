"use client";

import Link from "next/link";
import type { Property } from "@/lib/types";
import { Logo } from "@/components/ui/Logo";
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
    <>
      {/* Top bar */}
      <header className="px-8 py-5 -mx-8">
        <div className="flex items-center justify-between">
          <Link href="/">
            <Logo size="md" />
          </Link>
          <Badge variant={statusBadge.variant}>{statusBadge.label}</Badge>
        </div>
        <div className="mt-5 separator" />
      </header>

      {/* Dossier info */}
      <div className="mb-8 mt-4 fade-in-up">
        <Link
          href="/"
          className="text-[12px] uppercase tracking-[0.08em] text-[#576580] hover:text-[#8B9BB8] transition-colors mb-4 inline-block font-medium"
        >
          ← Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white tracking-tight">{property.address}</h1>
        <p className="text-[14px] text-[#576580] mt-1">
          {property.postal_code} {property.city}
        </p>

        <div className="mt-5 max-w-md">
          <ProgressBar value={completion} className="mb-2" />
          <div className="flex items-center gap-4 text-[11px] text-[#576580] tracking-wide">
            <span>{verified}/{total} documenten geverifieerd</span>
            <span>
              Aangemaakt{" "}
              {new Date(property.created_at).toLocaleDateString("nl-BE", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
