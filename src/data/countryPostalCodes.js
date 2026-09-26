// Country list for address forms, plus which countries/territories actually use
// a postal / zip code system — so the postal code field can be mandatory only where it applies.

import { COUNTRY_TO_CURRENCY } from "./countryCurrencies";

const normalise = (name) => name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const byKey = new Map();
Object.keys(COUNTRY_TO_CURRENCY).forEach((name) => {
  const key = normalise(name);
  if (!byKey.has(key)) byKey.set(key, name);
});

export const COUNTRIES = [...byKey.values()].sort((a, b) => a.localeCompare(b));

// Countries and territories that do not use postal / zip codes.
const NO_POSTAL_CODE = new Set([
  "Angola", "Anguilla", "Antigua and Barbuda", "Aruba", "Bahamas", "Bahrain", "Barbados",
  "Belize", "Bonaire", "British Virgin Islands", "Burkina Faso", "Burundi", "Cameroon",
  "Central African Republic", "Chad", "Comoros", "Congo", "Curacao", "Curaçao",
  "Democratic Republic of the Congo", "Democratic Republic of Congo", "Djibouti", "Dominica",
  "Equatorial Guinea", "Eritrea", "Fiji", "Gabon", "Gambia", "Grenada", "Guinea",
  "Guinea-Bissau", "Hong Kong", "Jamaica", "Kiribati", "Kuwait", "Liberia", "Libya",
  "Macau", "Mali", "Marshall Islands", "Mauritania", "Micronesia", "Montserrat", "Nauru",
  "Niger", "Oman", "Qatar", "Rwanda", "Saint Barthelemy", "Saint Lucia", "Saint Martin",
  "Saint Vincent and the Grenadines", "Samoa", "Seychelles", "Sierra Leone", "Sint Maarten",
  "Solomon Islands", "Somalia", "South Sudan", "Sudan", "Suriname", "Syria", "Togo",
  "Tonga", "Tuvalu", "Uganda", "United Arab Emirates", "Vanuatu", "Western Sahara", "Yemen",
  "Zimbabwe",
]);

// Local naming for the postal code field.
const POSTAL_LABELS = {
  "United States": "ZIP Code",
  "India": "PIN Code",
  "Brazil": "CEP",
  "Ireland": "Eircode",
  "United Kingdom": "Postcode",
  "Netherlands": "Postcode",
  "Australia": "Postcode",
  "New Zealand": "Postcode",
  "Canada": "Postal Code",
};

export function usesPostalCode(country) {
  if (!country) return false;
  return !NO_POSTAL_CODE.has(country);
}

export function postalCodeLabel(country) {
  return POSTAL_LABELS[country] || "Postal Code";
}