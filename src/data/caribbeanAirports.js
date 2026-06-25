// Top Caribbean airports with retail/duty-free operations
// Annual passenger data based on 2023-2024 statistics (ACI / Wikipedia)
// daily_pax = Math.round(annual_pax / 365)

export const CARIBBEAN_AIRPORTS = [
  { name: "Punta Cana International Airport", code: "PUJ", city: "Punta Cana", country: "Dominican Republic", annual_pax: 8000000 },
  { name: "Santo Domingo Las Americas Airport", code: "SDQ", city: "Santo Domingo", country: "Dominican Republic", annual_pax: 4000000 },
  { name: "Santiago Cibao International Airport", code: "STI", city: "Santiago", country: "Dominican Republic", annual_pax: 2000000 },
  { name: "La Romana International Airport", code: "LRM", city: "La Romana", country: "Dominican Republic", annual_pax: 500000 },
  { name: "Puerto Plata International Airport", code: "POP", city: "Puerto Plata", country: "Dominican Republic", annual_pax: 1500000 },
  { name: "Saman El Catey Airport", code: "AZS", city: "Samana", country: "Dominican Republic", annual_pax: 200000 },
  { name: "Santo Domingo Isabela Airport", code: "JBQ", city: "Santo Domingo", country: "Dominican Republic", annual_pax: 300000 },
  { name: "Montego Bay Sangster International Airport", code: "MBJ", city: "Montego Bay", country: "Jamaica", annual_pax: 5000000 },
  { name: "Kingston Norman Manley Airport", code: "KIN", city: "Kingston", country: "Jamaica", annual_pax: 2000000 },
  { name: "Havana Jose Marti International Airport", code: "HAV", city: "Havana", country: "Cuba", annual_pax: 3000000 },
  { name: "Varadero Juan Gualberto Gomez Airport", code: "VRA", city: "Varadero", country: "Cuba", annual_pax: 1500000 },
  { name: "Cayo Coco Airport", code: "CCC", city: "Cayo Coco", country: "Cuba", annual_pax: 800000 },
  { name: "Santa Clara Abel Santamaria Airport", code: "SNU", city: "Santa Clara", country: "Cuba", annual_pax: 500000 },
  { name: "Camaguey Ignacio Agramonte Airport", code: "CMW", city: "Camaguey", country: "Cuba", annual_pax: 500000 },
  { name: "Holguin Frank Pais Airport", code: "HOG", city: "Holguin", country: "Cuba", annual_pax: 800000 },
  { name: "Santiago de Cuba Antonio Maceo Airport", code: "SCU", city: "Santiago de Cuba", country: "Cuba", annual_pax: 500000 },
  { name: "Nassau Lynden Pindling Airport", code: "NAS", city: "Nassau", country: "Bahamas", annual_pax: 4000000 },
  { name: "Freeport Grand Bahama Airport", code: "FPO", city: "Freeport", country: "Bahamas", annual_pax: 500000 },
  { name: "Georgetown Exuma Airport", code: "GGT", city: "George Town", country: "Bahamas", annual_pax: 300000 },
  { name: "Marsh Harbour Airport", code: "MHH", city: "Marsh Harbour", country: "Bahamas", annual_pax: 200000 },
  { name: "North Eleuthera Airport", code: "ELH", city: "Eleuthera", country: "Bahamas", annual_pax: 150000 },
  { name: "San Juan Luis Munoz Marin Airport", code: "SJU", city: "San Juan", country: "Puerto Rico", annual_pax: 10000000 },
  { name: "Aguadilla Rafael Hernandez Airport", code: "BQN", city: "Aguadilla", country: "Puerto Rico", annual_pax: 1500000 },
  { name: "Ponce Mercedita Airport", code: "PSE", city: "Ponce", country: "Puerto Rico", annual_pax: 300000 },
  { name: "St. Thomas Cyril E. King Airport", code: "STT", city: "Charlotte Amalie", country: "US Virgin Islands", annual_pax: 1500000 },
  { name: "St. Croix Henry E. Rohlsen Airport", code: "STX", city: "Christiansted", country: "US Virgin Islands", annual_pax: 400000 },
  { name: "Port-au-Prince Toussaint Louverture Airport", code: "PAP", city: "Port-au-Prince", country: "Haiti", annual_pax: 1500000 },
  { name: "Cap-Haitien International Airport", code: "CAP", city: "Cap-Haitien", country: "Haiti", annual_pax: 200000 },
  { name: "Aruba Queen Beatrix International Airport", code: "AUA", city: "Oranjestad", country: "Aruba", annual_pax: 2800000 },
  { name: "Curacao Hato International Airport", code: "CUR", city: "Willemstad", country: "Curacao", annual_pax: 2000000 },
  { name: "Bonaire Flamingo International Airport", code: "BON", city: "Kralendijk", country: "Bonaire", annual_pax: 600000 },
  { name: "St. Maarten Princess Juliana Airport", code: "SXM", city: "Philipsburg", country: "Sint Maarten", annual_pax: 2500000 },
  { name: "St. Barts Gustaf III Airport", code: "SBH", city: "Gustavia", country: "Saint Barthelemy", annual_pax: 200000 },
  { name: "Grand Case Airport", code: "SFG", city: "Grand Case", country: "Saint Martin", annual_pax: 100000 },
  { name: "Pointe-a-Pitre Le Raizet Airport", code: "PTP", city: "Pointe-a-Pitre", country: "Guadeloupe", annual_pax: 1500000 },
  { name: "Fort-de-France Martinique Airport", code: "FDF", city: "Fort-de-France", country: "Martinique", annual_pax: 1500000 },
  { name: "Cayenne Felix Eboue Airport", code: "CAY", city: "Cayenne", country: "French Guiana", annual_pax: 500000 },
  { name: "Bridgetown Grantley Adams Airport", code: "BGI", city: "Bridgetown", country: "Barbados", annual_pax: 2200000 },
  { name: "Port of Spain Piarco Airport", code: "POS", city: "Port of Spain", country: "Trinidad and Tobago", annual_pax: 3000000 },
  { name: "Tobago ANR Robinson Airport", code: "TAB", city: "Scarborough", country: "Trinidad and Tobago", annual_pax: 500000 },
  { name: "St. Georges Maurice Bishop Airport", code: "GND", city: "St. Georges", country: "Grenada", annual_pax: 700000 },
  { name: "Hewanorra International Airport", code: "UVF", city: "Vieux Fort", country: "Saint Lucia", annual_pax: 900000 },
  { name: "Castries George F. L. Charles Airport", code: "SLU", city: "Castries", country: "Saint Lucia", annual_pax: 400000 },
  { name: "Kingstown ET Joshua Airport", code: "SVD", city: "Kingstown", country: "Saint Vincent and the Grenadines", annual_pax: 400000 },
  { name: "Roseau Douglas-Charles Airport", code: "DOM", city: "Roseau", country: "Dominica", annual_pax: 200000 },
  { name: "Canefield Airport", code: "DCF", city: "Canefield", country: "Dominica", annual_pax: 100000 },
  { name: "Basseterre Robert L. Bradshaw Airport", code: "SKB", city: "Basseterre", country: "Saint Kitts and Nevis", annual_pax: 700000 },
  { name: "Newcastle Airport", code: "NEV", city: "Newcastle", country: "Saint Kitts and Nevis", annual_pax: 200000 },
  { name: "The Valley Clayton J. Lloyd Airport", code: "AXA", city: "The Valley", country: "Anguilla", annual_pax: 100000 },
  { name: "Road Town Terrance B. Lettsome Airport", code: "EIS", city: "Road Town", country: "British Virgin Islands", annual_pax: 200000 },
  { name: "Grand Turk JAGS McCartney Airport", code: "GDT", city: "Grand Turk", country: "Turks and Caicos", annual_pax: 100000 },
  { name: "Providenciales International Airport", code: "PLS", city: "Providenciales", country: "Turks and Caicos", annual_pax: 1000000 },
  { name: "Treasure Cay Airport", code: "TCB", city: "Treasure Cay", country: "Bahamas", annual_pax: 100000 },
];

CARIBBEAN_AIRPORTS.forEach(a => {
  a.daily_pax = Math.round(a.annual_pax / 365);
  a.region = "Caribbean";
});

CARIBBEAN_AIRPORTS.sort((a, b) => b.annual_pax - a.annual_pax);

export default CARIBBEAN_AIRPORTS;