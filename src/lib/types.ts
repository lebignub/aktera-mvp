// Core domain types for Aktera dossier management

export enum DocumentType {
  EPC = "epc",
  BODEMATTEST = "bodemattest",
  KADASTRALE_LEGGER = "kadastrale_legger",
  ELEKTRISCHE_KEURING = "elektrische_keuring",
  EIGENDOMSAKTE = "eigendomsakte",
  ASBESTATTEST = "asbestattest",
}

export type DocumentStatus =
  | "missing"      // not yet uploaded
  | "uploaded"     // PDF stored, extraction not started
  | "extracting"   // Claude is processing
  | "extracted"    // fields parsed, awaiting verification
  | "verified";    // all fields reviewed by user

export type ConfidenceLevel = "high" | "medium" | "low";

export interface ExtractedField {
  id: string;
  document_id: string;
  field_name: string;
  field_label: string;         // Dutch display label
  field_value: string | null;
  original_value: string | null; // preserved for audit trail
  confidence: ConfidenceLevel;
  verified: boolean;
  updated_at: string;
  source_page?: number | null;    // page number in source PDF where this field was found
  source_snippet?: string | null; // exact text snippet from the source document
}

export interface Document {
  id: string;
  property_id: string;
  type: DocumentType;
  status: DocumentStatus;
  file_name: string | null;
  file_url: string | null;
  uploaded_at: string | null;
  extracted_at: string | null;
  fields: ExtractedField[];
}

export interface Property {
  id: string;
  address: string;
  city: string;
  postal_code: string;
  created_at: string;
  updated_at: string;
  documents: Document[];
  parties: Party[];
}

// Derived stats for dashboard display
export interface DossierStats {
  total: number;
  complete: number;     // all docs verified
  inProgress: number;   // at least one doc uploaded
  pending: number;      // no docs uploaded yet
}

// Party info — buyer, seller, notary details for the transaction
export type PartyRole = "seller" | "buyer" | "notary";

export interface Party {
  id: string;
  property_id: string;
  role: PartyRole;
  first_name: string;
  last_name: string;
  address: string;
  postal_code: string;
  city: string;
  birth_date: string;       // DD/MM/YYYY
  birth_place: string;
  national_register: string; // rijksregisternummer / numéro de registre national
  email: string;
  phone: string;
  // Notary-specific fields
  office_name?: string;     // kantoor / étude
}

// For the create dossier form
export interface CreateDossierInput {
  address: string;
  city: string;
  postal_code: string;
}

// Template management — agencies upload their own .docx templates
export type TemplateType = "compromis" | "samenwerkingsovereenkomst" | "bod";

export interface Template {
  id: string;
  name: string;           // user-given name, e.g. "CIV Compromis 2024"
  type: TemplateType;
  file_name: string;      // original .docx filename
  file_size: number;       // bytes
  uploaded_at: string;
  last_used_at: string | null;
}

// Contract generation
export interface Contract {
  id: string;
  property_id: string;
  type: "compromis";
  file_url: string;
  generated_at: string;
}

// API response wrappers
export interface ApiResponse<T> {
  data?: T;
  error?: string;
}
