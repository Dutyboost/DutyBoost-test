// Shared survey utilities — translation maps, normalization, classification.
// Used by both the SurveyDashboard analytics and the Benchmark Reports PDF generator.

export const RETAILER_PREFIX = "Airport Retailer – ";

// ── Translation maps (all non-English → English) ──────────────────────────────
export const TRANSLATIONS = {
  // Company types – Travel Partner
  "Reisagentschap": "Travel Agency",
  "Zakenreismanagement": "Business Travel Management",
  "Online reisplatform (OTA)": "Online Travel Platform (OTA)",
  "Touroperator": "Tour Operator",
  "Andere": "Other",
  "Reisbureau": "Travel Agency",
  "Reisebüro": "Travel Agency",
  "Geschäftsreisemanagement": "Business Travel Management",
  "Online-Reiseplattform (OTA)": "Online Travel Platform (OTA)",
  "Reiseveranstalter": "Tour Operator",
  "Sonstiges": "Other",
  "Agence de voyage": "Travel Agency",
  "Gestion de voyages d'affaires": "Business Travel Management",
  "Plateforme de voyage en ligne (OTA)": "Online Travel Platform (OTA)",
  "Tour-opérateur": "Tour Operator",
  "Autre": "Other",
  "Agencia de viajes": "Travel Agency",
  "Gestión de viajes corporativos": "Business Travel Management",
  "Plataforma de viajes en línea (OTA)": "Online Travel Platform (OTA)",
  "Operador turístico": "Tour Operator",
  "Otro": "Other",
  "Agenzia di viaggi": "Travel Agency",
  "Gestione viaggi d'affari": "Business Travel Management",
  "Piattaforma di viaggi online (OTA)": "Online Travel Platform (OTA)",
  "Tour operator": "Tour Operator",
  "Altro": "Other",

  // Store types – Retailer
  "Parfums & cosmetica": "Perfumes & cosmetics",
  "Elektronica & gadgets": "Electronics & gadgets",
  "Chocolade, zoetwaren & kaas": "Chocolate, confectionery & cheese",
  "Geschenken & souvenirs": "Gifts & souvenirs",
  "Dranken & wijnen": "Liquors & wines",
  "Horloges & sieraden": "Watches & jewellery",
  "Luxe": "Luxury",
  "Mode & accessoires": "Fashion & accessories",
  "Reisartikelen": "Travel items",
  "Boeken & tijdschriften": "Books & magazines",
  "Kinderen & speelgoed": "Children & toys",
  "Apotheek": "Pharmacy",
  "Eten & drinken": "Food and drink",
  "Parfüm & Kosmetik": "Perfumes & cosmetics",
  "Elektronik & Gadgets": "Electronics & gadgets",
  "Schokolade, Süßwaren & Käse": "Chocolate, confectionery & cheese",
  "Geschenke & Souvenirs": "Gifts & souvenirs",
  "Spirituosen & Weine": "Liquors & wines",
  "Uhren & Schmuck": "Watches & jewellery",
  "Mode & Accessoires": "Fashion & accessories",
  "Reiseartikel": "Travel items",
  "Bücher & Zeitschriften": "Books & magazines",
  "Kinder & Spielzeug": "Children & toys",
  "Apotheke": "Pharmacy",
  "Essen & Trinken": "Food and drink",
  "Perfumes & cosméticos": "Perfumes & cosmetics",
  "Electrónica & gadgets": "Electronics & gadgets",
  "Chocolate, confitería & quesos": "Chocolate, confectionery & cheese",
  "Regalos & souvenirs": "Gifts & souvenirs",
  "Licores & vinos": "Liquors & wines",
  "Relojes & joyería": "Watches & jewellery",
  "Lujo": "Luxury",
  "Moda & accesorios": "Fashion & accessories",
  "Artículos de viaje": "Travel items",
  "Libros & revistas": "Books & magazines",
  "Niños & juguetes": "Children & toys",
  "Farmacia": "Pharmacy",
  "Comida & bebida": "Food and drink",
  "Parfums & cosmétiques": "Perfumes & cosmetics",
  "Électronique & gadgets": "Electronics & gadgets",
  "Chocolat, confiserie & fromage": "Chocolate, confectionery & cheese",
  "Cadeaux & souvenirs": "Gifts & souvenirs",
  "Spiritueux & vins": "Liquors & wines",
  "Montres & bijoux": "Watches & jewellery",
  "Articles de voyage": "Travel items",
  "Livres & magazines": "Books & magazines",
  "Enfants & jouets": "Children & toys",
  "Alimentation & boissons": "Food and drink",
  "Profumi & cosmetici": "Perfumes & cosmetics",
  "Elettronica & gadget": "Electronics & gadgets",
  "Cioccolato, dolciumi & formaggi": "Chocolate, confectionery & cheese",
  "Regali & souvenir": "Gifts & souvenirs",
  "Liquori & vini": "Liquors & wines",
  "Orologi & gioielli": "Watches & jewellery",
  "Moda & accessori": "Fashion & accessories",
  "Articoli da viaggio": "Travel items",
  "Libri & riviste": "Books & magazines",
  "Bambini & giocattoli": "Children & toys",
  "Farmacia": "Pharmacy",
  "Cibo & bevande": "Food and drink",

  // Monthly visitors / Booking volumes
  "Minder dan 1.000": "Under 1,000",
  "1.000 – 5.000": "1,000 – 5,000",
  "5.000 – 20.000": "5,000 – 20,000",
  "Unter 1.000": "Under 1,000",
  "Menos de 1.000": "Under 1,000",
  "Moins de 1 000": "Under 1,000",
  "1 000 – 5 000": "1,000 – 5,000",
  "5 000 – 20 000": "5,000 – 20,000",
  "20 000+": "20,000+",
  "Meno di 1.000": "Under 1,000",
  // Booking volumes (travel partner)
  "Minder dan 5.000 boekingen/jaar": "Under 5,000 bookings/year",
  "5.000 – 20.000 boekingen/jaar": "5,000 – 20,000 bookings/year",
  "20.000 – 100.000 boekingen/jaar": "20,000 – 100,000 bookings/year",
  "100.000+ boekingen/jaar": "100,000+ bookings/year",
  "Unter 5.000 Buchungen/Jahr": "Under 5,000 bookings/year",
  "5.000 – 20.000 Buchungen/Jahr": "5,000 – 20,000 bookings/year",
  "20.000 – 100.000 Buchungen/Jahr": "20,000 – 100,000 bookings/year",
  "100.000+ Buchungen/Jahr": "100,000+ bookings/year",
  "Moins de 5 000 réservations/an": "Under 5,000 bookings/year",
  "5 000 – 20 000 réservations/an": "5,000 – 20,000 bookings/year",
  "20 000 – 100 000 réservations/an": "20,000 – 100,000 bookings/year",
  "100 000+ réservations/an": "100,000+ bookings/year",
  "Menos de 5.000 reservas/año": "Under 5,000 bookings/year",
  "5.000 – 20.000 reservas/año": "5,000 – 20,000 bookings/year",
  "20.000 – 100.000 reservas/año": "20,000 – 100,000 bookings/year",
  "100.000+ reservas/año": "100,000+ bookings/year",
  "Meno di 5.000 prenotazioni/anno": "Under 5,000 bookings/year",
  "5.000 – 20.000 prenotazioni/anno": "5,000 – 20,000 bookings/year",
  "20.000 – 100.000 prenotazioni/anno": "20,000 – 100,000 bookings/year",
  "100.000+ prenotazioni/anno": "100,000+ bookings/year",

  // Interest levels – Retailer
  "Zeer geïnteresseerd – ik doe mee": "Very interested – count me in",
  "Geïnteresseerd – ik wil eerst meer weten": "Interested – I want to learn more first",
  "Nieuwsgierig – nog aan het evalueren": "Curious – still evaluating",
  "Nog niet zeker": "Not sure yet",
  "Sehr interessiert – ich bin dabei": "Very interested – count me in",
  "Interessiert – ich möchte zuerst mehr erfahren": "Interested – I want to learn more first",
  "Neugierig – noch am Evaluieren": "Curious – still evaluating",
  "Noch nicht sicher": "Not sure yet",
  "Muy interesado – cuenten conmigo": "Very interested – count me in",
  "Interesado – quiero saber más primero": "Interested – I want to learn more first",
  "Curioso – todavía evaluando": "Curious – still evaluating",
  "No estoy seguro aún": "Not sure yet",
  "Très intéressé – je suis partant": "Very interested – count me in",
  "Intéressé – je veux d'abord en savoir plus": "Interested – I want to learn more first",
  "Curieux – j'évalue encore": "Curious – still evaluating",
  "Pas encore sûr": "Not sure yet",
  "Molto interessato – ci sono": "Very interested – count me in",
  "Interessato – voglio prima saperne di più": "Interested – I want to learn more first",
  "Curioso – sto ancora valutando": "Curious – still evaluating",
  "Non ancora sicuro": "Not sure yet",

  // Interest levels – Travel Partner
  "Zeer geïnteresseerd – doe me mee": "Very interested – count me in",
  "Geïnteresseerd – ik wil meer weten": "Interested – I want to learn more first",
  "Nieuwsgierig – nog aan het afwegen": "Curious – still evaluating",
  "Noch nicht überzeugt": "Not sure yet",
  "Sehr interessiert – ich bin dabei": "Very interested – count me in",
  "Très intéressé – je participe": "Very interested – count me in",
  "Intéressé – je veux en savoir plus d'abord": "Interested – I want to learn more first",
  "Curieux – j'évalue encore la situation": "Curious – still evaluating",
  "Pas encore convaincu": "Not sure yet",
  "Muy interesado – cuenten conmigo": "Very interested – count me in",
  "Interesado – quiero saber más antes": "Interested – I want to learn more first",
  "Curioso – todavía evaluando": "Curious – still evaluating",
  "No estoy seguro todavía": "Not sure yet",
  "Molto interessato – sono dentro": "Very interested – count me in",
  "Interessato – voglio prima saperne di più": "Interested – I want to learn more first",
  "Curioso – sto ancora valutando": "Curious – still evaluating",
  "Non ancora sicuro": "Not sure yet",

  // Commission / voucher attractiveness
  "Ja, zeer aantrekkelijk – meer bezoekers is altijd welkom": "Yes, very attractive – more foot traffic is always welcome",
  "Enigszins aantrekkelijk – afhankelijk van de voorwaarden": "Somewhat attractive – depends on the terms",
  "Meer details nodig voordat ik beslis": "Need more details before deciding",
  "Momenteel geen prioriteit": "Not a priority right now",
  "Ja, sehr attraktiv – mehr Laufkundschaft ist immer willkommen": "Yes, very attractive – more foot traffic is always welcome",
  "Etwas attraktiv – abhängig von den Konditionen": "Somewhat attractive – depends on the terms",
  "Mehr Details erforderlich": "Need more details before deciding",
  "Derzeit keine Priorität": "Not a priority right now",
  "Sí, muy atractivo – más tráfico siempre es bienvenido": "Yes, very attractive – more foot traffic is always welcome",
  "Algo atractivo – depende de las condiciones": "Somewhat attractive – depends on the terms",
  "Necesito más detalles antes de decidir": "Need more details before deciding",
  "No es una prioridad ahora mismo": "Not a priority right now",
  "Oui, très attractif – plus de trafic est toujours bienvenu": "Yes, very attractive – more foot traffic is always welcome",
  "Assez attractif – selon les conditions": "Somewhat attractive – depends on the terms",
  "J'ai besoin de plus de détails avant de décider": "Need more details before deciding",
  "Pas une priorité pour l'instant": "Not a priority right now",
  "Sì, molto attraente – più traffico è sempre benvenuto": "Yes, very attractive – more foot traffic is always welcome",
  "Abbastanza attraente – dipende dalle condizioni": "Somewhat attractive – depends on the terms",
  "Ho bisogno di maggiori dettagli prima di decidere": "Need more details before deciding",
  "Non è una priorità al momento": "Not a priority right now",
  // Travel partner commission variants
  "Ja, zeer aantrekkelijk": "Yes, very attractive",
  "Interessant – hangt af van de volumecommissie": "Interesting – depends on volume commission",
  "Meer informatie nodig": "Need more information",
  "Niet relevant voor ons model": "Not relevant for our model",

  // Snippet willingness / QR integration
  "Ja – eenvoudige integraties zijn geen probleem voor ons": "Yes – easy integrations are no problem for us",
  "Mogelijk – afhankelijk van wat technisch nodig is": "Possibly – depends on what's needed technically",
  "Onwaarschijnlijk – onze setup maakt dit moeilijk": "Unlikely – our setup makes this difficult",
  "Nee – wij beheren onze eigen techniek niet": "No – we don't manage our own tech",
  "Ja – einfache Integrationen sind kein Problem für uns": "Yes – easy integrations are no problem for us",
  "Möglicherweise – abhängig vom technischen Aufwand": "Possibly – depends on what's needed technically",
  "Unwahrscheinlich – unser Setup macht das schwierig": "Unlikely – our setup makes this difficult",
  "Nein – wir verwalten unsere Technik nicht selbst": "No – we don't manage our own tech",
  "Sí – las integraciones sencillas no son problema para nosotros": "Yes – easy integrations are no problem for us",
  "Posiblemente – depende de lo que se necesite técnicamente": "Possibly – depends on what's needed technically",
  "Poco probable – nuestra configuración lo dificulta": "Unlikely – our setup makes this difficult",
  "No – no gestionamos nuestra propia tecnología": "No – we don't manage our own tech",
  "Oui – les intégrations simples ne sont pas un problème": "Yes – easy integrations are no problem for us",
  "Peut-être – selon les besoins techniques": "Possibly – depends on what's needed technically",
  "Peu probable – notre configuration rend cela difficile": "Unlikely – our setup makes this difficult",
  "Non – nous ne gérons pas notre propre technologie": "No – we don't manage our own tech",
  "Sì – le integrazioni semplici non sono un problema": "Yes – easy integrations are no problem for us",
  "Forse – dipende da cosa è necessario tecnicamente": "Possibly – depends on what's needed technically",
  "Improbabile – la nostra configurazione lo rende difficile": "Unlikely – our setup makes this difficult",
  "No – non gestiamo la nostra tecnologia": "No – we don't manage our own tech",
  // Travel partner snippet variants
  "Ja – we can integrate a snippet on our booking platform": "Yes – we can integrate a snippet",
  "Ja – we können ein Snippet auf unserer Buchungsplattform integrieren": "Yes – we can integrate a snippet",
  "Ja – wij kunnen een snippet integreren op ons boekingsplatform": "Yes – we can integrate a snippet",
  "Oui – nous pouvons intégrer un snippet sur notre plateforme": "Yes – we can integrate a snippet",
  "Sí – podemos integrar un snippet en nuestra plataforma": "Yes – we can integrate a snippet",
  "Sì – possiamo integrare uno snippet sulla nostra piattaforma": "Yes – we can integrate a snippet",

  // Loyalty programs
  "Geen": "None",
  "Loyaliteitskaart / stempel": "Loyalty card / stamp",
  "App-gebaseerde kortingen": "App-based discounts",
  "Luchthavenbrede promoties": "Airport-wide promotions",
  "Anders": "Other",
  "Keine": "None",
  "Kundenkarte / Stempel": "Loyalty card / stamp",
  "App-basierte Rabatte": "App-based discounts",
  "Flughafenweite Aktionen": "Airport-wide promotions",
  "Ninguna": "None",
  "Tarjeta de fidelidad / sello": "Loyalty card / stamp",
  "Descuentos en app": "App-based discounts",
  "Promociones del aeropuerto": "Airport-wide promotions",
  "Aucune": "None",
  "Carte de fidélité / tampon": "Loyalty card / stamp",
  "Réductions via application": "App-based discounts",
  "Promotions aéroport": "Airport-wide promotions",
  "Nessuna": "None",
  "Carta fedeltà / timbro": "Loyalty card / stamp",
  "Sconti tramite app": "App-based discounts",
  "Promozioni aeroportuali": "Airport-wide promotions",
};

