import { VehiclesPageContent } from "@/components/pages/TranslatedPages";
import { VehicleCatalog } from "@/components/vehicles/VehicleCatalog";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Nos véhicules",
  description: "Catalogue Luxen Cars — citadines, berlines et SUV au Maroc.",
};

export default function VehiclesPage() {
  return (
    <VehiclesPageContent>
      <Suspense fallback={<div className="h-40 animate-pulse rounded-2xl bg-luxen-mist" />}>
        <VehicleCatalog />
      </Suspense>
    </VehiclesPageContent>
  );
}
