import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
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
    <html lang="nl" className={`${plusJakarta.variable} h-full antialiased`}>
      <body className="grain-overlay min-h-full flex flex-col font-sans">
        {/* Aurora gradient background layer */}
        <div className="aurora-bg" />
        {/* Content sits above the aurora */}
        <div className="relative z-10 flex flex-col min-h-full">
          {children}
        </div>
      </body>
    </html>
  );
}
