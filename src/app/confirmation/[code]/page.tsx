"use client";

import { InvoiceDocument } from "@/components/booking/InvoiceDocument";
import { translatePayment } from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { BookingConfirmation } from "@/lib/types";
import { formatMad } from "@/lib/utils";
import { AlertTriangle, CheckCircle2, Printer } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ConfirmationPage() {
  const params = useParams<{ code: string }>();
  const { t, locale } = useLanguage();
  const [booking, setBooking] = useState<BookingConfirmation | null>(null);

  useEffect(() => {
    const raw = sessionStorage.getItem("luxen.last.booking");
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as BookingConfirmation;
      if (parsed.reference === params.code) setBooking(parsed);
    } catch {
      /* ignore */
    }
  }, [params.code]);

  if (!booking) {
    return (
      <div className="container-luxen py-10 sm:py-16">
        <h1 className="section-title">{t.confirm.missingTitle}</h1>
        <p className="section-subtitle">{t.confirm.missingSub}</p>
        <Link href="/ma-reservation" className="btn-primary mt-6 inline-flex">
          {t.nav.manageBooking}
        </Link>
      </div>
    );
  }

  const isMock = booking.mode === "mock";

  return (
    <div className="container-luxen py-8 sm:py-12">
      <div className="no-print mx-auto max-w-2xl rounded-[22px] border border-black/5 bg-white p-5 shadow-[var(--shadow-card)] sm:rounded-[28px] sm:p-8">
        <div className="flex items-start gap-3">
          {isMock ? (
            <AlertTriangle className="mt-1 h-7 w-7 shrink-0 text-amber-500" />
          ) : (
            <CheckCircle2 className="mt-1 h-7 w-7 shrink-0 text-emerald-500" />
          )}
          <div>
            <h1 className="font-display text-2xl font-extrabold text-luxen-ink sm:text-3xl">
              {isMock ? t.confirm.mockTitle : t.confirm.liveTitle}
            </h1>
            <p className="mt-2 text-sm leading-relaxed text-luxen-steel">{booking.message}</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 rounded-2xl bg-luxen-mist p-4 text-sm sm:p-5">
          <Row label={t.confirm.reference} value={booking.reference} />
          <Row
            label={t.confirm.vehicle}
            value={`${booking.vehicle.brand} ${booking.vehicle.model}`}
          />
          <Row
            label={t.confirm.period}
            value={`${booking.search.startDate} → ${booking.search.endDate}`}
          />
          <Row label={t.confirm.total} value={formatMad(booking.quote.total, locale)} />
          <Row label={t.confirm.deposit} value={formatMad(booking.quote.deposit, locale)} />
          <Row
            label={t.confirm.payment}
            value={translatePayment(t, booking.paymentMethod || "CASH", booking.paymentBank)}
          />
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <button type="button" onClick={() => window.print()} className="btn-primary w-full sm:w-auto">
            <Printer className="h-4 w-4" />
            {t.confirm.printInvoice}
          </button>
          <Link href="/ma-reservation" className="btn-ghost w-full sm:w-auto">
            {t.nav.manageBooking}
          </Link>
          <Link href="/vehicules" className="btn-ghost w-full sm:w-auto">
            {t.nav.vehicles}
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-8 max-w-[820px]">
        <h2 className="no-print mb-4 font-display text-lg font-bold text-[#111] sm:text-xl">
          {t.confirm.previewInvoice}
        </h2>
        <InvoiceDocument booking={booking} />
        <div className="no-print mt-4 flex justify-center sm:justify-end">
          <button type="button" onClick={() => window.print()} className="btn-primary w-full sm:w-auto">
            <Printer className="h-4 w-4" />
            {t.confirm.printInvoice}
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-luxen-steel">{label}</span>
      <span className="break-all font-semibold text-luxen-ink sm:text-end">{value}</span>
    </div>
  );
}
