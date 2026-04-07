import { useState, useMemo } from "react";
import { MapPin, TrendingUp, Info } from "lucide-react";

// Airport terminal schematic layouts (SVG-based)
const TERMINAL_LAYOUTS = {
  AMS: {
    name: "Amsterdam Schiphol",
    width: 700,
    height: 340,
    terminals: [
      { id: "T1-D", label: "Terminal D", x: 20, y: 20, w: 180, h: 90, zone: "Departures" },
      { id: "T1-E", label: "Terminal E", x: 220, y: 20, w: 180, h: 90, zone: "Departures" },
      { id: "T1-F", label: "Terminal F", x: 420, y: 20, w: 130, h: 90, zone: "Departures" },
      { id: "T1-C", label: "Terminal C", x: 20, y: 130, w: 130, h: 90, zone: "Shops" },
      { id: "PLAZA", label: "Schiphol Plaza", x: 170, y: 130, w: 220, h: 90, zone: "Retail" },
      { id: "T1-B", label: "Terminal B", x: 410, y: 130, w: 140, h: 90, zone: "Shops" },
      { id: "ARR-1", label: "Arrivals Hall 1", x: 20, y: 240, w: 310, h: 80, zone: "Arrivals" },
      { id: "ARR-2", label: "Arrivals Hall 2", x: 350, y: 240, w: 200, h: 80, zone: "Arrivals" },
    ]
  },
  RTM: {
    name: "Rotterdam The Hague",
    width: 700,
    height: 280,
    terminals: [
      { id: "DEP-A", label: "Departure A", x: 20, y: 20, w: 200, h: 100, zone: "Departures" },
      { id: "DEP-B", label: "Departure B", x: 240, y: 20, w: 200, h: 100, zone: "Departures" },
      { id: "DEP-C", label: "Departure C", x: 460, y: 20, w: 200, h: 100, zone: "Departures" },
      { id: "MAIN-SHOPS", label: "Main Shopping", x: 20, y: 140, w: 420, h: 100, zone: "Retail" },
      { id: "GATE-LOUNGE", label: "Gate Lounge", x: 460, y: 140, w: 200, h: 100, zone: "Shops" },
    ]
  },
  EIN: {
    name: "Eindhoven Airport",
    width: 700,
    height: 260,
    terminals: [
      { id: "T1", label: "Terminal 1", x: 20, y: 20, w: 300, h: 100, zone: "Departures" },
      { id: "T2", label: "Terminal 2", x: 340, y: 20, w: 320, h: 100, zone: "Departures" },
      { id: "DUTY", label: "Duty Free Zone", x: 20, y: 140, w: 220, h: 90, zone: "Retail" },
      { id: "FOOD", label: "Food & Beverage", x: 260, y: 140, w: 200, h: 90, zone: "Food" },
      { id: "RETAIL", label: "Retail Row", x: 480, y: 140, w: 180, h: 90, zone: "Retail" },
    ]
  },
  BRU: {
    name: "Brussels Airport",
    width: 700,
    height: 300,
    terminals: [
      { id: "PIER-A", label: "Pier A", x: 20, y: 20, w: 150, h: 90, zone: "Departures" },
      { id: "PIER-B", label: "Pier B", x: 190, y: 20, w: 150, h: 90, zone: "Departures" },
      { id: "PIER-C", label: "Pier C", x: 360, y: 20, w: 150, h: 90, zone: "Departures" },
      { id: "PIER-D", label: "Pier D", x: 530, y: 20, w: 150, h: 90, zone: "Departures" },
      { id: "DEP-SHOPS", label: "Departure Shops", x: 20, y: 130, w: 330, h: 80, zone: "Retail" },
      { id: "LOUNGE", label: "Lounge Area", x: 370, y: 130, w: 310, h: 80, zone: "Shops" },
      { id: "ARR", label: "Arrivals", x: 20, y: 230, w: 660, h: 50, zone: "Arrivals" },
    ]
  },
};

