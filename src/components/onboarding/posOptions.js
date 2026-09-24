import { AIRPORT_RETAIL_COMPANIES } from "@/data/airportRetailCompanies";
import { POS_PROVIDERS } from "@/data/posProviders";

// Words that appear in almost every operator name, so they never decide a match.
const STOP_WORDS = new Set([
  "the", "and", "incl", "duty", "free", "travel", "retail", "group",
  "international", "airport", "airports", "holding", "holdings", "ltd",
  "limited", "ag", "sas", "llc", "inc", "co", "company", "world", "store",
  "stores", "shop", "shops", "switzerland", "sint", "maarten", "of", "for",
]);

function tokens(name) {
  return new Set(
    String(name || "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, " ")
      .split(" ")
      .filter((w) => w.length > 2 && !STOP_WORDS.has(w)),
  );
}

function sameOperator(a, b) {
  const ta = tokens(a);
  const tb = tokens(b);
  for (const t of ta) if (tb.has(t)) return true;
  return false;
}

function shortName(name) {
  return String(name || "").split(" (")[0].split(" — ")[0].trim();
}

/** The retail operators DutyBoost tracks that run shops at this airport. */
export function operatorsAtAirport(airportCode) {
  const code = (airportCode || "").toUpperCase();
  if (!code) return [];
  return AIRPORT_RETAIL_COMPANIES
    .filter((c) => (c.airports || []).some((a) => (a.code || "").toUpperCase() === code))
    .map((c) => c.name);
}

/** POS systems researched for one operator. */
export function retailerPosProviders(operatorName, posRows = []) {
  const found = new Map();
  posRows.forEach((r) => {
    const provider = (r.pos_provider || "").trim();
    if (!provider) return;
    if (!sameOperator(operatorName, r.retailer_name)) return;
    if (!found.has(provider.toLowerCase())) found.set(provider.toLowerCase(), provider);
  });
  return [...found.values()];
}

/**
 * POS provider options for the retailer being onboarded at the chosen airport.
 * The selected retailer's own researched systems come first, then the systems
 * researched for the other operators trading at that airport, then the rest of
 * the market list so an unrecorded provider can still be picked (free text
 * always works too).
 */
export function buildPosOptions(airportCode, posRows = [], retailerName = "") {
  const code = (airportCode || "").toUpperCase();
  const retailer = (retailerName || "").trim();

  const sections = [];

  if (retailer) {
    const own = retailerPosProviders(retailer, posRows);
    if (own.length) {
      sections.push(...own.map((p) => ({
        key: `retailer-${p}`,
        label: p,
        sub: `Used by ${retailer} in its airport stores`,
        group: "This retailer",
      })));
    }
  }

  const atAirport = new Map();
  operatorsAtAirport(code)
    .filter((op) => !(retailer && sameOperator(op, retailer)))
    .forEach((op) => {
      retailerPosProviders(op, posRows).forEach((p) => {
        const key = p.toLowerCase();
        const entry = atAirport.get(key) || { label: p, operators: [] };
        entry.operators.push(shortName(op));
        atAirport.set(key, entry);
      });
    });

  if (atAirport.size) {
    sections.push(...[...atAirport.values()].map((e) => ({
      key: `airport-${e.label}`,
      label: e.label,
      sub: `Reported for ${e.operators.join(", ")}`,
      group: `Also at ${code}`,
    })));
  }

  if (!sections.length) {
    return POS_PROVIDERS.map((p) => ({ key: `pos-${p}`, label: p }));
  }

  const used = new Set(sections.map((s) => s.label.toLowerCase()));
  const other = POS_PROVIDERS
    .filter((p) => !used.has(p.toLowerCase()))
    .map((p) => ({ key: `pos-${p}`, label: p, group: "Other providers" }));

  return [...sections, ...other];
}