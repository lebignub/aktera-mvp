import Anthropic from "@anthropic-ai/sdk";
import { DocumentType, ExtractedField, ConfidenceLevel } from "@/lib/types";
import { getSystemPrompt, getExtractionPrompt, getModelForDocType } from "./prompts";
import { DOCUMENT_CONFIGS } from "@/lib/documents/config";

// Initialize client lazily — will throw if no API key, caught by caller
let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!client) {
    client = new Anthropic();  // reads ANTHROPIC_API_KEY from env
  }
  return client;
}

interface RawExtractedField {
  field_name: string;
  field_value: string | null;
  confidence: ConfidenceLevel;
  source_page?: number | null;
  source_snippet?: string | null;
}

/**
 * Core extraction function — sends a PDF to Claude and gets structured fields back.
 *
 * @param pdfBase64 - Base64-encoded PDF content
 * @param docType - Which document type to extract
 * @param documentId - ID of the document record (for linking fields)
 * @returns Array of ExtractedField objects ready for storage
 */
export async function extractFromPdf(
  pdfBase64: string,
  docType: DocumentType,
  documentId: string
): Promise<ExtractedField[]> {
  const anthropic = getClient();
  const model = getModelForDocType(docType);
  const systemPrompt = getSystemPrompt();
  const userPrompt = getExtractionPrompt(docType);
  const config = DOCUMENT_CONFIGS[docType];

  // Build a label lookup so we can attach Dutch labels to extracted fields
  const labelMap = new Map(config.expectedFields.map((f) => [f.name, f.label]));

  // Send PDF as a native document content block
  const response = await anthropic.messages.create({
    model,
    max_tokens: 2048,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "document",
            source: {
              type: "base64",
              media_type: "application/pdf",
              data: pdfBase64,
            },
          },
          {
            type: "text",
            text: userPrompt,
          },
        ],
      },
    ],
  });

  // Extract text content from response
  const textBlock = response.content.find((b) => b.type === "text");
  if (!textBlock || textBlock.type !== "text") {
    throw new Error("No text response from Claude");
  }

  // Parse JSON array from response
  const rawText = textBlock.text.trim();

  // Handle potential markdown code fences
  const jsonStr = rawText.startsWith("[")
    ? rawText
    : rawText.replace(/```json?\n?/g, "").replace(/```\n?/g, "").trim();

  let rawFields: RawExtractedField[];
  try {
    rawFields = JSON.parse(jsonStr);
  } catch {
    throw new Error(`Failed to parse extraction response as JSON: ${jsonStr.substring(0, 200)}`);
  }

  // Map raw fields to ExtractedField objects
  const fields: ExtractedField[] = rawFields.map((raw, i) => ({
    id: `${documentId}-field-${i}`,
    document_id: documentId,
    field_name: raw.field_name,
    field_label: labelMap.get(raw.field_name) || raw.field_name,
    field_value: raw.field_value,
    original_value: raw.field_value, // preserve for audit
    confidence: raw.confidence || "medium",
    verified: false,
    updated_at: new Date().toISOString(),
    source_page: raw.source_page ?? null,
    source_snippet: raw.source_snippet ?? null,
  }));

  return fields;
}
