"use client";

import { useState } from "react";
import type { Document, ExtractedField } from "@/lib/types";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { ConfidenceDot } from "@/components/ui/ConfidenceDot";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { IconDocument, IconPencil, IconCheck, IconSparkle, DOC_TYPE_ICONS } from "@/components/ui/Icons";
import { UploadZone } from "./UploadZone";

interface ExtractionPanelProps {
  document: Document;
  propertyId: string;
  onFieldUpdate: (fieldId: string, newValue: string) => void;
  onUpload: (file: File) => void;
  onExtract: () => void;
  extracting?: boolean;
}

export function ExtractionPanel({
  document: doc,
  propertyId,
  onFieldUpdate,
  onUpload,
  onExtract,
  extracting,
}: ExtractionPanelProps) {
  const config = DOCUMENT_CONFIGS[doc.type];
  const Icon = DOC_TYPE_ICONS[doc.type] || IconDocument;

  return (
    <div className="bg-[#131316] border border-[#1E1E21] rounded-xl slide-in">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-[#1E1E21]">
        <div className="w-8 h-8 rounded-lg bg-[#18181B] flex items-center justify-center text-[#A1A1AA]">
          <Icon size={16} />
        </div>
        <div>
          <h3 className="text-[13px] font-semibold text-[#FAFAFA]">{config.label}</h3>
          <p className="text-[11px] text-[#52525B]">{config.description}</p>
        </div>
      </div>

      <div className="p-5">
        {/* Upload zone */}
        {doc.status === "missing" && (
          <UploadZone documentId={doc.id} propertyId={propertyId} onUploadComplete={onUpload} />
        )}

        {/* Uploaded — ready for extraction */}
        {doc.status === "uploaded" && doc.file_name && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3 bg-[#0F0F12] rounded-lg border border-[#1E1E21]">
              <IconDocument size={14} className="text-[#52525B] shrink-0" />
              <span className="text-[12px] text-[#A1A1AA] flex-1 truncate">{doc.file_name}</span>
              <Badge variant="warning">Geupload</Badge>
            </div>
            <Button onClick={onExtract} disabled={extracting} className="w-full" size="md">
              <IconSparkle size={14} />
              {extracting ? "Extractie bezig..." : "Data extraheren"}
            </Button>
          </div>
        )}

        {/* Extracting */}
        {doc.status === "extracting" && (
          <div className="text-center py-10 space-y-3">
            <div className="w-7 h-7 mx-auto rounded-full border-2 border-[#27272A] border-t-[#3B82F6] animate-spin" />
            <p className="text-[12px] text-[#52525B]">AI analyseert het document...</p>
          </div>
        )}

        {/* Extracted fields */}
        {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length > 0 && (
          <div>
            {doc.file_name && (
              <div className="flex items-center gap-3 p-3 bg-[#0F0F12] rounded-lg border border-[#1E1E21] mb-4">
                <IconDocument size={14} className="text-[#52525B] shrink-0" />
                <span className="text-[12px] text-[#A1A1AA] flex-1 truncate">{doc.file_name}</span>
                <Badge variant={doc.status === "verified" ? "success" : "info"}>
                  {doc.status === "verified" ? "Geverifieerd" : "Geextraheerd"}
                </Badge>
              </div>
            )}

            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] uppercase tracking-[0.1em] text-[#52525B] font-semibold">Velden</p>
              <span className="text-[11px] text-[#52525B]">
                {doc.fields.filter((f) => f.verified).length}/{doc.fields.length} geverifieerd
              </span>
            </div>

            <div className="space-y-1">
              {doc.fields.map((field) => (
                <FieldRow key={field.id} field={field} onUpdate={(v) => onFieldUpdate(field.id, v)} />
              ))}
            </div>
          </div>
        )}

        {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length === 0 && (
          <div className="text-center py-10">
            <p className="text-[12px] text-[#52525B]">Geen velden geextraheerd</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Field row ──

interface FieldRowProps {
  field: ExtractedField;
  onUpdate: (newValue: string) => void;
}

function FieldRow({ field, onUpdate }: FieldRowProps) {
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
    <div className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
      field.verified ? "bg-[#22C55E]/5" : "hover:bg-[#18181B]"
    }`}>
      {field.verified ? (
        <IconCheck size={13} className="text-[#22C55E] shrink-0" />
      ) : (
        <ConfidenceDot level={field.confidence} />
      )}

      <span className="text-[11px] text-[#52525B] w-[100px] shrink-0 truncate" title={field.field_label}>
        {field.field_label}
      </span>

      {editing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-[#0F0F12] border border-[#3B82F6] rounded h-7 px-2 text-[13px] text-[#FAFAFA] focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-[13px] text-[#FAFAFA] cursor-pointer hover:text-[#3B82F6] transition-colors truncate"
          onClick={() => { setEditValue(field.field_value || ""); setEditing(true); }}
        >
          {field.field_value || "—"}
        </span>
      )}

      {!editing && !field.verified && (
        <button
          onClick={() => { setEditValue(field.field_value || ""); setEditing(true); }}
          className="text-[#3F3F46] hover:text-[#A1A1AA] transition-colors shrink-0 cursor-pointer"
        >
          <IconPencil size={12} />
        </button>
      )}
    </div>
  );
}
