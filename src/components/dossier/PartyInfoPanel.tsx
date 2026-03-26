"use client";

import { useState, useEffect, useCallback } from "react";
import type { Party, PartyRole } from "@/lib/types";
import { getParties, addParty, updateParty, removeParty } from "@/lib/store";
import { useT } from "@/lib/i18n";
import { Button } from "@/components/ui/Button";
import { IconPlus } from "@/components/ui/Icons";
import { showToast } from "@/components/ui/Toast";

// Icons for party roles
function IconUser({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconScale({ size = 14, className = "" }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M16 3h5v5" /><path d="M8 3H3v5" /><path d="M12 22v-8.3a4 4 0 0 0-1.172-2.828L3 3" /><path d="m15 9 6-6" />
    </svg>
  );
}

const ROLE_ORDER: PartyRole[] = ["seller", "buyer", "notary"];

interface PartyFieldProps {
  label: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  type?: string;
}

function PartyField({ label, value, onChange, placeholder, type = "text" }: PartyFieldProps) {
  return (
    <div>
      <label className="block text-[10px] text-[#666] font-medium mb-1 uppercase tracking-[0.05em]">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-[rgba(255,255,255,0.03)] border border-[rgba(255,255,255,0.1)] rounded-lg px-3 py-2 text-[13px] text-white placeholder-[#444] focus:outline-none focus:border-[rgba(255,255,255,0.25)] transition-colors"
      />
    </div>
  );
}

interface PartyCardProps {
  party: Party;
  propertyId: string;
  onUpdate: () => void;
}

function PartyCard({ party, propertyId, onUpdate }: PartyCardProps) {
  const t = useT();
  // Local state for debounced saves
  const [local, setLocal] = useState(party);

  // Sync when party prop changes (e.g., after refresh)
  useEffect(() => { setLocal(party); }, [party]);

  const save = useCallback((field: keyof Party, value: string) => {
    const updated = { ...local, [field]: value };
    setLocal(updated);
    updateParty(propertyId, party.id, { [field]: value });
  }, [local, propertyId, party.id]);

  function handleRemove() {
    removeParty(propertyId, party.id);
    onUpdate();
  }

  const roleLabel = t(`party.${party.role}` as "party.seller" | "party.buyer" | "party.notary");
  const RoleIcon = party.role === "notary" ? IconScale : IconUser;

  return (
    <div className="border border-[rgba(255,255,255,0.1)] rounded-xl p-4 hover:border-[rgba(255,255,255,0.15)] transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <RoleIcon size={13} className="text-[#666]" />
          <span className="text-[12px] font-medium text-white uppercase tracking-[0.05em]">{roleLabel}</span>
        </div>
        <button onClick={handleRemove} className="text-[11px] text-[#666] hover:text-[#ff4444] transition-colors">
          {t("party.removeParty")}
        </button>
      </div>

      {/* Fields grid */}
      <div className="grid grid-cols-2 gap-3">
        <PartyField label={t("party.firstName")} value={local.first_name} onChange={(v) => save("first_name", v)} />
        <PartyField label={t("party.lastName")} value={local.last_name} onChange={(v) => save("last_name", v)} />

        {party.role === "notary" && (
          <div className="col-span-2">
            <PartyField label={t("party.office")} value={local.office_name ?? ""} onChange={(v) => save("office_name" as keyof Party, v)} />
          </div>
        )}

        <div className="col-span-2">
          <PartyField label={t("party.address")} value={local.address} onChange={(v) => save("address", v)} />
        </div>
        <PartyField label={t("party.postalCode")} value={local.postal_code} onChange={(v) => save("postal_code", v)} />
        <PartyField label={t("party.city")} value={local.city} onChange={(v) => save("city", v)} />

        {party.role !== "notary" && (
          <>
            <PartyField label={t("party.birthDate")} value={local.birth_date} onChange={(v) => save("birth_date", v)} placeholder="DD/MM/JJJJ" />
            <PartyField label={t("party.birthPlace")} value={local.birth_place} onChange={(v) => save("birth_place", v)} />
            <div className="col-span-2">
              <PartyField label={t("party.nationalRegister")} value={local.national_register} onChange={(v) => save("national_register", v)} placeholder="XX.XX.XX-XXX.XX" />
            </div>
          </>
        )}

        <PartyField label={t("party.email")} value={local.email} onChange={(v) => save("email", v)} type="email" />
        <PartyField label={t("party.phone")} value={local.phone} onChange={(v) => save("phone", v)} type="tel" />
      </div>
    </div>
  );
}

interface PartyInfoPanelProps {
  propertyId: string;
}

export function PartyInfoPanel({ propertyId }: PartyInfoPanelProps) {
  const t = useT();
  const [parties, setParties] = useState<Party[]>([]);

  const refresh = useCallback(() => {
    setParties(getParties(propertyId));
  }, [propertyId]);

  useEffect(() => { refresh(); }, [refresh]);

  function handleAdd(role: PartyRole) {
    addParty(propertyId, role);
    refresh();
    showToast("success", t("party.saved"));
  }

  // Group by role
  const grouped = ROLE_ORDER.map((role) => ({
    role,
    items: parties.filter((p) => p.role === role),
  }));

  return (
    <div className="mt-6 pt-5 border-t border-[rgba(255,255,255,0.1)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[13px] font-semibold text-white tracking-[-0.01em]">{t("party.title")}</h3>
      </div>

      <div className="space-y-3">
        {grouped.map(({ role, items }) => (
          <div key={role}>
            {items.map((party) => (
              <div key={party.id} className="mb-3">
                <PartyCard party={party} propertyId={propertyId} onUpdate={refresh} />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Add party buttons */}
      <div className="flex flex-wrap gap-2 mt-3">
        {ROLE_ORDER.map((role) => (
          <button
            key={role}
            onClick={() => handleAdd(role)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-dashed border-[rgba(255,255,255,0.1)] text-[11px] text-[#666] hover:text-white hover:border-[rgba(255,255,255,0.2)] transition-colors"
          >
            <IconPlus size={10} />
            {t(`party.${role}` as "party.seller" | "party.buyer" | "party.notary")}
          </button>
        ))}
      </div>
    </div>
  );
}
