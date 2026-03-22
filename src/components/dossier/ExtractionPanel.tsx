"use client";

import { useState } from "react";
import type { Document, ExtractedField } from "@/lib/types";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { ConfidenceDot } from "@/components/ui/ConfidenceDot";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
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

  return (
    <div className="glass-card p-7 slide-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <h3 className="font-semibold text-white tracking-tight">{config.label}</h3>
          <p className="text-[11px] text-[#576580]">{config.description}</p>
        </div>
      </div>

      {/* Upload zone */}
      {doc.status === "missing" && (
        <UploadZone
          documentId={doc.id}
          propertyId={propertyId}
          onUploadComplete={onUpload}
        />
      )}

      {/* File info + extract button */}
      {doc.status === "uploaded" && doc.file_name && (
        <div className="space-y-5">
          <div className="flex items-center gap-3 p-4 bg-[rgba(8,14,28,0.4)] rounded-2xl border border-[rgba(120,160,210,0.08)]">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-[#8B9BB8] shrink-0">
              <path d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5L9 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 1v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-[13px] text-white flex-1 truncate">{doc.file_name}</span>
            <Badge variant="warning">Geupload</Badge>
          </div>
          <Button
            onClick={onExtract}
            disabled={extracting}
            className="w-full"
            size="lg"
          >
            {extracting ? "Extractie bezig..." : "Data extraheren met AI"}
          </Button>
        </div>
      )}

      {/* Extracting state */}
      {doc.status === "extracting" && (
        <div className="text-center py-12 space-y-4">
          <div className="w-10 h-10 mx-auto rounded-full border-2 border-[rgba(126,180,255,0.2)] border-t-[#7EB4FF] animate-spin" />
          <p className="text-[13px] text-[#8B9BB8]">AI analyseert het document...</p>
        </div>
      )}

      {/* Extracted fields */}
      {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-[12px] uppercase tracking-[0.08em] font-medium text-[#8B9BB8]">
              Geextraheerde velden
            </h4>
            <span className="text-[11px] text-[#576580]">
              {doc.fields.filter((f) => f.verified).length}/{doc.fields.length} geverifieerd
            </span>
          </div>

          {doc.file_name && (
            <div className="flex items-center gap-3 p-3 bg-[rgba(8,14,28,0.4)] rounded-xl border border-[rgba(120,160,210,0.08)] mb-3">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" className="text-[#576580] shrink-0">
                <path d="M9 1H4a1 1 0 00-1 1v12a1 1 0 001 1h8a1 1 0 001-1V5L9 1z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 1v4h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-[12px] text-[#8B9BB8] flex-1 truncate">{doc.file_name}</span>
              <Badge variant={doc.status === "verified" ? "success" : "info"}>
                {doc.status === "verified" ? "Geverifieerd" : "Geextraheerd"}
              </Badge>
            </div>
          )}

          {doc.fields.map((field) => (
            <FieldRow
              key={field.id}
              field={field}
              onUpdate={(newValue) => onFieldUpdate(field.id, newValue)}
            />
          ))}
        </div>
      )}

      {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[13px] text-[#576580]">Geen velden geextraheerd</p>
        </div>
      )}
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
    if (editValue.trim()) {
      onUpdate(editValue.trim());
    }
    setEditing(false);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSave();
    if (e.key === "Escape") {
      setEditValue(field.field_value || "");
      setEditing(false);
    }
  }

  return (
    <div
      className={`
        flex items-center gap-3 p-3.5 rounded-xl border transition-all duration-200
        ${field.verified
          ? "border-[rgba(52,211,153,0.12)] bg-[rgba(52,211,153,0.04)]"
          : "border-[rgba(120,160,210,0.06)] bg-[rgba(8,14,28,0.3)] hover:border-[rgba(120,160,210,0.12)]"
        }
      `}
    >
      {field.verified ? (
        <span className="text-[#34D399] text-xs shrink-0">&#10003;</span>
      ) : (
        <ConfidenceDot level={field.confidence} />
      )}

      <span className="text-[11px] text-[#576580] min-w-[110px] shrink-0">
        {field.field_label}
      </span>

      {editing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-[rgba(4,8,16,0.6)] border border-[rgba(126,180,255,0.3)] rounded-lg px-2.5 py-1 text-[13px] text-white focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-[13px] text-white cursor-pointer hover:text-[#7EB4FF] transition-colors truncate"
          onClick={() => {
            setEditValue(field.field_value || "");
            setEditing(true);
          }}
          title="Klik om te bewerken"
        >
          {field.field_value || "—"}
        </span>
      )}

      {!editing && !field.verified && (
        <button
          onClick={() => {
            setEditValue(field.field_value || "");
            setEditing(true);
          }}
          className="text-[#576580] hover:text-[#7EB4FF] transition-colors shrink-0 cursor-pointer"
          title="Bewerken"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M8.5 1.5l2 2M1 11l.5-2L9 1.5l2 2L3.5 11l-2 .5-.5-.5z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      )}
    </div>
  );
}
