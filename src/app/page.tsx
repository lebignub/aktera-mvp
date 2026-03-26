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
import { useT } from "@/lib/i18n";
import type { Property, DossierStats, CreateDossierInput } from "@/lib/types";

export default function Dashboard() {
  const [properties, setProperties] = useState<Property[]>(() => getProperties());
  const [showCreate, setShowCreate] = useState(false);
  const mockMode = isMockMode();
  const t = useT();

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
    showToast("success", t("dashboard.dossierCreated", { address: input.address }));
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {mockMode && (
          <div className="mock-banner"><strong>Demo</strong> &mdash; {t("mock.banner").replace("Demo — ", "")}</div>
        )}

        <main className="flex-1 px-10 py-8">
          {/* Page header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-[20px] font-semibold text-white tracking-[-0.02em]">{t("dashboard.title")}</h1>
              <p className="text-[13px] text-[#666] mt-1 tracking-[-0.01em]">{t("dashboard.subtitle")}</p>
            </div>
            <Button onClick={() => setShowCreate(true)} size="md">
              <IconPlus size={13} />
              {t("dashboard.newDossier")}
            </Button>
          </div>

          {/* KPIs */}
          <KPIGrid stats={stats} />

          {/* Dossier list */}
          <div className="mt-8">
            {properties.length === 0 ? (
              <div className="border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl py-16 text-center">
                <p className="text-[14px] text-[#999] mb-1">{t("dashboard.noDossiers")}</p>
                <p className="text-[12px] text-[#666] mb-6">{t("dashboard.noDossiersHint")}</p>
                <Button onClick={() => setShowCreate(true)} size="md">
                  <IconPlus size={13} />
                  {t("dashboard.newDossier")}
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
