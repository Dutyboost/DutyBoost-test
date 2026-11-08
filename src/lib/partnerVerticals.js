import {
  Plane,
  Ship,
  TrainFront,
  Bus,
  Car,
  BedDouble,
  Store,
  Anchor,
  Waves,
  Route,
  TrainTrack,
  MapPin,
} from "lucide-react";

/**
 * The twelve partner dashboards. One account belongs to exactly one vertical,
 * so a flight partner never opens a cruise dashboard and an airport retailer
 * never opens a seaport one. Labels, accents and the flow term differ; the
 * dashboard itself is the same shell.
 */
export const PARTNER_VERTICALS = [
  // Travel partners — six ways of travelling.
  { key: "flight", side: "travel", label: "Flight Partner", icon: Plane, accent: "#2563EB", flowLabel: "Departing passengers" },
  { key: "cruise", side: "travel", label: "Cruise Partner", icon: Ship, accent: "#0E7490", flowLabel: "Cruise passengers" },
  { key: "train", side: "travel", label: "Rail Partner", icon: TrainFront, accent: "#7C3AED", flowLabel: "Rail passengers" },
  { key: "coach", side: "travel", label: "Coach Partner", icon: Bus, accent: "#B45309", flowLabel: "Coach passengers" },
  { key: "car_rental", side: "travel", label: "Car Rental Partner", icon: Car, accent: "#0369A1", flowLabel: "Rental days" },
  { key: "accommodation", side: "travel", label: "Accommodation Partner", icon: BedDouble, accent: "#BE185D", flowLabel: "Room nights" },
  // Travel retail partners — six retail channels.
  { key: "airport_retail", side: "retail", label: "Airport Retailer", icon: Store, accent: "#1D4ED8", flowLabel: "Airport footfall" },
  { key: "seaport_retail", side: "retail", label: "Sea Port Retailer", icon: Anchor, accent: "#0F766E", flowLabel: "Terminal footfall" },
  { key: "cruise_line_retail", side: "retail", label: "Cruise Line Retailer", icon: Waves, accent: "#155E75", flowLabel: "Onboard guests" },
  { key: "motorway_retail", side: "retail", label: "Motorway Retailer", icon: Route, accent: "#C2410C", flowLabel: "Service-area footfall" },
  { key: "railway_retail", side: "retail", label: "Railway Retailer", icon: TrainTrack, accent: "#6D28D9", flowLabel: "Station footfall" },
  { key: "local_retail", side: "retail", label: "Local Retailer", icon: MapPin, accent: "#047857", flowLabel: "Store footfall" },
];

export const VERTICAL_BY_KEY = PARTNER_VERTICALS.reduce((map, v) => {
  map[v.key] = v;
  return map;
}, {});

export const TRAVEL_VERTICALS = PARTNER_VERTICALS.filter((v) => v.side === "travel");
export const RETAIL_VERTICALS = PARTNER_VERTICALS.filter((v) => v.side === "retail");