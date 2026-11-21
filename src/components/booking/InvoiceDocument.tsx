"use client";

import {
  translateLabel,
  translateLocation,
  translatePayment,
} from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE } from "@/lib/site";
import type { BookingConfirmation } from "@/lib/types";
import { formatMad, formatMadPrecise } from "@/lib/utils";
import Image from "next/image";

export function InvoiceDocument({
  booking,
  id = "luxen-invoice",
}: {
  booking: BookingConfirmation;
  id?: string;
}) {
  const { t, locale } = useLanguage();
  const { quote, vehicle, search, customer } = booking;
  const issued = new Date(booking.createdAt || Date.now());
  const dateLabel = issued.toLocaleDateString(
    locale === "ar" ? "ar-MA" : locale === "en" ? "en-GB" : "fr-FR",
    { day: "2-digit", month: "long", year: "numeric" },
  );
  const statusLabel =
    booking.status === "CONFIRMED" ? t.invoice.statusConfirmed : t.invoice.statusPending;

  return (
    <article
      id={id}
      className="invoice-sheet mx-auto w-full max-w-[820px] overflow-hidden rounded-2xl border border-[#e8e8e8] bg-white text-[#111] shadow-[0_16px_48px_rgba(0,0,0,0.08)]"
    >
      {/* Header band */}
      <div className="relative overflow-hidden bg-[#0b0d12] px-5 py-5 text-white sm:px-8 sm:py-6">
        <div className="pointer-events-none absolute -end-10 -top-10 h-40 w-40 rounded-full bg-[#e10600]/30 blur-2xl" />
        <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-white px-2.5 py-2">
              <Image
                src="/brand/logo-luxen-cars.png"
                alt="Luxen Cars"
                width={140}
                height={56}
                className="h-10 w-auto object-contain sm:h-12"
              />
            </div>
            <div>
              <div className="font-display text-lg font-extrabold tracking-tight sm:text-xl">
                Luxen Cars
              </div>
              <div className="text-xs text-white/65 sm:text-sm">{t.site.tagline}</div>
            </div>
          </div>
          <div className="text-start sm:text-end">
            <div className="inline-flex rounded-full bg-[#e10600] px-3 py-1 text-[11px] font-bold uppercase tracking-wide">
              {t.invoice.proforma}
            </div>
            <div className="mt-2 font-display text-2xl font-extrabold sm:text-3xl">
              {t.invoice.title}
            </div>
            <div className="mt-1 text-sm text-white/75">
              {t.invoice.ref} · <span className="font-bold text-white">{booking.reference}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-6 px-5 py-6 sm:px-8 sm:py-7">
        {/* Meta + parties */}
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-[#eee] bg-[#fafafa] p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#888]">
              {t.invoice.from}
            </div>
            <div className="mt-2 text-sm font-bold">Luxen Cars — {t.site.city}</div>
            <div className="mt-1 space-y-0.5 text-sm text-[#555]">
              <p>{t.site.address}</p>
              <p>{SITE.phoneDisplay}</p>
              <p>{SITE.email}</p>
            </div>
          </div>
          <div className="rounded-xl border border-[#eee] bg-[#fafafa] p-4">
            <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#888]">
              {t.invoice.billTo}
            </div>
            <div className="mt-2 text-sm font-bold">
              {customer.firstName} {customer.lastName}
            </div>
            <div className="mt-1 space-y-0.5 text-sm text-[#555]">
              <p>
                {t.invoice.email} : {customer.email}
              </p>
              <p>
                {t.invoice.phone} : {customer.phone}
              </p>
              <p>
                {t.invoice.nationality} : {customer.nationality}
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Meta label={t.invoice.date} value={dateLabel} />
          <Meta label={t.invoice.ref} value={booking.reference} />
          <Meta label={t.invoice.status} value={statusLabel} accent />
          <Meta
            label={t.invoice.payment}
            value={translatePayment(t, booking.paymentMethod || "CASH", booking.paymentBank)}
          />
        </div>

        {/* Rental */}
        <section>
          <h3 className="mb-3 border-b border-[#eee] pb-2 font-display text-base font-bold">
            {t.invoice.rentalDetails}
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoRow label={t.invoice.vehicle} value={`${vehicle.brand} ${vehicle.model}`} />
            <InfoRow label={t.invoice.category} value={translateLabel(t, vehicle.category)} />
            <InfoRow
              label={t.invoice.transmission}
              value={translateLabel(t, vehicle.transmission)}
            />
            <InfoRow label={t.invoice.fuel} value={translateLabel(t, vehicle.fuel)} />
            <InfoRow label={t.invoice.seats} value={String(vehicle.seats)} />
            <InfoRow label={t.invoice.days} value={String(quote.days)} />
            <InfoRow label={t.invoice.city} value={search.city} />
            <InfoRow
              label={t.invoice.pickup}
              value={translateLocation(t, search.pickupLocation)}
            />
            <InfoRow
              label={t.invoice.dropoff}
              value={translateLocation(t, search.returnLocation)}
            />
            <InfoRow
              label={t.invoice.start}
              value={`${search.startDate} · ${search.startTime}`}
            />
            <InfoRow label={t.invoice.end} value={`${search.endDate} · ${search.endTime}`} />
            {booking.paymentBank ? (
              <InfoRow label={t.invoice.bank} value={booking.paymentBank} />
            ) : null}
          </div>
        </section>

        {/* Lines table */}
        <section>
          <h3 className="mb-3 border-b border-[#eee] pb-2 font-display text-base font-bold">
            {t.invoice.lines}
          </h3>
          <div className="overflow-x-auto rounded-xl border border-[#eee]">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="bg-[#111] text-left text-white">
                  <th className="px-3 py-2.5 font-semibold">{t.invoice.description}</th>
                  <th className="px-3 py-2.5 font-semibold">{t.invoice.amount}</th>
                </tr>
              </thead>
              <tbody>
                {quote.lines.length ? (
                  quote.lines.map((line) => (
                    <tr key={line.label} className="border-t border-[#eee]">
                      <td className="px-3 py-2.5 text-[#333]">{line.label}</td>
                      <td className="px-3 py-2.5 font-semibold whitespace-nowrap">
                        {formatMadPrecise(line.amount, locale)}
                      </td>
                    </tr>
                  ))
                ) : (
                  <>
                    <tr className="border-t border-[#eee]">
                      <td className="px-3 py-2.5 text-[#333]">
                        {quote.days} {t.invoice.days} × {formatMad(quote.dailyRate, locale)}
                      </td>
                      <td className="px-3 py-2.5 font-semibold whitespace-nowrap">
                        {formatMadPrecise(quote.subtotal, locale)}
                      </td>
                    </tr>
                    {quote.optionsTotal > 0 && (
                      <tr className="border-t border-[#eee]">
                        <td className="px-3 py-2.5 text-[#333]">{t.invoice.options}</td>
                        <td className="px-3 py-2.5 font-semibold whitespace-nowrap">
                          {formatMadPrecise(quote.optionsTotal, locale)}
                        </td>
                      </tr>
                    )}
                    {quote.discount > 0 && (
                      <tr className="border-t border-[#eee]">
                        <td className="px-3 py-2.5 text-[#333]">{t.invoice.discount}</td>
                        <td className="px-3 py-2.5 font-semibold whitespace-nowrap text-[#e10600]">
                          −{formatMadPrecise(quote.discount, locale)}
                        </td>
                      </tr>
                    )}
                  </>
                )}
              </tbody>
            </table>
          </div>

          <div className="mt-4 ms-auto w-full max-w-sm space-y-2 rounded-xl bg-[#fff5f4] p-4">
            <TotalRow label={t.invoice.subtotal} value={formatMad(quote.subtotal, locale)} />
            {quote.optionsTotal > 0 && (
              <TotalRow label={t.invoice.options} value={formatMad(quote.optionsTotal, locale)} />
            )}
            {quote.discount > 0 && (
              <TotalRow
                label={t.invoice.discount}
                value={`−${formatMad(quote.discount, locale)}`}
              />
            )}
            <div className="flex items-end justify-between border-t border-[#e10600]/20 pt-3">
              <span className="text-sm font-bold text-[#111]">{t.invoice.total}</span>
              <span className="font-display text-2xl font-extrabold text-[#e10600]">
                {formatMad(quote.total, locale)}
              </span>
            </div>
            <TotalRow label={t.invoice.deposit} value={formatMad(quote.deposit, locale)} />
          </div>
        </section>

        {/* Notes */}
        <section className="rounded-xl border border-dashed border-[#ddd] bg-[#fafafa] p-4">
          <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#888]">
            {t.invoice.notes}
          </div>
          <ul className="mt-2 space-y-1.5 text-xs leading-relaxed text-[#555]">
            <li>• {t.invoice.note1}</li>
            <li>• {t.invoice.note2}</li>
            <li>• {t.invoice.note3}</li>
          </ul>
        </section>

        {/* Signatures */}
        <div className="grid gap-6 pt-2 sm:grid-cols-2">
          <div className="rounded-xl border border-[#eee] p-4">
            <div className="text-xs font-bold text-[#777]">{t.invoice.signature}</div>
            <div className="mt-10 border-b border-[#ccc]" />
          </div>
          <div className="rounded-xl border border-[#eee] p-4">
            <div className="text-xs font-bold text-[#777]">{t.invoice.stamp}</div>
            <div className="mt-10 border-b border-[#ccc]" />
          </div>
        </div>

        <p className="text-center text-xs font-semibold text-[#888]">{t.invoice.thanks}</p>
      </div>
    </article>
  );
}

function Meta({
  label,
  value,
  accent,
}: {
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[#eee] px-3 py-2.5">
      <div className="text-[10px] font-bold uppercase tracking-wide text-[#888]">{label}</div>
      <div
        className={`mt-1 text-sm font-bold leading-snug ${accent ? "text-[#e10600]" : "text-[#111]"}`}
      >
        {value}
      </div>
    </div>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3 border-b border-[#f3f3f3] pb-2 text-sm">
      <span className="shrink-0 text-[#777]">{label}</span>
      <span className="text-end font-semibold text-[#111]">{value}</span>
    </div>
  );
}

function TotalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-[#666]">{label}</span>
      <span className="font-semibold text-[#111]">{value}</span>
    </div>
  );
}
