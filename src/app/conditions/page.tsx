import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Conditions générales",
};

export default function ConditionsPage() {
  return (
    <div className="container-luxen prose prose-neutral max-w-3xl py-10">
      <h1 className="section-title">Conditions générales</h1>
      <p className="section-subtitle">
        Document provisoire destiné à être remplacé par les CGV juridiques définitives de Luxen
        Cars.
      </p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-luxen-ink/85">
        <p>
          La réservation en ligne constitue une demande de location soumise à confirmation de
          disponibilité, d’identité et de conditions de caution.
        </p>
        <p>
          Les tarifs affichés hors mode API live sont indicatifs et non contractuels. Le montant
          final est celui calculé et confirmé par le système Luxen Cars.
        </p>
        <p>
          Le locataire s’engage à restituer le véhicule dans l’état convenu, aux date et lieu
          prévus, avec le niveau de carburant défini au contrat.
        </p>
      </div>
    </div>
  );
}
