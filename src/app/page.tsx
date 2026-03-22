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
    let complete = 0;
    let inProgress = 0;
    let pending = 0;

    for (const p of properties) {
      const completion = computeCompletion(p.documents);
      if (completion === 100) complete++;
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
          <div className="mock-banner"><span>Demo</span> — data wordt lokaal opgeslagen</div>
        )}

        <main className="flex-1 px-8 py-6 max-w-5xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-lg font-semibold text-[#FAFAFA]">Dossiers</h1>
              <p className="text-[12px] text-[#52525B] mt-0.5">Beheer uw vastgoeddossiers</p>
            </div>
            <Button onClick={() => setShowCreate(true)} size="sm">
              <IconPlus size={14} />
              Nieuw dossier
            </Button>
          </div>

          {/* KPIs */}
          <KPIGrid stats={stats} />

          {/* List */}
          <div className="mt-6">
            {properties.length === 0 ? (
              <div className="border border-[#1E1E21] border-dashed rounded-xl p-12 text-center">
                <p className="text-[13px] text-[#52525B] mb-4">Nog geen dossiers aangemaakt</p>
                <Button onClick={() => setShowCreate(true)} size="sm">
                  <IconPlus size={14} />
                  Nieuw dossier
                </Button>
              </div>
            ) : (
              <div className="grid gap-3 lg:grid-cols-2">
                {properties.map((property) => (
                  <DossierCard key={property.id} property={property} />
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
