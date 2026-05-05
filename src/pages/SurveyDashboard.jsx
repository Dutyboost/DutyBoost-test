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

const REDEMPTION_RATE = 0.15;   // 15% redemption rate
const MIN_BASKET    = 70;        // €70 minimum basket
const MAX_BASKET    = 300;       // €300 maximum basket
const AVG_BASKET    = 185;       // €185 average basket (midpoint of €70–€300)
const DISCOUNT      = 5;         // €5 DutyCredit discount given to traveler
const NET_BASKET    = AVG_BASKET - DISCOUNT; // €180 net basket
const FEE_RATE      = 0.025;     // 2.5% DutyBoost fee on net basket
const AGENCY_SHARE  = 0.20;      // 20% of DutyBoost fee to agency

function RevenueCalculator({ responses }) {
  // Aggregate monthly traveler volume across all respondents
  const buckets = {};
  let totalMonthlyBookings = 0;

  responses.forEach(r => {
    const raw = r.annual_bookings || "";
    const mapped = matchVolumeBucket(raw);
    if (mapped) {
      buckets[mapped.label] = (buckets[mapped.label] || 0) + 1;
      totalMonthlyBookings += mapped.monthly;
    } else {
      const custom = parseCustomVolume(raw);
      if (custom) {
        const lbl = `Custom (${raw})`;
        buckets[lbl] = (buckets[lbl] || 0) + 1;
        totalMonthlyBookings += custom;
      }
    }
  });

  const respondentsWithVolume = Object.values(buckets).reduce((s, v) => s + v, 0);
  const totalRedemptions   = Math.round(totalMonthlyBookings * REDEMPTION_RATE);
  const grossRevenue       = totalRedemptions * AVG_BASKET;
  const dutyBoostFee       = totalRedemptions * NET_BASKET * FEE_RATE;
  const agencyCommission   = dutyBoostFee * AGENCY_SHARE;
  const dutyBoostNet       = dutyBoostFee - agencyCommission;

  const fmt = (n) => `€${Math.round(n).toLocaleString()}`;

  return (
    <div className="bg-slate-800 border border-green-500/30 rounded-2xl p-5 space-y-5">
      <div>
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5">
          Potential Revenue — Survey Respondents Combined
        </h3>
        <p className="text-xs text-slate-400">
          Based on <span className="text-white">{respondentsWithVolume}</span> respondents with booking volume data ·{" "}
          <span className="text-white">{(REDEMPTION_RATE * 100).toFixed(0)}% redemption rate</span> ·{" "}
          <span className="text-white">€{AVG_BASKET} avg basket</span> (range: €{MIN_BASKET}–€{MAX_BASKET}) ·{" "}
          <span className="text-white">2.5% fee on €{NET_BASKET}</span>
        </p>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-900/60 rounded-xl p-3 text-center border border-slate-700">
          <p className="text-xs text-slate-400 mb-1">Monthly bookings</p>
          <p className="text-xl font-bold text-white">{totalMonthlyBookings.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-3 text-center border border-slate-700">
          <p className="text-xs text-slate-400 mb-1">Monthly redemptions</p>
          <p className="text-xl font-bold text-green-300">{totalRedemptions.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-3 text-center border border-slate-700">
          <p className="text-xs text-slate-400 mb-1">Gross retail spend (avg €{AVG_BASKET})</p>
          <p className="text-xl font-bold text-blue-300">{fmt(grossRevenue)}</p>
        </div>
        <div className="bg-slate-900/60 rounded-xl p-3 text-center border border-slate-700">
          <p className="text-xs text-slate-400 mb-1">DutyBoost fee pool</p>
          <p className="text-xl font-bold text-purple-300">{fmt(dutyBoostFee)}</p>
        </div>
      </div>

      {/* Value Ratio */}
      {dutyBoostFee > 0 && (
        <div className="bg-slate-900/40 border border-slate-600 rounded-xl px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <div>
            <span className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Value Ratio</span>
            <span className="ml-2 text-xs text-slate-500">(Gross retail spend ÷ DutyBoost fee pool)</span>
          </div>
          <span className="text-lg font-bold text-orange-300">
            For every €1 invested, DutyBoost generates €{Math.round(grossRevenue / dutyBoostFee)} in retail spend
          </span>
        </div>
      )}

      {/* Revenue split */}
      <div className="grid md:grid-cols-2 gap-3">
        <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4 space-y-1">
          <p className="text-xs text-green-400 uppercase tracking-widest font-semibold">Agency commission (20% of fee)</p>
          <p className="text-2xl font-bold text-green-300">{fmt(agencyCommission)} <span className="text-sm text-green-500">/mo</span></p>
          <p className="text-xs text-slate-400">Paid to travel partners for enabling redemptions</p>
        </div>
        <div className="bg-blue-900/30 border border-blue-500/30 rounded-xl p-4 space-y-1">
          <p className="text-xs text-blue-400 uppercase tracking-widest font-semibold">DutyBoost net revenue (80% of fee)</p>
          <p className="text-2xl font-bold text-blue-300">{fmt(dutyBoostNet)} <span className="text-sm text-blue-500">/mo</span></p>
          <p className="text-xs text-slate-400">After paying agency commissions</p>
        </div>
      </div>

      {/* Yearly totals */}
      <div className="bg-slate-900/60 border border-yellow-500/30 rounded-xl p-4">
        <p className="text-xs text-yellow-400 uppercase tracking-widest font-semibold mb-3">Yearly totals (×12)</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Redemptions/yr</p>
            <p className="text-lg font-bold text-white">{(totalRedemptions * 12).toLocaleString()}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Gross retail spend/yr</p>
            <p className="text-lg font-bold text-blue-300">{fmt(grossRevenue * 12)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">Agency commission/yr</p>
            <p className="text-lg font-bold text-green-300">{fmt(agencyCommission * 12)}</p>
          </div>
          <div className="text-center">
            <p className="text-xs text-slate-400 mb-1">DutyBoost net/yr</p>
            <p className="text-lg font-bold text-yellow-300">{fmt(dutyBoostNet * 12)}</p>
          </div>
        </div>
      </div>

      {/* Per-bucket breakdown */}
      <div>
        <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">Breakdown by volume bucket</p>
        <div className="space-y-1.5">
          {VOLUME_TO_MONTHLY.map(({ label, monthly }) => {
            const count = buckets[label] || 0;
            if (!count) return null;
            const bMonthly = count * monthly;
            const bRedem   = Math.round(bMonthly * REDEMPTION_RATE);
            const bGross   = bRedem * AVG_BASKET;
            const bFee     = bRedem * NET_BASKET * FEE_RATE;
            return (
              <div key={label} className="flex items-center justify-between text-xs bg-slate-900/40 rounded-lg px-3 py-2">
                <span className="text-slate-300 font-medium">{label}</span>
                <span className="text-slate-500">{count} respondent{count !== 1 ? "s" : ""}</span>
                <span className="text-slate-400">{bRedem.toLocaleString()} redemptions/mo</span>
                <span className="text-purple-300 font-semibold">{fmt(bFee)} fee/mo</span>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-xs text-slate-600 italic">
        Assumptions: upper bound of each monthly booking range used (potential reach) · {REDEMPTION_RATE * 100}% redemption rate · average basket €{AVG_BASKET} (min €{MIN_BASKET} / max €{MAX_BASKET}) · €{DISCOUNT} DutyCredit discount → €{NET_BASKET} net basket · 2.5% DutyBoost fee on €{NET_BASKET} = €{(NET_BASKET * FEE_RATE).toFixed(2)}/redemption · 20% of fee to agency
      </p>
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
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
          </div>
        ) : activeTab === "retailer" ? (
          <RetailerDashboard responses={retailerResponses} />
        ) : (
          <TravelPartnerDashboard responses={partnerResponses} />
        )}

        <p className="text-center text-xs text-slate-600 pb-4">hello@dutyboost.com · www.dutyboost.com</p>
      </div>
    </div>
  );
}