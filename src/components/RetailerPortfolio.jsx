import { useMemo } from "react";
import { TrendingUp, Trash2, Globe, Store } from "lucide-react";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import { Slider } from "@/components/ui/slider";

// ── Local calc logic (mirrors RetailerCalculator) ─────────────────────────────
const PLATFORM_FEE_PCT = 0.025; // 2.5% of basket
const PLATFORM_FEE_CAP = 25;    // €25 max per transaction

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

function computeEntry(entry) {
  const { basketSpend, dailyTravelers, conversionRate } = entry;
  const saving = calcSaving(basketSpend);
  const commission = Math.min(Math.round(basketSpend * PLATFORM_FEE_PCT * 100) / 100, PLATFORM_FEE_CAP);
  const netRevenue = Math.round((basketSpend - saving - commission) * 100) / 100;
  const dailyRedemptions = Math.round(dailyTravelers * (conversionRate / 100));
  const monthlyNet = Math.round((dailyRedemptions * netRevenue * 365) / 12 * 100) / 100;
  const annualNet = Math.round(monthlyNet * 12 * 100) / 100;
  const dailyNet = Math.round((monthlyNet * 12) / 365 * 100) / 100;
  const monthlyFee = Math.round((dailyRedemptions * commission * 365) / 12 * 100) / 100;
  const annualFee = Math.round(monthlyFee * 12 * 100) / 100;
  const dailyFee = Math.round((monthlyFee * 12) / 365 * 100) / 100;
  return { saving, commission, netRevenue, dailyRedemptions, monthlyNet, annualNet, dailyNet, monthlyFee, annualFee, dailyFee };
}

