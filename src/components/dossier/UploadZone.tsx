"use client";

import { useState, useRef, useCallback } from "react";
import { IconUpload } from "@/components/ui/Icons";

interface UploadZoneProps {
  documentId: string;
  propertyId: string;
  onUploadComplete: (file: File) => void;
  disabled?: boolean;
}

export function UploadZone({ documentId, propertyId, onUploadComplete, disabled }: UploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.includes("pdf")) return;
    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => prev >= 90 ? (clearInterval(interval), 90) : prev + 12);
    }, 80);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("document_id", documentId);
      formData.append("property_id", propertyId);
      await fetch("/api/upload", { method: "POST", body: formData }).catch(() => {});
      clearInterval(interval);
      setProgress(100);
      onUploadComplete(file);
    } catch {
      clearInterval(interval);
      setProgress(100);
      onUploadComplete(file);
    } finally {
      setTimeout(() => { setUploading(false); setProgress(0); }, 400);
    }
  }, [documentId, propertyId, onUploadComplete]);

  return (
    <div
      className={`upload-zone p-8 text-center cursor-pointer ${isDragging ? "drag-over" : ""} ${disabled ? "opacity-30 cursor-not-allowed" : ""}`}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setIsDragging(true); }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={(e) => { e.preventDefault(); setIsDragging(false); if (!disabled) { const f = e.dataTransfer.files[0]; if (f) handleFile(f); } }}
      onClick={() => { if (!disabled && !uploading) fileInputRef.current?.click(); }}
    >
      <input ref={fileInputRef} type="file" accept=".pdf" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f); e.target.value = ""; }} />

      {uploading ? (
        <div className="space-y-3">
          <div className="w-5 h-5 mx-auto rounded-full border-2 border-[rgba(255,255,255,0.1)] border-t-white animate-spin" />
          <p className="text-[12px] text-[#999]">Uploaden...</p>
          <div className="max-w-[140px] mx-auto h-[2px] bg-[rgba(255,255,255,0.1)] rounded-full overflow-hidden">
            <div className="h-full bg-white rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <IconUpload size={18} className="mx-auto text-[#666]" />
          <p className="text-[13px] text-[#999]">
            Sleep een PDF hierheen of <span className="text-white font-medium">blader</span>
          </p>
          <p className="text-[11px] text-[#666]">PDF, max 20MB</p>
        </div>
      )}
    </div>
  );
}
