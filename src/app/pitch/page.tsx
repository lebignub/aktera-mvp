"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { useI18n } from "@/lib/i18n";
import { useTheme } from "@/lib/theme";
import type { Locale, TFunction } from "@/lib/i18n";

/* ── Inline SVG icons for steps ── */

function IconUploadCloud({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      <path d="M12 12v9" />
      <path d="m16 16-4-4-4 4" />
    </svg>
  );
}

function IconScan({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M8 12h8" />
      <path d="M12 8v8" />
    </svg>
  );
}

function IconFileDown({ className = "" }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M12 18v-6" />
      <path d="m9 15 3 3 3-3" />
    </svg>
  );
}

function IconShield({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function IconLayers({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}

function IconFileText({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}

function IconPlug({ className = "" }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M12 22v-5" />
      <path d="M9 8V2" />
      <path d="M15 8V2" />
      <path d="M18 8v5a6 6 0 0 1-12 0V8Z" />
    </svg>
  );
}

/* ── Stylized browser mockup showing the dashboard ── */

function BrowserMockup({ t }: { t: TFunction }) {
  const kpiLabels = [t("kpi.total"), t("kpi.complete"), t("kpi.inProgress"), t("kpi.new")];
  const cards = [
    { addr: "Kerkstraat 42", pct: 100, color: "#00D47E", status: t("pitch.mockup.complete") },
    { addr: "Meir 15", pct: 67, color: "var(--t-fg)", status: t("pitch.mockup.inProgress") },
    { addr: "Grote Markt 1", pct: 33, color: "var(--t-fg)", status: t("pitch.mockup.inProgress") },
    { addr: "Veldstraat 8", pct: 0, color: "var(--t-fg-muted)", status: t("pitch.mockup.new") },
  ];

  return (
    <div className="border border-[rgba(var(--t-contrast),0.12)] rounded-xl overflow-hidden bg-bg-surface">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(var(--t-contrast),0.08)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[rgba(var(--t-contrast),0.2)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[rgba(var(--t-contrast),0.2)]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[rgba(var(--t-contrast),0.2)]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-bg-elevated rounded-md px-4 py-1 text-[11px] text-text-muted">aktera.ai/dossiers</div>
        </div>
      </div>

      {/* App content — stylized dashboard */}
      <div className="flex">
        {/* Mini sidebar */}
        <div className="w-[140px] border-r border-[rgba(var(--t-contrast),0.06)] p-3 shrink-0 hidden md:block">
          <div className="flex items-center gap-1.5 mb-4 text-text-primary">
            <div className="w-3 h-3">
              <svg viewBox="0 0 28 28" fill="none"><rect x="5" y="5.5" width="18" height="3.5" rx="1.75" fill="currentColor"/><rect x="5" y="12.25" width="18" height="3.5" rx="1.75" fill="currentColor"/><rect x="5" y="19" width="18" height="3.5" rx="1.75" fill="currentColor"/></svg>
            </div>
            <span className="text-[10px] font-semibold">Aktera</span>
          </div>
          <div className="bg-[rgba(var(--t-contrast),0.06)] rounded-md px-2 py-1.5 text-[9px] text-text-primary mb-1">{t("nav.dossiers")}</div>
          <div className="px-2 py-1.5 text-[9px] text-text-muted">Pitch</div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-5">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="h-2.5 w-16 bg-bg-hover rounded mb-1.5" />
              <div className="h-2 w-32 bg-[rgba(var(--t-contrast),0.06)] rounded" />
            </div>
            <div className="bg-accent text-accent-foreground text-[8px] font-medium px-2.5 py-1 rounded-md">
              {t("pitch.mockup.newDossier")}
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-2 mb-4 py-3 border-y border-[rgba(var(--t-contrast),0.06)]">
            {["4", "1", "2", "1"].map((v, i) => (
              <div key={i}>
                <div className="text-[8px] text-text-muted mb-1">{kpiLabels[i]}</div>
                <div className="text-[16px] font-semibold text-text-primary">{v}</div>
              </div>
            ))}
          </div>

          {/* Dossier cards */}
          <div className="grid grid-cols-2 gap-2">
            {cards.map((d) => (
              <div key={d.addr} className="border border-[rgba(var(--t-contrast),0.08)] rounded-lg p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-medium text-text-primary">{d.addr}</span>
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-1 rounded-full" style={{ background: d.color }} />
                    <span className="text-[7px]" style={{ color: d.color }}>
                      {d.status}
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-[2px] bg-[rgba(var(--t-contrast),0.06)] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${d.pct}%`, background: d.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Flow diagram: before → AKTERA → after ── */

function FlowDiagram({ t }: { t: TFunction }) {
  const beforeSteps = [t("pitch.before.1"), t("pitch.before.2"), t("pitch.before.3"), t("pitch.before.4"), t("pitch.before.5")];
  const afterSteps = [t("pitch.after.1"), t("pitch.after.2"), t("pitch.after.3"), t("pitch.after.4"), t("pitch.after.5")];

  return (
    <div className="grid md:grid-cols-3 gap-4 items-stretch">
      {/* Before */}
      <div className="border border-[rgba(var(--t-contrast),0.08)] rounded-xl p-5">
        <p className="text-[10px] text-[#FF4545] font-medium tracking-[0.08em] uppercase mb-3">{t("pitch.before.label")}</p>
        <div className="space-y-2">
          {beforeSteps.map((s, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#FF4545] text-[10px] mt-0.5 shrink-0">—</span>
              <span className="text-[12px] text-text-secondary leading-[1.5]">{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[rgba(var(--t-contrast),0.06)]">
          <span className="text-[24px] font-semibold text-[#FF4545]">{t("pitch.before.time")}</span>
          <span className="text-[11px] text-text-muted ml-2">{t("pitch.before.timeLabel")}</span>
        </div>
      </div>

      {/* Arrow / AKTERA */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-10 h-10 rounded-full border border-[rgba(var(--t-contrast),0.12)] flex items-center justify-center mb-3 text-text-primary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
        <p className="text-[13px] font-semibold text-text-primary mb-1">AKTERA</p>
        <p className="text-[11px] text-text-muted text-center">{t("pitch.flow.subtitle")}</p>
      </div>

      {/* After */}
      <div className="border border-[rgba(var(--t-contrast),0.08)] rounded-xl p-5">
        <p className="text-[10px] text-[#00D47E] font-medium tracking-[0.08em] uppercase mb-3">{t("pitch.after.label")}</p>
        <div className="space-y-2">
          {afterSteps.map((s, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D47E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-[12px] text-text-secondary leading-[1.5]">{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[rgba(var(--t-contrast),0.06)]">
          <span className="text-[24px] font-semibold text-[#00D47E]">{t("pitch.after.time")}</span>
          <span className="text-[11px] text-text-muted ml-2">{t("pitch.after.timeLabel")}</span>
        </div>
      </div>
    </div>
  );
}

/* ── Data (quotes stay authentic — not translated) ── */

const QUOTES = [
  {
    quote: "Ik zie mezelf in de eerste plaats als verkoper, maar in de praktijk gaat er veel tijd naar administratieve taken.",
    author: "Makelaar, Vlaanderen",
  },
  {
    quote: "70 à 80% du temps, c'est du travail administratif.",
    author: "Mike",
    role: "Makelaar",
    translation: "70 tot 80% van de tijd is administratief werk.",
  },
  {
    quote: "Dat het automatisch de informatie eruit extracteert en de variabelen invult. Dat zou best handig zijn — maar dat is een beetje utopie, denk ik.",
    author: "An-Marie",
    role: "Makelaar, Vlaanderen",
  },
  {
    quote: "Gegevens één keer invoeren en automatisch doorvloeien in alle documenten van het transactiedossier.",
    author: "Veerle",
    role: "Sotheby's International Realty",
  },
];

const STEP_ICONS = [IconUploadCloud, IconScan, IconFileDown];
const FEATURE_ICONS = [IconShield, IconFileText, IconLayers, IconPlug];

/* ── Page ── */

export default function PitchPage() {
  const { locale, setLocale, t } = useI18n();
  const { theme, toggleTheme } = useTheme();

  // Structured data driven by i18n
  const stats = [
    { value: t("pitch.stat1.value"), label: t("pitch.stat1.label") },
    { value: t("pitch.stat2.value"), label: t("pitch.stat2.label") },
    { value: t("pitch.stat3.value"), label: t("pitch.stat3.label") },
    { value: t("pitch.stat4.value"), label: t("pitch.stat4.label") },
  ];

  const steps = [
    { title: t("pitch.step1.title"), description: t("pitch.step1.description") },
    { title: t("pitch.step2.title"), description: t("pitch.step2.description") },
    { title: t("pitch.step3.title"), description: t("pitch.step3.description") },
  ];

  const features = [
    { title: t("pitch.feature1.title"), description: t("pitch.feature1.description") },
    { title: t("pitch.feature2.title"), description: t("pitch.feature2.description") },
    { title: t("pitch.feature3.title"), description: t("pitch.feature3.description") },
    { title: t("pitch.feature4.title"), description: t("pitch.feature4.description") },
  ];

  const landscape = [
    { tool: "Whise", does: t("pitch.whise.does"), gap: t("pitch.whise.gap") },
    { tool: "Omnicasa", does: t("pitch.omnicasa.does"), gap: t("pitch.omnicasa.gap") },
    { tool: "Realsmart", does: t("pitch.realsmart.does"), gap: t("pitch.realsmart.gap") },
    { tool: "CIV/CEB", does: t("pitch.civ.does"), gap: t("pitch.civ.gap") },
  ];

  // Email subject changes per locale
  const emailSubject = locale === "fr"
    ? "Demande%20d'accès%20anticipé"
    : "Vroege%20toegang%20aanvragen";

  return (
    <div className="min-h-screen bg-bg-app text-text-primary">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[rgba(var(--t-bg-rgb),0.8)] backdrop-blur-md border-b border-[rgba(var(--t-contrast),0.06)]">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            {/* Language toggle */}
            <div className="flex items-center gap-0.5 border border-[rgba(var(--t-contrast),0.1)] rounded-lg overflow-hidden">
              {(["nl", "fr"] as Locale[]).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLocale(lang)}
                  className={`
                    px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.04em] transition-colors
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
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="text-text-muted hover:text-text-primary transition-colors p-1"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                </svg>
              )}
            </button>
            <Link href="/" className="text-[13px] text-text-secondary hover:text-text-primary transition-colors">
              {t("pitch.nav.platform")}
            </Link>
            <a
              href={`mailto:matteo@aktera.ai?subject=${emailSubject}`}
              className="text-[13px] font-medium bg-accent text-accent-foreground px-4 py-1.5 rounded-lg hover:bg-accent-hover transition-colors"
            >
              {t("pitch.nav.earlyAccess")}
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-[1100px] mx-auto px-6 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <p className="text-[13px] text-text-muted font-medium tracking-[-0.01em] mb-4">
              {t("pitch.hero.tagline")}
            </p>
            <h1 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.03em] mb-6">
              {t("pitch.hero.title1")}
              <br />
              {t("pitch.hero.title2")}
              <br />
              <span className="text-text-secondary">{t("pitch.hero.title3")}</span>
            </h1>
            <p className="text-[16px] leading-[1.6] text-text-secondary tracking-[-0.01em] mb-8 max-w-[440px]">
              {t("pitch.hero.description")}
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-[14px] font-medium bg-accent text-accent-foreground px-6 py-2.5 rounded-lg hover:bg-accent-hover transition-colors"
              >
                {t("pitch.hero.viewDemo")}
              </Link>
              <a
                href={`mailto:matteo@aktera.ai?subject=${emailSubject}`}
                className="text-[14px] font-medium text-text-secondary border border-[rgba(var(--t-contrast),0.14)] px-6 py-2.5 rounded-lg hover:text-text-primary hover:border-[rgba(var(--t-contrast),0.3)] transition-colors"
              >
                {t("pitch.nav.earlyAccess")}
              </a>
            </div>
          </div>

          {/* Browser mockup */}
          <div>
            <BrowserMockup t={t} />
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(var(--t-contrast),0.08)]" />
      </div>

      {/* ── The problem ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-text-muted font-medium tracking-[0.08em] uppercase mb-4">
          {t("pitch.problem.label")}
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-4 max-w-[560px]">
          {t("pitch.problem.title")}
        </h2>
        <p className="text-[14px] text-text-secondary leading-[1.6] mb-12 max-w-[520px]">
          {t("pitch.problem.description")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {stats.map((stat) => (
            <div key={stat.value}>
              <p className="text-[32px] font-semibold tracking-[-0.03em] mb-2">{stat.value}</p>
              <p className="text-[13px] text-text-muted leading-[1.5]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(var(--t-contrast),0.08)]" />
      </div>

      {/* ── Before / After flow ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-text-muted font-medium tracking-[0.08em] uppercase mb-4">
          {t("pitch.diff.label")}
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-12 max-w-[520px]">
          {t("pitch.diff.title")}
        </h2>
        <FlowDiagram t={t} />
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(var(--t-contrast),0.08)]" />
      </div>

      {/* ── Quotes (authentic — not translated) ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-text-muted font-medium tracking-[0.08em] uppercase mb-10">
          {t("pitch.quotes.label")}
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {QUOTES.map((q, i) => (
            <div key={i} className="border border-[rgba(var(--t-contrast),0.08)] rounded-xl p-6">
              <p className="text-[15px] text-text-secondary leading-[1.6] italic mb-5">
                &ldquo;{q.quote}&rdquo;
              </p>
              {q.translation && (
                <p className="text-[12px] text-text-muted mb-4 -mt-2">{q.translation}</p>
              )}
              <div>
                <p className="text-[13px] font-medium">{q.author}</p>
                {q.role && <p className="text-[11px] text-text-muted">{q.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(var(--t-contrast),0.08)]" />
      </div>

      {/* ── How it works ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-text-muted font-medium tracking-[0.08em] uppercase mb-4">
          {t("pitch.how.label")}
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-12 max-w-[520px]">
          {t("pitch.how.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, i) => {
            const StepIcon = STEP_ICONS[i];
            return (
              <div key={i} className="border border-[rgba(var(--t-contrast),0.08)] rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[rgba(var(--t-contrast),0.04)] border border-[rgba(var(--t-contrast),0.08)] flex items-center justify-center mb-4 text-text-secondary">
                  <StepIcon />
                </div>
                <p className="text-[11px] text-text-muted font-medium tracking-[0.08em] mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-[16px] font-semibold tracking-[-0.02em] mb-2">{step.title}</h3>
                <p className="text-[13px] text-text-secondary leading-[1.6]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(var(--t-contrast),0.08)]" />
      </div>

      {/* ── Features ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-text-muted font-medium tracking-[0.08em] uppercase mb-4">
          {t("pitch.features.label")}
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-12 max-w-[480px]">
          {t("pitch.features.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-[rgba(var(--t-contrast),0.08)] rounded-xl overflow-hidden border border-[rgba(var(--t-contrast),0.08)]">
          {features.map((feature, i) => {
            const FeatureIcon = FEATURE_ICONS[i];
            return (
              <div key={feature.title} className="bg-bg-app p-8">
                <div className="w-8 h-8 rounded-lg bg-[rgba(var(--t-contrast),0.04)] border border-[rgba(var(--t-contrast),0.08)] flex items-center justify-center mb-4 text-text-secondary">
                  <FeatureIcon />
                </div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] mb-2">{feature.title}</h3>
                <p className="text-[13px] text-text-secondary leading-[1.6]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(var(--t-contrast),0.08)]" />
      </div>

      {/* ── Competitive positioning ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-text-muted font-medium tracking-[0.08em] uppercase mb-4">
          {t("pitch.positioning.label")}
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-4 max-w-[560px]">
          {t("pitch.positioning.title")}
        </h2>
        <p className="text-[14px] text-text-secondary leading-[1.6] mb-10 max-w-[520px]">
          {t("pitch.positioning.description")}
        </p>

        <div className="border border-[rgba(var(--t-contrast),0.08)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-px bg-[rgba(var(--t-contrast),0.08)]">
            <div className="bg-bg-surface px-5 py-3 text-[11px] text-text-muted font-medium">{t("pitch.table.tool")}</div>
            <div className="bg-bg-surface px-5 py-3 text-[11px] text-text-muted font-medium">{t("pitch.table.does")}</div>
            <div className="bg-bg-surface px-5 py-3 text-[11px] text-text-muted font-medium">{t("pitch.table.gap")}</div>
          </div>
          {landscape.map((row) => (
            <div key={row.tool} className="grid grid-cols-3 gap-px bg-[rgba(var(--t-contrast),0.08)]">
              <div className="bg-bg-app px-5 py-3.5 text-[13px] font-medium">{row.tool}</div>
              <div className="bg-bg-app px-5 py-3.5 text-[13px] text-text-secondary">{row.does}</div>
              <div className="bg-bg-app px-5 py-3.5 text-[13px] text-text-secondary">{row.gap}</div>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-px bg-[rgba(var(--t-contrast),0.08)]">
            <div className="bg-bg-app px-5 py-3.5 text-[13px] font-semibold">AKTERA</div>
            <div className="bg-bg-app px-5 py-3.5 text-[13px] text-text-primary font-medium">
              {t("pitch.aktera.does")}
            </div>
            <div className="bg-bg-app px-5 py-3.5 text-[13px] text-text-muted italic">
              {t("pitch.aktera.gap")}
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(var(--t-contrast),0.08)]" />
      </div>

      {/* ── CTA ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-24 text-center">
        <h2 className="text-[32px] font-semibold tracking-[-0.03em] mb-4">
          {t("pitch.cta.title")}
        </h2>
        <p className="text-[15px] text-text-secondary mb-10 max-w-[460px] mx-auto leading-[1.6]">
          {t("pitch.cta.description")}
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href={`mailto:matteo@aktera.ai?subject=${emailSubject}`}
            className="text-[14px] font-medium bg-accent text-accent-foreground px-6 py-2.5 rounded-lg hover:bg-accent-hover transition-colors"
          >
            {t("pitch.cta.earlyAccess")}
          </a>
          <Link
            href="/"
            className="text-[14px] font-medium text-text-secondary border border-[rgba(var(--t-contrast),0.14)] px-6 py-2.5 rounded-lg hover:text-text-primary hover:border-[rgba(var(--t-contrast),0.3)] transition-colors"
          >
            {t("pitch.cta.viewDemo")}
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[rgba(var(--t-contrast),0.06)] py-8">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo size="sm" />
            <span className="text-[12px] text-text-muted">
              &copy; {new Date().getFullYear()} Aktera. {t("pitch.footer.rights")}
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-[12px] text-text-muted hover:text-text-primary transition-colors">
              {t("pitch.nav.platform")}
            </Link>
            <a
              href="mailto:matteo@aktera.ai"
              className="text-[12px] text-text-muted hover:text-text-primary transition-colors"
            >
              {t("pitch.footer.contact")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
