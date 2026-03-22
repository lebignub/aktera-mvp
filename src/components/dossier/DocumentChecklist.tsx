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
      <p className="text-[11px] text-[#555] font-medium mb-3 tracking-[-0.01em]">
        Vereiste documenten
      </p>

      <div className="space-y-px">
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
                w-full text-left px-3 py-2.5 rounded-lg transition-colors duration-100 cursor-pointer fade-in
                ${isSelected
                  ? "bg-[rgba(255,255,255,0.06)] text-white"
                  : "text-[#999] hover:bg-[rgba(255,255,255,0.03)] hover:text-white"
                }
              `}
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={14} className="shrink-0 opacity-50" />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[13px] font-medium truncate">{config.label}</p>
                    <Badge variant={status.variant}>{status.label}</Badge>
                  </div>
                  {totalFields > 0 && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00D47E] rounded-full transition-all duration-500"
                          style={{ width: `${(verifiedFields / totalFields) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#555] tabular-nums">{verifiedFields}/{totalFields}</span>
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
