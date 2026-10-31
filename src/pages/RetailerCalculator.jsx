import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShoppingBag, Percent, Euro, Info, Users, Check, MessageCircle } from "lucide-react";
import { fmtNum, fmtEur } from "../utils/formatNumber";
import DutyBoostLogo from "../components/DutyBoostLogo";
import PageFooter from "../components/PageFooter";
import LanguageSwitcher from "../components/LanguageSwitcher";
import TravelAgencyIcon from "../components/TravelAgencyIcon";
import HotelIcon from "../components/HotelIcon";
import CarRentalIcon from "../components/CarRentalIcon";
import TrainIcon from "../components/TrainIcon";
import CoachOnRoadIcon from "../components/CoachOnRoadIcon";
import SliderInput from "../components/SliderInput";
import TravelPartnerSelector from "../components/TravelPartnerSelector";
import ConversionRateInput from "../components/calculator/ConversionRateInput";
import CompanySearch from "../components/CompanySearch";
import CompanyNetworkView from "../components/CompanyNetworkView";
import { GLOBAL_AIRPORTS } from "../data/globalAirports";
import { computeCompanyTotals } from "../utils/retailerCalc";
import EnterpriseCalculator from "../components/calculator/EnterpriseCalculator";
import CruiseCalculatorBody from "../components/cruise-calculator/CruiseCalculatorBody";
import { CurrencyProvider } from "../components/calculator/CurrencyContext";
import CurrencySwitcher from "../components/calculator/CurrencySwitcher";
import RetailChannelTabs from "../components/calculator/RetailChannelTabs";
import { getCruiseCalculatorStrings } from "../lib/i18nCruiseCalculator";

// ── Responsive font size for large numbers ─────────────────────────────────────
function numFontClass(str) {
  const len = String(str).length;
  if (len <= 8)  return "text-2xl";
  if (len <= 11) return "text-xl";
  if (len <= 14) return "text-lg";
  return "text-base";
}

// ── Shared discount logic ──────────────────────────────────────────────────────
// Progressive percentage discount — scales from 5% at €20 to 20% at €300+
const DISCOUNT_BREAKPOINTS = [
  { spend: 20,  pct: 0.05 },   { spend: 50,  pct: 0.075 },
  { spend: 100, pct: 0.10 },   { spend: 150, pct: 0.125 },
  { spend: 200, pct: 0.15 },   { spend: 250, pct: 0.175 },
  { spend: 300, pct: 0.20 },
];
function calcSaving(spend) {
  if (!spend || spend < 20) return 0;
  if (spend >= 300) return Math.round(spend * 0.20 * 100) / 100;
  let lower = DISCOUNT_BREAKPOINTS[0], upper = DISCOUNT_BREAKPOINTS[DISCOUNT_BREAKPOINTS.length - 1];
  for (let i = 0; i < DISCOUNT_BREAKPOINTS.length - 1; i++) {
    if (spend >= DISCOUNT_BREAKPOINTS[i].spend && spend < DISCOUNT_BREAKPOINTS[i + 1].spend) {
      lower = DISCOUNT_BREAKPOINTS[i]; upper = DISCOUNT_BREAKPOINTS[i + 1]; break;
    }
  }
  const t = (spend - lower.spend) / (upper.spend - lower.spend);
  const pct = lower.pct + t * (upper.pct - lower.pct);
  return Math.round(spend * pct * 100) / 100;
}

