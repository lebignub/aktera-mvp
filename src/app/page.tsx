"use client";

import { useState, useMemo } from "react";
import { getProperties, createProperty, isMockMode } from "@/lib/store";
import { computeCompletion } from "@/lib/documents/config";
import { Logo } from "@/components/ui/Logo";
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
    <div className="min-h-screen flex flex-col">
      {/* Mock mode banner */}
      {mockMode && (
        <div className="mock-banner">
          Demo-modus — data wordt lokaal opgeslagen
        </div>
      )}

      {/* Top navigation bar */}
      <header className="px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Logo size="md" />
          <Button onClick={() => setShowCreate(true)} size="md">
            Nieuw dossier
          </Button>
        </div>
        <div className="max-w-6xl mx-auto mt-5">
          <div className="separator" />
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 pb-12">
        {/* Page heading */}
        <div className="mt-8 mb-10">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Dashboard
          </h1>
          <p className="text-[14px] text-[#576580] mt-1.5">
            Beheer uw vastgoeddossiers
          </p>
        </div>

        {/* KPI Cards */}
        <KPIGrid stats={stats} />

        {/* Dossier List */}
        <section className="mt-10">
          <h2 className="text-[12px] uppercase tracking-[0.08em] font-medium text-[#8B9BB8] mb-5">
            Dossiers
          </h2>

          {properties.length === 0 ? (
            <div className="glass-card p-16 text-center">
              <p className="text-[#8B9BB8] text-lg mb-2">Nog geen dossiers</p>
              <p className="text-[#576580] text-sm mb-8">
                Maak uw eerste vastgoeddossier aan om te beginnen
              </p>
              <Button onClick={() => setShowCreate(true)}>
                Nieuw dossier aanmaken
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
      </main>

      <CreateDossierModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onCreate={handleCreate}
      />

      <ToastContainer />
    </div>
  );
}
