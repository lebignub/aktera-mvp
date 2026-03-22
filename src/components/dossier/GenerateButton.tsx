"use client";

import { useState } from "react";
import type { Property } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { IconCheck, DOC_TYPE_ICONS, IconDocument } from "@/components/ui/Icons";
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

  /* Pre-generation readiness check per document type */
  const docReadiness = property.documents.map((doc) => {
    const config = DOCUMENT_CONFIGS[doc.type];
    const total = doc.fields.length;
    const verified = doc.fields.filter((f) => f.verified).length;
    return { type: doc.type, label: config.label, status: doc.status, total, verified, ready: doc.status === "verified" || (total > 0 && verified === total) };
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
        /* Download the generated .docx directly */
        const blob = await res.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `compromis_${property.address.replace(/\s+/g, "_")}.docx`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        showToast("success", "Compromis gegenereerd");
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
      {/* Generate CTA with separator and glow effect */}
      <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.06)]">
        <Button onClick={() => setShowVerify(true)} disabled={!hasFields || generating} size="md" className="w-full">
          {generating ? "Genereren..." : "Genereer Compromis"}
        </Button>
      </div>

      {/* Verification modal — shows readiness per document before generating */}
      <Modal open={showVerify} onClose={() => setShowVerify(false)} title="Controleer voor generatie">
        <div className="space-y-1 mb-5">
          {docReadiness.map((doc) => {
            const Icon = DOC_TYPE_ICONS[doc.type] || IconDocument;
            return (
              <div key={doc.label} className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[rgba(255,255,255,0.02)]">
                <Icon size={14} className="text-[#454D5E] shrink-0" />
                <span className="text-[13px] text-[#F0F2F5] flex-1">{doc.label}</span>
                {doc.status === "missing" ? (
                  <span className="text-[11px] text-[#454D5E]">Ontbreekt</span>
                ) : doc.ready ? (
                  <span className="flex items-center gap-1 text-[11px] text-[#10B981]">
                    <IconCheck size={12} /> Klaar
                  </span>
                ) : (
                  <span className="text-[11px] text-[#F59E0B]">{doc.verified}/{doc.total}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Legal disclaimer */}
        <div className="text-[11px] text-[#7C8494] mb-5 p-3 border border-[rgba(255,255,255,0.06)] bg-[rgba(255,255,255,0.02)] rounded-xl leading-relaxed">
          Dit document wordt automatisch gegenereerd. Controleer alle gegevens zorgvuldig voor gebruik. Aktera is niet aansprakelijk voor fouten.
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] text-[#454D5E]">{verifiedFields.length}/{allFields.length} velden geverifieerd</span>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setShowVerify(false)} size="sm">Annuleren</Button>
          <Button onClick={handleGenerate} disabled={!hasFields} size="sm">Genereren</Button>
        </div>
      </Modal>
    </>
  );
}
