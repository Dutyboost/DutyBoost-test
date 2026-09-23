import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";

/**
 * Searchable retailer options: the retailer companies DutyBoost tracks (with
 * their airport footprints) plus retailers already registered in the app.
 *
 * As soon as an airport is chosen the list is narrowed to the retailers that
 * actually operate there — no unrelated chains in the way. Without an airport
 * every retailer is offered, so a partner can still be added from scratch.
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

  if (code) {
    return [...companies, ...registered]
      .filter((o) => o.servesAirport)
      .map((o) => ({ ...o, group: `Operates at ${code}` }));
  }

  return [
    ...companies.map((o) => ({ ...o, group: "Retailer companies" })),
    ...registered.map((o) => ({ ...o, group: "Registered retailers" })),
  ];
}