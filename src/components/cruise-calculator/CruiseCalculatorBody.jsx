import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Info, Anchor, ArrowRight } from "lucide-react";
import DutyBoostLogo from "@/components/DutyBoostLogo";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { useCurrency } from "@/components/calculator/CurrencyContext";
import { getCurrencyInfo } from "@/data/countryCurrencies";
import StoreInputCard from "./StoreInputCard";
import RegionBreakdown from "./RegionBreakdown";
import CruiseTotals from "./CruiseTotals";
import { CURRENCIES, PLATFORM_FEE, TIERS, defaultStore, computeStore, computeTotals, groupByRegion } from "./model";
import { trafficDefaultsFor } from "@/data/cruiseTrafficDefaults";
import { CALCULATOR_THEMES, CalculatorThemeProvider } from "./theme";

export default function CruiseCalculatorBody({
  theme = "teal",
  badge = "Cruise & Port Retail Partners",
  intro = "Model one store with your own figures — pick your country or island, then your cruise ship terminal from the list. Add every other store you operate and the calculator totals each island or country on its own, and all of them together.",
  ctaLabel = "Apply as a cruise partner",
  ctaTo = "/cruise-signup",
  prefillByCountry = false,
}) {
  const th = CALCULATOR_THEMES[theme] || CALCULATOR_THEMES.teal;
  const { currency, setCurrency } = useCurrency();
  const [stores, setStores] = useState(() => [defaultStore(1)]);

  const results = useMemo(() => stores.map(computeStore), [stores]);
  const totals = useMemo(() => computeTotals(results), [results]);
  const regions = useMemo(() => groupByRegion(results), [results]);

  // Picking a country fills in that market's indicative figures, so a store
  // owner who does not know the local traffic still sees a full model.
  const handleChange = (id, key, value) =>
    setStores((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s;
        if (key === "country" && prefillByCountry) {
          return { ...s, country: value, port: "", ...trafficDefaultsFor(value) };
        }
        return { ...s, [key]: value };
      })
    );

  const handleAdd = () => setStores((prev) => [...prev, defaultStore(prev.length + 1)]);

  const handleDuplicate = (id) =>
    setStores((prev) => {
      const i = prev.findIndex((s) => s.id === id);
      if (i < 0) return prev;
      const copy = { ...prev[i], id: `store-${Date.now()}`, name: `${prev[i].name} (copy)` };
      return [...prev.slice(0, i + 1), copy, ...prev.slice(i + 1)];
    });

  const handleRemove = (id) => setStores((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));

  return (
    <CalculatorThemeProvider value={th}>
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-between items-center mb-2">
          <div className="w-28" />
          <DutyBoostLogo height={55} />
          <div className="flex justify-end gap-2">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className={`rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 ${th.selectRing}`}
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c} — {getCurrencyInfo(c).label}
                </option>
              ))}
            </select>
            <LanguageSwitcher />
          </div>
        </div>
        <span className={`inline-flex items-center gap-1.5 border rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-widest ${th.badge}`}>
          <Anchor className="w-3.5 h-3.5" /> {badge}
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Your own store calculator</h1>
        <p className="text-slate-600 text-sm max-w-2xl mx-auto">{intro}</p>
      </div>

      <div className={`border rounded-xl px-4 py-3 flex items-start gap-2.5 ${th.infoBox}`}>
        <Info className={`w-4 h-4 shrink-0 mt-0.5 ${th.accentText}`} />
        <p className="text-xs text-slate-600 leading-relaxed">
          DutyBoost pre-activates travellers before they reach you. The only cost is a {PLATFORM_FEE * 100}% platform
          fee on DutyBoost-validated transactions, and traveller discounts follow the DutyCredit tiers:{" "}
          {TIERS[0].discMin * 100}%–{TIERS[TIERS.length - 1].discMax * 100}% depending on the basket, capped at the
          qualifying spend limit.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-slate-900">Your stores</h2>
          <Button variant="outline" size="sm" className="gap-1.5" onClick={handleAdd}>
            <Plus className="w-4 h-4" /> Add store
          </Button>
        </div>
        {results.map((r) => (
          <StoreInputCard
            key={r.id}
            store={r}
            result={r}
            onChange={handleChange}
            onRemove={handleRemove}
            onDuplicate={handleDuplicate}
          />
        ))}
      </div>

      <CruiseTotals totals={totals} />

      {stores.length > 1 && <RegionBreakdown regions={regions} />}

      <div className={`bg-gradient-to-r rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-4 ${th.ctaGradient}`}>
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-white text-lg">Want these numbers validated for your estate?</h3>
          <p className={`text-sm mt-0.5 ${th.ctaSubtext}`}>
            Send us your store list and we will model the full picture with you.
          </p>
        </div>
        <Link
          to={ctaTo}
          className={`inline-flex items-center gap-2 bg-white font-bold px-6 py-3 rounded-xl transition-colors shrink-0 ${th.ctaButton}`}
        >
          {ctaLabel} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <p className="text-xs text-slate-400 text-center max-w-3xl mx-auto">
        Illustrative model. Traffic figures are indicative 2025 market starting points, not audited statistics; values are
        shown in the selected currency and recalculate as you edit. The platform fee applies only to
        DutyBoost-validated transactions.
      </p>
    </div>
    </CalculatorThemeProvider>
  );
}