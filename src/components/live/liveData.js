import { Cpu, Building2, PlaneTakeoff, Package } from "lucide-react";
import TravelAgencyIcon from "../TravelAgencyIcon";
import AirportRetailerIcon from "../AirportRetailerIcon";
import TravelerIcon from "../TravelerIcon";
import OverlayHome from "./scenes/OverlayHome";
import OverlayAirport from "./scenes/OverlayAirport";
import OverlayTill from "./scenes/OverlayTill";

// Timing of the live loop (milliseconds)
export const SCENE_MS = 7000;
export const TICK_MS = 2000;

// The live loop: home -> airport -> till, then it starts again.
export const SCENES = [
  {
    id: "home",
    step: "01",
    label: "At Home",
    title: "A DutyCredit is born",
    caption:
      "Booking through a travel partner issues a single-use DutyCredit to the traveller — funded and executed by DutyBoost, never charged to the retailer.",
    active: ["travelers", "agencies"],
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/7cd1e970c_generated_image.png",
    Overlay: OverlayHome,
  },
  {
    id: "airport",
    step: "02",
    label: "At the Airport",
    title: "Arrival, no effort required",
    caption:
      "The traveller lands with the credit already on their phone. Airports carry no capex, POS partners carry no integration work, and nothing is asked of the retailer.",
    active: ["airports", "posPartner"],
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/b0175297d_generated_image.png",
    Overlay: OverlayAirport,
  },
  {
    id: "till",
    step: "03",
    label: "At the Till",
    title: "One validated sale, many beneficiaries",
    caption:
      "The credit is scanned at the till, the traveller saves, and the value splits automatically — retailer, airport, travel partner, supplier, corporate partner and platform.",
    active: ["retailers", "wholesale", "corporate"],
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/9e1865d36_generated_image.png",
    Overlay: OverlayTill,
  },
];

// Live network tiles — counters climb while the loop plays.
export const STAKEHOLDERS = [
  { key: "travelers", label: "Travellers", Icon: TravelerIcon, metric: "DutyCredits issued", base: 1284, step: 3, color: "text-blue-400" },
  { key: "agencies", label: "Travel Partners", Icon: TravelAgencyIcon, metric: "Bookings tagged", base: 862, step: 2, color: "text-green-400" },
  { key: "airports", label: "Airports", Icon: PlaneTakeoff, metric: "Concession accrued", base: 7310, step: 34, prefix: "$", color: "text-cyan-400" },
  { key: "retailers", label: "Airport Retailers", Icon: AirportRetailerIcon, metric: "Validated sales", base: 417, step: 2, color: "text-orange-400" },
  { key: "posPartner", label: "POS Partners", Icon: Cpu, metric: "Tokens scanned", base: 1902, step: 4, color: "text-violet-400" },
  { key: "wholesale", label: "Wholesale / Suppliers", Icon: Package, metric: "Units rotated", base: 3418, step: 6, color: "text-amber-400" },
  { key: "corporate", label: "Corporate Partners", Icon: Building2, metric: "0.5% rebate earned", base: 1452, step: 9, prefix: "$", color: "text-slate-300" },
];

// The scrolling event stream at the bottom of the stage.
export const EVENTS = [
  { key: "travelers", text: "DutyCredit issued · AMS → SXM · single use" },
  { key: "posPartner", text: "QR scanned at POS · terminal B · 0.4s" },
  { key: "retailers", text: "Validated sale confirmed · new spend only" },
  { key: "airports", text: "Concession accrued · 15% of incremental spend" },
  { key: "agencies", text: "Travel partner attribution · booking DB-7741" },
  { key: "wholesale", text: "Stock rotation · reorder signal sent" },
  { key: "corporate", text: "Corporate rebate · 0.5% on validated basket" },
  { key: "travelers", text: "Traveller saving applied at the till" },
  { key: "retailers", text: "Platform fee 2.5% · charged on new sales only" },
  { key: "posPartner", text: "Snippet heartbeat · all retailers online" },
];