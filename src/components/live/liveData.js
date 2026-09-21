import { PEOPLE } from "@/data/roleAvatars";
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
    cast: ["travelers", "agencies", "platform"],
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/fab2930d4_generated_image.png",
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
    cast: ["travelers", "airports", "posPartner"],
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/e96492112_generated_image.png",
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
    cast: ["retailers", "wholesale", "corporate", "platform"],
    image:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/da01eae32_generated_image.png",
    Overlay: OverlayTill,
  },
];

// Live network tiles — one real face per role, counters climb while the loop plays.
export const STAKEHOLDERS = [
  { key: "travelers", label: "Travellers", metric: "DutyCredits issued", base: 1284, step: 3, person: PEOPLE.travelers },
  { key: "agencies", label: "Travel Partners", metric: "Bookings tagged", base: 862, step: 2, person: PEOPLE.agencies },
  { key: "airports", label: "Airports", metric: "Concession accrued", base: 7310, step: 34, prefix: "$", person: PEOPLE.airports },
  { key: "retailers", label: "Airport Retailers", metric: "Validated sales", base: 417, step: 2, person: PEOPLE.retailers },
  { key: "posPartner", label: "POS Partners", metric: "Tokens scanned", base: 1902, step: 4, person: PEOPLE.posPartner },
  { key: "wholesale", label: "Wholesale / Suppliers", metric: "Units rotated", base: 3418, step: 6, person: PEOPLE.wholesale },
  { key: "corporate", label: "Corporate Partners", metric: "0.5% rebate earned", base: 1452, step: 9, prefix: "$", person: PEOPLE.corporate },
];

// The scrolling event stream at the bottom of the stage.
export const EVENTS = [
  { key: "travelers", text: "Amara's DutyCredit issued · AMS → SXM · single use" },
  { key: "posPartner", text: "Marcus scanned the credit at POS · terminal B · 0.4s" },
  { key: "retailers", text: "Sofia confirmed a validated sale · new spend only" },
  { key: "airports", text: "Ingrid's concession accrued · 15% of incremental spend" },
  { key: "agencies", text: "Daniel's booking attributed · DB-7741" },
  { key: "wholesale", text: "Peter's stock rotation signal sent · reorder" },
  { key: "corporate", text: "Helena's rebate earned · 0.5% on validated basket" },
  { key: "travelers", text: "Traveller saving applied at the till" },
  { key: "retailers", text: "Platform fee 2.5% · charged on new sales only" },
  { key: "posPartner", text: "Snippet heartbeat · all retailers online" },
];