import { useState, useRef, useEffect } from "react";
import { ChevronDown, Coins } from "lucide-react";
import { useCurrency } from "@/components/calculator/CurrencyContext";
import { getCurrencyInfo } from "@/data/countryCurrencies";

const CURRENCIES = [
  "EUR", "USD", "GBP", "CHF", "SEK", "NOK", "DKK", "PLN", "TRY", "AED",
  "SAR", "SGD", "HKD", "JPY", "KRW", "CNY", "INR", "THB", "AUD", "CAD",
  "BRL", "MXN", "ZAR",
];

export default function CurrencySelect({ className = "" }) {
  const { currency, setCurrency } = useCurrency();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  const current = getCurrencyInfo(currency);

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Change currency"
        aria-haspopup="true"
        aria-expanded={open}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      >
        <Coins className="w-4 h-4" aria-hidden="true" />
        <span>{current.flag} {currency}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true" />
      </button>

      {open && (
        <div className="absolute right-0 mt-1 w-40 max-h-64 overflow-y-auto bg-card border border-border rounded-lg shadow-lg z-50 py-1">
          {CURRENCIES.map((code) => {
            const info = getCurrencyInfo(code);
            return (
              <button
                key={code}
                onClick={() => {
                  setCurrency(code);
                  setOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 text-sm text-left hover:bg-secondary transition-colors ${
                  code === currency ? "font-semibold text-primary" : "text-foreground"
                }`}
              >
                <span>{info.flag}</span>
                <span>{code}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}