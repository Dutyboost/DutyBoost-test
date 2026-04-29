import { MapContainer, TileLayer, CircleMarker, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const stations = [
  { name: "Amsterdam Centraal", lat: 52.3791, lng: 4.9003, redemptions: 312, operator: "NS" },
  { name: "Paris Gare du Nord", lat: 48.8809, lng: 2.3553, redemptions: 487, operator: "SNCF" },
  { name: "Brussels Midi", lat: 50.8358, lng: 4.3360, redemptions: 198, operator: "Eurostar" },
  { name: "London St Pancras", lat: 51.5322, lng: -0.1237, redemptions: 541, operator: "Eurostar" },
  { name: "Frankfurt Hbf", lat: 50.1069, lng: 8.6631, redemptions: 267, operator: "DB" },
  { name: "Rotterdam Centraal", lat: 51.9249, lng: 4.4689, redemptions: 144, operator: "NS" },
  { name: "Cologne Hbf", lat: 50.9430, lng: 6.9587, redemptions: 189, operator: "DB" },
  { name: "Lille Europe", lat: 50.6390, lng: 3.0740, redemptions: 95, operator: "SNCF" },
];

const getColor = (redemptions) => {
  if (redemptions >= 400) return "#1F6FFF";
  if (redemptions >= 200) return "#6366f1";
  return "#a78bfa";
};

const getRadius = (redemptions) => {
  if (redemptions >= 400) return 18;
  if (redemptions >= 200) return 13;
  return 9;
};

export default function TrainStationMap() {
  return (
    <div className="rounded-xl overflow-hidden border border-border" style={{ height: 380 }}>
      <MapContainer center={[51.0, 4.5]} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom={false}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />
        {stations.map((s) => (
          <CircleMarker
            key={s.name}
            center={[s.lat, s.lng]}
            radius={getRadius(s.redemptions)}
            pathOptions={{ color: getColor(s.redemptions), fillColor: getColor(s.redemptions), fillOpacity: 0.7, weight: 2 }}
          >
            <Tooltip direction="top" offset={[0, -8]} opacity={1}>
              <div className="text-xs font-semibold">{s.name}</div>
              <div className="text-xs text-gray-500">{s.operator} · {s.redemptions} redemptions</div>
            </Tooltip>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}