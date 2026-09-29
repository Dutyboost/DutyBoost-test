import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { TrendingUp, Users, Info, Check, MessageCircle } from "lucide-react";
import { fmtNum, fmtEur } from "@/utils/formatNumber";
import TravelAgencyIcon from "@/components/TravelAgencyIcon";
import HotelIcon from "@/components/HotelIcon";
import CarRentalIcon from "@/components/CarRentalIcon";
import ConversionRateInput from "@/components/calculator/ConversionRateInput";

// ── Corporate Travel Partner calculator ────────────────────────────────────────
// Same model and look & feel as the Travel Partner calculator (RetailerCalculator.jsx
// → TravelPartnerTab): verticals, DutyCredits issued, redemption rate, commission
// capped per transaction and a combined totals panel. The difference is the audience —
// corporate travel PLATFORMS, whose input is their own monthly booking volume.
//
// Platform Fee = 2.5% of basket. Corporate Travel Partner = 0.5% of basket (capped €5/tx).
const AGENCY_COMMISSION_PCT = 0.005;
const AGENCY_COMMISSION_CAP = 5;
const CREDITS_PER_BOOKING = 2;   // issued at booking + pre-departure reminder
const FIXED_AVG_BASKET = 60;     // blended: midpoint between €20 minimum and €100 global average

const VERTICALS_CONFIG = [
  {
    key: "flight",
    labelKey: "vertical_flight",
    Icon: TravelAgencyIcon,
    color: "#1A6BFF",
    bgLightClass: "bg-blue-50",
    borderClass: "border-blue-200",
    activeClass: "bg-blue-600 text-white border-blue-600",
    inactiveClass: "bg-white text-slate-600 border-slate-300",
    defaultBookings: 50000,
    max: 2000000,
    step: 5000,
  },
  {
    key: "accommodation",
    labelKey: "vertical_accommodation",
    Icon: HotelIcon,
    color: "#8b5cf6",
    bgLightClass: "bg-violet-50",
    borderClass: "border-violet-200",
    activeClass: "bg-violet-600 text-white border-violet-600",
    inactiveClass: "bg-white text-slate-600 border-slate-300",
    defaultBookings: 20000,
    max: 1000000,
    step: 5000,
  },
  {
    key: "car",
    labelKey: "vertical_car",
    Icon: CarRentalIcon,
    color: "#FF8000",
    bgLightClass: "bg-orange-50",
    borderClass: "border-orange-200",
    activeClass: "bg-orange-500 text-white border-orange-500",
    inactiveClass: "bg-white text-slate-600 border-slate-300",
    defaultBookings: 10000,
    max: 500000,
    step: 2500,
  },
];

const DEFAULT_CONVERSION = 25; // % of issued DutyCredits redeemed

function numFontClass(str) {
  const len = String(str).length;
  if (len <= 8) return "text-2xl";
  if (len <= 11) return "text-xl";
  if (len <= 14) return "text-lg";
  return "text-base";
}

