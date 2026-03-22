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
    <div className="glass-card p-6 slide-in">
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-2xl">{config.icon}</span>
        <div>
          <h3 className="font-semibold text-[#F1F5F9]">{config.label}</h3>
          <p className="text-xs text-[#64748B]">{config.description}</p>
        </div>
      </div>

      {/* Upload zone — show when no file yet */}
      {doc.status === "missing" && (
        <UploadZone
          documentId={doc.id}
          propertyId={propertyId}
          onUploadComplete={onUpload}
        />
      )}

      {/* File info + extract button */}
      {doc.status === "uploaded" && doc.file_name && (
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-[#0D1225] rounded-xl border border-[#1E293B]">
            <span className="text-lg">📎</span>
            <span className="text-sm text-[#F1F5F9] flex-1 truncate">{doc.file_name}</span>
            <Badge variant="warning">Geüpload</Badge>
          </div>
          <Button
            onClick={onExtract}
            disabled={extracting}
            className="w-full"
          >
            {extracting ? "Extractie bezig..." : "🤖 Data extraheren met AI"}
          </Button>
        </div>
      )}

      {/* Extracting state */}
      {doc.status === "extracting" && (
        <div className="text-center py-8 space-y-3">
          <div className="text-3xl animate-pulse">🤖</div>
          <p className="text-sm text-[#94A3B8]">AI analyseert het document...</p>
          <div className="max-w-xs mx-auto">
            <div className="h-2 bg-[#1E293B] rounded-full overflow-hidden">
              <div className="h-full bg-[#4F8EFF] rounded-full animate-pulse w-2/3" />
            </div>
          </div>
        </div>
      )}

      {/* Extracted fields */}
      {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length > 0 && (
        <div className="space-y-1">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-[#94A3B8]">Geëxtraheerde velden</h4>
            <span className="text-xs text-[#64748B]">
              {doc.fields.filter((f) => f.verified).length}/{doc.fields.length} geverifieerd
            </span>
          </div>

          {doc.file_name && (
            <div className="flex items-center gap-3 p-3 bg-[#0D1225] rounded-xl border border-[#1E293B] mb-3">
              <span className="text-lg">📎</span>
              <span className="text-sm text-[#F1F5F9] flex-1 truncate">{doc.file_name}</span>
              <Badge variant={doc.status === "verified" ? "success" : "info"}>
                {doc.status === "verified" ? "Geverifieerd" : "Geëxtraheerd"}
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

      {/* Empty extracted state (shouldn't normally happen) */}
      {(doc.status === "extracted" || doc.status === "verified") && doc.fields.length === 0 && (
        <div className="text-center py-8">
          <p className="text-sm text-[#64748B]">Geen velden geëxtraheerd</p>
        </div>
      )}
    </div>
  );
}

// ── Individual field row with inline editing ──

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
        flex items-center gap-3 p-3 rounded-xl border transition-all duration-200
        ${field.verified
          ? "border-[#22C55E]/15 bg-[#22C55E]/5"
          : "border-[#1E293B] bg-[#0D1225] hover:border-[#334155]"
        }
      `}
    >
      {/* Verified checkmark or confidence dot */}
      {field.verified ? (
        <span className="text-[#22C55E] text-sm" title="Geverifieerd">✓</span>
      ) : (
        <ConfidenceDot level={field.confidence} />
      )}

      {/* Label */}
      <span className="text-xs text-[#64748B] min-w-[120px] shrink-0">
        {field.field_label}
      </span>

      {/* Value (editable) */}
      {editing ? (
        <input
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-[#080C18] border border-[#4F8EFF] rounded-lg px-2 py-1 text-sm text-[#F1F5F9] focus:outline-none"
          autoFocus
        />
      ) : (
        <span
          className="flex-1 text-sm text-[#F1F5F9] cursor-pointer hover:text-[#4F8EFF] transition-colors truncate"
          onClick={() => {
            setEditValue(field.field_value || "");
            setEditing(true);
          }}
          title="Klik om te bewerken"
        >
          {field.field_value || "—"}
        </span>
      )}

      {/* Edit icon (when not editing and not verified) */}
      {!editing && !field.verified && (
        <button
          onClick={() => {
            setEditValue(field.field_value || "");
            setEditing(true);
          }}
          className="text-[#64748B] hover:text-[#4F8EFF] transition-colors text-xs shrink-0 cursor-pointer"
          title="Bewerken"
        >
          ✏️
        </button>
      )}
    </div>
  );
}
