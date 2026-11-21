"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE, whatsappLink } from "@/lib/site";
import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export function ContactTeaser() {
  const { t } = useLanguage();

  return (
    <section className="container-luxen mt-20 mb-8">
      <div className="grid overflow-hidden rounded-[28px] border border-black/5 bg-white shadow-[var(--shadow-card)] lg:grid-cols-2">
        <div className="space-y-5 p-8 sm:p-10">
          <h2 className="section-title">{t.contact.teaserTitle}</h2>
          <p className="section-subtitle">{t.contact.teaserSub}</p>
          <div className="space-y-3 text-sm text-luxen-ink">
            <p className="inline-flex items-center gap-2">
              <MapPin className="h-4 w-4 text-luxen-red" /> {t.site.address}
            </p>
            <p className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4 text-luxen-red" /> {SITE.phoneDisplay}
            </p>
            <p className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4 text-luxen-red" /> {SITE.email}
            </p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            <Link href="/contact" className="btn-primary">
              {t.contact.teaserCta}
            </Link>
            <a href={whatsappLink(t.site.wa)} target="_blank" rel="noreferrer" className="btn-ghost">
              WhatsApp
            </a>
          </div>
        </div>
        <div className="relative min-h-[260px] bg-[linear-gradient(135deg,#1a1f2b,#0a0a0a)]">
          <div className="absolute inset-0 opacity-30 [background-image:radial-gradient(circle_at_1px_1px,#fff_1px,transparent_0)] [background-size:18px_18px]" />
          <div className="relative flex h-full flex-col justify-end p-8 text-white">
            <div className="rounded-2xl border border-white/10 bg-white/8 p-5 backdrop-blur">
              <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                {t.contact.mainAgency}
              </div>
              <div className="mt-2 font-display text-2xl font-bold">{t.site.city}</div>
              <p className="mt-2 text-sm text-white/65">
                {t.contact.pickupFes} {SITE.phoneDisplay}.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
