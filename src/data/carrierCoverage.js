/**
 * Which carriers actually operate at which location.
 *
 * Used by the traveller claim form so that picking a departure port, station or
 * airport narrows the carrier list to the companies that really serve it:
 *  - train: exact match against the hubs of every operator in the rail directory
 *  - cruise / coach / car rental: region or country coverage per carrier
 *  - flight: airlines based at (or hubbed at) the chosen airport, else carriers
 *    from the same part of the world
 *
 * A location we have no coverage data for falls back to the full carrier list,
 * and every carrier field still accepts free text.
 */

import { AIRLINES } from './airlines';
import { RAIL_OPERATORS } from './railOperators';
import { CARRIERS_BY_TYPE } from './carriers';
import { regionForAirportCountry } from './countryRegions';

// ── helpers ────────────────────────────────────────────────────────────────

const norm = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();

// Spelling variants that appear across the datasets.
const ALIASES = {
  turkey: 'turkiye',
  'united states of america': 'united states',
  usa: 'united states',
  'czech republic': 'czechia',
  holland: 'netherlands',
  'korea, republic of': 'republic of korea',
  'south korea': 'republic of korea',
  russia: 'russian federation',
  'cape verde': 'cabo verde',
  'ivory coast': 'cote divoire',
};

const key = (country) => {
  const n = norm(country);
  return ALIASES[n] || n;
};

// ── cruise: port region → cruise line regions ──────────────────────────────

