/**
 * Corporate Travel Platform dataset — corporate travel management companies (TMCs),
 * corporate online booking tools and business travel platforms.
 *
 * Each entry carries SEPARATE volume estimates for the three verticals:
 *   flight_bookings         — flight tickets booked annually
 *   accommodation_bookings  — room nights booked annually
 *   car_bookings            — car rental reservations booked annually
 *
 * Zero means the platform does not meaningfully operate in that vertical.
 * Each entry: company_name, country, continent, vertical, annual_bookings, booking_unit, hubs, description
 */

const CORPORATE_TRAVEL_PLATFORMS = [
  // ── Global TMCs ────────────────────────────────────────────────────
  { company_name: "American Express Global Business Travel", country: "United States", continent: "North America", flight_bookings: 20000000, accommodation_bookings: 25000000, car_bookings: 6000000, booking_unit: "bookings", hubs: ["New York", "London"], description: "World's largest corporate travel management company (Amex GBT)" },
  { company_name: "BCD Travel", country: "Netherlands", continent: "Europe", flight_bookings: 12000000, accommodation_bookings: 14000000, car_bookings: 3500000, booking_unit: "bookings", hubs: ["Utrecht", "Atlanta"], description: "Global corporate travel management company (BCD Group)" },
  { company_name: "CWT", country: "United States", continent: "North America", flight_bookings: 9000000, accommodation_bookings: 11000000, car_bookings: 2500000, booking_unit: "bookings", hubs: ["Minneapolis", "London"], description: "Global TMC serving large multinational organisations" },
  { company_name: "Corporate Travel Management (CTM)", country: "Australia", continent: "Oceania", flight_bookings: 4500000, accommodation_bookings: 5000000, car_bookings: 1200000, booking_unit: "bookings", hubs: ["Brisbane", "London"], description: "Australian-headquartered global corporate travel management company" },
  { company_name: "Flight Centre Travel Group (FCM)", country: "Australia", continent: "Oceania", flight_bookings: 8000000, accommodation_bookings: 9000000, car_bookings: 2000000, booking_unit: "bookings", hubs: ["Brisbane", "London"], description: "FCM corporate travel division of Flight Centre Travel Group" },
  { company_name: "Internova Travel Group", country: "United States", continent: "North America", flight_bookings: 2500000, accommodation_bookings: 3000000, car_bookings: 700000, booking_unit: "bookings", hubs: [], description: "Global travel services group with a corporate travel division" },
  { company_name: "ATPI", country: "United Kingdom", continent: "Europe", flight_bookings: 1500000, accommodation_bookings: 1800000, car_bookings: 400000, booking_unit: "bookings", hubs: ["London"], description: "Global TMC for marine, energy and corporate travel" },
  { company_name: "Direct Travel", country: "United States", continent: "North America", flight_bookings: 1800000, accommodation_bookings: 2000000, car_bookings: 500000, booking_unit: "bookings", hubs: [], description: "US corporate travel management company" },
  { company_name: "GlobalStar Travel Management", country: "United States", continent: "North America", flight_bookings: 1200000, accommodation_bookings: 1400000, car_bookings: 350000, booking_unit: "bookings", hubs: [], description: "Global corporate travel management partnership network" },

  // ── Corporate booking tools & platforms ────────────────────────────
  { company_name: "Navan", country: "United States", continent: "North America", flight_bookings: 3000000, accommodation_bookings: 4000000, car_bookings: 800000, booking_unit: "bookings", hubs: ["Palo Alto", "London"], description: "All-in-one corporate travel and expense platform" },
  { company_name: "TravelPerk", country: "Spain", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 2500000, car_bookings: 500000, booking_unit: "bookings", hubs: ["Barcelona", "London"], description: "European business travel booking platform" },
  { company_name: "SAP Concur", country: "United States", continent: "North America", flight_bookings: 15000000, accommodation_bookings: 18000000, car_bookings: 4000000, booking_unit: "bookings", hubs: [], description: "Corporate travel, expense and invoice platform" },
  { company_name: "Egencia", country: "France", continent: "Europe", flight_bookings: 5000000, accommodation_bookings: 6000000, car_bookings: 1500000, booking_unit: "bookings", hubs: ["Paris", "Seattle"], description: "Digital business travel platform of Amex GBT" },
  { company_name: "Amadeus Cytric", country: "Spain", continent: "Europe", flight_bookings: 6000000, accommodation_bookings: 7000000, car_bookings: 1500000, booking_unit: "bookings", hubs: ["Madrid"], description: "Corporate booking and expense solution by Amadeus" },
  { company_name: "Sabre GetThere", country: "United States", continent: "North America", flight_bookings: 3000000, accommodation_bookings: 3500000, car_bookings: 900000, booking_unit: "bookings", hubs: [], description: "Corporate online booking tool by Sabre" },
  { company_name: "Spotnana", country: "United States", continent: "North America", flight_bookings: 800000, accommodation_bookings: 1000000, car_bookings: 200000, booking_unit: "bookings", hubs: [], description: "Cloud-native corporate travel platform" },
  { company_name: "Serko", country: "New Zealand", continent: "Oceania", flight_bookings: 900000, accommodation_bookings: 1100000, car_bookings: 250000, booking_unit: "bookings", hubs: ["Auckland"], description: "Corporate travel and expense platform (Zeno)" },
  { company_name: "Deem", country: "United States", continent: "North America", flight_bookings: 700000, accommodation_bookings: 900000, car_bookings: 200000, booking_unit: "bookings", hubs: [], description: "Corporate travel booking platform (Enterprise Holdings)" },
  { company_name: "TravelBank", country: "United States", continent: "North America", flight_bookings: 500000, accommodation_bookings: 600000, car_bookings: 150000, booking_unit: "bookings", hubs: [], description: "US Bank business travel and expense platform" },
  { company_name: "Traveldoo", country: "France", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 1200000, car_bookings: 300000, booking_unit: "bookings", hubs: ["Paris"], description: "European corporate booking tool (Expedia Group)" },
  { company_name: "Fello", country: "Sweden", continent: "Europe", flight_bookings: 200000, accommodation_bookings: 250000, car_bookings: 60000, booking_unit: "bookings", hubs: ["Stockholm"], description: "Nordic business travel platform" },
  { company_name: "TapTrip", country: "United Kingdom", continent: "Europe", flight_bookings: 150000, accommodation_bookings: 180000, car_bookings: 40000, booking_unit: "bookings", hubs: ["London"], description: "UK business travel booking platform" },

  // ── Asia-Pacific ───────────────────────────────────────────────────
  { company_name: "Trip.Biz", country: "Singapore", continent: "Asia", flight_bookings: 4000000, accommodation_bookings: 5000000, car_bookings: 1000000, booking_unit: "bookings", hubs: ["Singapore"], description: "Corporate travel brand of Trip.com Group" },
  { company_name: "Ctrip Corporate Travel", country: "China", continent: "Asia", flight_bookings: 6000000, accommodation_bookings: 8000000, car_bookings: 1500000, booking_unit: "bookings", hubs: ["Shanghai"], description: "Corporate travel arm of Trip.com in China" },
  { company_name: "Fliggy Corporate Travel", country: "China", continent: "Asia", flight_bookings: 3000000, accommodation_bookings: 4000000, car_bookings: 800000, booking_unit: "bookings", hubs: ["Hangzhou"], description: "Alibaba's corporate travel platform" },
  { company_name: "JTB Business Travel", country: "Japan", continent: "Asia", flight_bookings: 2500000, accommodation_bookings: 3000000, car_bookings: 700000, booking_unit: "bookings", hubs: ["Tokyo"], description: "Corporate travel division of JTB" },
  { company_name: "Nippon Travel Agency", country: "Japan", continent: "Asia", flight_bookings: 1200000, accommodation_bookings: 1500000, car_bookings: 350000, booking_unit: "bookings", hubs: ["Tokyo"], description: "Japanese travel management company" },
  { company_name: "Yatra for Business", country: "India", continent: "Asia", flight_bookings: 1000000, accommodation_bookings: 1200000, car_bookings: 300000, booking_unit: "bookings", hubs: ["Gurugram"], description: "Indian corporate travel platform" },
  { company_name: "MakeMyTrip MyBiz", country: "India", continent: "Asia", flight_bookings: 1500000, accommodation_bookings: 2000000, car_bookings: 400000, booking_unit: "bookings", hubs: ["Gurugram"], description: "Corporate booking platform for SMEs in India" },
  { company_name: "Riya Travel", country: "India", continent: "Asia", flight_bookings: 800000, accommodation_bookings: 900000, car_bookings: 200000, booking_unit: "bookings", hubs: ["Mumbai"], description: "Indian corporate travel management company" },
  { company_name: "ITILITE", country: "India", continent: "Asia", flight_bookings: 600000, accommodation_bookings: 800000, car_bookings: 200000, booking_unit: "bookings", hubs: ["Bengaluru"], description: "Indian business travel and expense platform" },
  { company_name: "Travelstop", country: "Singapore", continent: "Asia", flight_bookings: 500000, accommodation_bookings: 700000, car_bookings: 180000, booking_unit: "bookings", hubs: ["Singapore"], description: "Asian business travel booking platform" },
  { company_name: "Corporate Traveler", country: "Australia", continent: "Oceania", flight_bookings: 1000000, accommodation_bookings: 1200000, car_bookings: 300000, booking_unit: "bookings", hubs: ["Brisbane"], description: "SME corporate division of Flight Centre Travel Group" },

  // ── Europe ─────────────────────────────────────────────────────────
  { company_name: "HRS", country: "Germany", continent: "Europe", flight_bookings: 0, accommodation_bookings: 12000000, car_bookings: 0, booking_unit: "bookings", hubs: ["Cologne"], description: "Global corporate hotel booking platform" },
  { company_name: "Engine by HRS", country: "Germany", continent: "Europe", flight_bookings: 0, accommodation_bookings: 3000000, car_bookings: 0, booking_unit: "bookings", hubs: ["Cologne"], description: "Corporate hotel booking platform by HRS" },
  { company_name: "Reed & Mackay", country: "United Kingdom", continent: "Europe", flight_bookings: 1500000, accommodation_bookings: 1800000, car_bookings: 450000, booking_unit: "bookings", hubs: ["London"], description: "Global TMC for professional services firms (Trip.com Group)" },
  { company_name: "Key Travel", country: "United Kingdom", continent: "Europe", flight_bookings: 800000, accommodation_bookings: 1000000, car_bookings: 250000, booking_unit: "bookings", hubs: ["Manchester"], description: "Specialist TMC for non-profits and academia" },
  { company_name: "Clarity Business Travel", country: "United Kingdom", continent: "Europe", flight_bookings: 700000, accommodation_bookings: 800000, car_bookings: 200000, booking_unit: "bookings", hubs: ["Manchester"], description: "UK corporate travel management company" },
  { company_name: "Advantage Travel Partnership", country: "United Kingdom", continent: "Europe", flight_bookings: 700000, accommodation_bookings: 800000, car_bookings: 200000, booking_unit: "bookings", hubs: ["London"], description: "UK travel management partnership" },
  { company_name: "Diversity Travel", country: "United Kingdom", continent: "Europe", flight_bookings: 400000, accommodation_bookings: 500000, car_bookings: 120000, booking_unit: "bookings", hubs: ["Manchester"], description: "UK TMC for the not-for-profit sector" },
  { company_name: "Wings Travel Management", country: "United Kingdom", continent: "Europe", flight_bookings: 400000, accommodation_bookings: 450000, car_bookings: 120000, booking_unit: "bookings", hubs: ["London"], description: "Global TMC for the energy and marine sectors" },
  { company_name: "Global Travel Management", country: "United Kingdom", continent: "Europe", flight_bookings: 300000, accommodation_bookings: 350000, car_bookings: 90000, booking_unit: "bookings", hubs: ["London"], description: "UK corporate travel management company" },
  { company_name: "CT Business Travel", country: "United Kingdom", continent: "Europe", flight_bookings: 250000, accommodation_bookings: 300000, car_bookings: 80000, booking_unit: "bookings", hubs: ["London"], description: "UK corporate travel management company" },
  { company_name: "Travel Counsellors for Business", country: "United Kingdom", continent: "Europe", flight_bookings: 300000, accommodation_bookings: 400000, car_bookings: 100000, booking_unit: "bookings", hubs: ["Manchester"], description: "UK corporate travel service" },
  { company_name: "Travel Management Group", country: "United Kingdom", continent: "Europe", flight_bookings: 300000, accommodation_bookings: 350000, car_bookings: 90000, booking_unit: "bookings", hubs: ["London"], description: "UK corporate travel management company" },
  { company_name: "Kuoni Business Travel", country: "Switzerland", continent: "Europe", flight_bookings: 300000, accommodation_bookings: 350000, car_bookings: 90000, booking_unit: "bookings", hubs: ["Zurich"], description: "Swiss corporate travel management company" },
  { company_name: "Hotelplan Business Travel", country: "Switzerland", continent: "Europe", flight_bookings: 200000, accommodation_bookings: 250000, car_bookings: 60000, booking_unit: "bookings", hubs: ["Zurich"], description: "Swiss business travel provider" },

  // ── Business booking platforms & spend tools ───────────────────────
  { company_name: "Booking.com for Business", country: "Netherlands", continent: "Europe", flight_bookings: 0, accommodation_bookings: 6000000, car_bookings: 0, booking_unit: "bookings", hubs: ["Amsterdam"], description: "Business travel booking for small and mid-size companies" },
  { company_name: "Expedia Business Travel", country: "United States", continent: "North America", flight_bookings: 1000000, accommodation_bookings: 1500000, car_bookings: 400000, booking_unit: "bookings", hubs: [], description: "Business travel programme by Expedia Group" },
  { company_name: "Agoda Corporate", country: "Singapore", continent: "Asia", flight_bookings: 0, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: ["Singapore"], description: "Corporate accommodation booking by Agoda" },
  { company_name: "HotelEngine", country: "United States", continent: "North America", flight_bookings: 0, accommodation_bookings: 2500000, car_bookings: 0, booking_unit: "bookings", hubs: ["Denver"], description: "Business travel hotel booking platform" },
  { company_name: "Priceline for Business", country: "United States", continent: "North America", flight_bookings: 300000, accommodation_bookings: 500000, car_bookings: 150000, booking_unit: "bookings", hubs: [], description: "Business travel booking for US companies" },
  { company_name: "Brex Travel", country: "United States", continent: "North America", flight_bookings: 500000, accommodation_bookings: 700000, car_bookings: 150000, booking_unit: "bookings", hubs: [], description: "Travel booking within the Brex spend platform" },
  { company_name: "Ramp Travel", country: "United States", continent: "North America", flight_bookings: 400000, accommodation_bookings: 600000, car_bookings: 130000, booking_unit: "bookings", hubs: [], description: "Travel booking within the Ramp finance platform" },
  { company_name: "Expensify Travel", country: "United States", continent: "North America", flight_bookings: 300000, accommodation_bookings: 400000, car_bookings: 100000, booking_unit: "bookings", hubs: [], description: "Travel booking within the Expensify expense platform" },
  { company_name: "Happay", country: "India", continent: "Asia", flight_bookings: 400000, accommodation_bookings: 500000, car_bookings: 130000, booking_unit: "bookings", hubs: ["Bengaluru"], description: "Indian business expense and travel platform" },

  // ── Regional TMCs ──────────────────────────────────────────────────
  { company_name: "Uniglobe Travel", country: "Canada", continent: "North America", flight_bookings: 900000, accommodation_bookings: 1000000, car_bookings: 250000, booking_unit: "bookings", hubs: ["Vancouver"], description: "Global TMC network for small and mid-size businesses" },
  { company_name: "World Travel Inc", country: "United States", continent: "North America", flight_bookings: 400000, accommodation_bookings: 500000, car_bookings: 120000, booking_unit: "bookings", hubs: [], description: "US corporate travel management company" },
  { company_name: "Christopherson Business Travel", country: "United States", continent: "North America", flight_bookings: 600000, accommodation_bookings: 700000, car_bookings: 180000, booking_unit: "bookings", hubs: ["Salt Lake City"], description: "US corporate travel management company" },
  { company_name: "Fox World Travel", country: "United States", continent: "North America", flight_bookings: 400000, accommodation_bookings: 450000, car_bookings: 100000, booking_unit: "bookings", hubs: ["Milwaukee"], description: "US corporate travel management company" },
  { company_name: "Short's Travel Management", country: "United States", continent: "North America", flight_bookings: 500000, accommodation_bookings: 600000, car_bookings: 150000, booking_unit: "bookings", hubs: [], description: "US TMC for groups, sports and corporate travel" },
  { company_name: "Omega World Travel", country: "United States", continent: "North America", flight_bookings: 300000, accommodation_bookings: 350000, car_bookings: 80000, booking_unit: "bookings", hubs: [], description: "US travel management company" },
  { company_name: "Travel Leaders Corporate", country: "United States", continent: "North America", flight_bookings: 700000, accommodation_bookings: 800000, car_bookings: 200000, booking_unit: "bookings", hubs: [], description: "US corporate travel division of Travel Leaders Group" },
  { company_name: "dnata Travel Management", country: "United Arab Emirates", continent: "Middle East", flight_bookings: 900000, accommodation_bookings: 1000000, car_bookings: 250000, booking_unit: "bookings", hubs: ["Dubai"], description: "Middle East corporate travel management company" },
  { company_name: "Almosafer Business", country: "Saudi Arabia", continent: "Middle East", flight_bookings: 700000, accommodation_bookings: 800000, car_bookings: 200000, booking_unit: "bookings", hubs: ["Riyadh"], description: "Saudi corporate travel platform" },
  { company_name: "Kanoo Travel", country: "Saudi Arabia", continent: "Middle East", flight_bookings: 500000, accommodation_bookings: 600000, car_bookings: 150000, booking_unit: "bookings", hubs: ["Dammam"], description: "Middle East corporate travel company" },
  { company_name: "Rennies Travel", country: "South Africa", continent: "Africa", flight_bookings: 400000, accommodation_bookings: 450000, car_bookings: 120000, booking_unit: "bookings", hubs: ["Johannesburg"], description: "South African corporate travel management company" },
  { company_name: "Flight Centre Business Travel Africa", country: "South Africa", continent: "Africa", flight_bookings: 300000, accommodation_bookings: 350000, car_bookings: 90000, booking_unit: "bookings", hubs: ["Johannesburg"], description: "African corporate travel division of Flight Centre" },
  { company_name: "Flytour Business Travel", country: "Brazil", continent: "South America", flight_bookings: 500000, accommodation_bookings: 600000, car_bookings: 150000, booking_unit: "bookings", hubs: ["São Paulo"], description: "Brazilian corporate travel management company" },
  { company_name: "CVC Corporate", country: "Brazil", continent: "South America", flight_bookings: 600000, accommodation_bookings: 700000, car_bookings: 180000, booking_unit: "bookings", hubs: ["São Paulo"], description: "Brazilian corporate travel operator" },
  { company_name: "Almundo Corporate", country: "Argentina", continent: "South America", flight_bookings: 400000, accommodation_bookings: 500000, car_bookings: 130000, booking_unit: "bookings", hubs: ["Buenos Aires"], description: "Argentine corporate travel platform" },
];

const ALL_PLATFORMS = [];
for (const p of CORPORATE_TRAVEL_PLATFORMS) {
  if (p.flight_bookings > 0) ALL_PLATFORMS.push({ ...p, annual_bookings: p.flight_bookings, vertical: "flight" });
  if (p.accommodation_bookings > 0) ALL_PLATFORMS.push({ ...p, annual_bookings: p.accommodation_bookings, vertical: "accommodation" });
  if (p.car_bookings > 0) ALL_PLATFORMS.push({ ...p, annual_bookings: p.car_bookings, vertical: "car" });
}

export const CORPORATE_PLATFORMS = ALL_PLATFORMS.map((p) => ({
  company_name: p.company_name,
  country: p.country,
  continent: p.continent,
  annual_bookings: p.annual_bookings,
  booking_unit: p.booking_unit,
  vertical: p.vertical,
  hubs: p.hubs,
  description: p.description,
  monthly_bookings: Math.round(p.annual_bookings / 12),
}));

export const CORPORATE_PLATFORM_CONTINENTS = [
  ...new Set(ALL_PLATFORMS.map((p) => p.continent)),
].sort();