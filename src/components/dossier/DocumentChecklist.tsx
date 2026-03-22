"use client";

import type { Document } from "@/lib/types";
import { DOCUMENT_CONFIGS, DOCUMENT_TYPE_ORDER } from "@/lib/documents/config";
import { Badge } from "@/components/ui/Badge";
import { DOC_TYPE_ICONS } from "@/components/ui/Icons";

interface DocumentChecklistProps {
  documents: Document[];
  selectedDocId: string | null;
  onSelect: (docId: string) => void;
}

const statusConfig: Record<string, { variant: "success" | "warning" | "error" | "info" | "neutral"; label: string }> = {
  missing: { variant: "neutral", label: "Ontbreekt" },
  uploaded: { variant: "warning", label: "Geupload" },
  extracting: { variant: "info", label: "Verwerken..." },
  extracted: { variant: "info", label: "Geextraheerd" },
  verified: { variant: "success", label: "Geverifieerd" },
};

export function DocumentChecklist({ documents, selectedDocId, onSelect }: DocumentChecklistProps) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.1em] text-[#52525B] font-semibold mb-2">
        Documenten
      </p>
      <div className="space-y-1">
        {DOCUMENT_TYPE_ORDER.map((type) => {
          const doc = documents.find((d) => d.type === type);
          const config = DOCUMENT_CONFIGS[type];
          if (!doc) return null;

          const status = statusConfig[doc.status];
          const isSelected = doc.id === selectedDocId;
          const Icon = DOC_TYPE_ICONS[type] || DOC_TYPE_ICONS.eigendomsakte;
          const totalFields = doc.fields.length;
          const verifiedFields = doc.fields.filter((f) => f.verified).length;

          return (
            <button
              key={type}
              onClick={() => onSelect(doc.id)}
              className={`
                w-full text-left px-3 py-2.5 rounded-lg border transition-colors cursor-pointer
                ${isSelected
                  ? "border-[#3B82F6]/20 bg-[#3B82F6]/5"
                  : "border-transparent hover:bg-[#18181B]"
                }
              `}
            >
              <div className="flex items-center gap-3">
                <div className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                  doc.status === "verified"
                    ? "bg-[#22C55E]/10 text-[#22C55E]"
                    : doc.status === "missing"
                      ? "bg-[#18181B] text-[#52525B]"
                      : "bg-[#3B82F6]/10 text-[#3B82F6]"
                }`}>
                  <Icon size={14} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-[#FAFAFA] truncate">{config.label}</p>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  {totalFields > 0 && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-[3px] bg-[#18181B] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#22C55E] rounded-full transition-all duration-300"
                          style={{ width: `${(verifiedFields / totalFields) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#52525B] tabular-nums">{verifiedFields}/{totalFields}</span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