// med      Mediterranean, Black Sea and Atlantic Europe
// north    Northern Europe, Baltic, British Isles, North Atlantic
// caribbean Caribbean, Bahamas, Bermuda, Gulf of Mexico
// na       North America (Alaska, US & Canadian coasts)
// latam    Central & South America
// asia     Asia, Middle East, Indian Ocean
// africa   Sub-Saharan Africa & the African Indian Ocean islands
// oceania  Australia, New Zealand & the South Pacific
const PORT_REGIONS = {
  // Mediterranean & Atlantic Europe
  Spain: ['med', 'north'],
  Portugal: ['med', 'north'],
  France: ['med', 'north'],
  Italy: ['med'],
  Malta: ['med'],
  Greece: ['med'],
  Croatia: ['med'],
  Montenegro: ['med'],
  Slovenia: ['med'],
  Albania: ['med'],
  'Türkiye': ['med'],
  Cyprus: ['med'],
  Monaco: ['med'],
  Gibraltar: ['med'],
  Ukraine: ['med'],
  Georgia: ['med'],
  Bulgaria: ['med'],
  Romania: ['med'],
  Morocco: ['med'],
  Tunisia: ['med'],
  Algeria: ['med'],
  Egypt: ['med', 'africa'],
  Israel: ['med'],
  Jordan: ['med', 'asia'],

  // Northern Europe
  Norway: ['north'],
  Denmark: ['north'],
  Sweden: ['north'],
  Finland: ['north'],
  Estonia: ['north'],
  Latvia: ['north'],
  Lithuania: ['north'],
  Poland: ['north'],
  Germany: ['north'],
  Netherlands: ['north'],
  Belgium: ['north'],
  Ireland: ['north'],
  'United Kingdom': ['north'],
  Iceland: ['north'],
  Greenland: ['north'],
  'Faroe Islands': ['north'],
  'Isle of Man': ['north'],
  Guernsey: ['north'],
  Jersey: ['north'],
  'Åland Islands': ['north'],
  'Saint Pierre and Miquelon': ['north', 'na'],

  // Caribbean, Bahamas & Gulf
  Bahamas: ['caribbean'],
  Jamaica: ['caribbean'],
  'Cayman Islands': ['caribbean'],
  Cuba: ['caribbean'],
  'Dominican Republic': ['caribbean'],
  Haiti: ['caribbean'],
  'Puerto Rico': ['caribbean'],
  'US Virgin Islands': ['caribbean'],
  'British Virgin Islands': ['caribbean'],
  Anguilla: ['caribbean'],
  'Antigua and Barbuda': ['caribbean'],
  'Saint Kitts and Nevis': ['caribbean'],
  Montserrat: ['caribbean'],
  Guadeloupe: ['caribbean'],
  Dominica: ['caribbean'],
  Martinique: ['caribbean'],
  'Saint Lucia': ['caribbean'],
  'Saint Vincent and the Grenadines': ['caribbean'],
  Grenada: ['caribbean'],
  Barbados: ['caribbean'],
  'Trinidad and Tobago': ['caribbean'],
  Aruba: ['caribbean'],
  'Curaçao': ['caribbean'],
  Bonaire: ['caribbean'],
  'Sint Maarten': ['caribbean'],
  Saba: ['caribbean'],
  'Sint Eustatius': ['caribbean'],
  'Turks and Caicos Islands': ['caribbean'],
  Bermuda: ['caribbean', 'na'],
  'Saint Barthélemy': ['caribbean'],
  'Saint Martin': ['caribbean'],
  Belize: ['caribbean', 'latam'],
  Honduras: ['caribbean', 'latam'],
  Guatemala: ['caribbean', 'latam'],
  Nicaragua: ['caribbean', 'latam'],
  'Costa Rica': ['caribbean', 'latam'],
  Panama: ['caribbean', 'latam'],
  Colombia: ['caribbean', 'latam'],
  Venezuela: ['caribbean', 'latam'],

  // North America
  'United States': ['na', 'caribbean'],
  Canada: ['na'],
  Mexico: ['caribbean', 'latam', 'na'],

  // Latin America
  Ecuador: ['latam'],
  Peru: ['latam'],
  Chile: ['latam'],
  Argentina: ['latam'],
  Uruguay: ['latam'],
  Brazil: ['latam'],
  Suriname: ['latam'],
  Guyana: ['latam'],
  'Falkland Islands': ['latam'],

  // Asia, Middle East & Indian Ocean
  'United Arab Emirates': ['asia'],
  Oman: ['asia'],
  Qatar: ['asia'],
  Bahrain: ['asia'],
  'Saudi Arabia': ['asia'],
  India: ['asia'],
  'Sri Lanka': ['asia'],
  Maldives: ['asia'],
  Bangladesh: ['asia'],
  Myanmar: ['asia'],
  Thailand: ['asia'],
  Malaysia: ['asia'],
  Singapore: ['asia'],
  Indonesia: ['asia'],
  Vietnam: ['asia'],
  Cambodia: ['asia'],
  Philippines: ['asia'],
  'Timor-Leste': ['asia'],
  China: ['asia'],
  'Hong Kong SAR': ['asia'],
  'Macao SAR': ['asia'],
  Taiwan: ['asia'],
  Japan: ['asia'],
  'Republic of Korea': ['asia'],

  // Africa & the African islands
  Senegal: ['africa'],
  Gambia: ['africa'],
  Ghana: ['africa'],
  Nigeria: ['africa'],
  "Côte d'Ivoire": ['africa'],
  Benin: ['africa'],
  Togo: ['africa'],
  Cameroon: ['africa'],
  Gabon: ['africa'],
  Angola: ['africa'],
  Namibia: ['africa'],
  'South Africa': ['africa'],
  Mozambique: ['africa'],
  'United Republic of Tanzania': ['africa'],
  Kenya: ['africa'],
  Seychelles: ['africa'],
  Mauritius: ['africa'],
  Madagascar: ['africa'],
  Comoros: ['africa'],
  'Cabo Verde': ['africa'],
  'Sao Tome and Principe': ['africa'],
  Djibouti: ['africa'],
  Sudan: ['africa'],
  Eritrea: ['africa'],
  'Equatorial Guinea': ['africa'],

  // Oceania & South Pacific
  Australia: ['oceania'],
  'New Zealand': ['oceania'],
  'French Polynesia': ['oceania'],
  'New Caledonia': ['oceania'],
  Fiji: ['oceania'],
  Vanuatu: ['oceania'],
  Samoa: ['oceania'],
  'American Samoa': ['oceania'],
  Tonga: ['oceania'],
  'Cook Islands': ['oceania'],
  'Papua New Guinea': ['oceania'],
  'Solomon Islands': ['oceania'],
  Palau: ['oceania'],
  Guam: ['oceania'],
  'Northern Mariana Islands': ['oceania'],
  'Norfolk Island': ['oceania'],
  'Marshall Islands': ['oceania'],
  Micronesia: ['oceania'],
  Kiribati: ['oceania'],
  Tuvalu: ['oceania'],
  Niue: ['oceania'],
  'Wallis and Futuna': ['oceania'],
  'Pitcairn Islands': ['oceania'],
  Nauru: ['oceania'],
};

