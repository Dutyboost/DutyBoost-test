// Shared airport-entry helper + region resolver used by the airport retail
// registries. Mirrors the region logic in utils/airportBasketEstimate.js so
// basket estimates stay consistent for lightweight (traffic-only) entries.

export function regionForCountry(country) {
  const ME = ["United Arab Emirates", "Qatar", "Saudi Arabia", "Oman", "Bahrain", "Kuwait", "Jordan", "Lebanon", "Israel"];
  if (ME.includes(country)) return "Middle East";
  const NA = ["United States", "Canada", "Bermuda"];
  if (NA.includes(country)) return "Americas";
  const ASIA = [
    "Singapore", "Malaysia", "China", "Hong Kong", "Japan", "South Korea",
    "Taiwan", "Thailand", "Indonesia", "Philippines", "Vietnam", "India",
    "Cambodia", "Sri Lanka", "Maldives", "Nepal", "Pakistan", "Kazakhstan",
    "Azerbaijan", "Afghanistan", "Bhutan", "Brunei", "Laos", "Macau", "Myanmar",
  ];
  if (ASIA.includes(country)) return "Asia";
  const OCEANIA = ["Australia", "New Zealand", "Palau"];
  if (OCEANIA.includes(country)) return "Oceania";
  const AFRICA = ["Kenya", "Nigeria", "South Africa", "Morocco", "Egypt", "Tanzania", "Ghana", "Zimbabwe", "Tunisia", "Ethiopia"];
  if (AFRICA.includes(country)) return "Africa";
  const LATAM = ["Mexico", "Brazil", "Argentina", "Chile", "Colombia", "Uruguay", "Ecuador", "Dominican Republic", "Barbados", "Antigua", "Bahamas", "Peru"];
  if (LATAM.includes(country)) return "Americas";
  return "Europe";
}

// Lightweight airport entry: code/name/city/country + daily pax, with
// annual_pax and region derived. No store-level data.
export const A = (code, name, city, country, daily_pax) => ({
  code,
  name,
  city,
  country,
  daily_pax,
  annual_pax: Math.round(daily_pax * 365),
  region: regionForCountry(country),
});