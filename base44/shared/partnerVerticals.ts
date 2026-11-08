/**
 * The twelve partner dashboards, as the backend sees them. The key is what a
 * partner account stores; travel verticals read DutyCredits of one way of
 * travelling, retail verticals read the redemptions at that partner's stores.
 */
export const PARTNER_VERTICALS: Record<string, { side: "travel" | "retail"; travelType?: string; flowUnit: string }> = {
  flight: { side: "travel", travelType: "flight", flowUnit: "departing passengers" },
  cruise: { side: "travel", travelType: "cruise", flowUnit: "cruise passengers" },
  train: { side: "travel", travelType: "train", flowUnit: "rail passengers" },
  coach: { side: "travel", travelType: "coach", flowUnit: "coach passengers" },
  car_rental: { side: "travel", travelType: "car_rental", flowUnit: "rental days" },
  accommodation: { side: "travel", travelType: "accommodation", flowUnit: "room nights" },
  airport_retail: { side: "retail", flowUnit: "airport footfall" },
  seaport_retail: { side: "retail", flowUnit: "terminal footfall" },
  cruise_line_retail: { side: "retail", flowUnit: "onboard guests" },
  motorway_retail: { side: "retail", flowUnit: "service-area footfall" },
  railway_retail: { side: "retail", flowUnit: "station footfall" },
  local_retail: { side: "retail", flowUnit: "store footfall" },
};

export const PARTNER_VERTICAL_KEYS = Object.keys(PARTNER_VERTICALS);