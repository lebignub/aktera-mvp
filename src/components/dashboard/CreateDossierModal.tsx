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
  "w-full bg-[#0A0D14] border border-[rgba(255,255,255,0.06)] rounded-xl h-10 px-3.5 text-[13px] text-white placeholder-[#454D5E] focus:outline-none focus:border-[#3B82F6] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.1)] transition-all";

export function CreateDossierModal({ open, onClose, onCreate }: CreateDossierModalProps) {
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
    <Modal open={open} onClose={onClose} title="Nieuw dossier">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[11px] text-[#454D5E] font-medium mb-2">Adres</label>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Kerkstraat 42" className={inputClass} autoFocus />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] text-[#454D5E] font-medium mb-2">Stad</label>
            <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Antwerpen" className={inputClass} />
          </div>
          <div>
            <label className="block text-[11px] text-[#454D5E] font-medium mb-2">Postcode</label>
            <input type="text" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} placeholder="2000" className={inputClass} />
          </div>
        </div>
        <div className="flex justify-end gap-2 pt-3">
          <Button variant="ghost" type="button" onClick={onClose}>Annuleren</Button>
          <Button type="submit" disabled={!canSubmit}>Aanmaken</Button>
        </div>
      </form>
    </Modal>
  );
}
