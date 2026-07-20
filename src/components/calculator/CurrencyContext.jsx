import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";

const CurrencyContext = createContext(null);

const CURRENCIES = [
  { code: "EUR", symbol: "€", label: "EUR" },
  { code: "USD", symbol: "$", label: "USD" },
  { code: "GBP", symbol: "£", label: "GBP" },
  { code: "CHF", symbol: "Fr", label: "CHF" },
  { code: "JPY", symbol: "¥", label: "JPY" },
  { code: "CNY", symbol: "¥", label: "CNY" },
  { code: "CAD", symbol: "C$", label: "CAD" },
  { code: "AUD", symbol: "A$", label: "AUD" },
  { code: "SGD", symbol: "S$", label: "SGD" },
  { code: "AED", symbol: "AED ", label: "AED" },
  { code: "HKD", symbol: "HK$", label: "HKD" },
  { code: "QAR", symbol: "QAR ", label: "QAR" },
];

const SYMBOLS = Object.fromEntries(CURRENCIES.map((c) => [c.code, c.symbol]));
const NO_DECIMAL = new Set(["JPY", "CNY", "KRW", "VND"]);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("EUR");
  const [rates, setRates] = useState({ EUR: 1 });

  useEffect(() => {
    fetch("https://open.er-api.com/v6/latest/EUR")
      .then((r) => r.json())
      .then((data) => {
        if (data.rates) setRates(data.rates);
      })
      .catch(() => {});
  }, []);

  const rate = rates[currency] || 1;
  const symbol = SYMBOLS[currency] || currency;
  const noDecimal = NO_DECIMAL.has(currency);

  const convert = useCallback((eur) => (eur || 0) * rate, [rate]);

  const fmt = useCallback(
    (eur) => {
      const v = (eur || 0) * rate;
      return `${symbol}${noDecimal ? Math.round(v).toLocaleString("en-US") : v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
    },
    [rate, symbol, noDecimal]
  );

  const fmtCompact = useCallback(
    (eur) => {
      const v = (eur || 0) * rate;
      if (v >= 1_000_000_000) return `${symbol}${(v / 1_000_000_000).toFixed(1)}B`;
      if (v >= 1_000_000) return `${symbol}${(v / 1_000_000).toFixed(1)}M`;
      if (v >= 1_000) return `${symbol}${(v / 1_000).toFixed(1)}K`;
      return `${symbol}${noDecimal ? Math.round(v) : v.toFixed(0)}`;
    },
    [rate, symbol, noDecimal]
  );

  const value = useMemo(
    () => ({ currency, setCurrency, rate, symbol, convert, fmt, fmtCompact, currencies: CURRENCIES }),
    [currency, rate, symbol, convert, fmt, fmtCompact]
  );

  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  return ctx || {
    currency: "EUR",
    setCurrency: () => {},
    rate: 1,
    symbol: "€",
    convert: (v) => v,
    fmt: (v) => `€${(v || 0).toFixed(2)}`,
    fmtCompact: (v) => (v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `€${(v / 1_000).toFixed(1)}K` : `€${Math.round(v)}`),
    currencies: CURRENCIES,
  };
}