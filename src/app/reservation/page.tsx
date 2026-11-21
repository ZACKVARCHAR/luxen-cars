import { BookingWizard } from "@/components/booking/BookingWizard";
import { ReservationPageIntro } from "@/components/pages/TranslatedPages";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Réservation",
  description: "Réservez votre véhicule Luxen Cars en quelques étapes.",
};

export default function ReservationPage() {
  return (
    <ReservationPageIntro>
      <Suspense
        fallback={
          <div className="rounded-2xl border border-black/5 bg-white p-8 text-sm text-[#777]">
            …
          </div>
        }
      >
        <BookingWizard />
      </Suspense>
    </ReservationPageIntro>
  );
}
