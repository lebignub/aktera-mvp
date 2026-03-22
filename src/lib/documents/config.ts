import { DocumentType } from "@/lib/types";

// Configuration for each document type: what it is, what fields we extract
export interface DocumentTypeConfig {
  type: DocumentType;
  label: string;            // Dutch label for UI
  description: string;      // Short explanation
  icon: string;             // Emoji icon (simple, works everywhere)
  expectedFields: FieldDefinition[];
}

export interface FieldDefinition {
  name: string;             // machine key, used in extraction + template
  label: string;            // Dutch display label
}

export const DOCUMENT_CONFIGS: Record<DocumentType, DocumentTypeConfig> = {
  [DocumentType.EPC]: {
    type: DocumentType.EPC,
    label: "EPC-attest",
    description: "Energieprestatiecertificaat",
    icon: "⚡",
    expectedFields: [
      { name: "epc_score", label: "EPC-score" },
      { name: "epc_label", label: "EPC-label" },
      { name: "epc_nummer", label: "Certificaatnummer" },
      { name: "epc_geldig_tot", label: "Geldig tot" },
      { name: "epc_adres", label: "Adres" },
      { name: "epc_bouwjaar", label: "Bouwjaar" },
      { name: "epc_bewoonbare_opp", label: "Bewoonbare oppervlakte (m²)" },
    ],
  },

  [DocumentType.BODEMATTEST]: {
    type: DocumentType.BODEMATTEST,
    label: "Bodemattest",
    description: "OVAM bodemattest",
    icon: "🌍",
    expectedFields: [
      { name: "bodem_nummer", label: "Attestnummer" },
      { name: "bodem_datum", label: "Datum afgifte" },
      { name: "bodem_kadastraal", label: "Kadastraal perceel" },
      { name: "bodem_status", label: "Bodemstatus" },
      { name: "bodem_risicogrond", label: "Risicogrond" },
      { name: "bodem_opmerkingen", label: "Opmerkingen" },
    ],
  },

  [DocumentType.KADASTRALE_LEGGER]: {
    type: DocumentType.KADASTRALE_LEGGER,
    label: "Kadastrale legger",
    description: "Kadastraal uittreksel",
    icon: "📐",
    expectedFields: [
      { name: "kad_perceel_nummer", label: "Perceelnummer" },
      { name: "kad_afdeling", label: "Afdeling" },
      { name: "kad_sectie", label: "Sectie" },
      { name: "kad_oppervlakte", label: "Oppervlakte (m²)" },
      { name: "kad_aard", label: "Aard" },
      { name: "kad_eigenaar", label: "Eigenaar" },
      { name: "kad_ki", label: "Kadastraal inkomen (€)" },
    ],
  },

  [DocumentType.ELEKTRISCHE_KEURING]: {
    type: DocumentType.ELEKTRISCHE_KEURING,
    label: "Elektrische keuring",
    description: "Keuringsverslag elektrische installatie",
    icon: "🔌",
    expectedFields: [
      { name: "elek_resultaat", label: "Resultaat (conform/niet-conform)" },
      { name: "elek_datum_keuring", label: "Datum keuring" },
      { name: "elek_geldig_tot", label: "Geldig tot" },
      { name: "elek_keurder", label: "Keuringsinstelling" },
      { name: "elek_pv_nummer", label: "PV-nummer" },
      { name: "elek_opmerkingen", label: "Opmerkingen/inbreuken" },
    ],
  },

  [DocumentType.EIGENDOMSAKTE]: {
    type: DocumentType.EIGENDOMSAKTE,
    label: "Eigendomsakte",
    description: "Notariële aankoopakte",
    icon: "📜",
    expectedFields: [
      { name: "akte_datum", label: "Datum akte" },
      { name: "akte_notaris", label: "Notaris" },
      { name: "akte_verkoper_naam", label: "Verkoper naam" },
      { name: "akte_verkoper_adres", label: "Verkoper adres" },
      { name: "akte_aankoopprijs", label: "Aankoopprijs (€)" },
      { name: "akte_beschrijving", label: "Beschrijving onroerend goed" },
      { name: "akte_hypotheek", label: "Hypotheek" },
      { name: "akte_erfdienstbaarheden", label: "Erfdienstbaarheden" },
    ],
  },

  [DocumentType.ASBESTATTEST]: {
    type: DocumentType.ASBESTATTEST,
    label: "Asbestattest",
    description: "Asbestinventarisatie-attest",
    icon: "🏗️",
    expectedFields: [
      { name: "asbest_nummer", label: "Attestnummer" },
      { name: "asbest_datum", label: "Datum inspectie" },
      { name: "asbest_inspecteur", label: "Inspecteur" },
      { name: "asbest_resultaat", label: "Resultaat" },
      { name: "asbest_toestand", label: "Toestandsbeoordeling" },
      { name: "asbest_verwijdering", label: "Verwijderingsplicht" },
    ],
  },
};

// Ordered list of all document types for display
export const DOCUMENT_TYPE_ORDER: DocumentType[] = [
  DocumentType.EPC,
  DocumentType.BODEMATTEST,
  DocumentType.KADASTRALE_LEGGER,
  DocumentType.ELEKTRISCHE_KEURING,
  DocumentType.EIGENDOMSAKTE,
  DocumentType.ASBESTATTEST,
];

// Helper: compute completion percentage for a property
export function computeCompletion(documents: { status: string; fields: { verified: boolean }[] }[]): number {
  const totalTypes = DOCUMENT_TYPE_ORDER.length;
  if (totalTypes === 0) return 0;

  let verifiedTypes = 0;
  for (const doc of documents) {
    if (doc.status === "verified") {
      verifiedTypes++;
    }
  }
  return Math.round((verifiedTypes / totalTypes) * 100);
}
