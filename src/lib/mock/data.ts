import { Property, Document, ExtractedField, DocumentType, Party } from "@/lib/types";
import { DOCUMENT_TYPE_ORDER } from "@/lib/documents/config";

// Helper to create empty docs for all 6 types
function createEmptyDocuments(propertyId: string): Document[] {
  return DOCUMENT_TYPE_ORDER.map((type) => ({
    id: `${propertyId}-${type}`,
    property_id: propertyId,
    type,
    status: "missing" as const,
    file_name: null,
    file_url: null,
    uploaded_at: null,
    extracted_at: null,
    fields: [],
  }));
}

// Pre-built extracted fields for demo purposes
const epcFields: ExtractedField[] = [
  { id: "f1", document_id: "prop-1-epc", field_name: "epc_score", field_label: "EPC-score", field_value: "186 kWh/m²", original_value: "186 kWh/m²", confidence: "high", verified: true, updated_at: "2026-03-20T10:00:00Z", source_page: 1, source_snippet: "Energiescore: 186 kWh/m² per jaar" },
  { id: "f2", document_id: "prop-1-epc", field_name: "epc_label", field_label: "EPC-label", field_value: "C", original_value: "C", confidence: "high", verified: true, updated_at: "2026-03-20T10:00:00Z", source_page: 1, source_snippet: "Energielabel: C" },
  { id: "f3", document_id: "prop-1-epc", field_name: "epc_nummer", field_label: "Certificaatnummer", field_value: "20240315-0004521", original_value: "20240315-0004521", confidence: "high", verified: true, updated_at: "2026-03-20T10:00:00Z", source_page: 1, source_snippet: "Certificaatnummer: 20240315-0004521" },
  { id: "f4", document_id: "prop-1-epc", field_name: "epc_geldig_tot", field_label: "Geldig tot", field_value: "15/03/2034", original_value: "15/03/2034", confidence: "high", verified: false, updated_at: "2026-03-20T10:00:00Z", source_page: 1, source_snippet: "Geldig tot: 15/03/2034" },
  { id: "f5", document_id: "prop-1-epc", field_name: "epc_adres", field_label: "Adres", field_value: "Kerkstraat 42, 2000 Antwerpen", original_value: "Kerkstraat 42, 2000 Antwerpen", confidence: "high", verified: true, updated_at: "2026-03-20T10:00:00Z", source_page: 1, source_snippet: "Adres: Kerkstraat 42, 2000 Antwerpen" },
  { id: "f6", document_id: "prop-1-epc", field_name: "epc_bouwjaar", field_label: "Bouwjaar", field_value: "1965", original_value: "1965", confidence: "medium", verified: false, updated_at: "2026-03-20T10:00:00Z", source_page: 2, source_snippet: "Bouwjaar van het gebouw: 1965 (bron: kadastergegevens)" },
  { id: "f7", document_id: "prop-1-epc", field_name: "epc_bewoonbare_opp", field_label: "Bewoonbare oppervlakte (m²)", field_value: "142", original_value: "142", confidence: "high", verified: true, updated_at: "2026-03-20T10:00:00Z", source_page: 2, source_snippet: "Bruikbare vloeroppervlakte: 142 m²" },
];

