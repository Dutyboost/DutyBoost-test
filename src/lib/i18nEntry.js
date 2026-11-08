// Copy for the front page that splits the traveller (B2C) side from the
// business (B2B) side of the platform.

const strings = {
  en: {
    title: "Are you a traveller or a company in the travel industry?",
    traveller_title: "I'm a traveller",
    traveller_desc: "Claim your credit and save at airport, cruise ship terminal, train station and motorway retailers.",
    traveller_cta: "Claim my credit",
    company_title: "I'm a company in the travel industry",
    company_desc: "Turn traveller journeys into measurable revenue.",
    company_cta: "Enter the business platform",
    back: "Back to start",
  },
  nl: {
    title: "Ben je reiziger of een bedrijf in de reisbranche?",
    traveller_title: "Ik ben reiziger",
    traveller_desc: "Claim je tegoed en bespaar bij winkels op luchthavens, cruiseterminals, treinstations en langs de snelweg.",
    traveller_cta: "Mijn tegoed claimen",
    company_title: "Ik ben een bedrijf in de reisbranche",
    company_desc: "Maak van reizigersreizen meetbare omzet.",
    company_cta: "Naar het zakelijke platform",
    back: "Terug naar start",
  },
  fr: {
    title: "Êtes-vous un voyageur ou une entreprise du voyage ?",
    traveller_title: "Je suis un voyageur",
    traveller_desc: "Réclamez votre crédit et économisez dans les commerces des aéroports, terminaux de croisière, gares et aires d'autoroute.",
    traveller_cta: "Réclamer mon crédit",
    company_title: "Je suis une entreprise du voyage",
    company_desc: "Transformez les trajets de vos voyageurs en revenus mesurables.",
    company_cta: "Accéder à la plateforme entreprise",
    back: "Retour au début",
  },
  de: {
    title: "Sind Sie Reisender oder ein Unternehmen der Reisebranche?",
    traveller_title: "Ich bin Reisender",
    traveller_desc: "Fordern Sie Ihr Guthaben an und sparen Sie bei Händlern an Flughäfen, Kreuzfahrtterminals, Bahnhöfen und Autobahnraststätten.",
    traveller_cta: "Guthaben anfordern",
    company_title: "Ich bin ein Unternehmen der Reisebranche",
    company_desc: "Machen Sie aus Reisewegen messbaren Umsatz.",
    company_cta: "Zur Business-Plattform",
    back: "Zurück zum Start",
  },
  es: {
    title: "¿Eres pasajero o una empresa del sector turístico?",
    traveller_title: "Soy pasajero",
    traveller_desc: "Reclama tu crédito y ahorra en comercios de aeropuertos, terminales de cruceros, estaciones de tren y áreas de autopista.",
    traveller_cta: "Reclamar mi crédito",
    company_title: "Soy una empresa del sector turístico",
    company_desc: "Conviertan los trayectos de sus pasajeros en ingresos medibles.",
    company_cta: "Entrar en la plataforma empresarial",
    back: "Volver al inicio",
  },
  it: {
    title: "Sei un viaggiatore o un'azienda del settore viaggi?",
    traveller_title: "Sono un viaggiatore",
    traveller_desc: "Richiedi il tuo credito e risparmia nei negozi di aeroporti, terminal crociere, stazioni ferroviarie e aree autostradali.",
    traveller_cta: "Richiedi il mio credito",
    company_title: "Sono un'azienda del settore viaggi",
    company_desc: "Trasformate i viaggi dei vostri clienti in ricavi misurabili.",
    company_cta: "Accedi alla piattaforma business",
    back: "Torna all'inizio",
  },
  pt: {
    title: "É viajante ou uma empresa do setor de viagens?",
    traveller_title: "Sou viajante",
    traveller_desc: "Reclame o seu crédito e poupe em lojas de aeroportos, terminais de cruzeiros, estações de comboio e áreas de autoestrada.",
    traveller_cta: "Reclamar o meu crédito",
    company_title: "Sou uma empresa do setor de viagens",
    company_desc: "Transformem as viagens dos vossos clientes em receita mensurável.",
    company_cta: "Entrar na plataforma empresarial",
    back: "Voltar ao início",
  },
};

export function getEntryStrings(language) {
  const base = String(language || "en").split("-")[0].toLowerCase();
  return strings[base] || strings.en;
}