// ── Researched real-world booking volumes per company ─────────────────────────
export const RESEARCHED_VOLUMES = {
  "vueling":         { perYear: 38_000_000, perMonth: 3_167_000, source: "IAG Annual Report 2024 / Vueling Annual Accounts 2025", confidence: "high" },
  "edreams":         { perYear: 20_000_000, perMonth: 1_667_000, source: "eDreams ODIGEO Annual Report FY24 (est. based on 5.8M Prime members × avg booking rate)", confidence: "medium" },
  "corendon":        { perYear: 3_000_000,  perMonth: 250_000,   source: "Tourism Analytics / Corendon Airlines press coverage", confidence: "high" },
  "bookit":          { perYear: 180_000,    perMonth: 15_000,    source: "RocketReach / Slovenia.info trade catalogue (88 employees, $12M revenue est.)", confidence: "medium" },
  "acsi":            { perYear: 75_000,     perMonth: 6_250,     source: "ACSI Handelskrant 2025 / Suncamp.co.uk — 330 campsites, EU camping specialist", confidence: "medium" },
  "exploreo":        { perYear: 12_000,     perMonth: 1_000,     source: "Exploreo.com About page — early-stage sustainable travel platform", confidence: "low" },
  "tucoach":         { perYear: 7_500,      perMonth: 625,       source: "tucoachflanders.com — small regional coach operator Belgium", confidence: "low" },
  "europarcs":       { perYear: 500_000,    perMonth: 41_667,    source: "EuroParcs Group — 60+ holiday parks, ~500K annual bookings est. (press / industry data 2024)", confidence: "medium" },
};

