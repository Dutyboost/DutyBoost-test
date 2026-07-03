/**
 * Format a number using the European convention:
 *  - Thousands separator: dot (.)
 *  - Decimal separator: comma (,)
 *
 * Examples:
 *   fmtNum(1234567)      → "1.234.567"
 *   fmtNum(1234.56)      → "1.234,56"
 *   fmtEur(1234567)      → "€ 1.234.567"
 *   fmtEur(1234.56, 2)   → "€ 1.234,56"
 */
export function fmtNum(value, decimals = 0) {
  return Number(value).toLocaleString("nl-NL", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtEur(value, decimals = 0) {
  return `€ ${fmtNum(value, decimals)}`;
}

/**
 * Compact abbreviation: B (billion, EN) / MM (billion, ES-NL) / M (million).
 * Examples (lang="en"):  1200000000 → "1.2B", 437300000 → "437.3M"
 * Examples (lang="es"):  1200000000 → "1,2 MM", 437300000 → "437,3 M"
 */
export function fmtCompact(value, lang = "en", decimals = 1) {
  const num = Number(value);
  const abs = Math.abs(num);
  const useComma = lang === "es" || lang === "nl";
  const fmt = (v) => {
    const s = v.toFixed(decimals);
    return useComma ? s.replace(".", ",") : s;
  };
  if (abs >= 1e9) return `${fmt(num / 1e9)}${useComma ? " MM" : "B"}`;
  if (abs >= 1e6) return `${fmt(num / 1e6)}${useComma ? " M" : "M"}`;
  return fmtNum(num);
}