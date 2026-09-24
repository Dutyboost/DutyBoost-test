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

/**
 * POS provider options for the chosen airport. Providers researched for the
 * operators trading at that airport come first, labelled with those operators;
 * the rest of the market list follows so an unrecorded provider can still be
 * picked (free text always works too).
 */
export function buildPosOptions(airportCode, posRows = []) {
  const code = (airportCode || "").toUpperCase();
  const operators = operatorsAtAirport(code);

  const byProvider = new Map();
  if (operators.length) {
    posRows.forEach((r) => {
      const provider = (r.pos_provider || "").trim();
      if (!provider) return;
      const operator = operators.find((o) => sameOperator(o, r.retailer_name));
      if (!operator) return;
      const key = provider.toLowerCase();
      const entry = byProvider.get(key) || { label: provider, operators: [] };
      const label = shortName(operator);
      if (!entry.operators.includes(label)) entry.operators.push(label);
      byProvider.set(key, entry);
    });
  }

  if (byProvider.size === 0) {
    return POS_PROVIDERS.map((p) => ({ key: `pos-${p}`, label: p }));
  }

  const known = [...byProvider.values()].map((e) => ({
    key: `known-${e.label}`,
    label: e.label,
    sub: `Used by ${e.operators.join(", ")} at ${code}`,
    group: `At ${code}`,
  }));

  const other = POS_PROVIDERS
    .filter((p) => !byProvider.has(p.toLowerCase()))
    .map((p) => ({ key: `pos-${p}`, label: p, group: "Other providers" }));

  return [...known, ...other];
}