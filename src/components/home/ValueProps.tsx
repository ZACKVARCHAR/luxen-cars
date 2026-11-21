"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { motion, useReducedMotion } from "framer-motion";
import { CalendarCheck, CarFront, Gem, Headphones, ShieldCheck } from "lucide-react";

export function ValueProps() {
  const reduce = useReducedMotion();
  const { t } = useLanguage();

  const ITEMS = [
    { icon: ShieldCheck, title: t.value.price },
    { icon: CalendarCheck, title: t.value.cancel, sub: t.value.cancelSub },
    { icon: CarFront, title: t.value.delivery },
    { icon: Headphones, title: t.value.assist },
    { icon: Gem, title: t.value.pay },
  ];

  return (
    <section className="container-luxen mt-5 sm:mt-6">
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="rounded-2xl border border-[#ececec] bg-white px-2 py-2 shadow-[0_10px_30px_rgba(0,0,0,0.06)] sm:px-3"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-5">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.06 + i * 0.06, duration: 0.4 }}
              whileHover={reduce ? undefined : { y: -2 }}
              className={`flex items-center gap-3 px-4 py-3.5 ${
                i < ITEMS.length - 1 ? "lg:border-r lg:border-[#ececec]" : ""
              }`}
            >
              <item.icon className="h-5 w-5 shrink-0 text-[#e10600]" strokeWidth={2} />
              <div className="min-w-0">
                <div className="text-[13px] font-bold leading-snug text-[#1a1a1a]">
                  {item.title}
                </div>
                {"sub" in item && item.sub ? (
                  <div className="text-[11px] font-medium text-[#777]">{item.sub}</div>
                ) : null}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
