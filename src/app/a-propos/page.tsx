import { AboutPageContent } from "@/components/pages/TranslatedPages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "À propos",
  description: "Luxen Cars — location de voiture premium au Maroc.",
};

export default function AboutPage() {
  return <AboutPageContent />;
}
