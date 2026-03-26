import { NextRequest, NextResponse } from "next/server";
import { extractFromPdf } from "@/lib/claude/extract";
import { DocumentType } from "@/lib/types";

// Increase max duration for Claude API call (can take 30s+ for large PDFs)
export const maxDuration = 60;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { document_id, document_type } = body;

    if (!document_id || !document_type) {
      return NextResponse.json(
        { error: "document_id and document_type are required" },
        { status: 400 }
      );
    }

    // Validate document type
    if (!Object.values(DocumentType).includes(document_type)) {
      return NextResponse.json(
        { error: `Invalid document_type: ${document_type}` },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.ANTHROPIC_API_KEY) {
      return NextResponse.json(
        { error: "ANTHROPIC_API_KEY not configured" },
        { status: 503 }
      );
    }

    // Read the uploaded file from the request
    // In mock mode the file is uploaded via FormData in /api/upload,
    // so here we expect the PDF content to be passed as base64
    const { pdf_base64 } = body;

    if (!pdf_base64) {
      return NextResponse.json(
        { error: "pdf_base64 is required for extraction" },
        { status: 400 }
      );
    }

    const fields = await extractFromPdf(
      pdf_base64,
      document_type as DocumentType,
      document_id
    );

    return NextResponse.json({ fields });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Extraction failed";
    console.error("Extraction error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
