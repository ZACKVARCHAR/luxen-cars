export const SITE = {
  name: "Luxen Cars",
  tagline: "Location de voiture",
  city: "Fès",
  address: "Fès, Maroc",
  phoneDisplay: process.env.NEXT_PUBLIC_PHONE_DISPLAY || "06 61 18 62 24",
  phoneTel: (process.env.NEXT_PUBLIC_PHONE_TEL || "+212661186224").replace(/\s/g, ""),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "212661186224").replace(/\D/g, ""),
  email: "contact@luxencars.ma",
  /** Fallback local si l’API villes est indisponible */
  defaultCity: "Fès",
  locations: [
    "Agence centre-ville",
    "Aéroport Fès-Saïss",
    "Gare",
    "Hôtel / Riad",
    "Adresse personnalisée",
  ],
  social: {
    facebook: "https://www.facebook.com/",
    instagram: "https://www.instagram.com/",
    youtube: "https://www.youtube.com/",
    linkedin: "https://www.linkedin.com/",
    tiktok: "https://www.tiktok.com/",
  },
};

export function whatsappLink(message?: string) {
  const text = encodeURIComponent(
    message || "Bonjour Luxen Cars (Fès), je souhaite obtenir des informations sur une location.",
  );
  return `https://wa.me/${SITE.whatsapp}?text=${text}`;
}
