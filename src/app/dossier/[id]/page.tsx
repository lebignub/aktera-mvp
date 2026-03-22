"use client";

import { useState, useEffect, useCallback, use } from "react";
import { useRouter } from "next/navigation";
import { getProperty, updateDocument, updateField, setDocumentFields } from "@/lib/store";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";
import { DossierHeader } from "@/components/dossier/DossierHeader";
import { DocumentChecklist } from "@/components/dossier/DocumentChecklist";
import { ExtractionPanel } from "@/components/dossier/ExtractionPanel";
import { GenerateButton } from "@/components/dossier/GenerateButton";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import type { Property, ExtractedField } from "@/lib/types";
import { isMockMode } from "@/lib/store";

export default function DossierPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [property, setProperty] = useState<Property | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [extracting, setExtracting] = useState(false);
  const [pdfDataMap, setPdfDataMap] = useState<Record<string, string>>({});
  const mockMode = isMockMode();

  useEffect(() => {
    const prop = getProperty(id);
    if (!prop) {
      router.push("/");
      return;
    }
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

    updateDocument(property.id, selectedDocId, {
      status: "uploaded",
      file_name: file.name,
      file_url: URL.createObjectURL(file),
      uploaded_at: new Date().toISOString(),
    });

    refresh();
    showToast("success", `${file.name} geupload`);
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

      const res = await fetch("/api/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: property.id,
          document_id: selectedDocId,
          document_type: doc.type,
          pdf_base64,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setDocumentFields(property.id, selectedDocId, data.fields);
        refresh();
        showToast("success", "Data succesvol geextraheerd");
      } else {
        generateMockFields(doc.type);
        showToast("info", "Demo-extractie voltooid (geen API key)");
      }
    } catch {
      generateMockFields(doc.type);
      showToast("info", "Demo-extractie voltooid (offline modus)");
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
    showToast("success", "Veld bijgewerkt en geverifieerd");
  }

  if (!property) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-2 border-[rgba(126,180,255,0.2)] border-t-[#7EB4FF] animate-spin" />
      </div>
    );
  }

  const selectedDoc = property.documents.find((d) => d.id === selectedDocId) || null;

  return (
    <div className="min-h-screen flex flex-col">
      {mockMode && (
        <div className="mock-banner">
          Demo-modus — data wordt lokaal opgeslagen
        </div>
      )}

      <main className="flex-1 max-w-6xl mx-auto w-full px-8 pb-12">
        <DossierHeader property={property} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2">
            <DocumentChecklist
              documents={property.documents}
              selectedDocId={selectedDocId}
              onSelect={setSelectedDocId}
            />
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
              <div className="glass-card p-16 text-center">
                <p className="text-[#576580]">Selecteer een document om te beginnen</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <ToastContainer />
    </div>
  );
}
