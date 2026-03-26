"use client";

import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { nl, type TranslationKey } from "./locales/nl";
import { fr } from "./locales/fr";

export type Locale = "nl" | "fr";

const translations: Record<Locale, Record<TranslationKey, string>> = { nl, fr };

const STORAGE_KEY = "aktera_locale";

// Get stored locale or default to Dutch
function getStoredLocale(): Locale {
  if (typeof window === "undefined") return "nl";
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "nl" || stored === "fr") return stored;
  } catch {
    // ignore
  }
  return "nl";
}

// Translation function type — supports simple interpolation with {key} placeholders
type TFunction = (key: TranslationKey, vars?: Record<string, string | number>) => string;

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: TFunction;
}

// Default context (SSR-safe)
const I18nContext = createContext<I18nContextValue>({
  locale: "nl",
  setLocale: () => {},
  t: (key) => nl[key] ?? key,
});

export function useI18n() {
  return useContext(I18nContext);
}

// Shorthand hook — just the translation function
export function useT(): TFunction {
  const { t } = useI18n();
  return t;
}

export { I18nContext, getStoredLocale, translations, STORAGE_KEY };
export type { TFunction, I18nContextValue, TranslationKey };
