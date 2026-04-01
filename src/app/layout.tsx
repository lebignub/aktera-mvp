import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/lib/i18n/I18nProvider";
import { ThemeProvider } from "@/lib/theme/ThemeProvider";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aktera — AI Dossier Platform",
  description: "AI-powered dossier management for Belgian real estate agencies",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className={`${geist.variable} h-full`} data-theme="dark" suppressHydrationWarning>
      <body className="min-h-full font-sans antialiased">
        {/* Inline script to prevent theme flash — runs before React hydration */}
        <script dangerouslySetInnerHTML={{
          __html: `try{var t=localStorage.getItem('aktera_theme');if(t==='light'||t==='dark')document.documentElement.setAttribute('data-theme',t)}catch(e){}`
        }} />
        <ThemeProvider>
          <I18nProvider>{children}</I18nProvider>
          <ThemeToggle />
        </ThemeProvider>
      </body>
    </html>
  );
}