const bodemFields: ExtractedField[] = [
  { id: "f10", document_id: "prop-1-bodemattest", field_name: "bodem_nummer", field_label: "Attestnummer", field_value: "BA-2024-89234", original_value: "BA-2024-89234", confidence: "high", verified: true, updated_at: "2026-03-19T14:00:00Z", source_page: 1, source_snippet: "Kenmerk: BA-2024-89234" },
  { id: "f11", document_id: "prop-1-bodemattest", field_name: "bodem_datum", field_label: "Datum afgifte", field_value: "12/01/2024", original_value: "12/01/2024", confidence: "high", verified: true, updated_at: "2026-03-19T14:00:00Z", source_page: 1, source_snippet: "Datum: 12 januari 2024" },
  { id: "f12", document_id: "prop-1-bodemattest", field_name: "bodem_kadastraal", field_label: "Kadastraal perceel", field_value: "Antwerpen 1e afd., sectie A, nr. 245K", original_value: "Antwerpen 1e afd., sectie A, nr. 245K", confidence: "medium", verified: false, updated_at: "2026-03-19T14:00:00Z", source_page: 1, source_snippet: "Kadastraal perceel: Antwerpen, 1e afdeling, sectie A, perceel 245K" },
  { id: "f13", document_id: "prop-1-bodemattest", field_name: "bodem_status", field_label: "Bodemstatus", field_value: "Geen verontreiniging bekend", original_value: "Geen verontreiniging bekend", confidence: "high", verified: true, updated_at: "2026-03-19T14:00:00Z", source_page: 2, source_snippet: "Conclusie: Er is geen bodemverontreiniging bekend voor dit perceel." },
  { id: "f14", document_id: "prop-1-bodemattest", field_name: "bodem_risicogrond", field_label: "Risicogrond", field_value: "Neen", original_value: "Neen", confidence: "high", verified: true, updated_at: "2026-03-19T14:00:00Z", source_page: 2, source_snippet: "Risicogrond volgens het Bodemdecreet: Neen" },
  { id: "f15", document_id: "prop-1-bodemattest", field_name: "bodem_opmerkingen", field_label: "Opmerkingen", field_value: "Geen bijzondere opmerkingen", original_value: "Geen bijzondere opmerkingen", confidence: "medium", verified: false, updated_at: "2026-03-19T14:00:00Z", source_page: 2, source_snippet: "Bijzondere opmerkingen: geen" },
];

const kadFields: ExtractedField[] = [
  { id: "f20", document_id: "prop-1-kadastrale_legger", field_name: "kad_perceel_nummer", field_label: "Perceelnummer", field_value: "245K", original_value: "245K", confidence: "high", verified: false, updated_at: "2026-03-18T09:00:00Z", source_page: 1, source_snippet: "Perceelnr: 245K" },
  { id: "f21", document_id: "prop-1-kadastrale_legger", field_name: "kad_afdeling", field_label: "Afdeling", field_value: "Antwerpen 1e afdeling", original_value: "Antwerpen 1e afdeling", confidence: "high", verified: false, updated_at: "2026-03-18T09:00:00Z", source_page: 1, source_snippet: "Kadastrale gemeente: ANTWERPEN 1 AFD" },
  { id: "f22", document_id: "prop-1-kadastrale_legger", field_name: "kad_sectie", field_label: "Sectie", field_value: "A", original_value: "A", confidence: "high", verified: false, updated_at: "2026-03-18T09:00:00Z", source_page: 1, source_snippet: "Sectie: A" },
  { id: "f23", document_id: "prop-1-kadastrale_legger", field_name: "kad_oppervlakte", field_label: "Oppervlakte (m²)", field_value: "320", original_value: "320", confidence: "medium", verified: false, updated_at: "2026-03-18T09:00:00Z", source_page: 1, source_snippet: "Oppervlakte: 3a 20ca (320 m²)" },
  { id: "f24", document_id: "prop-1-kadastrale_legger", field_name: "kad_aard", field_label: "Aard", field_value: "Woonhuis", original_value: "Woonhuis", confidence: "high", verified: false, updated_at: "2026-03-18T09:00:00Z", source_page: 1, source_snippet: "Aard: Huis" },
  { id: "f25", document_id: "prop-1-kadastrale_legger", field_name: "kad_eigenaar", field_label: "Eigenaar", field_value: "Janssens Marc", original_value: "Janssens Marc", confidence: "medium", verified: false, updated_at: "2026-03-18T09:00:00Z", source_page: 2, source_snippet: "Eigenaar(s): JANSSENS Marc Emile" },
  { id: "f26", document_id: "prop-1-kadastrale_legger", field_name: "kad_ki", field_label: "Kadastraal inkomen (€)", field_value: "1.250", original_value: "1.250", confidence: "high", verified: false, updated_at: "2026-03-18T09:00:00Z", source_page: 1, source_snippet: "Kadastraal inkomen: € 1.250,00" },
];

