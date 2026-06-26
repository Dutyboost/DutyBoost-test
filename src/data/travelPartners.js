/**
 * Travel Partner dataset — aggregated from focused data files.
 *
 * Airlines:          data/airlines.js          — all commercial airlines
 * Hotel Chains:      data/hotelChains.js        — international hotel chains only
 * Car Rentals:       data/carRentalCompanies.js — airport-based car rentals only
 * OTAs/Tour Ops:     inline below               — flight ticket sellers, tour operators, cruise lines
 *
 * Each entry: company_name, country, continent, vertical, annual_bookings, booking_unit, hubs, description
 */

import { AIRLINES } from "./airlines";
import { HOTEL_CHAINS } from "./hotelChains";
import { CAR_RENTAL_COMPANIES } from "./carRentalCompanies";

/**
 * OTAs, Tour Operators & Travel Agencies.
 *
 * Each entry carries SEPARATE volume estimates for the three verticals:
 *   flight_bookings         — flight tickets sold annually
 *   accommodation_bookings  — room nights / vacation rentals sold annually
 *   car_bookings            — car rental reservations sold annually
 *
 * Zero means the OTA does not meaningfully operate in that vertical.
 * Tour-operator package deals (flight + hotel bundled) are counted in
 * BOTH flight_bookings and accommodation_bookings, since each package
 * booking generates one flight ticket AND one hotel stay.
 */
