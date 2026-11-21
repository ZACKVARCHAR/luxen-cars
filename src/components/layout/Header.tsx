"use client";

import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE, whatsappLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { CalendarDays, Headset, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Header() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const NAV = [
    { href: "/", label: t.nav.home },
    { href: "/vehicules", label: t.nav.vehicles },
    { href: "/reservation", label: t.nav.booking },
    { href: "/a-propos", label: t.nav.about },
    { href: "/faq", label: t.nav.reviews },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-white transition-shadow",
        scrolled && "shadow-[0_4px_24px_rgba(0,0,0,0.08)]",
      )}
    >
      <div className="container-luxen flex h-16 items-center justify-between gap-2 sm:h-[88px] sm:gap-3">
        <Link href="/" className="flex shrink-0 items-center">
          <Image
            src="/brand/logo-luxen-cars.png"
            alt="Luxen Cars"
            width={220}
            height={88}
            className="h-11 w-auto object-contain sm:h-[72px]"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-5 xl:flex xl:gap-6">
          {NAV.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative pb-1 text-[0.92rem] font-medium transition",
                  active ? "font-semibold text-[#e10600]" : "text-[#222] hover:text-[#e10600]",
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-0 -bottom-0.5 h-[3px] rounded-full bg-[#e10600]" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitcher />
          <a
            href={`tel:${SITE.phoneTel}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#222]"
          >
            <Headset className="h-5 w-5 text-[#e10600]" />
            {SITE.phoneDisplay}
          </a>
          <Link
            href="/reservation"
            className="inline-flex items-center gap-2 rounded-md bg-[#e10600] px-4 py-2.5 text-sm font-bold text-white shadow-[0_8px_20px_rgba(225,6,0,0.28)] transition hover:bg-[#c40500]"
          >
            <CalendarDays className="h-4 w-4" />
            {t.nav.bookNow}
          </Link>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitcher compact />
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-white lg:hidden">
          <div className="container-luxen flex flex-col gap-1 py-4">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-[#222] hover:bg-[#f5f5f5]"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${SITE.phoneTel}`}
              className="px-3 py-3 text-sm font-semibold text-[#222]"
            >
              {SITE.phoneDisplay}
            </a>
            <a
              href={whatsappLink(t.site.wa)}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-3 text-sm font-semibold text-emerald-700"
            >
              WhatsApp
            </a>
            <Link
              href="/reservation"
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-[#e10600] px-4 py-3 text-sm font-bold text-white"
            >
              <CalendarDays className="h-4 w-4" />
              {t.nav.bookNow}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