export function getResearchedVolume(companyName) {
  if (!companyName) return null;
  const lower = companyName.toLowerCase();
  for (const [key, val] of Object.entries(RESEARCHED_VOLUMES)) {
    if (lower.includes(key)) return val;
  }
  return null;
}

// ── Booking volume parser ──────────────────────────────────────────────────────
export function parseBookingVolume(raw) {
  if (!raw) return null;
  const str = raw.trim();

  const rangeMatch = str.match(/^([\d\s,.]+)\s*[–\-]\s*([\d\s,.]+)\s*\+?$/);
  if (rangeMatch) {
    const lo = parseInt(rangeMatch[1].replace(/[\s,.]/g, ''), 10);
    const hi = parseInt(rangeMatch[2].replace(/[\s,.]/g, ''), 10);
    if (!isNaN(lo) && !isNaN(hi)) {
      return {
        perMonth: `${lo.toLocaleString("nl-NL")}–${hi.toLocaleString("nl-NL")}`,
        perYear: `${(lo * 12).toLocaleString("nl-NL")}–${(hi * 12).toLocaleString("nl-NL")}`,
      };
    }
  }

  const plusMatch = str.match(/^([\d\s,.]+)\s*\+/);
  if (plusMatch) {
    const n = parseInt(plusMatch[1].replace(/[\s,.]/g, ''), 10);
    if (!isNaN(n)) {
      return {
        perMonth: `${n.toLocaleString("nl-NL")}+`,
        perYear: `${(n * 12).toLocaleString("nl-NL")}+`,
      };
    }
  }

  const underMatch = str.match(/(?:under|minder\s+dan|moins\s+de|meno\s+di|menos\s+de|unter)\s*([\d\s,.]+)/i);
  if (underMatch) {
    const n = parseInt(underMatch[1].replace(/[\s,.]/g, ''), 10);
    if (!isNaN(n)) {
      return {
        perMonth: `< ${n.toLocaleString("nl-NL")}`,
        perYear: `< ${(n * 12).toLocaleString("nl-NL")}`,
      };
    }
  }

  const plain = parseInt(str.replace(/[\s,.]/g, ''), 10);
  if (!isNaN(plain) && plain > 0) {
    return {
      perMonth: plain.toLocaleString("nl-NL"),
      perYear: (plain * 12).toLocaleString("nl-NL"),
    };
  }

  return null;
}

