import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { base44 } from "@/api/base44Client";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";
import { Store, MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

// Fix default leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const AIRPORTS = [
  { name: "Amsterdam Schiphol", code: "AMS", lat: 52.3105, lng: 4.7683, country: "Netherlands" },
  { name: "London Heathrow", code: "LHR", lat: 51.4700, lng: -0.4543, country: "United Kingdom" },
  { name: "Paris Charles de Gaulle", code: "CDG", lat: 49.0097, lng: 2.5479, country: "France" },
  { name: "Frankfurt Airport", code: "FRA", lat: 50.0379, lng: 8.5622, country: "Germany" },
  { name: "Dubai International", code: "DXB", lat: 25.2532, lng: 55.3657, country: "UAE" },
  { name: "Singapore Changi", code: "SIN", lat: 1.3644, lng: 103.9915, country: "Singapore" },
  { name: "New York JFK", code: "JFK", lat: 40.6413, lng: -73.7781, country: "United States" },
  { name: "Barcelona El Prat", code: "BCN", lat: 41.2971, lng: 2.0785, country: "Spain" },
];

const CATEGORY_COLORS = {
  "Duty-free": "#6c5ce7",
  "Food": "#f59e0b",
  "Retail": "#10b981",
};

const CATEGORY_LABELS = {
  "Duty-free": "Duty-Free",
  "Food": "Food & Drink",
  "Retail": "Retail",
};

function createRetailerIcon(category) {
  const color = CATEGORY_COLORS[category] || "#6c5ce7";
  return L.divIcon({
    html: `<div style="
      background:${color};
      width:32px;height:32px;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      border:3px solid white;
      box-shadow:0 2px 8px rgba(0,0,0,0.3);
    "></div>`,
    className: "",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -36],
  });
}

// Spread retailers around the airport with pseudo-random offsets
function getRetailerPosition(airport, index, total) {
  const spread = 0.012;
  const angle = (index / Math.max(total, 1)) * 2 * Math.PI;
  const radius = spread * (0.4 + (index % 3) * 0.3);
  return [
    airport.lat + Math.sin(angle) * radius,
    airport.lng + Math.cos(angle) * radius,
  ];
}

