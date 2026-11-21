"use client";

import { LOCALES } from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-black/10 bg-[#f7f7f7] p-0.5",
        compact && "scale-95",
      )}
      role="group"
      aria-label="Language"
    >
      {LOCALES.map((item) => (
        <button
          key={item.code}
          type="button"
          onClick={() => setLocale(item.code)}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-bold transition",
            locale === item.code
              ? "bg-[#e10600] text-white shadow-sm"
              : "text-[#555] hover:text-[#111]",
          )}
          title={item.label}
        >
          {item.short}
        </button>
      ))}
    </div>
  );
}
