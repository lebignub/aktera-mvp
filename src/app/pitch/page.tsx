"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

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

function BrowserMockup() {
  return (
    <div className="border border-[rgba(255,255,255,0.12)] rounded-xl overflow-hidden bg-[#0A0A0A]">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-[rgba(255,255,255,0.08)]">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#333]" />
        </div>
        <div className="flex-1 flex justify-center">
          <div className="bg-[#111] rounded-md px-4 py-1 text-[11px] text-[#666]">aktera.ai/dossiers</div>
        </div>
      </div>

      {/* App content — stylized dashboard */}
      <div className="flex">
        {/* Mini sidebar */}
        <div className="w-[140px] border-r border-[rgba(255,255,255,0.06)] p-3 shrink-0 hidden md:block">
          <div className="flex items-center gap-1.5 mb-4">
            <div className="w-3 h-3">
              <svg viewBox="0 0 28 28" fill="none"><rect x="5" y="5.5" width="18" height="3.5" rx="1.75" fill="#fff"/><rect x="5" y="12.25" width="18" height="3.5" rx="1.75" fill="#fff"/><rect x="5" y="19" width="18" height="3.5" rx="1.75" fill="#fff"/></svg>
            </div>
            <span className="text-[10px] font-semibold text-white">Aktera</span>
          </div>
          <div className="bg-[rgba(255,255,255,0.06)] rounded-md px-2 py-1.5 text-[9px] text-white mb-1">Dossiers</div>
          <div className="px-2 py-1.5 text-[9px] text-[#666]">Pitch</div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-4 md:p-5">
          {/* Header row */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="h-2.5 w-16 bg-[#222] rounded mb-1.5" />
              <div className="h-2 w-32 bg-[#151515] rounded" />
            </div>
            <div className="bg-white text-black text-[8px] font-medium px-2.5 py-1 rounded-md">
              + Nieuw dossier
            </div>
          </div>

          {/* KPI row */}
          <div className="grid grid-cols-4 gap-2 mb-4 py-3 border-y border-[rgba(255,255,255,0.06)]">
            {["4", "1", "2", "1"].map((v, i) => (
              <div key={i}>
                <div className="text-[8px] text-[#666] mb-1">{["Totaal", "Voltooid", "In behandeling", "Nieuw"][i]}</div>
                <div className="text-[16px] font-semibold text-white">{v}</div>
              </div>
            ))}
          </div>

          {/* Dossier cards */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { addr: "Kerkstraat 42", pct: 100, color: "#00D47E" },
              { addr: "Meir 15", pct: 67, color: "#fff" },
              { addr: "Grote Markt 1", pct: 33, color: "#fff" },
              { addr: "Veldstraat 8", pct: 0, color: "#333" },
            ].map((d) => (
              <div key={d.addr} className="border border-[rgba(255,255,255,0.08)] rounded-lg p-2.5">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[9px] font-medium text-white">{d.addr}</span>
                  <div className="flex items-center gap-1">
                    <div className={`w-1 h-1 rounded-full`} style={{ background: d.color }} />
                    <span className="text-[7px]" style={{ color: d.color }}>
                      {d.pct === 100 ? "Voltooid" : d.pct > 0 ? "Bezig" : "Nieuw"}
                    </span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-[2px] bg-[rgba(255,255,255,0.06)] rounded-full overflow-hidden">
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

function FlowDiagram() {
  return (
    <div className="grid md:grid-cols-3 gap-4 items-stretch">
      {/* Before */}
      <div className="border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
        <p className="text-[10px] text-[#FF4545] font-medium tracking-[0.08em] uppercase mb-3">Vandaag</p>
        <div className="space-y-2">
          {["EPC openen, data aflezen", "Kadaster kopiëren naar Word", "Bodemattest handmatig invoeren", "Compromis veld per veld invullen", "Herhalen voor bod & overeenkomst"].map((s, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-[#FF4545] text-[10px] mt-0.5 shrink-0">—</span>
              <span className="text-[12px] text-[#999] leading-[1.5]">{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <span className="text-[24px] font-semibold text-[#FF4545]">3–4u</span>
          <span className="text-[11px] text-[#666] ml-2">per transactie</span>
        </div>
      </div>

      {/* Arrow / AKTERA */}
      <div className="flex flex-col items-center justify-center py-4">
        <div className="w-10 h-10 rounded-full border border-[rgba(255,255,255,0.12)] flex items-center justify-center mb-3">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </div>
        <p className="text-[13px] font-semibold text-white mb-1">AKTERA</p>
        <p className="text-[11px] text-[#666] text-center">Upload → Extract → Verify → Generate</p>
      </div>

      {/* After */}
      <div className="border border-[rgba(255,255,255,0.08)] rounded-xl p-5">
        <p className="text-[10px] text-[#00D47E] font-medium tracking-[0.08em] uppercase mb-3">Met AKTERA</p>
        <div className="space-y-2">
          {["Documenten uploaden", "AI extraheert alle velden", "Verifiëren met betrouwbaarheidsscore", "Eén klik: compromis gegenereerd", "Terug naar de klant"].map((s, i) => (
            <div key={i} className="flex items-start gap-2">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#00D47E" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
                <path d="M20 6 9 17l-5-5" />
              </svg>
              <span className="text-[12px] text-[#999] leading-[1.5]">{s}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 pt-3 border-t border-[rgba(255,255,255,0.06)]">
          <span className="text-[24px] font-semibold text-[#00D47E]">15 min</span>
          <span className="text-[11px] text-[#666] ml-2">per transactie</span>
        </div>
      </div>
    </div>
  );
}

/* ── Data ── */

const STATS = [
  { value: "70–80%", label: "van de werktijd gaat naar administratie — niet naar klanten, niet naar verkoop" },
  { value: "8/10", label: "makelaars noemen herhaalde data-invoer als hun grootste frustratie" },
  { value: "3–4u", label: "administratief werk per transactie dat niet bij de makelaar hoort" },
  { value: "0", label: "manuele herinvoer nodig voor geverifieerde velden met AKTERA" },
];

const STEP_ICONS = [IconUploadCloud, IconScan, IconFileDown];
const STEPS = [
  {
    title: "Upload uw documenten",
    description:
      "Sleep uw EPC, bodemattest, kadastrale legger, eigendomsakte en andere dossier-documenten naar het platform. PDF's worden direct verwerkt.",
  },
  {
    title: "AI extraheert — u verifieert",
    description:
      "AKTERA's AI leest elk document en extraheert gestructureerde velden met betrouwbaarheidsniveaus. U houdt de controle: corrigeer waar nodig, bevestig met één klik.",
  },
  {
    title: "Genereer uw compromis",
    description:
      "Alle geverifieerde data vloeit automatisch in uw CIV/CEB-template. Download een volledig ingevuld Word-document, klaar voor de notaris. Nul herinvoer.",
  },
];

const FEATURE_ICONS = [IconShield, IconFileText, IconLayers, IconPlug];
const FEATURES = [
  {
    title: "Vertrouwen staat voorop",
    description:
      "Elk geëxtraheerd veld toont een betrouwbaarheidsniveau — hoog, gemiddeld of laag. U beslist altijd, niet de machine. Handmatige correctie is altijd mogelijk.",
  },
  {
    title: "Werkt met uw eigen templates",
    description:
      "AKTERA vult uw bestaande CIV/CEB Word-templates in — ook als uw kantoor een aangepaste versie gebruikt. Geen nieuw formaat, geen leercurve. Uw notaris ontvangt exact wat hij verwacht.",
  },
  {
    title: "6 documenttypes, één dossier",
    description:
      "EPC, bodemattest, kadastrale legger, elektrische keuring, eigendomsakte, asbestattest — elk met een eigen structuur en formaat, allemaal automatisch verwerkt en gecentraliseerd in één dossier.",
  },
  {
    title: "Past in uw bestaande workflow",
    description:
      "AKTERA vervangt niets. Het vult de leegte tussen Realsmart (documenten verzamelen) en uw compromis-template (handmatig invullen).",
  },
];

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

const LANDSCAPE = [
  { tool: "Whise", does: "CRM, lead tracking, listings", gap: "Geen document-extractie, geen compromis-generatie" },
  { tool: "Omnicasa", does: "CRM, vastgoedbeheer", gap: "Geen AI-extractie, geen documentworkflow" },
  { tool: "Realsmart", does: "Kadastrale docs, bodemattest aanvragen", gap: "Geen extractie, geen pre-fill" },
  { tool: "CIV/CEB", does: "Juridisch gevalideerde Word-templates", gap: "Nul automatisering — puur handmatig invullen" },
];

/* ── Page ── */

export default function PitchPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-black/80 backdrop-blur-md border-b border-[rgba(255,255,255,0.06)]">
        <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">
          <Logo size="md" />
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[13px] text-[#999] hover:text-white transition-colors">
              Platform
            </Link>
            <a
              href="mailto:matteo@aktera.ai?subject=Vroege%20toegang%20aanvragen"
              className="text-[13px] font-medium bg-white text-black px-4 py-1.5 rounded-lg hover:bg-[#E5E5E5] transition-colors"
            >
              Vroege toegang
            </a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="max-w-[1100px] mx-auto px-6 pt-24 pb-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Copy */}
          <div>
            <p className="text-[13px] text-[#666] font-medium tracking-[-0.01em] mb-4">
              Voor vastgoedmakelaars die liever verkopen dan administreren
            </p>
            <h1 className="text-[40px] leading-[1.1] font-semibold tracking-[-0.03em] mb-6">
              Terug naar wat u
              <br />
              het beste doet.
              <br />
              <span className="text-[#999]">Verkopen.</span>
            </h1>
            <p className="text-[16px] leading-[1.6] text-[#999] tracking-[-0.01em] mb-8 max-w-[440px]">
              U werd makelaar om mensen te verbinden met hun droomwoning — niet om dezelfde gegevens
              vier keer over te typen. AKTERA neemt het administratieve werk over, voor u én uw team.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="text-[14px] font-medium bg-white text-black px-6 py-2.5 rounded-lg hover:bg-[#E5E5E5] transition-colors"
              >
                Bekijk de demo
              </Link>
              <a
                href="mailto:matteo@aktera.ai?subject=Vroege%20toegang%20aanvragen"
                className="text-[14px] font-medium text-[#999] border border-[rgba(255,255,255,0.14)] px-6 py-2.5 rounded-lg hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors"
              >
                Vroege toegang
              </a>
            </div>
          </div>

          {/* Browser mockup */}
          <div>
            <BrowserMockup />
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── The problem ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-4">
          Het probleem
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-4 max-w-[560px]">
          Makelaars zijn verkopers. Hun agenda zegt iets anders.
        </h2>
        <p className="text-[14px] text-[#999] leading-[1.6] mb-12 max-w-[520px]">
          Dezelfde adres-, kadaster- en eigendomsgegevens worden handmatig overgetypt van PDF naar
          bod, van bod naar samenwerkingsovereenkomst, van overeenkomst naar compromis. Drie
          documenten, drie keer hetzelfde werk. Ondertussen wachten klanten.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
          {STATS.map((stat) => (
            <div key={stat.value}>
              <p className="text-[32px] font-semibold tracking-[-0.03em] mb-2">{stat.value}</p>
              <p className="text-[13px] text-[#666] leading-[1.5]">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── Before / After flow ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-4">
          Het verschil
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-12 max-w-[520px]">
          Van uren copy-paste naar één klik.
        </h2>
        <FlowDiagram />
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── Quotes ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-10">
          Uit de praktijk — 10 interviews met Vlaamse makelaars
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          {QUOTES.map((q, i) => (
            <div key={i} className="border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
              <p className="text-[15px] text-[#999] leading-[1.6] italic mb-5">
                &ldquo;{q.quote}&rdquo;
              </p>
              {q.translation && (
                <p className="text-[12px] text-[#666] mb-4 -mt-2">{q.translation}</p>
              )}
              <div>
                <p className="text-[13px] font-medium">{q.author}</p>
                {q.role && <p className="text-[11px] text-[#666]">{q.role}</p>}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── How it works ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-4">
          Hoe het werkt
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-12 max-w-[520px]">
          Eén keer invoeren. Overal doorvloeien.
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {STEPS.map((step, i) => {
            const StepIcon = STEP_ICONS[i];
            return (
              <div key={i} className="border border-[rgba(255,255,255,0.08)] rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-4 text-[#999]">
                  <StepIcon />
                </div>
                <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] mb-2">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="text-[16px] font-semibold tracking-[-0.02em] mb-2">{step.title}</h3>
                <p className="text-[13px] text-[#999] leading-[1.6]">{step.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── Features ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-4">
          Waarom AKTERA
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-12 max-w-[480px]">
          Gebouwd voor vertrouwen, niet voor snelheid alleen.
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
          {FEATURES.map((feature, i) => {
            const FeatureIcon = FEATURE_ICONS[i];
            return (
              <div key={feature.title} className="bg-black p-8">
                <div className="w-8 h-8 rounded-lg bg-[rgba(255,255,255,0.04)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center mb-4 text-[#999]">
                  <FeatureIcon />
                </div>
                <h3 className="text-[15px] font-semibold tracking-[-0.01em] mb-2">{feature.title}</h3>
                <p className="text-[13px] text-[#999] leading-[1.6]">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── Competitive positioning ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-4">
          Positionering
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-4 max-w-[560px]">
          AKTERA concurreert niet. Het vult de leegte.
        </h2>
        <p className="text-[14px] text-[#999] leading-[1.6] mb-10 max-w-[520px]">
          De brug tussen document-gathering en contract-drafting die vandaag niet bestaat in de
          Belgische markt. Geen CRM. Geen listing-tool. Puur focus.
        </p>

        <div className="border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
          <div className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.08)]">
            <div className="bg-[#0A0A0A] px-5 py-3 text-[11px] text-[#666] font-medium">Tool</div>
            <div className="bg-[#0A0A0A] px-5 py-3 text-[11px] text-[#666] font-medium">Wat het doet</div>
            <div className="bg-[#0A0A0A] px-5 py-3 text-[11px] text-[#666] font-medium">Wat het niet doet</div>
          </div>
          {LANDSCAPE.map((row) => (
            <div key={row.tool} className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.08)]">
              <div className="bg-black px-5 py-3.5 text-[13px] font-medium">{row.tool}</div>
              <div className="bg-black px-5 py-3.5 text-[13px] text-[#999]">{row.does}</div>
              <div className="bg-black px-5 py-3.5 text-[13px] text-[#999]">{row.gap}</div>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.08)]">
            <div className="bg-black px-5 py-3.5 text-[13px] font-semibold">AKTERA</div>
            <div className="bg-black px-5 py-3.5 text-[13px] text-white font-medium">
              Document → Compromis pipeline
            </div>
            <div className="bg-black px-5 py-3.5 text-[13px] text-[#666] italic">
              Niet een CRM. Niet een listing-tool. Gefocust.
            </div>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── CTA ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-24 text-center">
        <h2 className="text-[32px] font-semibold tracking-[-0.03em] mb-4">
          Meer tijd voor wat ertoe doet.
        </h2>
        <p className="text-[15px] text-[#999] mb-10 max-w-[460px] mx-auto leading-[1.6]">
          AKTERA is in actieve ontwikkeling met een select aantal Vlaamse agentschappen.
          Wij zoeken makelaars die terug willen focussen op verkopen.
        </p>
        <div className="flex items-center justify-center gap-4">
          <a
            href="mailto:matteo@aktera.ai?subject=Vroege%20toegang%20aanvragen"
            className="text-[14px] font-medium bg-white text-black px-6 py-2.5 rounded-lg hover:bg-[#E5E5E5] transition-colors"
          >
            Vroege toegang aanvragen
          </a>
          <Link
            href="/"
            className="text-[14px] font-medium text-[#999] border border-[rgba(255,255,255,0.14)] px-6 py-2.5 rounded-lg hover:text-white hover:border-[rgba(255,255,255,0.3)] transition-colors"
          >
            Bekijk de demo
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-[rgba(255,255,255,0.06)] py-8">
        <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Logo size="sm" />
            <span className="text-[12px] text-[#666]">
              &copy; {new Date().getFullYear()} Aktera. Alle rechten voorbehouden.
            </span>
          </div>
          <div className="flex items-center gap-5">
            <Link href="/" className="text-[12px] text-[#666] hover:text-white transition-colors">
              Platform
            </Link>
            <a
              href="mailto:matteo@aktera.ai"
              className="text-[12px] text-[#666] hover:text-white transition-colors"
            >
              Contact
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
