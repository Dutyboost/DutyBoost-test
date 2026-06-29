import { useState, useMemo } from "react";
import { Search, Globe, TrendingUp, Store, Building2, Check, ChevronDown, ChevronUp } from "lucide-react";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import { Slider } from "@/components/ui/slider";
import { AIRPORT_RETAIL_COMPANIES, RETAIL_AIRPORTS } from "@/data/airportRetailCompanies";
import { estimateAvgBasketSpend } from "@/utils/airportBasketEstimate";

const PLATFORM_FEE_PCT = 0.025;
const PLATFORM_FEE_CAP = 25;

function calcSaving(spend) {
  if (spend < 35) return 0;
  if (spend >= 300) return 60.0;
  if (spend >= 250) return 45.0;
  if (spend >= 200) return 30.0;
  if (spend >= 150) return 20.0;
  if (spend >= 100) return 10.0;
  if (spend >= 70) return 5.0;
  return 2.5;
}

function numFontClass(str) {
  const len = String(str).length;
  if (len <= 8) return "text-2xl";
  if (len <= 11) return "text-xl";
  if (len <= 14) return "text-lg";
  return "text-base";
}

function computeAirport(airport, conversionRate) {
  const basket = estimateAvgBasketSpend(airport);
  const saving = calcSaving(basket);
  const commission = Math.min(Math.round(basket * PLATFORM_FEE_PCT * 100) / 100, PLATFORM_FEE_CAP);
  const netRevenue = Math.round((basket - saving - commission) * 100) / 100;
  const dailyRedemptions = Math.round(airport.daily_pax * (conversionRate / 100));
  const monthlyNet = Math.round((dailyRedemptions * netRevenue * 365) / 12 * 100) / 100;
  const annualNet = Math.round(monthlyNet * 12 * 100) / 100;
  const dailyNet = Math.round((monthlyNet * 12) / 365 * 100) / 100;
  return { basket, saving, commission, netRevenue, dailyRedemptions, monthlyNet, annualNet, dailyNet };
}

