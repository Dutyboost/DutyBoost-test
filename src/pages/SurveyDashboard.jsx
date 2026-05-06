import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Store, Users, BarChart2, ThumbsUp, Mail, Globe, CheckCircle2, Clock, Download, ChevronDown, FileText } from "lucide-react";
import * as XLSX from "xlsx";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const RETAILER_PREFIX = "Airport Retailer – ";
const CHART_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#a855f7", "#ef4444", "#06b6d4", "#ec4899", "#84cc16"];

// ── Translation maps (all non-English → English) ──────────────────────────────
const TRANSLATIONS = {
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
// Sources: annual reports, Wikipedia, press releases (verified May 2026)
const RESEARCHED_VOLUMES = {
  "vueling":         { perYear: 38_000_000, perMonth: 3_167_000, source: "IAG Annual Report 2024 / Vueling Annual Accounts 2025", confidence: "high" },
  "edreams":         { perYear: 20_000_000, perMonth: 1_667_000, source: "eDreams ODIGEO Annual Report FY24 (est. based on 5.8M Prime members × avg booking rate)", confidence: "medium" },
  "corendon":        { perYear: 3_000_000,  perMonth: 250_000,   source: "Tourism Analytics / Corendon Airlines press coverage", confidence: "high" },
  "bookit":          { perYear: 180_000,    perMonth: 15_000,    source: "RocketReach / Slovenia.info trade catalogue (88 employees, $12M revenue est.)", confidence: "medium" },
  "acsi":            { perYear: 75_000,     perMonth: 6_250,     source: "ACSI Handelskrant 2025 / Suncamp.co.uk — 330 campsites, EU camping specialist", confidence: "medium" },
  "exploreo":        { perYear: 12_000,     perMonth: 1_000,     source: "Exploreo.com About page — early-stage sustainable travel platform", confidence: "low" },
  "nf tu coach":     { perYear: 7_500,      perMonth: 625,       source: "tucoachflanders.com — small regional coach operator Belgium", confidence: "low" },
};

function getResearchedVolume(companyName) {
  if (!companyName) return null;
  const lower = companyName.toLowerCase();
  for (const [key, val] of Object.entries(RESEARCHED_VOLUMES)) {
    if (lower.includes(key)) return val;
  }
  return null;
}

// ── Booking volume parser ──────────────────────────────────────────────────────
// Parses annual_bookings field (which stores monthly volume) into { perMonth, perYear } display strings
function parseBookingVolume(raw) {
  if (!raw) return null;
  const str = raw.trim();

  // Range like "2,000 – 5,000" or "2.000 – 5.000" or "2 000 – 5 000"
  const rangeMatch = str.match(/^([\d\s,.]+)\s*[–\-]\s*([\d\s,.]+)\s*\+?$/);
  if (rangeMatch) {
    const lo = parseInt(rangeMatch[1].replace(/[\s,.]/g, ''), 10);
    const hi = parseInt(rangeMatch[2].replace(/[\s,.]/g, ''), 10);
    if (!isNaN(lo) && !isNaN(hi)) {
      return {
        perMonth: `${lo.toLocaleString()}–${hi.toLocaleString()}`,
        perYear: `${(lo * 12).toLocaleString()}–${(hi * 12).toLocaleString()}`,
      };
    }
  }

  // "30,000+" / "30.000+" / "30 000+"
  const plusMatch = str.match(/^([\d\s,.]+)\s*\+/);
  if (plusMatch) {
    const n = parseInt(plusMatch[1].replace(/[\s,.]/g, ''), 10);
    if (!isNaN(n)) {
      return {
        perMonth: `${n.toLocaleString()}+`,
        perYear: `${(n * 12).toLocaleString()}+`,
      };
    }
  }

  // "Under X" / "Minder dan X" / "Menos de X" etc.
  const underMatch = str.match(/(?:under|minder\s+dan|moins\s+de|meno\s+di|menos\s+de|unter)\s*([\d\s,.]+)/i);
  if (underMatch) {
    const n = parseInt(underMatch[1].replace(/[\s,.]/g, ''), 10);
    if (!isNaN(n)) {
      return {
        perMonth: `< ${n.toLocaleString()}`,
        perYear: `< ${(n * 12).toLocaleString()}`,
      };
    }
  }

  // Plain number (custom entry)
  const plain = parseInt(str.replace(/[\s,.]/g, ''), 10);
  if (!isNaN(plain) && plain > 0) {
    return {
      perMonth: plain.toLocaleString(),
      perYear: (plain * 12).toLocaleString(),
    };
  }

  return null;
}

// ── Language detection ─────────────────────────────────────────────────────────
const LANG_FLAGS = {
  nl: "🇳🇱", de: "🇩🇪", fr: "🇫🇷", es: "🇪🇸", it: "🇮🇹",
};

const NL_MARKERS = ["Geen", "Loyaliteitskaart", "Luchthaven", "Reisagentschap", "geïnteresseerd", "Zakelijk", "Boekingen"];
const DE_MARKERS = ["Keine", "Kundenkarte", "Flughafen", "Reisebüro", "interessiert", "Buchungen", "Geschäft"];
const FR_MARKERS = ["Aucune", "fidélité", "aéroport", "voyage", "intéressé", "réservations"];
const ES_MARKERS = ["Ninguna", "fidelidad", "aeropuerto", "viajes", "interesado", "reservas"];
const IT_MARKERS = ["Nessuna", "fedeltà", "aeroporto", "viaggi", "interessato", "prenotazioni"];

function detectLanguage(r) {
  const text = [r.interest_level, r.commission_attractive, r.snippet_willingness, r.annual_bookings, r.current_loyalty, r.company_type].join(" ");
  if (NL_MARKERS.some(m => text.includes(m))) return "nl";
  if (DE_MARKERS.some(m => text.includes(m))) return "de";
  if (FR_MARKERS.some(m => text.includes(m))) return "fr";
  if (ES_MARKERS.some(m => text.includes(m))) return "es";
  if (IT_MARKERS.some(m => text.includes(m))) return "it";
  return "en";
}

function t(val) {
  if (!val) return val;
  return TRANSLATIONS[val.trim()] ?? val;
}

// Translate a comma-separated multi-value field (e.g. current_loyalty)
function tMulti(val) {
  if (!val) return val;
  return val.split(",").map(v => t(v.trim())).join(", ");
}

// Normalize a response object so all displayed values are in English
function normalizeResponse(r) {
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

function isRetailer(r) {
  return r.company_type?.startsWith(RETAILER_PREFIX);
}

function StatCard({ icon: Icon, label, value, color = "text-white" }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
      <Icon className={`w-4 h-4 mx-auto mb-2 ${color}`} />
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-semibold text-white uppercase tracking-widest">{title}</h3>
      {children}
    </div>
  );
}

function PieChartSection({ data }) {
  if (!data.length) return <p className="text-slate-500 text-sm text-center py-4">No data</p>;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
          {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f8fafc" }} formatter={(v, n) => [v, n]} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarChartSection({ data, color = "#3b82f6" }) {
  if (!data.length) return <p className="text-slate-500 text-sm text-center py-4">No data</p>;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f8fafc" }} />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function Legend({ data }) {
  return (
    <div className="space-y-1.5 mt-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
          <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
          <span className="truncate flex-1">{d.name}</span>
          <span className="text-slate-400 shrink-0">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

function ResponseCard({ response, isRetailerView }) {
  const [expanded, setExpanded] = useState(false);
  const flag = response._lang && response._lang !== "en" ? LANG_FLAGS[response._lang] : null;
  const interestEn = response.interest_level || "";
  const interestColor = interestEn.toLowerCase().includes("very")
    ? "bg-green-500/20 text-green-300"
    : interestEn.toLowerCase().includes("interested")
    ? "bg-blue-500/20 text-blue-300"
    : "bg-slate-600/40 text-slate-300";

  const downloadResponse = (format) => {
    const filename = `${response.company_name || "response"}-${response.created_date ? new Date(response.created_date).toISOString().split('T')[0] : 'export'}`;
    if (format === "csv") {
      exportToCSV([response], `${filename}.csv`, isRetailerView);
    } else {
      exportToExcel([response], `${filename}.xlsx`, isRetailerView);
    }
  };

  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-4 space-y-3">
      <div className="w-full flex items-center justify-between">
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-1 flex items-center justify-start gap-2 hover:opacity-80 transition-opacity"
        >
          <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform shrink-0 ${expanded ? "rotate-180" : ""}`} />
          <div className="flex-1 text-left min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              {flag && <span className="text-base">{flag}</span>}
              <span className="text-white font-semibold truncate">{response.full_name || response.company_name || "Anonymous"}</span>
              <span className={`px-2 py-0.5 rounded-full text-xs whitespace-nowrap ${interestColor}`}>
                {interestEn?.split("–")[0]?.trim() || "—"}
              </span>
              {response.wants_demo && <CheckCircle2 className="w-3.5 h-3.5 text-green-400 shrink-0" />}
            </div>
            <div className="text-xs text-slate-400 truncate">
              {response.company_name} · {isRetailerView ? response.company_type?.replace(RETAILER_PREFIX, "") : response.company_type}
              {response.created_date && ` · ${new Date(response.created_date).toLocaleDateString()}`}
            </div>
          </div>
        </button>
        <div className="flex gap-1 shrink-0 ml-2">
          <button
            onClick={() => downloadResponse("csv")}
            className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-slate-200"
            title="Download as CSV"
          >
            <FileText className="w-4 h-4" />
          </button>
          <button
            onClick={() => downloadResponse("xlsx")}
            className="p-1.5 hover:bg-slate-700 rounded transition-colors text-slate-400 hover:text-slate-200"
            title="Download as Excel"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {expanded && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-3 border-t border-slate-700">
          {response.full_name && (
            <>
              <div className="text-xs">
                <p className="text-slate-500">Full Name</p>
                <p className="text-slate-200">{response.full_name}</p>
              </div>
              <div className="text-xs">
                <p className="text-slate-500">Email</p>
                <p className="text-slate-200">{response.email || "—"}</p>
              </div>
            </>
          )}
          <div className="text-xs">
            <p className="text-slate-500">Company</p>
            <p className="text-slate-200">{response.company_name}</p>
          </div>
          <div className="text-xs">
            <p className="text-slate-500">Website</p>
            <p className="text-slate-200 truncate">{response.company_website || "—"}</p>
          </div>
          <div className="text-xs">
            <p className="text-slate-500">Type</p>
            <p className="text-slate-200">{isRetailerView ? response.company_type?.replace(RETAILER_PREFIX, "") : response.company_type}</p>
          </div>
          <div className="text-xs">
            <p className="text-slate-500">Monthly Visitors / Booking Volume</p>
            <p className="text-slate-200">{response.annual_bookings || "—"}</p>
          </div>
          {(() => {
            const vol = parseBookingVolume(response.annual_bookings);
            const researched = getResearchedVolume(response.company_name);
            const confidenceColor = { high: "text-green-400", medium: "text-yellow-400", low: "text-orange-400" };
            const confidenceBg = { high: "bg-green-900/30 border-green-500/30", medium: "bg-yellow-900/30 border-yellow-500/30", low: "bg-orange-900/30 border-orange-500/30" };
            return (
              <>
                {vol && (
                  <div className="text-xs md:col-span-2">
                    <p className="text-slate-500 mb-1.5">Self-Reported Booking Volume (survey)</p>
                    <div className="flex gap-3">
                      <div className="flex-1 bg-blue-900/30 border border-blue-500/30 rounded-lg px-3 py-2 text-center">
                        <p className="text-blue-400 font-bold text-base">{vol.perMonth}</p>
                        <p className="text-slate-400 text-xs mt-0.5">per month</p>
                      </div>
                      <div className="flex-1 bg-purple-900/30 border border-purple-500/30 rounded-lg px-3 py-2 text-center">
                        <p className="text-purple-300 font-bold text-base">{vol.perYear}</p>
                        <p className="text-slate-400 text-xs mt-0.5">per year</p>
                      </div>
                    </div>
                  </div>
                )}
                {researched && (
                  <div className="text-xs md:col-span-2">
                    <p className="text-slate-500 mb-1.5 flex items-center gap-1.5">
                      🔍 Verified Booking Volume <span className={`text-xs font-semibold ${confidenceColor[researched.confidence]}`}>({researched.confidence} confidence)</span>
                    </p>
                    <div className="flex gap-3 mb-2">
                      <div className={`flex-1 border rounded-lg px-3 py-2 text-center ${confidenceBg[researched.confidence]}`}>
                        <p className={`font-bold text-base ${confidenceColor[researched.confidence]}`}>{researched.perMonth.toLocaleString()}</p>
                        <p className="text-slate-400 text-xs mt-0.5">per month</p>
                      </div>
                      <div className={`flex-1 border rounded-lg px-3 py-2 text-center ${confidenceBg[researched.confidence]}`}>
                        <p className={`font-bold text-base ${confidenceColor[researched.confidence]}`}>{researched.perYear.toLocaleString()}</p>
                        <p className="text-slate-400 text-xs mt-0.5">per year</p>
                      </div>
                    </div>
                    <p className="text-slate-600 italic text-xs">Source: {researched.source}</p>
                  </div>
                )}
              </>
            );
          })()}
          <div className="text-xs md:col-span-2">
            <p className="text-slate-500">Loyalty Programs</p>
            <p className="text-slate-200">{response.current_loyalty || "—"}</p>
          </div>
          <div className="text-xs md:col-span-2">
            <p className="text-slate-500">Interest Level</p>
            <p className="text-slate-200">{response.interest_level || "—"}</p>
          </div>
          <div className="text-xs md:col-span-2">
            <p className="text-slate-500">Commission / Voucher Attractiveness</p>
            <p className="text-slate-200">{response.commission_attractive || "—"}</p>
          </div>
          <div className="text-xs md:col-span-2">
            <p className="text-slate-500">Integration Willingness</p>
            <p className="text-slate-200">{response.snippet_willingness || "—"}</p>
          </div>
          {response.biggest_challenge && (
            <div className="text-xs md:col-span-2">
              <p className="text-slate-500">Biggest Challenge</p>
              <p className="text-slate-200">{response.biggest_challenge}</p>
            </div>
          )}
          {response.phone && (
            <div className="text-xs">
              <p className="text-slate-500">Phone</p>
              <p className="text-slate-200">{response.phone}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function ResponseTable({ responses, isRetailerView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
            <th className="pb-2 pr-4">Name</th>
            <th className="pb-2 pr-4">Company</th>
            <th className="pb-2 pr-4">{isRetailerView ? "Store type" : "Type"}</th>
            <th className="pb-2 pr-4">Interest</th>
            <th className="pb-2 pr-4">Demo?</th>
            <th className="pb-2">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {responses.map((r) => {
            const flag = r._lang && r._lang !== "en" ? LANG_FLAGS[r._lang] : null;
            const interestEn = r.interest_level || "";
            const interestColor = interestEn.toLowerCase().includes("very")
              ? "bg-green-500/20 text-green-300"
              : interestEn.toLowerCase().includes("interested")
              ? "bg-blue-500/20 text-blue-300"
              : "bg-slate-600/40 text-slate-300";
            return (
              <tr key={r.id} className="hover:bg-slate-700/30 transition-colors">
                <td className="py-2.5 pr-4 text-white font-medium">
                  <span className="flex items-center gap-1.5">
                    {flag && <span title={`Submitted in ${r._lang.toUpperCase()}`} className="text-base leading-none">{flag}</span>}
                    {r.full_name || "—"}
                  </span>
                </td>
                <td className="py-2.5 pr-4 text-slate-300 text-xs">{r.company_name || "—"}</td>
                <td className="py-2.5 pr-4 text-slate-300 text-xs max-w-[160px] truncate">
                  {isRetailerView ? r.company_type?.replace(RETAILER_PREFIX, "") : r.company_type}
                </td>
                <td className="py-2.5 pr-4 text-xs">
                  <span className={`px-2 py-0.5 rounded-full ${interestColor}`}>
                    {interestEn?.split("–")[0]?.trim() || "—"}
                  </span>
                </td>
                <td className="py-2.5 pr-4">
                  {r.wants_demo
                    ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                    : <span className="text-slate-600">—</span>}
                </td>
                <td className="py-2.5 text-xs text-slate-400">
                  {r.created_date ? new Date(r.created_date).toLocaleDateString() : "—"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function tally(arr, key) {
  const map = {};
  arr.forEach(r => {
    const val = (r[key] || "Unknown").split("–")[0].trim();
    map[val] = (map[val] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

// ── Retailer Dashboard ─────────────────────────────────────────────────────────
function RetailerDashboard({ responses }) {
  const wantsDemo = responses.filter(r => r.wants_demo).length;
  const storeTypes = tally(responses, "company_type").map(d => ({ ...d, name: d.name.replace(RETAILER_PREFIX, "") }));
  const interest = tally(responses, "interest_level");
  const voucher = tally(responses, "commission_attractive");
  const integration = tally(responses, "snippet_willingness");
  const visitors = tally(responses, "annual_bookings");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Store} label="Total responses" value={responses.length} color="text-orange-300" />
        <StatCard icon={ThumbsUp} label="Wants follow-up" value={wantsDemo} color="text-green-300" />
        <StatCard icon={Mail} label="Follow-up rate" value={responses.length ? `${Math.round((wantsDemo / responses.length) * 100)}%` : "—"} color="text-blue-300" />
        <StatCard icon={Globe} label="Store categories" value={new Set(responses.map(r => r.company_type?.replace(RETAILER_PREFIX, ""))).size} color="text-purple-300" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard title="Store type">
          <PieChartSection data={storeTypes.slice(0, 8)} />
          <Legend data={storeTypes.slice(0, 8)} />
        </ChartCard>
        <ChartCard title="Monthly visitors">
          <BarChartSection data={visitors} color="#f97316" />
        </ChartCard>
        <ChartCard title="Interest level">
          <BarChartSection data={interest} color="#10b981" />
        </ChartCard>
        <ChartCard title="Voucher model attractiveness">
          <BarChartSection data={voucher} color="#a855f7" />
        </ChartCard>
      </div>

      <ChartCard title="All responses">
        <div className="space-y-2 max-h-[800px] overflow-y-auto">
          {responses.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">No responses yet</p>
          ) : (
            responses.map(r => <ResponseCard key={r.id} response={r} isRetailerView={true} />)
          )}
        </div>
      </ChartCard>
    </div>
  );
}

// ── Revenue Calculator ─────────────────────────────────────────────────────────
// Maps booking volume buckets (from survey Q2) to monthly bookings (UPPER bound of range = potential reach)
// Handles EN/NL/ES/DE/FR/IT formats — thousand separators can be , or .
const VOLUME_TO_MONTHLY = [
  { match: /^under\s*2[,.]?000$/i,                label: "< 2,000/mo",     monthly: 2000 },
  { match: /500\s*[–\-]\s*2[,.]?000/i,            label: "500–2,000/mo",   monthly: 2000 },
  { match: /2[,.]?000\s*[–\-]\s*5[,.]?000/i,      label: "2,000–5,000/mo", monthly: 5000 },
  { match: /2[,.]?000\s*[–\-]\s*10[,.]?000/i,     label: "2,000–10,000/mo",monthly: 10000 },
  { match: /5[,.]?000\s*[–\-]\s*10[,.]?000/i,     label: "5,000–10,000/mo",monthly: 10000 },
  { match: /10[,.]?000\+|10[,.]?000\s*\+|10[,.]?000\s*[–\-]/i, label: "10,000+/mo", monthly: 10000 },
];

function matchVolumeBucket(val) {
  if (!val) return null;
  return VOLUME_TO_MONTHLY.find(b => b.match.test(val)) || null;
}

// Only treat as custom if it looks like a plain number (no range separator, no range keywords)
function parseCustomVolume(val) {
  if (!val) return null;
  // If it contains a dash/en-dash, it's a range bucket that didn't match — never parse it
  if (/[–\-]/.test(val)) return null;
  if (/bookings|year|visitors|under|meer|más|plus|oltre|über/i.test(val)) return null;
  const clean = val.replace(/[^0-9]/g, "");
  const num = parseInt(clean, 10);
  if (isNaN(num) || num === 0) return null;
  return num;
}

const REDEMPTION_RATE = 0.10;   // 10% redemption rate
const MIN_BASKET    = 70;        // €70 minimum basket
const MAX_BASKET    = 300;       // €300 maximum basket
const AVG_BASKET    = 185;       // €185 average basket (midpoint of €70–€300)
const FEE_RATE      = 0.025;     // 2.5% DutyBoost fee on avg basket
const FEE_CAP       = 25;        // €25 max DutyBoost fee per transaction
const AGENCY_SHARE  = 0.20;      // 20% of DutyBoost fee to agency

function calcRevenue(totalMonthlyBookings) {
  const totalRedemptions = Math.round(totalMonthlyBookings * REDEMPTION_RATE);
  const grossRevenue     = totalRedemptions * AVG_BASKET;
  const feePerRedemption = Math.min(AVG_BASKET * FEE_RATE, FEE_CAP);
  const dutyBoostFee     = totalRedemptions * feePerRedemption;
  const agencyCommission = dutyBoostFee * AGENCY_SHARE;
  const dutyBoostNet     = dutyBoostFee - agencyCommission;
  return { totalRedemptions, grossRevenue, feePerRedemption, dutyBoostFee, agencyCommission, dutyBoostNet };
}

function RevenuePanel({ label, totalMonthlyBookings, accentClass, borderClass, tag }) {
  const fmt = (n) => `€${Math.round(n).toLocaleString()}`;
  const { totalRedemptions, grossRevenue, dutyBoostFee, agencyCommission, dutyBoostNet } = calcRevenue(totalMonthlyBookings);

  return (
    <div className={`flex-1 rounded-xl border ${borderClass} p-4 space-y-3`}>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p className="text-xs font-semibold text-slate-300 uppercase tracking-widest">{label}</p>
        {tag && <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700 text-slate-400">{tag}</span>}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-slate-900/60 rounded-lg p-2 text-center">
          <p className="text-xs text-slate-500 mb-0.5">Monthly bookings</p>
          <p className={`text-lg font-bold ${accentClass}`}>{totalMonthlyBookings.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2 text-center">
          <p className="text-xs text-slate-500 mb-0.5">Monthly redemptions</p>
          <p className="text-lg font-bold text-green-300">{totalRedemptions.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2 text-center">
          <p className="text-xs text-slate-500 mb-0.5">Gross retail spend/mo</p>
          <p className="text-lg font-bold text-blue-300">{fmt(grossRevenue)}</p>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2 text-center">
          <p className="text-xs text-slate-500 mb-0.5">DutyBoost fee/mo</p>
          <p className="text-lg font-bold text-purple-300">{fmt(dutyBoostFee)}</p>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-green-900/30 border border-green-500/20 rounded-lg p-2 text-center">
          <p className="text-xs text-green-500 mb-0.5">Agency commission/mo</p>
          <p className="text-base font-bold text-green-300">{fmt(agencyCommission)}</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/20 rounded-lg p-2 text-center">
          <p className="text-xs text-blue-500 mb-0.5">DutyBoost net/mo</p>
          <p className="text-base font-bold text-blue-300">{fmt(dutyBoostNet)}</p>
        </div>
      </div>
      <div className="bg-yellow-900/20 border border-yellow-500/20 rounded-lg px-3 py-2 flex items-center justify-between text-xs">
        <span className="text-slate-400">Annual DutyBoost net</span>
        <span className="font-bold text-yellow-300">{fmt(dutyBoostNet * 12)}/yr</span>
      </div>
    </div>
  );
}

function RevenueCalculator({ responses }) {
  const fmt = (n) => `€${Math.round(n).toLocaleString()}`;

  // ── Self-reported volumes (from survey answers) ──
  const buckets = {};
  let selfMonthly = 0;
  responses.forEach(r => {
    const raw = r.annual_bookings || "";
    const mapped = matchVolumeBucket(raw);
    if (mapped) {
      buckets[mapped.label] = (buckets[mapped.label] || 0) + 1;
      selfMonthly += mapped.monthly;
    } else {
      const custom = parseCustomVolume(raw);
      if (custom) {
        const lbl = `Custom (${raw})`;
        buckets[lbl] = (buckets[lbl] || 0) + 1;
        selfMonthly += custom;
      }
    }
  });

  // ── Verified real-world volumes (from RESEARCHED_VOLUMES, only for matched respondents) ──
  let verifiedMonthly = 0;
  const verifiedBreakdown = [];
  responses.forEach(r => {
    const rv = getResearchedVolume(r.company_name);
    if (rv) {
      verifiedMonthly += rv.perMonth;
      verifiedBreakdown.push({ company: r.company_name, perMonth: rv.perMonth, confidence: rv.confidence });
    }
  });

  const selfRev = calcRevenue(selfMonthly);
  const verifiedRev = calcRevenue(verifiedMonthly);

  return (
    <div className="bg-slate-800 border border-green-500/30 rounded-2xl p-5 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5">
          Potential Revenue — Survey Respondents Combined
        </h3>
        <p className="text-xs text-slate-400">
          <span className="text-white">{(REDEMPTION_RATE * 100).toFixed(0)}% redemption rate</span> ·{" "}
          <span className="text-white">€{AVG_BASKET} avg basket</span> (range: €{MIN_BASKET}–€{MAX_BASKET}) ·{" "}
          <span className="text-white">2.5% fee on €{AVG_BASKET}</span> ·{" "}
          <span className="text-white">€{FEE_CAP} fee cap/tx</span>
        </p>
      </div>

      {/* Side-by-side comparison */}
      <div className="flex flex-col md:flex-row gap-4">
        <RevenuePanel
          label="Self-Reported (Survey)"
          totalMonthlyBookings={selfMonthly}
          accentClass="text-white"
          borderClass="border-slate-600"
          tag="From survey answers"
        />
        <div className="hidden md:flex items-center justify-center text-slate-600 text-2xl font-bold">vs</div>
        <div className="flex md:hidden items-center justify-center text-slate-600 text-sm font-bold py-1">── vs ──</div>
        <RevenuePanel
          label="Verified Real-World Data"
          totalMonthlyBookings={verifiedMonthly}
          accentClass="text-yellow-300"
          borderClass="border-yellow-500/40"
          tag={`${verifiedBreakdown.length} verified respondents`}
        />
      </div>

      {/* Verified breakdown per company */}
      {verifiedBreakdown.length > 0 && (
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Verified volume breakdown</p>
          <div className="space-y-1.5">
            {verifiedBreakdown.map(({ company, perMonth, confidence }) => {
              const { totalRedemptions, dutyBoostFee, dutyBoostNet } = calcRevenue(perMonth);
              const confColor = { high: "text-green-400", medium: "text-yellow-400", low: "text-orange-400" }[confidence];
              return (
                <div key={company} className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs bg-slate-900/40 rounded-lg px-3 py-2">
                  <span className="text-slate-200 font-medium w-28 truncate">{company}</span>
                  <span className={`font-semibold ${confColor}`}>{confidence}</span>
                  <span className="text-slate-400">{perMonth.toLocaleString()} bookings/mo</span>
                  <span className="text-green-300">{totalRedemptions.toLocaleString()} redemptions/mo</span>
                  <span className="text-purple-300 font-semibold ml-auto">{fmt(dutyBoostFee)} fee/mo → {fmt(dutyBoostNet)} net</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Self-reported per-bucket breakdown */}
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Self-reported breakdown by volume bucket</p>
        <div className="space-y-1.5">
          {VOLUME_TO_MONTHLY.map(({ label, monthly }) => {
            const count = buckets[label] || 0;
            if (!count) return null;
            const bRedem = Math.round(count * monthly * REDEMPTION_RATE);
            const bFee   = bRedem * Math.min(AVG_BASKET * FEE_RATE, FEE_CAP);
            return (
              <div key={label} className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs bg-slate-900/40 rounded-lg px-3 py-2">
                <span className="text-slate-300 font-medium">{label}</span>
                <span className="text-slate-500">{count} respondent{count !== 1 ? "s" : ""}</span>
                <span className="text-slate-400">{bRedem.toLocaleString()} redemptions/mo</span>
                <span className="text-purple-300 font-semibold ml-auto">{fmt(bFee)} fee/mo</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-600 italic">
        Assumptions: upper bound of each survey range used · {REDEMPTION_RATE * 100}% redemption rate · avg basket €{AVG_BASKET} · 2.5% fee = €{Math.min(AVG_BASKET * FEE_RATE, FEE_CAP).toFixed(2)}/redemption (capped €{FEE_CAP}) · 20% of fee to agency
      </p>
    </div>
  );
}

// ── Airport reference data (annual passenger totals, 2024, public sources) ──────
// Source: official airport annual reports / press releases 2024
const AIRPORT_DATA = [
  { name: "Dubai Int'l (DXB)",      iata: "DXB", paxPerYear: 92_300_000, source: "Dubai Airports press release Jan 2025" },
  { name: "Amsterdam Schiphol (AMS)", iata: "AMS", paxPerYear: 66_829_000, source: "Schiphol Annual Traffic Review 2024" },
  { name: "Barcelona El Prat (BCN)", iata: "BCN", paxPerYear: 55_000_000, source: "Barcelona Airport Annual Report 2024" },
  { name: "Frankfurt (FRA)",         iata: "FRA", paxPerYear: 61_600_000, source: "Fraport AG Annual Report 2024" },
  { name: "Paris CDG (CDG)",         iata: "CDG", paxPerYear: 67_400_000, source: "ADP Group Annual Report 2024" },
  { name: "Madrid Barajas (MAD)",    iata: "MAD", paxPerYear: 62_600_000, source: "AENA Annual Report 2024" },
  { name: "London Heathrow (LHR)",   iata: "LHR", paxPerYear: 83_900_000, source: "Heathrow Airport Annual Report 2024" },
  { name: "Rome Fiumicino (FCO)",    iata: "FCO", paxPerYear: 50_400_000, source: "Aeroporti di Roma Annual Report 2024" },
];

// ── Global Potentials Dashboard ───────────────────────────────────────────────
// Uses RESEARCHED_VOLUMES directly — dynamic: only shows companies that match a respondent
function GlobalPotentialsDashboard({ responses }) {
  const fmt = (n) => `€${Math.round(n).toLocaleString()}`;
  const feePerRedemption = Math.min(AVG_BASKET * FEE_RATE, FEE_CAP);

  // Build rows: one per matched respondent
  const rows = responses.map(r => {
    const rv = getResearchedVolume(r.company_name);
    if (!rv) return null;
    const rev = calcRevenue(rv.perMonth);
    return { ...r, rv, rev };
  }).filter(Boolean);

  // Totals
  const totalMonthly   = rows.reduce((s, r) => s + r.rv.perMonth, 0);
  const totalRedemp    = rows.reduce((s, r) => s + r.rev.totalRedemptions, 0);
  const totalGross     = rows.reduce((s, r) => s + r.rev.grossRevenue, 0);
  const totalFee       = rows.reduce((s, r) => s + r.rev.dutyBoostFee, 0);
  const totalAgency    = rows.reduce((s, r) => s + r.rev.agencyCommission, 0);
  const totalNet       = rows.reduce((s, r) => s + r.rev.dutyBoostNet, 0);

  const confidenceColor = { high: "text-green-400 bg-green-900/30", medium: "text-yellow-400 bg-yellow-900/30", low: "text-orange-400 bg-orange-900/30" };

  return (
    <div className="space-y-6">
      {/* Header KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">Verified respondents</p>
          <p className="text-2xl font-bold text-white">{rows.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">Combined bookings/mo</p>
          <p className="text-2xl font-bold text-yellow-300">{totalMonthly.toLocaleString()}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">DutyBoost fee pool/mo</p>
          <p className="text-2xl font-bold text-purple-300">{fmt(totalFee)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">DutyBoost net/yr</p>
          <p className="text-2xl font-bold text-green-300">{fmt(totalNet * 12)}</p>
        </div>
      </div>

      {/* Assumptions bar */}
      <div className="bg-slate-800 border border-blue-500/20 rounded-xl px-4 py-3 text-xs text-slate-400 flex flex-wrap gap-x-4 gap-y-1">
        <span>📐 Assumptions:</span>
        <span className="text-white">{(REDEMPTION_RATE * 100).toFixed(0)}% redemption rate</span>
        <span className="text-white">€{AVG_BASKET} avg basket</span>
        <span className="text-white">2.5% fee → €{feePerRedemption.toFixed(2)}/redemption (capped €{FEE_CAP})</span>
        <span className="text-white">20% of fee → agency</span>
        <span className="text-slate-500 italic">Verified data from public sources (annual reports, press)</span>
      </div>

      {/* Per-company table */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Per-Company Potential</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 pr-3">Company</th>
                <th className="pb-2 pr-3">Type</th>
                <th className="pb-2 pr-3 text-right">Bookings/mo</th>
                <th className="pb-2 pr-3 text-right">Redemptions/mo</th>
                <th className="pb-2 pr-3 text-right">Gross spend/mo</th>
                <th className="pb-2 pr-3 text-right">Fee pool/mo</th>
                <th className="pb-2 pr-3 text-right">Agency/mo</th>
                <th className="pb-2 text-right">DB net/yr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2">
                      <span className="text-white font-medium">{r.company_name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${confidenceColor[r.rv.confidence]}`}>
                        {r.rv.confidence}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-slate-400">{r.company_type || "—"}</td>
                  <td className="py-2.5 pr-3 text-right text-yellow-300 font-semibold">{r.rv.perMonth.toLocaleString()}</td>
                  <td className="py-2.5 pr-3 text-right text-green-300">{r.rev.totalRedemptions.toLocaleString()}</td>
                  <td className="py-2.5 pr-3 text-right text-blue-300">{fmt(r.rev.grossRevenue)}</td>
                  <td className="py-2.5 pr-3 text-right text-purple-300">{fmt(r.rev.dutyBoostFee)}</td>
                  <td className="py-2.5 pr-3 text-right text-green-400">{fmt(r.rev.agencyCommission)}</td>
                  <td className="py-2.5 text-right text-yellow-300 font-bold">{fmt(r.rev.dutyBoostNet * 12)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-500 text-white font-bold">
                <td className="pt-3 pr-3" colSpan={2}>TOTAL</td>
                <td className="pt-3 pr-3 text-right text-yellow-300">{totalMonthly.toLocaleString()}</td>
                <td className="pt-3 pr-3 text-right text-green-300">{totalRedemp.toLocaleString()}</td>
                <td className="pt-3 pr-3 text-right text-blue-300">{fmt(totalGross)}</td>
                <td className="pt-3 pr-3 text-right text-purple-300">{fmt(totalFee)}</td>
                <td className="pt-3 pr-3 text-right text-green-400">{fmt(totalAgency)}</td>
                <td className="pt-3 text-right text-yellow-300">{fmt(totalNet * 12)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Monthly + yearly summary cards */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-3">
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Monthly Summary</p>
          <div className="space-y-2">
            {[
              { label: "Total bookings", value: totalMonthly.toLocaleString(), color: "text-yellow-300" },
              { label: "Redemptions (10%)", value: totalRedemp.toLocaleString(), color: "text-green-300" },
              { label: "Gross retail spend", value: fmt(totalGross), color: "text-blue-300" },
              { label: "DutyBoost fee pool", value: fmt(totalFee), color: "text-purple-300" },
              { label: "→ Agency (20%)", value: fmt(totalAgency), color: "text-green-400" },
              { label: "→ DutyBoost net (80%)", value: fmt(totalNet), color: "text-white" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between text-sm border-b border-slate-700/40 pb-1.5">
                <span className="text-slate-400">{label}</span>
                <span className={`font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-slate-800 border border-yellow-500/30 rounded-2xl p-5 space-y-3">
          <p className="text-xs font-semibold text-yellow-400 uppercase tracking-widest">Annual Projection (×12)</p>
          <div className="space-y-2">
            {[
              { label: "Total bookings/yr", value: (totalMonthly * 12).toLocaleString(), color: "text-yellow-300" },
              { label: "Redemptions/yr", value: (totalRedemp * 12).toLocaleString(), color: "text-green-300" },
              { label: "Gross retail spend/yr", value: fmt(totalGross * 12), color: "text-blue-300" },
              { label: "DutyBoost fee pool/yr", value: fmt(totalFee * 12), color: "text-purple-300" },
              { label: "→ Agency/yr", value: fmt(totalAgency * 12), color: "text-green-400" },
              { label: "→ DutyBoost net/yr", value: fmt(totalNet * 12), color: "text-white" },
            ].map(({ label, value, color }) => (
              <div key={label} className="flex items-center justify-between text-sm border-b border-slate-700/40 pb-1.5">
                <span className="text-slate-400">{label}</span>
                <span className={`font-bold ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {rows.length === 0 && (
        <p className="text-center text-slate-500 py-12 text-sm">No verified volume data found for current respondents.</p>
      )}

      {/* ── Airport Potential Section ── */}
      <div className="bg-slate-800 border border-indigo-500/30 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5">Airport-Level Potential</h3>
          <p className="text-xs text-slate-400">
            Based on <span className="text-white">10% of total annual passengers</span> redeeming a voucher at airport retail ·{" "}
            <span className="text-white">€{AVG_BASKET} avg basket · 2.5% fee · €{FEE_CAP} cap/tx</span> ·{" "}
            Source: official airport annual reports 2024
          </p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 pr-3">Airport</th>
                <th className="pb-2 pr-3 text-right">Pax/yr (2024)</th>
                <th className="pb-2 pr-3 text-right">10% Redemptions/yr</th>
                <th className="pb-2 pr-3 text-right">Gross retail spend/yr</th>
                <th className="pb-2 pr-3 text-right">Fee pool/yr</th>
                <th className="pb-2 pr-3 text-right">Agency/yr</th>
                <th className="pb-2 text-right">DB net/yr</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {AIRPORT_DATA.map(ap => {
                const paxPerMonth = Math.round(ap.paxPerYear / 12);
                const rev = calcRevenue(paxPerMonth);
                return (
                  <tr key={ap.iata} className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-2.5 pr-3">
                      <span className="text-white font-medium">{ap.name}</span>
                    </td>
                    <td className="py-2.5 pr-3 text-right text-slate-300">{ap.paxPerYear.toLocaleString()}</td>
                    <td className="py-2.5 pr-3 text-right text-green-300">{(rev.totalRedemptions * 12).toLocaleString()}</td>
                    <td className="py-2.5 pr-3 text-right text-blue-300">{fmt(rev.grossRevenue * 12)}</td>
                    <td className="py-2.5 pr-3 text-right text-purple-300">{fmt(rev.dutyBoostFee * 12)}</td>
                    <td className="py-2.5 pr-3 text-right text-green-400">{fmt(rev.agencyCommission * 12)}</td>
                    <td className="py-2.5 text-right text-yellow-300 font-bold">{fmt(rev.dutyBoostNet * 12)}</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              {(() => {
                const totals = AIRPORT_DATA.reduce((acc, ap) => {
                  const rev = calcRevenue(Math.round(ap.paxPerYear / 12));
                  acc.pax += ap.paxPerYear;
                  acc.redeems += rev.totalRedemptions * 12;
                  acc.gross += rev.grossRevenue * 12;
                  acc.fee += rev.dutyBoostFee * 12;
                  acc.agency += rev.agencyCommission * 12;
                  acc.net += rev.dutyBoostNet * 12;
                  return acc;
                }, { pax: 0, redeems: 0, gross: 0, fee: 0, agency: 0, net: 0 });
                return (
                  <tr className="border-t-2 border-slate-500 text-white font-bold">
                    <td className="pt-3 pr-3">TOTAL ({AIRPORT_DATA.length} airports)</td>
                    <td className="pt-3 pr-3 text-right text-slate-300">{totals.pax.toLocaleString()}</td>
                    <td className="pt-3 pr-3 text-right text-green-300">{totals.redeems.toLocaleString()}</td>
                    <td className="pt-3 pr-3 text-right text-blue-300">{fmt(totals.gross)}</td>
                    <td className="pt-3 pr-3 text-right text-purple-300">{fmt(totals.fee)}</td>
                    <td className="pt-3 pr-3 text-right text-green-400">{fmt(totals.agency)}</td>
                    <td className="pt-3 text-right text-yellow-300">{fmt(totals.net)}</td>
                  </tr>
                );
              })()}
            </tfoot>
          </table>
        </div>
        <p className="text-xs text-slate-600 italic">
          Assumption: 10% of all passengers redeem one voucher at airport retail. Real redemption rate will depend on DutyBoost penetration and partner activation.
        </p>
      </div>
    </div>
  );
}

// ── Travel Partner Dashboard ───────────────────────────────────────────────────
const EMAILS_SENT = 1000;
const SUCCESS_THRESHOLD = 30; // 3% of 1,000

function GoNoGoBar({ responses }) {
  const count = responses.length;
  const pct = ((count / EMAILS_SENT) * 100).toFixed(1);
  const progress = Math.min((count / SUCCESS_THRESHOLD) * 100, 100);
  const achieved = count >= SUCCESS_THRESHOLD;

  return (
    <div className={`rounded-2xl border p-5 space-y-3 ${achieved ? "bg-green-900/30 border-green-500/40" : "bg-slate-800 border-slate-700"}`}>
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Go / No-Go Decision Tracker</p>
          <p className="text-sm text-slate-300">
            Based on <span className="text-white font-semibold">1,000 emails sent</span> — need{" "}
              <span className="text-white font-semibold">30 responses (3%)</span> to proceed
          </p>
        </div>
        <div className={`text-center px-4 py-2 rounded-xl font-bold text-sm ${achieved ? "bg-green-500 text-white" : "bg-slate-700 text-slate-300"}`}>
          {achieved ? "✅ GO" : "⏳ NOT YET"}
        </div>
      </div>
      <div className="space-y-1.5">
        <div className="flex justify-between text-xs text-slate-400">
          <span>{count} responses received</span>
          <span className={achieved ? "text-green-400 font-semibold" : "text-slate-400"}>{pct}% response rate</span>
        </div>
        <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ${achieved ? "bg-green-500" : "bg-blue-500"}`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs text-slate-500">
          <span>0</span>
          <span className="text-slate-400">Goal: 30</span>
          <span>{EMAILS_SENT}</span>
        </div>
      </div>
      {!achieved && (
        <p className="text-xs text-slate-500">
          {SUCCESS_THRESHOLD - count} more response{SUCCESS_THRESHOLD - count !== 1 ? "s" : ""} needed to reach the go/no-go threshold.
        </p>
      )}
      {achieved && (
        <p className="text-xs text-green-400">
          🎉 Threshold reached! Sufficient data to make a go/no-go decision.
        </p>
      )}
    </div>
  );
}

function TravelPartnerDashboard({ responses }) {
  const wantsDemo = responses.filter(r => r.wants_demo).length;
  const companyTypes = tally(responses, "company_type");
  const interest = tally(responses, "interest_level");
  const commission = tally(responses, "commission_attractive");
  const snippet = tally(responses, "snippet_willingness");
  const volume = tally(responses, "annual_bookings");

  return (
    <div className="space-y-6">
      <GoNoGoBar responses={responses} />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Total responses" value={responses.length} color="text-green-300" />
        <StatCard icon={ThumbsUp} label="Wants follow-up" value={wantsDemo} color="text-blue-300" />
        <StatCard icon={Mail} label="Follow-up rate" value={responses.length ? `${Math.round((wantsDemo / responses.length) * 100)}%` : "—"} color="text-orange-300" />
        <StatCard icon={Globe} label="Company types" value={new Set(responses.map(r => r.company_type)).size} color="text-purple-300" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard title="Company type">
          <PieChartSection data={companyTypes} />
          <Legend data={companyTypes} />
        </ChartCard>
        <ChartCard title="Booking volume">
          <BarChartSection data={volume} color="#3b82f6" />
        </ChartCard>
        <ChartCard title="Interest level">
          <BarChartSection data={interest} color="#10b981" />
        </ChartCard>
        <ChartCard title="Commission model attractiveness">
          <BarChartSection data={commission} color="#a855f7" />
        </ChartCard>
      </div>

      <RevenueCalculator responses={responses} />

      <ChartCard title="All responses">
        <div className="space-y-2 max-h-[800px] overflow-y-auto">
          {responses.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-8">No responses yet</p>
          ) : (
            responses.map(r => <ResponseCard key={r.id} response={r} isRetailerView={false} />)
          )}
        </div>
      </ChartCard>
    </div>
  );
}

function exportToExcel(responses, filename, isRetailerView) {
  const rows = responses.map(r => ({
    "Date": r.created_date ? new Date(r.created_date).toLocaleDateString() : "",
    "Full Name": r.full_name || "",
    "Email": r.email || "",
    "Company": r.company_name || "",
    "Type": isRetailerView ? (r.company_type?.replace(RETAILER_PREFIX, "") || "") : (r.company_type || ""),
    "Website": r.company_website || "",
    "Interest Level": r.interest_level || "",
    "Annual Bookings / Monthly Visitors": r.annual_bookings || "",
    "Current Loyalty Program": r.current_loyalty || "",
    "Commission Attractive": r.commission_attractive || "",
    "Snippet Willingness": r.snippet_willingness || "",
    "Biggest Challenge": r.biggest_challenge || "",
    "Wants Demo": r.wants_demo ? "Yes" : "No",
    "Phone": r.phone || "",
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Responses");
  XLSX.writeFile(wb, filename);
}

function exportToCSV(responses, filename, isRetailerView) {
  const rows = responses.map(r => ({
    "Date": r.created_date ? new Date(r.created_date).toLocaleDateString() : "",
    "Full Name": r.full_name || "",
    "Email": r.email || "",
    "Company": r.company_name || "",
    "Type": isRetailerView ? (r.company_type?.replace(RETAILER_PREFIX, "") || "") : (r.company_type || ""),
    "Website": r.company_website || "",
    "Interest Level": r.interest_level || "",
    "Annual Bookings / Monthly Visitors": r.annual_bookings || "",
    "Current Loyalty Program": r.current_loyalty || "",
    "Commission Attractive": r.commission_attractive || "",
    "Snippet Willingness": r.snippet_willingness || "",
    "Biggest Challenge": r.biggest_challenge || "",
    "Wants Demo": r.wants_demo ? "Yes" : "No",
    "Phone": r.phone || "",
  }));
  const ws = XLSX.utils.json_to_sheet(rows);
  const csv = XLSX.utils.sheet_to_csv(ws);
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function SurveyDashboard() {
  const [activeTab, setActiveTab] = useState("retailer");
  const [allResponses, setAllResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SurveyResponse.list("-created_date", 500).then(data => {
      setAllResponses(data);
      setLoading(false);
    });

    const unsubscribe = base44.entities.SurveyResponse.subscribe(() => {
      base44.entities.SurveyResponse.list("-created_date", 500).then(data => {
        setAllResponses(data);
      });
    });

    return () => unsubscribe();
  }, []);

  const retailerResponses = useMemo(() =>
    allResponses.filter(r => isRetailer(r)).map(r => normalizeResponse({ ...r, ...r.data, id: r.id, created_date: r.created_date })),
    [allResponses]
  );

  const partnerResponses = useMemo(() =>
    allResponses.filter(r => !isRetailer(r)).map(r => normalizeResponse({ ...r, ...r.data, id: r.id, created_date: r.created_date })),
    [allResponses]
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="text-center space-y-2">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs tracking-widest uppercase">
            Survey Analytics
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Survey Dashboard</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Overview of all survey responses — airport retailers and travel partners.
          </p>
          <div className="pt-2 flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="gap-2 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
              onClick={() => {
                const isRetailerView = activeTab === "retailer";
                const data = isRetailerView ? retailerResponses : partnerResponses;
                const filename = isRetailerView ? "retailer-survey-responses.xlsx" : "travel-partner-survey-responses.xlsx";
                exportToExcel(data, filename, isRetailerView);
              }}
              disabled={loading}
            >
              <Download className="w-4 h-4" /> Excel
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="gap-2 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
              onClick={() => {
                const isRetailerView = activeTab === "retailer";
                const data = isRetailerView ? retailerResponses : partnerResponses;
                const filename = isRetailerView ? "retailer-survey-responses.csv" : "travel-partner-survey-responses.csv";
                exportToCSV(data, filename, isRetailerView);
              }}
              disabled={loading}
            >
              <FileText className="w-4 h-4" /> CSV
            </Button>
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 bg-slate-800 border border-slate-700 rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab("retailer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "retailer" ? "bg-orange-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Store className="w-4 h-4" /> Airport Retailer
            <span className="ml-1 text-xs opacity-70">({retailerResponses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("partner")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "partner" ? "bg-green-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" /> Travel Partner
            <span className="ml-1 text-xs opacity-70">({partnerResponses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("global")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "global" ? "bg-yellow-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <BarChart2 className="w-4 h-4" /> Global Potentials
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
          </div>
        ) : activeTab === "retailer" ? (
          <RetailerDashboard responses={retailerResponses} />
        ) : activeTab === "partner" ? (
          <TravelPartnerDashboard responses={partnerResponses} />
        ) : (
          <GlobalPotentialsDashboard responses={partnerResponses} />
        )}

        <p className="text-center text-xs text-slate-600 pb-4">hello@dutyboost.com · www.dutyboost.com</p>
      </div>
    </div>
  );
}