"use client";

import { SocialIcons } from "@/components/layout/SocialIcons";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE, whatsappLink } from "@/lib/site";
import Image from "next/image";
import Link from "next/link";

export function Footer() {
  const { t } = useLanguage();

  const LINKS = [
    { href: "/vehicules", label: t.nav.vehicles },
    { href: "/reservation", label: t.nav.booking },
    { href: "/ma-reservation", label: t.nav.manageBooking },
    { href: "/showroom", label: t.nav.showroom },
    { href: "/a-propos", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
  ];

  const INFO = [
    { href: "/faq", label: t.nav.faq },
    { href: "/conditions", label: t.nav.terms },
    { href: "/confidentialite", label: t.nav.privacy },
  ];

  return (
    <footer className="mt-10 bg-[#1a1d24] text-white">
      <div className="container-luxen grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <Image
            src="/brand/logo-luxen-cars.png"
            alt="Luxen Cars"
            width={220}
            height={88}
            className="h-[72px] w-auto object-contain"
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/60">
            {t.footer.blurb} {t.site.city}.
          </p>
          <p className="text-sm text-white/70">{t.site.address}</p>
          <a href={`tel:${SITE.phoneTel}`} className="block text-sm font-semibold text-white">
            {SITE.phoneDisplay}
          </a>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/40">
            {t.footer.useful}
          </h3>
          <ul className="space-y-2.5">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/40">
            {t.footer.info}
          </h3>
          <ul className="space-y-2.5">
            {INFO.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-sm text-white/70 transition hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xs font-bold uppercase tracking-[0.16em] text-white/40">
            {t.footer.follow}
          </h3>
          <SocialIcons />
          <p className="mt-5 text-xs text-white/45">{t.footer.appSoon}</p>
          <div className="mt-3 flex flex-col gap-2">
            <span className="inline-flex h-10 items-center justify-center rounded-lg border border-white/15 bg-black/30 px-3 text-xs font-semibold text-white/70">
              App Store
            </span>
            <span className="inline-flex h-10 items-center justify-center rounded-lg border border-white/15 bg-black/30 px-3 text-xs font-semibold text-white/70">
              Google Play
            </span>
          </div>
          <a
            href={whatsappLink(t.site.wa)}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex text-sm text-emerald-300 hover:text-emerald-200"
          >
            WhatsApp · {SITE.phoneDisplay}
          </a>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-luxen flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} Luxen Cars. {t.footer.rights}
          </p>
          <p>{t.footer.based}</p>
        </div>
      </div>
    </footer>
  );
}
