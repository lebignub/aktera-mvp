"use client";

import type { ExtractedField, Document } from "@/lib/types";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { IconArrowLeft } from "@/components/ui/Icons";

interface SourcePreviewProps {
  field: ExtractedField;
  document: Document;
  onClose: () => void;
}

/**
 * Mock PDF page preview — shows a stylized document page with the
 * cited snippet highlighted. In V2, this will render the actual PDF
 * page using a library like react-pdf or pdfjs-dist.
 */
export function SourcePreview({ field, document: doc, onClose }: SourcePreviewProps) {
  const config = DOCUMENT_CONFIGS[doc.type];
  const page = field.source_page ?? 1;

  // Generate mock surrounding text that looks like a real document,
  // with the source snippet highlighted in the middle
  const mockLines = getMockDocumentLines(doc.type, page, field);

  return (
    <div className="panel slide-in h-full flex flex-col">
      {/* Header */}
      <div className="panel-header px-5 py-3.5 flex items-center gap-3 shrink-0">
        <button
          onClick={onClose}
          className="text-[#666] hover:text-white transition-colors"
        >
          <IconArrowLeft size={14} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[13px] font-medium text-white truncate">{doc.file_name}</p>
          <p className="text-[10px] text-[#666] mt-0.5">
            {config.label} — Pagina {page}
          </p>
        </div>
        <span className="text-[10px] text-[#666] border border-[rgba(255,255,255,0.1)] rounded px-2 py-0.5 shrink-0">
          p. {page}
        </span>
      </div>

      {/* Mock PDF page */}
      <div className="flex-1 overflow-y-auto p-5">
        <div className="bg-white rounded-lg shadow-lg mx-auto max-w-[480px]">
          {/* Page content area — styled to look like a scanned document */}
          <div className="p-8 space-y-0">
            {/* Document header */}
            <div className="mb-6 pb-4 border-b border-gray-200">
              <p className="text-[9px] text-gray-400 uppercase tracking-wider">{config.label}</p>
              <p className="text-[7px] text-gray-300 mt-1">Pagina {page} van {page + 1}</p>
            </div>

            {/* Document lines — the snippet line is highlighted */}
            <div className="space-y-[6px]">
              {mockLines.map((line, i) => (
                <div key={i}>
                  {line.isHighlight ? (
                    <div className="relative -mx-2 px-2 py-1 rounded bg-[#FFF3CD] border-l-2 border-[#FFB224]">
                      <p className="text-[10px] text-gray-800 leading-[1.6] font-medium">
                        {line.text}
                      </p>
                      {/* Extraction indicator */}
                      <div className="absolute -right-1 top-1/2 -translate-y-1/2 flex items-center gap-1 bg-black text-white text-[7px] font-medium px-1.5 py-0.5 rounded-full shadow-md">
                        <svg width="6" height="6" viewBox="0 0 16 16" fill="none">
                          <path d="M8 1v3M8 12v3M1 8h3M12 8h3" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                        </svg>
                        AI
                      </div>
                    </div>
                  ) : line.isSpacer ? (
                    <div className="h-3" />
                  ) : line.isHeader ? (
                    <p className="text-[10px] text-gray-600 font-semibold leading-[1.6] mt-2">
                      {line.text}
                    </p>
                  ) : (
                    <p className="text-[10px] text-gray-500 leading-[1.6]">
                      {line.text}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Page footer */}
          <div className="px-8 py-3 border-t border-gray-100 flex justify-between">
            <p className="text-[7px] text-gray-300">Vlaams Gewest</p>
            <p className="text-[7px] text-gray-300">{page}</p>
          </div>
        </div>

        {/* Citation info below the page */}
        <div className="mt-4 mx-auto max-w-[480px]">
          <div className="border border-[rgba(255,255,255,0.08)] rounded-lg p-4">
            <p className="text-[10px] text-[#666] font-medium mb-2">Extractie</p>
            <div className="space-y-2">
              <div className="flex gap-2">
                <span className="text-[10px] text-[#666] w-14 shrink-0">Veld</span>
                <span className="text-[11px] text-white">{field.field_label}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] text-[#666] w-14 shrink-0">Waarde</span>
                <span className="text-[11px] text-white font-medium">{field.field_value}</span>
              </div>
              <div className="flex gap-2">
                <span className="text-[10px] text-[#666] w-14 shrink-0">Bron</span>
                <span className="text-[11px] text-[#999]">{doc.file_name} — p. {page}</span>
              </div>
              {field.source_snippet && (
                <div className="flex gap-2">
                  <span className="text-[10px] text-[#666] w-14 shrink-0">Citaat</span>
                  <span className="text-[11px] text-[#999] italic">"{field.source_snippet}"</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mock document content generator ── */

interface MockLine {
  text: string;
  isHighlight?: boolean;
  isHeader?: boolean;
  isSpacer?: boolean;
}

function getMockDocumentLines(docType: string, page: number, field: ExtractedField): MockLine[] {
  const snippet = field.source_snippet || field.field_value || "";

  // Document-type-specific surrounding text to make the preview feel real
  const contexts: Record<string, { headers: string[]; lines: string[][] }> = {
    epc: {
      headers: ["Energieprestatiecertificaat", "Gebouwkenmerken"],
      lines: [
        [
          "Vlaams Energieagentschap",
          "Datum van het certificaat: 15 maart 2024",
          "Dit certificaat is 10 jaar geldig.",
        ],
        [
          "Type gebouw: Gesloten bebouwing",
          "Bouwvergunning: Niet beschikbaar",
          "Verwarmingstype: Centraal — aardgas",
          "Isolatie dak: Gedeeltelijk geïsoleerd (8 cm)",
          "Beglazing: Dubbel glas, deels vervangen",
        ],
      ],
    },
    bodemattest: {
      headers: ["Bodemattest — OVAM", "Beoordeling"],
      lines: [
        [
          "Openbare Vlaamse Afvalstoffenmaatschappij",
          "Stationsstraat 110, 2800 Mechelen",
          "Aanvrager: Janssens Marc, Kerkstraat 42, 2000 Antwerpen",
        ],
        [
          "Op basis van de beschikbare gegevens in het",
          "grondeninformatieregister kan het volgende worden",
          "meegedeeld over de toestand van de bodem:",
        ],
      ],
    },
    kadastrale_legger: {
      headers: ["Kadastrale legger — FOD Financiën", "Eigendomsinformatie"],
      lines: [
        [
          "Federale Overheidsdienst Financiën",
          "Algemene Administratie van de Patrimoniumdocumentatie",
          "Uittreksel uit de kadastrale legger — Toestand op 01/01/2024",
        ],
        [
          "Ligging van het goed: Kerkstraat 42",
          "Aard van het goed: Gewoon huis",
          "Grondoppervlakte volgens meting: 3a 20ca",
        ],
      ],
    },
  };

  const ctx = contexts[docType] || contexts.epc;
  const sectionIdx = page === 1 ? 0 : 1;
  const header = ctx.headers[sectionIdx] || ctx.headers[0];
  const surroundingLines = ctx.lines[sectionIdx] || ctx.lines[0];

  const lines: MockLine[] = [];

  // Header
  lines.push({ text: header, isHeader: true });
  lines.push({ text: "", isSpacer: true });

  // A few lines before the highlight
  const beforeCount = Math.min(3, surroundingLines.length);
  for (let i = 0; i < beforeCount; i++) {
    lines.push({ text: surroundingLines[i] });
  }

  lines.push({ text: "", isSpacer: true });

  // The highlighted snippet
  lines.push({ text: snippet, isHighlight: true });

  lines.push({ text: "", isSpacer: true });

  // A few lines after the highlight
  for (let i = beforeCount; i < surroundingLines.length; i++) {
    lines.push({ text: surroundingLines[i] });
  }

  // Add some filler lines to fill the page
  lines.push({ text: "", isSpacer: true });
  lines.push({ text: "· · ·", isHeader: false });

  return lines;
}