function getTier(spend) {
  if (!spend || spend < 20) return null;
  if (spend >= 300) return { name: "VIP DutyCredit",     emoji: "🟣", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", bar: "bg-purple-400" };
  if (spend >= 250) return { name: "Premium DutyCredit", emoji: "💎", color: "text-pink-400",   bg: "bg-pink-500/10 border-pink-500/30",   bar: "bg-pink-400" };
  if (spend >= 200) return { name: "Lounge DutyCredit",  emoji: "🟢", color: "text-green-400",  bg: "bg-green-500/10 border-green-500/30",  bar: "bg-green-400" };
  if (spend >= 150) return { name: "Plus DutyCredit",    emoji: "🔵", color: "text-blue-400",   bg: "bg-blue-500/10 border-blue-500/30",    bar: "bg-blue-400" };
  if (spend >= 100) return { name: "Standard DutyCredit",emoji: "🟡", color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30", bar: "bg-yellow-400" };
  if (spend >= 50)  return { name: "Boarding DutyCredit",emoji: "⚪", color: "text-slate-400",  bg: "bg-slate-500/10 border-slate-500/30",  bar: "bg-slate-400" };
  return               { name: "Entry DutyCredit",    emoji: "🟤", color: "text-amber-600",  bg: "bg-amber-500/10 border-amber-500/30",  bar: "bg-amber-400" };
}

// Platform Fee = 2.5% of basket. Travel Partner = 0.5% of basket (capped at €5/tx).
const PLATFORM_FEE_PCT = 0.025;      // 2.5% of basket
const PLATFORM_FEE_CAP = 25;         // €25 max per transaction
const AGENCY_COMMISSION_PCT = 0.005; // 0.5% of basket
const AGENCY_COMMISSION_CAP = 5;     // €5 max per transaction

const TIER_BANDS = [
  { label: "Entry",    min: 20,  max: 49,  saving: 2.50,  color: "bg-amber-400",  textColor: "text-amber-600" },
  { label: "Boarding", min: 50,  max: 99,  saving: 5.00,  color: "bg-slate-400",  textColor: "text-slate-500" },
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
    defaultConversion: 3,
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
    defaultConversion: 3,
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
    defaultConversion: 3,
    defaultBasket: 170,
    creditsPerBooking: 2, // booking + car return
  },
  {
    key: "train",
    labelKey: "vertical_train",
    Icon: TrainIcon,
    color: "#6366F1",
    bgClass: "bg-indigo-600",
    bgLightClass: "bg-indigo-50",
    borderClass: "border-indigo-200",
    textClass: "text-indigo-700",
    activeClass: "bg-indigo-600 text-white border-indigo-600",
    inactiveClass: "bg-white text-slate-600 border-slate-300",
    commissionNote: "0.5% of basket spend (max €5/tx)",
    defaultBookings: 20000,
    defaultConversion: 3,
    defaultBasket: 60,
    creditsPerBooking: 1,
  },
  {
    key: "coach",
    labelKey: "vertical_coach",
    Icon: CoachOnRoadIcon,
    color: "#F59E0B",
    bgClass: "bg-amber-500",
    bgLightClass: "bg-amber-50",
    borderClass: "border-amber-200",
    textClass: "text-amber-700",
    activeClass: "bg-amber-500 text-white border-amber-500",
    inactiveClass: "bg-white text-slate-600 border-slate-300",
    commissionNote: "0.5% of basket spend (max €5/tx)",
    defaultBookings: 5000,
    defaultConversion: 3,
    defaultBasket: 60,
    creditsPerBooking: 1,
  },
];

// Every vertical gets its own state slot, so a locked (single-vertical) partner
// calculator keeps working when new travel verticals are added.
const VERTICAL_KEYS = VERTICALS_CONFIG.map((v) => v.key);
const filledMap = (val) => VERTICAL_KEYS.reduce((acc, k) => ({ ...acc, [k]: val }), {});

// ── Travel Partner tab ────────────────────────────────────────────────────────
export function TravelPartnerTab({ t, vertical }) {
  // A partner that only operates one vertical (flight, accommodation or car
  // rental) gets that vertical alone: preselected, with no vertical selector.
  const locked = vertical || null;
  const initialBookings = locked
    ? {
        ...filledMap(0),
        [locked]: VERTICALS_CONFIG.find((v) => v.key === locked)?.defaultBookings ?? 0,
      }
    : { ...filledMap(0), flight: 10000 };

  const [selected, setSelected] = useState(
    locked ? { ...filledMap(false), [locked]: true } : filledMap(false)
  );
  const [bookings, setBookings] = useState(initialBookings);
  const [bookingsInput, setBookingsInput] = useState(
    VERTICAL_KEYS.reduce((acc, k) => ({ ...acc, [k]: fmtNum(initialBookings[k]) }), {})
  );
  const [bookingsError, setBookingsError] = useState(filledMap(""));
  const [selectedPartners, setSelectedPartners] = useState(filledMap(null));
  const [conversion, setConversion] = useState(filledMap(0.01));
  const FIXED_AVG_BASKET = 60; // blended: midpoint between €20 minimum and €100 global average
  const avgBasket = useMemo(() => filledMap(FIXED_AVG_BASKET), []);

  const activeVerticals = VERTICALS_CONFIG.filter((v) => selected[v.key]);

  const toggleVertical = (key) => {
    setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
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

      {/* Vertical selector — a single-vertical partner goes straight to its calculator */}
      {!locked && (
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
      )}

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

          {/* Bookings/month → DutyCredits derived (read-only, fixed from partner data) */}
          <div className="space-y-2">
            <div className="flex justify-between items-end">
              <div>
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">{t('calculator.bookings_x2_note_prefix')} / {t('calculator.month_label')}</p>
                <p className="text-3xl font-bold text-slate-900">{fmtNum(bookings[v.key])}</p>
                <p className="text-xs text-slate-400 mt-1">{t('calculator.bookings_fixed_note')}</p>
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
           </div>

          {/* Conversion rate slider */}
          <div className="space-y-3 pt-1">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="space-y-1.5">
                <p className="text-xs text-slate-500 uppercase tracking-widest">{t('calculator.redemption_rate')}</p>
                <ConversionRateInput
                  value={conversion[v.key]}
                  min={0.01}
                  max={50}
                  step={0.01}
                  onChange={(val) => setConversion((c) => ({ ...c, [v.key]: val }))}
                />
              </div>
              <span className="text-slate-500 text-sm text-right">{t('calculator.travelers_redeem')}</span>
            </div>
            <Slider min={0.01} max={50} step={0.01} value={[conversion[v.key]]} onValueChange={([val]) => setConversion((c) => ({ ...c, [v.key]: val }))} aria-label={t('calculator.redemption_rate')} className="w-full" />
            <p className="text-xs text-slate-500 flex items-center gap-1"><Info className="w-3 h-3" /> {t('calculator.industry_avg')}</p>
          </div>

          {/* Avg basket — blended */}
          <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('calculator.avg_basket')}: <span className="text-slate-900 font-bold text-base normal-case">€60 🟡 Blended average spend</span></p>
              <p className="text-xs text-slate-500 leading-relaxed">{t('calculator.avg_basket_fixed')}</p>
            </div>
          </div>

          {/* Per-vertical mini result — blended average (€60) */}
          {(() => {
            const stat = verticalStats.find((s) => s.key === v.key);
            if (!stat) return null;
            return (
              <div className={`pt-2 border-t ${v.borderClass} space-y-2`}>
                <p className="text-xs text-slate-500 font-medium">{t('calculator.row_blended_label')}</p>
                <div className="grid grid-cols-3 gap-2">
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
          <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-700 pt-2">
            {t('calculator.avg_basket_disclaimer')}
          </div>
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

      {/* Request more information CTA */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-white text-lg">{t('common.request_more_info')}</h3>
          <p className="text-green-50 text-sm mt-0.5">{t('calculator.partner_cta_desc')}</p>
        </div>
        <Link
          to="/travel-retailers-request"
          className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shrink-0"
        >
          <MessageCircle className="w-5 h-5" />
          {t('common.request_more_info')}
        </Link>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
// One calculator per retail channel: an airport retailer models its airport
// network, a sea port retailer the terminals it trades in, a cruise line its
// fleet, and a motorway or railway retailer the footfall passing its sites.
const CHANNEL_THEMES = {
  seaport: "orange",
  cruise: "teal",
  motorway: "green",
  rail: "purple",
};

export default function RetailerCalculator() {
  const { t, i18n } = useTranslation();
  const [channel, setChannel] = useState("airport");
  const channels = getCruiseCalculatorStrings(i18n.language).channels;

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 px-4 py-10">
      <CurrencyProvider>
      <div className="max-w-6xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <div className="grid grid-cols-3 items-center mb-2">
            <div />
            <div className="justify-self-center">
              <DutyBoostLogo height={55} />
            </div>
            <div className="flex justify-end gap-2 justify-self-end">
              <CurrencySwitcher />
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

        {/* Retail channel — all five side by side */}
        <RetailChannelTabs
          value={channel}
          onChange={setChannel}
          labels={channels.labels}
          hint={channels.hint}
        />

        {channel === "airport" ? (
          <EnterpriseCalculator />
        ) : (
          <CruiseCalculatorBody
            key={channel}
            theme={CHANNEL_THEMES[channel]}
            variant={channel}
            prefillByCountry={channel === "seaport"}
            ctaTo="/travel-retailers-request"
            showBrandBar={false}
          />
        )}

      </div>
      <PageFooter />
      </CurrencyProvider>
    </main>
  );
}