"use client";

import Link from "next/link";
import { Logo } from "@/components/ui/Logo";

/* ── Data ── */

const STATS = [
  { value: "8/10", label: "makelaars noemen herhaalde data-invoer als #1 pijnpunt" },
  { value: "70–80%", label: "van de werktijd gaat naar administratie, niet naar verkoop" },
  { value: "~2u", label: "bespaard per dossier door automatische extractie en pre-fill" },
  { value: "0", label: "manuele herinvoer voor geverifieerde velden" },
];

const STEPS = [
  {
    number: "01",
    title: "Upload documenten",
    description:
      "Sleep uw EPC, bodemattest, kadastrale legger, eigendomsakte en andere vereiste documenten in het dossier. PDF's worden direct verwerkt.",
  },
  {
    number: "02",
    title: "AI extraheert & u verifieert",
    description:
      "Claude AI leest elk document en extraheert gestructureerde velden met betrouwbaarheidsniveaus. U controleert, corrigeert waar nodig, en bevestigt.",
  },
  {
    number: "03",
    title: "Genereer uw compromis",
    description:
      "Eén klik. Alle geverifieerde data vloeit automatisch in uw CIV/CEB-template. Download een volledig ingevuld Word-document, klaar voor de notaris.",
  },
];

const FEATURES = [
  {
    title: "AI-extractie met betrouwbaarheidsscore",
    description:
      "Elk geëxtraheerd veld toont een betrouwbaarheidsniveau — hoog, gemiddeld of laag. U beslist, niet de machine. Handmatige correctie is altijd mogelijk.",
  },
  {
    title: "6 documenttypes, één dossier",
    description:
      "EPC, bodemattest, kadastrale legger, elektrische keuring, eigendomsakte, asbestattest — allemaal verwerkt en gecentraliseerd per vastgoeddossier.",
  },
  {
    title: "Werkt met uw templates",
    description:
      "AKTERA vult uw bestaande CIV/CEB Word-templates in. Geen nieuw formaat, geen leercurve. Uw notaris ontvangt exact wat hij verwacht.",
  },
  {
    title: "Geen CRM, geen overlap",
    description:
      "AKTERA vervangt Whise niet, concurreert niet met Omnicasa. Het vult de leegte tussen Realsmart (documenten verzamelen) en uw compromis-template (handmatig invullen).",
  },
];

const QUOTES = [
  {
    quote: "70 à 80% du temps, c'est du travail administratif.",
    author: "Mike Doolaeghe",
    role: "Makelaar",
    translation: "70 tot 80% van de tijd is administratief werk.",
  },
  {
    quote:
      "Dat het automatisch, wanneer je een document hebt, de informatie eruit extracteert en de variabelen invult. Dat zou best handig zijn.",
    author: "An-Marie",
    role: "Makelaar, Vlaanderen",
  },
  {
    quote:
      "Gegevens één keer invoeren en automatisch doorvloeien in alle documenten van het transactiedossier.",
    author: "Veerle Viérin",
    role: "Sotheby's International Realty",
  },
];

