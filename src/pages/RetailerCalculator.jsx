import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShoppingBag, Percent, Euro, Info, Users, Store, Check } from "lucide-react";
import { fmtNum, fmtEur } from "../utils/formatNumber";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";
import SliderInput from "../components/SliderInput";
import AirportSelector from "../components/AirportSelector";
import TravelPartnerSelector from "../components/TravelPartnerSelector";
import { GLOBAL_AIRPORTS } from "../data/globalAirports";
import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

// ── Responsive font size for large numbers ─────────────────────────────────────
function numFontClass(str) {
  const len = String(str).length;
  if (len <= 8)  return "text-2xl";
  if (len <= 11) return "text-xl";
  if (len <= 14) return "text-lg";
  return "text-base";
}

// ── Shared discount logic ──────────────────────────────────────────────────────
// Fixed reward per tier — minimum basket €35
function calcSaving(spend) {
  if (spend < 35)  return 0;
  if (spend >= 300) return 60.00; // VIP
  if (spend >= 250) return 45.00; // Premium
  if (spend >= 200) return 30.00; // Lounge
  if (spend >= 150) return 20.00; // Plus
  if (spend >= 100) return 10.00; // Standard
  if (spend >= 70)  return 5.00;  // Boarding
  return 2.50;                    // Entry (€35–€69)
}

