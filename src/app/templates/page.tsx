"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import { IconPlus, IconDocument, IconTrash, IconUpload } from "@/components/ui/Icons";
import { getTemplates, addTemplate, deleteTemplate, isMockMode } from "@/lib/store";
import { useI18n } from "@/lib/i18n";
import type { Template, TemplateType } from "@/lib/types";

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function TemplatesPage() {
  const { locale, t } = useI18n();
  const [templates, setTemplates] = useState<Template[]>(() => getTemplates());
  const [showUpload, setShowUpload] = useState(false);
  const mockMode = isMockMode();

  const dateLocale = locale === "fr" ? "fr-BE" : "nl-BE";

  function formatDate(iso: string): string {
    return new Date(iso).toLocaleDateString(dateLocale, {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  function handleDelete(id: string) {
    deleteTemplate(id);
    setTemplates(getTemplates());
    showToast("success", t("templates.deleted"));
  }

  function handleUploaded(template: Template) {
    setTemplates([template, ...templates.filter((tpl) => tpl.id !== template.id)]);
    setShowUpload(false);
    showToast("success", t("templates.saved", { name: template.name }));
  }

  // Type labels are i18n-driven
  const typeLabel = (type: TemplateType) => {
    const map: Record<TemplateType, string> = {
      compromis: t("templates.typeCompromis"),
      samenwerkingsovereenkomst: t("templates.typeSamenwerkingsovereenkomst"),
      bod: t("templates.typeBod"),
    };
    return map[type];
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {mockMode && (
          <div className="mock-banner"><strong>Demo</strong> &mdash; {t("mock.banner").replace("Demo — ", "").replace("Démo — ", "")}</div>
        )}

        <main className="flex-1 px-10 py-8">
          {/* Page header */}
          <div className="flex items-end justify-between mb-8">
            <div>
              <h1 className="text-[20px] font-semibold text-white tracking-[-0.02em]">{t("templates.title")}</h1>
              <p className="text-[13px] text-[#666] mt-1 tracking-[-0.01em]">
                {t("templates.subtitle")}
              </p>
            </div>
            <Button onClick={() => setShowUpload(true)} size="md">
              <IconPlus size={13} />
              {t("templates.upload")}
            </Button>
          </div>

          {/* Template list */}
          {templates.length === 0 ? (
            <div className="border border-dashed border-[rgba(255,255,255,0.1)] rounded-xl py-16 text-center">
              <p className="text-[14px] text-[#999] mb-1">{t("templates.noTemplates")}</p>
              <p className="text-[12px] text-[#666] mb-6">{t("templates.noTemplatesHint")}</p>
              <Button onClick={() => setShowUpload(true)} size="md">
                <IconPlus size={13} />
                {t("templates.upload")}
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
                        {typeLabel(tpl.type)}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#666] mt-0.5">
                      {tpl.file_name} · {formatFileSize(tpl.file_size)} · {t("templates.uploaded")} {formatDate(tpl.uploaded_at)}
                      {tpl.last_used_at && ` · ${t("templates.lastUsed")} ${formatDate(tpl.last_used_at)}`}
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
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [type, setType] = useState<TemplateType>("compromis");
  const [file, setFile] = useState<File | null>(null);
  const [dragOver, setDragOver] = useState(false);

  // Type labels for the picker buttons
  const typeLabels: Record<TemplateType, string> = {
    compromis: t("templates.typeCompromis"),
    samenwerkingsovereenkomst: t("templates.typeSamenwerkingsovereenkomst"),
    bod: t("templates.typeBod"),
  };

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
      showToast("error", t("templates.docxOnly"));
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
    <Modal open={open} onClose={handleClose} title={t("templates.upload")}>
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
            <p className="text-[11px] text-[#666] mt-1">{formatFileSize(file.size)} · {t("templates.clickToChange")}</p>
          </>
        ) : (
          <>
            <IconUpload size={20} className="text-[#666] mx-auto mb-2" />
            <p className="text-[13px] text-[#999]">{t("templates.dropDocx")}</p>
            <p className="text-[11px] text-[#666] mt-1">{t("templates.orClick")}</p>
          </>
        )}
      </div>

      {/* Name */}
      <div className="mb-4">
        <label className="block text-[11px] text-[#666] font-medium mb-1.5">{t("templates.name")}</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t("templates.namePlaceholder")}
          className="w-full bg-transparent border border-[rgba(255,255,255,0.12)] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#444] focus:outline-none focus:border-[rgba(255,255,255,0.3)] transition-colors"
        />
      </div>

      {/* Type */}
      <div className="mb-6">
        <label className="block text-[11px] text-[#666] font-medium mb-1.5">{t("templates.type")}</label>
        <div className="flex gap-2">
          {(Object.keys(typeLabels) as TemplateType[]).map((tplType) => (
            <button
              key={tplType}
              onClick={() => setType(tplType)}
              className={`
                text-[12px] px-3 py-1.5 rounded-lg border transition-colors
                ${type === tplType
                  ? "border-white text-white bg-[rgba(255,255,255,0.06)]"
                  : "border-[rgba(255,255,255,0.1)] text-[#666] hover:text-white hover:border-[rgba(255,255,255,0.2)]"
                }
              `}
            >
              {typeLabels[tplType]}
            </button>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={handleClose} size="sm">{t("templates.cancelTpl")}</Button>
        <Button onClick={handleSubmit} disabled={!file || !name.trim()} size="sm">{t("templates.saveTpl")}</Button>
      </div>
    </Modal>
  );
}
