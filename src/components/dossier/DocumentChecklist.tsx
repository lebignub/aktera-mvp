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
  uploaded: { variant: "warning", label: "Geupload" },
  extracting: { variant: "info", label: "Verwerken..." },
  extracted: { variant: "info", label: "Geextraheerd" },
  verified: { variant: "success", label: "Geverifieerd" },
};

export function DocumentChecklist({ documents, selectedDocId, onSelect }: DocumentChecklistProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-[12px] uppercase tracking-[0.08em] font-medium text-[#8B9BB8] mb-4">
        Vereiste documenten
      </h3>
      {DOCUMENT_TYPE_ORDER.map((type) => {
        const doc = documents.find((d) => d.type === type);
        const config = DOCUMENT_CONFIGS[type];
        if (!doc) return null;

        const status = statusConfig[doc.status];
        const isSelected = doc.id === selectedDocId;

        const totalFields = doc.fields.length;
        const verifiedFields = doc.fields.filter((f) => f.verified).length;

        return (
          <button
            key={type}
            onClick={() => onSelect(doc.id)}
            className={`
              w-full text-left p-4 rounded-2xl border transition-all duration-200 cursor-pointer
              ${isSelected
                ? "border-[rgba(126,180,255,0.25)] bg-[rgba(126,180,255,0.06)]"
                : "border-[rgba(120,160,210,0.08)] bg-[rgba(40,65,100,0.1)] hover:border-[rgba(120,160,210,0.15)] hover:bg-[rgba(40,65,100,0.18)]"
              }
            `}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-lg">{config.icon}</span>
                <div>
                  <p className="text-[13px] font-medium text-white">{config.label}</p>
                  <p className="text-[11px] text-[#576580]">{config.description}</p>
                </div>
              </div>
              <Badge variant={status.variant}>{status.label}</Badge>
            </div>

            {totalFields > 0 && (
              <div className="mt-3 flex items-center gap-2 text-[11px] text-[#576580]">
                <div className="flex-1 h-1 bg-[rgba(120,150,190,0.08)] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#34D399] rounded-full transition-all duration-300"
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
