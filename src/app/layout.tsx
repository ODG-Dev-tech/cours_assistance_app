import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from 'nextjs-toploader'

import { Plus_Jakarta_Sans, Inter } from "next/font/google";

const display = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body",
});

export const metadata: Metadata = {
metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Fiches+  Fiches pédagogiques MENAPLN",
    template: "%s | Fiches+",
  },
  description:
    "Générez vos fiches pédagogiques CP1 à CM2 conformes au format API du MENAPLN en quelques minutes grâce à l'IA. Gagnez du temps sur vos préparations de classe.",
  keywords: [
    "fiches pédagogiques",
    "MENAPLN",
    "Burkina Faso",
    "enseignant primaire",
    "Approche Pédagogique Intégratrice",
    "fiche API",
  ],
    appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Fiches+',
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-full flex flex-col font-display text-brand">
        <NextTopLoader color="#3B5FEB" height={5} showSpinner={false} />
        {children}
        </body>
    </html>
  );
}
