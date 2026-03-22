"use client";

import { useState, useMemo } from "react";
import { getProperties, createProperty, isMockMode } from "@/lib/store";
import { computeCompletion } from "@/lib/documents/config";
import { KPIGrid } from "@/components/dashboard/KPIGrid";
import { DossierCard } from "@/components/dashboard/DossierCard";
import { CreateDossierModal } from "@/components/dashboard/CreateDossierModal";
import { Button } from "@/components/ui/Button";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import type { Property, DossierStats, CreateDossierInput } from "@/lib/types";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>(() => getProperties());
  const [showCreate, setShowCreate] = useState(false);
  const mockMode = isMockMode();

  // Compute KPI stats from properties
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
    <div className="min-h-screen">
      {/* Mock mode banner */}
      {mockMode && (
        <div className="mock-banner">
          Demo-modus — data wordt lokaal opgeslagen. Configureer Supabase voor productie.
        </div>
      )}

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#F1F5F9] tracking-tight">
              <span className="text-[#4F8EFF]">Aktera</span> Dashboard
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              Beheer uw vastgoeddossiers
            </p>
          </div>
          <Button onClick={() => setShowCreate(true)} size="lg">
            + Nieuw dossier
          </Button>
        </header>

        {/* KPI Cards */}
        <KPIGrid stats={stats} />

        {/* Dossier List */}
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-[#F1F5F9] mb-4">
            Dossiers
          </h2>

          {properties.length === 0 ? (
            <div className="glass-card p-12 text-center">
              <p className="text-[#64748B] text-lg mb-2">Nog geen dossiers</p>
              <p className="text-[#4B5563] text-sm mb-6">
                Maak uw eerste vastgoeddossier aan om te beginnen
              </p>
              <Button onClick={() => setShowCreate(true)}>
                + Nieuw dossier aanmaken
              </Button>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {properties.map((property, i) => (
                <DossierCard key={property.id} property={property} index={i} />
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Create modal */}
      <CreateDossierModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />

      <ToastContainer />
    </div>
  );
}
