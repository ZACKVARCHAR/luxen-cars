import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function madLocale(locale?: string) {
  if (locale === "en") return "en-MA";
  if (locale === "ar") return "ar-MA";
  return "fr-MA";
}

export function formatMad(amount: number, locale?: string) {
  return new Intl.NumberFormat(madLocale(locale), {
    style: "currency",
    currency: "MAD",
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatMadPrecise(amount: number, locale?: string) {
  return new Intl.NumberFormat(madLocale(locale), {
    style: "currency",
    currency: "MAD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function rentalDays(startDate: string, startTime: string, endDate: string, endTime: string) {
  const start = new Date(`${startDate}T${startTime}:00`);
  const end = new Date(`${endDate}T${endTime}:00`);
  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end <= start) {
    return 1;
  }
  const minutes = (end.getTime() - start.getTime()) / 60000;
  return Math.max(1, Math.ceil(minutes / 1440));
}

export function todayPlus(days: number) {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}
