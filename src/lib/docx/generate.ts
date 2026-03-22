import createReport from "docx-templates";
import { readFileSync } from "fs";
import { join } from "path";
import type { Property } from "@/lib/types";

/**
 * Gathers all verified fields from a property's documents
 * and returns them as a flat key-value map for template filling.
 */
function gatherFieldValues(property: Property): Record<string, string> {
  const values: Record<string, string> = {};

  // Property-level data
  values.adres = property.address;
  values.stad = property.city;
  values.postcode = property.postal_code;
  values.datum = new Date().toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  // Flatten all extracted fields into the map
  for (const doc of property.documents) {
    for (const field of doc.fields) {
      // Use the field value (verified or extracted), skip nulls
      if (field.field_value) {
        values[field.field_name] = field.field_value;
      }
    }
  }

  return values;
}

/**
 * Generates a pre-filled .docx compromis from the template.
 * Returns the filled document as a Buffer.
 *
 * @param templateId — when real template storage is wired up, this will
 *   load the agency's uploaded .docx from storage instead of the bundled default.
 *   For now it's accepted but ignored.
 */
export async function generateCompromis(property: Property, templateId?: string): Promise<Buffer> {
  // TODO: when template storage exists, use templateId to fetch the agency's
  // uploaded .docx from Supabase Storage instead of the local fallback.
  const templatePath = join(process.cwd(), "templates", "compromis.docx");

  let template: Buffer;
  try {
    template = readFileSync(templatePath) as Buffer;
  } catch {
    // If no template file exists, create a minimal one in-memory
    // This is a fallback for development / demo purposes
    throw new Error(
      "Template niet gevonden. Plaats een compromis.docx template in de templates/ map."
    );
  }

  const data = gatherFieldValues(property);

  // docx-templates fills {placeholder} tags in the Word document
  const result = await createReport({
    template,
    data,
    cmdDelimiter: ["{", "}"],
    failFast: false, // don't throw on missing placeholders
  });

  return Buffer.from(result);
}