export default function RetailerCompanySelector({ conversionRate, setConversionRate, t }) {
  const [query, setQuery] = useState("");
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const companies = useMemo(() => {
    return AIRPORT_RETAIL_COMPANIES.map((c) => {
      const airports = c.airports.map((code) => RETAIL_AIRPORTS[code]).filter(Boolean);
      const totals = airports.reduce(
        (acc, a) => {
          const r = computeAirport(a, conversionRate);
          acc.monthlyNet += r.monthlyNet;
          acc.annualNet += r.annualNet;
          acc.dailyTravelers += a.daily_pax;
          return acc;
        },
        { monthlyNet: 0, annualNet: 0, dailyTravelers: 0 }
      );
      return { ...c, airports, ...totals };
    });
  }, [conversionRate]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return companies;
    return companies.filter((c) => c.name.toLowerCase().includes(q));
  }, [companies, query]);

  const visible = showAll ? filtered : filtered.slice(0, 12);

  const selectedData = useMemo(() => {
    if (!selectedCompany) return null;
    const company = companies.find((c) => c.name === selectedCompany);
    if (!company) return null;
    const rows = company.airports.map((a) => ({ airport: a, ...computeAirport(a, conversionRate) }));
    const totals = rows.reduce(
      (acc, r) => {
        acc.dailyNet += r.dailyNet;
        acc.monthlyNet += r.monthlyNet;
        acc.annualNet += r.annualNet;
        acc.dailyRedemptions += r.dailyRedemptions;
        acc.dailyTravelers += r.airport.daily_pax;
        acc.monthlyFee += Math.round((r.dailyRedemptions * r.commission * 365) / 12 * 100) / 100;
        return acc;
      },
      { dailyNet: 0, monthlyNet: 0, annualNet: 0, dailyRedemptions: 0, dailyTravelers: 0, monthlyFee: 0 }
    );
    totals.annualFee = Math.round(totals.monthlyFee * 12 * 100) / 100;
    totals.dailyFee = Math.round((totals.monthlyFee * 12) / 365 * 100) / 100;
    return { company, rows, totals };
  }, [selectedCompany, companies, conversionRate]);

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
        <div className="text-center space-y-1">
          <h2 className="text-xl font-bold text-slate-900 flex items-center justify-center gap-2">
            <Building2 className="w-5 h-5 text-blue-600" />
            {t("calculator.company_search_title")}
          </h2>
          <p className="text-slate-600 text-sm max-w-xl mx-auto">{t("calculator.company_search_desc")}</p>
        </div>

        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("calculator.company_search_placeholder")}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-slate-300 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="text-center text-sm text-slate-500 py-4">{t("calculator.company_no_results")}</p>
        ) : (
          <div className="space-y-2">
            {visible.map((c) => {
              const isSelected = selectedCompany === c.name;
              return (
                <button
                  key={c.name}
                  onClick={() => setSelectedCompany(isSelected ? null : c.name)}
                  className={`w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-blue-600 border-blue-600 text-white"
                      : "bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                >
                  <div className="min-w-0 flex items-center gap-3">
                    <Store className={`w-5 h-5 shrink-0 ${isSelected ? "text-white" : "text-slate-400"}`} />
                    <div className="min-w-0">
                      <p className={`font-semibold truncate ${isSelected ? "text-white" : "text-slate-900"}`}>{c.name}</p>
                      <p className={`text-xs ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                        {c.airports.length} {t("calculator.company_airports")} · {fmtNum(c.dailyTravelers)} {t("calculator.travelers_label")}
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs ${isSelected ? "text-blue-100" : "text-slate-500"}`}>{t("calculator.company_col_annual")}</p>
                    <p className={`text-sm font-bold ${isSelected ? "text-white" : "text-emerald-700"}`}>{fmtEur(c.annualNet, 0)}</p>
                  </div>
                  {isSelected && <Check className="w-4 h-4 text-white shrink-0" />}
                </button>
              );
            })}
            {filtered.length > 12 && !showAll && (
              <button
                onClick={() => setShowAll(true)}
                className="w-full flex items-center justify-center gap-1 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                {t("calculator.company_show_all", { count: filtered.length })}
                <ChevronDown className="w-4 h-4" />
              </button>
            )}
            {showAll && (
              <button
                onClick={() => setShowAll(false)}
                className="w-full flex items-center justify-center gap-1 py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
              >
                <ChevronUp className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Selected company network view */}
      {selectedData && (
        <>
          {/* Conversion slider */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t("calculator.conversion_rate")}</p>
                <p className="text-3xl font-bold text-slate-900">{conversionRate}%</p>
              </div>
              <p className="text-xs text-slate-500 text-right max-w-xs">{t("calculator.company_adjust_conversion")}</p>
            </div>
            <Slider min={1} max={75} step={1} value={[conversionRate]} onValueChange={([v]) => setConversionRate(v)} className="w-full" />
            <p className="text-xs text-slate-500">{t("calculator.conversion_avg_range")}</p>
          </div>

          {/* Combined network revenue */}
          <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-bold text-white text-lg flex items-center gap-2">
                  <Globe className="w-5 h-5 text-blue-400 shrink-0" />
                  {t("calculator.company_network_title")}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {t("calculator.company_network_desc", { company: selectedData.company.name })}
                </p>
              </div>
              <span className="text-xs text-slate-300 bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap shrink-0">
                {selectedData.company.airports.length} {t("calculator.company_airports")}
              </span>
            </div>

            {/* Net revenue */}
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                <TrendingUp className="w-3 h-3" /> {t("calculator.portfolio_net_revenue")}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
                  <p className="text-xs text-slate-400">{t("calculator.daily_net")}</p>
                  <p className={`${numFontClass(fmtEur(selectedData.totals.dailyNet, 2))} font-bold text-white break-all`}>{fmtEur(selectedData.totals.dailyNet, 2)}</p>
                </div>
                <div className="bg-emerald-700 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
                  <p className="text-xs text-emerald-200">{t("calculator.monthly_net")}</p>
                  <p className={`${numFontClass(fmtEur(selectedData.totals.monthlyNet, 2))} font-bold text-white break-all`}>{fmtEur(selectedData.totals.monthlyNet, 2)}</p>
                </div>
                <div className="bg-emerald-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
                  <p className="text-xs text-emerald-100">{t("calculator.annual_net")}</p>
                  <p className={`${numFontClass(fmtEur(selectedData.totals.annualNet, 2))} font-bold text-white break-all`}>{fmtEur(selectedData.totals.annualNet, 2)}</p>
                </div>
              </div>
            </div>

            {/* Platform fee */}
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">{t("calculator.platform_fee_projection_title")}</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
                  <p className="text-xs text-slate-400">{t("calculator.daily_fee")}</p>
                  <p className={`${numFontClass(fmtEur(selectedData.totals.dailyFee, 2))} font-bold text-orange-400 break-all`}>{fmtEur(selectedData.totals.dailyFee, 2)}</p>
                </div>
                <div className="bg-orange-500 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
                  <p className="text-xs text-orange-100">{t("calculator.monthly_fee")}</p>
                  <p className={`${numFontClass(fmtEur(selectedData.totals.monthlyFee, 2))} font-bold text-white break-all`}>{fmtEur(selectedData.totals.monthlyFee, 2)}</p>
                </div>
                <div className="bg-orange-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
                  <p className="text-xs text-orange-50">{t("calculator.annual_fee")}</p>
                  <p className={`${numFontClass(fmtEur(selectedData.totals.annualFee, 2))} font-bold text-white break-all`}>{fmtEur(selectedData.totals.annualFee, 2)}</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 leading-relaxed">
              <span className="text-slate-300 font-semibold">{fmtNum(selectedData.totals.dailyTravelers)}</span> {t("calculator.travelers_label")} → <span className="text-slate-300 font-semibold">{fmtNum(selectedData.totals.dailyRedemptions)}</span> {t("calculator.redemptions_label")} / {t("calculator.day_label")}
            </div>
          </div>

          {/* Per-airport table */}
          <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-600 border-b border-slate-200 bg-slate-50">
                    <th className="px-5 py-3">{t("calculator.company_col_airport")}</th>
                    <th className="px-4 py-3 text-right">{t("calculator.company_col_travelers")}</th>
                    <th className="px-4 py-3 text-right">{t("calculator.company_col_redemptions")}</th>
                    <th className="px-4 py-3 text-right">{t("calculator.company_col_monthly")}</th>
                    <th className="px-4 py-3 text-right">{t("calculator.company_col_annual")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {selectedData.rows
                    .slice()
                    .sort((a, b) => b.annualNet - a.annualNet)
                    .map((r) => (
                      <tr key={r.airport.code} className="hover:bg-slate-50">
                        <td className="px-5 py-3">
                          <div className="font-medium text-slate-900">{r.airport.name}</div>
                          <div className="text-xs text-slate-500">{r.airport.city}, {r.airport.country} · <span className="font-mono">{r.airport.code}</span></div>
                        </td>
                        <td className="px-4 py-3 text-right text-slate-700">{fmtNum(r.airport.daily_pax)}</td>
                        <td className="px-4 py-3 text-right text-slate-700">{fmtNum(r.dailyRedemptions)}</td>
                        <td className="px-4 py-3 text-right font-semibold text-emerald-700">{fmtEur(r.monthlyNet, 2)}</td>
                        <td className="px-4 py-3 text-right font-bold text-emerald-700">{fmtEur(r.annualNet, 2)}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}