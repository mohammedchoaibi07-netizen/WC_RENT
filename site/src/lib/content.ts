import type { Province } from "./api";

export const COMPANY = {
  phone: "+32 470 12 34 56",
  email: "info@wcrentbelgium.be",
};

/**
 * Unité du prix vedette du hero — hebdomadaire ou mensuelle : TODO A
 * CONFIRMER côté client (cf. design/ATTENTE-CLIENT.md). Isolée ici pour
 * rester un seul point de bascule, pas une chaîne répétée dans le JSX.
 */
export const HERO_PRICE_UNIT = "mois";

/** Les trois bénéfices sous le prix vedette du hero. */
export const heroPriceBenefits = [
  { icon: "truck", label: "Livraison sous 24h" },
  { icon: "shield-check", label: "Tout compris, sans surprise" },
  { icon: "map-pin", label: "Partout en Belgique" },
];

/** Bande de réassurance sous les CTA du hero. */
export const heroAssurances = [
  { icon: "credit-card", label: "Paiement sécurisé par carte" },
  { icon: "file-text", label: "Facture à 30 jours possible" },
  { icon: "calendar-days", label: "Annulation flexible jusqu'à 48h avant" },
];

/**
 * Bloc confiance de l'accueil — remplace la preuve sociale absente par des
 * signaux vérifiables (cf. design/BRIEF.md, "Contrainte dominante"). Adresse
 * et horaires : TODO A CONFIRMER côté client, même statut que
 * CABIN_PRICE_PER_WEEK plus bas dans ce fichier.
 */
export const trustPoints = [
  { icon: "file-text", label: "Numéro de TVA", detail: "BE 0000.000.000" },
  { icon: "shield-check", label: "Assurance RC professionnelle", detail: "Couverte pour tous nos chantiers" },
  { icon: "phone", label: COMPANY.phone, detail: "Lun-Ven, 8h-18h" },
];

export const stats = [
  { icon: "users", value: "+500", label: "projets réalisés" },
  { icon: "star", value: "4,9/5", label: "clients satisfaits" },
  { icon: "leaf", value: "100%", label: "engagement vert", tone: "eco" as const },
];

/** Bande defilante d'infos clef, juste sous le hero. */
export const tickerItems: Array<{ icon: string; label: string }> = [
  { icon: "truck", label: "Livraison sous 24h" },
  { icon: "leaf", label: "100% engagement vert" },
  { icon: "shield-check", label: "Partout en Belgique" },
  { icon: "clock", label: "Devis gratuit sous 24h" },
];

export const assurances = [
  { icon: "clock", label: "Rapide" },
  { icon: "file-text", label: "Gratuit" },
  { icon: "shield-check", label: "Sans engagement" },
];

export const needs = [
  { icon: "hard-hat", label: "Chantiers", caption: "Location longue durée" },
  { icon: "calendar-days", label: "Événements", caption: "Festivals, marchés" },
  { icon: "heart", label: "Mariages", caption: "Réceptions privées" },
  { icon: "medal", label: "Sport", caption: "Courses et tournois" },
  { icon: "factory", label: "Industrie", caption: "Sites temporaires" },
  { icon: "landmark", label: "Public", caption: "Communes et écoles" },
];

export const reasons = [
  { title: "Livré nettoyé", body: "Chaque unité part désinfectée, réapprovisionnée et contrôlée." },
  { title: "Entretien tenu", body: "Fréquence de passage fixée au contrat et respectée, sans relance de votre part." },
  { title: "Débouchage inclus", body: "Intervention sur bouchon ou panne dans les délais convenus." },
  { title: "Un seul interlocuteur", body: "Devis, livraison, entretien et enlèvement gérés par la même équipe." },
];

export const maintenance = [
  { title: "Nettoyage programmé", body: "Hebdomadaire, bimensuel ou sur mesure selon la fréquentation du site." },
  { title: "Vidange", body: "Pompage et traitement des effluents en filière agréée." },
  { title: "Débouchage", body: "Intervention curative sur canalisation, pompe ou fosse." },
  { title: "Contrôle technique", body: "Vérification ventilation, verrous et éclairage à chaque passage." },
];

export const testimonials = [
  { quote: "Service impeccable, livraison rapide et matériel très propre.", author: "Thomas L.", meta: "organisateur d'événements", rating: 5 },
  { quote: "Entretien fait chaque semaine sans qu'on ait à le demander. Sur un chantier de huit mois, ça compte.", author: "Julien V.", meta: "conducteur de travaux", rating: 5 },
];

export const processSteps = [
  { title: "Votre demande", caption: "Formulaire ou appel", icon: "file-text" },
  { title: "Devis sous 24h", caption: "Matériel et fréquence", icon: "clock" },
  { title: "Livraison", caption: "Placement sur site", icon: "truck" },
  { title: "Entretien", caption: "Puis enlèvement", icon: "shield-check" },
];

