"use client";

import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { api } from "@/lib/api/client";
import { translateLabel } from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { AvailabilityStatus, FuelType, Transmission, Vehicle, VehicleBrand } from "@/lib/types";
import { useEffect, useState } from "react";

export function VehicleCatalog() {
  const { t } = useLanguage();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [brand, setBrand] = useState<VehicleBrand | "all">("all");
  const [transmission, setTransmission] = useState<Transmission | "">("");
  const [fuel, setFuel] = useState<FuelType | "">("");
  const [availability, setAvailability] = useState<AvailabilityStatus | "">("");
  const [maxPrice, setMaxPrice] = useState(800);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .getVehicles({ brand, transmission, fuel, availability, maxPrice, query })
      .then(setVehicles)
      .finally(() => setLoading(false));
  }, [brand, transmission, fuel, availability, maxPrice, query]);

  return (
    <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
      <aside className="h-fit space-y-4 rounded-[22px] border border-black/5 bg-white p-5 shadow-[var(--shadow-card)]">
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
            {t.vehicle.search}
          </span>
          <input
            className="field"
            placeholder={t.vehicle.searchPh}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
            {t.vehicle.brand}
          </span>
          <select
            className="field"
            value={brand}
            onChange={(e) => setBrand(e.target.value as VehicleBrand | "all")}
          >
            <option value="all">{t.vehicle.allF}</option>
            <option>Dacia</option>
            <option>Peugeot</option>
            <option>Opel</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
            {t.vehicle.transmission}
          </span>
          <select
            className="field"
            value={transmission}
            onChange={(e) => setTransmission(e.target.value as Transmission | "")}
          >
            <option value="">{t.vehicle.allF}</option>
            <option value="Manuelle">{translateLabel(t, "Manuelle")}</option>
            <option value="Automatique">{translateLabel(t, "Automatique")}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
            {t.vehicle.fuel}
          </span>
          <select className="field" value={fuel} onChange={(e) => setFuel(e.target.value as FuelType | "")}>
            <option value="">{t.vehicle.allM}</option>
            <option value="Essence">{translateLabel(t, "Essence")}</option>
            <option value="Diesel">{translateLabel(t, "Diesel")}</option>
            <option value="Hybride">{translateLabel(t, "Hybride")}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
            {t.vehicle.availability}
          </span>
          <select
            className="field"
            value={availability}
            onChange={(e) => setAvailability(e.target.value as AvailabilityStatus | "")}
          >
            <option value="">{t.vehicle.allF}</option>
            <option value="AVAILABLE">{t.vehicle.available}</option>
            <option value="LIMITED">{t.vehicle.limited}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
            {t.vehicle.maxPrice} : {maxPrice} MAD
          </span>
          <input
            type="range"
            min={250}
            max={800}
            step={10}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[var(--luxen-red)]"
          />
        </label>
      </aside>

      <div>
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-80 animate-pulse rounded-[22px] bg-luxen-mist" />
            ))}
          </div>
        ) : vehicles.length ? (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {vehicles.map((vehicle, i) => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} index={i} />
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] bg-luxen-mist p-8 text-sm text-luxen-steel">
            {t.vehicle.empty}
          </div>
        )}
      </div>
    </div>
  );
}
