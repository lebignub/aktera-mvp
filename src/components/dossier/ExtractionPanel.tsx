"use client";

import { useState } from "react";
import type { Document, ExtractedField } from "@/lib/types";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { ConfidenceDot } from "@/components/ui/ConfidenceDot";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconDocument, IconPencil, IconCheck, IconSparkle, DOC_TYPE_ICONS } from "@/components/ui/Icons";
import { UploadZone } from "./UploadZone";
import { SourcePreview } from "./SourcePreview";
import { useT } from "@/lib/i18n";

interface ExtractionPanelProps {
  document: Document;
  propertyId: string;
  onFieldUpdate: (fieldId: string, newValue: string) => void;
  onUpload: (file: File) => void;
  onExtract: () => void;
  extracting?: boolean;
}

export function ExtractionPanel({ document: doc, propertyId, onFieldUpdate, onUpload, onExtract, extracting }: ExtractionPanelProps) {
  const t = useT();
  const config = DOCUMENT_CONFIGS[doc.type];
  const Icon = DOC_TYPE_ICONS[doc.type] || IconDocument;
  const [previewField, setPreviewField] = useState<ExtractedField | null>(null);

  // If a field is selected for preview, show the SourcePreview panel instead
  if (previewField) {
    return (
      <SourcePreview
        field={previewField}
        document={doc}
        onClose={() => setPreviewField(null)}
      />
    );
  }

  return (
    <div className="panel slide-in">
      {/* Header */}
      <div className="panel-header px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-semibold text-text-primary tracking-[-0.01em]">{config.label}</h3>
            <p className="text-[11px] text-text-muted mt-0.5">{config.description}</p>
          </div>
          {(doc.status === "extracted" || doc.status === "verified") && (
            <span className="text-[11px] text-text-muted tabular-nums">
              {doc.fields.filter((f) => f.verified).length}/{doc.fields.length}
            </span>
          )}
        </div>
      </div>

      <div className="p-6">
        {doc.status === "missing" && (
          <UploadZone documentId={doc.id} propertyId={propertyId} onUploadComplete={onUpload} />
        )}

        {doc.status === "uploaded" && doc.file_name && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 px-3.5 py-3 rounded-lg bg-[rgba(var(--t-contrast),0.02)] border border-[rgba(var(--t-contrast),0.1)]">
              <IconDocument size={14} className="text-text-muted shrink-0" />
              <span className="text-[13px] text-text-secondary flex-1 truncate">{doc.file_name}</span>
              <Badge variant="warning">{t("docStatus.uploaded")}</Badge>
            </div>
            <Button onClick={onExtract} disabled={extracting} className="w-full" size="lg">
              <IconSparkle size={14} />
              {extracting ? t("extract.extracting") : t("extract.button")}
            </Button>
          </div>
        )}

        {doc.status === "extracting" && (
          <div className="text-center py-14 space-y-4">
            <div className="w-8 h-8 mx-auto rounded-full border-2 border-border border-t-text-primary animate-spin" />
            <div>
              <p className="text-[13px] text-text-secondary">{t("extract.aiAnalyzing")}</p>
              <p className="text-[11px] text-text-muted mt-1">{t("extract.analyzingHint")}</p>
            </div>
          </div>
        )}

        {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length > 0 && (
          <div>
            {doc.file_name && (
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[rgba(var(--t-contrast),0.02)] border border-[rgba(var(--t-contrast),0.1)] mb-5">
                <IconDocument size={13} className="text-text-muted shrink-0" />
                <span className="text-[12px] text-text-secondary flex-1 truncate">{doc.file_name}</span>
                <Badge variant={doc.status === "verified" ? "success" : "info"}>
                  {doc.status === "verified" ? t("docStatus.verified") : t("docStatus.extracted")}
                </Badge>
              </div>
            )}

            <div className="space-y-px">
              {doc.fields.map((field) => (
                <FieldRow key={field.id} field={field} onUpdate={(v) => onFieldUpdate(field.id, v)} onShowSource={field.source_page ? () => setPreviewField(field) : undefined} />
              ))}
            </div>
          </div>
        )}

        {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length === 0 && (
          <div className="text-center py-14">
            <p className="text-[13px] text-text-muted">{t("extract.noFields")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Field row with inline editing ──

interface FieldRowProps {
  field: ExtractedField;
  onUpdate: (newValue: string) => void;
  onShowSource?: () => void;
}

function FieldRow({ field, onUpdate, onShowSource }: FieldRowProps) {
  const t = useT();
  const [editing, setEditing] = useState(false);
  const [editValue, setEditValue] = useState(field.field_value || "");

  function handleSave() {
    if (editValue.trim()) onUpdate(editValue.trim());
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") { setEditValue(field.field_value || ""); setEditing(false); }
  }

  return (
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors duration-100 ${
      field.verified
        ? "field-verified"
        : "hover:bg-[rgba(var(--t-contrast),0.02)]"
    }`}>
      {field.verified ? (
        <IconCheck size={13} className="text-success shrink-0" />
      ) : (
        <ConfidenceDot level={field.confidence} />
      )}

      <span className="text-[11px] text-text-muted w-[100px] shrink-0 truncate" title={field.field_label}>
        {field.field_label}
      </span>

      {editing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-bg-surface border border-border-hover rounded-md h-7 px-2.5 text-[13px] text-text-primary focus:outline-none focus:border-[rgba(var(--t-contrast),0.4)]"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-[13px] text-text-primary cursor-pointer hover:opacity-60 transition-opacity truncate"
          onClick={() => { setEditValue(field.field_value || ""); setEditing(true); }}
        >
          {field.field_value || "—"}
        </span>
      )}

      {/* Source citation badge */}
      {!editing && onShowSource && (
        <button
          onClick={onShowSource}
          className="text-[9px] text-text-muted border border-[rgba(var(--t-contrast),0.1)] rounded px-1.5 py-0.5 hover:text-text-primary hover:border-[rgba(var(--t-contrast),0.25)] transition-colors shrink-0 cursor-pointer tabular-nums"
          title={field.source_snippet ? `"${field.source_snippet}"` : t("extract.sourcePage", { page: String(field.source_page) })}
        >
          p.{field.source_page}
        </button>
      )}

      {!editing && !field.verified && (
        <button
          onClick={() => { setEditValue(field.field_value || ""); setEditing(true); }}
          className="text-text-muted hover:text-text-primary transition-colors shrink-0 cursor-pointer"
        >
          <IconPencil size={12} />
        </button>
      )}
    </div>
  );
}
