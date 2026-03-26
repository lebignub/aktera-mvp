"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { getProperty, updateDocument, updateField, setDocumentFields, isMockMode } from "@/lib/store";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { Sidebar } from "@/components/layout/Sidebar";
import { DossierHeader } from "@/components/dossier/DossierHeader";
import { DocumentChecklist } from "@/components/dossier/DocumentChecklist";
import { ExtractionPanel } from "@/components/dossier/ExtractionPanel";
import { GenerateButton } from "@/components/dossier/GenerateButton";
import { PartyInfoPanel } from "@/components/dossier/PartyInfoPanel";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import { useT } from "@/lib/i18n";
import type { Property, ExtractedField } from "@/lib/types";

export default function DossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [pdfDataMap, setPdfDataMap] = useState<Record<string, string>>({});
  const mockMode = isMockMode();
  const t = useT();

  useEffect(() => {
    const prop = getProperty(id);
    if (!prop) { router.push("/"); return; }
    setProperty(prop);
    const firstActive = prop.documents.find((d) => d.status !== "missing");
    setSelectedDocId(firstActive?.id || prop.documents[0]?.id || null);
  }, [id, router]);

  const refresh = useCallback(() => {
    const prop = getProperty(id);
    if (prop) setProperty(prop);
  }, [id]);

  function handleUpload(file: File) {
    if (!property || !selectedDocId) return;
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(",")[1];
      setPdfDataMap((prev) => ({ ...prev, [selectedDocId]: base64 }));
    };
    reader.readAsDataURL(file);
    updateDocument(property.id, selectedDocId, { status: "uploaded", file_name: file.name, file_url: URL.createObjectURL(file), uploaded_at: new Date().toISOString() });
    refresh();
    showToast("success", t("upload.success", { fileName: file.name }));
  }

  async function handleExtract() {
    if (!property || !selectedDocId) return;
    const doc = property.documents.find((d) => d.id === selectedDocId);
    if (!doc) return;

    updateDocument(property.id, selectedDocId, { status: "extracting" });
    refresh();
    setExtracting(true);

    try {
      const pdf_base64 = pdfDataMap[selectedDocId] || null;

      if (!pdf_base64) {
        // No base64 available — can't call real API, fall back to mock
        console.warn("No PDF base64 data available for extraction — using mock");
        generateMockFields(doc.type);
        showToast("info", t("extract.demoNoPdf"));
        return;
      }

      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ property_id: property.id, document_id: selectedDocId, document_type: doc.type, pdf_base64 }),
      });

      if (res.ok) {
        const data = await res.json();
        setDocumentFields(property.id, selectedDocId, data.fields);
        refresh();
        showToast("success", t("extract.success"));
      } else {
        const errorData = await res.json().catch(() => ({ error: "Unknown error" }));
        console.error("Extraction API error:", res.status, errorData);
        generateMockFields(doc.type);
        showToast("info", `${t("extract.demoComplete")} (API: ${errorData.error || res.status})`);
      }
    } catch (err) {
      console.error("Extraction fetch error:", err);
      generateMockFields(doc.type);
      showToast("info", t("extract.demoComplete"));
    } finally {
      setExtracting(false);
    }
  }

  function generateMockFields(docType: string) {
    if (!property || !selectedDocId) return;
    const config = DOCUMENT_CONFIGS[docType as keyof typeof DOCUMENT_CONFIGS];
    if (!config) return;
    const mockFields: ExtractedField[] = config.expectedFields.map((fieldDef, i) => ({
      id: `${selectedDocId}-field-${i}`,
      document_id: selectedDocId,
      field_name: fieldDef.name,
      field_label: fieldDef.label,
      field_value: "Demo waarde",
      original_value: "Demo waarde",
      confidence: (["high", "medium", "high", "high", "medium", "low"] as const)[i % 6],
      verified: false,
      updated_at: new Date().toISOString(),
    }));
    setDocumentFields(property.id, selectedDocId, mockFields);
    refresh();
  }

  function handleFieldUpdate(fieldId: string, newValue: string) {
    if (!property || !selectedDocId) return;
    updateField(property.id, selectedDocId, fieldId, newValue);
    refresh();
    showToast("success", t("field.verified"));
  }

  if (!property) {
    return (
      <div className="flex min-h-screen">
        <Sidebar />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-5 h-5 rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-white animate-spin" />
        </div>
      </div>
    );
  }

  const selectedDoc = property.documents.find((d) => d.id === selectedDocId) || null;

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {mockMode && (
          <div className="mock-banner"><span>Demo</span> — {t("mock.banner").replace("Demo — ", "")}</div>
        )}

        <main className="flex-1 px-10 py-8">
          <DossierHeader property={property} />

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-2">
            <div className="lg:col-span-2">
              <DocumentChecklist documents={property.documents} selectedDocId={selectedDocId} onSelect={setSelectedDocId} />
              <PartyInfoPanel propertyId={property.id} />
              <GenerateButton property={property} />
            </div>
            <div className="lg:col-span-3">
              {selectedDoc ? (
                <ExtractionPanel
                  document={selectedDoc}
                  propertyId={property.id}
                  onFieldUpdate={handleFieldUpdate}
                  onUpload={handleUpload}
                  onExtract={handleExtract}
                  extracting={extracting}
                />
              ) : (
                <div className="border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl p-12 text-center">
                  <p className="text-[12px] text-[#666]">{t("dossier.selectDocument")}</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
