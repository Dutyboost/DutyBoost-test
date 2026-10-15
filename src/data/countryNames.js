// Localized country and island names for the partner calculators.
//
// The calculators key their traffic and terminal data on the English country
// name, so that name stays the value that gets stored. This module turns it
// into the visitor's own language for display and search — a Spanish-speaking
// retailer types "España" and finds Spain, a Dutch one types "Spanje".
//
// The names come from the browser's own CLDR data (Intl.DisplayNames), so every
// language is covered without shipping a translation table.

const ISO_CODES =
  "AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(
    " "
  );

// The UN short form spells these differently from the name the browser knows,
// so they are pointed at their ISO code directly. Bonaire, Saba and Sint
// Eustatius are left out on purpose: their names read the same in every
// language the calculators offer.
const ISO_ALIASES = {
  "Antigua and Barbuda": "AG",
  "Bosnia and Herzegovina": "BA",
  "Brunei Darussalam": "BN",
  "Cabo Verde": "CV",
  Congo: "CG",
  "Côte d'Ivoire": "CI",
  "Democratic People's Republic of Korea": "KP",
  "Democratic Republic of the Congo": "CD",
  "Hong Kong SAR": "HK",
  "Lao People's Democratic Republic": "LA",
  "Macao SAR": "MO",
  Myanmar: "MM",
  Palestine: "PS",
  "Republic of Korea": "KR",
  "Republic of Moldova": "MD",
  "Russian Federation": "RU",
  "Saint Barthélemy": "BL",
  "Saint Kitts and Nevis": "KN",
  "Saint Lucia": "LC",
  "Saint Martin": "MF",
  "Saint Pierre and Miquelon": "PM",
  "Saint Vincent and the Grenadines": "VC",
  "Sao Tome and Principe": "ST",
  "Syrian Arab Republic": "SY",
  "Trinidad and Tobago": "TT",
  "Turks and Caicos Islands": "TC",
  "United Republic of Tanzania": "TZ",
  "US Virgin Islands": "VI",
  "Viet Nam": "VN",
  "Wallis and Futuna": "WF",
};

const languageOf = (lang) => (lang || "en").split("-")[0];

const displayNames = (code) => {
  try {
    return new Intl.DisplayNames([code], { type: "region" });
  } catch {
    return null;
  }
};

// English name → ISO code, read once from the browser's own list of regions.
let englishToIso = null;
const englishIndex = () => {
  if (englishToIso) return englishToIso;
  englishToIso = new Map();
  const dn = displayNames("en");
  if (dn) {
    for (const iso of ISO_CODES) {
      try {
        const name = dn.of(iso);
        if (name && name !== iso) englishToIso.set(name, iso);
      } catch {
        /* region not known to this browser — skip it */
      }
    }
  }
  return englishToIso;
};

/**
 * The name of a country or island in the given language. Falls back to the
 * English name whenever the browser cannot resolve it.
 */
export function localizeCountry(name, lang) {
  const code = languageOf(lang);
  if (!name || code === "en") return name || "";
  const iso = ISO_ALIASES[name] || englishIndex().get(name);
  if (!iso) return name;
  const dn = displayNames(code);
  if (!dn) return name;
  try {
    return dn.of(iso) || name;
  } catch {
    return name;
  }
}