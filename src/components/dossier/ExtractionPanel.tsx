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

interface ExtractionPanelProps {
  document: Document;
  propertyId: string;
  onFieldUpdate: (fieldId: string, newValue: string) => void;
  onUpload: (file: File) => void;
  onExtract: () => void;
  extracting?: boolean;
}

export function ExtractionPanel({ document: doc, propertyId, onFieldUpdate, onUpload, onExtract, extracting }: ExtractionPanelProps) {
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
            <h3 className="text-[14px] font-semibold text-white tracking-[-0.01em]">{config.label}</h3>
            <p className="text-[11px] text-[#666] mt-0.5">{config.description}</p>
          </div>
          {(doc.status === "extracted" || doc.status === "verified") && (
            <span className="text-[11px] text-[#666] tabular-nums">
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
            <div className="flex items-center gap-3 px-3.5 py-3 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)]">
              <IconDocument size={14} className="text-[#666] shrink-0" />
              <span className="text-[13px] text-[#999] flex-1 truncate">{doc.file_name}</span>
              <Badge variant="warning">Geupload</Badge>
            </div>
            <Button onClick={onExtract} disabled={extracting} className="w-full" size="lg">
              <IconSparkle size={14} />
              {extracting ? "Extractie bezig..." : "Data extraheren met AI"}
            </Button>
          </div>
        )}

        {doc.status === "extracting" && (
          <div className="text-center py-14 space-y-4">
            <div className="w-8 h-8 mx-auto rounded-full border-2 border-[rgba(255,255,255,0.12)] border-t-white animate-spin" />
            <div>
              <p className="text-[13px] text-[#999]">AI analyseert het document</p>
              <p className="text-[11px] text-[#666] mt-1">Dit duurt meestal een paar seconden...</p>
            </div>
          </div>
        )}

        {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length > 0 && (
          <div>
            {doc.file_name && (
              <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.1)] mb-5">
                <IconDocument size={13} className="text-[#666] shrink-0" />
                <span className="text-[12px] text-[#999] flex-1 truncate">{doc.file_name}</span>
                <Badge variant={doc.status === "verified" ? "success" : "info"}>
                  {doc.status === "verified" ? "Geverifieerd" : "Geextraheerd"}
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
            <p className="text-[13px] text-[#666]">Geen velden geextraheerd</p>
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
        : "hover:bg-[rgba(255,255,255,0.02)]"
    }`}>
      {field.verified ? (
        <IconCheck size={13} className="text-[#00D47E] shrink-0" />
      ) : (
        <ConfidenceDot level={field.confidence} />
      )}

      <span className="text-[11px] text-[#666] w-[100px] shrink-0 truncate" title={field.field_label}>
        {field.field_label}
      </span>

      {editing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-[#0A0A0A] border border-[rgba(255,255,255,0.2)] rounded-md h-7 px-2.5 text-[13px] text-white focus:outline-none focus:border-[rgba(255,255,255,0.4)]"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-[13px] text-white cursor-pointer hover:opacity-60 transition-opacity truncate"
          onClick={() => { setEditValue(field.field_value || ""); setEditing(true); }}
        >
          {field.field_value || "—"}
        </span>
      )}

      {/* Source citation badge */}
      {!editing && onShowSource && (
        <button
          onClick={onShowSource}
          className="text-[9px] text-[#666] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5 hover:text-white hover:border-[rgba(255,255,255,0.25)] transition-colors shrink-0 cursor-pointer tabular-nums"
          title={field.source_snippet ? `"${field.source_snippet}"` : `Bron: pagina ${field.source_page}`}
        >
          p.{field.source_page}
        </button>
      )}

      {!editing && !field.verified && (
        <button
          onClick={() => { setEditValue(field.field_value || ""); setEditing(true); }}
          className="text-[#666] hover:text-white transition-colors shrink-0 cursor-pointer"
        >
          <IconPencil size={12} />
        </button>
      )}
    </div>
  );
}
