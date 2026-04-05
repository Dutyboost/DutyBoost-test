import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MapPin, Search, UtensilsCrossed, Coffee, Wine, ShoppingBag, Star, Clock, X, ChevronRight } from "lucide-react";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const CATEGORIES = [
  { id: "all", label: "All", icon: ShoppingBag, color: "#6c5ce7" },
  { id: "coffee", label: "Coffee & Tea", icon: Coffee, color: "#f59e0b" },
  { id: "restaurant", label: "Restaurant", icon: UtensilsCrossed, color: "#10b981" },
  { id: "bar", label: "Bar & Lounge", icon: Wine, color: "#8b5cf6" },
  { id: "fastfood", label: "Fast Food", icon: UtensilsCrossed, color: "#ef4444" },
  { id: "bakery", label: "Bakery & Snacks", icon: ShoppingBag, color: "#f97316" },
];

const CAT_COLOR = {
  coffee: "#f59e0b",
  restaurant: "#10b981",
  bar: "#8b5cf6",
  fastfood: "#ef4444",
  bakery: "#f97316",
};

const NL_AIRPORTS = [
  {
    code: "AMS", name: "Amsterdam Schiphol", city: "Amsterdam",
    lat: 52.3105, lng: 4.7683,
    terminals: ["All Terminals", "Departure Hall 1", "Departure Hall 2", "Departure Hall 3", "Pier F", "Pier H"],
  },
  {
    code: "EIN", name: "Eindhoven Airport", city: "Eindhoven",
    lat: 51.4501, lng: 5.3746,
    terminals: ["All Terminals", "Departure Hall"],
  },
  {
    code: "RTM", name: "Rotterdam The Hague Airport", city: "Rotterdam",
    lat: 51.9569, lng: 4.4372,
    terminals: ["All Terminals", "Departure Lounge"],
  },
  {
    code: "GRQ", name: "Groningen Airport Eelde", city: "Groningen",
    lat: 53.1197, lng: 6.5794,
    terminals: ["All Terminals", "Departure Hall"],
  },
  {
    code: "MST", name: "Maastricht Aachen Airport", city: "Maastricht",
    lat: 50.9117, lng: 5.7701,
    terminals: ["All Terminals", "Departure Lounge"],
  },
  {
    code: "ENS", name: "Twente Airport", city: "Enschede",
    lat: 52.2758, lng: 6.8892,
    terminals: ["All Terminals", "Departure Hall"],
  },
];

