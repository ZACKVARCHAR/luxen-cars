"use client";

import { MOROCCO_CITIES } from "@/lib/data/morocco-cities";
import { SITE } from "@/lib/site";
import { useEffect, useState } from "react";

export function useMoroccoCities() {
  const [cities, setCities] = useState<string[]>(MOROCCO_CITIES);
  const [loading, setLoading] = useState(true);
  const [source, setSource] = useState<"local" | "countriesnow">("local");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/cities");
        if (!res.ok) throw new Error("cities api failed");
        const json = (await res.json()) as {
          cities: string[];
          source: "local" | "countriesnow";
        };
        if (!cancelled && Array.isArray(json.cities) && json.cities.length) {
          setCities(json.cities);
          setSource(json.source);
        }
      } catch {
        if (!cancelled) {
          setCities(MOROCCO_CITIES);
          setSource("local");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return { cities, loading, source, defaultCity: SITE.defaultCity };
}
