"use client";

import type { Document } from "@/lib/types";
import { DOCUMENT_CONFIGS, DOCUMENT_TYPE_ORDER } from "@/lib/documents/config";
import { Badge } from "@/components/ui/Badge";
import { DOC_TYPE_ICONS, IconDocument } from "@/components/ui/Icons";

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
      <p className="text-[10px] uppercase tracking-[0.12em] text-[#454D5E] font-semibold mb-3">
        Vereiste documenten
      </p>

      <div className="space-y-1">
        {DOCUMENT_TYPE_ORDER.map((type, i) => {
          const doc = documents.find((d) => d.type === type);
          const config = DOCUMENT_CONFIGS[type];
          if (!doc) return null;

          const status = statusConfig[doc.status];
          const isSelected = doc.id === selectedDocId;
          const Icon = DOC_TYPE_ICONS[type] || IconDocument;
          const totalFields = doc.fields.length;
          const verifiedFields = doc.fields.filter((f) => f.verified).length;

          return (
            <button
              key={type}
              onClick={() => onSelect(doc.id)}
              className={`
                w-full text-left p-3 rounded-xl transition-all duration-150 cursor-pointer fade-in
                ${isSelected
                  ? "ring-active bg-[rgba(59,130,246,0.05)]"
                  : "hover:bg-[rgba(255,255,255,0.02)]"
                }
              `}
              style={{ animationDelay: `${i * 40}ms` }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                  doc.status === "verified"
                    ? "bg-[rgba(16,185,129,0.1)] text-[#10B981]"
                    : doc.status === "missing"
                      ? "bg-[rgba(255,255,255,0.03)] text-[#454D5E]"
                      : "bg-[rgba(59,130,246,0.08)] text-[#3B82F6]"
                }`}>
                  <Icon size={15} />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium text-[#F0F2F5] truncate">{config.label}</p>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  {totalFields > 0 && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-[3px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#10B981] rounded-full transition-all duration-500"
                          style={{ width: `${(verifiedFields / totalFields) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#454D5E] tabular-nums">{verifiedFields}/{totalFields}</span>
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
