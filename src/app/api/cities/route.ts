import { MOROCCO_CITIES } from "@/lib/data/morocco-cities";
import { SITE } from "@/lib/site";
import { NextResponse } from "next/server";

function normalizeName(name: string) {
  return name
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .trim();
}

/**
 * GET /api/cities
 * Importe les villes du Maroc (API externe + fallback local).
 * Query: ?q=fes
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get("q") || "").trim().toLowerCase();

  let remote: string[] = [];
  try {
    const res = await fetch("https://countriesnow.space/api/v0.1/countries/cities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ country: "Morocco" }),
      next: { revalidate: 60 * 60 * 24 },
    });
    if (res.ok) {
      const json = (await res.json()) as { data?: string[] };
      if (Array.isArray(json.data)) {
        remote = json.data.map((c) => c.trim()).filter(Boolean);
      }
    }
  } catch {
    remote = [];
  }

  // Fusion : noms locaux accentués prioritaires + villes distantes supplémentaires
  const byKey = new Map<string, string>();
  for (const city of MOROCCO_CITIES) byKey.set(normalizeName(city), city);
  for (const city of remote) {
    const key = normalizeName(city);
    if (!byKey.has(key)) byKey.set(key, city);
  }
  // Force le siège Luxen Cars
  byKey.set(normalizeName(SITE.defaultCity), SITE.defaultCity);

  let cities = [...byKey.values()].sort((a, b) => a.localeCompare(b, "fr"));
  if (q) cities = cities.filter((c) => c.toLowerCase().includes(q) || normalizeName(c).includes(q));

  cities = [SITE.defaultCity, ...cities.filter((c) => c !== SITE.defaultCity)];

  return NextResponse.json({
    country: "Morocco",
    hq: SITE.defaultCity,
    source: remote.length ? "countriesnow+local" : "local",
    count: cities.length,
    cities,
  });
}
