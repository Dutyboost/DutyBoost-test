// The people behind every role in the DutyBoost network.
// AI-generated representative portraits — the same faces appear across the platform.
export const PEOPLE = {
  travelers: {
    key: "travelers",
    person: "Amara Okafor",
    personRole: "Traveller",
    detail: "Flying out of Amsterdam, booking through a travel partner",
    avatar:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/5bfa3a54d_generated_image.png",
  },
  agencies: {
    key: "agencies",
    person: "Daniel Verhoeven",
    personRole: "Travel Partner",
    detail: "Issues the DutyCredit with every booking, at no cost to them",
    avatar:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/e657495f7_generated_image.png",
  },
  airports: {
    key: "airports",
    person: "Ingrid Halvorsen",
    personRole: "Airport Authority",
    detail: "Earns concession on incremental spend, with no capex",
    avatar:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/302f73db3_generated_image.png",
  },
  retailers: {
    key: "retailers",
    person: "Sofia Marchetti",
    personRole: "Airport Retail Manager",
    detail: "Scans the credit at the till and keeps the incremental sale",
    avatar:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/4001061b8_generated_image.png",
  },
  posPartner: {
    key: "posPartner",
    person: "Marcus Chen",
    personRole: "POS Provider",
    detail: "Runs the scan on the terminal they already have",
    avatar:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/fccb94876_generated_image.png",
  },
  wholesale: {
    key: "wholesale",
    person: "Peter Jansen",
    personRole: "Wholesale Supplier",
    detail: "Sees stock rotate faster without funding the promotion",
    avatar:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/70245cce3_generated_image.png",
  },
  corporate: {
    key: "corporate",
    person: "Helena Brandt",
    personRole: "Corporate Travel Manager",
    detail: "Earns a rebate on every validated business-trip basket",
    avatar:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/12b8fe567_generated_image.png",
  },
  platform: {
    key: "platform",
    person: "Ravi Menon",
    personRole: "DutyBoost Platform",
    detail: "Funds and orchestrates the whole flow",
    avatar:
      "https://media.base44.com/images/public/69c97dcd1c1950fa88424690/cb41ecde9_generated_image.png",
  },
};

export const getPerson = (key) => PEOPLE[key === "dutyboost" ? "platform" : key] || null;