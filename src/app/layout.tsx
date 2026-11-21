import { OfferPopup } from "@/components/home/OfferPopup";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HelpAssistant } from "@/components/layout/HelpAssistant";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import type { Metadata } from "next";
import { Manrope, Noto_Sans_Arabic, Outfit } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const notoArabic = Noto_Sans_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Luxen Cars – Location de voiture au Maroc",
    template: "%s | Luxen Cars",
  },
  description:
    "Luxen Cars Fès – location de voitures premium au Maroc. Réservez en ligne, tarifs en MAD, paiement sur place possible. Tél. 06 61 18 62 24.",
  metadataBase: new URL("http://localhost:3000"),
  openGraph: {
    title: "Luxen Cars – Location de voiture à Fès",
    description: "Découvrez le Maroc à votre rythme avec Luxen Cars, basé à Fès.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body className={`${manrope.variable} ${outfit.variable} ${notoArabic.variable} antialiased`}>
        <LanguageProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <OfferPopup />
          <HelpAssistant />
        </LanguageProvider>
      </body>
    </html>
  );
}
