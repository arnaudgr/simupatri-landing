import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simupatri — Simulateurs patrimoniaux immobiliers",
  description:
    "Comparez objectivement LMNP, SCPI, location nue et plus encore avec les vrais calculs fiscaux français. Inscrivez-vous à la beta.",
  openGraph: {
    title: "Simupatri — Simulateurs patrimoniaux immobiliers",
    description:
      "Comparez objectivement LMNP, SCPI, location nue et plus encore avec les vrais calculs fiscaux français.",
    url: "https://simupatri.fr",
    siteName: "Simupatri",
    locale: "fr_FR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