// Mock property 1: mostly complete
const prop1Docs = createEmptyDocuments("prop-1");
prop1Docs[0] = { ...prop1Docs[0], status: "verified", file_name: "EPC_Kerkstraat42.pdf", file_url: "/mock/epc.pdf", uploaded_at: "2026-03-20T09:00:00Z", extracted_at: "2026-03-20T09:30:00Z", fields: epcFields };
prop1Docs[1] = { ...prop1Docs[1], status: "extracted", file_name: "Bodemattest_Kerkstraat42.pdf", file_url: "/mock/bodem.pdf", uploaded_at: "2026-03-19T13:00:00Z", extracted_at: "2026-03-19T14:00:00Z", fields: bodemFields };
prop1Docs[2] = { ...prop1Docs[2], status: "extracted", file_name: "Kadaster_Kerkstraat42.pdf", file_url: "/mock/kadaster.pdf", uploaded_at: "2026-03-18T08:00:00Z", extracted_at: "2026-03-18T09:00:00Z", fields: kadFields };

// Mock property 2: just started
const prop2Docs = createEmptyDocuments("prop-2");
prop2Docs[0] = { ...prop2Docs[0], status: "uploaded", file_name: "EPC_Damstraat7.pdf", file_url: "/mock/epc2.pdf", uploaded_at: "2026-03-21T08:00:00Z" };

// Mock property 3: empty
const prop3Docs = createEmptyDocuments("prop-3");

// Mock property 4: fully complete
const prop4EpcFields: ExtractedField[] = [
  { id: "f30", document_id: "prop-4-epc", field_name: "epc_score", field_label: "EPC-score", field_value: "95 kWh/m²", original_value: "95 kWh/m²", confidence: "high", verified: true, updated_at: "2026-03-15T10:00:00Z", source_page: 1, source_snippet: "Energiescore: 95 kWh/m² per jaar" },
  { id: "f31", document_id: "prop-4-epc", field_name: "epc_label", field_label: "EPC-label", field_value: "A", original_value: "A", confidence: "high", verified: true, updated_at: "2026-03-15T10:00:00Z", source_page: 1, source_snippet: "Energielabel: A" },
  { id: "f32", document_id: "prop-4-epc", field_name: "epc_nummer", field_label: "Certificaatnummer", field_value: "20250110-0007891", original_value: "20250110-0007891", confidence: "high", verified: true, updated_at: "2026-03-15T10:00:00Z", source_page: 1, source_snippet: "Certificaatnummer: 20250110-0007891" },
  { id: "f33", document_id: "prop-4-epc", field_name: "epc_geldig_tot", field_label: "Geldig tot", field_value: "10/01/2035", original_value: "10/01/2035", confidence: "high", verified: true, updated_at: "2026-03-15T10:00:00Z", source_page: 1, source_snippet: "Geldig tot: 10/01/2035" },
  { id: "f34", document_id: "prop-4-epc", field_name: "epc_adres", field_label: "Adres", field_value: "Meir 101, 2000 Antwerpen", original_value: "Meir 101, 2000 Antwerpen", confidence: "high", verified: true, updated_at: "2026-03-15T10:00:00Z", source_page: 1, source_snippet: "Adres: Meir 101, 2000 Antwerpen" },
  { id: "f35", document_id: "prop-4-epc", field_name: "epc_bouwjaar", field_label: "Bouwjaar", field_value: "2019", original_value: "2019", confidence: "high", verified: true, updated_at: "2026-03-15T10:00:00Z", source_page: 2, source_snippet: "Bouwjaar van het gebouw: 2019" },
  { id: "f36", document_id: "prop-4-epc", field_name: "epc_bewoonbare_opp", field_label: "Bewoonbare oppervlakte (m²)", field_value: "210", original_value: "210", confidence: "high", verified: true, updated_at: "2026-03-15T10:00:00Z", source_page: 2, source_snippet: "Bruikbare vloeroppervlakte: 210 m²" },
];

