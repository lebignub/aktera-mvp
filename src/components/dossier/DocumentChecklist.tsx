"use client";

import type { Document } from "@/lib/types";
import { DOCUMENT_CONFIGS, DOCUMENT_TYPE_ORDER } from "@/lib/documents/config";
import { Badge } from "@/components/ui/Badge";
import { DOC_TYPE_ICONS, IconDocument } from "@/components/ui/Icons";
import { useT } from "@/lib/i18n";
import type { TranslationKey } from "@/lib/i18n/locales/nl";

interface DocumentChecklistProps {
  documents: Document[];
  selectedDocId: string | null;
  onSelect: (docId: string) => void;
}

// Maps document status to badge variant and i18n key
const STATUS_MAP: Record<string, { variant: "success" | "warning" | "error" | "info" | "neutral"; key: TranslationKey }> = {
  missing:    { variant: "neutral", key: "docStatus.missing" },
  uploaded:   { variant: "warning", key: "docStatus.uploaded" },
  extracting: { variant: "info",    key: "docStatus.extracting" },
  extracted:  { variant: "info",    key: "docStatus.extracted" },
  verified:   { variant: "success", key: "docStatus.verified" },
};

export function DocumentChecklist({ documents, selectedDocId, onSelect }: DocumentChecklistProps) {
  const t = useT();

  return (
    <div>
      <p className="text-[11px] text-[#666] font-medium mb-3 tracking-[-0.01em]">
        {t("dossier.requiredDocs")}
      </p>

      <div className="space-y-px">
        {DOCUMENT_TYPE_ORDER.map((type, i) => {
          const doc = documents.find((d) => d.type === type);
          const config = DOCUMENT_CONFIGS[type];
          if (!doc) return null;

          const status = STATUS_MAP[doc.status];
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
                  ? "bg-[rgba(255,255,255,0.1)] text-white"
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
                    <Badge variant={status.variant}>{t(status.key)}</Badge>
                  </div>
                  {totalFields > 0 && (
                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex-1 h-[2px] bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00D47E] rounded-full transition-all duration-500"
                          style={{ width: `${(verifiedFields / totalFields) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-[#666] tabular-nums">{verifiedFields}/{totalFields}</span>
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