// Cruise line → the sailing regions it departs from. A line that is not listed
// here is never hidden. River-cruise lines get no ocean regions: they do not
// sail from the ocean terminals in the port directory.
const CRUISE_LINE_REGIONS = {
  'MSC Cruises': ['med', 'north', 'caribbean', 'na', 'latam', 'asia', 'africa'],
  'Royal Caribbean International': ['caribbean', 'med', 'north', 'na', 'asia', 'oceania', 'latam'],
  'Celebrity Cruises': ['caribbean', 'med', 'north', 'na', 'asia', 'oceania', 'latam'],
  'Silversea Cruises': ['med', 'north', 'caribbean', 'na', 'latam', 'asia', 'africa', 'oceania'],
  'Carnival Cruise Line': ['caribbean', 'na', 'med', 'oceania'],
  'Norwegian Cruise Line': ['caribbean', 'med', 'north', 'na', 'asia', 'oceania', 'latam', 'africa'],
  'Oceania Cruises': ['med', 'north', 'caribbean', 'na', 'latam', 'asia', 'africa', 'oceania'],
  'Regent Seven Seas Cruises': ['med', 'north', 'caribbean', 'na', 'latam', 'asia', 'africa', 'oceania'],
  'Azamara Cruises': ['med', 'north', 'caribbean', 'asia', 'africa', 'latam'],
  'Seabourn Cruise Line': ['med', 'north', 'caribbean', 'na', 'latam', 'asia', 'africa', 'oceania'],
  'Princess Cruises': ['caribbean', 'med', 'north', 'na', 'asia', 'oceania', 'latam'],
  'Holland America Line': ['na', 'caribbean', 'med', 'north', 'latam', 'oceania'],
  'Cunard Line': ['north', 'med', 'caribbean', 'na', 'asia', 'oceania'],
  'P&O Cruises': ['med', 'north', 'caribbean', 'na'],
  'P&O Cruises Australia': ['oceania', 'asia'],
  'Saga Cruises': ['north', 'med', 'caribbean'],
  'Fred. Olsen Cruise Lines': ['north', 'med', 'caribbean', 'africa', 'latam'],
  'Marella Cruises': ['med', 'north', 'caribbean', 'asia', 'africa'],
  'Ambassador Cruise Line': ['north', 'med', 'caribbean'],
  'Virgin Voyages': ['caribbean', 'med', 'north', 'na', 'oceania'],
  'Disney Cruise Line': ['caribbean', 'na', 'med', 'north', 'oceania'],
  'Crystal Cruises': ['med', 'north', 'caribbean', 'asia', 'africa', 'na'],
  'Explora Journeys': ['med', 'caribbean', 'north', 'na'],
  'Viking Ocean Cruises': ['med', 'north', 'caribbean', 'na', 'asia', 'oceania', 'latam', 'africa'],
  'Viking River Cruises': [],
  'Costa Cruises': ['med', 'north', 'caribbean', 'latam', 'asia', 'africa', 'na'],
  'AIDA Cruises': ['med', 'north', 'caribbean', 'na', 'asia', 'africa'],
  'TUI Cruises': ['med', 'north', 'caribbean', 'asia', 'africa', 'na'],
  'Hapag-Lloyd Cruises': ['med', 'north', 'caribbean', 'na', 'latam', 'asia', 'africa', 'oceania'],
  'Phoenix Reisen': ['north', 'med', 'caribbean', 'asia', 'africa', 'na'],
  'A-ROSA Flussschiff': [],
  'Nicko Cruises': [],
  Ponant: ['med', 'north', 'caribbean', 'na', 'latam', 'asia', 'africa', 'oceania'],
  CroisiEurope: [],
  'Celestyal Cruises': ['med'],
  Hurtigruten: ['north', 'latam'],
  'Havila Voyages': ['north'],
  'Scenic Luxury Cruises': ['oceania', 'latam', 'med', 'north', 'asia'],
  'Emerald Cruises': ['med', 'north', 'asia'],
  'Windstar Cruises': ['med', 'caribbean', 'asia', 'na', 'oceania', 'latam'],
  'Star Clippers': ['med', 'caribbean', 'asia'],
  'Avalon Waterways': [],
  'Uniworld Boutique River Cruises': [],
  AmaWaterways: [],
  'Riviera Travel': ['med', 'north'],
  'Margaritaville at Sea': ['caribbean', 'na'],
};

