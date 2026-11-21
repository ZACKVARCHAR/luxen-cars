import { ShowroomClient } from "@/components/showroom/ShowroomClient";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Showroom 3D",
  description: "Explorez les véhicules Luxen Cars en showroom interactif.",
};

export default function ShowroomPage() {
  return (
    <div className="container-luxen py-10">
      <div className="mb-8 max-w-2xl">
        <h1 className="section-title">Showroom interactif</h1>
        <p className="section-subtitle">
          Faites tourner le véhicule, zoomez et changez de couleur. Dès que des modèles GLB fidèles
          et licenciés seront disponibles, ils remplaceront le proxy 3D actuel.
        </p>
      </div>
      <ShowroomClient />
    </div>
  );
}
