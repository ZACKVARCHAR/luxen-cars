import { AGENCIES, BOOKING_OPTIONS, VEHICLES } from "@/lib/data/vehicles";
import type {
  BookingConfirmation,
  BookingDraft,
  CustomerInfo,
  Quote,
  SearchParams,
  Vehicle,
  VehicleBrand,
  VehicleCategory,
  FuelType,
  Transmission,
  AvailabilityStatus,
} from "@/lib/types";
import { rentalDays } from "@/lib/utils";

const USE_LIVE = process.env.NEXT_PUBLIC_API_MODE === "live";
const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";

export interface VehicleFilters {
  brand?: VehicleBrand | "all";
  category?: VehicleCategory | "";
  transmission?: Transmission | "";
  fuel?: FuelType | "";
  availability?: AvailabilityStatus | "";
  maxPrice?: number;
  query?: string;
  city?: string;
}

function mockDelay<T>(value: T, ms = 280): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms));
}

function filterVehicles(list: Vehicle[], filters: VehicleFilters = {}) {
  return list.filter((vehicle) => {
    if (filters.brand && filters.brand !== "all" && vehicle.brand !== filters.brand) return false;
    if (filters.category && vehicle.category !== filters.category) return false;
    if (filters.transmission && vehicle.transmission !== filters.transmission) return false;
    if (filters.fuel && vehicle.fuel !== filters.fuel) return false;
    if (filters.availability && vehicle.status !== filters.availability) return false;
    if (filters.maxPrice && vehicle.dailyRate > filters.maxPrice) return false;
    if (filters.query) {
      const q = filters.query.toLowerCase();
      const hay = `${vehicle.brand} ${vehicle.model} ${vehicle.category}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

function buildQuote(vehicle: Vehicle, search: SearchParams, optionIds: string[]): Quote {
  const days = rentalDays(search.startDate, search.startTime, search.endDate, search.endTime);
  const optionsTotal = BOOKING_OPTIONS.filter((o) => optionIds.includes(o.id)).reduce(
    (sum, o) => sum + (o.pricePerDay === 0 && o.id === "full-tank" ? 250 : o.pricePerDay * days),
    0,
  );
  const subtotal = vehicle.dailyRate * days;
  const discount = days >= 7 ? Math.round(subtotal * 0.08) : 0;
  const total = subtotal + optionsTotal - discount;
  const lines = [
    { label: `${days} jour${days > 1 ? "s" : ""} × ${vehicle.dailyRate} MAD`, amount: subtotal },
    ...(optionsTotal ? [{ label: "Options", amount: optionsTotal }] : []),
    ...(discount ? [{ label: "Remise séjour (indicatif)", amount: -discount }] : []),
  ];

  return {
    vehicleId: vehicle.id,
    days,
    dailyRate: vehicle.dailyRate,
    optionsTotal,
    discount,
    deposit: vehicle.deposit,
    subtotal,
    total,
    currency: "MAD",
    lines,
    isEstimate: !USE_LIVE,
  };
}

function createMockReference() {
  const stamp = Date.now().toString(36).toUpperCase().slice(-6);
  return `MOCK-${stamp}`;
}

function toIso(date: string, time: string) {
  return `${date}T${time}:00+01:00`;
}

function mapPublicVehicle(raw: Record<string, unknown>): Vehicle {
  const brand = String(raw.brand || "Dacia") as Vehicle["brand"];
  const model = String(raw.model || "");
  const slug = String(raw.slug || "");
  const local =
    VEHICLES.find((v) => slug && v.slug === slug) ||
    VEHICLES.find(
      (v) => v.brand === brand && v.model.toLowerCase().includes(model.toLowerCase()),
    );
  const apiFeatures = Array.isArray(raw.features)
    ? (raw.features as string[])
    : local?.features || [];
  const image =
    (typeof raw.imageUrl === "string" && raw.imageUrl) ||
    local?.image ||
    "/vehicles/peugeot-208.png";
  return {
    id: String(raw.id),
    slug: slug || local?.slug || `${brand}-${model}`.toLowerCase().replace(/\s+/g, "-"),
    brand,
    model,
    category: (String(raw.category || local?.category || "Citadine") as Vehicle["category"]),
    dailyRate: Number(raw.dailyRate || 0),
    currency: "MAD",
    deposit: Number(raw.deposit ?? local?.deposit ?? 3000),
    seats: Number(raw.seats ?? local?.seats ?? 5),
    bags: Number(raw.bags ?? local?.bags ?? 2),
    transmission: (String(raw.transmission || local?.transmission || "Manuelle") as Vehicle["transmission"]),
    fuel: (String(raw.fuel || local?.fuel || "Essence") as Vehicle["fuel"]),
    airConditioning: Boolean(raw.airConditioning ?? local?.airConditioning ?? true),
    features: apiFeatures,
    status:
      String(raw.status) === "AVAILABLE"
        ? "AVAILABLE"
        : String(raw.status) === "MAINTENANCE" || String(raw.status) === "IMMOBILIZED"
          ? "UNAVAILABLE"
          : "LIMITED",
    image,
    gallery: local?.gallery || [image],
    colors: local?.colors || ["Blanc"],
    has3d: false,
    description: local?.description || `${brand} ${model}`,
    placeholder: !raw.imageUrl && !local,
  };
}

async function liveFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
  if (!response.ok) {
    let detail = `Erreur API (${response.status})`;
    try {
      const problem = (await response.json()) as { detail?: string };
      if (problem.detail) detail = problem.detail;
    } catch {
      /* ignore */
    }
    throw new Error(detail);
  }
  return response.json() as Promise<T>;
}

export const api = {
  mode: (): "mock" | "live" => (USE_LIVE ? "live" : "mock"),

  async getAgencies() {
    if (USE_LIVE) {
      try {
        return await liveFetch<typeof AGENCIES>("/api/v1/public/agencies");
      } catch {
        return AGENCIES;
      }
    }
    return mockDelay(AGENCIES);
  },

  async getVehicles(filters: VehicleFilters = {}) {
    if (USE_LIVE) {
      try {
        const params = new URLSearchParams();
        if (filters.city) params.set("city", filters.city);
        if (filters.brand && filters.brand !== "all") params.set("brand", filters.brand);
        if (filters.category) params.set("category", filters.category);
        const qs = params.toString();
        const remote = await liveFetch<Record<string, unknown>[]>(
          `/api/v1/public/vehicles${qs ? `?${qs}` : ""}`,
        );
        return filterVehicles(remote.map(mapPublicVehicle), filters);
      } catch {
        return filterVehicles(VEHICLES, filters);
      }
    }
    return mockDelay(filterVehicles(VEHICLES, filters));
  },

  async getVehicleById(id: string, city?: string) {
    const local = VEHICLES.find((v) => v.id === id) ?? null;
    if (USE_LIVE) {
      try {
        const params = new URLSearchParams();
        if (city) params.set("city", city);
        const qs = params.toString();
        const remote = await liveFetch<Record<string, unknown>>(
          `/api/v1/public/vehicles/${encodeURIComponent(id)}${qs ? `?${qs}` : ""}`,
        );
        return mapPublicVehicle(remote);
      } catch {
        if (city) {
          const list = await this.getVehicles({ city });
          return list.find((v) => v.id === id) || local;
        }
        return local;
      }
    }
    return mockDelay(local);
  },

  async getVehicleBySlug(slug: string, city?: string) {
    const local = VEHICLES.find((v) => v.slug === slug) ?? null;
    if (USE_LIVE) {
      try {
        const params = new URLSearchParams();
        if (city) params.set("city", city);
        const qs = params.toString();
        const remote = await liveFetch<Record<string, unknown>>(
          `/api/v1/public/vehicles/by-slug/${encodeURIComponent(slug)}${qs ? `?${qs}` : ""}`,
        );
        return mapPublicVehicle(remote);
      } catch {
        return local;
      }
    }
    return mockDelay(local);
  },

  async resolveVehicle(vehicleId: string, search: SearchParams, known?: Vehicle | null) {
    if (known && known.id === vehicleId) return known;
    const local = VEHICLES.find((v) => v.id === vehicleId);
    if (local) return local;
    const byId = await this.getVehicleById(vehicleId, search.city);
    if (byId) return byId;
    const list = await this.getVehicles({ city: search.city });
    return list.find((v) => v.id === vehicleId) || null;
  },

  async searchAvailability(search: SearchParams) {
    if (USE_LIVE) {
      try {
        const params = new URLSearchParams({
          startAt: toIso(search.startDate, search.startTime),
          endAt: toIso(search.endDate, search.endTime),
          city: search.city,
        });
        if (search.category) params.set("category", search.category);
        const remote = await liveFetch<Record<string, unknown>[]>(
          `/api/v1/public/availability?${params.toString()}`,
        );
        return remote.map(mapPublicVehicle);
      } catch {
        return filterVehicles(VEHICLES, {
          category: search.category || undefined,
          availability: "AVAILABLE",
        });
      }
    }
    const list = await this.getVehicles({
      category: search.category || undefined,
      availability: "AVAILABLE",
    });
    return list.filter((v) => v.status !== "UNAVAILABLE");
  },

  async getQuote(vehicleId: string, search: SearchParams, optionIds: string[], known?: Vehicle | null) {
    const vehicle = await this.resolveVehicle(vehicleId, search, known);
    if (!vehicle) throw new Error("Véhicule introuvable");

    const optionsTotal = BOOKING_OPTIONS.filter((o) => optionIds.includes(o.id)).reduce(
      (sum, o) =>
        sum + (o.pricePerDay === 0 && o.id === "full-tank" ? 250 : o.pricePerDay * rentalDays(search.startDate, search.startTime, search.endDate, search.endTime)),
      0,
    );

    if (USE_LIVE) {
      try {
        const days = rentalDays(search.startDate, search.startTime, search.endDate, search.endTime);
        const remote = await liveFetch<{
          vehicleId: string;
          days: number;
          dailyRate: number;
          optionsTotal: number;
          discount: number;
          subtotal: number;
          total: number;
          currency: "MAD";
        }>("/api/v1/public/quotes", {
          method: "POST",
          body: JSON.stringify({
            vehicleId,
            city: search.city,
            startAt: toIso(search.startDate, search.startTime),
            endAt: toIso(search.endDate, search.endTime),
            optionsTotal,
            discount: days >= 7 ? Math.round(vehicle.dailyRate * days * 0.08) : 0,
          }),
        });
        return {
          vehicleId: remote.vehicleId,
          days: remote.days,
          dailyRate: Number(remote.dailyRate),
          optionsTotal: Number(remote.optionsTotal),
          discount: Number(remote.discount),
          deposit: vehicle.deposit,
          subtotal: Number(remote.subtotal),
          total: Number(remote.total),
          currency: "MAD" as const,
          lines: [
            {
              label: `${remote.days} jour${remote.days > 1 ? "s" : ""} × ${remote.dailyRate} MAD`,
              amount: Number(remote.subtotal),
            },
            ...(Number(remote.optionsTotal)
              ? [{ label: "Options", amount: Number(remote.optionsTotal) }]
              : []),
            ...(Number(remote.discount)
              ? [{ label: "Remise", amount: -Number(remote.discount) }]
              : []),
          ],
          isEstimate: false,
        };
      } catch {
        return buildQuote(vehicle, search, optionIds);
      }
    }
    return mockDelay(buildQuote(vehicle, search, optionIds));
  },

  async createBooking(draft: BookingDraft): Promise<BookingConfirmation> {
    if (!draft.vehicleId || !draft.customer) {
      throw new Error("Réservation incomplète");
    }
    const vehicle = await this.resolveVehicle(draft.vehicleId, draft.search, draft.vehicle);
    if (!vehicle) throw new Error("Véhicule introuvable");
    const quote = await this.getQuote(draft.vehicleId, draft.search, draft.optionIds, vehicle);

    if (USE_LIVE) {
      const remote = await liveFetch<{
        mode: "live";
        reference: string;
        status: string;
        message: string;
        quote: Quote;
        startAt: string;
        endAt: string;
      }>("/api/v1/public/reservations", {
        method: "POST",
        body: JSON.stringify({
          vehicleId: draft.vehicleId,
          city: draft.search.city,
          startAt: toIso(draft.search.startDate, draft.search.startTime),
          endAt: toIso(draft.search.endDate, draft.search.endTime),
          pickupLocation: `${draft.search.city} · ${draft.search.pickupLocation}`,
          returnLocation: `${draft.search.city} · ${draft.search.returnLocation}`,
          firstName: draft.customer.firstName,
          lastName: draft.customer.lastName,
          email: draft.customer.email,
          phone: draft.customer.phone,
          nationality: draft.customer.nationality,
          optionsTotal: quote.optionsTotal,
          discount: quote.discount,
          paymentMethod: draft.paymentMethod,
          paymentBank: draft.paymentBank || null,
        }),
      });

      return {
        mode: "live",
        reference: remote.reference,
        status: "CONFIRMED",
        message: remote.message,
        quote,
        vehicle,
        search: draft.search,
        customer: draft.customer,
        paymentMethod: draft.paymentMethod,
        paymentBank: draft.paymentBank || null,
        createdAt: new Date().toISOString(),
      };
    }

    const confirmation: BookingConfirmation = {
      mode: "mock",
      reference: createMockReference(),
      status: "PENDING_CONFIRMATION",
      message:
        "Simulation locale uniquement — aucune réservation réelle n’a été enregistrée. Connectez l’API Spring (NEXT_PUBLIC_API_MODE=live) pour confirmer une vraie demande.",
      quote,
      vehicle,
      search: draft.search,
      customer: draft.customer,
      paymentMethod: draft.paymentMethod,
      paymentBank: draft.paymentBank || null,
      createdAt: new Date().toISOString(),
    };

    if (typeof window !== "undefined") {
      const key = "luxen.mock.bookings";
      const existing = JSON.parse(sessionStorage.getItem(key) || "[]") as BookingConfirmation[];
      sessionStorage.setItem(key, JSON.stringify([confirmation, ...existing].slice(0, 20)));
    }

    return mockDelay(confirmation, 500);
  },

  async lookupReservation(reference: string, emailOrPhone: string) {
    if (USE_LIVE) {
      try {
        const remote = await liveFetch<{
          reference: string;
          status: string;
          message: string;
          quote: { total: number; deposit?: number; days: number; dailyRate: number };
          vehicle: Record<string, unknown> | null;
          customer: CustomerInfo;
          startAt: string;
          endAt: string;
          pickupLocation: string;
          returnLocation: string;
          paymentMethod?: string;
          paymentBank?: string | null;
        }>(
          `/api/v1/public/reservations/${encodeURIComponent(reference)}?contact=${encodeURIComponent(emailOrPhone)}`,
        );
        const vehicle = remote.vehicle
          ? mapPublicVehicle(remote.vehicle)
          : VEHICLES[0];
        return {
          mode: "live" as const,
          reference: remote.reference,
          status: "CONFIRMED" as const,
          message: remote.message,
          quote: {
            vehicleId: vehicle.id,
            days: remote.quote.days,
            dailyRate: Number(remote.quote.dailyRate),
            optionsTotal: 0,
            discount: 0,
            deposit: vehicle.deposit,
            subtotal: Number(remote.quote.total),
            total: Number(remote.quote.total),
            currency: "MAD" as const,
            lines: [],
            isEstimate: false,
          },
          vehicle,
          search: {
            city: remote.pickupLocation?.split(" · ")[0] || "",
            pickupLocation: remote.pickupLocation,
            returnLocation: remote.returnLocation,
            startDate: remote.startAt.slice(0, 10),
            startTime: remote.startAt.slice(11, 16),
            endDate: remote.endAt.slice(0, 10),
            endTime: remote.endAt.slice(11, 16),
            category: "",
          },
          customer: remote.customer,
          paymentMethod: (remote.paymentMethod as BookingConfirmation["paymentMethod"]) || "CASH",
          paymentBank: remote.paymentBank || null,
          createdAt: new Date().toISOString(),
        } satisfies BookingConfirmation;
      } catch {
        return null;
      }
    }

    if (typeof window === "undefined") return null;
    const existing = JSON.parse(sessionStorage.getItem("luxen.mock.bookings") || "[]") as BookingConfirmation[];
    const found = existing.find((b) => {
      const contact = emailOrPhone.trim().toLowerCase();
      return (
        b.reference.toLowerCase() === reference.trim().toLowerCase() &&
        (b.customer.email.toLowerCase() === contact ||
          b.customer.phone.replace(/\s/g, "") === contact.replace(/\s/g, ""))
      );
    });
    return mockDelay(found ?? null);
  },

  getOptions() {
    return BOOKING_OPTIONS;
  },
};

export type { CustomerInfo, SearchParams };
