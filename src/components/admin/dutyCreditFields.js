import { Plane, Ship, TrainFront, Bus, Car, BedDouble, Layers } from "lucide-react";

export const VERTICALS = [
  { id: "all", label: "All travel types", icon: Layers },
  { id: "flight", label: "Plane", icon: Plane },
  { id: "cruise", label: "Cruise", icon: Ship },
  { id: "train", label: "Train", icon: TrainFront },
  { id: "coach", label: "Coach", icon: Bus },
  { id: "car_rental", label: "Car rental", icon: Car },
  { id: "accommodation", label: "Accommodation", icon: BedDouble },
];

export const VERTICAL_LABELS = {
  flight: "Plane",
  cruise: "Cruise",
  train: "Train",
  coach: "Coach",
  car_rental: "Car rental",
  accommodation: "Accommodation",
};

// What each stored field means for the chosen way of travel.
export const VERTICAL_FIELDS = {
  flight: { carrier: "Airline", location: "Departure airport" },
  cruise: { carrier: "Cruise line", location: "Departure port" },
  train: { carrier: "Rail operator", location: "Departure station" },
  coach: { carrier: "Coach operator", location: "Departure station" },
  car_rental: { carrier: "Rental company", location: "Pick-up airport", returnLocation: "Return airport" },
  accommodation: { carrier: "Hotel / chain", location: "City staying" },
};

export const UNSPECIFIED = "Not specified";

export const carrierName = (token) => (token.airline || "").trim() || UNSPECIFIED;

export const formatDate = (value) =>
  value ? new Date(value).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—";

export const STATUS_CLASS = {
  active: "bg-green-100 text-green-700",
  redeemed: "bg-blue-100 text-blue-700",
  expired: "bg-muted text-muted-foreground",
};