// Supplementary Oceania airports with retail/duty-free operations
// Compiled via AI web search (2024-2025 data)

export const OCEANIA_AIRPORTS_EXTRA = [
  { name: "Palmerston North Airport", code: "PMR", city: "Palmerston North", country: "New Zealand", annual_pax: 490000 },
  { name: "Tauranga Airport", code: "TRG", city: "Tauranga", country: "New Zealand", annual_pax: 520000 },
  { name: "Hawke's Bay Airport", code: "NPE", city: "Napier", country: "New Zealand", annual_pax: 640000 },
  { name: "New Plymouth Airport", code: "NPL", city: "New Plymouth", country: "New Zealand", annual_pax: 410000 },
  { name: "Mackay Airport", code: "MKY", city: "Mackay", country: "Australia", annual_pax: 820000 },
  { name: "Rockhampton Airport", code: "ROK", city: "Rockhampton", country: "Australia", annual_pax: 530000 },
  { name: "Port Hedland International Airport", code: "PHE", city: "Port Hedland", country: "Australia", annual_pax: 480000 },
  { name: "Karratha Airport", code: "KTA", city: "Karratha", country: "Australia", annual_pax: 490000 },
  { name: "Albury Airport", code: "ABX", city: "Albury", country: "Australia", annual_pax: 260000 },
  { name: "Coffs Harbour Airport", code: "CFS", city: "Coffs Harbour", country: "Australia", annual_pax: 320000 },
  { name: "Kalgoorlie-Boulder Airport", code: "KGI", city: "Kalgoorlie", country: "Australia", annual_pax: 300000 },
  { name: "Blenheim Woodbourne Airport", code: "BHE", city: "Blenheim", country: "New Zealand", annual_pax: 305000 },
];

OCEANIA_AIRPORTS_EXTRA.forEach(a => {
  a.daily_pax = Math.round(a.annual_pax / 365);
  a.region = "Oceania";
});

export default OCEANIA_AIRPORTS_EXTRA;