function getTier(spend) {
  if (spend < 35)  return null;
  if (spend >= 300) return { name: "VIP DutyCredit",     emoji: "🟣", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", bar: "bg-purple-400" };
  if (spend >= 250) return { name: "Premium DutyCredit", emoji: "💎", color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/30",   bar: "bg-pink-400" };
  if (spend >= 200) return { name: "Lounge DutyCredit",  emoji: "🟢", color: "text-green-400",  bg: "bg-green-500/10 border-green-500/30",  bar: "bg-green-400" };
  if (spend >= 150) return { name: "Plus DutyCredit",    emoji: "🔵", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/30",    bar: "bg-blue-400" };
  if (spend >= 100) return { name: "Standard DutyCredit",emoji: "🟡", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30", bar: "bg-yellow-400" };
  if (spend >= 70)  return { name: "Boarding DutyCredit",emoji: "⚪", color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/30",  bar: "bg-slate-400" };
  return               { name: "Entry DutyCredit",    emoji: "🟤", color: "text-amber-600",  bg: "bg-amber-500/10 border-amber-500/30",  bar: "bg-amber-400" };
}

// Platform Fee = 2.5% of basket. Travel Partner = 0.5% of basket (capped at €5/tx).
const PLATFORM_FEE_PCT = 0.025;      // 2.5% of basket
const PLATFORM_FEE_CAP = 25;         // €25 max per transaction
const AGENCY_COMMISSION_PCT = 0.005; // 0.5% of basket
const AGENCY_COMMISSION_CAP = 5;     // €5 max per transaction

const TIER_BANDS = [
  { label: "Entry",    min: 35,  max: 69,  saving: 2.50,  color: "bg-amber-400",  textColor: "text-amber-600" },
  { label: "Boarding", min: 70,  max: 99,  saving: 5.00,  color: "bg-slate-400",  textColor: "text-slate-500" },
  { label: "Standard", min: 100, max: 149, saving: 10.00, color: "bg-yellow-400", textColor: "text-yellow-600" },
  { label: "Plus",     min: 150, max: 199, saving: 20.00, color: "bg-blue-400",   textColor: "text-blue-600" },
  { label: "Lounge",   min: 200, max: 249, saving: 30.00, color: "bg-green-400",  textColor: "text-green-600" },
  { label: "Premium",  min: 250, max: 299, saving: 45.00, color: "bg-pink-400",   textColor: "text-pink-600" },
  { label: "VIP",      min: 300, max: 1000,saving: 60.00, color: "bg-purple-400", textColor: "text-purple-600" },
];

// Bookings/month slider tiers: 0 → 100→1000 (×100) → 2000→100000 (×1000) → 105000→10M (×5000)
const BOOKING_TIERS = [
  0,
  ...Array.from({ length: 10 }, (_, i) => (i + 1) * 100),
  ...Array.from({ length: 99 }, (_, i) => (i + 2) * 1000),
  ...Array.from({ length: 1980 }, (_, i) => 105000 + i * 5000),
];



// ── Retailer tab ───────────────────────────────────────────────────────────────
function RetailerTab({ t }) {
  const [selectedAirport, setSelectedAirport] = useState(null);
  const [spend, setSpend] = useState(0);
  const [spendInput, setSpendInput] = useState("0");
  const [spendError, setSpendError] = useState("");
  const TRAVELER_TIERS = [0, 100, 500, ...Array.from({length: 1000}, (_, i) => (i + 1) * 1000)];
  const [dailyTravelers, setDailyTravelers] = useState(0);
  const [travelersInput, setTravelersInput] = useState("0");
  const [travelersError, setTravelersError] = useState("");
  const [conversionRate, setConversionRate] = useState(15);

  const handleAirportSelect = (airport) => {
    setSelectedAirport(airport);
    if (airport) {
      // Snap to nearest tier on the traveler slider
      const nearest = TRAVELER_TIERS.reduce((a, b) => Math.abs(b - airport.daily_pax) < Math.abs(a - airport.daily_pax) ? b : a);
      setDailyTravelers(nearest);
      setTravelersInput(fmtNum(nearest));
      setTravelersError("");
      // Auto-populate basket spend with estimated avg duty-free transaction for this airport
      const estBasket = estimateAvgBasketSpend(airport);
      setSpend(estBasket);
      setSpendInput(fmtNum(estBasket));
      setSpendError("");
    }
  };
  // min basket is now €35

  const saving = useMemo(() => calcSaving(spend), [spend]);
  const commission = useMemo(() => Math.min(Math.round(spend * 0.025 * 100) / 100, PLATFORM_FEE_CAP), [spend]);
  const totalCost = useMemo(() => Math.round((saving + commission) * 100) / 100, [saving, commission]);
  const discountPct = useMemo(() => spend > 0 ? Math.round((saving / spend) * 1000) / 10 : 0, [saving, spend]);
  const netRevenue = useMemo(() => Math.round((spend - saving - commission) * 100) / 100, [spend, saving, commission]);
  const tier = useMemo(() => getTier(spend), [spend]);

  const dailyRedemptions = useMemo(() => Math.round(dailyTravelers * (conversionRate / 100)), [dailyTravelers, conversionRate]);

  // Monthly is the base figure; annual = monthly × 12 and daily = monthly × 12 ÷ 365 — all derived from the rounded monthly so displayed values are always consistent
  const monthlyNet = useMemo(() => Math.round(dailyRedemptions * netRevenue * 365 / 12 * 100) / 100, [dailyRedemptions, netRevenue]);
  const annualNet = useMemo(() => Math.round(monthlyNet * 12 * 100) / 100, [monthlyNet]);
  const dailyNet = useMemo(() => Math.round(monthlyNet * 12 / 365 * 100) / 100, [monthlyNet]);

  const monthlyFee = useMemo(() => Math.round(dailyRedemptions * commission * 365 / 12 * 100) / 100, [dailyRedemptions, commission]);
  const annualFee = useMemo(() => Math.round(monthlyFee * 12 * 100) / 100, [monthlyFee]);
  const dailyFee = useMemo(() => Math.round(monthlyFee * 12 / 365 * 100) / 100, [monthlyFee]);

  const tierProgress = useMemo(() => {
    if (spend < 35)  return 0;
    if (spend >= 300) return 100;
    if (spend >= 250) return ((spend - 250) / 49) * 100;
    if (spend >= 200) return ((spend - 200) / 49) * 100;
    if (spend >= 150) return ((spend - 150) / 49) * 100;
    if (spend >= 100) return ((spend - 100) / 49) * 100;
    if (spend >= 70)  return ((spend - 70)  / 29) * 100;
    return ((spend - 35) / 34) * 100;
  }, [spend]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-slate-900">{t('calculator.retailer_title')}</h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: t('calculator.retailer_subtitle') }} />
      </div>

      <AirportSelector selectedAirport={selectedAirport} onSelect={handleAirportSelect} t={t} />

      {/* Slider Card */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{selectedAirport ? `${selectedAirport.code} ${t('calculator.basket_spend')}` : t('calculator.basket_spend')}</p>
            <div className="flex items-center gap-1">
              <span className="text-5xl font-bold text-slate-900">€</span>
              <input
                type="text"
                inputMode="numeric"
                value={spendInput}
                onChange={(e) => {
                  const digits = e.target.value.replace(/[^\d]/g, "");
                  const n = digits === "" ? NaN : parseInt(digits, 10);
                  if (digits === "") { setSpendInput(""); setSpendError(t('calculator.error_min_basket')); return; }
                  const clamped = Math.min(n, 1000);
                  setSpendInput(fmtNum(clamped));
                  if (n < 35) { setSpendError(t('calculator.error_min_basket')); } else { setSpendError(""); setSpend(clamped); }
                }}
                onBlur={() => {
                  const digits = (spendInput || "").replace(/[^\d]/g, "");
                  const n = digits === "" ? 0 : parseInt(digits, 10);
                  if (n < 35) { setSpend(35); setSpendInput(fmtNum(35)); setSpendError(""); }
                }}
                style={{ width: `${Math.max(3, String(spendInput).length)}ch` }}
                className={`text-5xl font-bold text-slate-900 bg-transparent border-b-2 outline-none min-w-[3ch] max-w-full ${spendError ? "border-red-400" : "border-slate-300 focus:border-primary"}`}
              />
            </div>
            {spendError && <p className="text-xs text-red-500 mt-1 font-medium">{spendError}</p>}
          </div>
          {tier && (
            <div className="px-4 py-2 rounded-xl border text-sm font-semibold border-slate-300 bg-slate-100 text-slate-900">
              {tier.emoji} {tier.name}
            </div>
          )}
        </div>
        <div className="space-y-2">
          <Slider min={0} max={1000} step={5} value={[spend]} onValueChange={([v]) => { setSpend(v); setSpendInput(fmtNum(v)); setSpendError(""); }} className="w-full" />
        </div>
        <div className="flex flex-col sm:flex-row gap-2 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <Info className="w-3 h-3 text-blue-500 shrink-0" />
            <span>{t('calculator.basket_avg_ref')}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
            <Info className="w-3 h-3 text-amber-500 shrink-0" />
            <span>{t('calculator.dutycredit_activation')}</span>
          </div>
          {selectedAirport && (
            <div className="flex items-center gap-1.5 text-xs text-blue-700 bg-blue-50 border border-blue-200 rounded-lg px-2.5 py-1.5">
              <Info className="w-3 h-3 shrink-0" />
              <span>{t('calculator.basket_auto_set')}</span>
            </div>
          )}
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

      {/* Travelers & Conversion sliders */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('calculator.daily_travelers')}</p>
              <input
                type="text"
                inputMode="numeric"
                value={travelersInput}
                onChange={(e) => {
                  const digits = e.target.value.replace(/[^\d]/g, "");
                   if (digits === "") { setTravelersInput(""); setTravelersError(t('calculator.error_min_travelers')); return; }
                   const n = parseInt(digits, 10);
                   setTravelersInput(fmtNum(n));
                   if (n < 100) { setTravelersError(t('calculator.error_min_travelers')); } else { setTravelersError(""); const nearest = TRAVELER_TIERS.reduce((a, b) => Math.abs(b - n) < Math.abs(a - n) ? b : a); setDailyTravelers(nearest); }
                }}
                onBlur={() => {
                  const digits = (travelersInput || "").replace(/[^\d]/g, "");
                  const n = digits === "" ? 0 : parseInt(digits, 10);
                  if (n < 100) { setDailyTravelers(100); setTravelersInput(fmtNum(100)); setTravelersError(""); }
                }}
                style={{ width: `${Math.max(3, String(travelersInput).length)}ch` }}
                className={`text-4xl font-bold text-slate-900 bg-transparent border-b-2 outline-none min-w-[3ch] max-w-full ${travelersError ? "border-red-400" : "border-slate-300 focus:border-primary"}`}
              />
              {travelersError && <p className="text-xs text-red-500 mt-1 font-medium">{travelersError}</p>}
            </div>
            <div className="text-right text-sm text-slate-500">
              <p>{t('calculator.estimated_redemptions')}</p>
              <p className="text-base font-bold text-slate-900">{fmtNum(dailyRedemptions)} / {t('calculator.day_label')}</p>
            </div>
          </div>
          <Slider min={0} max={TRAVELER_TIERS.length - 1} step={1} value={[Math.max(0, TRAVELER_TIERS.findIndex((v) => v === dailyTravelers))]} onValueChange={([i]) => { setDailyTravelers(TRAVELER_TIERS[i]); setTravelersInput(fmtNum(TRAVELER_TIERS[i])); setTravelersError(""); }} className="w-full" />
        </div>

        <div className="space-y-2 pt-2 border-t border-slate-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('calculator.conversion_rate')}</p>
              <p className="text-4xl font-bold text-slate-900">{conversionRate}%</p>
            </div>
            <p className="text-xs text-slate-500 flex items-center gap-1"><Info className="w-3 h-3" /> {t('calculator.conversion_hint')}</p>
          </div>
          <Slider min={1} max={75} step={1} value={[conversionRate]} onValueChange={([v]) => setConversionRate(v)} className="w-full" />
          <p className="text-xs text-slate-500">{t('calculator.conversion_avg_range')}</p>
        </div>
      </div>

      {/* Revenue projection based on travelers */}
      <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-white text-lg">{t('calculator.revenue_projection_title')}</h3>
        <p className="text-xs text-slate-400 -mt-2">{t('calculator.revenue_projection_desc')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:flex-col sm:items-center">
              <Users className="w-4 h-4 text-slate-300" />
              <p className="text-xs text-slate-400">{t('calculator.daily_net')}</p>
            </div>
            <p className={`${numFontClass(fmtEur(dailyNet, 2))} font-bold text-white break-all`}>{fmtEur(dailyNet, 2)}</p>
          </div>
          <div className="bg-emerald-700 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:flex-col sm:items-center">
              <TrendingUp className="w-4 h-4 text-emerald-200" />
              <p className="text-xs text-emerald-200">{t('calculator.monthly_net')}</p>
            </div>
            <p className={`${numFontClass(fmtEur(monthlyNet, 2))} font-bold text-white break-all`}>{fmtEur(monthlyNet, 2)}</p>
          </div>
          <div className="bg-emerald-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:flex-col sm:items-center">
              <TrendingUp className="w-4 h-4 text-emerald-100" />
              <p className="text-xs text-emerald-100">{t('calculator.annual_net')}</p>
            </div>
            <p className={`${numFontClass(fmtEur(annualNet, 2))} font-bold text-white break-all`}>{fmtEur(annualNet, 2)}</p>
          </div>
        </div>
        <div className="bg-slate-800 rounded-xl px-4 py-3 text-xs text-slate-400 leading-relaxed">
          <span className="text-slate-300 font-semibold">{fmtNum(dailyTravelers)}</span> {t('calculator.travelers_label')} × <span className="text-slate-300 font-semibold">{conversionRate}%</span> = <span className="text-slate-300 font-semibold">{fmtNum(dailyRedemptions)}</span> {t('calculator.redemptions_label')} × {fmtEur(netRevenue, 2)} {t('calculator.net_per_tx')}
        </div>
      </div>

      {/* Platform fee projection based on redemptions */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6 space-y-4">
        <h3 className="font-bold text-slate-900 text-lg">{t('calculator.platform_fee_projection_title')}</h3>
        <p className="text-xs text-slate-600 -mt-2">{t('calculator.platform_fee_projection_desc')}</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="bg-white border border-orange-200 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:flex-col sm:items-center">
              <p className="text-xs text-slate-500">{t('calculator.daily_fee')}</p>
            </div>
            <p className={`${numFontClass(fmtEur(dailyFee, 2))} font-bold text-orange-600 break-all`}>{fmtEur(dailyFee, 2)}</p>
          </div>
          <div className="bg-orange-500 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:flex-col sm:items-center">
              <p className="text-xs text-orange-100">{t('calculator.monthly_fee')}</p>
            </div>
            <p className={`${numFontClass(fmtEur(monthlyFee, 2))} font-bold text-white break-all`}>{fmtEur(monthlyFee, 2)}</p>
          </div>
          <div className="bg-orange-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2">
            <div className="flex items-center gap-2 sm:flex-col sm:items-center">
              <p className="text-xs text-orange-50">{t('calculator.annual_fee')}</p>
            </div>
            <p className={`${numFontClass(fmtEur(annualFee, 2))} font-bold text-white break-all`}>{fmtEur(annualFee, 2)}</p>
          </div>
        </div>
        <div className="bg-white border border-orange-200 rounded-xl px-4 py-3 text-xs text-slate-600 leading-relaxed">
          <span className="text-slate-800 font-semibold">{fmtNum(dailyRedemptions)}</span> {t('calculator.redemptions_label')} / {t('calculator.day_label')} × {fmtEur(commission, 2)} {t('calculator.fee_per_tx')} = <span className="text-orange-600 font-semibold">{fmtEur(dailyFee, 2)}</span> / {t('calculator.day_label')}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            <div className="bg-blue-600 rounded-xl p-4 text-center">
              <ShoppingBag className="w-6 h-6 text-blue-100 mx-auto mb-2" />
              <p className="text-xs text-blue-100 mb-1">{t('calculator.basket_value')}</p>
              <p className="text-2xl font-bold text-white">{fmtEur(spend)}</p>
            </div>
            <div className="bg-rose-600 rounded-xl p-4 text-center">
              <Percent className="w-6 h-6 text-rose-100 mx-auto mb-2" />
              <p className="text-xs text-rose-100 mb-1">{t('calculator.traveler_saving')}</p>
              <p className="text-2xl font-bold text-white">{fmtEur(saving, 2)}</p>
              <p className="text-xs text-rose-200 mt-0.5">{fmtNum(discountPct, 1)}% off</p>
            </div>
            <div className="bg-orange-500 rounded-xl p-4 text-center">
              <Euro className="w-6 h-6 text-orange-100 mx-auto mb-2" />
              <p className="text-xs text-orange-100 mb-1">{t('calculator.dutboost_fee')}</p>
              <p className="text-2xl font-bold text-white">{fmtEur(commission, 2)}</p>
            </div>
            <div className="bg-emerald-600 rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-emerald-100 mx-auto mb-2" />
              <p className="text-xs text-emerald-100 mb-1">{t('calculator.net_revenue')}</p>
              <p className="text-2xl font-bold text-white">{fmtEur(netRevenue, 2)}</p>
            </div>
            <div className="bg-teal-700 rounded-xl p-4 text-center">
              <TrendingUp className="w-6 h-6 text-teal-100 mx-auto mb-2" />
              <p className="text-xs text-teal-100 mb-1">{t('calculator.return_per_euro')}</p>
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
                <p className="text-2xl font-bold text-slate-900">{fmtEur(totalCost, 2)} <span className="text-sm font-normal text-slate-600">/ {fmtNum(Math.round((totalCost / spend) * 1000) / 10, 1)}% {t('calculator.of_basket')}</span></p>
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
                    const midFee = Math.min(Math.round(midSpend * PLATFORM_FEE_PCT * 100) / 100, PLATFORM_FEE_CAP);
                    const midNet = Math.round(((midSpend - t.saving - midFee) / midSpend) * 1000) / 10;
                    const isActive = tier?.name.startsWith(t.label);
                    return (
                      <tr key={t.label} className={`transition-colors ${isActive ? "bg-slate-100" : ""}`}>
                        <td className={`py-2.5 pr-4 font-medium ${t.textColor}`}>{t.label}</td>
                        <td className="py-2.5 pr-4 text-slate-700">{fmtEur(t.min)}{t.max === 1000 ? "+" : `–${fmtEur(t.max)}`}</td>
                        <td className="py-2.5 pr-4 text-slate-700">{fmtEur(t.saving, 2)}</td>
                        <td className="py-2.5 pr-4 text-orange-600">{fmtEur(Math.min(t.min * PLATFORM_FEE_PCT, PLATFORM_FEE_CAP), 2)}</td>
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

// ── TravelStack vertical config ────────────────────────────────────────────────
const VERTICALS_CONFIG = [
  {
    key: "flight",
    labelKey: "vertical_flight",
    Icon: TravelAgencyIcon,
    color: "#1A6BFF",
    bgClass: "bg-blue-600",
    bgLightClass: "bg-blue-50",
    borderClass: "border-blue-200",
    textClass: "text-blue-700",
    activeClass: "bg-blue-600 text-white border-blue-600",
    inactiveClass: "bg-white text-slate-600 border-slate-300",
    commissionNote: "0.5% of basket spend (max €5/tx)",
    defaultBookings: 10000,
    defaultConversion: 15,
    defaultBasket: 150,
    creditsPerBooking: 2, // booking confirmation + return flight reminder
  },
  {
    key: "accommodation",
    labelKey: "vertical_accommodation",
    Icon: HotelIcon,
    color: "#8b5cf6",
    bgClass: "bg-violet-600",
    bgLightClass: "bg-violet-50",
    borderClass: "border-violet-200",
    textClass: "text-violet-700",
    activeClass: "bg-violet-600 text-white border-violet-600",
    inactiveClass: "bg-white text-slate-600 border-slate-300",
    commissionNote: "0.5% of basket spend (max €5/tx)",
    defaultBookings: 5000,
    defaultConversion: 20,
    defaultBasket: 185,
    creditsPerBooking: 2, // booking + checkout
  },
  {
    key: "car",
    labelKey: "vertical_car",
    Icon: CarRentalIcon,
    color: "#FF8000",
    bgClass: "bg-orange-500",
    bgLightClass: "bg-orange-50",
    borderClass: "border-orange-200",
    textClass: "text-orange-700",
    activeClass: "bg-orange-500 text-white border-orange-500",
    inactiveClass: "bg-white text-slate-600 border-slate-300",
    commissionNote: "0.5% of basket spend (max €5/tx)",
    defaultBookings: 3000,
    defaultConversion: 18,
    defaultBasket: 170,
    creditsPerBooking: 2, // booking + car return
  },
];

// ── Travel Partner tab ────────────────────────────────────────────────────────
function TravelPartnerTab({ t }) {
  const [selected, setSelected] = useState({ flight: true, accommodation: false, car: false });
  const [bookings, setBookings] = useState({ flight: 0, accommodation: 0, car: 0 });
  const [bookingsInput, setBookingsInput] = useState({ flight: "0", accommodation: "0", car: "0" });
  const [bookingsError, setBookingsError] = useState({ flight: "", accommodation: "", car: "" });
  const [selectedPartners, setSelectedPartners] = useState({ flight: null, accommodation: null, car: null });
  const [conversion, setConversion] = useState({ flight: 15, accommodation: 15, car: 15 });
  const FIXED_AVG_BASKET = 35;
  const avgBasket = useMemo(() => ({ flight: FIXED_AVG_BASKET, accommodation: FIXED_AVG_BASKET, car: FIXED_AVG_BASKET }), []);

  const activeVerticals = VERTICALS_CONFIG.filter((v) => selected[v.key]);

  const toggleVertical = (key) => {
    const next = { ...selected, [key]: !selected[key] };
    if (Object.values(next).some(Boolean)) setSelected(next);
  };

  const handlePartnerSelect = (vertical, partner) => {
    setSelectedPartners(prev => ({ ...prev, [vertical]: partner }));
    if (partner) {
      const monthlyBookings = Math.round(partner.annual_bookings / 12);
      const nearest = BOOKING_TIERS.reduce((a, b) => Math.abs(b - monthlyBookings) < Math.abs(a - monthlyBookings) ? b : a);
      setBookings(prev => ({ ...prev, [vertical]: nearest }));
      setBookingsInput(prev => ({ ...prev, [vertical]: fmtNum(nearest) }));
      setBookingsError(prev => ({ ...prev, [vertical]: "" }));
    }
  };

  const verticalStats = useMemo(() => {
    return VERTICALS_CONFIG.map((v) => {
      if (!selected[v.key]) return null;
      const bBookings = bookings[v.key]; // bookings / month (slider value)
      const dutyCredits = bBookings * v.creditsPerBooking; // DutyCredits issued = bookings × creditsPerBooking
      const c = conversion[v.key];
      const basket = avgBasket[v.key];
      const redemptions = Math.round(dutyCredits * (c / 100));
      const commPerTx = Math.min(Math.round(basket * AGENCY_COMMISSION_PCT * 100) / 100, AGENCY_COMMISSION_CAP);
      const monthlyComm = Math.round(redemptions * commPerTx * 100) / 100;
      const travelerSaving = Math.round(redemptions * calcSaving(basket) * 100) / 100;
      return { key: v.key, redemptions, commPerTx, monthlyComm, travelerSaving, basket, bBookings, dutyCredits, c, creditsPerBooking: v.creditsPerBooking };
    }).filter(Boolean);
  }, [selected, bookings, conversion, avgBasket]);

  const totals = useMemo(() => ({
    redemptions: verticalStats.reduce((s, v) => s + v.redemptions, 0),
    monthlyComm: verticalStats.reduce((s, v) => s + v.monthlyComm, 0),
    travelerSaving: verticalStats.reduce((s, v) => s + v.travelerSaving, 0),
  }), [verticalStats]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-slate-900">{t('calculator.partner_title')}</h2>
        <p className="text-slate-600 text-sm max-w-xl mx-auto" dangerouslySetInnerHTML={{ __html: t('calculator.partner_subtitle_full') }} />
      </div>

      {/* Vertical selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t('calculator.select_verticals')}</p>
        <div className="flex flex-wrap gap-3">
          {VERTICALS_CONFIG.map((v) => {
            const isOn = selected[v.key];
            return (
              <button
                key={v.key}
                onClick={() => toggleVertical(v.key)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold transition-all ${isOn ? v.activeClass : v.inactiveClass}`}
              >
                <v.Icon className="w-5 h-5" />
                {t('calculator.' + v.labelKey).replace(/^\P{L}+/u, '').trim()}
                {isOn && <Check className="w-4 h-4 ml-0.5" />}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400">{t('calculator.select_verticals_hint')}</p>
      </div>

      {/* Per-vertical sliders */}
      {activeVerticals.map((v) => (
        <div key={v.key} className={`bg-white border rounded-2xl p-6 space-y-5 ${v.borderClass}`} style={{ borderLeftWidth: "4px", borderLeftColor: v.color }}>
          <div className="flex items-center gap-2">
            <v.Icon className="w-4 h-4" style={{ color: v.color }} />
            <span className="text-base font-bold" style={{ color: v.color }}>{t('calculator.' + v.labelKey).replace(/^\P{L}+/u, '').trim()}</span>
            <span className="text-xs text-slate-400 ml-auto">{t('calculator.commission_note')}</span>
          </div>

          <TravelPartnerSelector
            vertical={v.key}
            selectedPartner={selectedPartners[v.key]}
            onSelect={(partner) => handlePartnerSelect(v.key, partner)}
            t={t}
          />

          {/* Bookings slider → DutyCredits derived */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{t('calculator.bookings_x2_note_prefix')} / {t('calculator.month_label')}</p>
                <input
                 type="text"
                 inputMode="numeric"
                 value={bookingsInput[v.key]}
                 onChange={(e) => {
                   const digits = e.target.value.replace(/[^\d]/g, "");
                   if (digits === "") { setBookingsInput((bi) => ({ ...bi, [v.key]: "" })); setBookingsError((be) => ({ ...be, [v.key]: t('calculator.error_min_bookings') })); return; }
                   const n = parseInt(digits, 10);
                   setBookingsInput((bi) => ({ ...bi, [v.key]: fmtNum(n) }));
                   if (n < 500) { setBookingsError((be) => ({ ...be, [v.key]: t('calculator.error_min_bookings') })); } else { setBookingsError((be) => ({ ...be, [v.key]: "" })); const nearest = BOOKING_TIERS.reduce((a, b) => Math.abs(b - n) < Math.abs(a - n) ? b : a); setBookings((bk) => ({ ...bk, [v.key]: nearest })); }
                 }}
                 onBlur={() => {
                   const digits = (bookingsInput[v.key] || "").replace(/[^\d]/g, "");
                   const n = digits === "" ? 0 : parseInt(digits, 10);
                   if (n < 500) { setBookings((bk) => ({ ...bk, [v.key]: 500 })); setBookingsInput((bi) => ({ ...bi, [v.key]: fmtNum(500) })); setBookingsError((be) => ({ ...be, [v.key]: "" })); }
                 }}
                 style={{ width: `${Math.max(3, String(bookingsInput[v.key]).length)}ch` }}
                  className={`text-3xl font-bold text-slate-900 bg-transparent border-b-2 outline-none min-w-[3ch] max-w-full ${bookingsError[v.key] ? "border-red-400" : "border-slate-300 focus:border-primary"}`}
                />
                {bookingsError[v.key] && <p className="text-xs text-red-500 mt-1 font-medium">{bookingsError[v.key]}</p>}
                <p className="text-xs text-slate-400 mt-1">{t('calculator.error_min_bookings')}</p>
                </div>
              <div className="text-right text-sm text-slate-500">
                <span>{t('calculator.dutycredits_issued_month')}</span>
                <p className="text-base font-bold" style={{ color: v.color }}>{fmtNum(bookings[v.key] * v.creditsPerBooking)}</p>
                {v.creditsPerBooking === 2 && (
                  <p className="text-xs font-semibold mt-0.5" style={{ color: v.color }}>{t('calculator.two_x_per_booking')}</p>
                )}
              </div>
            </div>
            {v.creditsPerBooking === 2 && (
              <p className="text-xs text-slate-400 italic">
                {fmtNum(bookings[v.key])} {t('calculator.bookings_x2_note_prefix')} × 2 = {fmtNum(bookings[v.key] * 2)} DutyCredits ({t('calculator.bookings_x2_note_at_booking')} + {v.key === 'flight' ? t('calculator.bookings_x2_note_return_reminder') : v.key === 'accommodation' ? t('calculator.bookings_x2_note_checkout') : t('calculator.bookings_x2_note_car_return')})
              </p>
            )}
            <Slider min={0} max={BOOKING_TIERS.length - 1} step={1} value={[Math.max(0, BOOKING_TIERS.findIndex((val) => val === bookings[v.key]))]} onValueChange={([i]) => { setBookings((b) => ({ ...b, [v.key]: BOOKING_TIERS[i] })); setBookingsInput((bi) => ({ ...bi, [v.key]: fmtNum(BOOKING_TIERS[i]) })); setBookingsError((be) => ({ ...be, [v.key]: "" })); }} className="w-full" />
          </div>

          {/* Conversion rate slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{t('calculator.redemption_rate')}</p>
                <p className="text-3xl font-bold text-slate-900">{conversion[v.key]}%</p>
              </div>
              <span className="text-slate-500 text-sm">{t('calculator.travelers_redeem')}</span>
            </div>
            <Slider min={1} max={50} step={1} value={[conversion[v.key]]} onValueChange={([val]) => setConversion((c) => ({ ...c, [v.key]: val }))} className="w-full" />
            <p className="text-xs text-slate-500 flex items-center gap-1"><Info className="w-3 h-3" /> {t('calculator.industry_avg')}</p>
          </div>

          {/* Avg basket — static */}
          <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('calculator.avg_basket')}: <span className="text-slate-900 font-bold text-base normal-case">€100 🟡 Standard DutyCredit</span></p>
              <p className="text-xs text-slate-500 leading-relaxed">{t('calculator.avg_basket_fixed')}</p>
            </div>
          </div>

          {/* Per-vertical mini result */}
          {(() => {
            const stat = verticalStats.find((s) => s.key === v.key);
            if (!stat) return null;
            return (
              <div className={`grid grid-cols-3 gap-2 pt-2 border-t ${v.borderClass}`}>
                <div className={`rounded-xl p-3 text-center ${v.bgLightClass}`}>
                  <p className="text-xs text-slate-500 mb-0.5 leading-tight">{t('calculator.potential_redemptions_mo')}</p>
                  <p className="text-base font-bold text-slate-900">{fmtNum(stat.redemptions)}</p>
                </div>
                <div className={`rounded-xl p-3 text-center ${v.bgLightClass}`}>
                  <p className="text-xs text-slate-500 mb-0.5 leading-tight">{t('calculator.potential_commission_tx')}</p>
                  <p className="text-base font-bold" style={{ color: v.color }}>{fmtEur(stat.commPerTx, 2)}</p>
                </div>
                <div className="rounded-xl p-3 text-center" style={{ background: v.color }}>
                  <p className="text-xs text-white/80 mb-0.5 leading-tight">{t('calculator.potential_earned_mo')}</p>
                  <p className="text-base font-bold text-white">{fmtEur(stat.monthlyComm, 2)}</p>
                </div>
              </div>
            );
          })()}
        </div>
      ))}

      {/* Combined totals */}
      {activeVerticals.length >= 1 && (
        <div className="bg-slate-900 rounded-2xl p-6 space-y-4">
          <h3 className="font-bold text-white text-lg">
            {activeVerticals.length === 1
              ? `${t('calculator.' + activeVerticals[0].labelKey).replace(/^\P{L}+/u, '').trim()} — ${t('calculator.monthly_net')}`
              : t('calculator.combined_monthly_revenue')}
          </h3>
          <p className="text-xs text-slate-400 -mt-2">{t('calculator.potential_disclaimer')}</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
           <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2 overflow-hidden">
             <div className="flex items-center gap-2 sm:flex-col sm:items-center min-w-0">
               <Users className="w-4 h-4 text-slate-300 shrink-0" />
               <p className="text-xs text-slate-400">{t('calculator.potential_redemptions_mo')}</p>
             </div>
             <p className={`${numFontClass(fmtNum(totals.redemptions))} font-bold text-white break-all`}>{fmtNum(totals.redemptions)}</p>
           </div>
           <div className="bg-emerald-700 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2 overflow-hidden">
             <div className="flex items-center gap-2 sm:flex-col sm:items-center min-w-0">
               <TrendingUp className="w-4 h-4 text-emerald-200 shrink-0" />
               <p className="text-xs text-emerald-200">{t('calculator.potential_commission_mo')}</p>
             </div>
             <p className={`${numFontClass(fmtEur(totals.monthlyComm, 2))} font-bold text-white break-all`}>{fmtEur(totals.monthlyComm, 2)}</p>
             </div>
             <div className="bg-emerald-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2 overflow-hidden">
             <div className="flex items-center gap-2 sm:flex-col sm:items-center min-w-0">
               <TrendingUp className="w-4 h-4 text-emerald-100 shrink-0" />
               <p className="text-xs text-emerald-100">{t('calculator.potential_commission_yr')}</p>
             </div>
             <p className={`${numFontClass(fmtEur(totals.monthlyComm * 12, 2))} font-bold text-white break-all`}>{fmtEur(totals.monthlyComm * 12, 2)}</p>
           </div>
          </div>
          <div className="grid gap-2">
            {verticalStats.map((stat) => {
              const v = VERTICALS_CONFIG.find((vc) => vc.key === stat.key);
              return (
                <div key={stat.key} className="bg-slate-800 rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-sm font-semibold flex items-center gap-1.5" style={{ color: v.color }}><v.Icon className="w-3.5 h-3.5" />{t('calculator.' + v.labelKey).replace(/^\P{L}+/u, '').trim()}</span>
                    <span className="text-xs text-slate-400 block">{fmtNum(stat.dutyCredits)} DutyCredits × {stat.c}% = {fmtNum(stat.redemptions)} {t('calculator.redemptions_label')}</span>
                  </div>
                  <span className={`${numFontClass(fmtEur(stat.monthlyComm, 2))} font-bold text-white shrink-0 break-all text-right`}>{fmtEur(stat.monthlyComm, 2)}/{t('calculator.mo_label')}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info note */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-800 leading-relaxed">
          {t('calculator.partner_commission_info')}
        </p>
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
            <DutyBoostLogo height={55} />
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