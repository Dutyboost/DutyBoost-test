import { useState, useEffect, useMemo } from "react";
import LeadsTab from "../components/LeadsTab";
import LOITab from "../components/LOITab";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Store, Users, BarChart2, ThumbsUp, Mail, Globe, CheckCircle2, Clock, Download, ChevronDown, ChevronUp, FileText, Phone, Search, TrendingUp, Cpu, Building2 } from "lucide-react";
import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import TrafficDashboard from "../components/TrafficDashboard";

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
  "tucoach":         { perYear: 7_500,      perMonth: 625,       source: "tucoachflanders.com — small regional coach operator Belgium", confidence: "low" },
  "europarcs":       { perYear: 500_000,    perMonth: 41_667,    source: "EuroParcs Group — 60+ holiday parks, ~500K annual bookings est. (press / industry data 2024)", confidence: "medium" },
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
        perMonth: `${lo.toLocaleString("nl-NL")}–${hi.toLocaleString("nl-NL")}`,
        perYear: `${(lo * 12).toLocaleString("nl-NL")}–${(hi * 12).toLocaleString("nl-NL")}`,
      };
    }
  }

  // "30,000+" / "30.000+" / "30 000+"
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

  // "Under X" / "Minder dan X" / "Menos de X" etc.
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

  // Plain number (custom entry)
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

function isPosProvider(r) {
  return r.company_type?.startsWith("POS Provider – ");
}

function isCorporatePartner(r) {
  return r.company_type?.startsWith("Corporate Partner – ");
}

