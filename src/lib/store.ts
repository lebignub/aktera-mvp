/**
 * Client-side data store — wraps mock data and provides CRUD operations.
 * When Supabase env vars are present, these functions call real API routes.
 * When missing, they operate on in-memory mock data + localStorage.
 */

import { Property, Document, ExtractedField, CreateDossierInput } from "@/lib/types";
import { MOCK_PROPERTIES } from "@/lib/mock/data";

// Check if we're running with real backend
export function isMockMode(): boolean {
  // Environment variables are only available server-side in Next.js,
  // so we expose this via a flag set at build time or through an API
  return !process.env.NEXT_PUBLIC_SUPABASE_URL;
}

// ── In-memory store (for mock mode) ──

let properties: Property[] = [...MOCK_PROPERTIES];

// Try loading from localStorage on init (client-side only)
function loadFromStorage(): Property[] {
  if (typeof window === "undefined") return properties;
  try {
    const stored = localStorage.getItem("aktera_properties");
    if (stored) return JSON.parse(stored);
  } catch {
    // Ignore parse errors, fall back to mock
  }
  return properties;
}

function saveToStorage(data: Property[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem("aktera_properties", JSON.stringify(data));
  } catch {
    // Storage full or unavailable — silently ignore
  }
}

// ── Public API ──

export function getProperties(): Property[] {
  properties = loadFromStorage();
  return properties;
}

export function getProperty(id: string): Property | undefined {
  properties = loadFromStorage();
  return properties.find((p) => p.id === id);
}

export function createProperty(input: CreateDossierInput): Property {
  properties = loadFromStorage();
  const { DOCUMENT_TYPE_ORDER } = require("@/lib/documents/config");

  const id = `prop-${Date.now()}`;
  const now = new Date().toISOString();

  // Create empty documents for all 6 types
  const documents: Document[] = DOCUMENT_TYPE_ORDER.map((type: string) => ({
    id: `${id}-${type}`,
    property_id: id,
    type,
    status: "missing",
    file_name: null,
    file_url: null,
    uploaded_at: null,
    extracted_at: null,
    fields: [],
  }));

  const property: Property = {
    id,
    address: input.address,
    city: input.city,
    postal_code: input.postal_code,
    created_at: now,
    updated_at: now,
    documents,
  };

  properties.unshift(property);
  saveToStorage(properties);
  return property;
}

export function updateDocument(propertyId: string, documentId: string, updates: Partial<Document>): Document | null {
  properties = loadFromStorage();
  const property = properties.find((p) => p.id === propertyId);
  if (!property) return null;

  const docIndex = property.documents.findIndex((d) => d.id === documentId);
  if (docIndex === -1) return null;

  property.documents[docIndex] = { ...property.documents[docIndex], ...updates };
  property.updated_at = new Date().toISOString();
  saveToStorage(properties);
  return property.documents[docIndex];
}

export function updateField(
  propertyId: string,
  documentId: string,
  fieldId: string,
  newValue: string
): ExtractedField | null {
  properties = loadFromStorage();
  const property = properties.find((p) => p.id === propertyId);
  if (!property) return null;

  const doc = property.documents.find((d) => d.id === documentId);
  if (!doc) return null;

  const field = doc.fields.find((f) => f.id === fieldId);
  if (!field) return null;

  field.field_value = newValue;
  field.verified = true;
  field.updated_at = new Date().toISOString();

  // Check if all fields in this document are verified → update doc status
  const allVerified = doc.fields.every((f) => f.verified);
  if (allVerified && doc.fields.length > 0) {
    doc.status = "verified";
  }

  property.updated_at = new Date().toISOString();
  saveToStorage(properties);
  return field;
}

export function setDocumentFields(
  propertyId: string,
  documentId: string,
  fields: ExtractedField[]
): Document | null {
  properties = loadFromStorage();
  const property = properties.find((p) => p.id === propertyId);
  if (!property) return null;

  const doc = property.documents.find((d) => d.id === documentId);
  if (!doc) return null;

  doc.fields = fields;
  doc.status = "extracted";
  doc.extracted_at = new Date().toISOString();
  property.updated_at = new Date().toISOString();
  saveToStorage(properties);
  return doc;
}
