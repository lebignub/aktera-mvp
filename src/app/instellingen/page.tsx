"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/Button";
import { ToastContainer, showToast } from "@/components/ui/Toast";
import { isMockMode } from "@/lib/store";
import { useT } from "@/lib/i18n";

export default function InstellingenPage() {
  const mockMode = isMockMode();
  const t = useT();

  // Static demo state — not persisted, just for the shell to feel interactive
  const [agencyName, setAgencyName] = useState("Matteo Vastgoed");
  const [email, setEmail] = useState("matteo@aktera.ai");
  const [defaultTemplate, setDefaultTemplate] = useState("compromis");

  function handleSave() {
    showToast("success", t("settings.saved"));
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col min-w-0">
        {mockMode && (
          <div className="mock-banner"><strong>Demo</strong> &mdash; {t("mock.banner").replace("Demo — ", "").replace("Démo — ", "")}</div>
        )}

        <main className="flex-1 px-10 py-8 max-w-[900px]">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-[20px] font-semibold text-text-primary tracking-[-0.02em]">{t("settings.title")}</h1>
            <p className="text-[13px] text-text-muted mt-1 tracking-[-0.01em]">{t("settings.subtitle")}</p>
          </div>

          {/* Agency section */}
          <section className="mb-10">
            <h2 className="text-[13px] text-text-muted font-medium tracking-[0.04em] uppercase mb-5">{t("settings.sectionOffice")}</h2>

            <div className="space-y-5">
              {/* Logo placeholder */}
              <div>
                <label className="block text-[11px] text-text-muted font-medium mb-2">{t("settings.logo")}</label>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(var(--t-contrast),0.04)] border border-[rgba(var(--t-contrast),0.08)] flex items-center justify-center">
                    <span className="text-[14px] font-semibold text-text-muted">MV</span>
                  </div>
                  <button className="text-[12px] text-text-muted border border-[rgba(var(--t-contrast),0.1)] rounded-lg px-3 py-1.5 hover:text-text-primary hover:border-border-hover transition-colors">
                    {t("settings.changeLogo")}
                  </button>
                </div>
              </div>

              {/* Agency name */}
              <div>
                <label className="block text-[11px] text-text-muted font-medium mb-1.5">{t("settings.officeName")}</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-[13px] text-text-primary placeholder-text-muted focus:outline-none focus:border-[rgba(var(--t-contrast),0.3)] transition-colors"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] text-text-muted font-medium mb-1.5">{t("settings.email")}</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-[13px] text-text-primary placeholder-text-muted focus:outline-none focus:border-[rgba(var(--t-contrast),0.3)] transition-colors"
                />
              </div>
            </div>
          </section>

          {/* Defaults section */}
          <section className="mb-10">
            <h2 className="text-[13px] text-text-muted font-medium tracking-[0.04em] uppercase mb-5">{t("settings.sectionDefaults")}</h2>

            <div>
              <label className="block text-[11px] text-text-muted font-medium mb-1.5">{t("settings.defaultTemplateLabel")}</label>
              <select
                value={defaultTemplate}
                onChange={(e) => setDefaultTemplate(e.target.value)}
                className="w-full bg-transparent border border-border rounded-lg px-3 py-2 text-[13px] text-text-primary focus:outline-none focus:border-[rgba(var(--t-contrast),0.3)] transition-colors appearance-none"
                style={{ backgroundImage: "none" }}
              >
                <option value="compromis" className="bg-bg-elevated">{t("settings.optionCompromis")}</option>
                <option value="samenwerkingsovereenkomst" className="bg-bg-elevated">{t("settings.optionSamenwerkingsovereenkomst")}</option>
                <option value="bod" className="bg-bg-elevated">{t("settings.optionBod")}</option>
              </select>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-[rgba(var(--t-contrast),0.08)] mb-6" />

          {/* Save */}
          <div className="flex justify-end">
            <Button onClick={handleSave} size="md">{t("settings.save")}</Button>
          </div>
        </main>
      </div>

      <ToastContainer />
    </div>
  );
}