function stripRolePrefix(val, prefix) {
  return val ? String(val).replace(prefix, "") : val;
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
    const safeName = (response.company_name || "response").replace(/[^a-z0-9]+/gi, "-");
    const dateStr = response.created_date ? new Date(response.created_date).toISOString().split('T')[0] : "export";
    const filename = `DutyBoost-${safeName}-${dateStr}`;
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
          {response.pos_provider && (
            <div className="text-xs">
              <p className="text-slate-500">POS Provider</p>
              <p className="text-slate-200">{response.pos_provider}</p>
            </div>
          )}
          {response.travel_platform && (
            <div className="text-xs">
              <p className="text-slate-500">Travel & Expense Platform</p>
              <p className="text-slate-200">{response.travel_platform}</p>
            </div>
          )}
          {Array.isArray(response.retailers_served) && response.retailers_served.length > 0 && (
            <div className="text-xs md:col-span-2">
              <p className="text-slate-500">Airport Retailers Served</p>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {response.retailers_served.map((s) => (
                  <span key={s} className="px-2 py-0.5 rounded-full bg-slate-700 text-slate-200 text-xs">{s}</span>
                ))}
              </div>
            </div>
          )}
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
                        <p className={`font-bold text-base ${confidenceColor[researched.confidence]}`}>{researched.perMonth.toLocaleString("nl-NL")}</p>
                        <p className="text-slate-400 text-xs mt-0.5">per month</p>
                      </div>
                      <div className={`flex-1 border rounded-lg px-3 py-2 text-center ${confidenceBg[researched.confidence]}`}>
                        <p className={`font-bold text-base ${confidenceColor[researched.confidence]}`}>{researched.perYear.toLocaleString("nl-NL")}</p>
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

const REDEMPTION_RATE      = 0.10;  // 10% of bookings issue a voucher
const RETAILER_REACH_RATE  = 0.10;  // 10% of those actually visit airport retail → effective 1%
const MIN_BASKET           = 70;    // €70 minimum basket
const MAX_BASKET           = 300;   // €300 maximum basket
const AVG_BASKET           = 185;   // €185 average basket (midpoint of €70–€300)
const FEE_RATE             = 0.025; // 2.5% DutyBoost fee on avg basket
const FEE_CAP              = 25;    // €25 max DutyBoost fee per transaction
const AGENCY_SHARE         = 0.20;  // 20% of DutyBoost fee to agency

// Single shared revenue calc — used by both Travel Partner and Global Potentials sections
function calcRevenue(totalMonthlyBookings) {
  const totalRedemptions = Math.round(totalMonthlyBookings * REDEMPTION_RATE * RETAILER_REACH_RATE);
  const grossRevenue     = totalRedemptions * AVG_BASKET;
  const feePerRedemption = Math.min(AVG_BASKET * FEE_RATE, FEE_CAP);
  const dutyBoostFee     = totalRedemptions * feePerRedemption;
  const agencyCommission = dutyBoostFee * AGENCY_SHARE;
  const dutyBoostNet     = dutyBoostFee - agencyCommission;
  return { totalRedemptions, grossRevenue, feePerRedemption, dutyBoostFee, agencyCommission, dutyBoostNet };
}

function RevenuePanel({ label, totalMonthlyBookings, accentClass, borderClass, tag }) {
  const fmt = (n) => `€${Math.round(n).toLocaleString("nl-NL")}`;
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
          <p className={`text-lg font-bold ${accentClass}`}>{totalMonthlyBookings.toLocaleString("nl-NL")}</p>
        </div>
        <div className="bg-slate-900/60 rounded-lg p-2 text-center">
          <p className="text-xs text-slate-500 mb-0.5">Monthly redemptions</p>
          <p className="text-lg font-bold text-green-300">{totalRedemptions.toLocaleString("nl-NL")}</p>
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
          <p className="text-xs text-green-500 mb-0.5">Travel Partner commission/mo</p>
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
  const fmt = (n) => `€${Math.round(n).toLocaleString("nl-NL")}`;

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

  // selfRev / verifiedRev not needed — panels call calcRevenue directly

  return (
    <div className="bg-slate-800 border border-green-500/30 rounded-2xl p-5 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5">
          Potential Revenue — Survey Respondents Combined
        </h3>
        <p className="text-xs text-slate-400">
          <span className="text-white">{(REDEMPTION_RATE * 100).toFixed(0)}% redeem</span> ×{" "}
          <span className="text-white">{(RETAILER_REACH_RATE * 100).toFixed(0)}% reach airport retail (÷10)</span> ·{" "}
          <span className="text-white">€{AVG_BASKET} avg basket</span> (range: €{MIN_BASKET}–€{MAX_BASKET}) ·{" "}
          <span className="text-white">2.5% fee</span> ·{" "}
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
                  <span className="text-slate-400">{perMonth.toLocaleString("nl-NL")} bookings/mo</span>
                  <span className="text-green-300">{totalRedemptions.toLocaleString("nl-NL")} redemptions/mo</span>
                  <span className="text-purple-300 font-semibold ml-auto">{fmt(dutyBoostFee)} fee/mo → {fmt(dutyBoostNet)} DB net</span>
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
            const bRedem = Math.round(count * monthly * REDEMPTION_RATE * RETAILER_REACH_RATE);
            const bFee   = bRedem * Math.min(AVG_BASKET * FEE_RATE, FEE_CAP);
            return (
              <div key={label} className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs bg-slate-900/40 rounded-lg px-3 py-2">
                <span className="text-slate-300 font-medium">{label}</span>
                <span className="text-slate-500">{count} respondent{count !== 1 ? "s" : ""}</span>
                <span className="text-slate-400">{bRedem.toLocaleString("nl-NL")} redemptions/mo</span>
                <span className="text-purple-300 font-semibold ml-auto">{fmt(bFee)} fee/mo</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-600 italic">
        Assumptions: upper bound of each survey range used · {REDEMPTION_RATE * 100}% redeem × {RETAILER_REACH_RATE * 100}% reach airport retail (÷10) · avg basket €{AVG_BASKET} · 2.5% fee = €{Math.min(AVG_BASKET * FEE_RATE, FEE_CAP).toFixed(2)}/tx (capped €{FEE_CAP}) · 20% of fee to agency
      </p>
    </div>
  );
}

// calcRevenueGlobal is an alias for calcRevenue — same model, one source of truth
const calcRevenueGlobal = calcRevenue;
const GLOBAL_REDEMPTION_RATE = REDEMPTION_RATE;


// ── Global Potentials Dashboard ───────────────────────────────────────────────
// Uses RESEARCHED_VOLUMES directly — dynamic: only shows companies that match a respondent
function GlobalPotentialsDashboard({ responses }) {
  const fmt = (n) => `€${Math.round(n).toLocaleString("nl-NL")}`;
  const feePerRedemption = Math.min(AVG_BASKET * FEE_RATE, FEE_CAP);

  // Build rows: verified respondents get researched volume; others use self-reported
  const rows = responses.map(r => {
    const rv = getResearchedVolume(r.company_name);
    if (rv) {
      return { ...r, rv, rev: calcRevenueGlobal(rv.perMonth), isVerified: true };
    }
    // Fall back to self-reported volume
    const bucket = matchVolumeBucket(r.annual_bookings);
    const custom = !bucket ? parseCustomVolume(r.annual_bookings) : null;
    const monthly = bucket ? bucket.monthly : custom;
    if (!monthly) return null;
    const selfRv = { perMonth: monthly, perYear: monthly * 12, source: "Self-reported (survey)", confidence: "self-reported" };
    return { ...r, rv: selfRv, rev: calcRevenueGlobal(monthly), isVerified: false };
  }).filter(Boolean);

  // Totals
  const totalMonthly   = rows.reduce((s, r) => s + r.rv.perMonth, 0);
  const totalRedemp    = rows.reduce((s, r) => s + r.rev.totalRedemptions, 0);
  const totalGross     = rows.reduce((s, r) => s + r.rev.grossRevenue, 0);
  const totalFee       = rows.reduce((s, r) => s + r.rev.dutyBoostFee, 0);
  const totalAgency    = rows.reduce((s, r) => s + r.rev.agencyCommission, 0);
  const totalNet       = rows.reduce((s, r) => s + r.rev.dutyBoostNet, 0);

  const confidenceColor = { high: "text-green-400 bg-green-900/30", medium: "text-yellow-400 bg-yellow-900/30", low: "text-orange-400 bg-orange-900/30", "self-reported": "text-slate-400 bg-slate-700/50" };

  // Pre-compute airport section data for PDF
  const partnerBookingsPerYear = totalMonthly * 12;
  const redemptionsPerYear = Math.round(partnerBookingsPerYear * GLOBAL_REDEMPTION_RATE * RETAILER_REACH_RATE);
  const grossPerYear = redemptionsPerYear * AVG_BASKET;
  const feePerTxVal = Math.min(AVG_BASKET * FEE_RATE, FEE_CAP);
  const feePoolPerYear = redemptionsPerYear * feePerTxVal;
  const travelPartnerPerYear = feePoolPerYear * AGENCY_SHARE;
  const dbNetPerYear = feePoolPerYear - travelPartnerPerYear;

  const handleDownloadPDF = () => {
    exportGlobalPotentialsPDF(
      rows,
      { totalMonthly, totalRedemp, totalGross, totalFee, totalAgency, totalNet },
      { partnerBookingsPerYear, redemptionsPerYear, grossPerYear, feePoolPerYear, travelPartnerPerYear, dbNetPerYear }
    );
  };

  return (
    <div className="space-y-6">
      {/* Header KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">Respondents with volume</p>
          <p className="text-2xl font-bold text-white">{rows.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <p className="text-xs text-slate-400 mb-1">Combined bookings/mo</p>
          <p className="text-2xl font-bold text-yellow-300">{totalMonthly.toLocaleString("nl-NL")}</p>
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
        <span className="text-white">{(GLOBAL_REDEMPTION_RATE * 100).toFixed(0)}% of bookings redeem</span>
        <span className="text-white">×{(RETAILER_REACH_RATE * 100).toFixed(0)}% reach airport retail (÷10 realism)</span>
        <span className="text-white">€{AVG_BASKET} avg basket</span>
        <span className="text-white">2.5% fee → €{feePerRedemption.toFixed(2)}/tx (capped €{FEE_CAP})</span>
        <span className="text-white">20% of fee → Travel Partner</span>
        <span className="text-slate-500 italic">Verified data from public sources (annual reports, press)</span>
      </div>

      {/* Per-company table */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Per-Respondent Volume — All with Reported Data</h3>
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
                <th className="pb-2 pr-3 text-right">Travel Partner/mo</th>
                <th className="pb-2 text-right">DB net/mo</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/40">
              {rows.map(r => (
                <tr key={r.id} className="hover:bg-slate-700/20 transition-colors">
                  <td className="py-2.5 pr-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-white font-medium">{r.company_name}</span>
                      <span className={`px-1.5 py-0.5 rounded text-xs font-semibold ${confidenceColor[r.rv.confidence]}`}>
                        {r.isVerified ? r.rv.confidence : "self-reported"}
                      </span>
                    </div>
                  </td>
                  <td className="py-2.5 pr-3 text-slate-400">{r.company_type || "—"}</td>
                  <td className="py-2.5 pr-3 text-right text-yellow-300 font-semibold">{r.rv.perMonth.toLocaleString("nl-NL")}</td>
                  <td className="py-2.5 pr-3 text-right text-green-300">{r.rev.totalRedemptions.toLocaleString("nl-NL")}</td>
                  <td className="py-2.5 pr-3 text-right text-blue-300">{fmt(r.rev.grossRevenue)}</td>
                  <td className="py-2.5 pr-3 text-right text-purple-300">{fmt(r.rev.dutyBoostFee)}</td>
                  <td className="py-2.5 pr-3 text-right text-green-400">{fmt(r.rev.agencyCommission)}</td>
                  <td className="py-2.5 text-right text-yellow-300 font-bold">{fmt(r.rev.dutyBoostNet)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t-2 border-slate-500 text-white font-bold">
                <td className="pt-3 pr-3" colSpan={2}>TOTAL</td>
                <td className="pt-3 pr-3 text-right text-yellow-300">{totalMonthly.toLocaleString("nl-NL")}</td>
                <td className="pt-3 pr-3 text-right text-green-300">{totalRedemp.toLocaleString("nl-NL")}</td>
                <td className="pt-3 pr-3 text-right text-blue-300">{fmt(totalGross)}</td>
                <td className="pt-3 pr-3 text-right text-purple-300">{fmt(totalFee)}</td>
                <td className="pt-3 pr-3 text-right text-green-400">{fmt(totalAgency)}</td>
                <td className="pt-3 text-right text-yellow-300">{fmt(totalNet)}</td>
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
              { label: "Total bookings", value: totalMonthly.toLocaleString("nl-NL"), color: "text-yellow-300" },
              { label: "Redemptions (1% = 10%×10%)", value: totalRedemp.toLocaleString("nl-NL"), color: "text-green-300" },
              { label: "Gross retail spend", value: fmt(totalGross), color: "text-blue-300" },
              { label: "DutyBoost fee pool", value: fmt(totalFee), color: "text-purple-300" },
              { label: "→ Travel Partner (20%)", value: fmt(totalAgency), color: "text-green-400" },
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
              { label: "Total bookings/yr", value: (totalMonthly * 12).toLocaleString("nl-NL"), color: "text-yellow-300" },
              { label: "Redemptions/yr", value: (totalRedemp * 12).toLocaleString("nl-NL"), color: "text-green-300" },
              { label: "Gross retail spend/yr", value: fmt(totalGross * 12), color: "text-blue-300" },
              { label: "DutyBoost fee pool/yr", value: fmt(totalFee * 12), color: "text-purple-300" },
              { label: "→ Travel Partner/yr", value: fmt(totalAgency * 12), color: "text-green-400" },
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

      {/* ── Airport Retailer Upside Section ── */}
      <div className="bg-slate-800 border border-orange-500/30 rounded-2xl p-5 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5">
            Airport Retailer Upside — What the Retailer Gets
          </h3>
          <p className="text-xs text-slate-400">
            Extra revenue driven to airport retailers by DutyBoost travellers spending their vouchers.{" "}
            Retailer receives the full basket spend and gives the DutyCredit discount (fee pool) back.{" "}
            Net gain = gross spend minus discount.
          </p>
        </div>

        {/* Monthly + yearly retailer cards */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-slate-900/60 border border-orange-500/20 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-orange-400 uppercase tracking-widest">Monthly — Retailer View</p>
            {[
              { label: "Redemptions at airport retail/mo", value: totalRedemp.toLocaleString("nl-NL"), color: "text-green-300" },
              { label: "Gross basket spend driven/mo", value: fmt(totalGross), color: "text-blue-300", note: `(${totalRedemp.toLocaleString("nl-NL")} × €${AVG_BASKET} avg)` },
              { label: "DutyCredit discount given/mo", value: `–${fmt(totalFee)}`, color: "text-red-400", note: "(= fee pool, funded by DutyBoost)" },
              { label: "Net new revenue for retailer/mo", value: fmt(totalGross - totalFee), color: "text-orange-300", bold: true },
            ].map(({ label, value, color, note, bold }) => (
              <div key={label} className="flex items-start justify-between text-sm border-b border-slate-700/40 pb-1.5">
                <span className="text-slate-400 flex-1 pr-2">{label}{note && <span className="block text-xs text-slate-600">{note}</span>}</span>
                <span className={`font-${bold ? "bold" : "semibold"} ${color} shrink-0`}>{value}</span>
              </div>
            ))}
          </div>
          <div className="bg-slate-900/60 border border-orange-500/30 rounded-xl p-4 space-y-2">
            <p className="text-xs font-semibold text-orange-300 uppercase tracking-widest">Annual — Retailer View (×12)</p>
            {[
              { label: "Redemptions at airport retail/yr", value: (totalRedemp * 12).toLocaleString("nl-NL"), color: "text-green-300" },
              { label: "Gross basket spend driven/yr", value: fmt(totalGross * 12), color: "text-blue-300" },
              { label: "DutyCredit discount given/yr", value: `–${fmt(totalFee * 12)}`, color: "text-red-400" },
              { label: "Net new revenue for retailer/yr", value: fmt((totalGross - totalFee) * 12), color: "text-orange-300", bold: true },
            ].map(({ label, value, color, bold }) => (
              <div key={label} className="flex items-center justify-between text-sm border-b border-slate-700/40 pb-1.5">
                <span className="text-slate-400">{label}</span>
                <span className={`font-${bold ? "bold" : "semibold"} ${color}`}>{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Per-company retailer upside */}
        {rows.length > 0 && (
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Per-company retailer uplift (monthly)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-500 border-b border-slate-700">
                    <th className="pb-2 pr-3">Company (travel partner)</th>
                    <th className="pb-2 pr-3 text-right">Redemptions/mo</th>
                    <th className="pb-2 pr-3 text-right">Gross spend/mo</th>
                    <th className="pb-2 pr-3 text-right">Discount given/mo</th>
                    <th className="pb-2 text-right">Net retailer gain/mo</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/30">
                  {rows.map(r => (
                    <tr key={r.id} className="hover:bg-slate-700/20 transition-colors">
                      <td className="py-2 pr-3 text-white font-medium">{r.company_name}</td>
                      <td className="py-2 pr-3 text-right text-green-300">{r.rev.totalRedemptions.toLocaleString("nl-NL")}</td>
                      <td className="py-2 pr-3 text-right text-blue-300">{fmt(r.rev.grossRevenue)}</td>
                      <td className="py-2 pr-3 text-right text-red-400">–{fmt(r.rev.dutyBoostFee)}</td>
                      <td className="py-2 text-right text-orange-300 font-bold">{fmt(r.rev.grossRevenue - r.rev.dutyBoostFee)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-slate-500 font-bold">
                    <td className="pt-2 pr-3 text-white">TOTAL</td>
                    <td className="pt-2 pr-3 text-right text-green-300">{totalRedemp.toLocaleString("nl-NL")}</td>
                    <td className="pt-2 pr-3 text-right text-blue-300">{fmt(totalGross)}</td>
                    <td className="pt-2 pr-3 text-right text-red-400">–{fmt(totalFee)}</td>
                    <td className="pt-2 text-right text-orange-300">{fmt(totalGross - totalFee)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        )}

        <p className="text-xs text-slate-600 italic">
          The retailer receives extra footfall + basket spend from DutyBoost travellers. The DutyCredit discount is funded from the fee pool (2.5% of basket, max €{FEE_CAP}/tx) — so the retailer's net new revenue = gross spend minus that discount. No upfront cost to the retailer.
        </p>
      </div>

      {rows.length === 0 && (
        <p className="text-center text-slate-500 py-12 text-sm">No volume data found for current respondents.</p>
      )}

      {/* ── Airport Potential Section ── */}
      {(() => {
        return (
          <div className="bg-slate-800 border border-indigo-500/30 rounded-2xl p-5 space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5">AMS Airport Potential — Combined Travel Partner Volume</h3>
              <p className="text-xs text-slate-400">
                Based on <span className="text-white">{rows.length} travel partners</span> combined bookings/yr ×{" "}
                <span className="text-white">{(GLOBAL_REDEMPTION_RATE * 100).toFixed(0)}% redeem</span> ×{" "}
                <span className="text-white">{(RETAILER_REACH_RATE * 100).toFixed(0)}% reach airport retail (÷10)</span> ·{" "}
                <span className="text-white">€{AVG_BASKET} avg basket · 2.5% fee · €{FEE_CAP} cap/tx</span>
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-left text-slate-400 border-b border-slate-700">
                    <th className="pb-2 pr-3">Airport</th>
                    <th className="pb-2 pr-3 text-right">Partner bookings/yr</th>
                    <th className="pb-2 pr-3 text-right">Redemptions/yr</th>
                    <th className="pb-2 pr-3 text-right">Gross retail spend/yr</th>
                    <th className="pb-2 pr-3 text-right">Fee pool/yr</th>
                    <th className="pb-2 pr-3 text-right">Travel Partner/yr</th>
                    <th className="pb-2 text-right">DB net/yr</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/40">
                  <tr className="hover:bg-slate-700/20 transition-colors">
                    <td className="py-2.5 pr-3">
                      <span className="text-white font-medium">Amsterdam Schiphol (AMS)</span>
                    </td>
                    <td className="py-2.5 pr-3 text-right text-yellow-300 font-semibold">{partnerBookingsPerYear.toLocaleString("nl-NL")}</td>
                    <td className="py-2.5 pr-3 text-right text-green-300">{redemptionsPerYear.toLocaleString("nl-NL")}</td>
                    <td className="py-2.5 pr-3 text-right text-blue-300">{fmt(grossPerYear)}</td>
                    <td className="py-2.5 pr-3 text-right text-purple-300">{fmt(feePoolPerYear)}</td>
                    <td className="py-2.5 pr-3 text-right text-green-400">{fmt(travelPartnerPerYear)}</td>
                    <td className="py-2.5 text-right text-yellow-300 font-bold">{fmt(dbNetPerYear)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-600 italic">
              {`Partner bookings/yr = sum of verified monthly bookings × 12. ${(GLOBAL_REDEMPTION_RATE * 100).toFixed(0)}% redeem a voucher × ${(RETAILER_REACH_RATE * 100).toFixed(0)}% of those actually spend at AMS airport retail (÷10 realism factor).`}
            </p>
          </div>
        );
      })()}
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

function PosProviderDashboard({ responses }) {
  const wantsDemo = responses.filter(r => r.wants_demo).length;
  const providerTypes = tally(responses, "company_type");
  const appeal = tally(responses, "commission_attractive");
  const integration = tally(responses, "snippet_willingness");
  const stores = tally(responses, "annual_bookings");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Cpu} label="Total responses" value={responses.length} color="text-violet-300" />
        <StatCard icon={ThumbsUp} label="Wants follow-up" value={wantsDemo} color="text-green-300" />
        <StatCard icon={Mail} label="Follow-up rate" value={responses.length ? `${Math.round((wantsDemo / responses.length) * 100)}%` : "—"} color="text-blue-300" />
        <StatCard icon={Globe} label="Provider types" value={new Set(responses.map(r => r.company_type)).size} color="text-purple-300" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard title="Provider type">
          <PieChartSection data={providerTypes} />
          <Legend data={providerTypes} />
        </ChartCard>
        <ChartCard title="Store network size">
          <BarChartSection data={stores} color="#8b5cf6" />
        </ChartCard>
        <ChartCard title="Value-prop attractiveness">
          <BarChartSection data={appeal} color="#10b981" />
        </ChartCard>
        <ChartCard title="Integration willingness">
          <BarChartSection data={integration} color="#a855f7" />
        </ChartCard>
      </div>
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

function CorporatePartnerDashboard({ responses }) {
  const wantsDemo = responses.filter(r => r.wants_demo).length;
  const orgTypes = tally(responses, "company_type");
  const appeal = tally(responses, "commission_attractive");
  const integration = tally(responses, "snippet_willingness");
  const trips = tally(responses, "annual_bookings");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Building2} label="Total responses" value={responses.length} color="text-indigo-300" />
        <StatCard icon={ThumbsUp} label="Wants follow-up" value={wantsDemo} color="text-green-300" />
        <StatCard icon={Mail} label="Follow-up rate" value={responses.length ? `${Math.round((wantsDemo / responses.length) * 100)}%` : "—"} color="text-blue-300" />
        <StatCard icon={Globe} label="Organisation types" value={new Set(responses.map(r => r.company_type)).size} color="text-purple-300" />
      </div>
      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard title="Organisation type">
          <PieChartSection data={orgTypes} />
          <Legend data={orgTypes} />
        </ChartCard>
        <ChartCard title="Annual business trips">
          <BarChartSection data={trips} color="#6366f1" />
        </ChartCard>
        <ChartCard title="Value-prop attractiveness">
          <BarChartSection data={appeal} color="#10b981" />
        </ChartCard>
        <ChartCard title="Distribution willingness">
          <BarChartSection data={integration} color="#a855f7" />
        </ChartCard>
      </div>
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

function GlobalPotentialsPDFButton({ responses }) {
  const rows = responses.map(r => {
    const rv = getResearchedVolume(r.company_name);
    if (rv) return { ...r, rv, rev: calcRevenueGlobal(rv.perMonth), isVerified: true };
    const bucket = matchVolumeBucket(r.annual_bookings);
    const custom = !bucket ? parseCustomVolume(r.annual_bookings) : null;
    const monthly = bucket ? bucket.monthly : custom;
    if (!monthly) return null;
    const selfRv = { perMonth: monthly, perYear: monthly * 12, source: "Self-reported (survey)", confidence: "self-reported" };
    return { ...r, rv: selfRv, rev: calcRevenueGlobal(monthly), isVerified: false };
  }).filter(Boolean);

  const totalMonthly = rows.reduce((s, r) => s + r.rv.perMonth, 0);
  const totalRedemp  = rows.reduce((s, r) => s + r.rev.totalRedemptions, 0);
  const totalGross   = rows.reduce((s, r) => s + r.rev.grossRevenue, 0);
  const totalFee     = rows.reduce((s, r) => s + r.rev.dutyBoostFee, 0);
  const totalAgency  = rows.reduce((s, r) => s + r.rev.agencyCommission, 0);
  const totalNet     = rows.reduce((s, r) => s + r.rev.dutyBoostNet, 0);

  const partnerBookingsPerYear = totalMonthly * 12;
  const redemptionsPerYear = Math.round(partnerBookingsPerYear * GLOBAL_REDEMPTION_RATE * RETAILER_REACH_RATE);
  const grossPerYear = redemptionsPerYear * AVG_BASKET;
  const feePoolPerYear = redemptionsPerYear * Math.min(AVG_BASKET * FEE_RATE, FEE_CAP);
  const travelPartnerPerYear = feePoolPerYear * AGENCY_SHARE;
  const dbNetPerYear = feePoolPerYear - travelPartnerPerYear;

  return (
    <Button
      size="sm"
      onClick={() => exportGlobalPotentialsPDF(
        rows,
        { totalMonthly, totalRedemp, totalGross, totalFee, totalAgency, totalNet },
        { partnerBookingsPerYear, redemptionsPerYear, grossPerYear, feePoolPerYear, travelPartnerPerYear, dbNetPerYear }
      )}
      className="gap-2 bg-yellow-600 hover:bg-yellow-500 text-white"
    >
      <Download className="w-4 h-4" /> Download PDF
    </Button>
  );
}

function exportGlobalPotentialsPDF(rows, totals, airportSection) {
  // Portrait A4: 210 x 297 mm — all sections visible, no clipping
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const W = 210;
  const H = 297;
  const M = 10; // margin
  const fmt = (n) => `EUR${Math.round(n).toLocaleString("nl-NL")}`;

  const newPage = () => {
    doc.addPage();
    doc.setFillColor("#0f172a");
    doc.rect(0, 0, W, H, "F");
  };

  const bg = (hex, x, y, w, h, r = 2) => {
    doc.setFillColor(hex);
    doc.roundedRect(x, y, w, h, r, r, "F");
  };
  const txt = (str, x, y, color, size = 8, style = "normal") => {
    doc.setTextColor(color);
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.text(String(str ?? ""), x, y);
  };
  const rtxt = (str, x, y, color, size = 8, style = "normal") => {
    doc.setTextColor(color);
    doc.setFontSize(size);
    doc.setFont("helvetica", style);
    doc.text(String(str ?? ""), x, y, { align: "right" });
  };
  const hline = (y) => {
    doc.setDrawColor("#334155");
    doc.setLineWidth(0.2);
    doc.line(M, y, W - M, y);
  };

  // ════════════════════════════════════════════════════════
  // PAGE 1 — Travel Partner Revenue Model
  // ════════════════════════════════════════════════════════
  doc.setFillColor("#0f172a");
  doc.rect(0, 0, W, H, "F");

  // Header
  bg("#1e293b", M, 8, W - M * 2, 18, 3);
  txt("DutyBoost", M + 3, 18, "#3b82f6", 13, "bold");
  txt("Global Potentials — Verified Travel Partner Revenue Model", M + 3, 23, "#94a3b8", 7);
  rtxt(`Generated ${new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}`, W - M - 2, 18, "#64748b", 7);
  rtxt("hello@dutyboost.com", W - M - 2, 23, "#475569", 6);

  // KPI cards (2x2 grid)
  const kpis = [
    { label: "Verified respondents", value: String(rows.length), color: "#f8fafc" },
    { label: "Combined bookings/mo", value: totals.totalMonthly.toLocaleString("nl-NL"), color: "#fde047" },
    { label: "DutyBoost fee pool/mo", value: fmt(totals.totalFee), color: "#d8b4fe" },
    { label: "DutyBoost net/yr", value: fmt(totals.totalNet * 12), color: "#86efac" },
  ];
  const kpiW = (W - M * 2 - 3) / 2;
  const kpiH = 18;
  [[0,1],[2,3]].forEach(([a, b], ri) => {
    [a, b].forEach((ki, ci) => {
      const x = M + ci * (kpiW + 3);
      const y = 30 + ri * (kpiH + 2);
      bg("#1e293b", x, y, kpiW, kpiH, 2);
      txt(kpis[ki].label, x + 3, y + 7, "#64748b", 6);
      txt(kpis[ki].value, x + 3, y + 14, kpis[ki].color, 10, "bold");
    });
  });

  // 1% redemption highlight banner + assumptions combined
  let cy = 74;
  bg("#7c2d12", M, cy, W - M * 2, 20, 2);
  txt("CONSERVATIVE MODEL: Only 1% of total bookings actually redeem at airport retail — Enormous growth upside remains untapped.", M + 3, cy + 7, "#fed7aa", 7.5, "bold");
  txt("EUR185 avg basket | 2.5% platform fee (max EUR25/tx) | 20% of fee to Travel Partner | Volume data: verified annual reports", M + 3, cy + 15, "#fbbf24", 6.5, "normal");
  cy += 24;

  // Per-company table — 7 cols across portrait width (no "Conf" col, merged into company)
  // Col right-edges: Bkgs/mo, Redem/mo, Gross/mo, Fee/mo, Partner/mo, DB net/mo
  const C = {
    company:  M + 2,
    type:     M + 46,
    bookings: M + 98,
    redemp:   M + 118,
    gross:    M + 143,
    fee:      M + 159,
    partner:  M + 174,
    dbnet:    W - M,
  };

  bg("#1e293b", M, cy, W - M * 2, 8, 2);
  txt("Company",       C.company,  cy + 5.5, "#64748b", 6, "bold");
  txt("Type",          C.type,     cy + 5.5, "#64748b", 6, "bold");
  rtxt("Bkgs/mo",      C.bookings, cy + 5.5, "#64748b", 6, "bold");
  rtxt("Redem/mo",     C.redemp,   cy + 5.5, "#64748b", 6, "bold");
  rtxt("Gross/mo",     C.gross,    cy + 5.5, "#64748b", 6, "bold");
  rtxt("Fee/mo",       C.fee,      cy + 5.5, "#64748b", 6, "bold");
  rtxt("Partner/mo",   C.partner,  cy + 5.5, "#64748b", 6, "bold");
  rtxt("DB net/mo",    C.dbnet,    cy + 5.5, "#64748b", 6, "bold");
  cy += 10;

  const confColor = { high: "#4ade80", medium: "#fde047", low: "#fb923c" };
  rows.forEach((r, idx) => {
    if (idx % 2 === 1) bg("#172035", M, cy - 3, W - M * 2, 8, 0);
    // Company name with confidence badge inline
    const confLabel = r.rv.confidence === "high" ? "[H]" : r.rv.confidence === "medium" ? "[M]" : "[L]";
    txt(`${r.company_name.substring(0, 14)} ${confLabel}`,  C.company, cy + 2, "#f8fafc", 6.5, "bold");
    txt((r.company_type || "").substring(0, 13),             C.type,    cy + 2, "#94a3b8", 6);
    rtxt(r.rv.perMonth.toLocaleString("nl-NL"),                     C.bookings, cy + 2, "#fde047", 6.5, "bold");
    rtxt(r.rev.totalRedemptions.toLocaleString("nl-NL"),            C.redemp,   cy + 2, "#86efac", 6.5);
    rtxt(fmt(r.rev.grossRevenue),                            C.gross,    cy + 2, "#93c5fd", 6.5);
    rtxt(fmt(r.rev.dutyBoostFee),                            C.fee,      cy + 2, "#d8b4fe", 6.5);
    rtxt(fmt(r.rev.agencyCommission),                        C.partner,  cy + 2, "#4ade80", 6.5);
    rtxt(fmt(r.rev.dutyBoostNet),                            C.dbnet,    cy + 2, "#fde047", 6.5, "bold");
    cy += 8;
  });

  hline(cy);
  cy += 4;
  txt("TOTAL",                              C.company,  cy + 2, "#f8fafc", 6.5, "bold");
  rtxt(totals.totalMonthly.toLocaleString("nl-NL"), C.bookings, cy + 2, "#fde047", 6.5, "bold");
  rtxt(totals.totalRedemp.toLocaleString("nl-NL"),  C.redemp,   cy + 2, "#86efac", 6.5, "bold");
  rtxt(fmt(totals.totalGross),               C.gross,    cy + 2, "#93c5fd", 6.5, "bold");
  rtxt(fmt(totals.totalFee),                 C.fee,      cy + 2, "#d8b4fe", 6.5, "bold");
  rtxt(fmt(totals.totalAgency),              C.partner,  cy + 2, "#4ade80", 6.5, "bold");
  rtxt(fmt(totals.totalNet),                 C.dbnet,    cy + 2, "#fde047", 6.5, "bold");
  cy += 10;

  // Summary cards side by side
  const sumW = (W - M * 2 - 4) / 2;
  const summaryItems = [
    [
      { label: "Total bookings",          value: totals.totalMonthly.toLocaleString("nl-NL"),    color: "#fde047" },
      { label: "Redemptions (10%x10%)",   value: totals.totalRedemp.toLocaleString("nl-NL"),     color: "#86efac" },
      { label: "Gross retail spend",      value: fmt(totals.totalGross),                  color: "#93c5fd" },
      { label: "DutyBoost fee pool",      value: fmt(totals.totalFee),                    color: "#d8b4fe" },
      { label: "Travel Partner (20%)",    value: fmt(totals.totalAgency),                 color: "#4ade80" },
      { label: "DutyBoost net (80%)",     value: fmt(totals.totalNet),                    color: "#f8fafc" },
    ],
    [
      { label: "Total bookings/yr",       value: (totals.totalMonthly * 12).toLocaleString("nl-NL"), color: "#fde047" },
      { label: "Redemptions/yr",          value: (totals.totalRedemp * 12).toLocaleString("nl-NL"),  color: "#86efac" },
      { label: "Gross retail spend/yr",   value: fmt(totals.totalGross * 12),                 color: "#93c5fd" },
      { label: "DutyBoost fee pool/yr",   value: fmt(totals.totalFee * 12),                   color: "#d8b4fe" },
      { label: "Travel Partner/yr",       value: fmt(totals.totalAgency * 12),                color: "#4ade80" },
      { label: "DutyBoost net/yr",        value: fmt(totals.totalNet * 12),                   color: "#f8fafc" },
    ],
  ];
  const cardTitles = ["Monthly Summary", "Annual Projection (x12)"];
  summaryItems.forEach((items, ci) => {
    const sx = M + ci * (sumW + 4);
    const cardH = 8 + items.length * 8;
    bg("#1e293b", sx, cy, sumW, cardH, 2);
    txt(cardTitles[ci], sx + 3, cy + 6, ci === 0 ? "#94a3b8" : "#fde047", 7, "bold");
    items.forEach((item, ii) => {
      const iy = cy + 13 + ii * 8;
      txt(item.label, sx + 3, iy, "#64748b", 6.5);
      rtxt(item.value, sx + sumW - 3, iy, item.color, 6.5, "bold");
    });
  });

  // ════════════════════════════════════════════════════════
  // PAGE 2 — Airport Retailer Upside
  // ════════════════════════════════════════════════════════
  newPage();
  let py = 8;

  bg("#1e2d1a", M, py, W - M * 2, 16, 3);
  txt("Airport Retailer Upside — What the Retailer Gets from DutyBoost", M + 3, py + 8, "#f97316", 10, "bold");
  txt("Retailer receives full basket spend; gives DutyCredit discount back. Net gain = gross spend minus discount. No upfront cost.", M + 3, py + 13, "#94a3b8", 6);
  py += 20;

  // Retailer summary cards
  const retSumW = (W - M * 2 - 4) / 2;
  const retMonthly = [
    { label: "Redemptions at airport retail/mo", value: totals.totalRedemp.toLocaleString("nl-NL"), color: "#86efac" },
    { label: "Gross basket spend driven/mo",      value: fmt(totals.totalGross),               color: "#93c5fd" },
    { label: "DutyCredit discount given/mo",      value: `-${fmt(totals.totalFee)}`,            color: "#f87171" },
    { label: "Net new revenue for retailer/mo",   value: fmt(totals.totalGross - totals.totalFee), color: "#fb923c" },
  ];
  const retAnnual = [
    { label: "Redemptions at airport retail/yr", value: (totals.totalRedemp * 12).toLocaleString("nl-NL"), color: "#86efac" },
    { label: "Gross basket spend driven/yr",      value: fmt(totals.totalGross * 12),                 color: "#93c5fd" },
    { label: "DutyCredit discount given/yr",      value: `-${fmt(totals.totalFee * 12)}`,              color: "#f87171" },
    { label: "Net new revenue for retailer/yr",   value: fmt((totals.totalGross - totals.totalFee) * 12), color: "#fb923c" },
  ];
  [retMonthly, retAnnual].forEach((items, ci) => {
    const sx = M + ci * (retSumW + 4);
    const cardH = 8 + items.length * 9;
    bg("#1e293b", sx, py, retSumW, cardH, 2);
    txt(ci === 0 ? "Monthly Summary" : "Annual Projection (x12)", sx + 3, py + 6, ci === 0 ? "#94a3b8" : "#fb923c", 7, "bold");
    items.forEach((item, ii) => {
      const iy = py + 13 + ii * 9;
      txt(item.label, sx + 3, iy, "#64748b", 6.5);
      rtxt(item.value, sx + retSumW - 3, iy, item.color, 6.5, "bold");
    });
  });
  py += 8 + retMonthly.length * 9 + 6;

  // Per-company retailer table
  bg("#1e293b", M, py, W - M * 2, 8, 2);
  txt("Company (travel partner)",  M + 3,      py + 5.5, "#64748b", 6, "bold");
  rtxt("Redemptions/mo",            W - 120,    py + 5.5, "#64748b", 6, "bold");
  rtxt("Gross spend/mo",            W - 88,     py + 5.5, "#64748b", 6, "bold");
  rtxt("Discount given/mo",         W - 54,     py + 5.5, "#64748b", 6, "bold");
  rtxt("Net retailer gain/mo",      W - M,      py + 5.5, "#64748b", 6, "bold");
  py += 10;

  rows.forEach((r, idx) => {
    if (idx % 2 === 1) bg("#172035", M, py - 3, W - M * 2, 8, 0);
    txt(r.company_name.substring(0, 30),           M + 3,   py + 2, "#f8fafc", 6.5, "bold");
    rtxt(r.rev.totalRedemptions.toLocaleString("nl-NL"),   W - 120, py + 2, "#86efac", 6.5);
    rtxt(fmt(r.rev.grossRevenue),                   W - 88,  py + 2, "#93c5fd", 6.5);
    rtxt(`-${fmt(r.rev.dutyBoostFee)}`,             W - 54,  py + 2, "#f87171", 6.5);
    rtxt(fmt(r.rev.grossRevenue - r.rev.dutyBoostFee), W - M, py + 2, "#fb923c", 6.5, "bold");
    py += 8;
  });

  hline(py);
  py += 4;
  txt("TOTAL",                                           M + 3,   py + 2, "#f8fafc", 6.5, "bold");
  rtxt(totals.totalRedemp.toLocaleString("nl-NL"),               W - 120, py + 2, "#86efac", 6.5, "bold");
  rtxt(fmt(totals.totalGross),                            W - 88,  py + 2, "#93c5fd", 6.5, "bold");
  rtxt(`-${fmt(totals.totalFee)}`,                        W - 54,  py + 2, "#f87171", 6.5, "bold");
  rtxt(fmt(totals.totalGross - totals.totalFee),          W - M,   py + 2, "#fb923c", 6.5, "bold");
  py += 10;

  txt("Retailer net gain = extra footfall basket spend minus the DutyCredit discount. Discount funded by DutyBoost (2.5% of basket, max EUR25/tx). No upfront cost to the retailer.", M + 3, py, "#475569", 6);
  py += 10;

  // ════════════════════════════════════════════════════════
  // PAGE 3 — AMS Airport Potential
  // ════════════════════════════════════════════════════════
  if (airportSection) {
    newPage();
    let ap = 8;

    bg("#1a2240", M, ap, W - M * 2, 18, 3);
    txt("AMS Airport Potential — Combined Travel Partner Volume", M + 3, ap + 8, "#f8fafc", 10, "bold");
    txt(`Based on ${rows.length} verified travel partners | 10% redeem x 10% reach airport retail | EUR185 avg basket | 2.5% fee | EUR25 cap/tx`, M + 3, ap + 14, "#64748b", 6);
    ap += 22;

    // Annual data in a clear vertical list
    const apItems = [
      { label: "Partner bookings/yr (sum of verified monthly x12)", value: airportSection.partnerBookingsPerYear.toLocaleString("nl-NL"), color: "#fde047" },
      { label: "Redemptions at AMS retail/yr (10% x 10%)",          value: airportSection.redemptionsPerYear.toLocaleString("nl-NL"),    color: "#86efac" },
      { label: "Gross retail spend at AMS/yr",                       value: fmt(airportSection.grossPerYear),                     color: "#93c5fd" },
      { label: "DutyBoost fee pool/yr (2.5% of gross, max EUR25/tx)",value: fmt(airportSection.feePoolPerYear),                   color: "#d8b4fe" },
      { label: "Travel Partner commission/yr (20% of fee pool)",      value: fmt(airportSection.travelPartnerPerYear),             color: "#4ade80" },
      { label: "DutyBoost net revenue/yr (80% of fee pool)",          value: fmt(airportSection.dbNetPerYear),                    color: "#fde047" },
    ];

    bg("#1e293b", M, ap, W - M * 2, 8 + apItems.length * 10, 2);
    txt("Amsterdam Schiphol (AMS) — Annual Projection", M + 3, ap + 6, "#94a3b8", 7, "bold");
    apItems.forEach((item, ii) => {
      const iy = ap + 13 + ii * 10;
      hline(iy - 2);
      txt(item.label, M + 3, iy + 3, "#64748b", 6.5);
      rtxt(item.value, W - M - 3, iy + 3, item.color, 8, "bold");
    });
    ap += 8 + apItems.length * 10 + 8;

    // Also show per-company annual contribution
    bg("#1e293b", M, ap, W - M * 2, 8, 2);
    txt("Per-company annual contribution to AMS airport retail", M + 3, ap + 5.5, "#64748b", 6, "bold");
    rtxt("Partner bkgs/yr",  W - 126, ap + 5.5, "#64748b", 6, "bold");
    rtxt("Redemp/yr",        W - 94,  ap + 5.5, "#64748b", 6, "bold");
    rtxt("Gross spend/yr",   W - 62,  ap + 5.5, "#64748b", 6, "bold");
    rtxt("DB net/yr",        W - M,   ap + 5.5, "#64748b", 6, "bold");
    ap += 10;

    rows.forEach((r, idx) => {
      if (idx % 2 === 1) bg("#172035", M, ap - 3, W - M * 2, 8, 0);
      txt(r.company_name.substring(0, 28),                     M + 3,   ap + 2, "#f8fafc", 6.5, "bold");
      rtxt((r.rv.perMonth * 12).toLocaleString("nl-NL"),               W - 126, ap + 2, "#fde047", 6.5);
      rtxt((r.rev.totalRedemptions * 12).toLocaleString("nl-NL"),      W - 94,  ap + 2, "#86efac", 6.5);
      rtxt(fmt(r.rev.grossRevenue * 12),                        W - 62,  ap + 2, "#93c5fd", 6.5);
      rtxt(fmt(r.rev.dutyBoostNet * 12),                        W - M,   ap + 2, "#fde047", 6.5, "bold");
      ap += 8;
    });

    hline(ap);
    ap += 4;
    txt("TOTAL",                                                    M + 3,   ap + 2, "#f8fafc", 6.5, "bold");
    rtxt(airportSection.partnerBookingsPerYear.toLocaleString("nl-NL"),     W - 126, ap + 2, "#fde047", 6.5, "bold");
    rtxt(airportSection.redemptionsPerYear.toLocaleString("nl-NL"),         W - 94,  ap + 2, "#86efac", 6.5, "bold");
    rtxt(fmt(airportSection.grossPerYear),                           W - 62,  ap + 2, "#93c5fd", 6.5, "bold");
    rtxt(fmt(airportSection.dbNetPerYear),                           W - M,   ap + 2, "#fde047", 6.5, "bold");
  }

  doc.save(`dutyboost-global-potentials-${new Date().toISOString().slice(0,10)}.pdf`);
}

function exportToExcel(responses, filename, isRetailerView) {
  const rows = responses.map(r => ({
    "Date": r.created_date ? new Date(r.created_date).toLocaleDateString() : "",
    "Full Name": r.full_name || "",
    "Email": r.email || "",
    "Company": r.company_name || "",
    "Type": isRetailerView ? (r.company_type?.replace(RETAILER_PREFIX, "") || "") : (r.company_type || ""),
    "Website": r.company_website || "",
    "POS Provider": r.pos_provider || "",
    "Travel & Expense Platform": r.travel_platform || "",
    "Airport Retailers Served": Array.isArray(r.retailers_served) ? r.retailers_served.join(", ") : (r.retailers_served || ""),
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
    "POS Provider": r.pos_provider || "",
    "Travel & Expense Platform": r.travel_platform || "",
    "Airport Retailers Served": Array.isArray(r.retailers_served) ? r.retailers_served.join(", ") : (r.retailers_served || ""),
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
    allResponses.filter(r => isRetailer(r)).map(r => normalizeResponse(r)),
    [allResponses]
  );

  const partnerResponses = useMemo(() =>
    allResponses.filter(r => !isRetailer(r) && !isPosProvider(r) && !isCorporatePartner(r))
      .map(r => {
        const n = normalizeResponse(r);
        return { ...n, company_type: stripRolePrefix(n.company_type, "Travel Partner – ") };
      }),
    [allResponses]
  );

  const posResponses = useMemo(() =>
    allResponses.filter(r => isPosProvider(r))
      .map(r => {
        const n = normalizeResponse(r);
        return { ...n, company_type: stripRolePrefix(n.company_type, "POS Provider – ") };
      }),
    [allResponses]
  );

  const corporateResponses = useMemo(() =>
    allResponses.filter(r => isCorporatePartner(r))
      .map(r => {
        const n = normalizeResponse(r);
        return { ...n, company_type: stripRolePrefix(n.company_type, "Corporate Partner – ") };
      }),
    [allResponses]
  );

  const exportConfig = {
    retailer: { data: retailerResponses, isRetailerView: true, filename: "airport-retailer-survey-responses" },
    partner: { data: partnerResponses, isRetailerView: false, filename: "travel-partner-survey-responses" },
    pos: { data: posResponses, isRetailerView: false, filename: "pos-provider-survey-responses" },
    corporate: { data: corporateResponses, isRetailerView: false, filename: "corporate-partner-survey-responses" },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="text-center space-y-2 mb-4">
          <div className="flex justify-center mb-4">
            <img src="https://assets.dutyboost.com/dutyboost-logo-dark.png" alt="DutyBoost" style={{ height: '55px' }} />
          </div>
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs tracking-widest uppercase">
            Survey Analytics
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">DutyBoost Dashboard</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Validation dashboard — airport retailers, travel partners, POS providers and corporate partners.
          </p>
          <div className="pt-2 flex gap-2 flex-wrap justify-center">
            {["retailer", "partner", "pos", "corporate"].includes(activeTab) && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  className="gap-2 border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700"
                  onClick={() => {
                    const cfg = exportConfig[activeTab];
                    exportToExcel(cfg.data, `${cfg.filename}.xlsx`, cfg.isRetailerView);
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
                    const cfg = exportConfig[activeTab];
                    exportToCSV(cfg.data, `${cfg.filename}.csv`, cfg.isRetailerView);
                  }}
                  disabled={loading}
                >
                  <FileText className="w-4 h-4" /> CSV
                </Button>
              </>
            )}
            {activeTab === "global" && !loading && (
              <GlobalPotentialsPDFButton responses={partnerResponses} />
            )}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-1.5 overflow-x-auto">
          <div className="flex gap-1.5 min-w-max">
            <button
              onClick={() => setActiveTab("retailer")}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "retailer" ? "bg-orange-500 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Store className="w-3.5 h-3.5" /> Airport Retailer
              <span className="text-xs opacity-70">({retailerResponses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("partner")}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "partner" ? "bg-green-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Users className="w-3.5 h-3.5" /> Travel Partner
              <span className="text-xs opacity-70">({partnerResponses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("pos")}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "pos" ? "bg-violet-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Cpu className="w-3.5 h-3.5" /> POS Providers
              <span className="text-xs opacity-70">({posResponses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("corporate")}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "corporate" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Building2 className="w-3.5 h-3.5" /> Corporate Partners
              <span className="text-xs opacity-70">({corporateResponses.length})</span>
            </button>
            <button
              onClick={() => setActiveTab("global")}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "global" ? "bg-yellow-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" /> Global Potentials
            </button>
            <button
              onClick={() => setActiveTab("leads")}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "leads" ? "bg-blue-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <Phone className="w-3.5 h-3.5" /> Leads
            </button>
            <button
              onClick={() => setActiveTab("loi")}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "loi" ? "bg-indigo-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <FileText className="w-3.5 h-3.5" /> Signed LOIs
            </button>
            <button
              onClick={() => setActiveTab("traffic")}
              className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                activeTab === "traffic" ? "bg-teal-600 text-white shadow" : "text-slate-400 hover:text-white"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" /> Traffic
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
          </div>
        ) : activeTab === "retailer" ? (
          <RetailerDashboard responses={retailerResponses} />
        ) : activeTab === "partner" ? (
          <TravelPartnerDashboard responses={partnerResponses} />
        ) : activeTab === "pos" ? (
          <PosProviderDashboard responses={posResponses} />
        ) : activeTab === "corporate" ? (
          <CorporatePartnerDashboard responses={corporateResponses} />
        ) : activeTab === "leads" ? (
          <LeadsTab />
        ) : activeTab === "loi" ? (
          <LOITab />
        ) : activeTab === "traffic" ? (
          <TrafficDashboard />
        ) : (
          <GlobalPotentialsDashboard responses={partnerResponses} />
        )}

        <p className="text-center text-xs text-slate-600 pb-4">hello@dutyboost.com · www.dutyboost.com</p>
      </div>
    </div>
  );
}