const OTAS_AND_PLATFORMS = [
  // ── Major OTAs ─────────────────────────────────────────────────────
  { company_name: "Booking.com", country: "Netherlands", continent: "Europe", flight_bookings: 5000000, accommodation_bookings: 900000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "World's largest accommodation OTA (Booking Holdings)" },
  { company_name: "Expedia Group", country: "United States", continent: "North America", flight_bookings: 80000000, accommodation_bookings: 300000000, car_bookings: 20000000, booking_unit: "bookings", hubs: [], description: "Major US OTA group (Expedia, Hotels.com, Vrbo, Orbitz)" },
  { company_name: "Trip.com Group", country: "China", continent: "Asia", flight_bookings: 200000000, accommodation_bookings: 400000000, car_bookings: 30000000, booking_unit: "bookings", hubs: [], description: "Largest OTA in Asia (Ctrip)" },
  { company_name: "eDreams ODIGEO", country: "Spain", continent: "Europe", flight_bookings: 25000000, accommodation_bookings: 5000000, car_bookings: 2000000, booking_unit: "bookings", hubs: [], description: "Largest European flight OTA (eDreams, Opodo, Travellink)" },
  { company_name: "Kiwi.com", country: "Czech Republic", continent: "Europe", flight_bookings: 15000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Virtual interlining flight OTA" },
  { company_name: "Skyscanner", country: "United Kingdom", continent: "Europe", flight_bookings: 100000000, accommodation_bookings: 20000000, car_bookings: 5000000, booking_unit: "bookings", hubs: [], description: "Flight metasearch leader (Trip.com Group)" },
  { company_name: "Kayak", country: "United States", continent: "North America", flight_bookings: 50000000, accommodation_bookings: 30000000, car_bookings: 10000000, booking_unit: "bookings", hubs: [], description: "Travel metasearch (Booking Holdings)" },
  { company_name: "Google Flights", country: "United States", continent: "North America", flight_bookings: 500000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Flight metasearch by Google" },
  { company_name: "Google Travel", country: "United States", continent: "North America", flight_bookings: 200000000, accommodation_bookings: 100000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Google travel planning platform" },
  { company_name: "Trivago", country: "Germany", continent: "Europe", flight_bookings: 0, accommodation_bookings: 500000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Hotel metasearch (Expedia Group)" },
  { company_name: "Tripadvisor", country: "United States", continent: "North America", flight_bookings: 5000000, accommodation_bookings: 100000000, car_bookings: 2000000, booking_unit: "bookings", hubs: [], description: "Travel platform with hotel & flight booking" },
  { company_name: "Hopper", country: "Canada", continent: "North America", flight_bookings: 15000000, accommodation_bookings: 10000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Mobile-first travel booking app" },
  { company_name: "Momondo", country: "Denmark", continent: "Europe", flight_bookings: 10000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Flight metasearch (Booking Holdings)" },
  { company_name: "Rome2Rio", country: "Australia", continent: "Oceania", flight_bookings: 2000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Multi-modal travel search" },
  { company_name: "Webjet", country: "Australia", continent: "Oceania", flight_bookings: 3000000, accommodation_bookings: 2000000, car_bookings: 1000000, booking_unit: "bookings", hubs: [], description: "Australian OTA" },
  { company_name: "Priceline", country: "United States", continent: "North America", flight_bookings: 10000000, accommodation_bookings: 50000000, car_bookings: 2000000, booking_unit: "bookings", hubs: [], description: "US OTA (Booking Holdings)" },
  { company_name: "Hotels.com", country: "United States", continent: "North America", flight_bookings: 0, accommodation_bookings: 100000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Accommodation OTA (Expedia Group)" },
  { company_name: "Vrbo", country: "United States", continent: "North America", flight_bookings: 0, accommodation_bookings: 50000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Vacation rental OTA (Expedia Group)" },
  { company_name: "Orbitz", country: "United States", continent: "North America", flight_bookings: 10000000, accommodation_bookings: 20000000, car_bookings: 5000000, booking_unit: "bookings", hubs: [], description: "US OTA (Expedia Group)" },
  { company_name: "Travelocity", country: "United States", continent: "North America", flight_bookings: 5000000, accommodation_bookings: 10000000, car_bookings: 2000000, booking_unit: "bookings", hubs: [], description: "US OTA (Expedia Group)" },
  { company_name: "CheapOair", country: "United States", continent: "North America", flight_bookings: 5000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "US flight OTA (Fareportal)" },
  { company_name: "JustFly", country: "Canada", continent: "North America", flight_bookings: 5000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Canadian OTA (FlightHub)" },
  { company_name: "FlightHub", country: "Canada", continent: "North America", flight_bookings: 5000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Canadian OTA" },
  { company_name: "MakeMyTrip", country: "India", continent: "Asia", flight_bookings: 30000000, accommodation_bookings: 40000000, car_bookings: 2000000, booking_unit: "bookings", hubs: [], description: "Largest OTA in India" },
  { company_name: "Goibibo", country: "India", continent: "Asia", flight_bookings: 20000000, accommodation_bookings: 25000000, car_bookings: 1000000, booking_unit: "bookings", hubs: [], description: "Indian OTA (MakeMyTrip Group)" },
  { company_name: "Cleartrip", country: "India", continent: "Asia", flight_bookings: 8000000, accommodation_bookings: 5000000, car_bookings: 1000000, booking_unit: "bookings", hubs: [], description: "Indian OTA (Flipkart)" },
  { company_name: "Yatra", country: "India", continent: "Asia", flight_bookings: 5000000, accommodation_bookings: 3000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Indian OTA" },
  { company_name: "Ixigo", country: "India", continent: "Asia", flight_bookings: 5000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Indian travel metasearch" },
  { company_name: "EaseMyTrip", country: "India", continent: "Asia", flight_bookings: 5000000, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Indian OTA" },
  { company_name: "Agoda", country: "Singapore", continent: "Asia", flight_bookings: 0, accommodation_bookings: 200000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Asian accommodation OTA (Booking Holdings)" },
  { company_name: "Klook", country: "Hong Kong", continent: "Asia", flight_bookings: 0, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Asian activities & travel booking" },
  { company_name: "Secret Escapes", country: "United Kingdom", continent: "Europe", flight_bookings: 0, accommodation_bookings: 10000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "UK members-only travel deals OTA" },
  { company_name: "Loveholidays", country: "United Kingdom", continent: "Europe", flight_bookings: 3000000, accommodation_bookings: 3000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "UK package holiday OTA" },
  { company_name: "On the Beach", country: "United Kingdom", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "UK beach holiday OTA" },
  { company_name: "Jet2holidays", country: "United Kingdom", continent: "Europe", flight_bookings: 3000000, accommodation_bookings: 3000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "UK package holiday operator (Jet2)" },
  { company_name: "easyJet holidays", country: "United Kingdom", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "easyJet package holiday brand" },
  { company_name: "Lastminute.com", country: "Switzerland", continent: "Europe", flight_bookings: 4000000, accommodation_bookings: 3000000, car_bookings: 1000000, booking_unit: "bookings", hubs: [], description: "European OTA for flights & hotels" },
  { company_name: "Travelgenio", country: "Spain", continent: "Europe", flight_bookings: 4000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Spanish international flight OTA" },
  { company_name: "Logitravel", country: "Spain", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Spanish leisure OTA" },
  { company_name: "Opodo", country: "United Kingdom", continent: "Europe", flight_bookings: 8000000, accommodation_bookings: 5000000, car_bookings: 2000000, booking_unit: "bookings", hubs: [], description: "European OTA (eDreams ODIGEO)" },
  { company_name: "Travix International", country: "Netherlands", continent: "Europe", flight_bookings: 10000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch OTA group (BudgetAir, Vliegwinkel, CheapTickets)" },
  { company_name: "BudgetAir", country: "Netherlands", continent: "Europe", flight_bookings: 3000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch flight OTA (Travix)" },
  { company_name: "Vliegwinkel", country: "Netherlands", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch flight OTA (Travix)" },
  { company_name: "CheapTickets.nl", country: "Netherlands", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch OTA (Travix)" },
  { company_name: "TUI.nl", country: "Netherlands", continent: "Europe", flight_bookings: 3000000, accommodation_bookings: 3000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch TUI online platform" },

  // ── Tour Operators (package deals — each booking = flight + accommodation) ──
  { company_name: "TUI Group", country: "Germany", continent: "Europe", flight_bookings: 20000000, accommodation_bookings: 20000000, car_bookings: 1000000, booking_unit: "bookings", hubs: [], description: "World's largest tour operator" },
  { company_name: "TUI Netherlands", country: "Netherlands", continent: "Europe", flight_bookings: 3000000, accommodation_bookings: 3000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch TUI subsidiary" },
  { company_name: "TUI Belgium", country: "Belgium", continent: "Europe", flight_bookings: 1500000, accommodation_bookings: 1500000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Belgian TUI subsidiary" },
  { company_name: "TUI France", country: "France", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "French TUI subsidiary" },
  { company_name: "TUI UK", country: "United Kingdom", continent: "Europe", flight_bookings: 5000000, accommodation_bookings: 5000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "UK TUI subsidiary" },
  { company_name: "TUI Deutschland", country: "Germany", continent: "Europe", flight_bookings: 5000000, accommodation_bookings: 5000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "German TUI subsidiary" },
  { company_name: "TUI Sweden", country: "Sweden", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Swedish TUI subsidiary" },
  { company_name: "TUI Norge", country: "Norway", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Norwegian TUI subsidiary" },
  { company_name: "TUI Denmark", country: "Denmark", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Danish TUI subsidiary" },
  { company_name: "TUI Finland", country: "Finland", continent: "Europe", flight_bookings: 500000, accommodation_bookings: 500000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Finnish TUI subsidiary" },
  { company_name: "Corendon Tour Operator", country: "Netherlands", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch-Turkish leisure tour operator" },
  { company_name: "Sunweb Group", country: "Netherlands", continent: "Europe", flight_bookings: 3000000, accommodation_bookings: 3000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch package travel operator" },
  { company_name: "DER Touristik", country: "Germany", continent: "Europe", flight_bookings: 8000000, accommodation_bookings: 8000000, car_bookings: 1000000, booking_unit: "bookings", hubs: [], description: "German tour operator (REWE Group)" },
  { company_name: "Schauinsland Reisen", country: "Germany", continent: "Europe", flight_bookings: 4000000, accommodation_bookings: 4000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "German leisure tour operator" },
  { company_name: "Alltours", country: "Germany", continent: "Europe", flight_bookings: 3000000, accommodation_bookings: 3000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "German package holiday operator" },
  { company_name: "FTI Group", country: "Germany", continent: "Europe", flight_bookings: 6000000, accommodation_bookings: 6000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "German tour operator (5vorFlug, BigXtra)" },
  { company_name: "D-Reizen", country: "Netherlands", continent: "Europe", flight_bookings: 1500000, accommodation_bookings: 1500000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch travel agency chain" },
  { company_name: "Thomas Cook Netherlands", country: "Netherlands", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch package travel brand" },
  { company_name: "Globus Family of Brands", country: "United States", continent: "North America", flight_bookings: 2000000, accommodation_bookings: 2000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "US tour operator (Globus, Cosmos)" },
  { company_name: "Insight Vacations", country: "United Kingdom", continent: "Europe", flight_bookings: 1500000, accommodation_bookings: 1500000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "UK escorted tour operator (The Travel Corporation)" },
  { company_name: "Apollo (Apollo Travel Group)", country: "Sweden", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Swedish tour operator" },
  { company_name: "KRAS (Kras Travel)", country: "Netherlands", continent: "Europe", flight_bookings: 500000, accommodation_bookings: 500000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch tour operator (TUI)" },
  { company_name: "Arke (TUI Netherlands)", country: "Netherlands", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch TUI brand" },
  { company_name: "Nazár (Nazár Holidays)", country: "Netherlands", continent: "Europe", flight_bookings: 200000, accommodation_bookings: 200000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch specialist tour operator" },

  // ── Travel Agencies (corporate & leisure — primarily flights, some accommodation/cars) ──
  { company_name: "Flight Centre Travel Group", country: "Australia", continent: "Oceania", flight_bookings: 5000000, accommodation_bookings: 2000000, car_bookings: 500000, booking_unit: "bookings", hubs: [], description: "Global travel agency network" },
  { company_name: "Amex GBT (American Express Global Business Travel)", country: "United States", continent: "North America", flight_bookings: 12000000, accommodation_bookings: 5000000, car_bookings: 1000000, booking_unit: "bookings", hubs: [], description: "Corporate travel management leader" },
  { company_name: "BCD Travel", country: "Netherlands", continent: "Europe", flight_bookings: 15000000, accommodation_bookings: 6000000, car_bookings: 2000000, booking_unit: "bookings", hubs: [], description: "Global corporate travel agency" },
  { company_name: "CWT (Carlson Wagonlit Travel)", country: "United States", continent: "North America", flight_bookings: 10000000, accommodation_bookings: 4000000, car_bookings: 1000000, booking_unit: "bookings", hubs: [], description: "Corporate travel management company" },
  { company_name: "Egencia", country: "United States", continent: "North America", flight_bookings: 5000000, accommodation_bookings: 3000000, car_bookings: 500000, booking_unit: "bookings", hubs: [], description: "Corporate travel (Expedia Group)" },
  { company_name: "Corporate Travel Management (CTM)", country: "Australia", continent: "Oceania", flight_bookings: 3000000, accommodation_bookings: 1000000, car_bookings: 500000, booking_unit: "bookings", hubs: [], description: "Corporate travel management" },
  { company_name: "ATG Travel Worldwide", country: "Netherlands", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 0, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Dutch business travel agency" },
  { company_name: "BCD Meetings & Events", country: "Netherlands", continent: "Europe", flight_bookings: 1000000, accommodation_bookings: 1000000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "Meetings & events travel (BCD)" },
  { company_name: "Uniglobe Travel", country: "Canada", continent: "North America", flight_bookings: 2000000, accommodation_bookings: 500000, car_bookings: 200000, booking_unit: "bookings", hubs: [], description: "Global travel agency franchise" },
  { company_name: "Voyageurs du Monde", country: "France", continent: "Europe", flight_bookings: 1500000, accommodation_bookings: 1500000, car_bookings: 0, booking_unit: "bookings", hubs: [], description: "French luxury tailor-made travel" },
  { company_name: "Lufthansa City Center", country: "Germany", continent: "Europe", flight_bookings: 2000000, accommodation_bookings: 1000000, car_bookings: 200000, booking_unit: "bookings", hubs: [], description: "German travel agency franchise" },
];

// ── Flight-only partners (cruise lines & sightseeing — no accommodation/car packages) ──
const FLIGHT_ONLY_PARTNERS = [
  // ── Cruise Lines ────────────────────────────────────────────────────
  { company_name: "Carnival Corporation & plc", country: "United States", continent: "North America", annual_bookings: 13000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "World's largest cruise company (9 brands)" },
  { company_name: "Royal Caribbean Group", country: "United States", continent: "North America", annual_bookings: 8000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Global cruise company (Royal Caribbean, Celebrity, Silversea)" },
  { company_name: "Norwegian Cruise Line Holdings", country: "United States", continent: "North America", annual_bookings: 3000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Cruise company (NCL, Oceania, Regent)" },
  { company_name: "MSC Cruises", country: "Switzerland", continent: "Europe", annual_bookings: 2000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Swiss-based cruise line (Mediterranean Shipping Company)" },
  { company_name: "Costa Cruises", country: "Italy", continent: "Europe", annual_bookings: 1500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Italian cruise line (Carnival Corp)" },
  { company_name: "AIDA Cruises", country: "Germany", continent: "Europe", annual_bookings: 700000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "German cruise line (Carnival Corp)" },
  { company_name: "P&O Cruises", country: "United Kingdom", continent: "Europe", annual_bookings: 800000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "UK cruise line (Carnival Corp)" },
  { company_name: "Princess Cruises", country: "United States", continent: "North America", annual_bookings: 1500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US cruise line (Carnival Corp)" },
  { company_name: "Holland America Line", country: "United States", continent: "North America", annual_bookings: 800000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Cruise line (Carnival Corp)" },
  { company_name: "Cunard Line", country: "United Kingdom", continent: "Europe", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "UK luxury cruise line (Carnival Corp)" },
  { company_name: "Seabourn Cruise Line", country: "United States", continent: "North America", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US luxury cruise line (Carnival Corp)" },
  { company_name: "Celebrity Cruises", country: "United States", continent: "North America", annual_bookings: 1500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US premium cruise line (Royal Caribbean)" },
  { company_name: "Silversea Cruises", country: "Monaco", continent: "Europe", annual_bookings: 300000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Luxury cruise line (Royal Caribbean)" },
  { company_name: "Oceania Cruises", country: "United States", continent: "North America", annual_bookings: 400000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US premium cruise line (NCLH)" },
  { company_name: "Regent Seven Seas Cruises", country: "United States", continent: "North America", annual_bookings: 300000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US luxury cruise line (NCLH)" },
  { company_name: "Viking River Cruises", country: "Switzerland", continent: "Europe", annual_bookings: 500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Swiss river & ocean cruise line" },
  { company_name: "Viking Ocean Cruises", country: "Switzerland", continent: "Europe", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Swiss ocean cruise line" },
  { company_name: "Fred. Olsen Cruise Lines", country: "Norway", continent: "Europe", annual_bookings: 100000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Norwegian cruise line" },
  { company_name: "Pullmantur Cruises", country: "Spain", continent: "Europe", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Spanish cruise line" },
  { company_name: "CroisiEurope", country: "France", continent: "Europe", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "European river cruise line" },
  { company_name: "A-ROSA River Cruises", country: "Germany", continent: "Europe", annual_bookings: 100000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "German river cruise line" },
  { company_name: "Tauck River Cruising", country: "United States", continent: "North America", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US river cruise operator" },
  { company_name: "AmaWaterways", country: "United States", continent: "North America", annual_bookings: 150000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US river cruise line" },
  { company_name: "Avalon Waterways", country: "United States", continent: "North America", annual_bookings: 100000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US river cruise line (Globus)" },
  { company_name: "Scenic Luxury Cruises & Tours", country: "Australia", continent: "Oceania", annual_bookings: 50000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Australian luxury river cruise line" },
  { company_name: "Emerald Waterways", country: "Australia", continent: "Oceania", annual_bookings: 50000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Australian river cruise line (Scenic)" },
  { company_name: "Uniworld Boutique River Cruise", country: "United States", continent: "North America", annual_bookings: 100000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US boutique river cruise line" },
  { company_name: "American Cruise Lines", country: "United States", continent: "North America", annual_bookings: 100000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US river & coastal cruise line" },
  { company_name: "Windstar Cruises", country: "United States", continent: "North America", annual_bookings: 50000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US small ship cruise line" },

  // ── Sightseeing & Day Tour Operators ────────────────────────────────
  { company_name: "GetYourGuide", country: "Switzerland", continent: "Europe", annual_bookings: 15000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Swiss activities & tours booking platform" },
  { company_name: "Viator", country: "United States", continent: "North America", annual_bookings: 10000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US tours & activities OTA (Tripadvisor)" },
  { company_name: "Big Bus Tours", country: "United Kingdom", continent: "Europe", annual_bookings: 2000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "UK sightseeing bus tours" },
  { company_name: "Gray Line Tours", country: "United States", continent: "North America", annual_bookings: 2000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "US sightseeing tours" },
  { company_name: "City Sightseeing Amsterdam", country: "Netherlands", continent: "Europe", annual_bookings: 500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Amsterdam canal & bus tours" },
  { company_name: "Lovers Canal Cruises", country: "Netherlands", continent: "Europe", annual_bookings: 500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Amsterdam canal cruises" },
  { company_name: "Blue Boat Company", country: "Netherlands", continent: "Europe", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Amsterdam canal cruises" },
  { company_name: "Rederij Noord-Zuid", country: "Netherlands", continent: "Europe", annual_bookings: 100000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Dutch canal cruise operator" },
  { company_name: "Rederij Plas", country: "Netherlands", continent: "Europe", annual_bookings: 100000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Amsterdam canal cruises" },
  { company_name: "Hop-on Hop-off Amsterdam", country: "Netherlands", continent: "Europe", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "Amsterdam bus tours" },
  { company_name: "Circle Line Sightseeing", country: "United States", continent: "North America", annual_bookings: 500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "NYC sightseeing cruises" },
  { company_name: "CitySights NY", country: "United States", continent: "North America", annual_bookings: 500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "NYC sightseeing tours" },
  { company_name: "Big Bus New York", country: "United States", continent: "North America", annual_bookings: 500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "NYC hop-on hop-off tours" },
  { company_name: "Big Bus London", country: "United Kingdom", continent: "Europe", annual_bookings: 1000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "London hop-on hop-off tours" },
  { company_name: "Golden Tours", country: "United Kingdom", continent: "Europe", annual_bookings: 1000000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "UK sightseeing tours" },
  { company_name: "Evan Evans Tours", country: "United Kingdom", continent: "Europe", annual_bookings: 500000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "UK sightseeing tours (The Travel Corporation)" },
  { company_name: "Premium Tours", country: "United Kingdom", continent: "Europe", annual_bookings: 200000, booking_unit: "bookings", vertical: "flight", hubs: [], description: "UK sightseeing tours" },
];

// ── Expand each OTA into up to 3 vertical-specific entries ──────────
// Only verticals with a non-zero volume get an entry, so an OTA like
// Booking.com (accommodation-dominant) won't appear in the car rental
// calculator, and Kiwi.com (flights-only) won't appear in accommodation.
const OTA_ENTRIES = OTAS_AND_PLATFORMS.flatMap((p) => {
  const entries = [];
  if (p.flight_bookings > 0) {
    entries.push({ company_name: p.company_name, country: p.country, continent: p.continent, annual_bookings: p.flight_bookings, booking_unit: p.booking_unit, vertical: "flight", hubs: p.hubs, description: p.description });
  }
  if (p.accommodation_bookings > 0) {
    entries.push({ company_name: p.company_name, country: p.country, continent: p.continent, annual_bookings: p.accommodation_bookings, booking_unit: p.booking_unit, vertical: "accommodation", hubs: p.hubs, description: p.description });
  }
  if (p.car_bookings > 0) {
    entries.push({ company_name: p.company_name, country: p.country, continent: p.continent, annual_bookings: p.car_bookings, booking_unit: p.booking_unit, vertical: "car", hubs: p.hubs, description: p.description });
  }
  return entries;
});

// ── Combine all sources ──────────────────────────────────────────────
const ALL_PARTNERS = [
  ...AIRLINES.map((p) => ({ ...p, vertical: "flight" })),
  ...HOTEL_CHAINS.map((p) => ({ ...p, vertical: "accommodation" })),
  ...CAR_RENTAL_COMPANIES.map((p) => ({ ...p, vertical: "car" })),
  ...OTA_ENTRIES,
  ...FLIGHT_ONLY_PARTNERS,
];

export const TRAVEL_PARTNERS = ALL_PARTNERS.map((p) => ({
  ...p,
  monthly_bookings: Math.round(p.annual_bookings / 12),
}));

export const PARTNER_CONTINENTS = [
  ...new Set(ALL_PARTNERS.map((p) => p.continent)),
].sort();

export function getPartnersByVertical(vertical) {
  return TRAVEL_PARTNERS.filter((p) => p.vertical === vertical);
}

export function getPartnersByVerticalAndContinent(vertical, continent) {
  return TRAVEL_PARTNERS.filter(
    (p) => p.vertical === vertical && (continent === "all" || p.continent === continent)
  );
}