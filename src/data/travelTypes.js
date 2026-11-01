/**
 * The ways a traveller can reach the shops where a DutyCredit is redeemable.
 * Labels live in i18n under `claimDutyCredit.verticals.<id>.*` so the whole
 * claim form re-labels itself when the traveller picks a different way of travel.
 */
import { Plane, Ship, TrainFront, Bus, Car, BedDouble } from "lucide-react";
import { COUNTRY_TERMINALS } from "./cruiseTerminals";
import { RAIL_OPERATORS } from "./railOperators";
import { COACH_STATIONS } from "./coachStations";
import { GLOBAL_AIRPORTS } from "./globalAirports";

// Departure airports, from the global airport directory (busiest first).
export const DEPARTURE_AIRPORTS = GLOBAL_AIRPORTS.map((a) => ({
  name: a.name,
  code: a.code,
  city: a.city,
  country: a.country,
}));

// Cruise ports, flattened from the country → terminals map.
export const CRUISE_PORTS = Object.entries(COUNTRY_TERMINALS).flatMap(([country, ports]) =>
  ports.map((name) => ({ name, country }))
);

// Rail stations, taken from the hubs of every operator in the rail directory.
const stationMap = new Map();
RAIL_OPERATORS.forEach((op) => {
  (op.hubs || []).forEach((hub) => {
    if (!stationMap.has(hub)) stationMap.set(hub, { name: hub, country: op.country });
  });
});

export const RAIL_STATIONS = [...stationMap.values()].sort((a, b) =>
  a.name.localeCompare(b.name)
);

// `options` present = searchable hub list; absent = free-text location.
export const TRAVEL_TYPES = [
  { id: "flight", icon: Plane, options: DEPARTURE_AIRPORTS },
  { id: "cruise", icon: Ship, options: CRUISE_PORTS },
  { id: "train", icon: TrainFront, options: RAIL_STATIONS },
  { id: "coach", icon: Bus, options: COACH_STATIONS },
  { id: "car_rental", icon: Car, options: DEPARTURE_AIRPORTS },
  { id: "accommodation", icon: BedDouble, options: null },
];