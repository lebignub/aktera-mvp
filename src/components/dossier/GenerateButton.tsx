"use client";

import { useState } from "react";
import type { Property } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { showToast } from "@/components/ui/Toast";

interface GenerateButtonProps {
  property: Property;
}

export function GenerateButton({ property }: GenerateButtonProps) {
  const [showVerify, setShowVerify] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Gather all fields across all documents
  const allFields = property.documents.flatMap((d) => d.fields);
  const verifiedFields = allFields.filter((f) => f.verified);
  const hasFields = allFields.length > 0;

  // Check readiness per document type
  const docReadiness = property.documents.map((doc) => {
    const config = DOCUMENT_CONFIGS[doc.type];
    const total = doc.fields.length;
    const verified = doc.fields.filter((f) => f.verified).length;
    return {
      label: config.label,
      icon: config.icon,
      status: doc.status,
      total,
      verified,
      ready: doc.status === "verified" || (total > 0 && verified === total),
    };
  });

  async function handleGenerate() {
    setGenerating(true);
    setShowVerify(false);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: property.id }),
      });

      if (res.ok) {
        // Download the generated .docx
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `compromis_${property.address.replace(/\s+/g, "_")}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("success", "Compromis succesvol gegenereerd!");
      } else {
        const data = await res.json().catch(() => ({ error: "Generatie mislukt" }));
        showToast("error", data.error || "Generatie mislukt");
      }
    } catch {
      showToast("error", "Netwerkfout bij generatie");
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      <Button
        onClick={() => setShowVerify(true)}
        disabled={!hasFields || generating}
        size="lg"
        className="w-full mt-6"
      >
        {generating ? "Genereren..." : "📝 Genereer Compromis"}
      </Button>

      {/* Pre-generation verification modal */}
      <Modal
        open={showVerify}
        onClose={() => setShowVerify(false)}
        title="Controleer voor generatie"
      >
        <div className="space-y-3 mb-6">
          {docReadiness.map((doc) => (
            <div
              key={doc.label}
              className="flex items-center gap-3 p-3 rounded-xl border border-[#1E293B] bg-[#0D1225]"
            >
              <span>{doc.icon}</span>
              <span className="text-sm text-[#F1F5F9] flex-1">{doc.label}</span>
              {doc.status === "missing" ? (
                <span className="text-xs text-[#64748B]">Ontbreekt</span>
              ) : doc.ready ? (
                <span className="text-xs text-[#22C55E]">✓ Klaar</span>
              ) : (
                <span className="text-xs text-[#F59E0B]">
                  {doc.verified}/{doc.total} geverifieerd
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-xs text-[#64748B] mb-4 p-3 border border-[#F59E0B]/20 bg-[#F59E0B]/5 rounded-xl">
          ⚠️ Dit document wordt automatisch gegenereerd op basis van geëxtraheerde gegevens.
          Controleer alle gegevens zorgvuldig voor gebruik. Aktera is niet aansprakelijk voor
          fouten in het gegenereerde document.
        </div>

        <div className="flex items-center justify-between text-sm text-[#94A3B8] mb-4">
          <span>{verifiedFields.length}/{allFields.length} velden geverifieerd</span>
        </div>

        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={() => setShowVerify(false)}>
            Annuleren
          </Button>
          <Button onClick={handleGenerate} disabled={!hasFields}>
            Genereer Compromis
          </Button>
        </div>
      </Modal>
    </>
  );
}
