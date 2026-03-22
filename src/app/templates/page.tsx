"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import { IconPlus, IconDocument, IconTrash, IconUpload } from "@/components/ui/Icons";
import { getTemplates, addTemplate, deleteTemplate, isMockMode } from "@/lib/store";
import type { Template, TemplateType } from "@/lib/types";

// Human-readable labels for template types
const TYPE_LABELS: Record<TemplateType, string> = {
  compromis: "Compromis",
  samenwerkingsovereenkomst: "Samenwerkingsovereenkomst",
  bod: "Bod",
};

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("nl-BE", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function TemplatesPage() {
  const [templates, setTemplates] = useState<Template[]>(() => getTemplates());
  const [showUpload, setShowUpload] = useState(false);
  const mockMode = isMockMode();

  function handleDelete(id: string) {
    deleteTemplate(id);
    setTemplates(getTemplates());
    showToast("success", "Template verwijderd");
  }

  function handleUploaded(template: Template) {
    setTemplates([template, ...templates.filter((t) => t.id !== template.id)]);
    setShowUpload(false);
    showToast("success", `"${template.name}" opgeslagen`);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {mockMode && (
          <div className="mock-banner"><strong>Demo</strong> &mdash; data wordt lokaal opgeslagen</div>
        )}

        <main className="flex-1 px-10 py-8 max-w-[900px]">
          {/* Page header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-[20px] font-semibold text-white tracking-[-0.02em]">Templates</h1>
              <p className="text-[13px] text-[#666] mt-1 tracking-[-0.01em]">
                Uw Word-templates voor compromis, bod en overeenkomsten
              </p>
            </div>
            <Button onClick={() => setShowUpload(true)} size="md">
              <IconPlus size={13} />
              Template uploaden
            </Button>
          </div>

          {/* Template list */}
          {templates.length === 0 ? (
            <div className="border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl py-16 text-center">
              <p className="text-[14px] text-[#999] mb-1">Geen templates</p>
              <p className="text-[12px] text-[#666] mb-6">Upload uw eerste Word-template om te beginnen</p>
              <Button onClick={() => setShowUpload(true)} size="md">
                <IconPlus size={13} />
                Template uploaden
              </Button>
            </div>
          ) : (
            <div className="border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
              {templates.map((tpl, i) => (
                <div
                  key={tpl.id}
                  className={`flex items-center gap-4 px-5 py-4 ${
                    i > 0 ? "border-t border-[rgba(255,255,255,0.06)]" : ""
                  } hover:bg-[rgba(255,255,255,0.02)] transition-colors`}
                >
                  {/* Icon */}
                  <div className="w-9 h-9 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center shrink-0">
                    <IconDocument size={15} className="text-[#999]" />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2.5">
                      <p className="text-[13px] font-medium text-white truncate">{tpl.name}</p>
                      <span className="text-[10px] text-[#666] border border-[rgba(255,255,255,0.1)] rounded px-1.5 py-0.5 shrink-0">
                        {TYPE_LABELS[tpl.type]}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666] mt-0.5">
                      {tpl.file_name} · {formatFileSize(tpl.file_size)} · Geüpload {formatDate(tpl.uploaded_at)}
                      {tpl.last_used_at && ` · Laatst gebruikt ${formatDate(tpl.last_used_at)}`}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => handleDelete(tpl.id)}
                    className="p-2 rounded-lg text-[#666] hover:text-[#FF4545] hover:bg-[rgba(255,255,255,0.04)] transition-colors"
                  >
                    <IconTrash size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      <UploadTemplateModal
        open={showUpload}
        onClose={() => setShowUpload(false)}
        onUploaded={handleUploaded}
      />
      <ToastContainer />
    </div>
  );
}

/* ── Upload modal ── */

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUploaded: (template: Template) => void;
}

function UploadTemplateModal({ open, onClose, onUploaded }: UploadModalProps) {
  const [name, setName] = useState("");
  const [type, setType] = useState<TemplateType>("compromis");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  function reset() {
    setName("");
    setType("compromis");
    setFile(null);
    setDragOver(false);
  }

  function handleClose() {
    reset();
    onClose();
  }

  function handleFile(f: File) {
    // Only accept .docx files
    if (!f.name.endsWith(".docx")) {
      showToast("error", "Alleen .docx bestanden toegestaan");
      return;
    }
    setFile(f);
    // Auto-fill name from filename if empty
    if (!name) {
      setName(f.name.replace(/\.docx$/i, "").replace(/[_-]/g, " "));
    }
  }

  function handleSubmit() {
    if (!file || !name.trim()) return;

    // In mock mode we just store metadata — no actual file upload
    const template = addTemplate({
      name: name.trim(),
      type,
      file_name: file.name,
      file_size: file.size,
    });
    reset();
    onUploaded(template);
  }

  return (
    <Modal open={open} onClose={handleClose} title="Template uploaden">
      {/* Drop zone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files[0];
          if (f) handleFile(f);
        }}
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = ".docx";
          input.onchange = () => {
            const f = input.files?.[0];
            if (f) handleFile(f);
          };
          input.click();
        }}
        className={`
          border border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors mb-5
          ${dragOver
            ? "border-white bg-[rgba(255,255,255,0.04)]"
            : file
              ? "border-[rgba(255,255,255,0.2)] bg-[rgba(255,255,255,0.02)]"
              : "border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]"
          }
        `}
      >
        {file ? (
          <>
            <IconDocument size={20} className="text-white mx-auto mb-2" />
            <p className="text-[13px] text-white">{file.name}</p>
            <p className="text-[11px] text-[#666] mt-1">{formatFileSize(file.size)} · Klik om te wijzigen</p>
          </>
        ) : (
          <>
            <IconUpload size={20} className="text-[#666] mx-auto mb-2" />
            <p className="text-[13px] text-[#999]">Sleep uw .docx template hierheen</p>
            <p className="text-[11px] text-[#666] mt-1">of klik om te selecteren</p>
          </>
        )}
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-[11px] text-[#666] font-medium mb-1.5">Naam</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bijv. CIV Compromis 2024"
          className="w-full bg-transparent border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#444] focus:outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors"
        />
      </div>

      {/* Type */}
      <div className="mb-6">
        <label className="block text-[11px] text-[#666] font-medium mb-1.5">Type</label>
        <div className="flex gap-2">
          {(Object.keys(TYPE_LABELS) as TemplateType[]).map((t) => (
            <button
              key={t}
              onClick={() => setType(t)}
              className={`
                text-[12px] px-3 py-1.5 rounded-lg border transition-colors
                ${type === t
                  ? "border-white text-white bg-[rgba(255,255,255,0.06)]"
                  : "border-[rgba(255,255,255,0.1)] text-[#666] hover:text-white hover:border-[rgba(255,255,255,0.2)]"
                }
              `}
            >
              {TYPE_LABELS[t]}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={handleClose} size="sm">Annuleren</Button>
        <Button onClick={handleSubmit} disabled={!file || !name.trim()} size="sm">Opslaan</Button>
      </div>
    </Modal>
  );
}