const ZONE_BASE_COLORS = {
  Departures: [59, 130, 246],
  Retail: [249, 115, 22],
  Shops: [234, 88, 12],
  Food: [16, 185, 129],
  Arrivals: [139, 92, 246],
};

// Empty redemption data—only show real voucher data
const STORE_REDEMPTIONS = {
  AMS: {},
  RTM: {},
  EIN: {},
  BRU: {},
};

function getHeatColor(value, max, baseRGB) {
  const intensity = max > 0 ? value / max : 0;
  const alpha = 0.15 + intensity * 0.72;
  return `rgba(${baseRGB[0]}, ${baseRGB[1]}, ${baseRGB[2]}, ${alpha.toFixed(2)})`;
}

function getBorderColor(value, max, baseRGB) {
  const intensity = max > 0 ? value / max : 0;
  const alpha = 0.3 + intensity * 0.7;
  return `rgba(${baseRGB[0]}, ${baseRGB[1]}, ${baseRGB[2]}, ${alpha.toFixed(2)})`;
}

export default function RedemptionHeatmap({ vouchers = [], compact = false }) {
  const [selectedAirport, setSelectedAirport] = useState("AMS");
  const [hoveredZone, setHoveredZone] = useState(null);

  const airports = Object.keys(TERMINAL_LAYOUTS);

  // Merge real voucher data with simulated if available
  const liveRedemptionsByZone = useMemo(() => {
    if (!vouchers.length) return null;
    const byAirport = {};
    vouchers.forEach(v => {
      if (v.status === "redeemed" && v.airport) {
        byAirport[v.airport] = (byAirport[v.airport] || 0) + 1;
      }
    });
    return byAirport;
  }, [vouchers]);

  const layout = TERMINAL_LAYOUTS[selectedAirport];
  const baseData = STORE_REDEMPTIONS[selectedAirport] || {};

  // Scale simulated data if we have real airport-level totals
  const redemptions = useMemo(() => {
    if (!liveRedemptionsByZone || !liveRedemptionsByZone[selectedAirport]) return baseData;
    const simTotal = Object.values(baseData).reduce((s, v) => s + v, 0);
    const realTotal = liveRedemptionsByZone[selectedAirport];
    if (simTotal === 0) return baseData;
    const scale = realTotal / simTotal;
    return Object.fromEntries(Object.entries(baseData).map(([k, v]) => [k, Math.round(v * scale)]));
  }, [baseData, liveRedemptionsByZone, selectedAirport]);

  const maxVal = Math.max(...Object.values(redemptions), 1);
  const totalRedemptions = Object.values(redemptions).reduce((s, v) => s + v, 0);

  const topZones = [...layout.terminals]
    .map(t => ({ ...t, count: redemptions[t.id] || 0 }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-5">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h2 className="font-heading font-semibold text-base flex items-center gap-2">
            <MapPin className="w-4 h-4 text-primary" /> Redemption Heatmap by Terminal Zone
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">Color intensity reflects relative redemption volume per zone</p>
        </div>
        <div className="flex gap-1.5 flex-wrap">
          {airports.map(code => (
            <button key={code} onClick={() => setSelectedAirport(code)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-all font-medium ${
                selectedAirport === code
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background border-border hover:border-primary/50 text-muted-foreground"
              }`}>
              {code}
            </button>
          ))}
        </div>
      </div>

      {/* Top zones strip */}
      <div className="grid grid-cols-3 gap-3">
        {topZones.map((zone, i) => {
          const baseRGB = ZONE_BASE_COLORS[zone.zone] || [59, 130, 246];
          const medals = ["🥇", "🥈", "🥉"];
          return (
            <div key={zone.id} className="rounded-lg border border-border p-3 text-center space-y-1"
              style={{ background: getHeatColor(zone.count, maxVal, baseRGB) }}>
              <p className="text-lg">{medals[i]}</p>
              <p className="text-xs font-semibold leading-tight">{zone.label}</p>
              <p className="text-lg font-heading font-bold">{zone.count.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground">redemptions</p>
            </div>
          );
        })}
      </div>

      {/* SVG Terminal Map */}
      <div className="relative overflow-x-auto">
        <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
          <Info className="w-3 h-3" /> {layout.name} — Schematic View
        </p>
        <svg
          viewBox={`0 0 ${layout.width} ${layout.height}`}
          className="w-full border border-border rounded-lg bg-muted/20"
          style={{ minWidth: compact ? 320 : 480, maxHeight: 320 }}
        >
          {/* Runway / taxiway background lines */}
          <line x1="0" y1={layout.height - 5} x2={layout.width} y2={layout.height - 5} stroke="hsl(var(--border))" strokeWidth="3" strokeDasharray="12 6" />

          {layout.terminals.map(zone => {
            const count = redemptions[zone.id] || 0;
            const baseRGB = ZONE_BASE_COLORS[zone.zone] || [59, 130, 246];
            const fill = getHeatColor(count, maxVal, baseRGB);
            const stroke = getBorderColor(count, maxVal, baseRGB);
            const isHovered = hoveredZone === zone.id;
            const pct = maxVal > 0 ? Math.round((count / maxVal) * 100) : 0;

            return (
              <g key={zone.id}
                onMouseEnter={() => setHoveredZone(zone.id)}
                onMouseLeave={() => setHoveredZone(null)}
                style={{ cursor: "pointer" }}>
                <rect
                  x={zone.x} y={zone.y} width={zone.w} height={zone.h}
                  rx={6} ry={6}
                  fill={fill}
                  stroke={isHovered ? `rgba(${baseRGB[0]},${baseRGB[1]},${baseRGB[2]},1)` : stroke}
                  strokeWidth={isHovered ? 2.5 : 1.5}
                />
                {/* Zone label */}
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 - 8}
                  textAnchor="middle"
                  fontSize="10"
                  fontWeight="600"
                  fill="hsl(var(--foreground))"
                  opacity={0.85}
                >
                  {zone.label.length > 16 ? zone.label.slice(0, 15) + "…" : zone.label}
                </text>
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 + 8}
                  textAnchor="middle"
                  fontSize="13"
                  fontWeight="700"
                  fill="hsl(var(--foreground))"
                >
                  {count.toLocaleString()}
                </text>
                <text
                  x={zone.x + zone.w / 2}
                  y={zone.y + zone.h / 2 + 22}
                  textAnchor="middle"
                  fontSize="9"
                  fill="hsl(var(--muted-foreground))"
                >
                  {zone.zone} · {pct}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-3 flex-wrap">
          {Object.entries(ZONE_BASE_COLORS).map(([zone, rgb]) => (
            <div key={zone} className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.7)` }} />
              <span className="text-xs text-muted-foreground">{zone}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Low</span>
          <div className="flex gap-0.5">
            {[0.15, 0.3, 0.5, 0.7, 0.87].map((o, i) => (
              <div key={i} className="w-5 h-3 rounded-sm" style={{ backgroundColor: `rgba(59,130,246,${o})` }} />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">High</span>
        </div>
      </div>

      {/* Insights */}
      <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 space-y-2">
        <p className="text-sm font-semibold flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-primary" /> Partnership Strategy Insights
        </p>
        <ul className="space-y-1.5">
          <li className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-primary font-bold mt-0.5">↑</span>
            <span><strong className="text-foreground">{topZones[0]?.label}</strong> is the top-performing zone with {topZones[0]?.count.toLocaleString()} redemptions — priority area for additional partner onboarding.</span>
          </li>
          <li className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">◎</span>
            <span>Low-intensity zones indicate untapped retail potential — consider targeted partner recruitment to capture existing traveler traffic.</span>
          </li>
          <li className="text-xs text-muted-foreground flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-0.5">✦</span>
            <span>Total {totalRedemptions.toLocaleString()} redemptions at {layout.name} — {Math.round((topZones[0]?.count / totalRedemptions) * 100)}% concentrated in top zone.</span>
          </li>
        </ul>
      </div>
    </div>
  );
}