// ── Language detection ─────────────────────────────────────────────────────────
export const LANG_FLAGS = {
  nl: "🇳🇱", de: "🇩🇪", fr: "🇫🇷", es: "🇪🇸", it: "🇮🇹",
};

const NL_MARKERS = ["Geen", "Loyaliteitskaart", "Luchthaven", "Reisagentschap", "geïnteresseerd", "Zakelijk", "Boekingen"];
const DE_MARKERS = ["Keine", "Kundenkarte", "Flughafen", "Reisebüro", "interessiert", "Buchungen", "Geschäft"];
const FR_MARKERS = ["Aucune", "fidélité", "aéroport", "voyage", "intéressé", "réservations"];
const ES_MARKERS = ["Ninguna", "fidelidad", "aeropuerto", "viajes", "interesado", "reservas"];
const IT_MARKERS = ["Nessuna", "fedeltà", "aeroporto", "viaggi", "interessato", "prenotazioni"];

export function detectLanguage(r) {
  const text = [r.interest_level, r.commission_attractive, r.snippet_willingness, r.annual_bookings, r.current_loyalty, r.company_type].join(" ");
  if (NL_MARKERS.some(m => text.includes(m))) return "nl";
  if (DE_MARKERS.some(m => text.includes(m))) return "de";
  if (FR_MARKERS.some(m => text.includes(m))) return "fr";
  if (ES_MARKERS.some(m => text.includes(m))) return "es";
  if (IT_MARKERS.some(m => text.includes(m))) return "it";
  return "en";
}

