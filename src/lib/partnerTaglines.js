// Tagline shown under the partner's name on a traveller's DutyCredit pass.
// Names the vertical, so the traveller knows what kind of partner brought the credit.
const T = {
  en: {
    flight: "Your Flight Travel Partner",
    cruise: "Your Cruise Travel Partner",
    train: "Your Train Travel Partner",
    coach: "Your Coach Travel Partner",
    car_rental: "Your Car Rental Travel Partner",
    accommodation: "Your Accommodation Travel Partner",
  },
  nl: {
    flight: "Uw reispartner voor vluchten",
    cruise: "Uw reispartner voor cruises",
    train: "Uw reispartner voor treinreizen",
    coach: "Uw reispartner voor busreizen",
    car_rental: "Uw reispartner voor autohuur",
    accommodation: "Uw reispartner voor verblijf",
  },
  fr: {
    flight: "Votre partenaire de voyage en avion",
    cruise: "Votre partenaire de voyage en croisière",
    train: "Votre partenaire de voyage en train",
    coach: "Votre partenaire de voyage en autocar",
    car_rental: "Votre partenaire de voyage en location de voiture",
    accommodation: "Votre partenaire de voyage en hébergement",
  },
  de: {
    flight: "Ihr Reisepartner für Flüge",
    cruise: "Ihr Reisepartner für Kreuzfahrten",
    train: "Ihr Reisepartner für Bahnreisen",
    coach: "Ihr Reisepartner für Busreisen",
    car_rental: "Ihr Reisepartner für Mietwagen",
    accommodation: "Ihr Reisepartner für Unterkünfte",
  },
  es: {
    flight: "Tu socio de viaje en avión",
    cruise: "Tu socio de viaje en crucero",
    train: "Tu socio de viaje en tren",
    coach: "Tu socio de viaje en autobús",
    car_rental: "Tu socio de viaje en alquiler de coche",
    accommodation: "Tu socio de viaje en alojamiento",
  },
  it: {
    flight: "Il tuo partner di viaggio in aereo",
    cruise: "Il tuo partner di viaggio in crociera",
    train: "Il tuo partner di viaggio in treno",
    coach: "Il tuo partner di viaggio in autobus",
    car_rental: "Il tuo partner di viaggio nel noleggio auto",
    accommodation: "Il tuo partner di viaggio per il soggiorno",
  },
  pt: {
    flight: "O seu parceiro de viagem de avião",
    cruise: "O seu parceiro de viagem de cruzeiro",
    train: "O seu parceiro de viagem de comboio",
    coach: "O seu parceiro de viagem de autocarro",
    car_rental: "O seu parceiro de viagem de aluguer de automóveis",
    accommodation: "O seu parceiro de viagem de alojamento",
  },
};

export function getPartnerTagline(language, travelType) {
  const code = (language || "en").slice(0, 2).toLowerCase();
  const taglines = T[code] || T.en;
  return taglines[travelType] || T.en[travelType] || T.en.flight;
}