export default function RetailerPortfolio({ portfolio, onUpdate, onRemove, t }) {
  const computed = useMemo(
    () => portfolio.map((entry) => ({ ...entry, ...computeEntry(entry) })),
    [portfolio]
  );

  const totals = useMemo(
    () =>
      computed.reduce(
        (acc, e) => {
          acc.dailyNet += e.dailyNet;
          acc.monthlyNet += e.monthlyNet;
          acc.annualNet += e.annualNet;
          acc.dailyFee += e.dailyFee;
          acc.monthlyFee += e.monthlyFee;
          acc.annualFee += e.annualFee;
          acc.dailyRedemptions += e.dailyRedemptions;
          acc.dailyTravelers += e.dailyTravelers;
          return acc;
        },
        { dailyNet: 0, monthlyNet: 0, annualNet: 0, dailyFee: 0, monthlyFee: 0, annualFee: 0, dailyRedemptions: 0, dailyTravelers: 0 }
      ),
    [computed]
  );

  if (portfolio.length === 0) {
    return (
      <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-8 text-center">
        <Globe className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <p className="text-slate-500 text-sm">{t("calculator.portfolio_empty")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      {/* Title */}
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold text-slate-900">{t("calculator.portfolio_title")}</h3>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">{t("calculator.portfolio_desc")}</p>
      </div>

      {/* Global totals */}
      <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h4 className="font-bold text-white text-lg flex items-center gap-2">
            <Globe className="w-5 h-5 text-blue-400 shrink-0" />
            {t("calculator.portfolio_totals")}
          </h4>
          <span className="text-xs text-slate-300 bg-slate-800 px-3 py-1 rounded-full whitespace-nowrap">
            {t("calculator.portfolio_summary", { count: portfolio.length })}
          </span>
        </div>

        {/* Net revenue row */}
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" /> {t("calculator.portfolio_net_revenue")}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-slate-400">{t("calculator.daily_net")}</p>
              <p className={`${numFontClass(fmtEur(totals.dailyNet, 2))} font-bold text-white break-all`}>{fmtEur(totals.dailyNet, 2)}</p>
            </div>
            <div className="bg-emerald-700 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-emerald-200">{t("calculator.monthly_net")}</p>
              <p className={`${numFontClass(fmtEur(totals.monthlyNet, 2))} font-bold text-white break-all`}>{fmtEur(totals.monthlyNet, 2)}</p>
            </div>
            <div className="bg-emerald-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-emerald-100">{t("calculator.annual_net")}</p>
              <p className={`${numFontClass(fmtEur(totals.annualNet, 2))} font-bold text-white break-all`}>{fmtEur(totals.annualNet, 2)}</p>
            </div>
          </div>
        </div>

        {/* Platform fee row */}
        <div>
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-2">{t("calculator.platform_fee_projection_title")}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-slate-400">{t("calculator.daily_fee")}</p>
              <p className={`${numFontClass(fmtEur(totals.dailyFee, 2))} font-bold text-orange-400 break-all`}>{fmtEur(totals.dailyFee, 2)}</p>
            </div>
            <div className="bg-orange-500 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-orange-100">{t("calculator.monthly_fee")}</p>
              <p className={`${numFontClass(fmtEur(totals.monthlyFee, 2))} font-bold text-white break-all`}>{fmtEur(totals.monthlyFee, 2)}</p>
            </div>
            <div className="bg-orange-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
              <p className="text-xs text-orange-50">{t("calculator.annual_fee")}</p>
              <p className={`${numFontClass(fmtEur(totals.annualFee, 2))} font-bold text-white break-all`}>{fmtEur(totals.annualFee, 2)}</p>
            </div>
          </div>
        </div>

        <div className="bg-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 leading-relaxed">
          <span className="text-slate-300 font-semibold">{fmtNum(totals.dailyTravelers)}</span> {t("calculator.travelers_label")} → <span className="text-slate-300 font-semibold">{fmtNum(totals.dailyRedemptions)}</span> {t("calculator.redemptions_label")} / {t("calculator.day_label")}
        </div>
      </div>

      {/* Per-airport list */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">
        <div className="px-5 py-3 border-b border-slate-200 bg-slate-50">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t("calculator.portfolio_adjust_conversion")}</p>
        </div>
        <div className="divide-y divide-slate-200">
          {computed.map((e) => (
            <div key={e.id} className="p-5 space-y-3">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Store className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-bold text-slate-900 truncate">{e.airport.name}</span>
                    <span className="text-xs font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">{e.airport.code}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {e.airport.city}, {e.airport.country} · {fmtNum(e.dailyTravelers)} {t("calculator.travelers_label")} · {fmtEur(e.basketSpend)} {t("calculator.basket_spend")}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(e.id)}
                  className="text-slate-400 hover:text-red-500 transition-colors p-1 shrink-0"
                  title={t("calculator.portfolio_remove")}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">{t("calculator.daily_redemptions")}</p>
                  <p className="text-sm font-bold text-slate-900">{fmtNum(e.dailyRedemptions)}</p>
                </div>
                <div className="bg-slate-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-slate-500 uppercase tracking-wide">{t("calculator.daily_net")}</p>
                  <p className="text-sm font-bold text-slate-900">{fmtEur(e.dailyNet, 2)}</p>
                </div>
                <div className="bg-emerald-50 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-emerald-600 uppercase tracking-wide">{t("calculator.monthly_net")}</p>
                  <p className="text-sm font-bold text-emerald-700">{fmtEur(e.monthlyNet, 2)}</p>
                </div>
                <div className="bg-emerald-100 rounded-lg p-2 text-center">
                  <p className="text-[10px] text-emerald-700 uppercase tracking-wide">{t("calculator.annual_net")}</p>
                  <p className="text-sm font-bold text-emerald-800">{fmtEur(e.annualNet, 2)}</p>
                </div>
              </div>

              {/* Conversion slider per airport */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{t("calculator.conversion_rate")}</span>
                  <span className="font-bold text-slate-900">{e.conversionRate}%</span>
                </div>
                <Slider
                  min={1}
                  max={75}
                  step={1}
                  value={[e.conversionRate]}
                  onValueChange={([v]) => onUpdate(e.id, { conversionRate: v })}
                  className="w-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}