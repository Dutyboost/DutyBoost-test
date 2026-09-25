// Country → region resolver for the researched airport directory.
//
// The researched data uses OurAirports country names, which include several
// spelling variants ("Czechia" / "Czech Republic", "Antigua & Barbuda" /
// "Antigua and Barbuda", "Côte d’Ivoire" / "Cote d'Ivoire" …), so both the
// lookup keys and the incoming values are normalised before matching.

export const REGIONS = ["Europe", "Middle East", "Asia", "Oceania", "Africa", "Americas"];

const EUROPE = [
  "Albania", "Andorra", "Austria", "Belarus", "Belgium", "Bosnia & Herzegovina",
  "Bosnia and Herzegovina", "Bulgaria", "Croatia", "Cyprus", "Czech Republic",
  "Czechia", "Denmark", "Estonia", "Faroe Islands", "Finland", "France",
  "Germany", "Gibraltar", "Greece", "Guernsey", "Hungary", "Iceland", "Ireland",
  "Isle of Man", "Italy", "Jersey", "Kosovo", "Latvia", "Liechtenstein",
  "Lithuania", "Luxembourg", "Malta", "Moldova", "Monaco", "Montenegro",
  "Netherlands", "North Macedonia", "Norway", "Poland", "Portugal", "Romania",
  "Russia", "San Marino", "Serbia", "Slovakia", "Slovenia", "Spain", "Svalbard",
  "Sweden", "Switzerland", "Turkey", "Türkiye", "Ukraine", "United Kingdom",
  "Vatican City",
];

const MIDDLE_EAST = [
  "United Arab Emirates", "Qatar", "Saudi Arabia", "Oman", "Bahrain", "Kuwait",
  "Jordan", "Lebanon", "Israel", "Iraq", "Iran", "Yemen", "Syria", "Palestine",
  "Palestinian Territory",
];

const ASIA = [
  "Afghanistan", "Armenia", "Azerbaijan", "Bangladesh", "Bhutan", "Brunei",
  "Cambodia", "China", "Georgia", "Hong Kong", "Hong Kong SAR", "India",
  "Indonesia", "Japan", "Kazakhstan", "Kyrgyzstan", "Laos", "Macau", "Malaysia",
  "Maldives", "Mongolia", "Myanmar", "Myanmar (Burma)", "Nepal", "North Korea",
  "Pakistan", "Philippines", "Singapore", "South Korea", "Sri Lanka", "Taiwan",
  "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "Uzbekistan",
  "Vietnam",
];

const OCEANIA = [
  "American Samoa", "Australia", "Christmas Island", "Cocos (Keeling) Islands",
  "Cook Islands", "Fiji", "French Polynesia", "Guam", "Kiribati",
  "Marshall Islands", "Micronesia", "Nauru", "New Caledonia", "New Zealand",
  "Niue", "Norfolk Island", "Northern Mariana Islands", "Palau",
  "Papua New Guinea", "Samoa", "Solomon Islands", "Tonga", "Tuvalu", "Vanuatu",
  "Wallis & Futuna",
];

const AFRICA = [
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi",
  "Cameroon", "Cape Verde", "Central African Republic", "Chad", "Comoros",
  "Congo", "Congo - Brazzaville", "Congo - Kinshasa", "Cote d'Ivoire",
  "Côte d’Ivoire", "Djibouti", "DR Congo", "Egypt", "Equatorial Guinea",
  "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia", "Ghana", "Guinea",
  "Guinea-Bissau", "Kenya", "Lesotho", "Liberia", "Libya", "Madagascar",
  "Malawi", "Mali", "Mauritania", "Mauritius", "Mayotte", "Morocco",
  "Mozambique", "Namibia", "Niger", "Nigeria", "Réunion", "Rwanda",
  "São Tomé & Príncipe", "Senegal", "Seychelles", "Sierra Leone", "Somalia",
  "South Africa", "South Sudan", "St. Helena", "Sudan", "Tanzania", "Togo",
  "Tunisia", "Uganda", "Western Sahara", "Zambia", "Zimbabwe",
];

const AMERICAS = [
  "Anguilla", "Antigua & Barbuda", "Antigua and Barbuda", "Argentina", "Aruba",
  "Bahamas", "Barbados", "Belize", "Bermuda", "Bolivia", "Bonaire", "Brazil",
  "British Virgin Islands", "Canada", "Caribbean Netherlands", "Cayman Islands",
  "Chile", "Colombia", "Costa Rica", "Cuba", "Curacao", "Dominica",
  "Dominican Republic", "Ecuador", "El Salvador",
  "Falkland Islands (Islas Malvinas)", "French Guiana", "Greenland", "Grenada",
  "Guadeloupe", "Guatemala", "Guyana", "Haiti", "Honduras", "Jamaica",
  "Martinique", "Mexico", "Montserrat", "Nicaragua", "Panama", "Paraguay",
  "Peru", "Puerto Rico", "Saint Barthelemy", "Saint Kitts and Nevis",
  "Saint Lucia", "Saint Martin", "Saint Vincent and the Grenadines",
  "Sint Maarten", "St. Pierre & Miquelon", "St. Vincent & Grenadines",
  "Suriname", "Trinidad and Tobago", "Turks & Caicos Islands",
  "Turks and Caicos", "U.S. Outlying Islands", "United States", "Uruguay",
  "US Virgin Islands", "Venezuela",
];

export function normalizeCountry(country) {
  return String(country || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]/g, "");
}

const COUNTRY_REGION = {};
const register = (region, names) => {
  names.forEach((name) => {
    COUNTRY_REGION[normalizeCountry(name)] = region;
  });
};
register("Europe", EUROPE);
register("Middle East", MIDDLE_EAST);
register("Asia", ASIA);
register("Oceania", OCEANIA);
register("Africa", AFRICA);
register("Americas", AMERICAS);

export function regionForAirportCountry(country) {
  return COUNTRY_REGION[normalizeCountry(country)] || "Other";
}

// The researched data lists some countries under two names (OurAirports vs.
// common usage), which would otherwise count as two countries. Each variant
// resolves to a single canonical key.
const COUNTRY_ALIASES = {
  czechrepublic: "czechia",
  turkey: "turkiye",
  congobrazzaville: "congo",
  congokinshasa: "drcongo",
  myanmarburma: "myanmar",
  turksandcaicosislands: "turksandcaicos",
};

/** Stable key for counting a country once, whatever spelling the data uses. */
export function countryKey(country) {
  const normalized = normalizeCountry(country);
  return COUNTRY_ALIASES[normalized] || normalized;
}