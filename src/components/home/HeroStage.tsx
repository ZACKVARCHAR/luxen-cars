"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function HeroStage() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  return (
    <section className="relative isolate overflow-hidden bg-[#0b0d12] text-white">
      <div className="absolute inset-0">
        <Image
          src="/hero/hero-showroom.jpg"
          alt={t.hero.alt}
          fill
          priority
          quality={100}
          className="object-cover object-[70%_center] sm:object-[62%_center]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(100deg,#050607_0%,rgba(5,6,7,0.78)_22%,rgba(5,6,7,0.25)_48%,rgba(5,6,7,0.04)_68%,transparent_100%)]" />
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40 sm:hidden" />
      <div className="container-luxen relative flex min-h-[min(78vh,640px)] items-end pb-24 pt-10 sm:min-h-[min(82vh,720px)] sm:items-center sm:pb-28 sm:pt-12 lg:pb-32">
        <div className="relative z-20 w-full max-w-xl">
          <motion.h1
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="font-display text-[clamp(1.9rem,8vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-white"
          >
            {t.hero.title1}
            <br />
            {t.hero.title2}
          </motion.h1>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/80 sm:mt-4 sm:text-[1rem] sm:text-white/72">
            {t.hero.subtitle}
          </p>
          <ul className="mt-5 space-y-2.5 text-[0.92rem] font-medium text-white sm:mt-7 sm:space-y-3.5 sm:text-[0.98rem]">
            {[t.hero.b1, t.hero.b2, t.hero.b3].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e10600]">
                  <Check className="h-3.5 w-3.5 text-white" strokeWidth={3} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="/reservation"
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#e10600] px-6 py-3.5 text-sm font-bold text-white shadow-[0_12px_30px_rgba(225,6,0,0.45)] transition hover:bg-[#c40500] sm:mt-8 sm:w-auto"
          >
            {t.nav.bookNow}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