const prop4Docs = createEmptyDocuments("prop-4");
// Mark all as verified for the "complete" dossier
prop4Docs.forEach((doc, i) => {
  prop4Docs[i] = {
    ...doc,
    status: "verified",
    file_name: `${doc.type}_Meir101.pdf`,
    file_url: `/mock/${doc.type}.pdf`,
    uploaded_at: "2026-03-15T08:00:00Z",
    extracted_at: "2026-03-15T09:00:00Z",
    fields: i === 0 ? prop4EpcFields : [
      // Minimal verified fields for other doc types
      { id: `f4${i}0`, document_id: doc.id, field_name: "placeholder", field_label: "Placeholder", field_value: "Geverifieerd", original_value: "Geverifieerd", confidence: "high" as const, verified: true, updated_at: "2026-03-15T10:00:00Z", source_page: 1, source_snippet: "Geverifieerd" },
    ],
  };
});

// Party data for the complete dossier (prop-4)
const prop4Parties: Party[] = [
  {
    id: "party-seller-1",
    property_id: "prop-4",
    role: "seller",
    first_name: "Marc",
    last_name: "Janssens",
    address: "Meir 101",
    postal_code: "2000",
    city: "Antwerpen",
    birth_date: "14/05/1972",
    birth_place: "Antwerpen",
    national_register: "72.05.14-123.45",
    email: "marc.janssens@email.be",
    phone: "+32 476 12 34 56",
  },
  {
    id: "party-buyer-1",
    property_id: "prop-4",
    role: "buyer",
    first_name: "Sophie",
    last_name: "De Vries",
    address: "Lange Nieuwstraat 8",
    postal_code: "2000",
    city: "Antwerpen",
    birth_date: "23/09/1988",
    birth_place: "Gent",
    national_register: "88.09.23-456.78",
    email: "sophie.devries@email.be",
    phone: "+32 498 76 54 32",
  },
  {
    id: "party-notary-1",
    property_id: "prop-4",
    role: "notary",
    first_name: "Jan",
    last_name: "Van den Berg",
    address: "Frankrijklei 55",
    postal_code: "2000",
    city: "Antwerpen",
    birth_date: "",
    birth_place: "",
    national_register: "",
    email: "info@notarisvandenberg.be",
    phone: "+32 3 225 67 89",
    office_name: "Notariskantoor Van den Berg",
  },
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: "prop-1",
    address: "Kerkstraat 42",
    city: "Antwerpen",
    postal_code: "2000",
    created_at: "2026-03-18T08:00:00Z",
    updated_at: "2026-03-20T10:00:00Z",
    documents: prop1Docs,
    parties: [],
  },
  {
    id: "prop-2",
    address: "Damstraat 7",
    city: "Brugge",
    postal_code: "8000",
    created_at: "2026-03-21T07:00:00Z",
    updated_at: "2026-03-21T08:00:00Z",
    documents: prop2Docs,
    parties: [],
  },
  {
    id: "prop-3",
    address: "Vrijheidslaan 15",
    city: "Gent",
    postal_code: "9000",
    created_at: "2026-03-21T09:00:00Z",
    updated_at: "2026-03-21T09:00:00Z",
    documents: prop3Docs,
    parties: [],
  },
  {
    id: "prop-4",
    address: "Meir 101",
    city: "Antwerpen",
    postal_code: "2000",
    created_at: "2026-03-10T08:00:00Z",
    updated_at: "2026-03-15T10:00:00Z",
    documents: prop4Docs,
    parties: prop4Parties,
  },
];
