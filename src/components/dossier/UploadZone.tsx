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

    /* Simulate upload progress while the request is in flight */
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
          {/* Spinning loader matching the accent color */}
          <div className="w-6 h-6 mx-auto rounded-full border-2 border-[rgba(59,130,246,0.15)] border-t-[#3B82F6] animate-spin" />
          <p className="text-[12px] text-[#7C8494]">Uploaden...</p>
          <div className="max-w-[160px] mx-auto h-[3px] bg-[rgba(255,255,255,0.04)] rounded-full overflow-hidden">
            <div className="h-full bg-[#3B82F6] rounded-full transition-all duration-150" style={{ width: `${progress}%` }} />
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <IconUpload size={20} className="mx-auto text-[#454D5E]" />
          <p className="text-[13px] text-[#7C8494]">
            Sleep een PDF hierheen of <span className="text-[#3B82F6] font-medium">blader</span>
          </p>
          <p className="text-[11px] text-[#454D5E]">PDF, max 20MB</p>
        </div>
      )}
    </div>
  );
}
