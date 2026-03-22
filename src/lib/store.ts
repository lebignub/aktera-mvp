/**
 * Client-side data store — wraps mock data and provides CRUD operations.
 * When Supabase env vars are present, these functions call real API routes.
 * When missing, they operate on in-memory mock data + localStorage.
 */

import { Property, Document, ExtractedField, CreateDossierInput, Template, TemplateType } from "@/lib/types";
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

// ── Template store (localStorage-backed) ──

const TEMPLATES_KEY = "aktera_templates";

// Seed data so the demo doesn't start empty
const SEED_TEMPLATES: Template[] = [
  {
    id: "tpl-seed-1",
    name: "CIV Compromis",
    type: "compromis",
    file_name: "CIV_Compromis_2024.docx",
    file_size: 245_000,
    uploaded_at: "2026-03-15T10:30:00.000Z",
    last_used_at: "2026-03-20T14:15:00.000Z",
  },
  {
    id: "tpl-seed-2",
    name: "Samenwerkingsovereenkomst",
    type: "samenwerkingsovereenkomst",
    file_name: "Samenwerking_Template.docx",
    file_size: 182_000,
    uploaded_at: "2026-03-18T09:00:00.000Z",
    last_used_at: null,
  },
];

function loadTemplates(): Template[] {
  if (typeof window === "undefined") return SEED_TEMPLATES;
  try {
    const stored = localStorage.getItem(TEMPLATES_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // fall back to seed
  }
  return SEED_TEMPLATES;
}

function saveTemplates(templates: Template[]) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(TEMPLATES_KEY, JSON.stringify(templates));
  } catch {
    // silently ignore
  }
}

export function getTemplates(): Template[] {
  return loadTemplates();
}

export function getTemplate(id: string): Template | undefined {
  return loadTemplates().find((t) => t.id === id);
}

export function addTemplate(input: { name: string; type: TemplateType; file_name: string; file_size: number }): Template {
  const templates = loadTemplates();
  const template: Template = {
    id: `tpl-${Date.now()}`,
    name: input.name,
    type: input.type,
    file_name: input.file_name,
    file_size: input.file_size,
    uploaded_at: new Date().toISOString(),
    last_used_at: null,
  };
  templates.unshift(template);
  saveTemplates(templates);
  return template;
}

export function deleteTemplate(id: string): boolean {
  const templates = loadTemplates();
  const filtered = templates.filter((t) => t.id !== id);
  if (filtered.length === templates.length) return false;
  saveTemplates(filtered);
  return true;
}

export function markTemplateUsed(id: string): void {
  const templates = loadTemplates();
  const tpl = templates.find((t) => t.id === id);
  if (tpl) {
    tpl.last_used_at = new Date().toISOString();
    saveTemplates(templates);
  }
}
