"use client";

import type { Document } from "@/lib/types";
import { DOCUMENT_CONFIGS, DOCUMENT_TYPE_ORDER } from "@/lib/documents/config";
import { Badge } from "@/components/ui/Badge";

interface DocumentChecklistProps {
  documents: Document[];
  selectedDocId: string | null;
  onSelect: (docId: string) => void;
}

const statusConfig: Record<string, { variant: "success" | "warning" | "error" | "info" | "neutral"; label: string }> = {
  missing: { variant: "neutral", label: "Ontbreekt" },
  uploaded: { variant: "warning", label: "Geüpload" },
  extracting: { variant: "info", label: "Verwerken..." },
  extracted: { variant: "info", label: "Geëxtraheerd" },
  verified: { variant: "success", label: "Geverifieerd" },
};

export function DocumentChecklist({ documents, selectedDocId, onSelect }: DocumentChecklistProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-[#94A3B8] uppercase tracking-wider mb-3">
        Vereiste documenten
      </h3>
      {DOCUMENT_TYPE_ORDER.map((type) => {
        const doc = documents.find((d) => d.type === type);
        const config = DOCUMENT_CONFIGS[type];
        if (!doc) return null;

        const status = statusConfig[doc.status];
        const isSelected = doc.id === selectedDocId;

        // Count verified fields
        const totalFields = doc.fields.length;
        const verifiedFields = doc.fields.filter((f) => f.verified).length;

        return (
          <button
            key={type}
            onClick={() => onSelect(doc.id)}
            className={`
              w-full text-left p-4 rounded-xl border transition-all duration-200 cursor-pointer
              ${isSelected
                ? "border-[#4F8EFF]/40 bg-[#4F8EFF]/5"
                : "border-[#1E293B] bg-[#111827]/50 hover:border-[#334155] hover:bg-[#111827]"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{config.icon}</span>
                <div>
                  <p className="text-sm font-medium text-[#F1F5F9]">{config.label}</p>
                  <p className="text-xs text-[#64748B]">{config.description}</p>
                </div>
              </div>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>

            {/* Field progress (only show if fields exist) */}
            {totalFields > 0 && (
              <div className="mt-2 flex items-center gap-2 text-xs text-[#64748B]">
                <div className="flex-1 h-1 bg-[#1E293B] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#22C55E] rounded-full transition-all duration-300"
                    style={{ width: `${(verifiedFields / totalFields) * 100}%` }}
                  />
                </div>
                <span className="tabular-nums">{verifiedFields}/{totalFields}</span>
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
