"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE, whatsappLink } from "@/lib/site";
import Link from "next/link";

export function VehiclesPageContent({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="container-luxen py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="section-title">{t.vehicle.pageTitle}</h1>
        <p className="section-subtitle">{t.vehicle.pageSub}</p>
      </div>
      {children}
    </div>
  );
}

export function ReservationPageIntro({ children }: { children: React.ReactNode }) {
  const { t } = useLanguage();
  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[320px] bg-[linear-gradient(180deg,#fff5f4_0%,transparent_100%)]" />
      <div className="container-luxen py-10 lg:py-12">
        <div className="mb-7 grid gap-5 sm:mb-9 sm:gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#e10600]">
              {t.booking.eyebrow}
            </p>
            <h1 className="font-display text-[clamp(1.75rem,6vw,2.8rem)] font-extrabold tracking-tight text-[#111]">
              {t.booking.title}
              <span className="text-[#e10600]">{t.booking.titleAccent}</span>
            </h1>
            <p className="mt-3 max-w-xl text-[14px] leading-relaxed text-[#666] sm:text-[15px]">
              {t.booking.subtitle}
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {[
              { value: "4", label: t.booking.stat1 },
              { value: "MAD", label: t.booking.stat2 },
              { value: "7j/7", label: t.booking.stat3 },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-[#f0d0ce] bg-white px-2 py-2.5 text-center shadow-[0_8px_24px_rgba(225,6,0,0.06)] sm:rounded-2xl sm:px-3 sm:py-3"
              >
                <div className="font-display text-base font-extrabold text-[#e10600] sm:text-lg">
                  {item.value}
                </div>
                <div className="mt-0.5 text-[10px] font-semibold leading-tight text-[#777] sm:text-[11px]">
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}

export function AboutPageContent() {
  const { t } = useLanguage();
  return (
    <div className="container-luxen py-10">
      <div className="max-w-3xl">
        <h1 className="section-title">{t.about.title}</h1>
        <p className="section-subtitle">{t.about.subtitle}</p>
        <div className="mt-8 space-y-4 text-base leading-relaxed text-luxen-ink/85">
          <p>{t.about.p1}</p>
          <p>{t.about.p2}</p>
          <p>{t.about.p3}</p>
        </div>
        <Link href="/reservation" className="btn-primary mt-8 inline-flex">
          {t.about.cta}
        </Link>
      </div>
    </div>
  );
}

export function ContactPageContent() {
  const { t } = useLanguage();
  return (
    <div className="container-luxen py-10">
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <h1 className="section-title">{t.contact.title}</h1>
          <p className="section-subtitle">{t.contact.subtitle}</p>
          <div className="mt-6 space-y-3 text-sm text-luxen-ink">
            <p>
              <strong>{t.contact.phone}</strong> {SITE.phoneDisplay}
            </p>
            <p>
              <strong>{t.contact.email}</strong> {SITE.email}
            </p>
            <p>
              <strong>{t.contact.hq}</strong> {t.site.address}
            </p>
            <p>
              <strong>{t.contact.pickup}</strong> {t.contact.pickupAll}
            </p>
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href={whatsappLink(t.site.wa)} target="_blank" rel="noreferrer" className="btn-primary">
              WhatsApp
            </a>
            <Link href="/reservation" className="btn-ghost">
              {t.contact.bookOnline}
            </Link>
          </div>
        </div>

        <form className="space-y-4 rounded-[22px] border border-black/5 bg-white p-6 shadow-[var(--shadow-card)]">
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
              {t.contact.name}
            </span>
            <input className="field" name="name" required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
              {t.contact.email.replace(":", "")}
            </span>
            <input className="field" type="email" name="email" required />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
              {t.contact.message}
            </span>
            <textarea className="field min-h-32" name="message" required />
          </label>
          <p className="text-xs text-luxen-steel">{t.contact.formNote}</p>
          <button type="button" className="btn-primary" disabled>
            {t.contact.soon}
          </button>
        </form>
      </div>
    </div>
  );
}

export function FaqPageContent() {
  const { t } = useLanguage();
  return (
    <div className="container-luxen py-10">
      <h1 className="section-title">{t.faq.title}</h1>
      <p className="section-subtitle">{t.faq.subtitle}</p>
      <div className="mt-8 space-y-3">
        {t.faq.items.map((item) => (
          <details
            key={item.q}
            className="group rounded-[18px] border border-black/5 bg-white p-5 shadow-[var(--shadow-card)]"
          >
            <summary className="cursor-pointer list-none font-display text-lg font-bold text-luxen-ink">
              {item.q}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-luxen-steel">{item.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