const OUTLETS = [
  // AMS - Departure Hall 1
  { id: 1, airport: "AMS", terminal: "Departure Hall 1", name: "Starbucks Schiphol", category: "coffee", description: "Premium coffee, cold brews, and pastries. Perfect for that pre-flight pick-me-up.", hours: "04:30–23:00", rating: 4.3, lat: 52.3112, lng: 4.7660 },
  { id: 2, airport: "AMS", terminal: "Departure Hall 1", name: "La Place", category: "restaurant", description: "Fresh Dutch cuisine, salads, hot dishes and soups. Family-friendly with a buffet concept.", hours: "05:00–22:30", rating: 4.1, lat: 52.3108, lng: 4.7672 },
  { id: 3, airport: "AMS", terminal: "Departure Hall 1", name: "Broodje Bert", category: "bakery", description: "Traditional Dutch sandwiches, stroopwafels, and fresh baked goods since 1987.", hours: "05:30–21:00", rating: 4.4, lat: 52.3115, lng: 4.7655 },
  { id: 4, airport: "AMS", terminal: "Departure Hall 1", name: "Heineken Experience Bar", category: "bar", description: "Authentic Dutch pilsner on tap plus local craft beers and snack bites.", hours: "06:00–22:00", rating: 4.5, lat: 52.3106, lng: 4.7668 },

  // AMS - Departure Hall 2
  { id: 5, airport: "AMS", terminal: "Departure Hall 2", name: "Lavazza Café", category: "coffee", description: "Italian espresso bar with freshly brewed coffees, teas and light bites.", hours: "05:00–23:00", rating: 4.2, lat: 52.3100, lng: 4.7690 },
  { id: 6, airport: "AMS", terminal: "Departure Hall 2", name: "Burger King", category: "fastfood", description: "Flame-grilled burgers, chicken sandwiches and sides. Quick service for busy travelers.", hours: "05:00–23:00", rating: 3.8, lat: 52.3096, lng: 4.7695 },
  { id: 7, airport: "AMS", terminal: "Departure Hall 2", name: "Café Amsterdam", category: "restaurant", description: "Upscale Dutch bistro with stamppot, bitterballen, and seasonal specials.", hours: "06:00–21:30", rating: 4.3, lat: 52.3103, lng: 4.7700 },

  // AMS - Departure Hall 3
  { id: 8, airport: "AMS", terminal: "Departure Hall 3", name: "Costa Coffee", category: "coffee", description: "British coffee chain with flat whites, lattes and a wide snack selection.", hours: "04:45–22:30", rating: 4.0, lat: 52.3118, lng: 4.7710 },
  { id: 9, airport: "AMS", terminal: "Departure Hall 3", name: "Vapiano", category: "restaurant", description: "Fresh Italian pasta and pizza made to order. Watch your food being prepared live.", hours: "06:00–22:00", rating: 4.1, lat: 52.3122, lng: 4.7705 },
  { id: 10, airport: "AMS", terminal: "Departure Hall 3", name: "Amsterdam Lounge Bar", category: "bar", description: "Cocktails, wine and Dutch jenever in a sleek lounge setting.", hours: "07:00–22:00", rating: 4.4, lat: 52.3125, lng: 4.7698 },
  { id: 11, airport: "AMS", terminal: "Departure Hall 3", name: "Dunkin'", category: "bakery", description: "Donuts, muffins, bagels and hot drinks for a sweet start to your journey.", hours: "05:00–22:00", rating: 3.9, lat: 52.3119, lng: 4.7692 },

  // AMS - Pier F
  { id: 12, airport: "AMS", terminal: "Pier F", name: "Nespresso Boutique", category: "coffee", description: "Premium espresso bar with Nespresso machines and barista-crafted drinks.", hours: "05:00–21:00", rating: 4.6, lat: 52.3090, lng: 4.7720 },
  { id: 13, airport: "AMS", terminal: "Pier F", name: "KLM Crown Lounge Bistro", category: "restaurant", description: "Fine dining-level dishes and a full buffet for Schengen zone travelers.", hours: "05:30–22:30", rating: 4.7, lat: 52.3085, lng: 4.7715 },
  { id: 14, airport: "AMS", terminal: "Pier F", name: "De Vliegende Hollander", category: "bar", description: "Named after the Dutch legend — craft beers, wines and premium spirits.", hours: "07:00–21:00", rating: 4.5, lat: 52.3088, lng: 4.7726 },

  // AMS - Pier H
  { id: 15, airport: "AMS", terminal: "Pier H", name: "Espresso House", category: "coffee", description: "Scandinavian coffee culture meets Amsterdam. Specialty coffees and healthy snacks.", hours: "05:00–22:00", rating: 4.3, lat: 52.3075, lng: 4.7735 },
  { id: 16, airport: "AMS", terminal: "Pier H", name: "McDonald's", category: "fastfood", description: "The classic quick-service favourite with McCafé for hot drinks.", hours: "24/7", rating: 3.9, lat: 52.3070, lng: 4.7740 },
  { id: 17, airport: "AMS", terminal: "Pier H", name: "Rosso Bianco Trattoria", category: "restaurant", description: "Authentic Italian trattoria with fresh pasta, antipasti and Chianti.", hours: "06:00–21:30", rating: 4.4, lat: 52.3080, lng: 4.7730 },
  { id: 18, airport: "AMS", terminal: "Pier H", name: "PAUL Bakery", category: "bakery", description: "French artisan bakery with croissants, viennoiseries and patisserie.", hours: "05:30–21:00", rating: 4.5, lat: 52.3078, lng: 4.7725 },

  // EIN
  { id: 19, airport: "EIN", terminal: "Departure Hall", name: "Coffee Corner Eindhoven", category: "coffee", description: "Cozy coffee bar with local roasts and warm pastries.", hours: "04:00–21:00", rating: 4.1, lat: 51.4508, lng: 5.3752 },
  { id: 20, airport: "EIN", terminal: "Departure Hall", name: "Fly & Frites", category: "fastfood", description: "Dutch fries, krokets and bitterballen — the ultimate pre-flight snack.", hours: "04:30–21:30", rating: 4.2, lat: 51.4503, lng: 5.3760 },
  { id: 21, airport: "EIN", terminal: "Departure Hall", name: "Oranje Bar", category: "bar", description: "Local craft beers and cocktails. Dutch football on screens.", hours: "06:00–21:00", rating: 4.0, lat: 51.4496, lng: 5.3755 },
  { id: 22, airport: "EIN", terminal: "Departure Hall", name: "Bakker Bart", category: "bakery", description: "Famous Dutch bakery chain — fresh bread, sandwiches and sweets.", hours: "05:00–21:00", rating: 4.3, lat: 51.4512, lng: 5.3748 },

  // RTM
  { id: 23, airport: "RTM", terminal: "Departure Lounge", name: "Rotterdam Café", category: "coffee", description: "Specialty coffees and light meals with a Rotterdam harbour theme.", hours: "04:30–21:00", rating: 4.2, lat: 51.9574, lng: 4.4380 },
  { id: 24, airport: "RTM", terminal: "Departure Lounge", name: "Waterways Bistro", category: "restaurant", description: "Herring sandwiches, Dutch cheeses, and fresh hot lunches.", hours: "05:00–21:30", rating: 4.3, lat: 51.9578, lng: 4.4374 },
  { id: 25, airport: "RTM", terminal: "Departure Lounge", name: "Pilsener Club", category: "bar", description: "Local Rotterdam beers and snacks in a laid-back airport lounge.", hours: "06:00–20:30", rating: 4.1, lat: 51.9567, lng: 4.4365 },

  // GRQ
  { id: 26, airport: "GRQ", terminal: "Departure Hall", name: "Groninger Koffie", category: "coffee", description: "Northern Dutch coffee culture — strong brews and local speculaas.", hours: "05:00–20:00", rating: 4.0, lat: 53.1202, lng: 6.5800 },
  { id: 27, airport: "GRQ", terminal: "Departure Hall", name: "Noorderzon Restaurant", category: "restaurant", description: "Seasonal Groningen fare with regional produce and Dutch classics.", hours: "06:00–20:30", rating: 4.1, lat: 53.1195, lng: 6.5788 },

  // MST
  { id: 28, airport: "MST", terminal: "Departure Lounge", name: "Limburgse Koffie", category: "coffee", description: "Coffee with Limburg vlaai and local pastries.", hours: "05:00–20:00", rating: 4.2, lat: 50.9122, lng: 5.7708 },
  { id: 29, airport: "MST", terminal: "Departure Lounge", name: "Bistro Maas", category: "restaurant", description: "Regional cuisine featuring Limburg specialties and hearty Dutch meals.", hours: "06:00–20:00", rating: 4.0, lat: 50.9112, lng: 5.7695 },
  { id: 30, airport: "MST", terminal: "Departure Lounge", name: "Café Mergelland", category: "bar", description: "Wines and Dutch and Belgian beers in a relaxed lounge.", hours: "07:00–20:00", rating: 4.1, lat: 50.9118, lng: 5.7702 },

  // ENS
  { id: 31, airport: "ENS", terminal: "Departure Hall", name: "Twente Koffie", category: "coffee", description: "Regional coffee bar with local flavours and homemade cakes.", hours: "05:00–19:00", rating: 3.9, lat: 52.2762, lng: 6.8898 },
  { id: 32, airport: "ENS", terminal: "Departure Hall", name: "De Twentse Hoek", category: "restaurant", description: "Traditional Twente cuisine with seasonal specials.", hours: "06:00–19:00", rating: 4.0, lat: 52.2755, lng: 6.8886 },
];