// ── coach: countries each operator runs in ─────────────────────────────────

const EUROPE_WIDE = [
  'Germany', 'Netherlands', 'Belgium', 'France', 'Spain', 'Portugal', 'Italy',
  'Austria', 'Switzerland', 'Poland', 'Czechia', 'Slovakia', 'Hungary', 'Croatia',
  'Slovenia', 'Denmark', 'Sweden', 'Norway', 'Finland', 'Romania', 'Bulgaria',
  'Serbia', 'Ukraine', 'United Kingdom', 'Ireland',
];

const COACH_COUNTRIES = {
  FlixBus: [...EUROPE_WIDE, 'Türkiye', 'United States', 'Canada', 'Mexico', 'Brazil', 'India'],
  'BlaBlaCar Bus': [
    'France', 'Spain', 'Portugal', 'Italy', 'Belgium', 'Netherlands', 'Germany',
    'Luxembourg', 'Switzerland', 'Austria', 'Czechia', 'Hungary', 'Poland',
    'Croatia', 'Slovenia', 'Denmark', 'Sweden',
  ],
  Eurolines: [...EUROPE_WIDE, 'Estonia', 'Latvia', 'Lithuania', 'Moldova', 'Greece'],
  RegioJet: [
    'Czechia', 'Slovakia', 'Austria', 'Hungary', 'Poland', 'Germany', 'Croatia',
    'Slovenia', 'Italy', 'Ukraine',
  ],
  Ecolines: [
    'Latvia', 'Lithuania', 'Estonia', 'Poland', 'Germany', 'Netherlands', 'Belgium',
    'France', 'Czechia', 'Austria', 'Sweden', 'Norway', 'Finland', 'Denmark',
    'Ukraine', 'Moldova', 'Romania', 'Bulgaria', 'Greece', 'Italy', 'Spain',
  ],
  'Lux Express': ['Estonia', 'Latvia', 'Lithuania', 'Poland', 'Finland', 'Germany'],
  Sindbad: [
    'Poland', 'Germany', 'Netherlands', 'Belgium', 'France', 'United Kingdom',
    'Austria', 'Czechia', 'Italy', 'Spain', 'Norway', 'Sweden', 'Denmark',
    'Ukraine', 'Lithuania', 'Latvia', 'Estonia',
  ],
  ALSA: ['Spain', 'Portugal', 'France', 'Switzerland', 'Italy', 'Germany', 'Belgium', 'Morocco'],
  Avanza: ['Spain', 'Portugal'],
  Socibus: ['Spain'],
  'Aerobús Barcelona': ['Spain'],
  'Rede Expressos': ['Portugal'],
  Itabus: ['Italy', 'France', 'Switzerland'],
  'Marino Bus': ['Italy', 'Germany', 'Netherlands', 'Belgium', 'France', 'Switzerland', 'Austria'],
  Terravision: ['Italy', 'United Kingdom', 'Belgium', 'Netherlands', 'Germany', 'Spain', 'France'],
  'National Express': ['United Kingdom', 'Ireland'],
  Megabus: ['United Kingdom', 'United States', 'Canada'],
  Stagecoach: ['United Kingdom'],
  'Scottish Citylink': ['United Kingdom'],
  Arriva: [
    'Denmark', 'Netherlands', 'United Kingdom', 'Sweden', 'Czechia', 'Poland',
    'Slovakia', 'Hungary', 'Italy', 'Portugal', 'Spain', 'Malta', 'Germany',
  ],
  Abildskou: ['Denmark', 'Germany', 'Sweden'],
  Vy: ['Norway', 'Sweden'],
  OnniBus: ['Finland'],
  Matkahuolto: ['Finland'],
  'Flybus Iceland': ['Iceland'],
  'Union Ivkoni': [...EUROPE_WIDE, 'Greece', 'Türkiye'],
  'Metro Turizm': ['Türkiye', 'Germany', 'Netherlands', 'Belgium', 'France', 'Austria', 'Greece', 'Bulgaria'],
  'Kamil Koç': ['Türkiye'],
  Ulusoy: ['Türkiye', 'Germany', 'Netherlands', 'Belgium', 'France', 'Austria', 'Greece'],
  Greyhound: ['United States', 'Canada', 'Mexico'],
  'Peter Pan Bus Lines': ['United States'],
  Trailways: ['United States', 'Canada'],
  'Coach USA': ['United States', 'Canada'],
  OurBus: ['United States'],
  RedCoach: ['United States'],
  'Jefferson Lines': ['United States'],
  'Ontario Northland': ['Canada'],
  'Rider Express': ['Canada'],
  ADO: ['Mexico', 'United States'],
  ETN: ['Mexico', 'United States'],
  'Primera Plus': ['Mexico'],
  'Cruz del Sur': ['Peru', 'Chile', 'Argentina', 'Colombia', 'Bolivia', 'Ecuador'],
  'Tica Bus': [
    'Costa Rica', 'Nicaragua', 'Honduras', 'El Salvador', 'Guatemala', 'Mexico', 'Panama',
  ],
  Andesmar: ['Argentina', 'Chile', 'Uruguay', 'Paraguay', 'Brazil'],
  'CATA Internacional': ['Argentina', 'Chile', 'Brazil', 'Paraguay', 'Uruguay'],
  Flechabus: ['Argentina', 'Uruguay', 'Chile', 'Paraguay', 'Brazil'],
  Intercape: [
    'South Africa', 'Namibia', 'Botswana', 'Zimbabwe', 'Mozambique', 'Zambia',
    'Malawi', 'Kenya', 'Tanzania', 'Uganda',
  ],
  'City to City': ['South Africa', 'Namibia', 'Botswana', 'Zimbabwe', 'Mozambique'],
  'Easy Coach': ['Kenya', 'Uganda', 'Tanzania', 'Rwanda'],
  'Greyhound Australia': ['Australia'],
  'Firefly Express': ['Australia'],
  SkyBus: ['Australia'],
  InterCity: ['New Zealand'],
  'Willer Express': ['Japan'],
  'JR Bus': ['Japan'],
  'Kuo-Kuang Motor Transport': ['Taiwan'],
  Kobus: ['South Korea', 'Republic of Korea'],
  'VRL Travels': ['India'],
  'SRS Travels': ['India'],
};

