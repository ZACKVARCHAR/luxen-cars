import { ContactPageContent } from "@/components/pages/TranslatedPages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez Luxen Cars pour votre location de voiture au Maroc.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
