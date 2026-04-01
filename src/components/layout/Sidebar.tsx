"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { IconFolder, IconFileStack, IconSettings } from "@/components/ui/Icons";
import { useI18n } from "@/lib/i18n";
import type { Locale } from "@/lib/i18n";

export function Sidebar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();

  return (
    <aside className="w-[220px] h-screen sticky top-0 bg-bg-app border-r border-border flex flex-col shrink-0">
      {/* Logo */}
      <div className="h-14 flex items-center px-5">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </div>

      {/* Divider */}
      <div className="mx-5 divider-gradient" />

      {/* Navigation */}
      <nav className="flex-1 px-3 pt-4">
        <Link
          href="/"
          className={`
            flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150
            ${pathname === "/"
              ? "text-text-primary bg-[rgba(var(--t-contrast),0.1)]"
              : "text-text-muted hover:text-text-primary"
            }
          `}
        >
          <IconFolder size={15} className="shrink-0" />
          {t("nav.dossiers")}
        </Link>
        <Link
          href="/templates"
          className={`
            flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150
            ${pathname === "/templates"
              ? "text-text-primary bg-[rgba(var(--t-contrast),0.1)]"
              : "text-text-muted hover:text-text-primary"
            }
          `}
        >
          <IconFileStack size={15} className="shrink-0" />
          {t("nav.templates")}
        </Link>
        <Link
          href="/instellingen"
          className={`
            flex items-center gap-2.5 px-3 py-2 rounded-lg text-[13px] transition-colors duration-150
            ${pathname === "/instellingen"
              ? "text-text-primary bg-[rgba(var(--t-contrast),0.1)]"
              : "text-text-muted hover:text-text-primary"
            }
          `}
        >
          <IconSettings size={15} className="shrink-0" />
          {t("nav.settings")}
        </Link>
      </nav>

      {/* Bottom */}
      <div className="px-5 py-4 border-t border-border">
        <Link
          href="/pitch"
          className="text-[11px] text-text-muted hover:text-text-primary transition-colors mb-3 block"
        >
          {t("nav.pitch")}
        </Link>
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-full bg-bg-hover flex items-center justify-center text-[9px] font-medium text-text-secondary">
            MA
          </div>
          <div>
            <p className="text-[12px] font-medium text-text-primary leading-none">Matteo</p>
            <p className="text-[10px] text-text-muted mt-0.5">Pro</p>
          </div>
        </div>
        {/* Language toggles */}
        <div className="flex items-center gap-1 mt-3">
          {(["nl", "fr"] as Locale[]).map((lang) => (
            <button
              key={lang}
              onClick={() => setLocale(lang)}
              className={`
                px-2 py-1 rounded text-[10px] font-medium uppercase tracking-[0.05em] transition-colors
                ${locale === lang
                  ? "bg-[rgba(var(--t-contrast),0.1)] text-text-primary"
                  : "text-text-muted hover:text-text-primary"
                }
              `}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