const LANDSCAPE = [
  { tool: "Whise", does: "CRM, lead tracking, listings", gap: "Geen document-extractie, geen compromis-generatie" },
  { tool: "Omnicasa", does: "CRM, vastgoedbeheer", gap: "Geen AI-extractie, geen documentworkflow" },
  { tool: "Realsmart", does: "Kadastrale docs, bodemattest aanvragen", gap: "Geen extractie, geen pre-fill — AKTERA consumeert Realsmart output" },
  { tool: "CIV/CEB", does: "Juridisch gevalideerde Word-templates", gap: "Nul automatisering — AKTERA vult hun templates in" },
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
      <section className="max-w-[1100px] mx-auto px-6 pt-28 pb-20">
        <div className="max-w-[680px]">
          <p className="text-[13px] text-[#666] font-medium tracking-[-0.01em] mb-4">
            AI-powered dossier platform voor Belgische vastgoedmakelaars
          </p>
          <h1 className="text-[44px] leading-[1.1] font-semibold tracking-[-0.03em] mb-6">
            Van document naar compromis.
            <br />
            <span className="text-[#999]">Automatisch.</span>
          </h1>
          <p className="text-[17px] leading-[1.6] text-[#999] tracking-[-0.01em] mb-10 max-w-[520px]">
            Upload uw dossier-documenten. AI extraheert de data. U verifieert. Eén klik genereert een
            volledig ingevuld compromis — nul herinvoer.
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
              Vroege toegang aanvragen
            </a>
          </div>
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── Stats ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
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

      {/* ── How it works ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-10">
          Hoe het werkt
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {STEPS.map((step) => (
            <div key={step.number}>
              <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] mb-4">
                {step.number}
              </p>
              <h3 className="text-[18px] font-semibold tracking-[-0.02em] mb-3">{step.title}</h3>
              <p className="text-[14px] text-[#999] leading-[1.6]">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── Features ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-4">
          Kenmerken
        </p>
        <h2 className="text-[28px] font-semibold tracking-[-0.02em] mb-12 max-w-[480px]">
          Gebouwd voor vertrouwen, niet voor snelheid alleen.
        </h2>
        <div className="grid md:grid-cols-2 gap-px bg-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden border border-[rgba(255,255,255,0.08)]">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="bg-black p-8">
              <h3 className="text-[15px] font-semibold tracking-[-0.01em] mb-2">{feature.title}</h3>
              <p className="text-[13px] text-[#999] leading-[1.6]">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Divider ── */}
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="h-px bg-[rgba(255,255,255,0.08)]" />
      </div>

      {/* ── Quotes ── */}
      <section className="max-w-[1100px] mx-auto px-6 py-20">
        <p className="text-[11px] text-[#666] font-medium tracking-[0.08em] uppercase mb-10">
          Uit de praktijk
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {QUOTES.map((q) => (
            <div
              key={q.author}
              className="border border-[rgba(255,255,255,0.08)] rounded-xl p-6"
            >
              <p className="text-[14px] text-[#999] leading-[1.6] italic mb-5">
                &ldquo;{q.quote}&rdquo;
              </p>
              {q.translation && (
                <p className="text-[12px] text-[#666] mb-4 -mt-2">{q.translation}</p>
              )}
              <div>
                <p className="text-[13px] font-medium">{q.author}</p>
                <p className="text-[11px] text-[#666]">{q.role}</p>
              </div>
            </div>
          ))}
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
          Geen CRM. Geen listing-tool. De brug tussen document-gathering en contract-drafting die
          vandaag niet bestaat in de Belgische markt.
        </p>

        {/* Table */}
        <div className="border border-[rgba(255,255,255,0.08)] rounded-xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.08)]">
            <div className="bg-[#0A0A0A] px-5 py-3 text-[11px] text-[#666] font-medium">Tool</div>
            <div className="bg-[#0A0A0A] px-5 py-3 text-[11px] text-[#666] font-medium">Wat het doet</div>
            <div className="bg-[#0A0A0A] px-5 py-3 text-[11px] text-[#666] font-medium">Wat het niet doet</div>
          </div>
          {/* Rows */}
          {LANDSCAPE.map((row) => (
            <div key={row.tool} className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.08)]">
              <div className="bg-black px-5 py-3.5 text-[13px] font-medium">{row.tool}</div>
              <div className="bg-black px-5 py-3.5 text-[13px] text-[#999]">{row.does}</div>
              <div className="bg-black px-5 py-3.5 text-[13px] text-[#999]">{row.gap}</div>
            </div>
          ))}
          {/* AKTERA row — highlighted */}
          <div className="grid grid-cols-3 gap-px bg-[rgba(255,255,255,0.08)]">
            <div className="bg-black px-5 py-3.5 text-[13px] font-semibold">AKTERA</div>
            <div className="bg-black px-5 py-3.5 text-[13px] text-white font-medium">
              Dossier → Compromis pipeline
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
          Klaar om de brug te slaan?
        </h2>
        <p className="text-[15px] text-[#999] mb-10 max-w-[440px] mx-auto leading-[1.6]">
          AKTERA is in actieve ontwikkeling met een select aantal Vlaamse agentschappen. Vraag
          vroege toegang aan.
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