// ── car rental: countries each company has airport desks in ────────────────

const EUROPE_COUNTRIES = [
  'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark',
  'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary', 'Iceland',
  'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta', 'Netherlands',
  'Norway', 'Poland', 'Portugal', 'Romania', 'Serbia', 'Slovakia', 'Slovenia',
  'Spain', 'Sweden', 'Switzerland', 'Türkiye', 'United Kingdom',
];

const SPAIN_AND_ISLANDS = ['Spain'];

// Brands and brokers that genuinely take bookings in most countries.
const WORLDWIDE_RENTAL = new Set([
  'Enterprise Holdings', 'Hertz Global Holdings', 'Avis Budget Group',
  'Enterprise Rent-A-Car', 'National Car Rental', 'Alamo Rent a Car', 'Hertz',
  'Thrifty Car Rental', 'Dollar Car Rental', 'Firefly Car Rental', 'Avis Rent a Car',
  'Budget Rent a Car', 'Payless Car Rental', 'Sixt SE', 'Sixt rent a car',
  'Europcar Mobility Group', 'Europcar', 'Hertz Europe', 'Avis Europe',
  'Enterprise Europe', 'Sixt Europe', 'Europcar Europe', 'Budget Europe',
  'Alamo Europe', 'National Europe', 'Thrifty Europe', 'Dollar Europe',
  'Auto Europe', 'Rentalcars.com', 'Holiday Autos', 'CarTrawler', 'Argus Car Hire',
  'Nova Car Hire', 'Economy Car Rentals', 'Billiger Mietwagen', 'DriveBoo',
  'Check24 Autovermietung', 'Carrentals.com', 'Expedia Car Rental',
  'Priceline Car Rental', 'Hotwire Car Rental', 'Costco Travel Car Rental',
  'AAA Car Rental', 'Easycar', 'Hertz Australia', 'Avis Australia',
  'Budget Australia', 'Enterprise Australia', 'Thrifty Australia', 'Europcar Australia',
  'Hertz Japan', 'Avis Japan', 'Budget Japan', 'Enterprise Japan',
]);

