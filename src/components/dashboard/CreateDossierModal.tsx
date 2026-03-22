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

    // Reset form
    setAddress("");
    setCity("");
    setPostalCode("");
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose} title="Nieuw dossier aanmaken">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
            Adres
          </label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="bv. Kerkstraat 42"
            className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#4F8EFF] transition-colors"
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
              Stad
            </label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="bv. Antwerpen"
              className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#4F8EFF] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#94A3B8] mb-1.5">
              Postcode
            </label>
            <input
              type="text"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="bv. 2000"
              className="w-full bg-[#0D1225] border border-[#1E293B] rounded-xl px-4 py-2.5 text-sm text-[#F1F5F9] placeholder-[#64748B] focus:outline-none focus:border-[#4F8EFF] transition-colors"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
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
