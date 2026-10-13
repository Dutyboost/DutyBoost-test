import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const ports = [
  { name: "Barcelona", country: "Spain", lat: 41.3874, lng: 2.1686, redemptions: 428 },
  { name: "Civitavecchia (Rome)", country: "Italy", lat: 42.0924, lng: 11.7960, redemptions: 316 },
  { name: "Naples", country: "Italy", lat: 40.8518, lng: 14.2681, redemptions: 241 },
  { name: "Dubrovnik", country: "Croatia", lat: 42.6507, lng: 18.0944, redemptions: 187 },
  { name: "Valletta", country: "Malta", lat: 35.8989, lng: 14.5146, redemptions: 156 },
  { name: "Palma de Mallorca", country: "Spain", lat: 39.5696, lng: 2.6502, redemptions: 133 },
  { name: "Piraeus (Athens)", country: "Greece", lat: 37.9420, lng: 23.6465, redemptions: 118 },
  { name: "Marseille", country: "France", lat: 43.2965, lng: 5.3698, redemptions: 94 },
];

const getColor = (redemptions) => {
  if (redemptions >= 300) return "#1F6FFF";
  if (redemptions >= 200) return "#3b82f6";
  if (redemptions >= 120) return "#60a5fa";
  return "#a5c8ff";
};

const getRadius = (redemptions) => {
  if (redemptions >= 300) return 18;
  if (redemptions >= 200) return 14;
  if (redemptions >= 120) return 11;
  return 8;
};

export default function CruisePortCallMap() {
  return (
    <div className="rounded-xl overflow-hidden border border-border" style={{ height: 380 }}>
      <MapContainer center={[40.5, 12.0]} zoom={4} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {ports.map((p) => (
          <CircleMarker
            key={p.name}
            center={[p.lat, p.lng]}
            radius={getRadius(p.redemptions)}
            pathOptions={{ color: getColor(p.redemptions), fillColor: getColor(p.redemptions), fillOpacity: 0.7, weight: 2 }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <div className="text-xs font-semibold">{p.name}</div>
              <div className="text-xs text-gray-500">{p.country} · {p.redemptions} redemptions</div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}