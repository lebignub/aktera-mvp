"use client";

import { useState, useMemo } from "react";
import { getProperties, createProperty, isMockMode } from "@/lib/store";
import { computeCompletion } from "@/lib/documents/config";
import { Sidebar } from "@/components/layout/Sidebar";
import { KPIGrid } from "@/components/dashboard/KPIGrid";
import { DossierCard } from "@/components/dashboard/DossierCard";
import { CreateDossierModal } from "@/components/dashboard/CreateDossierModal";
import { Button } from "@/components/ui/Button";
import { IconPlus } from "@/components/ui/Icons";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import type { Property, DossierStats, CreateDossierInput } from "@/lib/types";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>(() => getProperties());
  const [showCreate, setShowCreate] = useState(false);
  const mockMode = isMockMode();

  const stats: DossierStats = useMemo(() => {
    const total = properties.length;
    let complete = 0, inProgress = 0, pending = 0;
    for (const p of properties) {
      const c = computeCompletion(p.documents);
      if (c === 100) complete++;
      else if (p.documents.some((d) => d.status !== "missing")) inProgress++;
      else pending++;
    }
    return { total, complete, inProgress, pending };
  }, [properties]);

  function handleCreate(input: CreateDossierInput) {
    const newProp = createProperty(input);
    setProperties([newProp, ...properties.filter((p) => p.id !== newProp.id)]);
    showToast("success", `Dossier "${input.address}" aangemaakt`);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {mockMode && (
          <div className="mock-banner"><strong>Demo</strong> &mdash; data wordt lokaal opgeslagen</div>
        )}

        <main className="flex-1 px-10 py-8 max-w-[960px]">
          {/* Page header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-[22px] font-bold text-white tracking-tight">Dossiers</h1>
              <p className="text-[13px] text-[#454D5E] mt-1">Overzicht van uw vastgoeddossiers</p>
            </div>
            <Button onClick={() => setShowCreate(true)} size="md">
              <IconPlus size={14} />
              Nieuw dossier
            </Button>
          </div>

          {/* KPIs */}
          <KPIGrid stats={stats} />

          {/* Dossier list */}
          <div className="mt-8">
            <p className="text-[10px] uppercase tracking-[0.12em] text-[#454D5E] font-semibold mb-4">
              Alle dossiers
            </p>

            {properties.length === 0 ? (
              <div className="card p-14 text-center">
                <p className="text-[14px] text-[#7C8494] mb-1">Geen dossiers</p>
                <p className="text-[12px] text-[#454D5E] mb-6">Maak uw eerste dossier aan om te beginnen</p>
                <Button onClick={() => setShowCreate(true)} size="md">
                  <IconPlus size={14} />
                  Nieuw dossier
                </Button>
              </div>
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {properties.map((property, i) => (
                  <DossierCard key={property.id} property={property} index={i} />
                ))}
              </div>
            )}
          </div>
        </main>
      </div>

      <CreateDossierModal open={showCreate} onClose={() => setShowCreate(false)} onCreate={handleCreate} />
      <ToastContainer />
    </div>
  );
}
