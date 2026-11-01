/**
 * Carrier/location suggestions based on partial hub, corridor, country and
 * region metadata. These are not complete route or timetable datasets.
 *
 * The carrier-first location picker uses this metadata ONLY to order
 * suggestions. Every directory location stays available, including foreign
 * departures, arrivals, intermediate stops, ports of call and return points.
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

// ── trains: every city an operator calls at ────────────────────────────────

// A traveller can board a train at any city it passes through, not only at the
// operator's home hubs, so coverage follows the routes themselves: every city
// on an international or long-distance corridor is credited to each operator
// running it.
const RAIL_CORRIDORS = [
  // Amsterdam ↔ Rhine/Ruhr ↔ Basel (ICE International)
  { operators: ['DB Fernverkehr', 'Deutsche Bahn', 'NS International'], cities: ['Amsterdam', 'Utrecht', 'Arnhem', 'Duisburg', 'Düsseldorf', 'Köln', 'Bonn', 'Mainz', 'Frankfurt', 'Mannheim', 'Karlsruhe', 'Freiburg'] },
  // Basel ↔ Zürich ↔ Interlaken (ICE / IC)
  { operators: ['SBB', 'DB Fernverkehr', 'Deutsche Bahn'], cities: ['Basel', 'Zürich', 'Bern', 'Interlaken', 'Luzern', 'Chur', 'Brig', 'Visp', 'Lugano'] },
  // Amsterdam ↔ Rotterdam ↔ Antwerpen ↔ Bruxelles (Eurostar & Benelux)
  { operators: ['Eurostar', 'NS', 'NS International', 'SNCB / NMBS', 'DB Fernverkehr'], cities: ['Amsterdam', 'Schiphol', 'Rotterdam', 'Breda', 'Roosendaal', 'Antwerpen', 'Mechelen', 'Bruxelles', 'Brussel'] },
  // Amsterdam ↔ Berlin (IC Berlijn / European Sleeper)
  { operators: ['NS International', 'DB Fernverkehr', 'Deutsche Bahn'], cities: ['Amsterdam', 'Amersfoort', 'Deventer', 'Hengelo', 'Osnabrück', 'Hannover', 'Berlin'] },
  // Amsterdam ↔ Köln ↔ Basel ↔ Zürich (Nightjet)
  { operators: ['ÖBB', 'NS International'], cities: ['Amsterdam', 'Utrecht', 'Arnhem', 'Köln', 'Bonn', 'Mainz', 'Frankfurt', 'Mannheim', 'Karlsruhe', 'Basel', 'Zürich'] },
  // Bruxelles ↔ Liège ↔ Köln ↔ Frankfurt ↔ Basel (ICE)
  { operators: ['DB Fernverkehr', 'Deutsche Bahn', 'SNCB / NMBS', 'SBB'], cities: ['Bruxelles', 'Brussel', 'Liège', 'Aachen', 'Köln', 'Frankfurt', 'Mannheim', 'Karlsruhe', 'Basel'] },
  // Bruxelles ↔ Lille ↔ London (Eurostar)
  { operators: ['Eurostar', 'SNCB / NMBS', 'NS International'], cities: ['Bruxelles', 'Brussel', 'Lille', 'Calais', 'Ashford', 'Ebbsfleet', 'London'] },
  // Bruxelles ↔ Paris (Eurostar / TGV)
  { operators: ['Eurostar', 'SNCF Voyageurs', 'TGV INOUI', 'SNCB / NMBS'], cities: ['Bruxelles', 'Brussel', 'Paris'] },
  // Bruxelles ↔ Luxembourg (IC)
  { operators: ['SNCB / NMBS', 'CFL'], cities: ['Bruxelles', 'Brussel', 'Namur', 'Luxembourg'] },
  // Netherlands domestic long distance
  { operators: ['NS'], cities: ['Amsterdam', 'Utrecht', 'Rotterdam', 'Den Haag', 'Eindhoven', 'Groningen', 'Arnhem', 'Nijmegen', 'Maastricht', 'Zwolle', 'Breda', 'Tilburg', 'Haarlem', 'Leiden', 'Delft', 'Dordrecht', 'Roosendaal', 'Almere', 'Amersfoort', 'Enschede', 'Leeuwarden', 'Assen', 'Venlo', 'Heerlen', 'Sittard', 'Alkmaar', 'Hoorn', 'Zaandam', 'Schiphol', 'Helmond', 'Deventer', 'Zutphen', 'Apeldoorn', 'Hengelo', 'Gouda', 'Woerden', 'Ede'] },
  // Netherlands regional operators
  { operators: ['Arriva Nederland'], cities: ['Groningen', 'Leeuwarden', 'Assen', 'Maastricht', 'Heerlen', 'Sittard', 'Zutphen', 'Venlo', 'Roermond', 'Winterswijk'] },
  { operators: ['Keolis Nederland'], cities: ['Zwolle', 'Enschede', 'Hengelo', 'Almere', 'Amersfoort', 'Ede'] },
  { operators: ['Qbuzz'], cities: ['Groningen', 'Leeuwarden', 'Dordrecht', 'Utrecht', 'Gouda'] },
  // Belgium domestic
  { operators: ['SNCB / NMBS'], cities: ['Bruxelles', 'Brussel', 'Antwerpen', 'Gent', 'Brugge', 'Leuven', 'Mechelen', 'Namur', 'Liège', 'Charleroi', 'Mons', 'Kortrijk', 'Oostende', 'Hasselt', 'Luxembourg'] },
  // Paris ↔ Lyon ↔ Marseille ↔ Nice
  { operators: ['SNCF Voyageurs', 'TGV INOUI', 'OUIGO', 'Intercités'], cities: ['Paris', 'Dijon', 'Lyon', 'Avignon', 'Aix-en-Provence', 'Marseille', 'Toulon', 'Cannes', 'Nice', 'Monaco'] },
  // Paris ↔ Bordeaux / Nantes / Rennes / Strasbourg
  { operators: ['SNCF Voyageurs', 'TGV INOUI', 'Intercités', 'OUIGO'], cities: ['Paris', 'Bordeaux', 'Toulouse', 'Nantes', 'Rennes', 'Le Mans', 'Angers', 'Tours', 'Poitiers', 'Strasbourg', 'Reims', 'Lille', 'Montpellier', 'Perpignan', 'Grenoble', 'Annecy'] },
  // Paris ↔ Chambéry ↔ Torino ↔ Milano (TGV / Frecciarossa)
  { operators: ['SNCF Voyageurs', 'TGV INOUI', 'Trenitalia'], cities: ['Paris', 'Dijon', 'Lyon', 'Chambéry', 'Modane', 'Torino', 'Milano'] },
  // Paris ↔ Strasbourg ↔ Stuttgart ↔ München (TGV / ICE)
  { operators: ['SNCF Voyageurs', 'TGV INOUI', 'DB Fernverkehr', 'Deutsche Bahn'], cities: ['Paris', 'Strasbourg', 'Karlsruhe', 'Stuttgart', 'Ulm', 'Augsburg', 'München'] },
  // Paris ↔ Basel / Zürich / Genève / Lausanne (TGV Lyria)
  { operators: ['SNCF Voyageurs', 'TGV Lyria', 'SBB'], cities: ['Paris', 'Dijon', 'Mulhouse', 'Basel', 'Zürich', 'Genève', 'Lausanne', 'Bern'] },
  // Zürich ↔ Basel ↔ Milano ↔ Bologna ↔ Roma (EC / Frecciarossa)
  { operators: ['SBB', 'Trenitalia', 'DB Fernverkehr'], cities: ['Zürich', 'Basel', 'Lugano', 'Chiasso', 'Como', 'Milano', 'Bologna', 'Firenze', 'Roma', 'Genova'] },
  // München ↔ Innsbruck ↔ Verona ↔ Bologna ↔ Roma (Brenner EC)
  { operators: ['DB Fernverkehr', 'Deutsche Bahn', 'ÖBB', 'Trenitalia'], cities: ['München', 'Rosenheim', 'Kufstein', 'Innsbruck', 'Brennero', 'Bolzano', 'Trento', 'Verona', 'Bologna', 'Firenze', 'Roma', 'Rovereto'] },
  // Paris ↔ Barcelona ↔ Madrid (TGV / AVE)
  { operators: ['SNCF Voyageurs', 'TGV INOUI', 'Renfe', 'Renfe AVE'], cities: ['Paris', 'Lyon', 'Nîmes', 'Montpellier', 'Perpignan', 'Girona', 'Barcelona', 'Zaragoza', 'Madrid'] },
  // Germany long distance (ICE / IC network)
  { operators: ['DB Fernverkehr', 'Deutsche Bahn'], cities: ['Frankfurt', 'Köln', 'Düsseldorf', 'Duisburg', 'Essen', 'Dortmund', 'Hannover', 'Hamburg', 'Bremen', 'Berlin', 'Leipzig', 'Dresden', 'Nürnberg', 'Stuttgart', 'München', 'Karlsruhe', 'Mannheim', 'Kassel', 'Erfurt', 'Halle', 'Freiburg', 'Ulm', 'Augsburg', 'Würzburg', 'Bonn', 'Kiel', 'Lübeck', 'Rostock', 'Oldenburg', 'Saarbrücken', 'Regensburg', 'Lindau', 'Konstanz', 'Garmisch-Partenkirchen', 'Münster', 'Bielefeld', 'Osnabrück', 'Braunschweig', 'Magdeburg', 'Potsdam', 'Jena', 'Gera', 'Chemnitz', 'Zwickau', 'Heidelberg', 'Trier', 'Aachen'] },
  // Ruhr ↔ Berlin (Flixtrain)
  { operators: ['Flixtrain'], cities: ['Köln', 'Berlin', 'Hamburg', 'Leipzig', 'Dresden', 'Frankfurt', 'Stuttgart', 'Hannover', 'Düsseldorf', 'Bremen'] },
  // Wien ↔ Salzburg ↔ Innsbruck ↔ Zürich (Railjet)
  { operators: ['ÖBB', 'SBB'], cities: ['Wien', 'Linz', 'Salzburg', 'Innsbruck', 'Feldkirch', 'Bregenz', 'Zürich', 'Basel', 'St. Gallen', 'Buchs'] },
  // Austria domestic
  { operators: ['ÖBB', 'WESTbahn'], cities: ['Wien', 'Graz', 'Klagenfurt', 'Villach', 'Leoben', 'Wiener Neustadt', 'Linz', 'Salzburg', 'Innsbruck', 'St. Pölten', 'Wels', 'Steyr', 'Bruck an der Mur'] },
  // Wien ↔ München ↔ Frankfurt ↔ Köln ↔ Hamburg (Railjet / ICE)
  { operators: ['ÖBB', 'DB Fernverkehr', 'Deutsche Bahn'], cities: ['Wien', 'Salzburg', 'München', 'Nürnberg', 'Frankfurt', 'Köln', 'Düsseldorf', 'Hamburg', 'Berlin', 'Stuttgart', 'Karlsruhe'] },
  // Wien ↔ Praha ↔ Dresden ↔ Berlin (EC / Railjet)
  { operators: ['ÖBB', 'ČD', 'DB Fernverkehr', 'Deutsche Bahn', 'RegioJet'], cities: ['Wien', 'Brno', 'Praha', 'Pardubice', 'Dresden', 'Berlin'] },
  // Wien ↔ Budapest (Railjet / EC)
  { operators: ['ÖBB', 'MÁV', 'RegioJet'], cities: ['Wien', 'Győr', 'Budapest'] },
  // Budapest ↔ Bratislava ↔ Praha ↔ Warszawa
  { operators: ['MÁV', 'ZSSK', 'ČD', 'RegioJet', 'PKP Intercity'], cities: ['Budapest', 'Bratislava', 'Košice', 'Brno', 'Praha', 'Warszawa', 'Kraków'] },
  // Budapest ↔ Beograd ↔ Novi Sad
  { operators: ['MÁV', 'Srbija Voz'], cities: ['Budapest', 'Szeged', 'Subotica', 'Novi Sad', 'Beograd'] },
  // Budapest ↔ Zagreb ↔ Ljubljana
  { operators: ['MÁV', 'HŽPP', 'SŽ'], cities: ['Budapest', 'Zagreb', 'Ljubljana', 'Maribor'] },
  // Croatia domestic long distance
  { operators: ['HŽPP'], cities: ['Zagreb', 'Split', 'Rijeka', 'Karlovac', 'Knin', 'Osijek', 'Zadar'] },
  // Ljubljana ↔ Trieste ↔ Venezia (SŽ / Trenitalia)
  { operators: ['SŽ', 'Trenitalia', 'ÖBB'], cities: ['Ljubljana', 'Trieste', 'Venezia', 'Villach', 'Maribor', 'Udine'] },
  // București ↔ Budapest
  { operators: ['CFR Călători', 'MÁV'], cities: ['București', 'Brașov', 'Cluj-Napoca', 'Oradea', 'Arad', 'Timișoara', 'Budapest', 'Iași', 'Constanța'] },
  // Sofia ↔ București ↔ Istanbul / Thessaloniki
  { operators: ['BDŽ', 'CFR Călători', 'Hellenic Train', 'TCDD Taşımacılık'], cities: ['Sofia', 'Plovdiv', 'Varna', 'Burgas', 'Ruse', 'București', 'Istanbul', 'Ankara', 'Thessaloniki', 'Athina', 'Larissa'] },
  // Germany ↔ København (EC)
  { operators: ['DB Fernverkehr', 'Deutsche Bahn', 'DSB'], cities: ['Hamburg', 'Flensburg', 'Kolding', 'Odense', 'København', 'Aarhus', 'Aalborg'] },
  // København ↔ Malmö ↔ Göteborg ↔ Stockholm ↔ Oslo
  { operators: ['DSB', 'SJ', 'Öresundståg', 'Snälltåget', 'MTRX', 'Vy'], cities: ['København', 'Malmö', 'Lund', 'Göteborg', 'Stockholm', 'Uppsala', 'Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Kristiansand'] },
  // Sweden / Norway long distance
  { operators: ['SJ', 'Snälltåget', 'Vy Tåg', 'MTRX', 'Arlanda Express', 'Go-Ahead Nordic'], cities: ['Stockholm', 'Malmö', 'Göteborg', 'Uppsala', 'Sundsvall', 'Umeå', 'Östersund', 'Åre', 'Kiruna', 'Arlanda', 'Oslo', 'Bergen', 'Trondheim', 'Stavanger', 'Bodø'] },
  // Finland long distance
  { operators: ['VR'], cities: ['Helsinki', 'Tampere', 'Turku', 'Oulu', 'Rovaniemi', 'Kuopio', 'Jyväskylä', 'Lahti', 'Joensuu', 'Vaasa', 'Kajaani', 'Kokkola', 'Seinäjoki', 'Kouvola', 'Lappeenranta', 'Mikkeli'] },
  // Berlin ↔ Warszawa ↔ Gdańsk / Kraków (EC)
  { operators: ['PKP Intercity', 'DB Fernverkehr', 'Deutsche Bahn'], cities: ['Berlin', 'Frankfurt (Oder)', 'Poznań', 'Warszawa', 'Gdańsk', 'Gdynia', 'Kraków', 'Wrocław', 'Katowice', 'Łódź', 'Szczecin', 'Bydgoszcz', 'Lublin', 'Rzeszów'] },
  // Warszawa ↔ Ostrava ↔ Praha (EC / private operators)
  { operators: ['PKP Intercity', 'ČD', 'Leo Express', 'RegioJet'], cities: ['Warszawa', 'Katowice', 'Kraków', 'Ostrava', 'Brno', 'Praha', 'Wrocław', 'Bohumín', 'Olomouc', 'Plzeň'] },
  // Warszawa ↔ Vilnius ↔ Rīga ↔ Tallinn
  { operators: ['PKP Intercity', 'LTG Link', 'Pasažieru vilciens', 'Elron'], cities: ['Warszawa', 'Białystok', 'Kaunas', 'Vilnius', 'Rīga', 'Tartu', 'Tallinn'] },
  // London ↔ Edinburgh ↔ Glasgow
  { operators: ['LNER', 'Avanti West Coast', 'ScotRail', 'CrossCountry', 'Caledonian Sleeper', 'Grand Central', 'Lumo', 'TransPennine Express'], cities: ['London', 'York', 'Leeds', 'Newcastle', 'Edinburgh', 'Glasgow', 'Aberdeen', 'Inverness', 'Dundee', 'Stirling', 'Durham'] },
  // London ↔ Birmingham ↔ Manchester ↔ Liverpool
  { operators: ['Avanti West Coast', 'West Midlands Trains', 'CrossCountry', 'Transport for Wales', 'TransPennine Express'], cities: ['London', 'Watford', 'Milton Keynes', 'Birmingham', 'Coventry', 'Stoke-on-Trent', 'Manchester', 'Liverpool', 'Preston', 'Lancaster', 'Carlisle', 'Chester', 'Crewe', 'Wolverhampton'] },
  // London ↔ Bristol ↔ Cardiff ↔ Swansea
  { operators: ['Great Western Railway', 'Transport for Wales'], cities: ['London', 'Reading', 'Swindon', 'Bristol', 'Bath', 'Newport', 'Cardiff', 'Swansea', 'Carmarthen', 'Oxford', 'Worcester', 'Hereford'] },
  // London ↔ Cambridge ↔ Norwich
  { operators: ['Greater Anglia', 'Stansted Express'], cities: ['London', 'Cambridge', 'Norwich', 'Ipswich', 'Colchester', 'Chelmsford', 'Southend', 'Stansted'] },
  // London ↔ Midlands ↔ North (East Midlands / CrossCountry)
  { operators: ['East Midlands Railway', 'CrossCountry', 'Northern', 'Hull Trains', 'Grand Central'], cities: ['London', 'Leicester', 'Nottingham', 'Derby', 'Sheffield', 'Leeds', 'Manchester', 'Hull', 'Doncaster', 'Lincoln'] },
  // Ireland (Dublin ↔ Belfast / Cork / Galway / Limerick)
  { operators: ['Iarnród Éireann', 'Translink NI Railways'], cities: ['Dublin', 'Belfast', 'Cork', 'Galway', 'Limerick', 'Waterford', 'Sligo', 'Wexford', 'Portadown', 'Newry'] },
  // Portugal long distance
  { operators: ['CP'], cities: ['Lisboa', 'Porto', 'Coimbra', 'Faro', 'Braga', 'Aveiro', 'Guimarães', 'Évora', 'Beja', 'Fátima', 'Caldas da Rainha', 'Leiria', 'Setúbal', 'Viana do Castelo'] },
  // Spain long distance
  { operators: ['Renfe', 'Renfe AVE', 'Iryo', 'Ouigo España', 'Renfe Avlo'], cities: ['Madrid', 'Barcelona', 'Valencia', 'Sevilla', 'Málaga', 'Alicante', 'Zaragoza', 'Córdoba', 'Bilbao', 'San Sebastián', 'Valladolid', 'León', 'Santiago de Compostela', 'A Coruña', 'Girona', 'Figueres', 'Murcia', 'Granada', 'Toledo', 'Segovia', 'Pamplona', 'Irun', 'Cádiz', 'Almería'] },
  // Italy long distance
  { operators: ['Trenitalia', 'Italo'], cities: ['Roma', 'Milano', 'Napoli', 'Torino', 'Bologna', 'Firenze', 'Venezia', 'Verona', 'Genova', 'Bari', 'Palermo', 'Catania', 'Trieste', 'Bolzano', 'Trento', 'Perugia', 'Salerno', 'Reggio Calabria', 'Padova', 'Pescara', 'Ancona', 'Udine', 'Bergamo', 'Brescia', 'Parma', 'Modena', 'La Spezia', 'Livorno', 'Pisa'] },
  // Nordics ↔ Germany (night trains)
  { operators: ['SJ', 'Snälltåget'], cities: ['Stockholm', 'Malmö', 'København', 'Hamburg', 'Berlin', 'Odense'] },
];

// Station names carry prefixes and suffixes ("Amsterdam Centraal", "Paris Gare
// de Lyon"), so each city is matched on whole words rather than on a substring.
const stationWords = (value) => norm(value).replace(/[^a-z0-9]+/g, ' ').trim();

const RAIL_CITY_OPERATORS = (() => {
  const map = new Map();
  RAIL_CORRIDORS.forEach(({ operators, cities }) => {
    cities.forEach((city) => {
      const cityKey = stationWords(city);
      if (!cityKey) return;
      if (!map.has(cityKey)) map.set(cityKey, new Set());
      operators.forEach((operator) => map.get(cityKey).add(operator));
    });
  });
  return map;
})();

const stationServesCity = (stationName, city) => {
  const station = stationWords(stationName);
  return (
    station === city ||
    station.startsWith(`${city} `) ||
    station.endsWith(` ${city}`) ||
    station.includes(` ${city} `)
  );
};

const operatorsStoppingAt = (stationName) => {
  const station = stationWords(stationName);
  const found = new Set();
  RAIL_CITY_OPERATORS.forEach((operators, city) => {
    const stopsHere =
      station === city || station.startsWith(`${city} `) || station.endsWith(` ${city}`) || station.includes(` ${city} `);
    if (stopsHere) operators.forEach((operator) => found.add(operator));
  });
  return found;
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
    const stopping = operatorsStoppingAt(place.name);
    const serving = RAIL_OPERATORS
      .filter(
        (op) =>
          (op.hubs || []).some((hub) => norm(hub) === station) ||
          stopping.has(op.company_name)
      )
      .map((op) => ({ name: op.company_name, country: op.country, description: op.description }));
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

/** Partial coverage hints for ordering suggestions, never an exclusion list. */
function getPreferredPlacesForCarrier(travelType, carrierName, places) {
  const all = places || [];
  const name = String(carrierName || '').trim();
  if (!name || !all.length) return all;

  if (travelType === 'train') {
    const operator = RAIL_OPERATORS.find((op) => norm(op.company_name) === norm(name));
    if (!operator) return all;
    const cities = [];
    RAIL_CITY_OPERATORS.forEach((operators, city) => {
      if (operators.has(operator.company_name)) cities.push(city);
    });
    const hubs = new Set((operator.hubs || []).map(stationWords));
    const serving = all.filter(
      (station) =>
        hubs.has(stationWords(station.name)) ||
        cities.some((city) => stationServesCity(station.name, city))
    );
    return serving.length ? serving : all;
  }

  if (travelType === 'cruise') {
    const regions = CRUISE_LINE_REGIONS[name];
    if (!regions || !regions.length) return all;
    const serving = all.filter((port) =>
      (PORT_REGIONS[port.country] || []).some((region) => regions.includes(region))
    );
    return serving.length ? serving : all;
  }

  if (travelType === 'coach') {
    const countries = COACH_COUNTRIES[name];
    if (!countries) return all;
    const serving = all.filter((station) =>
      countries.some((country) => key(country) === key(station.country))
    );
    return serving.length ? serving : all;
  }

  if (travelType === 'car_rental') {
    if (WORLDWIDE_RENTAL.has(name)) return all;
    const countries = RENTAL_COUNTRIES[name];
    if (!countries) return all;
    const serving = all.filter((airport) =>
      countries.some((country) => key(country) === key(airport.country))
    );
    return serving.length ? serving : all;
  }

  if (travelType === 'flight') {
    const airline = AIRLINES.find((a) => norm(a.company_name) === norm(name));
    if (!airline) return all;
    const hubs = new Set((airline.hubs || []).map((hub) => String(hub).toUpperCase()));
    const country = airlineCountryAliases(airline.country);
    const served = all.filter(
      (airport) =>
        (airport.code && hubs.has(String(airport.code).toUpperCase())) ||
        key(airport.country) === country
    );
    // Hubs alone are too narrow for a departure list — the same carrier is also
    // boarded abroad — so a short list widens to its own part of the world.
    if (served.length >= 6) return served;
    const continents = REGION_TO_CONTINENTS[regionForAirportCountry(airline.country)] || [];
    const nearby = all.filter((airport) => continents.includes(regionForAirportCountry(airport.country)));
    if (nearby.length) return nearby;
    return served.length ? served : all;
  }

  return all;
}

/**
 * Keep the full directory searchable for every carrier. A missing location in
 * our partial coverage metadata means "unknown", not "not served".
 * Both ends of a journey and intermediate stops must remain selectable.
 */
export function getPlacesForCarrier(travelType, carrierName, places) {
  const all = places || [];
  const preferred = getPreferredPlacesForCarrier(travelType, carrierName, all);
  const preferredSet = new Set(preferred);
  return [...preferred, ...all.filter((place) => !preferredSet.has(place))];
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