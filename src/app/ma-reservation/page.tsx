"use client";

import { InvoiceDocument } from "@/components/booking/InvoiceDocument";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api/client";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import type { BookingConfirmation } from "@/lib/types";
import { formatMad } from "@/lib/utils";
import { Printer } from "lucide-react";
import { FormEvent, useState } from "react";

export default function ManageReservationPage() {
  const { t, locale } = useLanguage();
  const [reference, setReference] = useState("");
  const [contact, setContact] = useState("");
  const [result, setResult] = useState<BookingConfirmation | null | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(undefined);
    try {
      const found = await api.lookupReservation(reference, contact);
      setResult(found);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container-luxen py-8 sm:py-10">
      <div className="mx-auto max-w-xl">
        <h1 className="section-title">{t.manage.title}</h1>
        <p className="section-subtitle">{t.manage.subtitle}</p>

        {api.mode() === "mock" && (
          <div className="no-print mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {t.manage.demo}
          </div>
        )}

        <form
          onSubmit={onSubmit}
          className="no-print mt-6 space-y-4 rounded-[22px] border border-black/5 bg-white p-5 shadow-[var(--shadow-card)]"
        >
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
              {t.manage.reference}
            </span>
            <input
              className="field"
              required
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              placeholder="MOCK-XXXXXX"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-xs font-bold uppercase tracking-wide text-luxen-steel">
              {t.manage.contact}
            </span>
            <input
              className="field"
              required
              value={contact}
              onChange={(e) => setContact(e.target.value)}
            />
          </label>
          <Button type="submit" disabled={loading} className="w-full sm:w-auto">
            {t.manage.search}
          </Button>
        </form>

        {result === null && (
          <p className="no-print mt-4 rounded-2xl bg-luxen-mist p-4 text-sm text-luxen-steel">
            {t.manage.notFound}
          </p>
        )}

        {result && (
          <div className="no-print mt-4 space-y-3 rounded-[22px] border border-black/5 bg-white p-5 text-sm shadow-[var(--shadow-card)]">
            <p className="font-display text-xl font-bold">{result.reference}</p>
            <p>
              {result.vehicle.brand} {result.vehicle.model}
            </p>
            <p>
              {result.search.startDate} → {result.search.endDate}
            </p>
            <p>
              {t.manage.total} {formatMad(result.quote.total, locale)}
            </p>
            <p className="text-luxen-steel">{result.message}</p>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn-primary mt-2 w-full sm:w-auto"
            >
              <Printer className="h-4 w-4" />
              {t.confirm.printInvoice}
            </button>
          </div>
        )}
      </div>

      {result && (
        <div className="mx-auto mt-8 max-w-[820px]">
          <h2 className="no-print mb-4 font-display text-lg font-bold text-[#111]">
            {t.confirm.previewInvoice}
          </h2>
          <InvoiceDocument booking={result} />
        </div>
      )}
    </div>
  );
}
