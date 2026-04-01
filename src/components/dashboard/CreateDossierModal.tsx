"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { useT } from "@/lib/i18n";
import type { CreateDossierInput } from "@/lib/types";

interface CreateDossierModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateDossierInput) => void;
}

const inputClass =
  "w-full bg-bg-surface border border-[rgba(var(--t-contrast),0.1)] rounded-lg h-10 px-3.5 text-[13px] text-text-primary placeholder-text-muted focus:outline-none focus:border-[rgba(var(--t-contrast),0.3)] transition-colors";

export function CreateDossierModal({ open, onClose, onCreate }: CreateDossierModalProps) {
  const t = useT();
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const canSubmit = address.trim() && city.trim() && postalCode.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onCreate({ address: address.trim(), city: city.trim(), postal_code: postalCode.trim() });
    setAddress(""); setCity(""); setPostalCode("");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title={t("createDossier.title")}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] text-text-muted font-medium mb-2">{t("createDossier.address")}</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder={t("createDossier.addressPlaceholder")} className={inputClass} autoFocus />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-text-muted font-medium mb-2">{t("createDossier.city")}</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder={t("createDossier.cityPlaceholder")} className={inputClass} />
          </div>
          <div>
            <label className="block text-[11px] text-text-muted font-medium mb-2">{t("createDossier.postalCode")}</label>
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder={t("createDossier.postalCodePlaceholder")} className={inputClass} />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <Button variant="ghost" type="button" onClick={onClose}>{t("createDossier.cancel")}</Button>
          <Button type="submit" disabled={!canSubmit}>{t("createDossier.create")}</Button>
        </div>
      </form>
    </Modal>
  );
}
