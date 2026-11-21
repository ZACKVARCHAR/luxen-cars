export type PaymentMethodCode = "TPA" | "CASH" | "CHEQUE" | "VIREMENT";

export const PAYMENT_METHODS: {
  code: PaymentMethodCode;
  label: string;
  description: string;
}[] = [
  {
    code: "TPA",
    label: "TPA / Carte bancaire",
    description: "Paiement par terminal carte (Visa, Mastercard, etc.) à la prise en charge.",
  },
  {
    code: "CASH",
    label: "Espèces (Cash)",
    description: "Paiement en liquide en MAD à la remise des clés.",
  },
  {
    code: "CHEQUE",
    label: "Chèque",
    description: "Chèque bancaire accepté (sous réserve de validation de l’agence).",
  },
  {
    code: "VIREMENT",
    label: "Virement bancaire",
    description: "Virement vers le compte Luxen Cars — choisissez votre banque.",
  },
];

/** Principales banques du Maroc */
export const MOROCCO_BANKS = [
  "Attijariwafa Bank",
  "Banque Populaire (BP)",
  "Bank of Africa (BOA)",
  "BMCE Bank of Africa",
  "Crédit Agricole du Maroc (CAM)",
  "Crédit du Maroc (CDM)",
  "CIH Bank",
  "Société Générale Maroc (SGMB)",
  "CFG Bank",
  "Al Barid Bank",
  "Bank Al-Maghrib (BAM)",
  "Umnia Bank",
  "Bank Al Yousr",
  "Bank Assafa",
  "Al Akhdar Bank",
  "BTI Bank",
  "CDG Capital",
  "Arab Bank Maroc",
  "Citibank Maroc",
  "Autre banque",
].sort((a, b) => a.localeCompare(b, "fr"));

export function paymentLabel(
  method: PaymentMethodCode,
  bank?: string | null,
): string {
  const base = PAYMENT_METHODS.find((m) => m.code === method)?.label || method;
  if (method === "VIREMENT" && bank) return `${base} · ${bank}`;
  return base;
}
