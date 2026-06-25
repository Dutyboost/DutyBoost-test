// Top Oceania airports with retail/duty-free operations
export const OCEANIA_AIRPORTS = [
  { name: "Sydney Kingsford Smith Airport", code: "SYD", city: "Sydney", country: "Australia", annual_pax: 44000000 },
  { name: "Melbourne Tullamarine Airport", code: "MEL", city: "Melbourne", country: "Australia", annual_pax: 37000000 },
  { name: "Brisbane Airport", code: "BNE", city: "Brisbane", country: "Australia", annual_pax: 22000000 },
  { name: "Perth Airport", code: "PER", city: "Perth", country: "Australia", annual_pax: 12000000 },
  { name: "Adelaide Airport", code: "ADL", city: "Adelaide", country: "Australia", annual_pax: 8000000 },
  { name: "Gold Coast Airport", code: "OOL", city: "Gold Coast", country: "Australia", annual_pax: 6000000 },
  { name: "Cairns Airport", code: "CNS", city: "Cairns", country: "Australia", annual_pax: 5000000 },
  { name: "Canberra Airport", code: "CBR", city: "Canberra", country: "Australia", annual_pax: 3000000 },
  { name: "Hobart Airport", code: "HBA", city: "Hobart", country: "Australia", annual_pax: 2500000 },
  { name: "Darwin International Airport", code: "DRW", city: "Darwin", country: "Australia", annual_pax: 2000000 },
  { name: "Auckland Airport", code: "AKL", city: "Auckland", country: "New Zealand", annual_pax: 21000000 },
  { name: "Christchurch Airport", code: "CHC", city: "Christchurch", country: "New Zealand", annual_pax: 6800000 },
  { name: "Wellington Airport", code: "WLG", city: "Wellington", country: "New Zealand", annual_pax: 6000000 },
  { name: "Queenstown Airport", code: "ZQN", city: "Queenstown", country: "New Zealand", annual_pax: 2500000 },
  { name: "Dunedin Airport", code: "DUD", city: "Dunedin", country: "New Zealand", annual_pax: 1200000 },
  { name: "Nadi International Airport", code: "NAN", city: "Nadi", country: "Fiji", annual_pax: 2500000 },
  { name: "Papeete Faaa International Airport", code: "PPT", city: "Papeete", country: "French Polynesia", annual_pax: 1500000 },
  { name: "Port Moresby Jacksons International Airport", code: "POM", city: "Port Moresby", country: "Papua New Guinea", annual_pax: 1500000 },
  { name: "Noumea La Tontouta International Airport", code: "NOU", city: "Noumea", country: "New Caledonia", annual_pax: 600000 },
  { name: "Apia Faleolo International Airport", code: "APW", city: "Apia", country: "Samoa", annual_pax: 300000 },
  { name: "Nukualofa Fuaamotu International Airport", code: "TBU", city: "Nukualofa", country: "Tonga", annual_pax: 300000 },
  { name: "Hagatna Guam International Airport", code: "GUM", city: "Hagatna", country: "Guam", annual_pax: 1000000 },
  { name: "Saipan International Airport", code: "SPN", city: "Saipan", country: "Northern Mariana Islands", annual_pax: 400000 },
  { name: "Pago Pago International Airport", code: "PPG", city: "Pago Pago", country: "American Samoa", annual_pax: 100000 },
  { name: "Bora Bora Airport", code: "BOB", city: "Bora Bora", country: "French Polynesia", annual_pax: 400000 },
  { name: "Rarotonga International Airport", code: "RAR", city: "Avarua", country: "Cook Islands", annual_pax: 200000 },
  { name: "Honiara Henderson Airport", code: "HIR", city: "Honiara", country: "Solomon Islands", annual_pax: 200000 },
  { name: "Port Vila Bauerfield International Airport", code: "VLI", city: "Port Vila", country: "Vanuatu", annual_pax: 300000 },
  { name: "Townsville Airport", code: "TSV", city: "Townsville", country: "Australia", annual_pax: 1500000 },
  { name: "Launceston Airport", code: "LST", city: "Launceston", country: "Australia", annual_pax: 1200000 },
  { name: "Newcastle Airport", code: "NTL", city: "Newcastle", country: "Australia", annual_pax: 1300000 },
  { name: "Sunshine Coast Airport", code: "MCY", city: "Maroochydore", country: "Australia", annual_pax: 1500000 },
  { name: "Rotorua Airport", code: "ROT", city: "Rotorua", country: "New Zealand", annual_pax: 600000 },
  { name: "Nelson Airport", code: "NSN", city: "Nelson", country: "New Zealand", annual_pax: 800000 },
  { name: "Invercargill Airport", code: "IVC", city: "Invercargill", country: "New Zealand", annual_pax: 400000 },
  { name: "Hamilton Airport", code: "HLZ", city: "Hamilton", country: "New Zealand", annual_pax: 400000 },
  { name: "Suva Nausori Airport", code: "SUV", city: "Suva", country: "Fiji", annual_pax: 500000 },
  { name: "Alice Springs Airport", code: "ASP", city: "Alice Springs", country: "Australia", annual_pax: 600000 },
  { name: "Broome International Airport", code: "BME", city: "Broome", country: "Australia", annual_pax: 400000 },
  { name: "Mount Hagen Airport", code: "HGU", city: "Mount Hagen", country: "Papua New Guinea", annual_pax: 300000 },
];

OCEANIA_AIRPORTS.forEach(a => {
  a.daily_pax = Math.round(a.annual_pax / 365);
  a.region = "Oceania";
});

OCEANIA_AIRPORTS.sort((a, b) => b.annual_pax - a.annual_pax);

export default OCEANIA_AIRPORTS;