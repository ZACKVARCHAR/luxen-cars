import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function PrivacyPage() {
  return (
    <div className="container-luxen max-w-3xl py-10">
      <h1 className="section-title">Politique de confidentialité</h1>
      <p className="section-subtitle">
        Version provisoire — à faire valider juridiquement avant mise en production.
      </p>
      <div className="mt-8 space-y-4 text-sm leading-relaxed text-luxen-ink/85">
        <p>
          Les données collectées (identité, contact, dates de location) servent uniquement à traiter
          votre demande de réservation et le suivi associé.
        </p>
        <p>
          Elles ne sont pas revendues. L’accès est limité aux équipes habilitées de Luxen Cars et
          aux systèmes techniques nécessaires au traitement.
        </p>
        <p>
          Pour toute demande d’accès, de rectification ou de suppression, contactez{" "}
          <strong>contact@luxencars.ma</strong>.
        </p>
      </div>
    </div>
  );
}
