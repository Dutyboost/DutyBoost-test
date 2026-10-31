import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { getCalculatorCurrency, getCurrencyInfo, NO_DECIMAL_CURRENCIES } from "@/data/countryCurrencies";

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  const [currency, setCurrency] = useState("EUR");
  const [activeCountry, setActiveCountry] = useState(null);
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
  const info = getCurrencyInfo(currency);
  const symbol = info.symbol;
  const flag = info.flag;
  const noDecimal = NO_DECIMAL_CURRENCIES.has(currency);

  // Auto-set currency from a country name: EU members in EUR, other European
  // countries in their own currency, the rest of the world in USD.
  const setCurrencyByCountry = useCallback((country) => {
    if (!country) {
      setCurrency("EUR");
      setActiveCountry(null);
      return;
    }
    setCurrency(getCalculatorCurrency(country));
    setActiveCountry(country);
  }, []);

  // Auto-set currency from an airport object (uses airport.country).
  const setCurrencyByAirport = useCallback((airport) => {
    if (!airport) {
      setCurrency("EUR");
      setActiveCountry(null);
      return;
    }
    setCurrencyByCountry(airport.country);
  }, [setCurrencyByCountry]);

  const convert = useCallback((eur) => (eur || 0) * rate, [rate]);

  const fmt = useCallback(
    (eur) => {
      const v = (eur || 0) * rate;
      try {
        return new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: currency,
          minimumFractionDigits: noDecimal ? 0 : 2,
          maximumFractionDigits: noDecimal ? 0 : 2,
        }).format(v);
      } catch {
        return `${symbol}${noDecimal ? Math.round(v) : v.toFixed(2)}`;
      }
    },
    [rate, currency, symbol, noDecimal]
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
    () => ({
      currency,
      setCurrency,
      rate,
      symbol,
      flag,
      activeCountry,
      convert,
      fmt,
      fmtCompact,
      setCurrencyByCountry,
      setCurrencyByAirport,
    }),
    [currency, rate, symbol, flag, activeCountry, convert, fmt, fmtCompact, setCurrencyByCountry, setCurrencyByAirport]
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
    flag: "🇪🇺",
    activeCountry: null,
    convert: (v) => v,
    fmt: (v) => `€${(v || 0).toFixed(2)}`,
    fmtCompact: (v) =>
      v >= 1_000_000 ? `€${(v / 1_000_000).toFixed(1)}M` : v >= 1_000 ? `€${(v / 1_000).toFixed(1)}K` : `€${Math.round(v)}`,
    setCurrencyByCountry: () => {},
    setCurrencyByAirport: () => {},
  };
}