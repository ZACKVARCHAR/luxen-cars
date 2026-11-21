import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-luxen py-20 text-center">
      <h1 className="font-display text-4xl font-extrabold text-luxen-ink">Page introuvable</h1>
      <p className="mt-3 text-luxen-steel">La page demandée n’existe pas ou a été déplacée.</p>
      <Link href="/" className="btn-primary mt-6 inline-flex">
        Retour à l’accueil
      </Link>
    </div>
  );
}
