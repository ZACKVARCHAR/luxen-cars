"use client";

import { Button } from "@/components/ui/button";
import { useMoroccoCities } from "@/hooks/useMoroccoCities";
import { api } from "@/lib/api/client";
import { MOROCCO_BANKS, PAYMENT_METHODS } from "@/lib/data/payments";
import {
  translateLabel,
  translateLocation,
  translateOption,
  translatePayment,
  type Dictionary,
} from "@/lib/i18n/dictionaries";
import { useLanguage } from "@/lib/i18n/LanguageProvider";
import { SITE } from "@/lib/site";
import type {
  CustomerInfo,
  PaymentMethod,
  Quote,
  SearchParams,
  Vehicle,
} from "@/lib/types";
import { formatMad, formatMadPrecise, rentalDays, todayPlus } from "@/lib/utils";
import { BOOKING_OPTIONS } from "@/lib/data/vehicles";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Check,
  Loader2,
  MapPin,
  CalendarDays,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function BookingWizard() {
  const router = useRouter();
  const params = useSearchParams();
  const reduce = useReducedMotion();
  const { t, locale } = useLanguage();
  const { cities, defaultCity } = useMoroccoCities();
  const [step, setStep] = useState(0);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [optionIds, setOptionIds] = useState<string[]>([]);
  const [quote, setQuote] = useState<Quote | null>(null);
  const [error, setError] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("CASH");
  const [paymentBank, setPaymentBank] = useState(MOROCCO_BANKS[0]);

  const customerSchema = useMemo(
    () =>
      z.object({
        firstName: z.string().min(2, t.booking.errFirst),
        lastName: z.string().min(2, t.booking.errLast),
        email: z.string().email(t.booking.errEmail),
        phone: z.string().min(8, t.booking.errPhone),
        nationality: z.string().min(2, t.booking.errNat),
      }),
    [t],
  );

  const STEPS = t.booking.steps;

  const [search, setSearch] = useState<SearchParams>({
    city: params.get("city") || SITE.defaultCity,
    pickupLocation: params.get("pickupLocation") || SITE.locations[0],
    returnLocation: params.get("returnLocation") || params.get("pickupLocation") || SITE.locations[0],
    startDate: params.get("startDate") || todayPlus(1),
    startTime: params.get("startTime") || "10:00",
    endDate: params.get("endDate") || todayPlus(4),
    endTime: params.get("endTime") || "10:00",
    category: (params.get("category") as SearchParams["category"]) || "",
  });

  const form = useForm<CustomerInfo>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      nationality: t.booking.nationalityDefault,
    },
  });

  useEffect(() => {
    form.setValue("nationality", t.booking.nationalityDefault);
  }, [t.booking.nationalityDefault, form]);

  const selected = useMemo(
    () => vehicles.find((v) => v.id === selectedId) || null,
    [vehicles, selectedId],
  );
  const options = api.getOptions();

  useEffect(() => {
    const vehicleSlug = params.get("vehicle");
    if (!vehicleSlug) return;
    api.getVehicleBySlug(vehicleSlug).then((v) => {
      if (v) {
        setSelectedId(v.id);
        setVehicles((prev) => (prev.some((x) => x.id === v.id) ? prev : [v, ...prev]));
        setStep(1);
      }
    });
  }, [params]);

  async function runSearch() {
    setLoading(true);
    setError("");
    try {
      const list = await api.searchAvailability(search);
      setVehicles(list);
      setStep(1);
      if (list[0] && !selectedId) setSelectedId(list[0].id);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.booking.searchFail);
    } finally {
      setLoading(false);
    }
  }

  function buildLocalQuote(vehicle: Vehicle): Quote {
    const days = rentalDays(search.startDate, search.startTime, search.endDate, search.endTime);
    const optionsTotal = BOOKING_OPTIONS.filter((o) => optionIds.includes(o.id)).reduce(
      (sum, o) => sum + (o.pricePerDay === 0 && o.id === "full-tank" ? 250 : o.pricePerDay * days),
      0,
    );
    const subtotal = vehicle.dailyRate * days;
    const discount = days >= 7 ? Math.round(subtotal * 0.08) : 0;
    return {
      vehicleId: vehicle.id,
      days,
      dailyRate: vehicle.dailyRate,
      optionsTotal,
      discount,
      deposit: vehicle.deposit,
      subtotal,
      total: subtotal + optionsTotal - discount,
      currency: "MAD",
      lines: [
        { label: `${days} jour${days > 1 ? "s" : ""} × ${vehicle.dailyRate} MAD`, amount: subtotal },
        ...(optionsTotal ? [{ label: "Options", amount: optionsTotal }] : []),
        ...(discount ? [{ label: "Remise", amount: -discount }] : []),
      ],
      isEstimate: true,
    };
  }

  useEffect(() => {
    if (!selectedId) {
      setQuote(null);
      return;
    }
    const vehicle = vehicles.find((v) => v.id === selectedId);
    let cancelled = false;
    api
      .getQuote(selectedId, search, optionIds, vehicle)
      .then((q) => {
        if (!cancelled) {
          setQuote(q);
        }
      })
      .catch(() => {
        if (!cancelled && vehicle) {
          setQuote(buildLocalQuote(vehicle));
        } else if (!cancelled) {
          setQuote(null);
        }
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedId, search, optionIds, vehicles]);

  async function confirm() {
    const customer = await form.trigger().then((ok) => (ok ? form.getValues() : null));
    if (!customer || !selectedId) return;
    if (paymentMethod === "VIREMENT" && !paymentBank) {
      setError(t.booking.bankRequired);
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const confirmation = await api.createBooking({
        search,
        vehicleId: selectedId,
        vehicle: selected,
        optionIds,
        customer,
        paymentMethod,
        paymentBank: paymentMethod === "VIREMENT" ? paymentBank : null,
      });
      sessionStorage.setItem("luxen.last.booking", JSON.stringify(confirmation));
      router.push(`/confirmation/${confirmation.reference}`);
    } catch (e) {
      setError(e instanceof Error ? e.message : t.booking.confirmFail);
    } finally {
      setSubmitting(false);
    }
  }

  const fieldLabels = {
    firstName: t.booking.firstName,
    lastName: t.booking.lastName,
    email: t.booking.email,
    phone: t.booking.phone,
    nationality: t.booking.nationality,
  } as const;

  return (
    <div className="space-y-7">
      <div className="rounded-[22px] border border-black/5 bg-white p-4 shadow-[0_12px_36px_rgba(0,0,0,0.06)] sm:p-5">
        <div className="mb-4 flex items-center justify-between gap-3">
          <div className="text-sm font-bold text-[#111]">
            {t.booking.stepOf} {step + 1} / {STEPS.length}
          </div>
          <div className="text-xs font-semibold text-[#888]">{STEPS[step]}</div>
        </div>
        <div className="mb-4 h-2 overflow-hidden rounded-full bg-[#f0f1f3]">
          <motion.div
            className="h-full rounded-full bg-[#e10600]"
            initial={false}
            animate={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
        <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`inline-flex shrink-0 items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                i === step
                  ? "bg-[#e10600] text-white shadow-[0_8px_18px_rgba(225,6,0,0.3)]"
                  : i < step
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-[#f3f4f6] text-[#888]"
              }`}
            >
              {i < step ? <Check className="h-3.5 w-3.5" /> : <span>{i + 1}</span>}
              <span className="max-w-[9.5rem] truncate sm:max-w-none">{label}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {[
          { icon: ShieldCheck, text: t.booking.trust1 },
          { icon: Sparkles, text: t.booking.trust2 },
          { icon: CalendarDays, text: t.booking.trust3 },
        ].map((item) => (
          <div
            key={item.text}
            className="inline-flex items-center gap-2 rounded-xl border border-[#f0d0ce] bg-[#fff8f7] px-3 py-2.5 text-xs font-bold text-[#e10600]"
          >
            <item.icon className="h-4 w-4" />
            {item.text}
          </div>
        ))}
      </div>

      {api.mode() === "mock" && (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {t.booking.demo}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.35 }}
        >
          {step === 0 && (
            <div className="overflow-hidden rounded-[24px] border border-black/5 bg-white shadow-[0_16px_48px_rgba(0,0,0,0.07)]">
              <div className="border-b border-[#f0f0f0] bg-[linear-gradient(90deg,#fff5f4,#fff)] px-5 py-4">
                <h2 className="font-display text-xl font-bold text-[#111]">{t.booking.whereTitle}</h2>
                <p className="mt-1 text-sm text-[#777]">{t.booking.whereSub}</p>
              </div>
              <div className="grid gap-4 p-5 sm:grid-cols-2">
                <Field label={t.booking.city}>
                  <select
                    value={search.city}
                    onChange={(e) => setSearch({ ...search, city: e.target.value })}
                    className="field"
                  >
                    {(cities.includes(search.city) ? cities : [search.city, ...cities]).map((c) => (
                      <option key={c} value={c}>
                        {c}
                        {c === defaultCity ? ` ${t.booking.hq}` : ""}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t.booking.pickup}>
                  <select
                    value={search.pickupLocation}
                    onChange={(e) => setSearch({ ...search, pickupLocation: e.target.value })}
                    className="field"
                  >
                    {SITE.locations.map((l) => (
                      <option key={l} value={l}>
                        {translateLocation(t, l)}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t.booking.dropoff}>
                  <select
                    value={search.returnLocation}
                    onChange={(e) => setSearch({ ...search, returnLocation: e.target.value })}
                    className="field"
                  >
                    {SITE.locations.map((l) => (
                      <option key={l} value={l}>
                        {translateLocation(t, l)}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label={t.booking.category}>
                  <select
                    value={search.category || ""}
                    onChange={(e) =>
                      setSearch({ ...search, category: e.target.value as SearchParams["category"] })
                    }
                    className="field"
                  >
                    <option value="">{t.booking.allCats}</option>
                    {(["Économique", "Citadine", "Compacte", "Berline", "SUV"] as const).map(
                      (cat) => (
                        <option key={cat} value={cat}>
                          {translateLabel(t, cat)}
                        </option>
                      ),
                    )}
                  </select>
                </Field>
                <Field label={t.booking.startDate}>
                  <input
                    type="date"
                    className="field"
                    value={search.startDate}
                    onChange={(e) => setSearch({ ...search, startDate: e.target.value })}
                  />
                </Field>
                <Field label={t.booking.startTime}>
                  <input
                    type="time"
                    className="field"
                    value={search.startTime}
                    onChange={(e) => setSearch({ ...search, startTime: e.target.value })}
                  />
                </Field>
                <Field label={t.booking.endDate}>
                  <input
                    type="date"
                    className="field"
                    value={search.endDate}
                    min={search.startDate}
                    onChange={(e) => setSearch({ ...search, endDate: e.target.value })}
                  />
                </Field>
                <Field label={t.booking.endTime}>
                  <input
                    type="time"
                    className="field"
                    value={search.endTime}
                    onChange={(e) => setSearch({ ...search, endTime: e.target.value })}
                  />
                </Field>
                <div className="sm:col-span-2">
                  <Button onClick={runSearch} disabled={loading} className="w-full sm:w-auto">
                    {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <MapPin className="h-4 w-4" />}
                    {t.booking.searchBtn}
                  </Button>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-4">
                {vehicles.map((vehicle, i) => (
                  <motion.button
                    key={vehicle.id}
                    type="button"
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedId(vehicle.id)}
                    className={`flex w-full flex-col gap-3 rounded-[20px] border p-3 text-left transition sm:flex-row sm:gap-4 ${
                      selectedId === vehicle.id
                        ? "border-[#e10600] bg-[#fff5f4] shadow-[0_12px_30px_rgba(225,6,0,0.12)]"
                        : "border-black/8 bg-white hover:border-[#e10600]/40"
                    }`}
                  >
                    <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl bg-[#0b0d12] sm:h-24 sm:w-36">
                      <Image src={vehicle.image} alt="" fill className="object-contain p-2" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="font-display text-lg font-bold text-[#111]">
                          {vehicle.brand} {vehicle.model}
                        </div>
                        {selectedId === vehicle.id && (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#e10600] text-white">
                            <Check className="h-3.5 w-3.5" strokeWidth={3} />
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-[#777]">
                        {translateLabel(t, vehicle.transmission)} · {translateLabel(t, vehicle.fuel)}{" "}
                        · {vehicle.seats} {t.vehicle.seats}
                      </div>
                      <div className="mt-2 font-bold text-[#e10600]">
                        {formatMad(vehicle.dailyRate, locale)}
                        <span className="text-xs font-semibold text-[#888]">{t.vehicle.perDay}</span>
                      </div>
                    </div>
                  </motion.button>
                ))}
                {!vehicles.length && (
                  <p className="rounded-2xl bg-[#f3f4f6] p-4 text-sm text-[#777]">{t.booking.empty}</p>
                )}
                <div className="rounded-[20px] border border-black/8 bg-white p-4">
                  <h3 className="font-bold text-[#111]">{t.booking.options}</h3>
                  <p className="mt-1 text-xs font-semibold text-emerald-700">{t.booking.gpsFree}</p>
                  <div className="mt-3 space-y-2">
                    {options.map((opt) => {
                      const checked = optionIds.includes(opt.id);
                      return (
                        <label
                          key={opt.id}
                          className={`flex cursor-pointer items-start gap-3 rounded-xl border px-3 py-3 transition ${
                            checked ? "border-[#e10600]/40 bg-[#fff5f4]" : "border-black/6"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            onChange={() =>
                              setOptionIds((ids) =>
                                checked ? ids.filter((id) => id !== opt.id) : [...ids, opt.id],
                              )
                            }
                          />
                          <span>
                            <span className="block text-sm font-semibold">
                              {translateOption(t, opt.id, "label")}
                            </span>
                            <span className="text-xs text-[#777]">
                              {translateOption(t, opt.id, "desc")}
                            </span>
                          </span>
                          <span className="ms-auto text-sm font-bold text-[#e10600]">
                            {opt.id === "full-tank"
                              ? "250 MAD"
                              : `${opt.pricePerDay} ${t.booking.perDayShort}`}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <Button variant="ghost" onClick={() => setStep(0)} className="w-full sm:w-auto">
                    {t.booking.back}
                  </Button>
                  <Button
                    disabled={!selectedId}
                    onClick={() => setStep(2)}
                    className="w-full sm:w-auto"
                  >
                    {t.booking.continue}
                  </Button>
                </div>
              </div>
              <QuotePanel quote={quote} vehicle={selected} t={t} locale={locale} />
            </div>
          )}

          {step === 2 && (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <form className="grid gap-4 rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_14px_40px_rgba(0,0,0,0.06)] sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <h2 className="font-display text-xl font-bold text-[#111]">{t.booking.infoTitle}</h2>
                  <p className="mt-1 text-sm text-[#777]">{t.booking.infoSub}</p>
                </div>
                {(
                  ["firstName", "lastName", "email", "phone", "nationality"] as const
                ).map((name) => (
                  <Field
                    key={name}
                    label={fieldLabels[name]}
                    className={name === "nationality" ? "sm:col-span-2" : ""}
                  >
                    <input className="field" {...form.register(name)} />
                    {form.formState.errors[name] && (
                      <span className="mt-1 block text-xs text-red-600">
                        {form.formState.errors[name]?.message}
                      </span>
                    )}
                  </Field>
                ))}
                <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row">
                  <Button variant="ghost" type="button" onClick={() => setStep(1)} className="w-full sm:w-auto">
                    {t.booking.back}
                  </Button>
                  <Button
                    type="button"
                    onClick={() => form.trigger().then((ok) => ok && setStep(3))}
                    className="w-full sm:w-auto"
                  >
                    {t.booking.seeSummary}
                  </Button>
                </div>
              </form>
              <QuotePanel quote={quote} vehicle={selected} t={t} locale={locale} />
            </div>
          )}

          {step === 3 && (
            <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="space-y-5 rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_14px_40px_rgba(0,0,0,0.06)]">
                <h3 className="font-display text-xl font-bold text-[#111]">{t.booking.summary}</h3>

                {!selected ? (
                  <div className="space-y-4">
                    <p className="rounded-xl bg-[#f3f4f6] px-3 py-3 text-sm text-[#666]">
                      {t.booking.empty}
                    </p>
                    <Button variant="ghost" onClick={() => setStep(1)}>
                      {t.booking.back}
                    </Button>
                  </div>
                ) : !quote ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 rounded-xl bg-[#fff5f4] px-3 py-3 text-sm text-[#e10600]">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      {t.booking.quoteEmpty}
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button variant="ghost" onClick={() => setStep(2)} className="w-full sm:w-auto">
                        {t.booking.back}
                      </Button>
                      <Button
                        className="w-full sm:w-auto"
                        onClick={() => {
                          if (!selected) return;
                          setError("");
                          setQuote(buildLocalQuote(selected));
                          api.getQuote(selected.id, search, optionIds).then(setQuote).catch(() => {
                            /* local quote already shown */
                          });
                        }}
                      >
                        {t.booking.continue}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-[#666]">
                      {selected.brand} {selected.model} · {search.city} · {search.startDate}{" "}
                      {search.startTime} → {search.endDate} {search.endTime}
                    </p>
                    <p className="text-sm text-[#444]">
                      {form.getValues("firstName")} {form.getValues("lastName")} ·{" "}
                      {form.getValues("email")} · {form.getValues("phone")}
                    </p>

                    <div>
                      <h4 className="mb-3 text-sm font-bold uppercase tracking-wide text-[#777]">
                        {t.booking.payMode}
                      </h4>
                      <div className="grid gap-2 sm:grid-cols-2">
                        {PAYMENT_METHODS.map((method) => {
                          const active = paymentMethod === method.code;
                          return (
                            <button
                              key={method.code}
                              type="button"
                              onClick={() => setPaymentMethod(method.code)}
                              className={`rounded-2xl border px-3 py-3 text-left transition ${
                                active
                                  ? "border-[#e10600] bg-[#fff5f4] shadow-[0_8px_20px_rgba(225,6,0,0.12)]"
                                  : "border-[#e8e8e8] bg-white hover:border-[#e10600]/40"
                              }`}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-sm font-bold text-[#111]">
                                  {t.payments[method.code]}
                                </span>
                                {active && (
                                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#e10600] text-white">
                                    <Check className="h-3 w-3" strokeWidth={3} />
                                  </span>
                                )}
                              </div>
                              <p className="mt-1 text-xs leading-relaxed text-[#777]">
                                {
                                  t.payments[
                                    `${method.code}_desc` as
                                      | "TPA_desc"
                                      | "CASH_desc"
                                      | "CHEQUE_desc"
                                      | "VIREMENT_desc"
                                  ]
                                }
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {paymentMethod === "VIREMENT" && (
                      <Field label={t.booking.bank}>
                        <select
                          className="field"
                          value={paymentBank}
                          onChange={(e) => setPaymentBank(e.target.value)}
                        >
                          {MOROCCO_BANKS.map((bank) => (
                            <option key={bank} value={bank}>
                              {bank === "Autre banque" ? t.payments.otherBank : bank}
                            </option>
                          ))}
                        </select>
                      </Field>
                    )}

                    <p className="rounded-xl bg-[#fff5f4] px-3 py-2 text-sm text-[#444]">
                      {t.booking.payChosen}{" "}
                      <strong>{translatePayment(t, paymentMethod, paymentBank)}</strong>.{" "}
                      {t.booking.deposit} {formatMad(quote.deposit, locale)}. {t.booking.agency}{" "}
                      {t.site.city}.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <Button variant="ghost" onClick={() => setStep(2)} className="w-full sm:w-auto">
                        {t.booking.back}
                      </Button>
                      <Button onClick={confirm} disabled={submitting} className="w-full sm:w-auto">
                        {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                        {t.booking.confirm}
                      </Button>
                    </div>
                  </>
                )}
              </div>
              <QuotePanel quote={quote} vehicle={selected} t={t} locale={locale} />
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-[#777]">
        {label}
      </span>
      {children}
    </label>
  );
}

function QuotePanel({
  quote,
  vehicle,
  t,
  locale,
}: {
  quote: Quote | null;
  vehicle: Vehicle | null;
  t: Dictionary;
  locale: string;
}) {
  if (!quote || !vehicle) {
    return (
      <div className="rounded-[24px] border border-dashed border-black/10 bg-[#f7f8fa] p-5 text-sm text-[#777]">
        {t.booking.quoteEmpty}
      </div>
    );
  }
  return (
    <aside className="h-fit overflow-hidden rounded-[24px] bg-[#111318] p-5 text-white shadow-[0_18px_48px_rgba(0,0,0,0.25)]">
      <div className="relative mb-4 aspect-[16/9] overflow-hidden rounded-xl bg-[#0b0d12]">
        <Image src={vehicle.image} alt="" fill className="object-contain p-3" />
      </div>
      <div className="text-xs uppercase tracking-[0.16em] text-white/45">{t.booking.quote}</div>
      <div className="mt-2 font-display text-xl font-bold">
        {vehicle.brand} {vehicle.model}
      </div>
      <div className="mt-4 space-y-2 text-sm">
        {quote.lines.map((line) => (
          <div key={line.label} className="flex justify-between gap-3 text-white/75">
            <span>{line.label}</span>
            <span>{formatMadPrecise(line.amount, locale)}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
        <span className="text-sm text-white/60">{t.booking.total}</span>
        <span className="font-display text-3xl font-extrabold text-white">
          {formatMad(quote.total, locale)}
        </span>
      </div>
      <p className="mt-3 text-xs text-white/45">
        {t.booking.deposit} {formatMad(quote.deposit, locale)}.{" "}
        {quote.isEstimate ? t.booking.estimate : t.booking.serverAmounts}
      </p>
    </aside>
  );
}
