/**
 * Car rental companies with airport presence or airport transfer/shuttle service.
 * Includes global brands, regional brands with airport desks, and major brokers
 * that source airport rentals. Excludes: e-scooters, bike-sharing, peer-to-peer
 * non-airport car-sharing, truck/van rental, and single-city local rentals.
 * Sources: company annual reports, ACRISS, airport concession lists.
 * Figures are approximate annual rentals for estimation.
 */

export const CAR_RENTAL_COMPANIES = [
  // ── Global Major Brands (airport desks worldwide) ──────────────────
  { company_name: "Enterprise Holdings", country: "United States", continent: "North America", annual_bookings: 50000000, booking_unit: "rentals", hubs: [], description: "Largest car rental company in the world (Enterprise, National, Alamo — 10,000+ airport locations)" },
  { company_name: "Enterprise Rent-A-Car", country: "United States", continent: "North America", annual_bookings: 30000000, booking_unit: "rentals", hubs: [], description: "Enterprise Holdings flagship brand (airport + neighborhood)" },
  { company_name: "National Car Rental", country: "United States", continent: "North America", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "Enterprise Holdings business travel brand (airport-focused)" },
  { company_name: "Alamo Rent a Car", country: "United States", continent: "North America", annual_bookings: 5000000, booking_unit: "rentals", hubs: [], description: "Enterprise Holdings leisure brand (airport-focused)" },
  { company_name: "Hertz Global Holdings", country: "United States", continent: "North America", annual_bookings: 20000000, booking_unit: "rentals", hubs: [], description: "Global car rental company (12,000+ locations, 160 countries)" },
  { company_name: "Hertz", country: "United States", continent: "North America", annual_bookings: 15000000, booking_unit: "rentals", hubs: [], description: "Hertz flagship brand (airport + city)" },
  { company_name: "Thrifty Car Rental", country: "United States", continent: "North America", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "Hertz budget brand (airport-focused)" },
  { company_name: "Dollar Car Rental", country: "United States", continent: "North America", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Hertz brand (airport-focused)" },
  { company_name: "Firefly Car Rental", country: "United States", continent: "North America", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Hertz budget brand (Europe airport desks)" },
  { company_name: "Avis Budget Group", country: "United States", continent: "North America", annual_bookings: 20000000, booking_unit: "rentals", hubs: [], description: "Global car rental company (11,000+ locations, 180 countries)" },
  { company_name: "Avis Rent a Car", country: "United States", continent: "North America", annual_bookings: 12000000, booking_unit: "rentals", hubs: [], description: "Avis Budget Group flagship brand (airport + city)" },
  { company_name: "Budget Rent a Car", country: "United States", continent: "North America", annual_bookings: 8000000, booking_unit: "rentals", hubs: [], description: "Avis Budget Group value brand (airport + city)" },
  { company_name: "Payless Car Rental", country: "United States", continent: "North America", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Avis Budget Group budget brand (airport)" },
  { company_name: "Zipcar", country: "United States", continent: "North America", annual_bookings: 5000000, booking_unit: "rentals", hubs: [], description: "Avis Budget Group car-sharing (city + airport)" },
  { company_name: "Sixt SE", country: "Germany", continent: "Europe", annual_bookings: 10000000, booking_unit: "rentals", hubs: [], description: "European car rental company (2,000+ locations, 110 countries, strong airport presence)" },
  { company_name: "Sixt rent a car", country: "Germany", continent: "Europe", annual_bookings: 8000000, booking_unit: "rentals", hubs: [], description: "Sixt flagship brand (airport + city, Europe + global expansion)" },
  { company_name: "Sixt Share", country: "Germany", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Sixt car-sharing (German cities)" },
  { company_name: "Europcar Mobility Group", country: "France", continent: "Europe", annual_bookings: 15000000, booking_unit: "rentals", hubs: [], description: "European car rental group (3,800+ locations, 140 countries, Volkswagen Group)" },
  { company_name: "Europcar", country: "France", continent: "Europe", annual_bookings: 10000000, booking_unit: "rentals", hubs: [], description: "Europcar flagship brand (airport + city)" },
  { company_name: "Goldcar", country: "Spain", continent: "Europe", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "Europcar budget brand (airport desks, Spain + Southern Europe)" },
  { company_name: "Ubeeqo", country: "France", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Europcar car-sharing (European cities)" },

  // ── Regional Brands with Airport Desks ─────────────────────────────
  { company_name: "Auto Europe", country: "United States", continent: "North America", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "US car rental broker (24,000+ pickup locations, 180 countries)" },
  { company_name: "SIXT Nederland", country: "Germany", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Sixt Netherlands operations (Schiphol + city)" },
  { company_name: "Hertz Nederland", country: "United States", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Hertz Netherlands operations (Schiphol + city)" },
  { company_name: "Avis Nederland", country: "United States", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Avis Netherlands operations (Schiphol + city)" },
  { company_name: "Enterprise Nederland", country: "United States", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Enterprise Netherlands operations (Schiphol + city)" },
  { company_name: "Europcar Nederland", country: "France", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Europcar Netherlands operations (Schiphol + city)" },
  { company_name: "Budget Nederland", country: "United States", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Budget Netherlands operations (Schiphol + city)" },
  { company_name: "Sunnycars", country: "Netherlands", continent: "Europe", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Dutch car rental broker (15,000+ pickup locations, 120 countries)" },
  { company_name: "Sunny Cars", country: "Netherlands", continent: "Europe", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Dutch car rental broker (airport + resort pickups)" },
  { company_name: "Hertz Europe", country: "United States", continent: "Europe", annual_bookings: 8000000, booking_unit: "rentals", hubs: [], description: "Hertz European operations (airport desks)" },
  { company_name: "Avis Europe", country: "United States", continent: "Europe", annual_bookings: 8000000, booking_unit: "rentals", hubs: [], description: "Avis European operations (airport desks)" },
  { company_name: "Enterprise Europe", country: "United States", continent: "Europe", annual_bookings: 15000000, booking_unit: "rentals", hubs: [], description: "Enterprise European operations (airport desks)" },
  { company_name: "Sixt Europe", country: "Germany", continent: "Europe", annual_bookings: 6000000, booking_unit: "rentals", hubs: [], description: "Sixt European operations (airport desks)" },
  { company_name: "Europcar Europe", country: "France", continent: "Europe", annual_bookings: 8000000, booking_unit: "rentals", hubs: [], description: "Europcar European operations (airport desks)" },
  { company_name: "Budget Europe", country: "United States", continent: "Europe", annual_bookings: 5000000, booking_unit: "rentals", hubs: [], description: "Budget European operations (airport desks)" },
  { company_name: "Alamo Europe", country: "United States", continent: "Europe", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "Alamo European operations (airport desks)" },
  { company_name: "National Europe", country: "United States", continent: "Europe", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "National European operations (airport desks)" },
  { company_name: "Thrifty Europe", country: "United States", continent: "Europe", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Thrifty European operations (airport desks)" },
  { company_name: "Dollar Europe", country: "United States", continent: "Europe", annual_bookings: 1500000, booking_unit: "rentals", hubs: [], description: "Dollar European operations (airport desks)" },

  // ── Airport Brokers & Comparison Platforms ─────────────────────────
  { company_name: "Rentalcars.com", country: "United Kingdom", continent: "Europe", annual_bookings: 8000000, booking_unit: "rentals", hubs: [], description: "UK car rental broker (Booking Holdings, 60,000+ locations, airport-focused)" },
  { company_name: "Holiday Autos", country: "United Kingdom", continent: "Europe", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "UK car rental broker (Booking Holdings, 160 countries)" },
  { company_name: "CarTrawler", country: "Ireland", continent: "Europe", annual_bookings: 5000000, booking_unit: "rentals", hubs: [], description: "Irish car rental distribution platform (2M+ rentals/year, airline partnerships)" },
  { company_name: "Argus Car Hire", country: "Ireland", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Irish car rental broker (airport + city pickups)" },
  { company_name: "Nova Car Hire", country: "Ireland", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Irish car rental broker (airport + city pickups)" },
  { company_name: "Economy Car Rentals", country: "Greece", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Greek car rental broker (airport + city pickups)" },
  { company_name: "Billiger Mietwagen", country: "Germany", continent: "Europe", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "German car rental comparison (airport + city pickups)" },
  { company_name: "DriveBoo", country: "Germany", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "German car rental comparison (airport + city pickups)" },
  { company_name: "Check24 Autovermietung", country: "Germany", continent: "Europe", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "German car rental comparison (airport + city pickups)" },
  { company_name: "Carrentals.com", country: "United States", continent: "North America", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "US car rental comparison (Expedia, airport + city pickups)" },
  { company_name: "Expedia Car Rental", country: "United States", continent: "North America", annual_bookings: 5000000, booking_unit: "rentals", hubs: [], description: "US car rental (Expedia Group, airport + city pickups)" },
  { company_name: "Priceline Car Rental", country: "United States", continent: "North America", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "US car rental (Booking Holdings, airport + city pickups)" },
  { company_name: "Hotwire Car Rental", country: "United States", continent: "North America", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "US car rental (Expedia, airport + city pickups)" },
  { company_name: "Costco Travel Car Rental", country: "United States", continent: "North America", annual_bookings: 3000000, booking_unit: "rentals", hubs: [], description: "US car rental (Costco, airport + city pickups)" },
  { company_name: "AAA Car Rental", country: "United States", continent: "North America", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "US car rental (AAA, airport + city pickups)" },
  { company_name: "Easycar", country: "United Kingdom", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "UK car rental broker (easyGroup, airport + city pickups)" },

  // ── Spanish / Mediterranean Airport Brands ─────────────────────────
  { company_name: "Centauro Rent a Car", country: "Spain", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Spain + Portugal + Italy + Greece)" },
  { company_name: "Record Go", country: "Spain", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Spain + Portugal)" },
  { company_name: "OK Mobility", country: "Spain", continent: "Europe", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Spain + Portugal + Italy)" },
  { company_name: "Drivalia", country: "Spain", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Spain + Portugal)" },
  { company_name: "Autoreisen", country: "Spain", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Canary Islands)" },
  { company_name: "Cicar", country: "Spain", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Canary Islands)" },
  { company_name: "Plus Car", country: "Spain", continent: "Europe", annual_bookings: 200000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Canary Islands)" },
  { company_name: "Top Car AutoReisen", country: "Spain", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Canary Islands)" },
  { company_name: "Dickmanns Rent a Car", country: "Spain", continent: "Europe", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Canary Islands)" },
  { company_name: "Class Rent a Car", country: "Spain", continent: "Europe", annual_bookings: 200000, booking_unit: "rentals", hubs: [], description: "Spanish car rental (airport desks, Canary Islands)" },

  // ── Australia / Oceania Airport Brands ─────────────────────────────
  { company_name: "Hertz Australia", country: "United States", continent: "Oceania", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Hertz Australia operations (airport desks)" },
  { company_name: "Avis Australia", country: "United States", continent: "Oceania", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Avis Australia operations (airport desks)" },
  { company_name: "Budget Australia", country: "United States", continent: "Oceania", annual_bookings: 1500000, booking_unit: "rentals", hubs: [], description: "Budget Australia operations (airport desks)" },
  { company_name: "Enterprise Australia", country: "United States", continent: "Oceania", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Enterprise Australia operations (airport desks)" },
  { company_name: "Thrifty Australia", country: "United States", continent: "Oceania", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Thrifty Australia operations (airport desks)" },
  { company_name: "Europcar Australia", country: "France", continent: "Oceania", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Europcar Australia operations (airport desks)" },
  { company_name: "Redspot Car Rentals", country: "Australia", continent: "Oceania", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Australian car rental (airport desks, East Coast)" },
  { company_name: "East Coast Car Rentals", country: "Australia", continent: "Oceania", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Australian car rental (airport desks, East Coast)" },

  // ── Japan Airport Brands ───────────────────────────────────────────
  { company_name: "Times Car Rental", country: "Japan", continent: "Asia", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "Japanese car rental (airport desks, Japan)" },
  { company_name: "Nippon Rent-A-Car", country: "Japan", continent: "Asia", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Japanese car rental (airport + city, Japan)" },
  { company_name: "Toyota Rent a Car", country: "Japan", continent: "Asia", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Japanese car rental (airport + city, Toyota)" },
  { company_name: "Orix Rent a Car", country: "Japan", continent: "Asia", annual_bookings: 2000000, booking_unit: "rentals", hubs: [], description: "Japanese car rental (airport + city, Orix)" },
  { company_name: "Budget Japan", country: "United States", continent: "Asia", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Budget Japan operations (airport desks)" },
  { company_name: "Hertz Japan", country: "United States", continent: "Asia", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Hertz Japan operations (airport desks)" },
  { company_name: "Avis Japan", country: "United States", continent: "Asia", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Avis Japan operations (airport desks)" },
  { company_name: "Enterprise Japan", country: "United States", continent: "Asia", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "Enterprise Japan operations (airport desks)" },

  // ── Campervan / RV Rental (Airport Pickup) ──────────────────────────
  { company_name: "Apollo CamperVans", country: "Australia", continent: "Oceania", annual_bookings: 200000, booking_unit: "rentals", hubs: [], description: "Australian campervan rental (airport + depot pickups, Apollo Tourism)" },
  { company_name: "Maui Campervans", country: "New Zealand", continent: "Oceania", annual_bookings: 200000, booking_unit: "rentals", hubs: [], description: "NZ campervan rental (Tourism Holdings, airport pickups)" },
  { company_name: "Britz Campervans", country: "New Zealand", continent: "Oceania", annual_bookings: 200000, booking_unit: "rentals", hubs: [], description: "NZ campervan rental (Tourism Holdings, airport pickups)" },
  { company_name: "Tourism Holdings Limited", country: "New Zealand", continent: "Oceania", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "NZ RV rental group (Maui, Britz, Road Bear, El Monte — airport + depot pickups)" },
  { company_name: "Road Bear RV", country: "United States", continent: "North America", annual_bookings: 100000, booking_unit: "rentals", hubs: [], description: "US RV rental (Tourism Holdings, depot pickups near airports)" },
  { company_name: "El Monte RV", country: "United States", continent: "North America", annual_bookings: 200000, booking_unit: "rentals", hubs: [], description: "US RV rental (depot pickups near airports)" },
  { company_name: "Cruise America", country: "United States", continent: "North America", annual_bookings: 500000, booking_unit: "rentals", hubs: [], description: "US RV rental (depot pickups near airports)" },
  { company_name: "Outdoorsy", country: "United States", continent: "North America", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "US peer-to-peer RV rental (pickup points, 4,800+ cities)" },
  { company_name: "RVshare", country: "United States", continent: "North America", annual_bookings: 1000000, booking_unit: "rentals", hubs: [], description: "US peer-to-peer RV rental (pickup points, 50 states)" },
  { company_name: "McRent", country: "Germany", continent: "Europe", annual_bookings: 100000, booking_unit: "rentals", hubs: [], description: "German campervan rental (depot pickups, Europe)" },
  { company_name: "PaulCamper", country: "Germany", continent: "Europe", annual_bookings: 200000, booking_unit: "rentals", hubs: [], description: "German peer-to-peer campervan rental (pickup points, Europe)" },
  { company_name: "Yescapa", country: "France", continent: "Europe", annual_bookings: 300000, booking_unit: "rentals", hubs: [], description: "French peer-to-peer campervan rental (pickup points, Europe)" },
];

export const CAR_RENTAL_DEFAULTS = {
  booking_unit: "rentals",
  vertical: "car",
};