export const products = [
  {
    title: "Toilette mobile autonome",
    description: "Cabine à fosse, sans raccordement à l'eau ni à l'électricité. Livrée nettoyée et réapprovisionnée, pour un jour comme pour plusieurs mois.",
    image: "/images/hero.png",
    cta: "Réserver",
    href: "/reserver",
  },
  {
    title: "Nettoyage et entretien",
    description: "Passage programmé selon la fréquence convenue : vidange, désinfection et réapprovisionnement en papier et savon.",
    image: "/images/service.png",
    cta: "Demander un devis",
    href: "/contact",
  },
  {
    title: "Débouchage et vidange",
    description: "Intervention sur bouchon, pompe ou fosse pleine, y compris sur des installations que vous n'avez pas louées chez nous.",
    imageLabel: "Photo : camion de vidange en intervention",
    cta: "Demander un devis",
    href: "/contact",
  },
];

export const projects = [
  { title: "Chantier de 120 logements", body: "6 cabines et 2 lave-mains, entretien hebdomadaire pendant 14 mois.", place: "Liège", imageLabel: "Photo : cabines sur chantier de logements" },
  { title: "Festival deux jours", body: "40 unités, urinoirs collectifs et équipe sur place en continu.", place: "Namur", imageLabel: "Photo : sanitaires en festival" },
  { title: "Mariage 150 couverts", body: "Remorque sanitaire haut de gamme, installation la veille.", place: "Brabant wallon", imageLabel: "Photo : remorque sanitaire événement" },
  { title: "Rénovation d'école", body: "4 cabines dont une PMR, planning aligné sur les congés scolaires.", place: "Gand", imageLabel: "Photo : cabines devant une école" },
];

/**
 * Noms affichés par province — présentation/i18n uniquement (le NL viendra
 * ici plus tard). Le délai de livraison, lui, ne vit plus qu'au backend
 * (`GET /api/zones`) : voir ZoneGrid.tsx et ZonePostalLookup.tsx.
 */
export const PROVINCE_LABELS: Record<Province, string> = {
  ANVERS: "Anvers",
  BRABANT_FLAMAND: "Brabant flamand",
  BRABANT_WALLON: "Brabant wallon",
  BRUXELLES: "Bruxelles-Capitale",
  FLANDRE_OCCIDENTALE: "Flandre-Occidentale",
  FLANDRE_ORIENTALE: "Flandre-Orientale",
  HAINAUT: "Hainaut",
  LIEGE: "Liège",
  LIMBOURG: "Limbourg",
  LUXEMBOURG: "Luxembourg",
  NAMUR: "Namur",
};

/** Article correct pour « province {du|de la|de} X » en français. */
export const PROVINCE_ARTICLE: Record<Province, string> = {
  ANVERS: "d'",
  BRABANT_FLAMAND: "du ",
  BRABANT_WALLON: "du ",
  BRUXELLES: "de ",
  FLANDRE_OCCIDENTALE: "de ",
  FLANDRE_ORIENTALE: "de ",
  HAINAUT: "du ",
  LIEGE: "de ",
  LIMBOURG: "de ",
  LUXEMBOURG: "de ",
  NAMUR: "de ",
};

export const faq = [
  { q: "Quel est le délai de livraison ?", a: "Sous 24h dans la plupart des provinces pour toute commande confirmée avant 14h, 48h pour les zones les plus éloignées." },
  { q: "À quelle fréquence les cabines sont-elles nettoyées ?", a: "La fréquence est fixée au devis selon la fréquentation : d'un passage hebdomadaire sur chantier à plusieurs passages par jour en festival." },
  { q: "Intervenez-vous sur des toilettes que nous n'avons pas louées chez vous ?", a: "Oui. Nous assurons le nettoyage, la vidange et le débouchage d'installations existantes, y compris fixes." },
  { q: "Faut-il un raccordement à l'eau ou à l'électricité ?", a: "Non. Nos cabines sont entièrement autonomes : fosse et réservoir intégrés, aucun branchement nécessaire." },
  { q: "Quelle est la durée minimale de location ?", a: "Une journée pour les événements, une semaine pour les chantiers. Les longues durées bénéficient d'un tarif dégressif." },
  { q: "Que devient le contenu des fosses ?", a: "Les effluents sont pompés et traités en filière agréée, avec traçabilité disponible sur demande." },
];

export const menuItems: Array<{ label: string; href: string }> = [
  { label: "Accueil", href: "/" },
  { label: "Réserver en ligne", href: "/reserver" },
  { label: "Nos solutions", href: "/solutions" },
  { label: "Réalisations", href: "/realisations" },
  { label: "À propos", href: "/a-propos" },
  { label: "Zone d'intervention", href: "/zone-intervention" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

/** Tarifs affiches sur le catalogue de reservation (hors TVA). TODO A CONFIRMER cote client. */
export const CABIN_PRICE_PER_WEEK = 35;
export const DELIVERY_PRICE = 75;
export const VISIT_PRICE = 25;
export const COMPANY_DISCOUNT_PCT = 0.1;
export const VAT_PCT = 0.21;
