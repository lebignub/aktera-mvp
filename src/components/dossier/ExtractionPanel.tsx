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

export function ExtractionPanel({ document: doc, propertyId, onFieldUpdate, onUpload, onExtract, extracting }: ExtractionPanelProps) {
  const config = DOCUMENT_CONFIGS[doc.type];
  const Icon = DOC_TYPE_ICONS[doc.type] || IconDocument;

  return (
    <div className="panel slide-in">
      {/* Header */}
      <div className="panel-header flex items-center gap-3 px-6 py-4">
        <div className="w-9 h-9 rounded-xl bg-[rgba(59,130,246,0.08)] flex items-center justify-center text-[#3B82F6]">
          <Icon size={17} />
        </div>
        <div className="flex-1">
          <h3 className="text-[14px] font-semibold text-white">{config.label}</h3>
          <p className="text-[11px] text-[#454D5E]">{config.description}</p>
        </div>
        {(doc.status === "extracted" || doc.status === "verified") && (
          <span className="text-[11px] text-[#454D5E]">
            {doc.fields.filter((f) => f.verified).length}/{doc.fields.length} geverifieerd
          </span>
        )}
      </div>

      <div className="p-6">
        {doc.status === "missing" && (
          <UploadZone documentId={doc.id} propertyId={propertyId} onUploadComplete={onUpload} />
        )}

        {doc.status === "uploaded" && doc.file_name && (
          <div className="space-y-4">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)]">
              <IconDocument size={15} className="text-[#454D5E] shrink-0" />
              <span className="text-[13px] text-[#7C8494] flex-1 truncate">{doc.file_name}</span>
              <Badge variant="warning">Geupload</Badge>
            </div>
            <Button onClick={onExtract} disabled={extracting} className="w-full" size="lg">
              <IconSparkle size={15} />
              {extracting ? "Extractie bezig..." : "Data extraheren met AI"}
            </Button>
          </div>
        )}

        {doc.status === "extracting" && (
          <div className="text-center py-14 space-y-4">
            <div className="w-9 h-9 mx-auto rounded-full border-2 border-[rgba(59,130,246,0.15)] border-t-[#3B82F6] animate-spin" />
            <div>
              <p className="text-[13px] text-[#7C8494]">AI analyseert het document</p>
              <p className="text-[11px] text-[#454D5E] mt-1">Dit duurt meestal een paar seconden...</p>
            </div>
          </div>
        )}

        {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length > 0 && (
          <div>
            {doc.file_name && (
              <div className="flex items-center gap-3 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-[rgba(255,255,255,0.04)] mb-5">
                <IconDocument size={14} className="text-[#454D5E] shrink-0" />
                <span className="text-[12px] text-[#7C8494] flex-1 truncate">{doc.file_name}</span>
                <Badge variant={doc.status === "verified" ? "success" : "info"}>
                  {doc.status === "verified" ? "Geverifieerd" : "Geextraheerd"}
                </Badge>
              </div>
            )}

            <div className="space-y-1">
              {doc.fields.map((field) => (
                <FieldRow key={field.id} field={field} onUpdate={(v) => onFieldUpdate(field.id, v)} />
              ))}
            </div>
          </div>
        )}

        {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length === 0 && (
          <div className="text-center py-14">
            <p className="text-[13px] text-[#454D5E]">Geen velden geextraheerd</p>
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
    <div className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all duration-150 ${
      field.verified
        ? "field-verified"
        : "hover:bg-[rgba(255,255,255,0.02)]"
    }`}>
      {field.verified ? (
        <IconCheck size={14} className="text-[#10B981] shrink-0" />
      ) : (
        <ConfidenceDot level={field.confidence} />
      )}

      <span className="text-[11px] text-[#454D5E] w-[110px] shrink-0 truncate" title={field.field_label}>
        {field.field_label}
      </span>

      {editing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-[#0A0D14] border border-[#3B82F6] rounded-lg h-8 px-3 text-[13px] text-white focus:outline-none shadow-[0_0_0_3px_rgba(59,130,246,0.1)]"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-[13px] text-[#F0F2F5] cursor-pointer hover:text-[#3B82F6] transition-colors truncate"
          onClick={() => { setEditValue(field.field_value || ""); setEditing(true); }}
        >
          {field.field_value || "—"}
        </span>
      )}

      {!editing && !field.verified && (
        <button
          onClick={() => { setEditValue(field.field_value || ""); setEditing(true); }}
          className="text-[#454D5E] hover:text-[#7C8494] transition-colors shrink-0 cursor-pointer opacity-0 group-hover:opacity-100"
        >
          <IconPencil size={13} />
        </button>
      )}
    </div>
  );
}
