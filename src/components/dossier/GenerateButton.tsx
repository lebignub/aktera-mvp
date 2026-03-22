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

  const allFields = property.documents.flatMap((d) => d.fields);
  const verifiedFields = allFields.filter((f) => f.verified);
  const hasFields = allFields.length > 0;

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
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `compromis_${property.address.replace(/\s+/g, "_")}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("success", "Compromis succesvol gegenereerd");
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
      <div className="mt-8">
        <Button
          onClick={() => setShowVerify(true)}
          disabled={!hasFields || generating}
          size="lg"
          className="w-full"
        >
          {generating ? "Genereren..." : "Genereer Compromis"}
        </Button>
      </div>

      <Modal
        open={showVerify}
        onClose={() => setShowVerify(false)}
        title="Controleer voor generatie"
      >
        <div className="space-y-2 mb-6">
          {docReadiness.map((doc) => (
            <div
              key={doc.label}
              className="flex items-center gap-3 p-3.5 rounded-xl border border-[rgba(120,160,210,0.08)] bg-[rgba(8,14,28,0.3)]"
            >
              <span>{doc.icon}</span>
              <span className="text-[13px] text-white flex-1">{doc.label}</span>
              {doc.status === "missing" ? (
                <span className="text-[11px] text-[#576580]">Ontbreekt</span>
              ) : doc.ready ? (
                <span className="text-[11px] text-[#34D399]">&#10003; Klaar</span>
              ) : (
                <span className="text-[11px] text-[#FBBF24]">
                  {doc.verified}/{doc.total} geverifieerd
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="text-[11px] text-[#8B9BB8] mb-5 p-4 border border-[rgba(251,191,36,0.15)] bg-[rgba(251,191,36,0.04)] rounded-xl leading-relaxed">
          Dit document wordt automatisch gegenereerd op basis van geextraheerde gegevens.
          Controleer alle gegevens zorgvuldig voor gebruik. Aktera is niet aansprakelijk voor
          fouten in het gegenereerde document.
        </div>

        <div className="flex items-center justify-between text-[12px] text-[#8B9BB8] mb-5">
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
