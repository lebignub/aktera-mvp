"use client";

import React, { useState, useCallback, useEffect } from "react";
import { ThemeContext, getStoredTheme, THEME_STORAGE_KEY, type Theme } from "./index";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark");

  // Sync with localStorage on mount
  useEffect(() => {
    setThemeState(getStoredTheme());
  }, []);

  const setTheme = useCallback((newTheme: Theme) => {
    setThemeState(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem(THEME_STORAGE_KEY, next);
      } catch {
        // ignore
      }
      return next;
    });
  }, []);

  return (
    <ThemeContext value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext>
  );
}