export default function AirportMap() {
  const [retailers, setRetailers] = useState([]);
  const [selectedAirport, setSelectedAirport] = useState(AIRPORTS[0]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Retailer.filter({ accepts_vouchers: true }).then((data) => {
      setRetailers(data);
      setLoading(false);
    });
  }, []);

  const filteredAirports = AIRPORTS.filter((a) =>
    a.name.toLowerCase().includes(search.toLowerCase()) ||
    a.code.toLowerCase().includes(search.toLowerCase()) ||
    a.country.toLowerCase().includes(search.toLowerCase())
  );

  // Match retailers to selected airport by name/code
  const airportRetailers = retailers.filter((r) => {
    if (!r.airport) return false;
    const ap = r.airport.toLowerCase();
    return (
      ap.includes(selectedAirport.code.toLowerCase()) ||
      ap.includes(selectedAirport.name.toLowerCase().split(" ")[0])
    );
  });

  const categoryCount = airportRetailers.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background font-body flex flex-col">
      {/* Nav */}
      <nav className="border-b border-border px-6 h-16 flex items-center justify-between sticky top-0 bg-background/95 backdrop-blur z-50">
        <Link to="/"><DutyBoostLogo height={130} /></Link>
        <div className="flex items-center gap-3">
          <Badge variant="outline" className="text-xs hidden sm:flex">
            <MapPin className="w-3 h-3 mr-1" /> Airport Retailer Map
          </Badge>
          <Link to="/voucher" className="text-sm text-muted-foreground hover:text-primary transition-colors">
            My DutyCredit →
          </Link>
        </div>
      </nav>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
        {/* Sidebar */}
        <aside className="w-full lg:w-80 border-r border-border bg-card flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border space-y-3">
            <div>
              <h1 className="font-heading font-bold text-lg">Airport Retailer Map</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Find stores accepting DutyCredits</p>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                className="pl-9 text-sm"
                placeholder="Search airports..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          {/* Airport list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1">
            {filteredAirports.map((airport) => {
              const count = retailers.filter((r) => {
                if (!r.airport) return false;
                const ap = r.airport.toLowerCase();
                return ap.includes(airport.code.toLowerCase()) || ap.includes(airport.name.toLowerCase().split(" ")[0]);
              }).length;
              const isSelected = selectedAirport.code === airport.code;
              return (
                <button
                  key={airport.code}
                  onClick={() => setSelectedAirport(airport)}
                  className={`w-full text-left rounded-xl px-4 py-3 transition-all ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-sm"
                      : "hover:bg-muted/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`font-semibold text-sm ${isSelected ? "text-primary-foreground" : ""}`}>
                        {airport.name}
                      </p>
                      <p className={`text-xs mt-0.5 ${isSelected ? "text-primary-foreground/70" : "text-muted-foreground"}`}>
                        {airport.code} · {airport.country}
                      </p>
                    </div>
                    <Badge
                      className={`text-xs shrink-0 ${
                        isSelected
                          ? "bg-white/20 text-white border-white/30"
                          : count > 0
                          ? "bg-primary/10 text-primary border-primary/20"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {loading ? "…" : count} {count === 1 ? "store" : "stores"}
                    </Badge>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="p-4 border-t border-border space-y-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Store Categories</p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(CATEGORY_COLORS).map(([cat, color]) => (
                <div key={cat} className="flex items-center gap-1.5 text-xs">
                  <div className="w-3 h-3 rounded-full shrink-0" style={{ background: color }} />
                  <span className="text-muted-foreground">{CATEGORY_LABELS[cat]}</span>
                  {categoryCount[cat] && <span className="font-semibold">({categoryCount[cat]})</span>}
                </div>
              ))}
            </div>
          </div>
        </aside>

        {/* Map */}
        <div className="flex-1 relative">
          {/* Airport info overlay */}
          <div className="absolute top-4 left-4 right-4 z-[400] pointer-events-none">
            <div className="bg-card/90 backdrop-blur border border-border rounded-xl px-4 py-3 shadow-lg max-w-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0" />
                <div>
                  <p className="font-heading font-bold text-sm">{selectedAirport.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {loading ? "Loading retailers…" : airportRetailers.length > 0
                      ? `${airportRetailers.length} participating retailer${airportRetailers.length !== 1 ? "s" : ""}`
                      : "No registered retailers yet at this airport"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <MapContainer
            key={selectedAirport.code}
            center={[selectedAirport.lat, selectedAirport.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Airport highlight area */}
            <Circle
              center={[selectedAirport.lat, selectedAirport.lng]}
              radius={800}
              pathOptions={{ color: "#6c5ce7", fillColor: "#6c5ce7", fillOpacity: 0.05, weight: 1.5, dashArray: "6 4" }}
            />

            {/* Retailer markers */}
            {airportRetailers.map((retailer, i) => {
              const pos = getRetailerPosition(selectedAirport, i, airportRetailers.length);
              const color = CATEGORY_COLORS[retailer.category] || "#6c5ce7";
              return (
                <Marker
                  key={retailer.id}
                  position={pos}
                  icon={createRetailerIcon(retailer.category)}
                >
                  <Popup>
                    <div className="space-y-1 min-w-[160px]">
                      <p className="font-bold text-sm">{retailer.store_name}</p>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full" style={{ background: color }} />
                        <span className="text-xs text-gray-500">{CATEGORY_LABELS[retailer.category] || retailer.category}</span>
                      </div>
                      {retailer.description && (
                        <p className="text-xs text-gray-500 leading-relaxed">{retailer.description}</p>
                      )}
                      <div className="pt-1">
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                          <Store style={{ width: 10, height: 10 }} />
                          DutyCredits accepted
                        </span>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </div>
    </div>
  );
}