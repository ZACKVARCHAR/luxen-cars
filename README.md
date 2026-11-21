# Luxen Cars — Site public (`landPa`)

Front storefront Next.js 15 (App Router) pour **Luxen Cars – Location de voiture**.

## Stack

- Next.js 15 + TypeScript + Tailwind CSS 4
- Framer Motion, Lucide React
- React Three Fiber / Drei (showroom)
- React Hook Form + Zod
- Couche API `src/lib/api/client.ts` (mock par défaut, live vers Spring)

## Démarrage

```powershell
cd "d:\Desktop\Luxen Cars\landPa"
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Modes API

| Variable | Valeur | Effet |
|----------|--------|--------|
| `NEXT_PUBLIC_API_MODE` | `mock` (défaut) | Données locales, réservations simulées (`MOCK-…`) |
| `NEXT_PUBLIC_API_MODE` | `live` | Appels `http://localhost:8080/api/v1/public/**` |
| `NEXT_PUBLIC_API_BASE_URL` | URL Spring | Base API |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | ex. `2126…` | Lien WhatsApp |

Les réservations mock **ne sont jamais** présentées comme confirmées en production métier.

## Photos

Les images dans `public/vehicles` sont des **placeholders illustratifs** (Unsplash). Remplacer par les photos officielles de la flotte.

## Showroom 3D

Proxy 3D stylisé tant qu’aucun GLB licencié fidèle n’est fourni. Ne pas le présenter comme le modèle exact du véhicule catalogue.
