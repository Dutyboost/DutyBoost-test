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