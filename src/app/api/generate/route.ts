import { NextRequest, NextResponse } from "next/server";
import { generateCompromis } from "@/lib/docx/generate";
import { getProperty } from "@/lib/store";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { property_id } = body;

    if (!property_id) {
      return NextResponse.json(
        { error: "property_id is required" },
        { status: 400 }
      );
    }

    const property = getProperty(property_id);
    if (!property) {
      return NextResponse.json(
        { error: "Dossier niet gevonden" },
        { status: 404 }
      );
    }

    // Check that we have some extracted fields
    const hasFields = property.documents.some((d) => d.fields.length > 0);
    if (!hasFields) {
      return NextResponse.json(
        { error: "Geen geëxtraheerde gegevens beschikbaar voor generatie" },
        { status: 400 }
      );
    }

    const docBuffer = await generateCompromis(property);

    // Return the .docx as a downloadable file
    // Convert Buffer to Uint8Array for NextResponse compatibility
    return new NextResponse(new Uint8Array(docBuffer), {
      headers: {
        "Content-Type": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "Content-Disposition": `attachment; filename="compromis_${property.address.replace(/\s+/g, "_")}.docx"`,
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Generation failed";
    console.error("Generation error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