export function t(val) {
  if (!val) return val;
  return TRANSLATIONS[val.trim()] ?? val;
}

export function tMulti(val) {
  if (!val) return val;
  return val.split(",").map(v => t(v.trim())).join(", ");
}

export function normalizeResponse(r) {
  const storeTypePart = r.company_type?.replace(RETAILER_PREFIX, "") || "";
  const normalizedStoreType = storeTypePart ? (RETAILER_PREFIX + (t(storeTypePart) || storeTypePart)) : t(r.company_type);
  return {
    ...r,
    company_type: r.company_type?.startsWith(RETAILER_PREFIX) ? normalizedStoreType : t(r.company_type),
    interest_level: t(r.interest_level),
    commission_attractive: t(r.commission_attractive),
    snippet_willingness: t(r.snippet_willingness),
    annual_bookings: t(r.annual_bookings),
    current_loyalty: tMulti(r.current_loyalty),
    _lang: detectLanguage(r),
  };
}

export function isRetailer(r) {
  return r.company_type?.startsWith(RETAILER_PREFIX);
}

export function isPosProvider(r) {
  return r.company_type?.startsWith("POS Provider – ");
}

export function isCorporatePartner(r) {
  return r.company_type?.startsWith("Corporate Partner – ");
}

export function stripRolePrefix(val, prefix) {
  return val ? String(val).replace(prefix, "") : val;
}

// Split a raw SurveyResponse list into the 4 normalized groups.
export function splitSurveyGroups(allResponses) {
  const retailer = allResponses.filter(r => isRetailer(r)).map(r => normalizeResponse(r));
  const partner = allResponses
    .filter(r => !isRetailer(r) && !isPosProvider(r) && !isCorporatePartner(r))
    .map(r => {
      const n = normalizeResponse(r);
      return { ...n, company_type: stripRolePrefix(n.company_type, "Travel Partner – ") };
    });
  const pos = allResponses
    .filter(r => isPosProvider(r))
    .map(r => {
      const n = normalizeResponse(r);
      return { ...n, company_type: stripRolePrefix(n.company_type, "POS Provider – ") };
    });
  const corporate = allResponses
    .filter(r => isCorporatePartner(r))
    .map(r => {
      const n = normalizeResponse(r);
      return { ...n, company_type: stripRolePrefix(n.company_type, "Corporate Partner – ") };
    });
  return { retailer, partner, pos, corporate };
}