const RENTAL_COUNTRIES = {
  Zipcar: ['United States', 'Canada', 'United Kingdom', 'Spain', 'France'],
  Goldcar: ['Spain', 'Portugal', 'Italy', 'France', 'Greece', 'Malta', 'Cyprus', 'Morocco'],
  Ubeeqo: ['France', 'Belgium', 'Spain', 'Germany', 'United Kingdom'],
  'SIXT Nederland': ['Netherlands'],
  'Hertz Nederland': ['Netherlands'],
  'Avis Nederland': ['Netherlands'],
  'Enterprise Nederland': ['Netherlands'],
  'Europcar Nederland': ['Netherlands'],
  'Budget Nederland': ['Netherlands'],
  Sunnycars: ['Netherlands', 'Belgium', 'Germany', 'France', 'Spain', 'Portugal', 'Italy', 'Greece', 'Austria', 'Switzerland', 'United Kingdom', 'Denmark', 'Sweden', 'Norway', 'Finland', 'Poland', 'Czechia', 'Croatia', 'Türkiye', 'United States', 'Canada', 'South Africa', 'Australia', 'New Zealand', 'Mauritius', 'Cabo Verde', 'United Arab Emirates'],
  'Sunny Cars': ['Netherlands', 'Belgium', 'Germany', 'France', 'Spain', 'Portugal', 'Italy', 'Greece', 'Austria', 'Switzerland', 'United Kingdom', 'Denmark', 'Sweden', 'Norway', 'Finland', 'Poland', 'Czechia', 'Croatia', 'Türkiye', 'United States', 'Canada', 'South Africa', 'Australia', 'New Zealand', 'Mauritius', 'Cabo Verde', 'United Arab Emirates'],
  Centauro: SPAIN_AND_ISLANDS,
  'Centauro Rent a Car': ['Spain', 'Portugal', 'Italy', 'Greece', 'Cyprus'],
  'Record Go': ['Spain', 'Portugal', 'Italy', 'Greece', 'Cyprus', 'Malta'],
  'OK Mobility': ['Spain', 'Portugal', 'Italy', 'Greece', 'Cyprus', 'Malta', 'France', 'Germany', 'Croatia', 'Morocco'],
  Drivalia: [...EUROPE_COUNTRIES, 'Morocco', 'United Arab Emirates'],
  Autoreisen: SPAIN_AND_ISLANDS,
  Cicar: SPAIN_AND_ISLANDS,
  'Plus Car': SPAIN_AND_ISLANDS,
  'Top Car AutoReisen': SPAIN_AND_ISLANDS,
  'Dickmanns Rent a Car': SPAIN_AND_ISLANDS,
  'Class Rent a Car': SPAIN_AND_ISLANDS,
  'Redspot Car Rentals': ['Australia', 'New Zealand'],
  'East Coast Car Rentals': ['Australia'],
  'Times Car Rental': ['Japan'],
  'Nippon Rent-A-Car': ['Japan'],
  'Toyota Rent a Car': ['Japan'],
  'Orix Rent a Car': ['Japan'],
  'Apollo CamperVans': ['Australia', 'New Zealand'],
  'Maui Campervans': ['Australia', 'New Zealand'],
  'Britz Campervans': ['Australia', 'New Zealand'],
  'Tourism Holdings Limited': ['Australia', 'New Zealand'],
  'Road Bear RV': ['United States', 'Canada', 'Germany'],
  'El Monte RV': ['United States', 'Canada', 'Spain', 'Italy'],
  'Cruise America': ['United States', 'Canada'],
  Outdoorsy: ['United States', 'Canada', 'Australia', 'United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands', 'New Zealand'],
  RVshare: ['United States', 'Canada'],
  McRent: [...EUROPE_COUNTRIES, 'United States', 'Canada', 'South Africa', 'Australia', 'New Zealand'],
  PaulCamper: ['Germany', 'Netherlands', 'Austria', 'Switzerland', 'Belgium', 'France', 'Spain', 'Italy', 'United Kingdom', 'Denmark', 'Sweden'],
  Yescapa: ['France', 'Spain', 'Portugal', 'Italy', 'Belgium', 'Netherlands', 'Germany', 'Switzerland', 'Austria', 'United Kingdom'],
  'FB-TT.com': ['Curaçao'],
  'De Palm Tours': ['Aruba'],
};

