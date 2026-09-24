// Stakeholder-specific "Request More Information" copy (6 languages).
// Generic field labels, job titles and the country list are reused from the
// shared i18next `corporaterequest.*` keys so only the stakeholder-specific
// text lives here. Volume options are pure numeric ranges (language-neutral).

import { Store, Plane, BedDouble, Car } from "lucide-react";

const VOLUME_STORES = ["1 – 5", "6 – 20", "21 – 50", "51 – 150", "150+"];
const VOLUME_BOOKINGS = ["0 – 10k", "10k – 50k", "50k – 250k", "250k – 1M", "1M+"];

export const STAKEHOLDER_CONFIG = {
  retailer: {
    Icon: Store,
    gradient: "linear-gradient(to bottom, #fb923c, #ea580c)",
    calculatorTo: "/roi-calculator",
    backTo: "/retailer-showcase",
    badgeClass: "bg-orange-500/10 text-orange-700",
    buttonClass: "bg-orange-600 hover:bg-orange-700",
    iconCircleClass: "bg-orange-500/10",
    iconClass: "text-orange-600",
    emailSubject: "Airport Retailer enquiry",
    positionSuffix: "Airport Retailer",
    industry: "Retail",
    volumes: VOLUME_STORES,
  },
  travelPartner: {
    Icon: Plane,
    gradient: "linear-gradient(to bottom, #22c55e, #16a34a)",
    calculatorTo: "/roi-calculator-travel-partner",
    backTo: "/flight-showcase",
    badgeClass: "bg-green-500/10 text-green-700",
    buttonClass: "bg-green-600 hover:bg-green-700",
    iconCircleClass: "bg-green-500/10",
    iconClass: "text-green-600",
    emailSubject: "Travel Partner enquiry",
    positionSuffix: "Travel Partner",
    industry: "Agency",
    volumes: VOLUME_BOOKINGS,
  },
  accommodation: {
    Icon: BedDouble,
    gradient: "linear-gradient(to bottom, #3b82f6, #2563eb)",
    calculatorTo: "/roi-calculator-travel-partner",
    backTo: "/accommodation-showcase",
    badgeClass: "bg-blue-500/10 text-blue-700",
    buttonClass: "bg-blue-600 hover:bg-blue-700",
    iconCircleClass: "bg-blue-500/10",
    iconClass: "text-blue-600",
    emailSubject: "Accommodation Partner enquiry",
    positionSuffix: "Accommodation Partner",
    industry: "Agency",
    volumes: VOLUME_STORES,
  },
  carRental: {
    Icon: Car,
    gradient: "linear-gradient(to bottom, #ef4444, #dc2626)",
    calculatorTo: "/roi-calculator-travel-partner",
    backTo: "/car-rental-showcase",
    badgeClass: "bg-red-500/10 text-red-700",
    buttonClass: "bg-red-600 hover:bg-red-700",
    iconCircleClass: "bg-red-500/10",
    iconClass: "text-red-600",
    emailSubject: "Car Rental & Transfer Partner enquiry",
    positionSuffix: "Car Rental & Transfer Partner",
    industry: "Agency",
    volumes: VOLUME_STORES,
  },
};

