"use client";

import { HERO_SLIDES } from "@/lib/data/vehicles";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export function HeroCarousel() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const slide = HERO_SLIDES[index];

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % HERO_SLIDES.length), 5200);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <div
      className="relative isolate overflow-hidden rounded-[28px] bg-[#11151d] shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      onMouseMove={(e) => {
        if (reduce) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12;
        setParallax({ x, y });
      }}
      onMouseLeave={() => setParallax({ x: 0, y: 0 })}
    >
      <div className="absolute inset-0">
        <Image
          src="/hero/hero-bg.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-45"
          sizes="(max-width: 1024px) 100vw, 55vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/20" />
        <div className="hero-grid absolute inset-0 opacity-40" />
      </div>

      <div className="relative flex min-h-[420px] flex-col px-5 py-6 sm:min-h-[480px] sm:px-8 lg:min-h-[540px]">
        <div className="flex flex-wrap gap-2">
          {HERO_SLIDES.map((item, i) => (
            <button
              key={item.brand}
              type="button"
              onClick={() => setIndex(i)}
              className={cn(
                "rounded-full px-3.5 py-1.5 text-xs font-bold uppercase tracking-wide transition",
                i === index
                  ? "bg-luxen-red text-white shadow-[0_8px_20px_rgba(225,6,0,0.35)]"
                  : "bg-white/10 text-white/75 hover:bg-white/16",
              )}
            >
              {item.brand}
            </button>
          ))}
        </div>

        <div className="relative mt-4 flex flex-1 items-center justify-center">
          <div className="platform-glow absolute bottom-[12%] left-1/2 h-40 w-[78%] -translate-x-1/2 rounded-[100%] blur-md" />
          <div className="absolute bottom-[18%] left-1/2 h-6 w-[62%] -translate-x-1/2 rounded-full bg-luxen-red/70 blur-[2px]" />
          <div className="absolute bottom-[16%] left-1/2 h-24 w-[70%] -translate-x-1/2 rounded-[100%] border border-white/10 bg-gradient-to-b from-white/10 to-transparent" />

          <AnimatePresence mode="wait">
            <motion.div
              key={slide.slug}
              initial={reduce ? false : { opacity: 0, x: 40, scale: 0.96 }}
              animate={{
                opacity: 1,
                x: parallax.x,
                y: parallax.y,
                scale: 1,
              }}
              exit={reduce ? undefined : { opacity: 0, x: -30, scale: 0.98 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative z-10 w-full max-w-[560px]"
            >
              <Image
                src={slide.image}
                alt={`${slide.brand} — illustration temporaire`}
                width={900}
                height={520}
                className="mx-auto h-auto w-full object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
                priority={index === 0}
              />
              <div className="pointer-events-none absolute inset-x-[18%] top-[38%] h-8 rounded-full bg-amber-100/30 blur-xl" />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="button"
            aria-label="Véhicule précédent"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur"
            onClick={() => setIndex((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Slide ${i + 1}`}
                onClick={() => setIndex(i)}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  i === index ? "w-8 bg-luxen-red" : "w-2.5 bg-white/35",
                )}
              />
            ))}
          </div>
          <button
            type="button"
            aria-label="Véhicule suivant"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur"
            onClick={() => setIndex((i) => (i + 1) % HERO_SLIDES.length)}
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
