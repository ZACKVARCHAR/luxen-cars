"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE, whatsappLink } from "@/lib/site";
import { Clock3, Mail, MapPin, Phone, Star } from "lucide-react";
import Link from "next/link";

export function TrustContact() {
  const { t } = useLanguage();

  const reviews = [
    { name: "Sara M.", city: t.site.city, text: t.trust.r1 },
    { name: "Youssef K.", city: "Meknès", text: t.trust.r2 },
    { name: "Amine B.", city: "Taza", text: t.trust.r3 },
  ];

  return (
    <section className="container-luxen mt-14 mb-6 sm:mt-20">
      <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
        <div>
          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between">
            <div>
              <h2 className="font-display text-[clamp(1.6rem,5vw,2.3rem)] font-extrabold tracking-tight text-[#111]">
                {t.trust.title}
              </h2>
              <p className="mt-2 text-sm text-[#777] sm:text-base">{t.trust.subtitle}</p>
            </div>
            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#fff4f3] px-4 py-2 text-sm font-bold text-[#e10600]">
              <Star className="h-4 w-4 fill-[#e10600]" />
              {t.trust.badge}
            </div>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((card) => (
              <article
                key={card.name}
                className="rounded-2xl border border-[#eee] bg-white p-5 shadow-[0_10px_28px_rgba(0,0,0,0.05)]"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e10600] text-sm font-bold text-white">
                    {card.name
                      .split(" ")
                      .map((p) => p[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#111]">{card.name}</div>
                    <div className="text-xs text-[#888]">{card.city}</div>
                  </div>
                </div>
                <div className="mb-3 flex gap-1 text-[#e10600]">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-[#e10600]" />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-[#555]">“{card.text}”</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="rounded-2xl border border-[#eee] bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.06)]">
          <h3 className="font-display text-xl font-bold text-[#111]">{t.trust.contactTitle}</h3>
          <div className="mt-5 space-y-3 text-sm text-[#333]">
            <p className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 text-[#e10600]" />
              {t.site.address} — {t.trust.pickupEverywhere}
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-[#e10600]" />
              {SITE.phoneDisplay}
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-[#e10600]" />
              {SITE.email}
            </p>
            <p className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-[#e10600]" />
              {t.trust.hours}
            </p>
          </div>

          <div className="relative mt-5 min-h-[160px] overflow-hidden rounded-xl bg-[linear-gradient(135deg,#1c2230,#0b0d12)]">
            <div className="absolute inset-0 opacity-25 [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:14px_14px]" />
            <div className="relative flex h-full min-h-[160px] items-end p-4">
              <div className="rounded-lg bg-white/10 px-3 py-2 text-xs text-white backdrop-blur">
                {t.trust.mapHint}
              </div>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              href="/contact"
              className="inline-flex flex-1 items-center justify-center rounded-lg bg-[#e10600] px-4 py-2.5 text-sm font-bold text-white"
            >
              {t.nav.contact}
            </Link>
            <a
              href={whatsappLink(t.site.wa)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded-lg border border-[#e10600] px-4 py-2.5 text-sm font-bold text-[#e10600]"
            >
              WhatsApp
            </a>
          </div>
        </aside>
      </div>
    </section>
  );
}
