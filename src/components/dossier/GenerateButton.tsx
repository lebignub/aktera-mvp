"use client";

import { useState } from "react";
import type { Property } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { IconCheck, DOC_TYPE_ICONS, IconDocument } from "@/components/ui/Icons";
import { showToast } from "@/components/ui/Toast";
import { getTemplates, markTemplateUsed } from "@/lib/store";
import type { Template } from "@/lib/types";

interface GenerateButtonProps {
  property: Property;
}

export function GenerateButton({ property }: GenerateButtonProps) {
  const [showVerify, setShowVerify] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Template selection — default to most recently used, then first available
  const templates = getTemplates().filter((t) => t.type === "compromis");
  const defaultTemplate = templates.sort((a, b) => {
    // Most recently used first, then most recently uploaded
    if (a.last_used_at && !b.last_used_at) return -1;
    if (!a.last_used_at && b.last_used_at) return 1;
    if (a.last_used_at && b.last_used_at) return b.last_used_at.localeCompare(a.last_used_at);
    return b.uploaded_at.localeCompare(a.uploaded_at);
  })[0];
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(defaultTemplate?.id ?? "");

  const allFields = property.documents.flatMap((d) => d.fields);
  const verifiedFields = allFields.filter((f) => f.verified);
  const hasFields = allFields.length > 0;

  const docReadiness = property.documents.map((doc) => {
    const config = DOCUMENT_CONFIGS[doc.type];
    const total = doc.fields.length;
    const verified = doc.fields.filter((f) => f.verified).length;
    return { type: doc.type, label: config.label, status: doc.status, total, verified, ready: doc.status === "verified" || (total > 0 && verified === total) };
  });

  async function handleGenerate() {
    setGenerating(true);
    setShowVerify(false);
    // Mark the selected template as used so it becomes the default next time
    if (selectedTemplateId) markTemplateUsed(selectedTemplateId);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: property.id, template_id: selectedTemplateId || undefined }),
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
      <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.1)]">
        <Button onClick={() => setShowVerify(true)} disabled={!hasFields || generating} size="md" className="w-full">
          {generating ? "Genereren..." : "Genereer Compromis"}
        </Button>
      </div>

      <Modal open={showVerify} onClose={() => setShowVerify(false)} title="Controleer voor generatie">
        <div className="space-y-px mb-5">
          {docReadiness.map((doc) => {
            const Icon = DOC_TYPE_ICONS[doc.type] || IconDocument;
            return (
              <div key={doc.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(255,255,255,0.02)]">
                <Icon size={13} className="text-[#666] shrink-0" />
                <span className="text-[13px] text-white flex-1">{doc.label}</span>
                {doc.status === "missing" ? (
                  <span className="text-[11px] text-[#666]">Ontbreekt</span>
                ) : doc.ready ? (
                  <span className="flex items-center gap-1 text-[11px] text-[#00D47E]">
                    <IconCheck size={11} /> Klaar
                  </span>
                ) : (
                  <span className="text-[11px] text-[#FFB224]">{doc.verified}/{doc.total}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Template picker */}
        {templates.length > 0 && (
          <div className="mb-5">
            <label className="block text-[11px] text-[#666] font-medium mb-2">Template</label>
            <div className="space-y-1">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                    ${selectedTemplateId === tpl.id
                      ? "bg-[rgba(255,255,255,0.08)] border border-[rgba(255,255,255,0.2)]"
                      : "border border-transparent hover:bg-[rgba(255,255,255,0.03)]"
                    }
                  `}
                >
                  <IconDocument size={13} className="text-[#666] shrink-0" />
                  <span className="text-[13px] text-white flex-1 truncate">{tpl.name}</span>
                  {selectedTemplateId === tpl.id && (
                    <IconCheck size={12} className="text-[#00D47E] shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-[11px] text-[#666] mb-5 p-3 border border-[rgba(255,255,255,0.1)] rounded-lg leading-relaxed">
          Dit document wordt automatisch gegenereerd. Controleer alle gegevens zorgvuldig voor gebruik. Aktera is niet aansprakelijk voor fouten.
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] text-[#666]">{verifiedFields.length}/{allFields.length} velden geverifieerd</span>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setShowVerify(false)} size="sm">Annuleren</Button>
          <Button onClick={handleGenerate} disabled={!hasFields} size="sm">Genereren</Button>
        </div>
      </Modal>
    </>
  );
}
