import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";

/**
 * Searchable retailer options: the retailer companies DutyBoost tracks (with
 * their airport footprints) plus retailers already registered in the app.
 * Once an airport is chosen, retailers that operate there are listed first.
 */
export function buildRetailerOptions(airportCode, registeredRetailers = []) {
  const code = (airportCode || "").toUpperCase();

  const companies = AIRPORT_RETAIL_COMPANIES.map((c) => {
    const codes = (c.airports || []).map((a) => a.code).filter(Boolean);
    return {
      key: `company-${c.name}`,
      label: c.name,
      sub: codes.length ? `Operates at ${codes.length} airports` : "Retailer company",
      servesAirport: !!code && codes.includes(code),
    };
  });

  const registered = registeredRetailers.map((r) => ({
    key: `registered-${r.id}`,
    label: r.store_name,
    sub: [r.airport, r.owner_email].filter(Boolean).join(" · ") || "Registered retailer",
    servesAirport: !!code && (r.airport || "").toUpperCase().includes(code),
    retailer: r,
  }));

  return [...companies, ...registered]
    .sort((a, b) => Number(b.servesAirport) - Number(a.servesAirport))
    .map((o) => ({ ...o, group: o.servesAirport ? `Operates at ${code}` : "All retailers" }));
}