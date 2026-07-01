/**
 * Per-airline booking reference and flight number format data.
 * Used on the Claim DutyCredit page to show airline-specific examples
 * and provide a soft format check that deters fake submissions.
 *
 * Most airlines use the IATA standard 6-character alphanumeric PNR.
 * Flight numbers follow the pattern: 2-letter IATA code + 1–4 digits.
 */

// IATA codes for major airlines — used for flight number prefix validation
const AIRLINE_IATA = {
  // Europe — flag carriers & major
  "Air France": "AF",
  "KLM": "KL",
  "Lufthansa": "LH",
  "British Airways": "BA",
  "Iberia": "IB",
  "ITA Airways": "AZ",
  "SAS Scandinavian Airlines": "SK",
  "Finnair": "AY",
  "TAP Air Portugal": "TP",
  "Swiss International Air Lines": "LX",
  "Austrian Airlines": "OS",
  "Brussels Airlines": "SN",
  "Aer Lingus": "EI",
  "Turkish Airlines": "TK",
  "Air Europa": "UX",
  "Aegean Airlines": "A3",
  "LOT Polish Airlines": "LO",
  "Icelandair": "FI",
  "Air Serbia": "JU",
  "AirBaltic": "BT",

  // Europe — low-cost
  "Ryanair": "FR",
  "easyJet": "U2",
  "Wizz Air": "W6",
  "Norwegian Air Shuttle": "DY",
  "Vueling": "VY",
  "Eurowings": "EW",
  "Transavia": "HV",
  "Pegasus Airlines": "PC",
  "Jet2.com": "LS",
  "Volotea": "VO",

  // Europe — leisure / charter
  "TUI fly": "X3",
  "Condor": "DE",
  "TUI Airways": "TOM",
  "TUI fly Netherlands": "OR",
  "TUI fly Belgium": "TB",
  "Corendon Airlines": "XC",

  // Middle East
  "Emirates": "EK",
  "Qatar Airways": "QR",
  "Etihad Airways": "EY",
  "Saudia": "SV",
  "flydubai": "FZ",
  "Air Arabia": "G9",
  "flynas": "XY",
  "Gulf Air": "GF",
  "Oman Air": "WY",
  "Royal Jordanian": "RJ",
  "Kuwait Airways": "KU",
  "Middle East Airlines (MEA)": "ME",
  "EgyptAir": "MS",

  // Asia — major
  "Singapore Airlines": "SQ",
  "Cathay Pacific": "CX",
  "ANA All Nippon Airways": "NH",
  "Japan Airlines (JAL)": "JL",
  "Korean Air": "KE",
  "Asiana Airlines": "OZ",
  "China Southern Airlines": "CZ",
  "China Eastern Airlines": "MU",
  "Air China": "CA",
  "Hainan Airlines": "HU",
  "Thai Airways": "TG",
  "Malaysia Airlines": "MH",
  "Garuda Indonesia": "GA",
  "Vietnam Airlines": "VN",
  "Philippine Airlines": "PR",
  "Air India": "AI",
  "SriLankan Airlines": "UL",
  "China Airlines": "CI",
  "EVA Air": "BR",

  // Asia — low-cost
  "IndiGo": "6E",
  "AirAsia": "AK",
  "Lion Air": "JT",
  "VietJet Air": "VJ",
  "Cebu Pacific": "5J",
  "Scoot": "TR",
  "Jetstar Airways": "JQ",
  "Jetstar Japan": "GK",
  "Peach Aviation": "MM",
  "Spring Airlines": "9C",

  // Oceania
  "Qantas": "QF",
  "Air New Zealand": "NZ",
  "Virgin Australia": "VA",
  "Fiji Airways": "FJ",

  // North America — US
  "American Airlines": "AA",
  "Delta Air Lines": "DL",
  "United Airlines": "UA",
  "Southwest Airlines": "WN",
  "Alaska Airlines": "AS",
  "JetBlue Airways": "B6",
  "Spirit Airlines": "NK",
  "Frontier Airlines": "F9",
  "Hawaiian Airlines": "HA",

  // North America — Canada & Mexico
  "Air Canada": "AC",
  "WestJet": "WS",
  "Air Transat": "TS",
  "Aeroméxico": "AM",
  "Volaris": "Y4",
  "VivaAerobus": "VB",

  // Latin America
  "LATAM Airlines": "LA",
  "GOL Linhas Aéreas": "G3",
  "Azul Brazilian Airlines": "AD",
  "Avianca": "AV",
  "Copa Airlines": "CM",
  "Aerolíneas Argentinas": "AR",
  "Sky Airline": "H2",
  "JetSMART": "JA",

  // Africa
  "Ethiopian Airlines": "ET",
  "South African Airways": "SA",
  "Royal Air Maroc": "AT",
  "Kenya Airways": "KQ",
  "Air Algérie": "AH",
  "Tunisair": "TU",
  "Air Mauritius": "MK",
  "RwandAir": "WB",
  "FlySafair": "FA",

  // Russia & CIS
  "Aeroflot": "SU",
  "S7 Airlines": "S7",
  "Pobeda": "DP",
  "Belavia": "B2",
  "Ukraine International Airlines": "PS",
  "AZAL Azerbaijan Airlines": "J2",
};

// Booking reference format overrides for airlines with non-standard PNR lengths.
// Default (IATA standard): 6-character alphanumeric.
const BOOKING_REF_OVERRIDES = {
  "easyJet": { length: 7, example: "EZJ1234", pattern: /^[A-Z0-9]{7}$/ },
  "Ryanair": { length: 6, example: "RYA123", pattern: /^[A-Z0-9]{6}$/ },
  "Wizz Air": { length: 6, example: "WZZ123", pattern: /^[A-Z0-9]{6}$/ },
  "Southwest Airlines": { length: 6, example: "SWA123", pattern: /^[A-Z0-9]{5,6}$/ },
  "IndiGo": { length: 6, example: "6E1234", pattern: /^[A-Z0-9]{6}$/ },
};

const DEFAULT_BOOKING = {
  length: 6,
  example: "ABC123",
  pattern: /^[A-Z0-9]{6}$/,
};

/**
 * Returns format metadata for a given airline name.
 * @param {string} airlineName — exact company_name from the AIRLINES data
 * @returns {{ iata: string|null, bookingExample: string, bookingPattern: RegExp, bookingHint: string, flightExample: string, flightPattern: RegExp, flightHint: string } | null}
 */
export function getAirlineFormat(airlineName) {
  if (!airlineName) return null;
  const iata = AIRLINE_IATA[airlineName] || null;
  const booking = BOOKING_REF_OVERRIDES[airlineName] || DEFAULT_BOOKING;
  return {
    iata,
    bookingExample: booking.example,
    bookingPattern: booking.pattern,
    bookingHint: `${booking.length} characters (letters + numbers)`,
    flightExample: iata ? `${iata}1234` : "XX1234",
    flightPattern: iata ? new RegExp(`^${iata}\\d{1,4}$`) : /^[A-Z0-9]{2}\d{1,4}$/,
    flightHint: iata ? `Starts with ${iata}` : "2-letter airline code + number",
  };
}