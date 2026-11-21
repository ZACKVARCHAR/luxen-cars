export type Locale = "fr" | "en" | "ar";

export const LOCALES: { code: Locale; label: string; short: string }[] = [
  { code: "fr", label: "Français", short: "FR" },
  { code: "en", label: "English", short: "EN" },
  { code: "ar", label: "العربية", short: "AR" },
];

export type Dictionary = {
  nav: {
    home: string;
    vehicles: string;
    booking: string;
    about: string;
    reviews: string;
    contact: string;
    bookNow: string;
    manageBooking: string;
    showroom: string;
    faq: string;
    terms: string;
    privacy: string;
    openMenu: string;
    closeMenu: string;
  };
  hero: {
    title1: string;
    title2: string;
    subtitle: string;
    b1: string;
    b2: string;
    b3: string;
    alt: string;
  };
  search: {
    rent: string;
    manage: string;
    place: string;
    chooseAgency: string;
    start: string;
    end: string;
    submit: string;
    findBooking: string;
    city: string;
  };
  value: {
    price: string;
    cancel: string;
    cancelSub: string;
    delivery: string;
    assist: string;
    pay: string;
  };
  fleet: {
    title: string;
    subtitle: string;
    seeAll: string;
    all: string;
    why: string;
    w1: string;
    w2: string;
    w3: string;
    w4: string;
    w5: string;
  };
  how: {
    title: string;
    subtitle: string;
    s1t: string;
    s1d: string;
    s2t: string;
    s2d: string;
    s3t: string;
    s3d: string;
  };
  trust: {
    title: string;
    subtitle: string;
    badge: string;
    r1: string;
    r2: string;
    r3: string;
    contactTitle: string;
    pickupEverywhere: string;
    hours: string;
    mapHint: string;
  };
  offer: {
    close: string;
    closeOffer: string;
    badge: string;
    title1: string;
    title2: string;
    body: string;
    b1: string;
    b2: string;
    b3: string;
    cta: string;
    skip: string;
  };
  vehicle: {
    available: string;
    limited: string;
    seats: string;
    from: string;
    perDay: string;
    brand: string;
    transmission: string;
    fuel: string;
    availability: string;
    maxPrice: string;
    search: string;
    searchPh: string;
    allF: string;
    allM: string;
    empty: string;
    pageTitle: string;
    pageSub: string;
  };
  labels: Record<string, string>;
  locations: Record<string, string>;
  payments: {
    TPA: string;
    TPA_desc: string;
    CASH: string;
    CASH_desc: string;
    CHEQUE: string;
    CHEQUE_desc: string;
    VIREMENT: string;
    VIREMENT_desc: string;
    otherBank: string;
  };
  options: Record<string, string>;
  booking: {
    eyebrow: string;
    title: string;
    titleAccent: string;
    subtitle: string;
    stat1: string;
    stat2: string;
    stat3: string;
    loading: string;
    stepOf: string;
    steps: [string, string, string, string];
    trust1: string;
    trust2: string;
    trust3: string;
    demo: string;
    whereTitle: string;
    whereSub: string;
    city: string;
    hq: string;
    pickup: string;
    dropoff: string;
    category: string;
    allCats: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;
    searchBtn: string;
    searchFail: string;
    empty: string;
    options: string;
    gpsFree: string;
    perDayShort: string;
    back: string;
    continue: string;
    infoTitle: string;
    infoSub: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    nationality: string;
    nationalityDefault: string;
    errFirst: string;
    errLast: string;
    errEmail: string;
    errPhone: string;
    errNat: string;
    seeSummary: string;
    summary: string;
    payMode: string;
    bank: string;
    payChosen: string;
    deposit: string;
    agency: string;
    confirm: string;
    confirmFail: string;
    bankRequired: string;
    quoteEmpty: string;
    quote: string;
    total: string;
    estimate: string;
    serverAmounts: string;
  };
  manage: {
    title: string;
    subtitle: string;
    demo: string;
    reference: string;
    contact: string;
    search: string;
    notFound: string;
    total: string;
  };
  confirm: {
    missingTitle: string;
    missingSub: string;
    mockTitle: string;
    liveTitle: string;
    reference: string;
    vehicle: string;
    period: string;
    total: string;
    deposit: string;
    payment: string;
    printInvoice: string;
    previewInvoice: string;
  };
  invoice: {
    title: string;
    proforma: string;
    billTo: string;
    from: string;
    date: string;
    ref: string;
    status: string;
    statusPending: string;
    statusConfirmed: string;
    rentalDetails: string;
    city: string;
    pickup: string;
    dropoff: string;
    start: string;
    end: string;
    vehicle: string;
    category: string;
    transmission: string;
    fuel: string;
    seats: string;
    days: string;
    lines: string;
    description: string;
    qty: string;
    unit: string;
    amount: string;
    subtotal: string;
    options: string;
    discount: string;
    total: string;
    deposit: string;
    payment: string;
    bank: string;
    customer: string;
    nationality: string;
    phone: string;
    email: string;
    notes: string;
    note1: string;
    note2: string;
    note3: string;
    thanks: string;
    signature: string;
    stamp: string;
  };
  about: {
    title: string;
    subtitle: string;
    p1: string;
    p2: string;
    p3: string;
    cta: string;
  };
  contact: {
    title: string;
    subtitle: string;
    phone: string;
    email: string;
    hq: string;
    pickup: string;
    pickupAll: string;
    bookOnline: string;
    name: string;
    message: string;
    formNote: string;
    soon: string;
    teaserTitle: string;
    teaserSub: string;
    teaserCta: string;
    mainAgency: string;
    pickupFes: string;
  };
  faq: {
    title: string;
    subtitle: string;
    items: { q: string; a: string }[];
  };
  footer: {
    useful: string;
    info: string;
    follow: string;
    rights: string;
    based: string;
    blurb: string;
    appSoon: string;
  };
  assistant: {
    title: string;
    subtitle: string;
    placeholder: string;
    welcome: string;
    s1: string;
    s2: string;
    s3: string;
    s4: string;
    a1: string;
    a2: string;
    a3: string;
    a4: string;
  };
  site: {
    city: string;
    address: string;
    tagline: string;
    wa: string;
  };
  common: {
    close: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  fr: {
    nav: {
      home: "Accueil",
      vehicles: "Nos véhicules",
      booking: "Réservation",
      about: "À propos",
      reviews: "Avis",
      contact: "Contact",
      bookNow: "Réserver maintenant",
      manageBooking: "Gérer ma réservation",
      showroom: "Showroom",
      faq: "FAQ / Avis",
      terms: "Conditions générales",
      privacy: "Politique de confidentialité",
      openMenu: "Ouvrir le menu",
      closeMenu: "Fermer le menu",
    },
    hero: {
      title1: "Louez votre voiture",
      title2: "en toute simplicité",
      subtitle:
        "Dacia, Peugeot, Opel et plus encore. Tarifs en MAD, réservation claire, prise en charge à Fès et partout au Maroc.",
      b1: "Réservation rapide et sécurisée",
      b2: "Large choix de véhicules",
      b3: "Assistance 7j/7",
      alt: "Showroom Luxen Cars — Dacia Duster, Peugeot 208 et Opel Corsa",
    },
    search: {
      rent: "Louer un véhicule",
      manage: "Gérer ma réservation",
      place: "Lieu de prise en charge",
      chooseAgency: "Choisir une agence",
      start: "Date de prise en charge",
      end: "Date de retour",
      submit: "Rechercher une voiture",
      findBooking: "Retrouver ma réservation",
      city: "Ville",
    },
    value: {
      price: "Meilleur prix garanti",
      cancel: "Annulation gratuite",
      cancelSub: "(jusqu'à 48h)",
      delivery: "Livraison gratuite · GPS inclus",
      assist: "Assistance 7j/7 24h/24",
      pay: "TPA · Cash · Chèque · Virement",
    },
    fleet: {
      title: "Nos Véhicules",
      subtitle: "Choisissez parmi nos modèles populaires — Duster, 208, Corsa et plus.",
      seeAll: "Voir tout le catalogue",
      all: "Tous",
      why: "Pourquoi choisir Luxen Cars ?",
      w1: "Tarifs clairs en MAD",
      w2: "Livraison gratuite · GPS inclus",
      w3: "Prise en charge flexible",
      w4: "Assistance dédiée",
      w5: "TPA, cash, chèque ou virement",
    },
    how: {
      title: "Comment ça marche ?",
      subtitle: "Un parcours simple en trois étapes pour louer en toute confiance.",
      s1t: "Recherchez",
      s1d: "Choisissez votre ville, vos dates et le type de véhicule souhaité.",
      s2t: "Réservez",
      s2d: "Sélectionnez le modèle, les options, puis confirmez vos informations.",
      s3t: "Récupérez et roulez",
      s3d: "Récupérez les clés et partez découvrir le Maroc à votre rythme.",
    },
    trust: {
      title: "Ils nous font confiance",
      subtitle: "Des clients satisfaits partout au Maroc — avis à venir dès la mise en service.",
      badge: "Service premium Luxen Cars",
      r1: "Réservation claire, véhicule propre et prise en charge rapide à Fès. Je recommande.",
      r2: "Tarifs en MAD bien affichés, aucun frais surprise. Parfait pour un week-end.",
      r3: "Équipe réactive et voiture récente. Expérience simple du début à la fin.",
      contactTitle: "Nous contacter",
      pickupEverywhere: "prise en charge dans tout le Maroc",
      hours: "Horaires à confirmer avec l’agence",
      mapHint: "Carte / localisation — à brancher sur l’adresse définitive Luxen Cars",
    },
    offer: {
      close: "Fermer",
      closeOffer: "Fermer l’offre",
      badge: "Offre limitée",
      title1: "-10% sur votre",
      title2: "première location",
      body: "Réservez dès maintenant et profitez de −10% avec le code",
      b1: "Valable sur toute la flotte Luxen Cars",
      b2: "TPA, cash, chèque ou virement (toutes banques)",
      b3: "Offre non cumulable — démarrage immédiat",
      cta: "Profiter de l’offre",
      skip: "Continuer sans l’offre",
    },
    vehicle: {
      available: "Disponible",
      limited: "Stock limité",
      seats: "places",
      from: "À partir de",
      perDay: "/jour",
      brand: "Marque",
      transmission: "Transmission",
      fuel: "Carburant",
      availability: "Disponibilité",
      maxPrice: "Prix max / jour",
      search: "Recherche",
      searchPh: "Marque, modèle…",
      allF: "Toutes",
      allM: "Tous",
      empty: "Aucun véhicule ne correspond à ces filtres.",
      pageTitle: "Nos véhicules",
      pageSub:
        "Filtrez par marque, prix, transmission ou carburant. Les tarifs affichés sont en MAD / jour.",
    },
    labels: {
      Manuelle: "Manuelle",
      Automatique: "Automatique",
      Essence: "Essence",
      Diesel: "Diesel",
      Hybride: "Hybride",
      Économique: "Économique",
      Citadine: "Citadine",
      Compacte: "Compacte",
      Berline: "Berline",
      SUV: "SUV",
      "Livraison gratuite": "Livraison gratuite",
      "GPS inclus": "GPS inclus",
      "Grand coffre": "Grand coffre",
      "Design i-Cockpit": "Design i-Cockpit",
      Agile: "Agile",
    },
    locations: {
      "Agence centre-ville": "Agence centre-ville",
      "Aéroport Fès-Saïss": "Aéroport Fès-Saïss",
      Gare: "Gare",
      "Hôtel / Riad": "Hôtel / Riad",
      "Adresse personnalisée": "Adresse personnalisée",
    },
    payments: {
      TPA: "TPA / Carte bancaire",
      TPA_desc: "Paiement par terminal carte (Visa, Mastercard, etc.) à la prise en charge.",
      CASH: "Espèces (Cash)",
      CASH_desc: "Paiement en liquide en MAD à la remise des clés.",
      CHEQUE: "Chèque",
      CHEQUE_desc: "Chèque bancaire accepté (sous réserve de validation de l’agence).",
      VIREMENT: "Virement bancaire",
      VIREMENT_desc: "Virement vers le compte Luxen Cars — choisissez votre banque.",
      otherBank: "Autre banque",
    },
    options: {
      "child-seat": "Siège enfant",
      "child-seat_desc": "Siège homologué",
      "additional-driver": "Conducteur additionnel",
      "additional-driver_desc": "Deuxième conducteur déclaré",
      "full-tank": "Plein d’essence",
      "full-tank_desc": "Restitution sans contrainte de carburant",
    },
    booking: {
      eyebrow: "Réservation en ligne",
      title: "Réservez votre voiture",
      titleAccent: " en 4 étapes",
      subtitle:
        "Choisissez vos dates, sélectionnez le modèle, ajoutez vos options et confirmez. Paiement sur place possible — tarifs clairs en MAD.",
      stat1: "étapes simples",
      stat2: "prix transparents",
      stat3: "assistance",
      loading: "Chargement du parcours de réservation…",
      stepOf: "Étape",
      steps: ["Recherche", "Véhicule & options", "Vos informations", "Confirmation"],
      trust1: "Réservation sécurisée",
      trust2: "Véhicules récents",
      trust3: "Annulation flexible",
      demo: "Mode démonstration : les disponibilités et réservations sont simulées localement.",
      whereTitle: "Où et quand ?",
      whereSub: "Indiquez votre trajet pour voir les véhicules disponibles.",
      city: "Ville de départ",
      hq: "(siège)",
      pickup: "Lieu de récupération",
      dropoff: "Lieu de restitution",
      category: "Catégorie",
      allCats: "Toutes",
      startDate: "Date de départ",
      startTime: "Heure de départ",
      endDate: "Date de retour",
      endTime: "Heure de retour",
      searchBtn: "Rechercher les véhicules disponibles",
      searchFail: "Recherche impossible",
      empty: "Aucun véhicule pour ces critères. Modifiez votre recherche.",
      options: "Options",
      gpsFree: "GPS inclus + livraison gratuite sur tous les véhicules.",
      perDayShort: "MAD/j",
      back: "Retour",
      continue: "Continuer",
      infoTitle: "Vos informations",
      infoSub: "Nous vous recontactons pour finaliser la prise en charge.",
      firstName: "Prénom",
      lastName: "Nom",
      email: "Email",
      phone: "Téléphone",
      nationality: "Nationalité",
      nationalityDefault: "Maroc",
      errFirst: "Prénom requis",
      errLast: "Nom requis",
      errEmail: "Email invalide",
      errPhone: "Téléphone requis",
      errNat: "Nationalité requise",
      seeSummary: "Voir le récapitulatif",
      summary: "Récapitulatif",
      payMode: "Mode de paiement",
      bank: "Banque pour le virement",
      payChosen: "Paiement choisi :",
      deposit: "Caution indicative :",
      agency: "Agence Luxen Cars —",
      confirm: "Confirmer la demande",
      confirmFail: "Échec de la réservation",
      bankRequired: "Choisissez votre banque pour le virement.",
      quoteEmpty: "Sélectionnez un véhicule pour afficher le devis.",
      quote: "Devis",
      total: "Total estimé",
      estimate: "Montants indicatifs (mode démo).",
      serverAmounts: "Montants calculés par le serveur.",
    },
    manage: {
      title: "Gérer ma réservation",
      subtitle: "Saisissez votre référence et l’email ou le téléphone utilisé lors de la demande.",
      demo: "En mode démo, seules les demandes simulées de la session navigateur sont retrouvables (référence commençant par MOCK-).",
      reference: "Référence",
      contact: "Email ou téléphone",
      search: "Rechercher",
      notFound: "Aucune réservation trouvée pour ces informations.",
      total: "Total estimé :",
    },
    confirm: {
      missingTitle: "Confirmation introuvable",
      missingSub:
        "Aucune demande correspondant à cette référence n’a été trouvée dans cette session.",
      mockTitle: "Demande simulée",
      liveTitle: "Réservation enregistrée",
      reference: "Référence",
      vehicle: "Véhicule",
      period: "Période",
      total: "Total estimé",
      deposit: "Caution indicative",
      payment: "Paiement",
      printInvoice: "Imprimer la facture",
      previewInvoice: "Aperçu de la facture",
    },
    invoice: {
      title: "Facture",
      proforma: "Facture proforma / Devis",
      billTo: "Facturé à",
      from: "Émetteur",
      date: "Date",
      ref: "N° facture",
      status: "Statut",
      statusPending: "En attente de confirmation",
      statusConfirmed: "Confirmée",
      rentalDetails: "Détails de location",
      city: "Ville",
      pickup: "Prise en charge",
      dropoff: "Restitution",
      start: "Début",
      end: "Fin",
      vehicle: "Véhicule",
      category: "Catégorie",
      transmission: "Transmission",
      fuel: "Carburant",
      seats: "Places",
      days: "Jours",
      lines: "Détail des montants",
      description: "Description",
      qty: "Qté",
      unit: "P.U.",
      amount: "Montant",
      subtotal: "Sous-total",
      options: "Options",
      discount: "Remise",
      total: "Total TTC estimé",
      deposit: "Caution indicative",
      payment: "Mode de paiement",
      bank: "Banque",
      customer: "Client",
      nationality: "Nationalité",
      phone: "Téléphone",
      email: "Email",
      notes: "Conditions",
      note1: "Document indicatif — montants en MAD. La facture définitive est confirmée par l’agence.",
      note2: "GPS inclus et livraison gratuite. Caution restituée selon l’état du véhicule.",
      note3: "Paiement sur place possible (TPA, cash, chèque ou virement).",
      thanks: "Merci pour votre confiance — Luxen Cars Fès",
      signature: "Signature client",
      stamp: "Cachet agence",
    },
    about: {
      title: "À propos de Luxen Cars",
      subtitle:
        "Luxen Cars est une plateforme de location de voitures conçue pour offrir une expérience fluide, élégante et fiable aux voyageurs et résidents au Maroc.",
      p1: "Notre ambition : rendre la réservation aussi simple que le trajet. Du choix du véhicule à la remise des clés, chaque étape est pensée pour la clarté des tarifs, la qualité de la flotte et la disponibilité de l’équipe.",
      p2: "La flotte présentée sur ce site regroupe des modèles adaptés aux usages urbains et aux longs parcours : Dacia, Peugeot et Opel.",
      p3: "Les adresses précises d’agences, horaires définitifs et conditions commerciales contractuelles seront confirmés directement avec Luxen Cars.",
      cta: "Réserver un véhicule",
    },
    contact: {
      title: "Contact",
      subtitle:
        "Écrivez-nous pour une demande de disponibilité, un devis ou une prise en charge spécifique.",
      phone: "Téléphone :",
      email: "Email :",
      hq: "Siège :",
      pickup: "Prise en charge :",
      pickupAll: "toutes les villes du Maroc",
      bookOnline: "Réserver en ligne",
      name: "Nom",
      message: "Message",
      formNote:
        "Ce formulaire d’interface sera branché sur l’API / email transactionnel lors de l’intégration backend. En attendant, privilégiez WhatsApp ou le téléphone.",
      soon: "Envoi bientôt disponible",
      teaserTitle: "Parlons de votre prochain trajet",
      teaserSub:
        "Une question sur un véhicule, une disponibilité ou une prise en charge ? Notre équipe vous répond rapidement.",
      teaserCta: "Nous contacter",
      mainAgency: "Agence principale",
      pickupFes: "Prise en charge à Fès et dans toutes les villes du Maroc. Tél.",
    },
    faq: {
      title: "FAQ",
      subtitle: "Les réponses essentielles avant de réserver.",
      items: [
        {
          q: "Quels documents sont nécessaires pour louer ?",
          a: "Permis de conduire valide, pièce d’identité et moyen de paiement pour la caution. Les conditions exactes seront confirmées à la réservation.",
        },
        {
          q: "Les tarifs sont-ils en dirhams ?",
          a: "Oui. Tous les montants affichés sur le site sont en MAD.",
        },
        {
          q: "Puis-je payer sur place ?",
          a: "Oui. Le parcours public prévoit le paiement sur place. Un paiement en ligne pourra être ajouté ultérieurement.",
        },
        {
          q: "Comment modifier ou annuler ?",
          a: "Utilisez la page « Gérer ma réservation » ou contactez l’équipe. Les règles d’annulation seront précisées sur votre confirmation.",
        },
        {
          q: "Les photos correspondent-elles exactement aux véhicules ?",
          a: "Certaines images sont actuellement illustratives. Les photos officielles de la flotte remplaceront progressivement ces visuels.",
        },
      ],
    },
    footer: {
      useful: "Liens utiles",
      info: "Informations",
      follow: "Suivez-nous",
      rights: "Tous droits réservés.",
      based: "Basés à Fès · Maroc · MAD",
      blurb: "Location de voitures premium au Maroc. Agence basée à",
      appSoon: "Téléchargez notre app — bientôt disponible",
    },
    assistant: {
      title: "Aide Luxen Cars",
      subtitle: "Nous sommes à Fès — comment pouvons-nous vous aider ?",
      placeholder: "Posez votre question…",
      welcome:
        "Bonjour ! Je suis l’assistant Luxen Cars. Posez une question ou choisissez une suggestion.",
      s1: "Comment réserver ?",
      s2: "Quels sont vos tarifs ?",
      s3: "Où êtes-vous situés ?",
      s4: "Contacter WhatsApp",
      a1: "Allez sur Réservation, choisissez ville/dates, véhicule, puis confirmez. Paiement sur place possible.",
      a2: "Les tarifs sont affichés en MAD / jour sur chaque fiche véhicule. Une caution indicative est indiquée au devis.",
      a3: "Notre agence est basée à Fès, Maroc. Prise en charge possible en centre-ville, aéroport Fès-Saïss ou adresse personnalisée.",
      a4: "Ouvrez WhatsApp via le bouton ci-dessous — numéro 06 61 18 62 24.",
    },
    site: {
      city: "Fès",
      address: "Fès, Maroc",
      tagline: "Location de voiture",
      wa: "Bonjour Luxen Cars (Fès), je souhaite obtenir des informations sur une location.",
    },
    common: { close: "Fermer" },
  },
  en: {
    nav: {
      home: "Home",
      vehicles: "Our vehicles",
      booking: "Booking",
      about: "About",
      reviews: "Reviews",
      contact: "Contact",
      bookNow: "Book now",
      manageBooking: "Manage my booking",
      showroom: "Showroom",
      faq: "FAQ / Reviews",
      terms: "Terms & conditions",
      privacy: "Privacy policy",
      openMenu: "Open menu",
      closeMenu: "Close menu",
    },
    hero: {
      title1: "Rent your car",
      title2: "with complete ease",
      subtitle:
        "Dacia, Peugeot, Opel and more. Prices in MAD, clear booking, pickup in Fez and across Morocco.",
      b1: "Fast and secure booking",
      b2: "Wide vehicle choice",
      b3: "Assistance 7 days a week",
      alt: "Luxen Cars showroom — Dacia Duster, Peugeot 208 and Opel Corsa",
    },
    search: {
      rent: "Rent a vehicle",
      manage: "Manage my booking",
      place: "Pickup location",
      chooseAgency: "Choose an agency",
      start: "Pickup date",
      end: "Return date",
      submit: "Search for a car",
      findBooking: "Find my booking",
      city: "City",
    },
    value: {
      price: "Best price guaranteed",
      cancel: "Free cancellation",
      cancelSub: "(up to 48h)",
      delivery: "Free delivery · GPS included",
      assist: "Assistance 24/7",
      pay: "Card · Cash · Cheque · Transfer",
    },
    fleet: {
      title: "Our vehicles",
      subtitle: "Choose from our popular models — Duster, 208, Corsa and more.",
      seeAll: "See full catalogue",
      all: "All",
      why: "Why choose Luxen Cars?",
      w1: "Clear prices in MAD",
      w2: "Free delivery · GPS included",
      w3: "Flexible pickup",
      w4: "Dedicated assistance",
      w5: "Card, cash, cheque or transfer",
    },
    how: {
      title: "How it works",
      subtitle: "A simple three-step journey to rent with confidence.",
      s1t: "Search",
      s1d: "Choose your city, dates and the type of vehicle you need.",
      s2t: "Book",
      s2d: "Select the model, add options, then confirm your details.",
      s3t: "Pick up and drive",
      s3d: "Collect the keys and explore Morocco at your own pace.",
    },
    trust: {
      title: "They trust us",
      subtitle: "Happy customers across Morocco — more reviews coming soon.",
      badge: "Luxen Cars premium service",
      r1: "Clear booking, clean car and fast pickup in Fez. Highly recommend.",
      r2: "MAD prices clearly shown, no surprise fees. Perfect for a weekend.",
      r3: "Responsive team and a recent car. Simple from start to finish.",
      contactTitle: "Contact us",
      pickupEverywhere: "pickup available across Morocco",
      hours: "Hours to confirm with the agency",
      mapHint: "Map / location — to be linked to the final Luxen Cars address",
    },
    offer: {
      close: "Close",
      closeOffer: "Close offer",
      badge: "Limited offer",
      title1: "-10% on your",
      title2: "first rental",
      body: "Book now and enjoy −10% with the code",
      b1: "Valid on the entire Luxen Cars fleet",
      b2: "Card, cash, cheque or transfer (all banks)",
      b3: "Non-combinable offer — starts immediately",
      cta: "Claim the offer",
      skip: "Continue without the offer",
    },
    vehicle: {
      available: "Available",
      limited: "Limited stock",
      seats: "seats",
      from: "From",
      perDay: "/day",
      brand: "Brand",
      transmission: "Transmission",
      fuel: "Fuel",
      availability: "Availability",
      maxPrice: "Max price / day",
      search: "Search",
      searchPh: "Brand, model…",
      allF: "All",
      allM: "All",
      empty: "No vehicles match these filters.",
      pageTitle: "Our vehicles",
      pageSub: "Filter by brand, price, transmission or fuel. Prices shown in MAD / day.",
    },
    labels: {
      Manuelle: "Manual",
      Automatique: "Automatic",
      Essence: "Petrol",
      Diesel: "Diesel",
      Hybride: "Hybrid",
      Économique: "Economy",
      Citadine: "City car",
      Compacte: "Compact",
      Berline: "Sedan",
      SUV: "SUV",
      "Livraison gratuite": "Free delivery",
      "GPS inclus": "GPS included",
      "Grand coffre": "Large boot",
      "Design i-Cockpit": "i-Cockpit design",
      Agile: "Agile",
    },
    locations: {
      "Agence centre-ville": "City centre agency",
      "Aéroport Fès-Saïss": "Fez-Saïss Airport",
      Gare: "Train station",
      "Hôtel / Riad": "Hotel / Riad",
      "Adresse personnalisée": "Custom address",
    },
    payments: {
      TPA: "POS / Bank card",
      TPA_desc: "Card terminal payment (Visa, Mastercard, etc.) at pickup.",
      CASH: "Cash",
      CASH_desc: "Cash payment in MAD when collecting the keys.",
      CHEQUE: "Cheque",
      CHEQUE_desc: "Bank cheque accepted (subject to agency validation).",
      VIREMENT: "Bank transfer",
      VIREMENT_desc: "Transfer to the Luxen Cars account — choose your bank.",
      otherBank: "Other bank",
    },
    options: {
      "child-seat": "Child seat",
      "child-seat_desc": "Approved child seat",
      "additional-driver": "Additional driver",
      "additional-driver_desc": "Second declared driver",
      "full-tank": "Full tank",
      "full-tank_desc": "Return without fuel constraints",
    },
    booking: {
      eyebrow: "Online booking",
      title: "Book your car",
      titleAccent: " in 4 steps",
      subtitle:
        "Choose your dates, pick a model, add options and confirm. On-site payment available — clear MAD pricing.",
      stat1: "simple steps",
      stat2: "transparent prices",
      stat3: "assistance",
      loading: "Loading booking flow…",
      stepOf: "Step",
      steps: ["Search", "Vehicle & options", "Your details", "Confirmation"],
      trust1: "Secure booking",
      trust2: "Recent vehicles",
      trust3: "Flexible cancellation",
      demo: "Demo mode: availability and bookings are simulated locally.",
      whereTitle: "Where and when?",
      whereSub: "Enter your trip details to see available vehicles.",
      city: "Departure city",
      hq: "(HQ)",
      pickup: "Pickup location",
      dropoff: "Return location",
      category: "Category",
      allCats: "All",
      startDate: "Start date",
      startTime: "Start time",
      endDate: "Return date",
      endTime: "Return time",
      searchBtn: "Search available vehicles",
      searchFail: "Search failed",
      empty: "No vehicles for these criteria. Change your search.",
      options: "Options",
      gpsFree: "GPS included + free delivery on all vehicles.",
      perDayShort: "MAD/day",
      back: "Back",
      continue: "Continue",
      infoTitle: "Your details",
      infoSub: "We will contact you to finalise pickup.",
      firstName: "First name",
      lastName: "Last name",
      email: "Email",
      phone: "Phone",
      nationality: "Nationality",
      nationalityDefault: "Morocco",
      errFirst: "First name required",
      errLast: "Last name required",
      errEmail: "Invalid email",
      errPhone: "Phone required",
      errNat: "Nationality required",
      seeSummary: "View summary",
      summary: "Summary",
      payMode: "Payment method",
      bank: "Bank for transfer",
      payChosen: "Selected payment:",
      deposit: "Indicative deposit:",
      agency: "Luxen Cars agency —",
      confirm: "Confirm request",
      confirmFail: "Booking failed",
      bankRequired: "Choose your bank for the transfer.",
      quoteEmpty: "Select a vehicle to display the quote.",
      quote: "Quote",
      total: "Estimated total",
      estimate: "Indicative amounts (demo mode).",
      serverAmounts: "Amounts calculated by the server.",
    },
    manage: {
      title: "Manage my booking",
      subtitle: "Enter your reference and the email or phone used for the request.",
      demo: "In demo mode, only simulated requests from this browser session can be found (reference starting with MOCK-).",
      reference: "Reference",
      contact: "Email or phone",
      search: "Search",
      notFound: "No booking found for this information.",
      total: "Estimated total:",
    },
    confirm: {
      missingTitle: "Confirmation not found",
      missingSub: "No request matching this reference was found in this session.",
      mockTitle: "Simulated request",
      liveTitle: "Booking recorded",
      reference: "Reference",
      vehicle: "Vehicle",
      period: "Period",
      total: "Estimated total",
      deposit: "Indicative deposit",
      payment: "Payment",
      printInvoice: "Print invoice",
      previewInvoice: "Invoice preview",
    },
    invoice: {
      title: "Invoice",
      proforma: "Proforma invoice / Quote",
      billTo: "Bill to",
      from: "From",
      date: "Date",
      ref: "Invoice no.",
      status: "Status",
      statusPending: "Pending confirmation",
      statusConfirmed: "Confirmed",
      rentalDetails: "Rental details",
      city: "City",
      pickup: "Pickup",
      dropoff: "Return",
      start: "Start",
      end: "End",
      vehicle: "Vehicle",
      category: "Category",
      transmission: "Transmission",
      fuel: "Fuel",
      seats: "Seats",
      days: "Days",
      lines: "Amount breakdown",
      description: "Description",
      qty: "Qty",
      unit: "Unit",
      amount: "Amount",
      subtotal: "Subtotal",
      options: "Options",
      discount: "Discount",
      total: "Estimated total",
      deposit: "Indicative deposit",
      payment: "Payment method",
      bank: "Bank",
      customer: "Customer",
      nationality: "Nationality",
      phone: "Phone",
      email: "Email",
      notes: "Terms",
      note1: "Indicative document — amounts in MAD. The final invoice is confirmed by the agency.",
      note2: "GPS included and free delivery. Deposit returned according to vehicle condition.",
      note3: "On-site payment available (card, cash, cheque or transfer).",
      thanks: "Thank you for your trust — Luxen Cars Fez",
      signature: "Customer signature",
      stamp: "Agency stamp",
    },
    about: {
      title: "About Luxen Cars",
      subtitle:
        "Luxen Cars is a car rental platform designed to offer a smooth, elegant and reliable experience to travellers and residents in Morocco.",
      p1: "Our goal: make booking as simple as the journey. From choosing a vehicle to handing over the keys, every step focuses on clear pricing, fleet quality and team availability.",
      p2: "The fleet on this site covers urban use and longer trips: Dacia, Peugeot and Opel.",
      p3: "Exact agency addresses, final hours and contractual commercial terms will be confirmed directly with Luxen Cars.",
      cta: "Book a vehicle",
    },
    contact: {
      title: "Contact",
      subtitle: "Write to us for availability, a quote or a specific pickup request.",
      phone: "Phone:",
      email: "Email:",
      hq: "Head office:",
      pickup: "Pickup:",
      pickupAll: "all cities in Morocco",
      bookOnline: "Book online",
      name: "Name",
      message: "Message",
      formNote:
        "This interface form will be connected to the API / transactional email during backend integration. For now, prefer WhatsApp or phone.",
      soon: "Sending coming soon",
      teaserTitle: "Let's talk about your next trip",
      teaserSub:
        "A question about a vehicle, availability or pickup? Our team replies quickly.",
      teaserCta: "Contact us",
      mainAgency: "Main agency",
      pickupFes: "Pickup in Fez and all cities across Morocco. Tel.",
    },
    faq: {
      title: "FAQ",
      subtitle: "Essential answers before you book.",
      items: [
        {
          q: "What documents are required to rent?",
          a: "Valid driving licence, ID and a payment method for the deposit. Exact conditions are confirmed at booking.",
        },
        {
          q: "Are prices in dirhams?",
          a: "Yes. All amounts shown on the site are in MAD.",
        },
        {
          q: "Can I pay on site?",
          a: "Yes. The public flow supports on-site payment. Online payment may be added later.",
        },
        {
          q: "How do I modify or cancel?",
          a: "Use the “Manage my booking” page or contact the team. Cancellation rules appear on your confirmation.",
        },
        {
          q: "Do photos match the exact vehicles?",
          a: "Some images are currently illustrative. Official fleet photos will progressively replace them.",
        },
      ],
    },
    footer: {
      useful: "Useful links",
      info: "Information",
      follow: "Follow us",
      rights: "All rights reserved.",
      based: "Based in Fez · Morocco · MAD",
      blurb: "Premium car rental in Morocco. Agency based in",
      appSoon: "Download our app — coming soon",
    },
    assistant: {
      title: "Luxen Cars Help",
      subtitle: "We are based in Fez — how can we help?",
      placeholder: "Ask your question…",
      welcome: "Hi! I’m the Luxen Cars assistant. Ask a question or pick a suggestion.",
      s1: "How do I book?",
      s2: "What are your prices?",
      s3: "Where are you located?",
      s4: "Contact WhatsApp",
      a1: "Go to Booking, choose city/dates, pick a vehicle, then confirm. On-site payment is possible.",
      a2: "Rates are shown in MAD / day on each vehicle card. An indicative deposit appears on the quote.",
      a3: "Our agency is based in Fez, Morocco. Pickup available downtown, Fez-Saïss airport or a custom address.",
      a4: "Open WhatsApp via the button below — number 06 61 18 62 24.",
    },
    site: {
      city: "Fez",
      address: "Fez, Morocco",
      tagline: "Car rental",
      wa: "Hello Luxen Cars (Fez), I would like information about a rental.",
    },
    common: { close: "Close" },
  },
  ar: {
    nav: {
      home: "الرئيسية",
      vehicles: "سياراتنا",
      booking: "الحجز",
      about: "من نحن",
      reviews: "آراء",
      contact: "اتصل بنا",
      bookNow: "احجز الآن",
      manageBooking: "إدارة حجزي",
      showroom: "صالة العرض",
      faq: "الأسئلة / الآراء",
      terms: "الشروط العامة",
      privacy: "سياسة الخصوصية",
      openMenu: "فتح القائمة",
      closeMenu: "إغلاق القائمة",
    },
    hero: {
      title1: "استأجر سيارتك",
      title2: "بكل سهولة",
      subtitle:
        "داسيا، بيجو، أوبل والمزيد. أسعار بالدرهم، حجز واضح، واستلام بفاس وفي أنحاء المغرب.",
      b1: "حجز سريع وآمن",
      b2: "تشكيلة واسعة من السيارات",
      b3: "مساعدة طوال أيام الأسبوع",
      alt: "صالة عرض لوكسن كارز — داسيا داستر، بيجو 208 وأوبل كورسا",
    },
    search: {
      rent: "استأجر سيارة",
      manage: "إدارة حجزي",
      place: "مكان الاستلام",
      chooseAgency: "اختر وكالة",
      start: "تاريخ الاستلام",
      end: "تاريخ الإرجاع",
      submit: "ابحث عن سيارة",
      findBooking: "العثور على حجزي",
      city: "المدينة",
    },
    value: {
      price: "أفضل سعر مضمون",
      cancel: "إلغاء مجاني",
      cancelSub: "(حتى 48 ساعة)",
      delivery: "توصيل مجاني · GPS مشمول",
      assist: "مساعدة على مدار الساعة",
      pay: "بطاقة · نقداً · شيك · تحويل",
    },
    fleet: {
      title: "سياراتنا",
      subtitle: "اختر من نماذجنا الشائعة — داستر، 208، كورسا والمزيد.",
      seeAll: "عرض الكتالوج كاملاً",
      all: "الكل",
      why: "لماذا لوكسن كارز؟",
      w1: "أسعار واضحة بالدرهم",
      w2: "توصيل مجاني · GPS مشمول",
      w3: "استلام مرن",
      w4: "مساعدة مخصصة",
      w5: "بطاقة، نقداً، شيك أو تحويل",
    },
    how: {
      title: "كيف يعمل؟",
      subtitle: "مسار بسيط من ثلاث خطوات للحجز بثقة.",
      s1t: "ابحث",
      s1d: "اختر مدينتك وتواريخك ونوع السيارة المطلوب.",
      s2t: "احجز",
      s2d: "اختر الطراز والخيارات ثم أكّد معلوماتك.",
      s3t: "استلم وانطلق",
      s3d: "استلم المفاتيح وانطلق لاكتشاف المغرب على راحتك.",
    },
    trust: {
      title: "يثقون بنا",
      subtitle: "عملاء راضون في أنحاء المغرب — المزيد من الآراء قريباً.",
      badge: "خدمة لوكسن كارز المميزة",
      r1: "حجز واضح، سيارة نظيفة واستلام سريع بفاس. أنصح بها.",
      r2: "أسعار بالدرهم واضحة بلا مفاجآت. مثالية لعطلة نهاية الأسبوع.",
      r3: "فريق متجاوب وسيارة حديثة. تجربة بسيطة من البداية للنهاية.",
      contactTitle: "اتصل بنا",
      pickupEverywhere: "الاستلام في جميع أنحاء المغرب",
      hours: "أوقات العمل تُؤكَّد مع الوكالة",
      mapHint: "الخريطة / الموقع — سيتم ربطه بالعنوان النهائي لوكسن كارز",
    },
    offer: {
      close: "إغلاق",
      closeOffer: "إغلاق العرض",
      badge: "عرض محدود",
      title1: "خصم 10٪ على",
      title2: "أول تأجير لك",
      body: "احجز الآن واستفد من خصم 10٪ بالكود",
      b1: "صالح على أسطول لوكسن كارز بالكامل",
      b2: "بطاقة، نقداً، شيك أو تحويل (كل البنوك)",
      b3: "عرض غير قابل للجمع — يبدأ فوراً",
      cta: "الاستفادة من العرض",
      skip: "المتابعة بدون العرض",
    },
    vehicle: {
      available: "متاحة",
      limited: "مخزون محدود",
      seats: "مقاعد",
      from: "ابتداءً من",
      perDay: "/يوم",
      brand: "العلامة",
      transmission: "ناقل الحركة",
      fuel: "الوقود",
      availability: "التوفر",
      maxPrice: "أقصى سعر / يوم",
      search: "بحث",
      searchPh: "العلامة، الطراز…",
      allF: "الكل",
      allM: "الكل",
      empty: "لا توجد سيارات تطابق هذه الفلاتر.",
      pageTitle: "سياراتنا",
      pageSub: "صفِّ حسب العلامة والسعر وناقل الحركة أو الوقود. الأسعار بالدرهم / يوم.",
    },
    labels: {
      Manuelle: "يدوي",
      Automatique: "أوتوماتيك",
      Essence: "بنزين",
      Diesel: "ديزل",
      Hybride: "هجين",
      Économique: "اقتصادية",
      Citadine: "مدينة",
      Compacte: "مدمجة",
      Berline: "سيدان",
      SUV: "دفع رباعي",
      "Livraison gratuite": "توصيل مجاني",
      "GPS inclus": "GPS مشمول",
      "Grand coffre": "صندوق كبير",
      "Design i-Cockpit": "تصميم i-Cockpit",
      Agile: "خفيفة ورشيقة",
    },
    locations: {
      "Agence centre-ville": "وكالة وسط المدينة",
      "Aéroport Fès-Saïss": "مطار فاس سايس",
      Gare: "المحطة",
      "Hôtel / Riad": "فندق / رياض",
      "Adresse personnalisée": "عنوان مخصص",
    },
    payments: {
      TPA: "بطاقة بنكية / TPA",
      TPA_desc: "الدفع عبر جهاز البطاقة (فيزا، ماستركارد…) عند الاستلام.",
      CASH: "نقداً",
      CASH_desc: "الدفع نقداً بالدرهم عند تسليم المفاتيح.",
      CHEQUE: "شيك",
      CHEQUE_desc: "شيك بنكي مقبول (بعد موافقة الوكالة).",
      VIREMENT: "تحويل بنكي",
      VIREMENT_desc: "تحويل إلى حساب لوكسن كارز — اختر بنكك.",
      otherBank: "بنك آخر",
    },
    options: {
      "child-seat": "مقعد طفل",
      "child-seat_desc": "مقعد معتمد",
      "additional-driver": "سائق إضافي",
      "additional-driver_desc": "سائق ثانٍ مصرَّح به",
      "full-tank": "خزان ممتلئ",
      "full-tank_desc": "إرجاع بدون قيد على الوقود",
    },
    booking: {
      eyebrow: "حجز عبر الإنترنت",
      title: "احجز سيارتك",
      titleAccent: " في 4 خطوات",
      subtitle:
        "اختر التواريخ والطراز والخيارات ثم أكّد. الدفع عند الاستلام ممكن — أسعار واضحة بالدرهم.",
      stat1: "خطوات بسيطة",
      stat2: "أسعار شفافة",
      stat3: "مساعدة",
      loading: "جاري تحميل مسار الحجز…",
      stepOf: "الخطوة",
      steps: ["بحث", "السيارة والخيارات", "معلوماتك", "تأكيد"],
      trust1: "حجز آمن",
      trust2: "سيارات حديثة",
      trust3: "إلغاء مرن",
      demo: "وضع تجريبي: التوفر والحجوزات محاكاة محلياً.",
      whereTitle: "أين ومتى؟",
      whereSub: "أدخل تفاصيل رحلتك لعرض السيارات المتاحة.",
      city: "مدينة المغادرة",
      hq: "(المقر)",
      pickup: "مكان الاستلام",
      dropoff: "مكان الإرجاع",
      category: "الفئة",
      allCats: "الكل",
      startDate: "تاريخ المغادرة",
      startTime: "وقت المغادرة",
      endDate: "تاريخ الإرجاع",
      endTime: "وقت الإرجاع",
      searchBtn: "البحث عن السيارات المتاحة",
      searchFail: "تعذّر البحث",
      empty: "لا توجد سيارات لهذه المعايير. عدّل بحثك.",
      options: "خيارات",
      gpsFree: "GPS مشمول + توصيل مجاني على جميع السيارات.",
      perDayShort: "درهم/يوم",
      back: "رجوع",
      continue: "متابعة",
      infoTitle: "معلوماتك",
      infoSub: "سنتواصل معك لإتمام الاستلام.",
      firstName: "الاسم الشخصي",
      lastName: "اسم العائلة",
      email: "البريد الإلكتروني",
      phone: "الهاتف",
      nationality: "الجنسية",
      nationalityDefault: "المغرب",
      errFirst: "الاسم الشخصي مطلوب",
      errLast: "اسم العائلة مطلوب",
      errEmail: "بريد غير صالح",
      errPhone: "الهاتف مطلوب",
      errNat: "الجنسية مطلوبة",
      seeSummary: "عرض الملخص",
      summary: "الملخص",
      payMode: "طريقة الدفع",
      bank: "البنك للتحويل",
      payChosen: "الدفع المختار:",
      deposit: "الضمان التقديري:",
      agency: "وكالة لوكسن كارز —",
      confirm: "تأكيد الطلب",
      confirmFail: "فشل الحجز",
      bankRequired: "اختر بنكك للتحويل.",
      quoteEmpty: "اختر سيارة لعرض العرض السعري.",
      quote: "عرض السعر",
      total: "المجموع التقديري",
      estimate: "مبالغ تقديرية (وضع تجريبي).",
      serverAmounts: "مبالغ محسوبة من الخادم.",
    },
    manage: {
      title: "إدارة حجزي",
      subtitle: "أدخل المرجع والبريد أو الهاتف المستخدَم في الطلب.",
      demo: "في الوضع التجريبي، لا يمكن استرجاع إلا الطلبات المحاكاة في هذه الجلسة (مرجع يبدأ بـ MOCK-).",
      reference: "المرجع",
      contact: "البريد أو الهاتف",
      search: "بحث",
      notFound: "لم يُعثر على أي حجز لهذه المعلومات.",
      total: "المجموع التقديري:",
    },
    confirm: {
      missingTitle: "التأكيد غير موجود",
      missingSub: "لم يُعثر على أي طلب يطابق هذا المرجع في هذه الجلسة.",
      mockTitle: "طلب تجريبي",
      liveTitle: "تم تسجيل الحجز",
      reference: "المرجع",
      vehicle: "السيارة",
      period: "الفترة",
      total: "المجموع التقديري",
      deposit: "الضمان التقديري",
      payment: "الدفع",
      printInvoice: "طباعة الفاتورة",
      previewInvoice: "معاينة الفاتورة",
    },
    invoice: {
      title: "فاتورة",
      proforma: "فاتورة أولية / عرض سعر",
      billTo: "فاتورة إلى",
      from: "الجهة المصدِرة",
      date: "التاريخ",
      ref: "رقم الفاتورة",
      status: "الحالة",
      statusPending: "في انتظار التأكيد",
      statusConfirmed: "مؤكدة",
      rentalDetails: "تفاصيل التأجير",
      city: "المدينة",
      pickup: "الاستلام",
      dropoff: "الإرجاع",
      start: "البداية",
      end: "النهاية",
      vehicle: "السيارة",
      category: "الفئة",
      transmission: "ناقل الحركة",
      fuel: "الوقود",
      seats: "المقاعد",
      days: "الأيام",
      lines: "تفصيل المبالغ",
      description: "الوصف",
      qty: "الكمية",
      unit: "سعر الوحدة",
      amount: "المبلغ",
      subtotal: "المجموع الفرعي",
      options: "الخيارات",
      discount: "الخصم",
      total: "المجموع التقديري",
      deposit: "الضمان التقديري",
      payment: "طريقة الدفع",
      bank: "البنك",
      customer: "الزبون",
      nationality: "الجنسية",
      phone: "الهاتف",
      email: "البريد",
      notes: "الشروط",
      note1: "وثيقة تقديرية — المبالغ بالدرهم. الفاتورة النهائية تؤكدها الوكالة.",
      note2: "GPS مشمول وتوصيل مجاني. يُسترد الضمان حسب حالة السيارة.",
      note3: "الدفع عند الاستلام ممكن (بطاقة، نقداً، شيك أو تحويل).",
      thanks: "شكراً لثقتكم — لوكسن كارز فاس",
      signature: "توقيع الزبون",
      stamp: "ختم الوكالة",
    },
    about: {
      title: "من نحن — لوكسن كارز",
      subtitle:
        "لوكسن كارز منصة لتأجير السيارات مصممة لتقديم تجربة سلسة وأنيقة وموثوقة للمسافرين والمقيمين في المغرب.",
      p1: "طموحنا: جعل الحجز ببساطة الرحلة. من اختيار السيارة إلى تسليم المفاتيح، كل خطوة تركز على وضوح الأسعار وجودة الأسطول وتوفر الفريق.",
      p2: "الأسطول المعروض يشمل نماذج للاستخدام الحضري والرحلات الطويلة: داسيا وبيجو وأوبل.",
      p3: "عناوين الوكالات الدقيقة وأوقات العمل النهائية والشروط التجارية التعاقدية تُؤكَّد مباشرة مع لوكسن كارز.",
      cta: "احجز سيارة",
    },
    contact: {
      title: "اتصل بنا",
      subtitle: "راسلنا لطلب التوفر أو عرض سعر أو استلام خاص.",
      phone: "الهاتف:",
      email: "البريد:",
      hq: "المقر:",
      pickup: "الاستلام:",
      pickupAll: "جميع مدن المغرب",
      bookOnline: "احجز عبر الإنترنت",
      name: "الاسم",
      message: "الرسالة",
      formNote:
        "سيتم ربط هذا النموذج بالواجهة البرمجية / البريد لاحقاً. حالياً يُفضَّل واتساب أو الهاتف.",
      soon: "الإرسال قريباً",
      teaserTitle: "لنتحدث عن رحلتك القادمة",
      teaserSub: "سؤال عن سيارة أو التوفر أو الاستلام؟ فريقنا يرد بسرعة.",
      teaserCta: "اتصل بنا",
      mainAgency: "الوكالة الرئيسية",
      pickupFes: "الاستلام بفاس وفي جميع مدن المغرب. هاتف",
    },
    faq: {
      title: "الأسئلة الشائعة",
      subtitle: "الإجابات الأساسية قبل الحجز.",
      items: [
        {
          q: "ما الوثائق اللازمة للتأجير؟",
          a: "رخصة قيادة سارية، وثيقة هوية ووسيلة دفع للضمان. الشروط الدقيقة تُؤكَّد عند الحجز.",
        },
        {
          q: "هل الأسعار بالدرهم؟",
          a: "نعم. جميع المبالغ المعروضة على الموقع بالدرهم المغربي.",
        },
        {
          q: "هل يمكن الدفع عند الاستلام؟",
          a: "نعم. المسار العمومي يدعم الدفع عند الاستلام. قد يُضاف الدفع عبر الإنترنت لاحقاً.",
        },
        {
          q: "كيف أعدّل أو ألغي؟",
          a: "استخدم صفحة «إدارة حجزي» أو تواصل مع الفريق. قواعد الإلغاء تظهر في تأكيدك.",
        },
        {
          q: "هل الصور تطابق السيارات تماماً؟",
          a: "بعض الصور توضيحية حالياً. ستُستبدل تدريجياً بصور الأسطول الرسمية.",
        },
      ],
    },
    footer: {
      useful: "روابط مفيدة",
      info: "معلومات",
      follow: "تابعنا",
      rights: "جميع الحقوق محفوظة.",
      based: "مقرنا بفاس · المغرب · درهم",
      blurb: "تأجير سيارات فاخرة في المغرب. الوكالة مقرها",
      appSoon: "حمّل تطبيقنا — قريباً",
    },
    assistant: {
      title: "مساعدة لوكسن كارز",
      subtitle: "نحن بفاس — كيف يمكننا مساعدتك؟",
      placeholder: "اكتب سؤالك…",
      welcome: "مرحبًا! أنا مساعد لوكسن كارز. اطرح سؤالاً أو اختر اقتراحًا.",
      s1: "كيف أحجز؟",
      s2: "ما هي الأسعار؟",
      s3: "أين أنتم؟",
      s4: "واتساب",
      a1: "اذهب إلى الحجز، اختر المدينة والتواريخ والسيارة ثم أكّد. الدفع عند الاستلام ممكن.",
      a2: "الأسعار بالدرهم لليوم على كل سيارة. يُذكر الضمان التقديري في العرض.",
      a3: "وكالتنا بفاس، المغرب. الاستلام في الوسط أو مطار فاس سايس أو عنوان مخصص.",
      a4: "افتح واتساب عبر الزر أدناه — الرقم 06 61 18 62 24.",
    },
    site: {
      city: "فاس",
      address: "فاس، المغرب",
      tagline: "تأجير السيارات",
      wa: "مرحباً لوكسن كارز (فاس)، أرغب في معلومات حول التأجير.",
    },
    common: { close: "إغلاق" },
  },
};

export function translateLabel(t: Dictionary, value: string): string {
  return t.labels[value] || value;
}

export function translateLocation(t: Dictionary, value: string): string {
  return t.locations[value] || value;
}

export function translatePayment(
  t: Dictionary,
  code: "TPA" | "CASH" | "CHEQUE" | "VIREMENT",
  bank?: string | null,
): string {
  const base = t.payments[code];
  if (code === "VIREMENT" && bank) {
    const bankLabel = bank === "Autre banque" ? t.payments.otherBank : bank;
    return `${base} · ${bankLabel}`;
  }
  return base;
}

export function translateOption(t: Dictionary, id: string, field: "label" | "desc"): string {
  const key = field === "label" ? id : `${id}_desc`;
  return t.options[key] || id;
}
