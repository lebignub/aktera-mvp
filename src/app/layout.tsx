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
        {children}
      </body>
    </html>
  );
}
