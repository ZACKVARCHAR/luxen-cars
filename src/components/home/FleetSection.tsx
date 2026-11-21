"use client";

import { VehicleCard } from "@/components/vehicles/VehicleCard";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { VEHICLES } from "@/lib/data/vehicles";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

const BRANDS = ["Dacia", "Peugeot", "Opel"] as const;

export function FleetSection() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const [filter, setFilter] = useState<"all" | (typeof BRANDS)[number]>("all");

  const pool = useMemo(
    () => VEHICLES.filter((v) => BRANDS.includes(v.brand as (typeof BRANDS)[number])),
    [],
  );

  const filters = useMemo(
    () => [{ id: "all" as const, label: t.fleet.all }, ...BRANDS.map((b) => ({ id: b, label: b }))],
    [t.fleet.all],
  );

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: pool.length };
    BRANDS.forEach((brand) => {
      map[brand] = pool.filter((v) => v.brand === brand).length;
    });
    return map;
  }, [pool]);

  const why = [t.fleet.w1, t.fleet.w2, t.fleet.w3, t.fleet.w4, t.fleet.w5];

  const list = pool
    .filter((v) => (filter === "all" ? true : v.brand === filter))
    .filter((v) =>
      filter === "all" ? ["dacia-duster", "peugeot-208", "opel-corsa"].includes(v.slug) : true,
    )
    .slice(0, 3);

  return (
    <section id="vehicules" className="container-luxen mt-16 overflow-hidden">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <h2 className="font-display text-[clamp(1.85rem,3vw,2.45rem)] font-extrabold tracking-tight text-[#111]">
            {t.fleet.title}
          </h2>
          <p className="mt-2 max-w-xl text-[15px] text-[#777]">{t.fleet.subtitle}</p>
        </div>
        <Link
          href="/vehicules"
          className="group inline-flex items-center gap-1 text-sm font-bold text-[#e10600] transition hover:gap-2"
        >
          {t.fleet.seeAll}
          <span className="transition group-hover:translate-x-0.5">→</span>
        </Link>
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.45 }}
        className="mt-6 flex flex-wrap gap-2.5"
      >
        {filters.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setFilter(item.id)}
            className={cn(
              "relative rounded-full px-4 py-2 text-sm font-bold transition",
              filter === item.id ? "text-white" : "bg-[#f0f1f3] text-[#333] hover:bg-[#e6e7ea]",
            )}
          >
            {filter === item.id && (
              <motion.span
                layoutId="fleet-filter-pill"
                className="absolute inset-0 rounded-full bg-[#e10600] shadow-[0_8px_20px_rgba(225,6,0,0.35)]"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
            <span className="relative z-10">
              {item.label} ({counts[item.id] || 0})
            </span>
          </button>
        ))}
      </motion.div>

      <div className="mt-8 grid gap-6 xl:grid-cols-[minmax(0,1fr)_270px]">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {list.map((vehicle, i) => (
              <motion.div
                key={vehicle.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 12, scale: 0.98 }}
                transition={{ delay: i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <VehicleCard vehicle={vehicle} index={i} outlined />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <motion.aside
          initial={reduce ? false : { opacity: 0, x: 28 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          whileHover={reduce ? undefined : { y: -4 }}
          className="relative overflow-hidden rounded-[22px] bg-[#e10600] p-6 text-white shadow-[0_18px_44px_rgba(225,6,0,0.32)]"
        >
          <div className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-12 -left-8 h-40 w-40 rounded-full bg-black/10 blur-2xl" />
          <h3 className="relative font-display text-xl font-bold leading-snug">{t.fleet.why}</h3>
          <ul className="relative mt-5 space-y-3.5 text-sm text-white/95">
            {why.map((item, i) => (
              <motion.li
                key={item}
                initial={reduce ? false : { opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.06 }}
                className="flex items-start gap-2.5"
              >
                <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/15">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span>{item}</span>
              </motion.li>
            ))}
          </ul>
          <Link
            href="/reservation"
            className="relative mt-7 inline-flex w-full items-center justify-center rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#e10600] shadow-sm transition hover:bg-black hover:text-white"
          >
            {t.nav.bookNow}
          </Link>
        </motion.aside>
      </div>
    </section>
  );
}
