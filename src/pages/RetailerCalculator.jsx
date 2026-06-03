import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShoppingBag, Percent, Euro, Info, Users, Store } from "lucide-react";
import { fmtNum, fmtEur } from "../utils/formatNumber";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";

// ── Shared discount logic ──────────────────────────────────────────────────────
// Linear interpolation within each tier
function lerp(spend, minSpend, maxSpend, minSav, maxSav) {
  const pct = Math.min(1, (spend - minSpend) / (maxSpend - minSpend));
  return Math.round((minSav + pct * (maxSav - minSav)) * 100) / 100;
}
function calcSaving(spend) {
  if (spend < 70)   return 0;
  if (spend >= 300) return 60;                      // VIP: flat €60
  if (spend >= 200) return lerp(spend, 200, 299, 30, 60); // Lounge: €30→€60
  if (spend >= 100) return lerp(spend, 100, 199, 10, 30); // Priority: €10→€30
  return lerp(spend, 70, 99, 5, 10);               // Boarding: €5→€10
}

function getTier(spend) {
  if (spend < 70) return null;
  if (spend >= 300) return { name: "VIP DutyCredit", emoji: "🟣", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", bar: "bg-purple-400" };
  if (spend >= 200) return { name: "Lounge DutyCredit", emoji: "🟢", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30", bar: "bg-green-400" };
  if (spend >= 100) return { name: "Priority DutyCredit", emoji: "🔵", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", bar: "bg-blue-400" };
  return { name: "Boarding DutyCredit", emoji: "🟡", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30", bar: "bg-yellow-400" };
}

// Travel Partner: earns 20% of DutyBoost's 2.5% fee per redemption, capped at €5/tx
const AGENCY_COMMISSION_SHARE = 0.20; // 20% of DutyBoost fee
const PLATFORM_FEE_PCT = 0.025;       // 2.5% of basket
const PLATFORM_FEE_CAP = 25;          // €25 max DutyBoost fee per transaction
const AGENCY_COMMISSION_CAP = 5;      // €5 max agency commission per transaction

const TIER_BANDS = [
  { label: "Boarding", min: 70, max: 99,   savMin: 5,  savMax: 10, color: "bg-yellow-400", textColor: "text-yellow-400" },
  { label: "Priority", min: 100, max: 199, savMin: 10, savMax: 30, color: "bg-blue-400",   textColor: "text-blue-400" },
  { label: "Lounge",   min: 200, max: 299, savMin: 30, savMax: 60, color: "bg-green-400",  textColor: "text-green-400" },
  { label: "VIP",      min: 300, max: 1000,savMin: 60, savMax: 60, color: "bg-purple-400", textColor: "text-purple-400" },
];



// ── Retailer tab ───────────────────────────────────────────────────────────────
function RetailerTab({ t }) {
  const [spend, setSpend] = useState(150);

  const saving = useMemo(() => calcSaving(spend), [spend]);
  const commission = useMemo(() => Math.min(Math.round(spend * 0.025 * 100) / 100, PLATFORM_FEE_CAP), [spend]);
  const totalCost = useMemo(() => Math.round((saving + commission) * 100) / 100, [saving, commission]);
  const discountPct = useMemo(() => spend > 0 ? Math.round((saving / spend) * 1000) / 10 : 0, [saving, spend]);
  const netRevenue = useMemo(() => Math.round((spend - saving - commission) * 100) / 100, [spend, saving, commission]);
  const tier = useMemo(() => getTier(spend), [spend]);

  const tierProgress = useMemo(() => {
    if (spend < 70) return 0;
    if (spend >= 300) return 100;
    if (spend >= 200) return ((spend - 200) / 99) * 100;
    if (spend >= 100) return ((spend - 100) / 99) * 100;
    return ((spend - 70) / 29) * 100;
  }, [spend]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-slate-900">{t('calculator.retailer_title')}</h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">{t('calculator.retailer_subtitle')}</p>
      </div>

      {/* Slider Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('calculator.basket_spend')}</p>
            <p className="text-5xl font-bold text-slate-900">€{spend}</p>
          </div>
          {tier && (
            <div className="px-4 py-2 rounded-xl border text-sm font-semibold border-slate-300 bg-slate-100 text-slate-900">
              {tier.emoji} {tier.name}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Slider min={70} max={1000} step={1} value={[spend]} onValueChange={([v]) => setSpend(v)} className="w-full" />
          <div className="flex justify-between text-xs text-slate-600">
          <span>€70</span>
          <span>€1.000</span>
          </div>
        </div>
        {tier && (
          <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-slate-600">
            <span>{t('calculator.progress_within')} {tier.name}</span>
            <span>{Math.round(tierProgress)}%</span>
          </div>
            <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-200 ${tier.bar}`} style={{ width: `${tierProgress}%` }} />
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-blue-600 rounded-xl p-4 text-center">
              <ShoppingBag className="w-6 h-6 text-blue-100 mx-auto mb-2" />
              <p className="text-xs text-blue-100 mb-1">{t('calculator.basket_value')}</p>
              <p className="text-2xl font-bold text-white">€{spend}</p>
            </div>
            <div className="bg-rose-600 rounded-xl p-4 text-center">
              <Percent className="w-6 h-6 text-rose-100 mx-auto mb-2" />
              <p className="text-xs text-rose-100 mb-1">{t('calculator.traveler_saving')}</p>
              <p className="text-2xl font-bold text-white">€{fmtNum(saving, 2)}</p>
              <p className="text-xs text-rose-200 mt-0.5">{fmtNum(discountPct, 1)}% off</p>
            </div>
            <div className="bg-orange-500 rounded-xl p-4 text-center">
              <Euro className="w-6 h-6 text-orange-100 mx-auto mb-2" />
              <p className="text-xs text-orange-100 mb-1">{t('calculator.dutboost_fee')}</p>
              <p className="text-2xl font-bold text-white">€{fmtNum(commission, 2)}</p>
            </div>
            <div className="bg-emerald-600 rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-emerald-100 mx-auto mb-2" />
              <p className="text-xs text-emerald-100 mb-1">{t('calculator.net_revenue')}</p>
              <p className="text-2xl font-bold text-white">€{fmtNum(netRevenue, 2)}</p>
            </div>
            <div className="bg-teal-700 rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-teal-100 mx-auto mb-2" />
              <p className="text-xs text-teal-100 mb-1">Return per €1 invested</p>
              <p className="text-2xl font-bold text-white">{totalCost > 0 ? Math.round((netRevenue / totalCost) * 10) / 10 : 0}x</p>
              <p className="text-xs text-teal-200 mt-0.5">ROI</p>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-slate-900 text-lg">{t('calculator.total_acq_title')}</h3>
            <p className="text-slate-600 text-sm">{t('calculator.total_acq_desc')}</p>
            <div className="space-y-2">
              {[
                { label: t('calculator.label_saving'), value: saving, pct: fmtNum(discountPct, 1), barColor: "bg-rose-600", textColor: "text-rose-600" },
                { label: t('calculator.label_fee'), value: commission, pct: fmtNum(spend > 0 ? Math.round((commission / spend) * 1000) / 10 : 2.5, 1), barColor: "bg-orange-500", textColor: "text-orange-500" },
                { label: t('calculator.label_net'), value: netRevenue, pct: fmtNum(Math.round((netRevenue / spend) * 1000) / 10, 1), barColor: "bg-emerald-600", textColor: "text-emerald-600" },
              ].map(({ label, value, pct, barColor, textColor }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-28 text-xs text-slate-500 shrink-0">{label}</div>
                  <div className="flex-1 h-6 bg-slate-200 rounded-lg overflow-hidden">
                    <div className={`h-full ${barColor} rounded-lg transition-all duration-300`} style={{ width: `${Math.min(100, (value / spend) * 100)}%` }} />
                    </div>
                    <div className={`w-12 text-xs text-right shrink-0 font-semibold ${textColor}`}>{pct}%</div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs text-slate-500">{t('calculator.total_cost_label')}</p>
                <p className="text-2xl font-bold text-slate-900">€{fmtNum(totalCost, 2)} <span className="text-sm font-normal text-slate-600">/ {fmtNum(Math.round((totalCost / spend) * 1000) / 10, 1)}% {t('calculator.of_basket')}</span></p>
              </div>

            </div>
          </div>



          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">{t('calculator.tiers_title')}</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-600 border-b border-slate-200">
                    <th className="pb-2 pr-4">{t('calculator.col_tier')}</th>
                    <th className="pb-2 pr-4">{t('calculator.col_spend')}</th>
                    <th className="pb-2 pr-4">{t('calculator.col_saving')}</th>
                    <th className="pb-2 pr-4">{t('calculator.col_fee')}</th>
                    <th className="pb-2">{t('calculator.col_net_pct')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {TIER_BANDS.map((t) => {
                    const midSpend = t.min === 300 ? 350 : Math.round((t.min + t.max) / 2);
                    const midSaving = calcSaving(midSpend);
                    const midFee = Math.min(Math.round(midSpend * 0.025 * 100) / 100, PLATFORM_FEE_CAP);
                    const midNet = Math.round(((midSpend - midSaving - midFee) / midSpend) * 1000) / 10;
                    const isActive = tier?.name.startsWith(t.label);
                    return (
                      <tr key={t.label} className={`transition-colors ${isActive ? "bg-slate-100" : ""}`}>
                        <td className={`py-2.5 pr-4 font-medium ${t.textColor}`}>{t.label}</td>
                        <td className="py-2.5 pr-4 text-slate-700">€{t.min}–{t.max === 500 ? "€300+" : `€${t.max}`}</td>
                        <td className="py-2.5 pr-4 text-slate-700">€{t.savMin}–€{t.savMax}</td>
                        <td className="py-2.5 pr-4 text-orange-600">€{fmtNum(Math.min(t.min * 0.025, PLATFORM_FEE_CAP), 2)}–€{fmtNum(Math.min(t.max * 0.025, PLATFORM_FEE_CAP), 2)}</td>
                        <td className="py-2.5 text-green-600">{fmtNum(midNet, 1)}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-600">{t('calculator.tiers_footnote')}</p>
          </div>

    </div>
  );
}

// ── Travel Partner tab ────────────────────────────────────────────────────────
function TravelPartnerTab({ t }) {
  const [bookingsPerMonth, setBookingsPerMonth] = useState(0);
  const [conversionRate, setConversionRate] = useState(20); // %
  const [avgBasket, setAvgBasket] = useState(150);

  const redemptions = useMemo(() => Math.round(bookingsPerMonth * (conversionRate / 100)), [bookingsPerMonth, conversionRate]);
  const agencyCommissionPerTx = useMemo(() => Math.min(Math.round(Math.min(avgBasket * PLATFORM_FEE_PCT, PLATFORM_FEE_CAP) * AGENCY_COMMISSION_SHARE * 100) / 100, AGENCY_COMMISSION_CAP), [avgBasket]);
  const monthlyCommission = useMemo(() => Math.round(redemptions * agencyCommissionPerTx * 100) / 100, [redemptions, agencyCommissionPerTx]);
  const travelerSavingPerTx = useMemo(() => calcSaving(avgBasket), [avgBasket]);
  const totalTravelerSavings = useMemo(() => Math.round(redemptions * travelerSavingPerTx * 100) / 100, [redemptions, travelerSavingPerTx]);
  const tier = useMemo(() => getTier(avgBasket), [avgBasket]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-slate-900">{t('calculator.partner_title')}</h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto">
          {t('calculator.partner_subtitle_1')} <strong className="text-emerald-700">{t('calculator.partner_subtitle_2')}</strong> {t('calculator.partner_subtitle_3')} <strong className="text-emerald-700">{t('calculator.partner_subtitle_4')}</strong>{t('calculator.partner_subtitle_5')} <strong className="text-emerald-700">{t('calculator.partner_subtitle_6')}</strong> {t('calculator.partner_subtitle_7')}
        </p>
      </div>

      {/* Sliders */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-6">
        {/* Bookings per month */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{t('calculator.bookings_per_month')}</p>
              <p className="text-4xl font-bold text-slate-900">{fmtNum(bookingsPerMonth)}</p>
            </div>
            <span className="text-slate-500 text-sm">{t('calculator.travelers_label')}</span>
          </div>
          <Slider min={0} max={1000000} step={1000} value={[bookingsPerMonth]} onValueChange={([v]) => setBookingsPerMonth(v)} className="w-full" />
          <div className="flex justify-between text-xs text-slate-500"><span>0</span><span>1.000.000</span></div>
        </div>

        {/* Conversion rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{t('calculator.redemption_rate')}</p>
              <p className="text-4xl font-bold text-slate-900">{conversionRate}%</p>
            </div>
            <span className="text-slate-500 text-sm">{t('calculator.travelers_redeem')}</span>
          </div>
          <Slider min={5} max={50} step={1} value={[conversionRate]} onValueChange={([v]) => setConversionRate(v)} className="w-full" />
          <div className="flex justify-between text-xs text-slate-500"><span>5%</span><span>{t('calculator.industry_avg')}</span><span>50%</span></div>
        </div>

        {/* Avg basket */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{t('calculator.avg_basket')}</p>
              <p className="text-4xl font-bold text-slate-900">€{avgBasket}</p>
            </div>
            {tier && (
              <div className="px-3 py-1.5 rounded-xl border border-slate-300 bg-slate-100 text-xs font-semibold text-slate-900">
                {tier.emoji} {tier.name}
              </div>
            )}
          </div>
          <Slider min={70} max={500} step={5} value={[avgBasket]} onValueChange={([v]) => setAvgBasket(v)} className="w-full" />
          <div className="flex justify-between text-xs text-slate-500"><span>€70 (min)</span><span>€500+</span></div>
        </div>
      </div>

      {/* Result metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-slate-700 rounded-xl p-4 text-center">
          <Users className="w-4 h-4 text-slate-200 mx-auto mb-2" />
          <p className="text-xs text-slate-200 mb-1">{t('calculator.redemptions_month')}</p>
          <p className="text-2xl font-bold text-white">{fmtNum(redemptions)}</p>
        </div>
        <div className="bg-blue-600 rounded-xl p-4 text-center">
          <ShoppingBag className="w-4 h-4 text-blue-100 mx-auto mb-2" />
          <p className="text-xs text-blue-100 mb-1">{t('calculator.commission_tx')}</p>
          <p className="text-2xl font-bold text-white">€{fmtNum(agencyCommissionPerTx, 2)}</p>
          <p className="text-xs text-blue-200 mt-0.5">0.5% of basket (max €5)</p>
        </div>
        <div className="bg-emerald-600 rounded-xl p-4 text-center">
          <TrendingUp className="w-4 h-4 text-emerald-100 mx-auto mb-2" />
          <p className="text-xs text-emerald-100 mb-1">{t('calculator.monthly_commission')}</p>
          <p className="text-2xl font-bold text-white">{fmtEur(monthlyCommission, 2)}</p>
        </div>
        <div className="bg-rose-600 rounded-xl p-4 text-center">
          <Percent className="w-4 h-4 text-rose-100 mx-auto mb-2" />
          <p className="text-xs text-rose-100 mb-1">{t('calculator.traveler_savings_month')}</p>
          <p className="text-2xl font-bold text-white">{fmtEur(totalTravelerSavings, 2)}</p>
        </div>
      </div>

      {/* Commission breakdown */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-bold text-slate-900 text-lg">{t('calculator.revenue_title')}</h3>
          <p className="text-slate-600 text-sm mt-1">{t('calculator.revenue_desc')}</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-slate-100 rounded-xl p-4 space-y-1">
            <p className="text-xs text-slate-500">{t('calculator.you_send')}</p>
            <p className="text-2xl font-bold text-slate-900">{fmtNum(bookingsPerMonth)} {t('calculator.travelers_mo')}</p>
          </div>
          <div className="bg-slate-100 rounded-xl p-4 space-y-1">
            <p className="text-xs text-slate-500">{t('calculator.at_redemption')} {conversionRate}% {t('calculator.redemption_rate_label')}</p>
            <p className="text-2xl font-bold text-slate-900">{fmtNum(redemptions)} {t('calculator.transactions_label')}</p>
          </div>
          <div className="bg-emerald-600 rounded-xl p-4 space-y-1">
            <p className="text-xs text-emerald-100">{t('calculator.you_earn')}</p>
            <p className="text-2xl font-bold text-white">{fmtEur(monthlyCommission, 2)} {t('calculator.per_month')}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
          <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-800 leading-relaxed">
            {t('calculator.commission_info')} <strong>{t('calculator.commission_info_2')}</strong>{t('calculator.commission_info_3')}
          </p>
        </div>
      </div>

      {/* Tier reference for agencies */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-3">
        <h3 className="font-bold text-slate-900 text-sm uppercase tracking-widest">{t('calculator.commission_by_tier')}</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-600 border-b border-slate-200">
                <th className="pb-2 pr-4">{t('calculator.col_tier')}</th>
                <th className="pb-2 pr-4">{t('calculator.col_avg_basket')}</th>
                <th className="pb-2 pr-4">{t('calculator.col_traveler_saves')}</th>
                <th className="pb-2 pr-4">{t('calculator.col_your_commission')}</th>
                <th className="pb-2">{t('calculator.col_per_100')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {TIER_BANDS.map((t) => {
                const mid = t.min === 300 ? 350 : Math.round((t.min + t.max) / 2);
                const saving = calcSaving(mid);
                const comm = Math.min(Math.round(Math.min(mid * PLATFORM_FEE_PCT, PLATFORM_FEE_CAP) * AGENCY_COMMISSION_SHARE * 100) / 100, AGENCY_COMMISSION_CAP);
                const per100 = Math.round(comm * 100 * 100) / 100;
                const isActive = tier?.name.startsWith(t.label);
                return (
                  <tr key={t.label} className={`transition-colors ${isActive ? "bg-slate-100" : ""}`}>
                    <td className={`py-2.5 pr-4 font-medium ${t.textColor}`}>{t.label}</td>
                    <td className="py-2.5 pr-4 text-slate-700">€{mid}</td>
                    <td className="py-2.5 pr-4 text-rose-600 font-medium">€{fmtNum(saving, 2)}</td>
                    <td className="py-2.5 pr-4 text-emerald-700 font-semibold">€{fmtNum(comm, 2)}</td>
                    <td className="py-2.5 text-blue-700 font-medium">€{fmtNum(per100, 0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">{t('calculator.commission_footnote')}</p>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function RetailerCalculator() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("retailer");

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-between items-center mb-2">
            <div className="w-24" />
            <DutyBoostLogo height={80} />
            <div className="w-24 flex justify-end">
              <LanguageSwitcher />
            </div>
          </div>
            <Badge className="bg-blue-100 text-blue-700 border-blue-300 text-xs tracking-widest uppercase">
              {t('calculator.badge')}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900">{t('calculator.title')}</h1>
            <p className="text-slate-600 text-sm max-w-xl mx-auto">
            {t('calculator.subtitle')}
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 bg-slate-100 border border-slate-300 rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab("retailer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "retailer"
                ? "bg-orange-500 text-white shadow"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <Store className="w-4 h-4" /> {t('calculator.tab_retailer')}
          </button>
          <button
            onClick={() => setActiveTab("partner")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "partner"
                ? "bg-green-600 text-white shadow"
                : "text-slate-700 hover:text-slate-900"
            }`}
          >
            <Users className="w-4 h-4" /> {t('calculator.tab_partner')}
          </button>
        </div>

        {activeTab === "retailer" ? <RetailerTab t={t} /> : <TravelPartnerTab t={t} />}

      </div>
      <PageFooter />
    </div>
  );
}