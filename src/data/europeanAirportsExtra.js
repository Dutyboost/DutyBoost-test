// Supplementary European airports with retail/duty-free operations
// Compiled via AI web search (2024-2025 data)

export const EUROPEAN_AIRPORTS_EXTRA = [
  // Italy — secondary airports
  { name: "Brindisi Salento Airport", code: "BDS", city: "Brindisi", country: "Italy", annual_pax: 3100000 },
  { name: "Trieste Airport", code: "TRS", city: "Trieste", country: "Italy", annual_pax: 1300000 },
  { name: "Pescara Abruzzo Airport", code: "PSR", city: "Pescara", country: "Italy", annual_pax: 870000 },
  { name: "Perugia San Francesco d'Assisi Airport", code: "PEG", city: "Perugia", country: "Italy", annual_pax: 530000 },
  { name: "Ancona Marche Airport", code: "AOI", city: "Ancona", country: "Italy", annual_pax: 520000 },
  { name: "Comiso Airport", code: "CIY", city: "Comiso", country: "Italy", annual_pax: 300000 },
  { name: "Alghero Fertilia Airport", code: "AHO", city: "Alghero", country: "Italy", annual_pax: 1500000 },
  { name: "Trapani Birgi Airport", code: "TPS", city: "Trapani", country: "Italy", annual_pax: 1330000 },
  { name: "Rimini Federico Fellini Airport", code: "RMI", city: "Rimini", country: "Italy", annual_pax: 280000 },
  { name: "Bolzano Airport", code: "BZO", city: "Bolzano", country: "Italy", annual_pax: 110000 },
  { name: "Parma Airport", code: "PMF", city: "Parma", country: "Italy", annual_pax: 130000 },
  { name: "Cuneo Levaldigi Airport", code: "CUF", city: "Cuneo", country: "Italy", annual_pax: 150000 },
  // France — secondary airports
  { name: "Ajaccio Napoleon Bonaparte Airport", code: "AJA", city: "Ajaccio", country: "France", annual_pax: 1600000 },
  { name: "Bastia Poretta Airport", code: "BIA", city: "Bastia", country: "France", annual_pax: 1500000 },
  { name: "Biarritz Pays Basque Airport", code: "BIQ", city: "Biarritz", country: "France", annual_pax: 930000 },
  { name: "Caen Carpiquet Airport", code: "CFR", city: "Caen", country: "France", annual_pax: 330000 },
  { name: "Calvi Sainte-Catherine Airport", code: "CLY", city: "Calvi", country: "France", annual_pax: 340000 },
  { name: "Carcassonne Airport", code: "CCF", city: "Carcassonne", country: "France", annual_pax: 380000 },
  { name: "Clermont-Ferrand Auvergne Airport", code: "CFE", city: "Clermont-Ferrand", country: "France", annual_pax: 180000 },
  { name: "Limoges Bellegarde Airport", code: "LIG", city: "Limoges", country: "France", annual_pax: 190000 },
  { name: "Perpignan Rivesaltes Airport", code: "PGF", city: "Perpignan", country: "France", annual_pax: 480000 },
  { name: "Tarbes-Lourdes Pyrenees Airport", code: "LDE", city: "Lourdes", country: "France", annual_pax: 590000 },
  { name: "Toulon-Hyeres Airport", code: "TLN", city: "Toulon", country: "France", annual_pax: 420000 },
  { name: "Pau Pyrenees Airport", code: "PUF", city: "Pau", country: "France", annual_pax: 340000 },
  { name: "Bergerac Dordogne Perigord Airport", code: "EGC", city: "Bergerac", country: "France", annual_pax: 260000 },
  { name: "Grenoble Alpes-Isere Airport", code: "GNB", city: "Grenoble", country: "France", annual_pax: 310000 },
  // Germany — secondary airports
  { name: "Memmingen Airport", code: "FMM", city: "Memmingen", country: "Germany", annual_pax: 2800000 },
  { name: "Munster Osnabruck Airport", code: "FMO", city: "Greven", country: "Germany", annual_pax: 920000 },
  { name: "Paderborn Lippstadt Airport", code: "PAD", city: "Paderborn", country: "Germany", annual_pax: 720000 },
  { name: "Sylt Airport", code: "GWT", city: "Westerland", country: "Germany", annual_pax: 160000 },
  { name: "Kassel Airport", code: "KSF", city: "Kassel", country: "Germany", annual_pax: 50000 },
  { name: "Rostock-Laage Airport", code: "RLG", city: "Rostock", country: "Germany", annual_pax: 60000 },
  { name: "Erfurt-Weimar Airport", code: "ERF", city: "Erfurt", country: "Germany", annual_pax: 140000 },
  { name: "Lubeck Airport", code: "LBC", city: "Lubeck", country: "Germany", annual_pax: 100000 },
  // United Kingdom — secondary airports
  { name: "Aberdeen International Airport", code: "ABZ", city: "Aberdeen", country: "United Kingdom", annual_pax: 2300000 },
  { name: "Belfast City Airport", code: "BHD", city: "Belfast", country: "United Kingdom", annual_pax: 2100000 },
  { name: "Bournemouth Airport", code: "BOH", city: "Bournemouth", country: "United Kingdom", annual_pax: 960000 },
  { name: "London Southend Airport", code: "SEN", city: "Southend", country: "United Kingdom", annual_pax: 1500000 },
  { name: "Exeter Airport", code: "EXT", city: "Exeter", country: "United Kingdom", annual_pax: 900000 },
  { name: "East Midlands Airport", code: "EMA", city: "Nottingham", country: "United Kingdom", annual_pax: 4000000 },
];

EUROPEAN_AIRPORTS_EXTRA.forEach(a => {
  a.daily_pax = Math.round(a.annual_pax / 365);
  a.region = "Europe";
});

export default EUROPEAN_AIRPORTS_EXTRA;