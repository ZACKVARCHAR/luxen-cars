import { Badge } from "@/components/ui/badge";
import { VEHICLES } from "@/lib/data/vehicles";
import { formatMad } from "@/lib/utils";
import { Box, Fuel, Snowflake, Users, Cog, Palette } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return VEHICLES.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) return { title: "Véhicule" };
  return {
    title: `${vehicle.brand} ${vehicle.model}`,
    description: vehicle.description,
  };
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle = VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) notFound();

  return (
    <div className="container-luxen py-10">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[28px] bg-[#0b0d12] shadow-[var(--shadow-card)]">
            <Image
              src={vehicle.image}
              alt={`${vehicle.brand} ${vehicle.model}`}
              fill
              className="object-contain p-4"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute left-4 top-4 flex gap-2">
              <Badge tone={vehicle.status === "AVAILABLE" ? "success" : "warning"}>
                {vehicle.status === "AVAILABLE" ? "Disponible" : "Stock limité"}
              </Badge>
              {vehicle.placeholder && <Badge tone="neutral">Photo illustrative</Badge>}
            </div>
          </div>
          <div className="mt-6">
            <h1 className="font-display text-4xl font-extrabold tracking-tight text-luxen-ink">
              {vehicle.brand} {vehicle.model}
            </h1>
            <p className="mt-2 text-luxen-steel">{vehicle.category}</p>
            <p className="mt-4 max-w-2xl leading-relaxed text-luxen-ink/80">{vehicle.description}</p>
          </div>
        </div>

        <aside className="h-fit space-y-5 rounded-[28px] border border-black/5 bg-white p-6 shadow-[var(--shadow-card)]">
          <div>
            <div className="text-sm text-luxen-steel">À partir de</div>
            <div className="font-display text-4xl font-extrabold text-luxen-red">
              {formatMad(vehicle.dailyRate)}
              <span className="text-base font-semibold text-luxen-steel"> / jour</span>
            </div>
            <p className="mt-1 text-xs text-luxen-steel">
              Caution indicative : {formatMad(vehicle.deposit)} · Tarifs démo non contractuels
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Spec icon={Users} label="Places" value={String(vehicle.seats)} />
            <Spec icon={Box} label="Bagages" value={String(vehicle.bags)} />
            <Spec icon={Cog} label="Boîte" value={vehicle.transmission} />
            <Spec icon={Fuel} label="Carburant" value={vehicle.fuel} />
            <Spec icon={Snowflake} label="Clim" value={vehicle.airConditioning ? "Oui" : "Non"} />
            <Spec icon={Palette} label="Couleurs" value={vehicle.colors.join(", ")} />
          </div>

          <ul className="space-y-2 border-t border-black/5 pt-4 text-sm text-luxen-ink/80">
            {vehicle.features.map((f) => (
              <li key={f} className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-luxen-red" />
                {f}
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 pt-2">
            <Link
              href={`/reservation?vehicle=${vehicle.slug}`}
              className="btn-primary w-full text-center"
            >
              Réserver maintenant
            </Link>
            <Link href="/showroom" className="btn-ghost w-full text-center">
              {vehicle.has3d ? "Voir en 3D" : "Ouvrir le showroom"}
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Spec({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-luxen-mist px-3 py-3">
      <div className="mb-1 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-luxen-steel">
        <Icon className="h-3.5 w-3.5 text-luxen-red" /> {label}
      </div>
      <div className="font-semibold text-luxen-ink">{value}</div>
    </div>
  );
}
