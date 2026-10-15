// Port & Down Town Retail Partners — showcase strings.
// These partners take the sale, so the story is the retailer story (pre-activated
// traveller flow, validated at the POS, fee only on results) told for sea port
// terminals and down town stores rather than airports.
// English is the source of truth; other languages fall back to it.

export const portRetailerStrings = {
  en: {
    badge: "For Port & Down Town Retail Partners",
    headlinePart1: "Turn Everyday Traveller Flow Into",
    headlinePart2: "Paying Customers",
    subtitle:
      "Sea port terminals and down town stores sit on the daily traveller flow. Travellers are pre-activated days, weeks or even months before departure and arrive at your till holding a DutyCredit and purchase intent. You convert them at the POS and pay only on validated sales.",
    s1_title: "Why It Works for Port & Down Town Retail",
    why1_title: "Pre-activated shoppers",
    why1_desc:
      "Travellers arrive holding a DutyCredit they were handed days, weeks or months before departure — purchase intent is already built before they reach your store.",
    why2_title: "Everyday traveller flow",
    why2_desc:
      "Cruise passengers, crew and down town visitors pass your door every day. DutyBoost converts the ones who would otherwise walk straight past.",
    why3_title: "Pay only on results",
    why3_desc:
      "No joining fee, no integration cost, no capital expenditure. The platform fee applies only to validated transactions — a sale that already happened.",
    why4_title: "Stronger baskets at the till",
    why4_desc:
      "A traveller incentive lifts both conversion and basket value, and every redemption is validated at your POS.",
    s2_title: "How It Works",
    step1_title: "Activate",
    step1_desc:
      "Travellers receive their DutyCredit days, weeks or months before departure, well ahead of their visit to your store.",
    step2_title: "Arrive",
    step2_desc:
      "Travellers step ashore or into town with purchase intent and a credit ready to spend at your store.",
    step3_title: "Validate",
    step3_desc:
      "Your POS validates the DutyCredit at checkout and applies the traveller discount instantly.",
    step4_title: "Earn",
    step4_desc:
      "The retailer keeps the incremental sale and pays the platform fee only on validated transactions.",
    s3_title: "The Numbers",
    stat1_value: "73%",
    stat1_label: "Walk past without buying",
    stat1_desc:
      "The conversion headroom already passing your store every day, ashore and down town.",
    stat2_value: "€0",
    stat2_label: "Cost to the retailer",
    stat2_desc:
      "No joining fee, no integration cost, no capex — a fee applies only to validated sales.",
    stat3_value: "Days–Months",
    stat3_label: "Pre-activation window",
    stat3_desc:
      "Travellers are activated long before departure, not at the terminal gate.",
    ctaTitle: "Want to see what this looks like on your store's footfall?",
    ctaDesc:
      "Tell us about your stores and locations, and we'll prepare a tailored estimate — no commitment, no cost.",
  },
};

export function getPortRetailerStrings(lang) {
  const code = (lang || "en").split("-")[0];
  return portRetailerStrings[code] || portRetailerStrings.en;
}