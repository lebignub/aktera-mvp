import { DocumentType } from "@/lib/types";

/**
 * Document-type-specific extraction prompts for Claude.
 * Each prompt tells Claude what type of document it's reading and
 * exactly which fields to extract, with their expected format.
 */

const SYSTEM_PROMPT = `Je bent een AI-assistent die Belgische vastgoeddocumenten analyseert.
Extraheer de gevraagde velden uit het document. Geef het resultaat als een JSON-array.

Regels:
- Geef ALLEEN de gevraagde velden terug
- Als een veld niet gevonden kan worden, geef null als waarde
- Geef een betrouwbaarheidsniveau: "high", "medium", of "low"
- "high" = duidelijk leesbaar en ondubbelzinnig
- "medium" = leesbaar maar mogelijk onvolledig of ambigu
- "low" = moeilijk leesbaar, afgeleid, of onzeker
- Behoud het originele formaat (datums in dd/mm/yyyy, bedragen met punt als duizendtalsscheidingsteken)
- Geef voor elk veld het paginanummer (source_page) waar de waarde gevonden werd
- Geef voor elk veld het exacte tekstfragment (source_snippet) uit het document waaruit de waarde is afgeleid

Output formaat (strict JSON, geen markdown):
[
  { "field_name": "...", "field_value": "..." of null, "confidence": "high"|"medium"|"low", "source_page": 1, "source_snippet": "exact tekst uit het document" }
]`;

const PROMPTS: Record<DocumentType, string> = {
  [DocumentType.EPC]: `Analyseer dit EPC-attest (Energieprestatiecertificaat) en extraheer de volgende velden:

1. epc_score — De EPC-score in kWh/m² per jaar
2. epc_label — Het energielabel (A+, A, B, C, D, E, F)
3. epc_nummer — Het certificaatnummer
4. epc_geldig_tot — Geldig tot datum (dd/mm/yyyy)
5. epc_adres — Het adres van het pand
6. epc_bouwjaar — Het bouwjaar
7. epc_bewoonbare_opp — De bewoonbare oppervlakte in m²`,

  [DocumentType.BODEMATTEST]: `Analyseer dit OVAM bodemattest en extraheer de volgende velden:

1. bodem_nummer — Het attestnummer
2. bodem_datum — Datum van afgifte (dd/mm/yyyy)
3. bodem_kadastraal — Kadastraal perceel (afdeling, sectie, nummer)
4. bodem_status — De bodemstatus (bv. "Geen verontreiniging bekend")
5. bodem_risicogrond — Is het een risicogrond? (Ja/Neen)
6. bodem_opmerkingen — Eventuele bijzondere opmerkingen`,

  [DocumentType.KADASTRALE_LEGGER]: `Analyseer dit kadastraal uittreksel/legger en extraheer de volgende velden:

1. kad_perceel_nummer — Het perceelnummer
2. kad_afdeling — De afdeling
3. kad_sectie — De sectie
4. kad_oppervlakte — De oppervlakte in m²
5. kad_aard — De aard van het goed (bv. Woonhuis, Appartement)
6. kad_eigenaar — Naam van de eigenaar
7. kad_ki — Het kadastraal inkomen in euro`,

  [DocumentType.ELEKTRISCHE_KEURING]: `Analyseer dit keuringsverslag van de elektrische installatie en extraheer de volgende velden:

1. elek_resultaat — Het resultaat (conform/niet-conform)
2. elek_datum_keuring — Datum van de keuring (dd/mm/yyyy)
3. elek_geldig_tot — Geldig tot datum (dd/mm/yyyy)
4. elek_keurder — Naam van de keuringsinstelling
5. elek_pv_nummer — Het PV-nummer
6. elek_opmerkingen — Opmerkingen of vastgestelde inbreuken`,

  [DocumentType.EIGENDOMSAKTE]: `Analyseer deze eigendomsakte (notariële aankoopakte) en extraheer de volgende velden:

1. akte_datum — Datum van de akte (dd/mm/yyyy)
2. akte_notaris — Naam van de notaris
3. akte_verkoper_naam — Naam van de verkoper(s)
4. akte_verkoper_adres — Adres van de verkoper(s)
5. akte_aankoopprijs — De aankoopprijs in euro
6. akte_beschrijving — Beschrijving van het onroerend goed
7. akte_hypotheek — Eventuele hypotheek of last
8. akte_erfdienstbaarheden — Eventuele erfdienstbaarheden`,

  [DocumentType.ASBESTATTEST]: `Analyseer dit asbestinventarisatie-attest en extraheer de volgende velden:

1. asbest_nummer — Het attestnummer
2. asbest_datum — Datum van inspectie (dd/mm/yyyy)
3. asbest_inspecteur — Naam van de gecertificeerde inspecteur
4. asbest_resultaat — Het resultaat (asbestveilig / niet-asbestveilig)
5. asbest_toestand — De toestandsbeoordeling
6. asbest_verwijdering — Is er een verwijderingsplicht? (Ja/Neen/Niet van toepassing)`,
};

export function getSystemPrompt(): string {
  return SYSTEM_PROMPT;
}

export function getExtractionPrompt(docType: DocumentType): string {
  return PROMPTS[docType];
}

/**
 * Model routing: eigendomsakte is complex/long → use Sonnet.
 * All other structured documents → use Haiku (faster + cheaper).
 */
export function getModelForDocType(docType: DocumentType): string {
  if (docType === DocumentType.EIGENDOMSAKTE) {
    return "claude-sonnet-4-6";
  }
  return "claude-haiku-4-5-20251001";
}