export default function CorporateTravelPartnerTab({ t }) {
  const [selected, setSelected] = useState({ flight: true, accommodation: false, car: false });
  const [bookings, setBookings] = useState(() => ({
    flight: VERTICALS_CONFIG[0].defaultBookings,
    accommodation: VERTICALS_CONFIG[1].defaultBookings,
    car: VERTICALS_CONFIG[2].defaultBookings,
  }));
  const [conversion, setConversion] = useState(() => ({
    flight: DEFAULT_CONVERSION,
    accommodation: DEFAULT_CONVERSION,
    car: DEFAULT_CONVERSION,
  }));

  const activeVerticals = VERTICALS_CONFIG.filter((v) => selected[v.key]);

  const toggleVertical = (key) => setSelected((prev) => ({ ...prev, [key]: !prev[key] }));
  const setBookingVolume = (key, raw) => {
    const digits = String(raw).replace(/[^\d]/g, "");
    setBookings((prev) => ({ ...prev, [key]: digits === "" ? 0 : Number(digits) }));
  };

  const verticalStats = useMemo(
    () =>
      VERTICALS_CONFIG.map((v) => {
        if (!selected[v.key]) return null;
        const monthlyBookings = bookings[v.key];
        const dutyCredits = monthlyBookings * CREDITS_PER_BOOKING;
        const c = conversion[v.key];
        const redemptions = Math.round(dutyCredits * (c / 100));
        const commPerTx = Math.min(
          Math.round(FIXED_AVG_BASKET * AGENCY_COMMISSION_PCT * 100) / 100,
          AGENCY_COMMISSION_CAP
        );
        const monthlyComm = Math.round(redemptions * commPerTx * 100) / 100;
        return { key: v.key, redemptions, commPerTx, monthlyComm, monthlyBookings, dutyCredits, c };
      }).filter(Boolean),
    [selected, bookings, conversion]
  );

  const totals = useMemo(
    () => ({
      redemptions: verticalStats.reduce((s, v) => s + v.redemptions, 0),
      monthlyComm: verticalStats.reduce((s, v) => s + v.monthlyComm, 0),
    }),
    [verticalStats]
  );

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-slate-900">{t("corporate.calculator.tabTitle")}</h2>
        <p
          className="text-slate-600 text-sm max-w-xl mx-auto"
          dangerouslySetInnerHTML={{ __html: t("corporate.calculator.tabSubtitle") }}
        />
      </div>

      {/* Vertical selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t("calculator.select_verticals")}</p>
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
                {t("calculator." + v.labelKey).replace(/^\P{L}+/u, "").trim()}
                {isOn && <Check className="w-4 h-4 ml-0.5" />}
              </button>
            );
          })}
        </div>
        <p className="text-xs text-slate-400">{t("calculator.select_verticals_hint")}</p>
      </div>

      {/* Per-vertical inputs and results */}
      {activeVerticals.map((v) => (
        <div
          key={v.key}
          className={`bg-white border rounded-2xl p-6 space-y-5 ${v.borderClass}`}
          style={{ borderLeftWidth: "4px", borderLeftColor: v.color }}
        >
          <div className="flex items-center gap-2">
            <v.Icon className="w-4 h-4" style={{ color: v.color }} />
            <span className="text-base font-bold" style={{ color: v.color }}>
              {t("calculator." + v.labelKey).replace(/^\P{L}+/u, "").trim()}
            </span>
            <span className="text-xs text-slate-400 ml-auto">{t("calculator.commission_note")}</span>
          </div>

          {/* Bookings per month */}
          <div className="space-y-2">
            <div className="flex justify-between items-end gap-3">
              <div className="min-w-0">
                <p className="text-xs text-slate-500 uppercase tracking-widest mb-0.5">
                  {t("corporate.calculator.bookingsLabel")}
                </p>
                <p className="text-3xl font-bold text-slate-900">{fmtNum(bookings[v.key])}</p>
                <p className="text-xs text-slate-400 mt-1">{t("corporate.calculator.bookingsHint")}</p>
              </div>
              <div className="text-right text-sm text-slate-500 shrink-0">
                <span>{t("calculator.dutycredits_issued_month")}</span>
                <p className="text-base font-bold" style={{ color: v.color }}>
                  {fmtNum(bookings[v.key] * CREDITS_PER_BOOKING)}
                </p>
                <p className="text-xs font-semibold mt-0.5" style={{ color: v.color }}>
                  {t("calculator.two_x_per_booking")}
                </p>
              </div>
            </div>
            <Input
              type="number"
              min={0}
              value={bookings[v.key]}
              onChange={(e) => setBookingVolume(v.key, e.target.value)}
              className="w-full text-right"
              aria-label={t("corporate.calculator.bookingsLabel")}
            />
            <Slider
              min={0}
              max={v.max}
              step={v.step}
              value={[Math.min(bookings[v.key], v.max)]}
              onValueChange={([val]) => setBookings((prev) => ({ ...prev, [v.key]: val }))}
              aria-label={t("corporate.calculator.bookingsLabel")}
              className="w-full"
            />
            <p className="text-xs text-slate-400 italic">
              {fmtNum(bookings[v.key])} {t("calculator.bookings_x2_note_prefix")} × 2 ={" "}
              {fmtNum(bookings[v.key] * 2)} DutyCredits ({t("calculator.bookings_x2_note_at_booking")} +{" "}
              {v.key === "flight"
                ? t("calculator.bookings_x2_note_return_reminder")
                : v.key === "accommodation"
                  ? t("calculator.bookings_x2_note_checkout")
                  : t("calculator.bookings_x2_note_car_return")}
              )
            </p>
          </div>

          {/* Redemption rate */}
          <div className="space-y-3 pt-1">
            <div className="flex justify-between items-center gap-3 mb-3">
              <div className="space-y-1.5">
                <p className="text-xs text-slate-500 uppercase tracking-widest">{t("calculator.redemption_rate")}</p>
                <ConversionRateInput
                  value={conversion[v.key]}
                  min={0.01}
                  max={100}
                  step={0.01}
                  onChange={(val) => setConversion((c) => ({ ...c, [v.key]: val }))}
                />
              </div>
              <span className="text-slate-500 text-sm text-right">{t("calculator.travelers_redeem")}</span>
            </div>
            <Slider
              min={0.01}
              max={100}
              step={0.01}
              value={[conversion[v.key]]}
              onValueChange={([val]) => setConversion((c) => ({ ...c, [v.key]: val }))}
              aria-label={t("calculator.redemption_rate")}
              className="w-full"
            />
            <p className="text-xs text-slate-500 flex items-center gap-1">
              <Info className="w-3 h-3" /> {t("calculator.industry_avg")}
            </p>
          </div>

          {/* Blended basket */}
          <div className="flex items-start gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
            <Info className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">
                {t("calculator.avg_basket")}:{" "}
                <span className="text-slate-900 font-bold text-base normal-case">€60 🟡 Blended average spend</span>
              </p>
              <p className="text-xs text-slate-500 leading-relaxed">{t("calculator.avg_basket_fixed")}</p>
            </div>
          </div>

          {/* Per-vertical result */}
          {(() => {
            const stat = verticalStats.find((s) => s.key === v.key);
            if (!stat) return null;
            return (
              <div className={`pt-2 border-t ${v.borderClass} space-y-2`}>
                <p className="text-xs text-slate-500 font-medium">{t("calculator.row_blended_label")}</p>
                <div className="grid grid-cols-3 gap-2">
                  <div className={`rounded-xl p-3 text-center ${v.bgLightClass}`}>
                    <p className="text-xs text-slate-500 mb-0.5 leading-tight">{t("calculator.potential_redemptions_mo")}</p>
                    <p className="text-base font-bold text-slate-900">{fmtNum(stat.redemptions)}</p>
                  </div>
                  <div className={`rounded-xl p-3 text-center ${v.bgLightClass}`}>
                    <p className="text-xs text-slate-500 mb-0.5 leading-tight">{t("calculator.potential_commission_tx")}</p>
                    <p className="text-base font-bold" style={{ color: v.color }}>
                      {fmtEur(stat.commPerTx, 2)}
                    </p>
                  </div>
                  <div className="rounded-xl p-3 text-center" style={{ background: v.color }}>
                    <p className="text-xs text-white/80 mb-0.5 leading-tight">{t("calculator.potential_earned_mo")}</p>
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
              ? `${t("calculator." + activeVerticals[0].labelKey).replace(/^\P{L}+/u, "").trim()} — ${t("calculator.monthly_net")}`
              : t("calculator.combined_monthly_revenue")}
          </h3>
          <p className="text-xs text-slate-400 -mt-2">{t("calculator.potential_disclaimer")}</p>
          <div className="text-xs text-slate-300 leading-relaxed border-t border-slate-700 pt-2">
            {t("calculator.avg_basket_disclaimer")}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="bg-slate-800 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2 overflow-hidden">
              <div className="flex items-center gap-2 sm:flex-col sm:items-center min-w-0">
                <Users className="w-4 h-4 text-slate-300 shrink-0" />
                <p className="text-xs text-slate-400">{t("calculator.potential_redemptions_mo")}</p>
              </div>
              <p className={`${numFontClass(fmtNum(totals.redemptions))} font-bold text-white break-all`}>
                {fmtNum(totals.redemptions)}
              </p>
            </div>
            <div className="bg-emerald-700 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2 overflow-hidden">
              <div className="flex items-center gap-2 sm:flex-col sm:items-center min-w-0">
                <TrendingUp className="w-4 h-4 text-emerald-200 shrink-0" />
                <p className="text-xs text-emerald-200">{t("calculator.potential_commission_mo")}</p>
              </div>
              <p className={`${numFontClass(fmtEur(totals.monthlyComm, 2))} font-bold text-white break-all`}>
                {fmtEur(totals.monthlyComm, 2)}
              </p>
            </div>
            <div className="bg-emerald-600 rounded-xl p-4 flex sm:flex-col items-center sm:justify-center justify-between gap-2 overflow-hidden">
              <div className="flex items-center gap-2 sm:flex-col sm:items-center min-w-0">
                <TrendingUp className="w-4 h-4 text-emerald-100 shrink-0" />
                <p className="text-xs text-emerald-100">{t("calculator.potential_commission_yr")}</p>
              </div>
              <p className={`${numFontClass(fmtEur(totals.monthlyComm * 12, 2))} font-bold text-white break-all`}>
                {fmtEur(totals.monthlyComm * 12, 2)}
              </p>
            </div>
          </div>
          <div className="grid gap-2">
            {verticalStats.map((stat) => {
              const v = VERTICALS_CONFIG.find((vc) => vc.key === stat.key);
              return (
                <div key={stat.key} className="bg-slate-800 rounded-xl px-4 py-3 flex items-center justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-sm font-semibold flex items-center gap-1.5" style={{ color: v.color }}>
                      <v.Icon className="w-3.5 h-3.5" />
                      {t("calculator." + v.labelKey).replace(/^\P{L}+/u, "").trim()}
                    </span>
                    <span className="text-xs text-slate-400 block">
                      {fmtNum(stat.dutyCredits)} DutyCredits × {stat.c}% = {fmtNum(stat.redemptions)}{" "}
                      {t("calculator.redemptions_label")}
                    </span>
                  </div>
                  <span className={`${numFontClass(fmtEur(stat.monthlyComm, 2))} font-bold text-white shrink-0 break-all text-right`}>
                    {fmtEur(stat.monthlyComm, 2)}/{t("calculator.mo_label")}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Info note */}
      <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3">
        <Info className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
        <p className="text-sm text-blue-800 leading-relaxed">{t("calculator.partner_commission_info")}</p>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h3 className="font-bold text-white text-lg">{t("corporate.calculator.ctaTitle")}</h3>
          <p className="text-green-50 text-sm mt-0.5">{t("corporate.calculator.ctaDesc")}</p>
        </div>
        <Link
          to="/corporate-partner-request"
          className="inline-flex items-center gap-2 bg-white text-green-600 font-bold px-6 py-3 rounded-xl hover:bg-green-50 transition-colors shrink-0"
        >
          <MessageCircle className="w-5 h-5" />
          {t("corporate.calculator.ctaButton")}
        </Link>
      </div>
    </div>
  );
}