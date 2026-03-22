"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import type { CreateDossierInput } from "@/lib/types";

interface CreateDossierModalProps {
  open: boolean;
  onClose: () => void;
  onCreate: (input: CreateDossierInput) => void;
}

const inputClass =
  "w-full bg-[#0F0F12] border border-[#27272A] rounded-lg h-9 px-3 text-[13px] text-[#FAFAFA] placeholder-[#52525B] focus:outline-none focus:border-[#3B82F6] transition-colors";

const labelClass =
  "block text-[11px] text-[#52525B] font-medium mb-1.5";

export function CreateDossierModal({ open, onClose, onCreate }: CreateDossierModalProps) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const canSubmit = address.trim() && city.trim() && postalCode.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;
    onCreate({ address: address.trim(), city: city.trim(), postal_code: postalCode.trim() });
    setAddress("");
    setCity("");
    setPostalCode("");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Nieuw dossier">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={labelClass}>Adres</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Kerkstraat 42" className={inputClass} autoFocus />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className={labelClass}>Stad</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Antwerpen" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Postcode</label>
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="2000" className={inputClass} />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="ghost" type="button" onClick={onClose} size="sm">Annuleren</Button>
          <Button type="submit" disabled={!canSubmit} size="sm">Aanmaken</Button>
        </div>
      </form>
    </Modal>
  );
}