// ── flights: airlines by airport ───────────────────────────────────────────

// OurAirports-style region → the continents used in the airline directory.
const REGION_TO_CONTINENTS = {
  Europe: ['Europe'],
  'Middle East': ['Middle East'],
  Asia: ['Asia'],
  Oceania: ['Oceania'],
  Africa: ['Africa'],
  Americas: ['North America', 'Latin America'],
};

const airlineCountryAliases = (country) => {
  const k = key(country);
  return k;
};

// ── public API ─────────────────────────────────────────────────────────────

/**
 * Carriers that serve the chosen location, for cruise / train / coach /
 * car rental. Free-text locations and unknown coverage return the full list.
 */
export function getCarriersForPlace(travelType, place) {
  const all = CARRIERS_BY_TYPE[travelType] || [];
  if (!place || typeof place === 'string') return all;

  if (travelType === 'train') {
    const station = norm(place.name);
    const serving = RAIL_OPERATORS
      .filter((op) => (op.hubs || []).some((hub) => norm(hub) === station))
      .map((op) => ({ name: op.company_name, country: op.country }));
    return serving.length ? serving : all;
  }

  if (travelType === 'cruise') {
    const regions = PORT_REGIONS[place.country] || [];
    if (!regions.length) return all;
    const lines = all.filter((line) => {
      const lineRegions = CRUISE_LINE_REGIONS[line.name];
      if (!lineRegions) return true;
      return lineRegions.some((r) => regions.includes(r));
    });
    return lines.length ? lines : all;
  }

  if (travelType === 'coach') {
    const country = key(place.country);
    const serving = all.filter((op) => {
      const list = COACH_COUNTRIES[op.name] || [op.country];
      return list.some((c) => key(c) === country);
    });
    return serving.length ? serving : all;
  }

  if (travelType === 'car_rental') {
    const country = key(place.country);
    const serving = all.filter((company) => {
      if (WORLDWIDE_RENTAL.has(company.name)) return true;
      const list = RENTAL_COUNTRIES[company.name] || [company.country];
      return list.some((c) => key(c) === country);
    });
    return serving.length ? serving : all;
  }

  return all;
}

/**
 * Airlines that use the chosen airport: carriers based there or hubbing there,
 * otherwise carriers from the same part of the world.
 */
export function getAirlinesForAirport(place) {
  if (!place || typeof place === 'string' || !place.code) return AIRLINES;
  const code = String(place.code).toUpperCase();
  const country = airlineCountryAliases(place.country);
  const continents = REGION_TO_CONTINENTS[regionForAirportCountry(place.country)] || [];

  const matching = AIRLINES.filter(
    (airline) =>
      (airline.hubs || []).some((hub) => String(hub).toUpperCase() === code) ||
      key(airline.country) === country ||
      continents.includes(airline.continent)
  );

  return matching.length ? matching : AIRLINES;
}