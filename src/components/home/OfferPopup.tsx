"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Gift, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const STORAGE_KEY = "luxen.offer.popup.dismissed";

export function OfferPopup() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  function dismiss() {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const timer = setTimeout(() => setOpen(true), 650);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            aria-label={t.offer.closeOffer}
            className="absolute inset-0 bg-black/55 backdrop-blur-[3px]"
            onClick={dismiss}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="offer-title"
            initial={reduce ? false : { opacity: 0, scale: 0.88, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 12 }}
            transition={{ type: "spring", stiffness: 280, damping: 22 }}
            className="relative w-full max-w-md overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
          >
            <div className="relative bg-[linear-gradient(135deg,#e10600_0%,#9a0400_100%)] px-6 pb-10 pt-7 text-white">
              <button
                type="button"
                onClick={dismiss}
                className="absolute end-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                aria-label={t.offer.close}
              >
                <X className="h-4 w-4" />
              </button>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-bold uppercase tracking-wide">
                <Gift className="h-3.5 w-3.5" />
                {t.offer.badge}
              </div>
              <h2 id="offer-title" className="mt-4 font-display text-3xl font-extrabold leading-tight">
                {t.offer.title1}
                <br />
                {t.offer.title2}
              </h2>
              <p className="mt-3 text-sm text-white/85">
                {t.offer.body}{" "}
                <span className="rounded bg-white/20 px-1.5 py-0.5 font-bold tracking-wide">
                  LUXEN10
                </span>
                .
              </p>
              <div className="pointer-events-none absolute -bottom-8 -end-6 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
            </div>

            <div className="space-y-3 px-6 py-5">
              <ul className="space-y-2 text-sm text-[#444]">
                <li>• {t.offer.b1}</li>
                <li>• {t.offer.b2}</li>
                <li>• {t.offer.b3}</li>
              </ul>
              <Link
                href="/reservation"
                onClick={dismiss}
                className="inline-flex w-full items-center justify-center rounded-xl bg-[#e10600] px-4 py-3.5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(225,6,0,0.35)] transition hover:bg-[#c40500]"
              >
                {t.offer.cta}
              </Link>
              <button
                type="button"
                onClick={dismiss}
                className="w-full py-2 text-sm font-semibold text-[#777] transition hover:text-[#111]"
              >
                {t.offer.skip}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
