"use client";

import { useMoroccoCities } from "@/hooks/useMoroccoCities";
import { translateLocation } from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE } from "@/lib/site";
import { todayPlus } from "@/lib/utils";
import { CalendarDays, CarFront, MapPin, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export function SearchWidget() {
  const router = useRouter();
  const { t } = useLanguage();
  const { cities, defaultCity } = useMoroccoCities();
  const [tab, setTab] = useState<"rent" | "manage">("rent");
  const [city, setCity] = useState(defaultCity);
  const [pickup, setPickup] = useState(SITE.locations[0]);
  const [startDate, setStartDate] = useState(todayPlus(1));
  const [endDate, setEndDate] = useState(todayPlus(4));

  useEffect(() => {
    if (cities.includes(defaultCity)) setCity(defaultCity);
  }, [cities, defaultCity]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (tab === "manage") {
      router.push("/ma-reservation");
      return;
    }
    const params = new URLSearchParams({
      city: city || defaultCity,
      pickupLocation: pickup,
      returnLocation: pickup,
      startDate,
      startTime: "10:00",
      endDate,
      endTime: "10:00",
    });
    router.push(`/reservation?${params.toString()}`);
  }

  return (
    <section className="relative z-30 -mt-12 sm:-mt-16">
      <div className="container-luxen">
        <div className="overflow-hidden rounded-[16px] bg-white shadow-[0_22px_60px_rgba(0,0,0,0.22)] sm:rounded-[18px]">
          <div className="flex items-stretch gap-0 overflow-x-auto border-b border-[#ececec] bg-[#f7f7f7]">
            <button
              type="button"
              onClick={() => setTab("rent")}
              className={`inline-flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-bold transition sm:px-6 sm:py-3.5 ${
                tab === "rent"
                  ? "-mb-px border-b-[3px] border-[#e10600] bg-white text-[#e10600]"
                  : "text-[#333] hover:text-[#e10600]"
              }`}
            >
              <CarFront className={`h-4 w-4 ${tab === "rent" ? "text-[#e10600]" : "text-[#222]"}`} />
              {t.search.rent}
            </button>
            <button
              type="button"
              onClick={() => setTab("manage")}
              className={`inline-flex shrink-0 items-center gap-2 px-4 py-3 text-sm font-bold transition sm:rounded-t-xl sm:px-6 sm:py-3.5 ${
                tab === "manage"
                  ? "-mb-px border-b-[3px] border-[#e10600] bg-white text-[#e10600]"
                  : "bg-[#ececec] text-[#222] hover:bg-[#e4e4e4]"
              }`}
            >
              <CalendarDays
                className={`h-4 w-4 ${tab === "manage" ? "text-[#e10600]" : "text-[#222]"}`}
              />
              {t.search.manage}
            </button>
          </div>

          <form
            onSubmit={onSubmit}
            className="grid gap-3 bg-white p-4 sm:grid-cols-2 sm:gap-4 sm:p-5 lg:grid-cols-[1.05fr_1.05fr_1fr_1fr_auto] lg:items-end"
          >
            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-[#555]">{t.search.city}</span>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#e10600]" />
                <select
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="h-[50px] w-full appearance-none rounded-lg border border-[#e4e4e4] bg-white py-2 pl-10 pr-8 text-sm font-medium text-[#222] outline-none transition focus:border-[#e10600] focus:ring-2 focus:ring-[#e10600]/15"
                >
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-[#555]">
                {t.search.place}
              </span>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#e10600]" />
                <select
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="h-[50px] w-full appearance-none rounded-lg border border-[#e4e4e4] bg-white py-2 pl-10 pr-8 text-sm font-medium text-[#222] outline-none transition focus:border-[#e10600] focus:ring-2 focus:ring-[#e10600]/15"
                >
                  <option value="">{t.search.chooseAgency}</option>
                  {SITE.locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {translateLocation(t, loc)}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-[#555]">{t.search.start}</span>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#e10600]" />
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="h-[50px] w-full rounded-lg border border-[#e4e4e4] bg-white py-2 pl-10 pr-3 text-sm font-medium text-[#222] outline-none transition focus:border-[#e10600] focus:ring-2 focus:ring-[#e10600]/15"
                />
              </div>
            </label>

            <label className="block">
              <span className="mb-2 block text-[12px] font-semibold text-[#555]">{t.search.end}</span>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#e10600]" />
                <input
                  type="date"
                  required
                  value={endDate}
                  min={startDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="h-[50px] w-full rounded-lg border border-[#e4e4e4] bg-white py-2 pl-10 pr-3 text-sm font-medium text-[#222] outline-none transition focus:border-[#e10600] focus:ring-2 focus:ring-[#e10600]/15"
                />
              </div>
            </label>

            <button
              type="submit"
              className="inline-flex h-[50px] w-full items-center justify-center gap-2 rounded-lg bg-[#e10600] px-5 text-sm font-bold text-white shadow-[0_10px_24px_rgba(225,6,0,0.3)] transition hover:bg-[#c40500] sm:col-span-2 lg:col-span-1 lg:min-w-[200px]"
            >
              <Search className="h-4 w-4" />
              {tab === "rent" ? t.search.submit : t.search.findBooking}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
