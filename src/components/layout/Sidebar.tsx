"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { IconFolder, IconFileStack, IconSettings } from "@/components/ui/Icons";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import type { Locale } from "@/lib/i18n";

export function Sidebar() {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

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
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-full bg-bg-hover flex items-center justify-center text-[9px] font-medium text-text-secondary">
              MA
            </div>
            <div>
              <p className="text-[12px] font-medium text-text-primary leading-none">Matteo</p>
              <p className="text-[10px] text-text-muted mt-0.5">Pro</p>
            </div>
          </div>
          {/* Language + theme toggles */}
          <div className="flex items-center gap-0.5">
            {(["nl", "fr"] as Locale[]).map((lang) => (
              <button
                key={lang}
                onClick={() => setLocale(lang)}
                className={`
                  px-1.5 py-0.5 rounded text-[9px] font-medium uppercase tracking-[0.05em] transition-colors
                  ${locale === lang
                    ? "bg-[rgba(var(--t-contrast),0.1)] text-text-primary"
                    : "text-text-muted hover:text-text-primary"
                  }
                `}
              >
                {lang}
              </button>
            ))}
            <div className="w-px h-3 bg-[rgba(var(--t-contrast),0.1)] mx-0.5" />
            <button
              onClick={toggleTheme}
              className="p-1 rounded text-text-muted hover:text-text-primary transition-colors"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
