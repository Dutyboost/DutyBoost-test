import { useMemo, useEffect } from "react";
import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const AIRPORT_META = {
  AMS: { name: "Amsterdam Schiphol", lat: 52.3105, lng: 4.7683, city: "Amsterdam" },
  CDG: { name: "Paris Charles de Gaulle", lat: 49.0097, lng: 2.5479, city: "Paris" },
  FRA: { name: "Frankfurt Airport", lat: 50.0379, lng: 8.5622, city: "Frankfurt" },
  LHR: { name: "London Heathrow", lat: 51.4700, lng: -0.4543, city: "London" },
  MUC: { name: "Munich Airport", lat: 48.3537, lng: 11.7750, city: "Munich" },
};

const SPEND_COLORS = [
  { min: 0,    max: 500,  color: "#22c55e", label: "Low (<€500)" },
  { min: 500,  max: 2000, color: "#f59e0b", label: "Medium (€500–2K)" },
  { min: 2000, max: Infinity, color: "#ef4444", label: "High (>€2K)" },
];

function getColor(spend) {
  return SPEND_COLORS.find(c => spend >= c.min && spend < c.max)?.color || "#6366f1";
}

function getRadius(spend, maxSpend) {
  return 12 + (spend / Math.max(maxSpend, 1)) * 28;
}

export default function CorporateAirportSpendMap({ transactions }) {
  // Aggregate approved spend per airport
  const airportStats = useMemo(() => {
    const stats = {};
    transactions.forEach(tx => {
      if (tx.status !== "approved") return;
      const code = tx.airport;
      if (!stats[code]) stats[code] = { code, total: 0, count: 0, travelers: new Set(), merchants: new Set() };
      stats[code].total += tx.amount;
      stats[code].count += 1;
      stats[code].travelers.add(tx.traveler);
      stats[code].merchants.add(tx.merchant);
    });
    return Object.values(stats).map(s => ({
      ...s,
      travelers: s.travelers.size,
      merchants: s.merchants.size,
      avg: s.total / s.count,
      meta: AIRPORT_META[s.code] || null,
    })).filter(s => s.meta);
  }, [transactions]);

  const maxSpend = Math.max(...airportStats.map(s => s.total), 1);
  const totalSpend = airportStats.reduce((s, a) => s + a.total, 0);

  return (
    <div className="space-y-5">
      {/* Summary cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: "Airports Active", value: airportStats.length },
          { label: "Total F&B Spend", value: `€${totalSpend.toFixed(2)}` },
          { label: "Busiest Airport", value: airportStats.sort((a,b) => b.total - a.total)[0]?.code || "—" },
          { label: "Avg per Transaction", value: airportStats.length ? `€${(totalSpend / airportStats.reduce((s,a)=>s+a.count,0)).toFixed(2)}` : "—" },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
            <p className="text-2xl font-heading font-bold text-primary">{value}</p>
            <p className="text-xs text-muted-foreground mt-1">{label}</p>
          </div>
        ))}
      </div>

      {/* Map + legend */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
          <div>
            <h2 className="font-heading font-semibold">F&B Spend by Airport</h2>
            <p className="text-xs text-muted-foreground mt-0.5">Bubble size and colour indicate total approved spend</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {SPEND_COLORS.map(({ color, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="w-3 h-3 rounded-full inline-block" style={{ background: color }} />
                {label}
              </div>
            ))}
          </div>
        </div>
        <div style={{ height: 420 }}>
          <MapContainer center={[50.5, 5.0]} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {airportStats.map(airport => (
              <CircleMarker
                key={airport.code}
                center={[airport.meta.lat, airport.meta.lng]}
                radius={getRadius(airport.total, maxSpend)}
                pathOptions={{
                  color: getColor(airport.total),
                  fillColor: getColor(airport.total),
                  fillOpacity: 0.55,
                  weight: 2,
                }}
              >
                <Tooltip permanent={false} direction="top" offset={[0, -8]}>
                  <div className="text-xs space-y-1 min-w-[160px]">
                    <p className="font-bold text-sm">{airport.code} — {airport.meta.city}</p>
                    <p>{airport.meta.name}</p>
                    <hr />
                    <p>Total spend: <strong>€{airport.total.toFixed(2)}</strong></p>
                    <p>Transactions: <strong>{airport.count}</strong></p>
                    <p>Avg per txn: <strong>€{airport.avg.toFixed(2)}</strong></p>
                    <p>Travelers: <strong>{airport.travelers}</strong></p>
                    <p>Merchants: <strong>{airport.merchants}</strong></p>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Airport breakdown table */}
      <div className="bg-card border border-border rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="font-heading font-semibold">Airport Spend Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40">
              <tr>{["Airport", "City", "Transactions", "Travelers", "Merchants", "Avg per Txn", "Total Spend", "Share"].map(h => (
                <th key={h} className="px-4 py-3 text-left text-xs font-medium text-muted-foreground">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-border">
              {[...airportStats].sort((a, b) => b.total - a.total).map(airport => {
                const share = ((airport.total / totalSpend) * 100).toFixed(1);
                return (
                  <tr key={airport.code} className="hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: getColor(airport.total) }} />
                        <span className="font-mono font-bold text-primary">{airport.code}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{airport.meta.city}</td>
                    <td className="px-4 py-3 font-semibold">{airport.count}</td>
                    <td className="px-4 py-3">{airport.travelers}</td>
                    <td className="px-4 py-3">{airport.merchants}</td>
                    <td className="px-4 py-3">€{airport.avg.toFixed(2)}</td>
                    <td className="px-4 py-3 font-bold text-green-700">€{airport.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                          <div className="h-full rounded-full" style={{ width: `${share}%`, background: getColor(airport.total) }} />
                        </div>
                        <span className="text-xs font-medium w-9 text-right">{share}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}