function createOutletIcon(category) {
  const color = CAT_COLOR[category] || "#6c5ce7";
  return L.divIcon({
    html: `<div style="background:${color};width:28px;height:28px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
    className: "",
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -32],
  });
}

function MapFlyTo({ lat, lng, zoom = 14 }) {
  const map = useMap();
  map.setView([lat, lng], zoom);
  return null;
}

export default function AirportMap() {
  const [selectedAirport, setSelectedAirport] = useState(NL_AIRPORTS[0]);
  const [selectedTerminal, setSelectedTerminal] = useState("All Terminals");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedOutlet, setSelectedOutlet] = useState(null);
  const [departureOnly, setDepartureOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = OUTLETS.filter(o => o.airport === selectedAirport.code);
    if (departureOnly) list = list.filter(o => o.terminal.toLowerCase().includes("departure"));
    if (selectedTerminal !== "All Terminals") list = list.filter(o => o.terminal === selectedTerminal);
    if (selectedCategory !== "all") list = list.filter(o => o.category === selectedCategory);
    if (search.trim()) list = list.filter(o => o.name.toLowerCase().includes(search.toLowerCase()) || o.description.toLowerCase().includes(search.toLowerCase()));
    return list;
  }, [selectedAirport, selectedTerminal, selectedCategory, search, departureOnly]);

  const handleAirportSelect = (airport) => {
    setSelectedAirport(airport);
    setSelectedTerminal("All Terminals");
    setSelectedCategory("all");
    setSearch("");
    setSelectedOutlet(null);
  };

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-50">
        <Link to="/"><DutyBoostLogo height={130} /></Link>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs hidden sm:flex gap-1">
            <MapPin className="w-3 h-3" /> Netherlands F&B Map
          </Badge>
          <Link to="/voucher" className="text-sm text-muted-foreground hover:text-primary transition-colors hidden sm:block">
            My DutyCredit →
          </Link>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>

        {/* Left sidebar: airport list */}
        <aside className="w-full lg:w-72 border-r border-border bg-card flex flex-col overflow-hidden shrink-0">
          <div className="p-4 border-b border-border">
            <h1 className="font-heading font-bold text-base">Netherlands Airports</h1>
            <p className="text-xs text-muted-foreground mt-0.5">Select an airport to explore F&B outlets</p>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {NL_AIRPORTS.map(airport => {
              const count = OUTLETS.filter(o => o.airport === airport.code).length;
              const isSelected = selectedAirport.code === airport.code;
              return (
                <button
                  key={airport.code}
                  onClick={() => handleAirportSelect(airport)}
                  className={`w-full text-left rounded-xl px-4 py-3 transition-all ${isSelected ? "bg-primary text-primary-foreground shadow-sm" : "hover:bg-muted/60"}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold text-sm ${isSelected ? "text-primary-foreground" : ""}`}>{airport.name}</p>
                      <p className={`text-xs mt-0.5 ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>{airport.code} · {airport.city}</p>
                    </div>
                    <Badge className={`text-xs shrink-0 ${isSelected ? "bg-white/20 text-white border-white/30" : "bg-primary/10 text-primary border-primary/20"}`}>
                      {count} outlets
                    </Badge>
                  </div>
                </button>
              );
            })}
          </div>
        </aside>

        {/* Center: filters + outlet list */}
        <div className="w-full lg:w-96 border-r border-border bg-background flex flex-col overflow-hidden shrink-0">
          {/* Header */}
          <div className="p-4 border-b border-border space-y-3">
            <div>
              <h2 className="font-heading font-bold text-base">{selectedAirport.name}</h2>
              <p className="text-xs text-muted-foreground">{filtered.length} F&B outlet{filtered.length !== 1 ? "s" : ""} accepting DutyCredits</p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input className="pl-9 text-sm h-9" placeholder="Search outlets..." value={search} onChange={e => setSearch(e.target.value)} />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2">
                  <X className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground" />
                </button>
              )}
            </div>

            {/* Departure Only toggle */}
            <button
              onClick={() => setDepartureOnly(v => !v)}
              className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-medium transition-all w-full justify-center ${
                departureOnly ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"
              }`}
            >
              ✈️ Departure Areas Only
            </button>

            {/* Terminal tabs */}
            <div className="flex gap-1.5 flex-wrap">
              {selectedAirport.terminals.map(t => (
                <button
                  key={t}
                  onClick={() => setSelectedTerminal(t)}
                  className={`text-xs px-2.5 py-1 rounded-full border transition-all font-medium ${selectedTerminal === t ? "bg-primary text-primary-foreground border-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}
                >
                  {t === "All Terminals" ? "All" : t}
                </button>
              ))}
            </div>

            {/* Category filters */}
            <div className="flex gap-1.5 flex-wrap">
              {CATEGORIES.map(cat => {
                const Icon = cat.icon;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`flex items-center gap-1 text-xs px-2.5 py-1 rounded-full border transition-all font-medium ${selectedCategory === cat.id ? "text-white border-transparent" : "border-border text-muted-foreground hover:border-primary/40"}`}
                    style={selectedCategory === cat.id ? { background: cat.color, borderColor: cat.color } : {}}
                  >
                    <Icon className="w-3 h-3" />
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Outlet list */}
          <div className="flex-1 overflow-y-auto divide-y divide-border">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground text-sm">No outlets found for this filter</div>
            ) : (
              filtered.map(outlet => {
                const color = CAT_COLOR[outlet.category] || "#6c5ce7";
                const catLabel = CATEGORIES.find(c => c.id === outlet.category)?.label || outlet.category;
                const isSelected = selectedOutlet?.id === outlet.id;
                return (
                  <button
                    key={outlet.id}
                    onClick={() => setSelectedOutlet(isSelected ? null : outlet)}
                    className={`w-full text-left px-4 py-3.5 transition-all hover:bg-muted/40 ${isSelected ? "bg-primary/5 border-l-4 border-l-primary" : ""}`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: color }} />
                          <p className="font-semibold text-sm truncate">{outlet.name}</p>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">{outlet.terminal}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: color + "20", color }}>{catLabel}</span>
                          <span className="flex items-center gap-0.5 text-xs text-amber-500 font-medium">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" /> {outlet.rating}
                          </span>
                          <span className="flex items-center gap-0.5 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" /> {outlet.hours}
                          </span>
                        </div>
                      </div>
                      <ChevronRight className={`w-4 h-4 shrink-0 mt-1 transition-transform ${isSelected ? "rotate-90 text-primary" : "text-muted-foreground"}`} />
                    </div>

                    {isSelected && (
                      <div className="mt-3 pt-3 border-t border-border text-sm text-muted-foreground leading-relaxed">
                        {outlet.description}
                        <div className="mt-2">
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                            ✓ DutyCredits accepted
                          </span>
                        </div>
                      </div>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Map */}
        <div className="flex-1 relative min-h-64">
          <MapContainer
            key={selectedAirport.code}
            center={[selectedAirport.lat, selectedAirport.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
          >
            <MapFlyTo
              lat={selectedOutlet ? selectedOutlet.lat : selectedAirport.lat}
              lng={selectedOutlet ? selectedOutlet.lng : selectedAirport.lng}
              zoom={selectedOutlet ? 16 : 14}
            />
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filtered.map(outlet => (
              <Marker
                key={outlet.id}
                position={[outlet.lat, outlet.lng]}
                icon={createOutletIcon(outlet.category)}
                eventHandlers={{ click: () => setSelectedOutlet(outlet) }}
              >
                <Popup>
                  <div className="space-y-1 min-w-[180px]">
                    <p className="font-bold text-sm">{outlet.name}</p>
                    <p className="text-xs text-gray-500">{outlet.terminal}</p>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="flex items-center gap-0.5 text-amber-500 font-medium">
                        <Star style={{ width: 11, height: 11, fill: "#fbbf24" }} /> {outlet.rating}
                      </span>
                      <span className="text-gray-400">· {outlet.hours}</span>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{outlet.description}</p>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                      ✓ DutyCredits accepted
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>

          {/* Map overlay info */}
          <div className="absolute top-3 right-3 z-[400] pointer-events-none">
            <div className="bg-card/90 backdrop-blur border border-border rounded-xl px-3 py-2 shadow-lg text-xs space-y-1">
              <p className="font-semibold text-foreground">{selectedAirport.name}</p>
              <p className="text-muted-foreground">{filtered.length} outlet{filtered.length !== 1 ? "s" : ""} shown</p>
            </div>
          </div>

          {/* Category legend */}
          <div className="absolute bottom-4 left-3 z-[400] pointer-events-none">
            <div className="bg-card/90 backdrop-blur border border-border rounded-xl p-3 shadow-lg space-y-1.5">
              {CATEGORIES.filter(c => c.id !== "all").map(cat => (
                <div key={cat.id} className="flex items-center gap-2 text-xs">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: CAT_COLOR[cat.id] }} />
                  <span className="text-muted-foreground">{cat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}