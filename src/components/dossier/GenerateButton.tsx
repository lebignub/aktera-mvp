"use client";

import { useState } from "react";
import type { Property } from "@/lib/types";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { IconCheck, DOC_TYPE_ICONS, IconDocument } from "@/components/ui/Icons";
import { showToast } from "@/components/ui/Toast";
import { getTemplates, markTemplateUsed } from "@/lib/store";
import { useT } from "@/lib/i18n";
import type { Template } from "@/lib/types";

interface GenerateButtonProps {
  property: Property;
}

export function GenerateButton({ property }: GenerateButtonProps) {
  const t = useT();
  const [showVerify, setShowVerify] = useState(false);
  const [generating, setGenerating] = useState(false);

  // Template selection — default to most recently used, then first available
  const templates = getTemplates().filter((t) => t.type === "compromis");
  const defaultTemplate = templates.sort((a, b) => {
    if (a.last_used_at && !b.last_used_at) return -1;
    if (!a.last_used_at && b.last_used_at) return 1;
    if (a.last_used_at && b.last_used_at) return b.last_used_at.localeCompare(a.last_used_at);
    return b.uploaded_at.localeCompare(a.uploaded_at);
  })[0];
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(defaultTemplate?.id ?? "");

  const allFields = property.documents.flatMap((d) => d.fields);
  const verifiedFields = allFields.filter((f) => f.verified);
  const hasFields = allFields.length > 0;

  // Check party info completeness
  const hasParties = property.parties && property.parties.length > 0;
  const hasSeller = property.parties?.some((p) => p.role === "seller" && p.last_name);
  const hasBuyer = property.parties?.some((p) => p.role === "buyer" && p.last_name);

  const docReadiness = property.documents.map((doc) => {
    const config = DOCUMENT_CONFIGS[doc.type];
    const total = doc.fields.length;
    const verified = doc.fields.filter((f) => f.verified).length;
    return { type: doc.type, label: config.label, status: doc.status, total, verified, ready: doc.status === "verified" || (total > 0 && verified === total) };
  });

  async function handleGenerate() {
    setGenerating(true);
    setShowVerify(false);
    if (selectedTemplateId) markTemplateUsed(selectedTemplateId);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: property.id,
          template_id: selectedTemplateId || undefined,
          // Pass party data for template filling
          parties: property.parties || [],
        }),
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
        showToast("success", t("generate.success"));
      } else {
        const data = await res.json().catch(() => ({ error: t("generate.error") }));
        showToast("error", data.error || t("generate.error"));
      }
    } catch {
      showToast("error", t("generate.networkError"));
    } finally {
      setGenerating(false);
    }
  }

  return (
    <>
      <div className="mt-6 pt-5 border-t border-[rgba(var(--t-contrast),0.1)]">
        <Button onClick={() => setShowVerify(true)} disabled={!hasFields || generating} size="md" className="w-full">
          {generating ? t("generate.generating") : t("generate.button")}
        </Button>
      </div>

      <Modal open={showVerify} onClose={() => setShowVerify(false)} title={t("generate.modalTitle")}>
        {/* Document readiness */}
        <div className="space-y-px mb-5">
          {docReadiness.map((doc) => {
            const Icon = DOC_TYPE_ICONS[doc.type] || IconDocument;
            return (
              <div key={doc.label} className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-[rgba(var(--t-contrast),0.02)]">
                <Icon size={13} className="text-text-muted shrink-0" />
                <span className="text-[13px] text-text-primary flex-1">{doc.label}</span>
                {doc.status === "missing" ? (
                  <span className="text-[11px] text-text-muted">{t("generate.missingDoc")}</span>
                ) : doc.ready ? (
                  <span className="flex items-center gap-1 text-[11px] text-success">
                    <IconCheck size={11} /> {t("generate.ready")}
                  </span>
                ) : (
                  <span className="text-[11px] text-warning">{doc.verified}/{doc.total}</span>
                )}
              </div>
            );
          })}
        </div>

        {/* Party info status */}
        <div className="mb-5 p-3 border border-[rgba(var(--t-contrast),0.1)] rounded-lg">
          <p className="text-[11px] font-medium text-text-secondary mb-2 uppercase tracking-[0.05em]">{t("party.title")}</p>
          <div className="flex items-center gap-4">
            <span className={`flex items-center gap-1 text-[11px] ${hasSeller ? "text-success" : "text-text-muted"}`}>
              {hasSeller && <IconCheck size={10} />} {t("party.seller")}
            </span>
            <span className={`flex items-center gap-1 text-[11px] ${hasBuyer ? "text-success" : "text-text-muted"}`}>
              {hasBuyer && <IconCheck size={10} />} {t("party.buyer")}
            </span>
          </div>
          {!hasParties && (
            <p className="text-[10px] text-warning mt-1.5">{t("party.title")} — {t("generate.missingDoc").toLowerCase()}</p>
          )}
        </div>

        {/* Template picker */}
        {templates.length > 0 && (
          <div className="mb-5">
            <label className="block text-[11px] text-text-muted font-medium mb-2">{t("generate.templateLabel")}</label>
            <div className="space-y-1">
              {templates.map((tpl) => (
                <button
                  key={tpl.id}
                  onClick={() => setSelectedTemplateId(tpl.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors
                    ${selectedTemplateId === tpl.id
                      ? "bg-[rgba(var(--t-contrast),0.08)] border border-border-hover"
                      : "border border-transparent hover:bg-[rgba(var(--t-contrast),0.03)]"
                    }
                  `}
                >
                  <IconDocument size={13} className="text-text-muted shrink-0" />
                  <span className="text-[13px] text-text-primary flex-1 truncate">{tpl.name}</span>
                  {selectedTemplateId === tpl.id && (
                    <IconCheck size={12} className="text-success shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-[11px] text-text-muted mb-5 p-3 border border-[rgba(var(--t-contrast),0.1)] rounded-lg leading-relaxed">
          {t("generate.disclaimer")}
        </div>

        <div className="flex items-center justify-between mb-4">
          <span className="text-[11px] text-text-muted">{t("generate.fieldsVerified", { verified: verifiedFields.length, total: allFields.length })}</span>
        </div>

        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={() => setShowVerify(false)} size="sm">{t("generate.cancel")}</Button>
          <Button onClick={handleGenerate} disabled={!hasFields} size="sm">{t("generate.confirm")}</Button>
        </div>
      </Modal>
    </>
  );
}
