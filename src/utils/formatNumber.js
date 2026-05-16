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