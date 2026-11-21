"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { motion, useReducedMotion } from "framer-motion";
import { CarFront, ClipboardCheck, Search } from "lucide-react";

export function HowItWorks() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  const STEPS = [
    { icon: Search, title: t.how.s1t, text: t.how.s1d },
    { icon: ClipboardCheck, title: t.how.s2t, text: t.how.s2d },
    { icon: CarFront, title: t.how.s3t, text: t.how.s3d },
  ];

  return (
    <section className="relative mt-20 overflow-hidden py-4">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 -z-10 h-40 -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(225,6,0,0.06),transparent_65%)]" />
      <div className="container-luxen">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.55 }}
          className="text-center"
        >
          <h2 className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] font-extrabold tracking-tight text-[#111]">
            {t.how.title}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-[15px] text-[#777]">{t.how.subtitle}</p>
        </motion.div>

        <div className="relative mt-16 grid gap-12 md:grid-cols-3 md:gap-6">
          <motion.div
            initial={reduce ? false : { scaleX: 0, opacity: 0 }}
            whileInView={{ scaleX: 1, opacity: 1 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="pointer-events-none absolute left-[14%] right-[14%] top-[38px] origin-left hidden h-[3px] rounded-full bg-gradient-to-r from-transparent via-[#f0b8b4] to-transparent md:block"
          />

          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={reduce ? false : { opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.18 + i * 0.16, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center"
            >
              <motion.div
                whileHover={reduce ? undefined : { scale: 1.08, y: -6 }}
                transition={{ type: "spring", stiffness: 300, damping: 16 }}
                className="relative mx-auto mb-6 inline-flex h-[76px] w-[76px] items-center justify-center rounded-full bg-[#e10600] text-white shadow-[0_16px_40px_rgba(225,6,0,0.42)]"
              >
                <motion.span
                  aria-hidden
                  animate={
                    reduce ? undefined : { scale: [1, 1.35, 1], opacity: [0.45, 0, 0.45] }
                  }
                  transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.4 }}
                  className="absolute inset-[-10px] rounded-full border-2 border-[#e10600]/35"
                />
                <step.icon className="relative h-8 w-8" strokeWidth={2.2} />
                <motion.span
                  initial={reduce ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35 + i * 0.16, type: "spring", stiffness: 400, damping: 14 }}
                  className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center rounded-full bg-black text-xs font-bold text-white shadow-lg"
                >
                  {i + 1}
                </motion.span>
              </motion.div>
              <h3 className="font-display text-[1.35rem] font-bold text-[#111]">{step.title}</h3>
              <p className="mx-auto mt-2.5 max-w-[270px] text-sm leading-relaxed text-[#777]">
                {step.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
