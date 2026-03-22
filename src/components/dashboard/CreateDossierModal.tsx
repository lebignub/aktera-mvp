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
  "w-full bg-[rgba(8,14,28,0.5)] border border-[rgba(120,160,210,0.12)] rounded-xl px-4 py-2.5 text-sm text-white placeholder-[#576580] focus:outline-none focus:border-[rgba(126,180,255,0.35)] transition-colors";

export function CreateDossierModal({ open, onClose, onCreate }: CreateDossierModalProps) {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");

  const canSubmit = address.trim() && city.trim() && postalCode.trim();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    onCreate({
      address: address.trim(),
      city: city.trim(),
      postal_code: postalCode.trim(),
    });

    setAddress("");
    setCity("");
    setPostalCode("");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Nieuw dossier aanmaken">
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-[12px] uppercase tracking-[0.08em] font-medium text-[#8B9BB8] mb-2">
            Adres
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="bv. Kerkstraat 42"
            className={inputClass}
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[12px] uppercase tracking-[0.08em] font-medium text-[#8B9BB8] mb-2">
              Stad
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="bv. Antwerpen"
              className={inputClass}
            />
          </div>
          <div>
            <label className="block text-[12px] uppercase tracking-[0.08em] font-medium text-[#8B9BB8] mb-2">
              Postcode
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="bv. 2000"
              className={inputClass}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-3">
          <Button variant="ghost" type="button" onClick={onClose}>
            Annuleren
          </Button>
          <Button type="submit" disabled={!canSubmit}>
            Aanmaken
          </Button>
        </div>
      </form>
    </Modal>
  );
}
