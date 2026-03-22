import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const documentId = formData.get("document_id") as string | null;
    const propertyId = formData.get("property_id") as string | null;

    if (!file || !documentId || !propertyId) {
      return NextResponse.json(
        { error: "file, document_id, and property_id are required" },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== "application/pdf") {
      return NextResponse.json(
        { error: "Only PDF files are accepted" },
        { status: 400 }
      );
    }

    // In production: upload to Supabase Storage
    // For now: we just acknowledge the upload — the client stores the file locally
    // via URL.createObjectURL and the extraction reads the base64 from the client

    // If Supabase is configured, upload there
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY) {
      // TODO: Supabase storage upload
      // const supabase = createClient(...)
      // await supabase.storage.from('documents').upload(...)
    }

    // Convert to base64 for potential extraction use
    const arrayBuffer = await file.arrayBuffer();
    const base64 = Buffer.from(arrayBuffer).toString("base64");

    return NextResponse.json({
      success: true,
      file_name: file.name,
      document_id: documentId,
      property_id: propertyId,
      // Include base64 so the client can use it for extraction
      pdf_base64: base64,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Upload failed";
    console.error("Upload error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
