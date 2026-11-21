import { FaqPageContent } from "@/components/pages/TranslatedPages";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Questions fréquentes sur la location Luxen Cars.",
};

export default function FaqPage() {
  return <FaqPageContent />;
}
