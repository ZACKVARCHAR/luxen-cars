"use client";

import { Badge } from "@/components/ui/badge";
import { translateLabel } from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { Vehicle } from "@/lib/types";
import { formatMad } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Cog, Fuel, Heart, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export function VehicleCard({
  vehicle,
  index = 0,
  outlined = true,
}: {
  vehicle: Vehicle;
  index?: number;
  outlined?: boolean;
}) {
  const reduce = useReducedMotion();
  const { t, locale } = useLanguage();
  const [liked, setLiked] = useState(false);
  const available = vehicle.status === "AVAILABLE";

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      whileHover={reduce ? undefined : { y: -6 }}
      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-[#ebebeb] bg-white shadow-[0_12px_34px_rgba(0,0,0,0.07)] transition hover:shadow-[0_18px_44px_rgba(0,0,0,0.12)]"
    >
      <div className="relative aspect-[16/10] overflow-hidden bg-[#0b0d12]">
        <Image
          src={vehicle.image}
          alt={`${vehicle.brand} ${vehicle.model}`}
          fill
          className="object-contain p-2 transition duration-700 group-hover:scale-[1.05]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="absolute start-3 top-3">
          <Badge tone={available ? "success" : "warning"}>
            {available ? t.vehicle.available : t.vehicle.limited}
          </Badge>
        </div>
        <motion.button
          type="button"
          aria-label="Favori"
          whileTap={{ scale: 0.88 }}
          onClick={() => setLiked((v) => !v)}
          className="absolute end-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-md"
        >
          <Heart
            className={`h-4 w-4 transition ${liked ? "fill-[#e10600] text-[#e10600]" : "text-[#888]"}`}
          />
        </motion.button>
      </div>

      <div className="flex flex-1 flex-col space-y-3 p-5">
        <div>
          <h3 className="font-display text-[1.35rem] font-extrabold tracking-tight text-[#111]">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-sm text-[#777]">{translateLabel(t, vehicle.category)}</p>
        </div>

        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-[#666]">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5 text-[#e10600]" /> {vehicle.seats} {t.vehicle.seats}
          </span>
          <span className="inline-flex items-center gap-1">
            <Cog className="h-3.5 w-3.5 text-[#e10600]" />{" "}
            {translateLabel(t, vehicle.transmission)}
          </span>
          <span className="inline-flex items-center gap-1">
            <Fuel className="h-3.5 w-3.5 text-[#e10600]" /> {translateLabel(t, vehicle.fuel)}
          </span>
          {vehicle.features[0] && (
            <span className="rounded-full bg-[#fff1f0] px-2.5 py-0.5 font-semibold text-[#e10600]">
              {translateLabel(t, vehicle.features[0])}
            </span>
          )}
        </div>

        <div className="mt-auto border-t border-[#eee] pt-4">
          <div className="text-xs text-[#888]">{t.vehicle.from}</div>
          <div className="font-display text-[1.55rem] font-extrabold text-[#e10600]">
            {formatMad(vehicle.dailyRate, locale)}
            <span className="text-sm font-semibold text-[#888]">{t.vehicle.perDay}</span>
          </div>
        </div>

        <Link
          href={`/reservation?vehicle=${vehicle.slug}`}
          className={
            outlined
              ? "inline-flex items-center gap-1.5 pt-1 text-sm font-bold text-[#e10600] transition hover:gap-2.5"
              : "btn-primary w-full"
          }
        >
          {t.nav.bookNow} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.article>
  );
}
