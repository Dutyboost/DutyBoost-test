import i18n from "@/lib/i18n";

const REGION_KEY_MAP = {
  "Europe": "entCalc.region_europe",
  "Americas": "entCalc.region_americas",
  "Asia-Pacific": "entCalc.region_asia_pacific",
  "Middle East & Africa": "entCalc.region_middle_east_africa",
};

const MONTH_KEY_MAP = {
  "Jan": "entCalc.month_jan", "Feb": "entCalc.month_feb", "Mar": "entCalc.month_mar",
  "Apr": "entCalc.month_apr", "May": "entCalc.month_may", "Jun": "entCalc.month_jun",
  "Jul": "entCalc.month_jul", "Aug": "entCalc.month_aug", "Sep": "entCalc.month_sep",
  "Oct": "entCalc.month_oct", "Nov": "entCalc.month_nov", "Dec": "entCalc.month_dec",
};

export function translateRegion(t, region) {
  return REGION_KEY_MAP[region] ? t(REGION_KEY_MAP[region]) : region;
}

export function translateMonth(t, month) {
  return MONTH_KEY_MAP[month] ? t(MONTH_KEY_MAP[month]) : month;
}

export function translateRetailerDesc(t, retailer) {
  if (!retailer) return "";
  return t(`entCalc.retailer_desc.${retailer.key}`, retailer.description);
}

// ── Country name translation via Intl.DisplayNames ───────────────────────────
// Maps English country names (as stored in data) → ISO alpha-2 code, then
// resolves the localized name for the current i18n language.
const COUNTRY_CODE_OVERRIDES = {
  "Hong Kong": "HK",
  "Hong Kong SAR": "HK",
  "Cote d'Ivoire": "CI",
  "Côte d'Ivoire": "CI",
  "Cote d": "CI",
  "Côte d": "CI",
  "DR Congo": "CD",
  "Turks and Caicos": "TC",
  "Turks and Caicos Islands": "TC",
  "Curacao": "CW",
  "Czech Republic": "CZ",
  "Russia": "RU",
  "Bonaire": "BQ",
  "US Virgin Islands": "VI",
};

let _nameToCode = null;

function getNameToCodeMap() {
  if (_nameToCode) return _nameToCode;
  _nameToCode = {};
  try {
    const enNames = new Intl.DisplayNames(["en"], { type: "region" });
    for (let c = 65; c <= 90; c++) {
      for (let d = 65; d <= 90; d++) {
        const code = String.fromCharCode(c) + String.fromCharCode(d);
        const name = enNames.of(code);
        if (name && name !== code && !String(name).includes("invalid") && !_nameToCode[name]) {
          _nameToCode[name] = code;
        }
      }
    }
  } catch {}
  Object.assign(_nameToCode, COUNTRY_CODE_OVERRIDES);
  return _nameToCode;
}

const _displayNamesCache = {};

export function translateCountry(country) {
  if (!country) return "";
  const lang = (i18n.language || "en").split("-")[0];
  if (lang === "en") return country;
  try {
    const code = getNameToCodeMap()[country];
    if (!code) return country;
    if (!_displayNamesCache[lang]) {
      _displayNamesCache[lang] = new Intl.DisplayNames([lang], { type: "region" });
    }
    return _displayNamesCache[lang].of(code) || country;
  } catch {
    return country;
  }
}