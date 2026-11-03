// Copy for the front page that splits the traveller (B2C) side from the
// business (B2B) side of the platform.

const strings = {
  en: {
    title: "Are you a traveller or a travel related business?",
    traveller_title: "I'm a traveller",
    traveller_desc: "Claim the travel credit included with your booking and save at airport, port, station and local retailers.",
    traveller_cta: "Claim my credit",
    company_title: "I'm a travel related business",
    company_desc: "Travel partners, travel retail partners and travel hub partners: turn traveller journeys into measurable revenue.",
    company_cta: "Enter the business platform",
    back: "Back to start",
  },
  nl: {
    title: "Ben je reiziger of een travelgerelateerd bedrijf?",
    traveller_title: "Ik ben reiziger",
    traveller_desc: "Claim het reistegoed bij je boeking en bespaar bij winkels op luchthavens, havens, stations en in de stad.",
    traveller_cta: "Mijn tegoed claimen",
    company_title: "Ik ben een travelgerelateerd bedrijf",
    company_desc: "Travelpartners, travel retailpartners en luchthavenpartners: maak van reizigersreizen meetbare omzet.",
    company_cta: "Naar het zakelijke platform",
    back: "Terug naar start",
  },
  fr: {
    title: "Êtes-vous un voyageur ou une entreprise du voyage ?",
    traveller_title: "Je suis un voyageur",
    traveller_desc: "Réclamez le crédit voyage inclus dans votre réservation et économisez dans les commerces des aéroports, ports, gares et en ville.",
    traveller_cta: "Réclamer mon crédit",
    company_title: "Je suis une entreprise du voyage",
    company_desc: "Partenaires de voyage, partenaires de vente en zone de transit et partenaires aéroportuaires : transformez les trajets de vos voyageurs en revenus mesurables.",
    company_cta: "Accéder à la plateforme entreprise",
    back: "Retour au début",
  },
  de: {
    title: "Sind Sie Reisender oder ein reisebezogenes Unternehmen?",
    traveller_title: "Ich bin Reisender",
    traveller_desc: "Fordern Sie das Reiseguthaben aus Ihrer Buchung an und sparen Sie bei Händlern an Flughäfen, Häfen, Bahnhöfen und in der Innenstadt.",
    traveller_cta: "Guthaben anfordern",
    company_title: "Ich bin ein reisebezogenes Unternehmen",
    company_desc: "Reisepartner, Travel-Retail-Partner und Flughafenpartner: Machen Sie aus Reisewegen messbaren Umsatz.",
    company_cta: "Zur Business-Plattform",
    back: "Zurück zum Start",
  },
  es: {
    title: "¿Eres viajero o una empresa del sector turístico?",
    traveller_title: "Soy viajero",
    traveller_desc: "Reclama el crédito de viaje incluido en tu reserva y ahorra en comercios de aeropuertos, puertos, estaciones y ciudad.",
    traveller_cta: "Reclamar mi crédito",
    company_title: "Soy una empresa del sector turístico",
    company_desc: "Socios de viaje, socios de venta en aeropuertos y socios de hubs de viaje: conviertan los trayectos de sus viajeros en ingresos medibles.",
    company_cta: "Entrar en la plataforma empresarial",
    back: "Volver al inicio",
  },
  it: {
    title: "Sei un viaggiatore o un'azienda del settore viaggi?",
    traveller_title: "Sono un viaggiatore",
    traveller_desc: "Richiedi il credito di viaggio incluso nella tua prenotazione e risparmia nei negozi di aeroporti, porti, stazioni e città.",
    traveller_cta: "Richiedi il mio credito",
    company_title: "Sono un'azienda del settore viaggi",
    company_desc: "Partner di viaggio, partner di vendita in aeroporto e partner dei hub di viaggio: trasformate i viaggi dei vostri clienti in ricavi misurabili.",
    company_cta: "Accedi alla piattaforma business",
    back: "Torna all'inizio",
  },
  pt: {
    title: "É viajante ou uma empresa do setor de viagens?",
    traveller_title: "Sou viajante",
    traveller_desc: "Reclame o crédito de viagem incluído na sua reserva e poupe em lojas de aeroportos, portos, estações e na cidade.",
    traveller_cta: "Reclamar o meu crédito",
    company_title: "Sou uma empresa do setor de viagens",
    company_desc: "Parceiros de viagem, parceiros de retalho em aeroportos e parceiros de hubs de viagem: transformem as viagens dos vossos clientes em receita mensurável.",
    company_cta: "Entrar na plataforma empresarial",
    back: "Voltar ao início",
  },
};

export function getEntryStrings(language) {
  const base = String(language || "en").split("-")[0].toLowerCase();
  return strings[base] || strings.en;
}