export const stakeholderRequestStrings = {
  retailer: {
    en: {
      badge: "Airport Retailer",
      subtitle: "Tell us about your stores and airports, and we'll prepare a tailored DutyBoost estimate — no commitment, no cost.",
      label_volume: "Number of stores",
      placeholder_volume: "Select store count",
      success_desc: "We've received your request and will be in touch shortly with a tailored estimate for your stores.",
    },
    nl: {
      badge: "Luchthavenretailer",
      subtitle: "Vertel ons over je winkels en luchthavens, en we maken een op maat gemaakte DutyBoost-schatting — zonder verplichting, zonder kosten.",
      label_volume: "Aantal winkels",
      placeholder_volume: "Selecteer aantal winkels",
      success_desc: "We hebben je aanvraag ontvangen en nemen binnenkort contact op met een op maat gemaakte schatting voor je winkels.",
    },
    es: {
      badge: "Minorista aeroportuario",
      subtitle: "Cuéntanos sobre tus tiendas y aeropuertos, y prepararemos una estimación de DutyBoost a medida — sin compromiso, sin coste.",
      label_volume: "Número de tiendas",
      placeholder_volume: "Selecciona el número de tiendas",
      success_desc: "Hemos recibido tu solicitud y nos pondremos en contacto en breve con una estimación a medida para tus tiendas.",
    },
    de: {
      badge: "Flughafeneinzelhändler",
      subtitle: "Erzählen Sie uns von Ihren Filialen und Flughäfen, und wir erstellen eine maßgeschneiderte DutyBoost-Schätzung — ohne Verpflichtung, ohne Kosten.",
      label_volume: "Anzahl der Filialen",
      placeholder_volume: "Filialanzahl auswählen",
      success_desc: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze mit einer maßgeschneiderten Schätzung für Ihre Filialen.",
    },
    fr: {
      badge: "Détaillant aéroportuaire",
      subtitle: "Parlez-nous de vos boutiques et de vos aéroports, et nous préparerons une estimation DutyBoost sur mesure — sans engagement, sans coût.",
      label_volume: "Nombre de boutiques",
      placeholder_volume: "Sélectionnez le nombre de boutiques",
      success_desc: "Nous avons reçu votre demande et vous contacterons prochainement avec une estimation sur mesure pour vos boutiques.",
    },
    it: {
      badge: "Rivenditore aeroportuale",
      subtitle: "Raccontaci dei tuoi negozi e aeroporti, e prepareremo una stima DutyBoost su misura — nessun impegno, nessun costo.",
      label_volume: "Numero di negozi",
      placeholder_volume: "Seleziona il numero di negozi",
      success_desc: "Abbiamo ricevuto la tua richiesta e ti contatteremo a breve con una stima su misura per i tuoi negozi.",
    },
  },
  travelPartner: {
    en: {
      badge: "Travel Partner",
      subtitle: "Tell us about your booking volume, and we'll prepare a tailored DutyBoost estimate — no commitment, no cost.",
      label_volume: "Annual bookings",
      placeholder_volume: "Select booking volume",
      success_desc: "We've received your request and will be in touch shortly with a tailored estimate for your booking flow.",
    },
    nl: {
      badge: "Reispartner",
      subtitle: "Vertel ons over je boekingsvolume, en we maken een op maat gemaakte DutyBoost-schatting — zonder verplichting, zonder kosten.",
      label_volume: "Jaarlijkse boekingen",
      placeholder_volume: "Selecteer boekingsvolume",
      success_desc: "We hebben je aanvraag ontvangen en nemen binnenkort contact op met een op maat gemaakte schatting voor je boekingsproces.",
    },
    es: {
      badge: "Socio de viajes",
      subtitle: "Cuéntanos tu volumen de reservas y prepararemos una estimación de DutyBoost a medida — sin compromiso, sin coste.",
      label_volume: "Reservas anuales",
      placeholder_volume: "Selecciona el volumen de reservas",
      success_desc: "Hemos recibido tu solicitud y nos pondremos en contacto en breve con una estimación a medida para tu flujo de reservas.",
    },
    de: {
      badge: "Reisepartner",
      subtitle: "Erzählen Sie uns von Ihrem Buchungsvolumen, und wir erstellen eine maßgeschneiderte DutyBoost-Schätzung — ohne Verpflichtung, ohne Kosten.",
      label_volume: "Jährliche Buchungen",
      placeholder_volume: "Buchungsvolumen auswählen",
      success_desc: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze mit einer maßgeschneiderten Schätzung für Ihren Buchungsprozess.",
    },
    fr: {
      badge: "Partenaire de voyage",
      subtitle: "Parlez-nous de votre volume de réservations et nous préparerons une estimation DutyBoost sur mesure — sans engagement, sans coût.",
      label_volume: "Réservations annuelles",
      placeholder_volume: "Sélectionnez le volume de réservations",
      success_desc: "Nous avons reçu votre demande et vous contacterons prochainement avec une estimation sur mesure pour votre parcours de réservation.",
    },
    it: {
      badge: "Partner di viaggio",
      subtitle: "Raccontaci il tuo volume di prenotazioni e prepareremo una stima DutyBoost su misura — nessun impegno, nessun costo.",
      label_volume: "Prenotazioni annuali",
      placeholder_volume: "Seleziona il volume di prenotazioni",
      success_desc: "Abbiamo ricevuto la tua richiesta e ti contatteremo a breve con una stima su misura per il tuo flusso di prenotazioni.",
    },
  },
  accommodation: {
    en: {
      badge: "Accommodation Partner",
      subtitle: "Tell us about your properties, and we'll prepare a tailored DutyBoost estimate — no commitment, no cost.",
      label_volume: "Properties",
      placeholder_volume: "Select number of properties",
      success_desc: "We've received your request and will be in touch shortly with a tailored estimate for your properties.",
    },
    nl: {
      badge: "Accommodatiepartner",
      subtitle: "Vertel ons over je accommodaties, en we maken een op maat gemaakte DutyBoost-schatting — zonder verplichting, zonder kosten.",
      label_volume: "Accommodaties",
      placeholder_volume: "Selecteer aantal accommodaties",
      success_desc: "We hebben je aanvraag ontvangen en nemen binnenkort contact op met een op maat gemaakte schatting voor je accommodaties.",
    },
    es: {
      badge: "Socio de alojamiento",
      subtitle: "Cuéntanos sobre tus alojamientos y prepararemos una estimación de DutyBoost a medida — sin compromiso, sin coste.",
      label_volume: "Alojamientos",
      placeholder_volume: "Selecciona el número de alojamientos",
      success_desc: "Hemos recibido tu solicitud y nos pondremos en contacto en breve con una estimación a medida para tus alojamientos.",
    },
    de: {
      badge: "Unterkunftspartner",
      subtitle: "Erzählen Sie uns von Ihren Unterkünften, und wir erstellen eine maßgeschneiderte DutyBoost-Schätzung — ohne Verpflichtung, ohne Kosten.",
      label_volume: "Unterkünfte",
      placeholder_volume: "Anzahl der Unterkünfte auswählen",
      success_desc: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze mit einer maßgeschneiderten Schätzung für Ihre Unterkünfte.",
    },
    fr: {
      badge: "Partenaire hébergement",
      subtitle: "Parlez-nous de vos établissements et nous préparerons une estimation DutyBoost sur mesure — sans engagement, sans coût.",
      label_volume: "Établissements",
      placeholder_volume: "Sélectionnez le nombre d'établissements",
      success_desc: "Nous avons reçu votre demande et vous contacterons prochainement avec une estimation sur mesure pour vos établissements.",
    },
    it: {
      badge: "Partner ricettivo",
      subtitle: "Raccontaci delle tue strutture e prepareremo una stima DutyBoost su misura — nessun impegno, nessun costo.",
      label_volume: "Strutture",
      placeholder_volume: "Seleziona il numero di strutture",
      success_desc: "Abbiamo ricevuto la tua richiesta e ti contatteremo a breve con una stima su misura per le tue strutture.",
    },
  },
  carRental: {
    en: {
      badge: "Car Rental & Transfer Partner",
      subtitle: "Tell us about your locations and fleet, and we'll prepare a tailored DutyBoost estimate — no commitment, no cost.",
      label_volume: "Rental locations",
      placeholder_volume: "Select number of locations",
      success_desc: "We've received your request and will be in touch shortly with a tailored estimate for your locations.",
    },
    nl: {
      badge: "Autoverhuur- & transferpartner",
      subtitle: "Vertel ons over je vestigingen en vloot, en we maken een op maat gemaakte DutyBoost-schatting — zonder verplichting, zonder kosten.",
      label_volume: "Verhuurlocaties",
      placeholder_volume: "Selecteer aantal locaties",
      success_desc: "We hebben je aanvraag ontvangen en nemen binnenkort contact op met een op maat gemaakte schatting voor je locaties.",
    },
    es: {
      badge: "Socio de alquiler de coches y traslados",
      subtitle: "Cuéntanos sobre tus ubicaciones y flota, y prepararemos una estimación de DutyBoost a medida — sin compromiso, sin coste.",
      label_volume: "Ubicaciones de alquiler",
      placeholder_volume: "Selecciona el número de ubicaciones",
      success_desc: "Hemos recibido tu solicitud y nos pondremos en contacto en breve con una estimación a medida para tus ubicaciones.",
    },
    de: {
      badge: "Mietwagen- & Transferpartner",
      subtitle: "Erzählen Sie uns von Ihren Standorten und Ihrer Flotte, und wir erstellen eine maßgeschneiderte DutyBoost-Schätzung — ohne Verpflichtung, ohne Kosten.",
      label_volume: "Mietstandorte",
      placeholder_volume: "Anzahl der Standorte auswählen",
      success_desc: "Wir haben Ihre Anfrage erhalten und melden uns in Kürze mit einer maßgeschneiderten Schätzung für Ihre Standorte.",
    },
    fr: {
      badge: "Partenaire location de voitures & transferts",
      subtitle: "Parlez-nous de vos agences et de votre flotte, et nous préparerons une estimation DutyBoost sur mesure — sans engagement, sans coût.",
      label_volume: "Agences de location",
      placeholder_volume: "Sélectionnez le nombre d'agences",
      success_desc: "Nous avons reçu votre demande et vous contacterons prochainement avec une estimation sur mesure pour vos agences.",
    },
    it: {
      badge: "Partner autonoleggio & transfer",
      subtitle: "Raccontaci delle tue sedi e della tua flotta, e prepareremo una stima DutyBoost su misura — nessun impegno, nessun costo.",
      label_volume: "Sedi di noleggio",
      placeholder_volume: "Seleziona il numero di sedi",
      success_desc: "Abbiamo ricevuto la tua richiesta e ti contatteremo a breve con una stima su misura per le tue sedi.",
    },
  },
};

export function getStakeholderRequestStrings(stakeholder, lang) {
  const code = (lang || "en").split("-")[0];
  const set = stakeholderRequestStrings[stakeholder];
  return set?.[code] || set?.en;
}