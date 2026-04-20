import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShoppingBag, Percent, Euro, Info, Users, Store } from "lucide-react";

// ── Shared discount logic ──────────────────────────────────────────────────────
function lerp(value, minVal, maxVal, minOut, maxOut) {
  const t = Math.min(1, Math.max(0, (value - minVal) / (maxVal - minVal)));
  return Math.round((minOut + t * (maxOut - minOut)) * 100) / 100;
}

function calcSaving(spend) {
  if (spend < 70) return 0;
  if (spend >= 300) return 60;
  if (spend >= 200) return lerp(spend, 200, 299, 35, 45);
  if (spend >= 100) return lerp(spend, 100, 199, 15, 30);
  return lerp(spend, 70, 99, 5, 10);
}

function getTier(spend) {
  if (spend < 70) return null;
  if (spend >= 300) return { name: "VIP DutyCredit", emoji: "🟣", color: "text-purple-400", bg: "bg-purple-500/10 border-purple-500/30", bar: "bg-purple-400" };
  if (spend >= 200) return { name: "Lounge DutyCredit", emoji: "🟢", color: "text-green-400", bg: "bg-green-500/10 border-green-500/30", bar: "bg-green-400" };
  if (spend >= 100) return { name: "Priority DutyCredit", emoji: "🔵", color: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/30", bar: "bg-blue-400" };
  return { name: "Boarding DutyCredit", emoji: "🟡", color: "text-yellow-400", bg: "bg-yellow-500/10 border-yellow-500/30", bar: "bg-yellow-400" };
}

// Travel Partner: earns a commission from DutyBoost on each redemption
// Commission = 0.5% of basket (paid by DutyBoost out of their 2.5% fee)
const AGENCY_COMMISSION_RATE = 0.005; // 0.5% of basket value

const TIER_BANDS = [
  { label: "Boarding", min: 70, max: 99, savMin: 5, savMax: 10, color: "bg-yellow-400", textColor: "text-yellow-400" },
  { label: "Priority", min: 100, max: 199, savMin: 15, savMax: 30, color: "bg-blue-400", textColor: "text-blue-400" },
  { label: "Lounge", min: 200, max: 299, savMin: 35, savMax: 45, color: "bg-green-400", textColor: "text-green-400" },
  { label: "VIP", min: 300, max: 500, savMin: 60, savMax: 60, color: "bg-purple-400", textColor: "text-purple-400" },
];

// ── Retailer tab ───────────────────────────────────────────────────────────────
function RetailerTab() {
  const [spend, setSpend] = useState(150);

  const saving = useMemo(() => calcSaving(spend), [spend]);
  const commission = useMemo(() => Math.round(spend * 0.025 * 100) / 100, [spend]);
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
        <h2 className="text-xl font-bold text-white">What does a DutyBoost traveler cost you?</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Drag the slider to any basket size. See your net revenue on a sale that likely wouldn't have happened without DutyBoost.
        </p>
      </div>

      {/* Slider Card */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-widest mb-1">Basket Spend</p>
            <p className="text-5xl font-bold text-white">€{spend}</p>
          </div>
          {tier ? (
            <div className={`px-4 py-2 rounded-xl border text-sm font-semibold ${tier.bg} ${tier.color}`}>
              {tier.emoji} {tier.name}
            </div>
          ) : (
            <div className="px-4 py-2 rounded-xl border border-slate-600 text-slate-500 text-sm">Below minimum (€70)</div>
          )}
        </div>
        <div className="space-y-2">
          <Slider min={0} max={500} step={1} value={[spend]} onValueChange={([v]) => setSpend(v)} className="w-full" />
          <div className="flex justify-between text-xs text-slate-500">
            <span>€0</span>
            <span className="text-slate-400">Min basket: €70</span>
            <span>€500+</span>
          </div>
        </div>
        {tier && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs text-slate-400">
              <span>Progress within {tier.name}</span>
              <span>{Math.round(tierProgress)}%</span>
            </div>
            <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
              <div className={`h-full rounded-full transition-all duration-200 ${tier.bar}`} style={{ width: `${tierProgress}%` }} />
            </div>
          </div>
        )}
      </div>

      {spend >= 70 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
              <ShoppingBag className="w-4 h-4 text-slate-400 mx-auto mb-2" />
              <p className="text-xs text-slate-400 mb-1">Basket Value</p>
              <p className="text-2xl font-bold text-white">€{spend}</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 text-center">
              <Percent className="w-4 h-4 text-red-400 mx-auto mb-2" />
              <p className="text-xs text-red-300 mb-1">Traveler Saving</p>
              <p className="text-2xl font-bold text-red-300">€{saving.toFixed(2)}</p>
              <p className="text-xs text-red-400 mt-0.5">{discountPct}% off</p>
            </div>
            <div className="bg-orange-500/10 border border-orange-500/30 rounded-xl p-4 text-center">
              <Euro className="w-4 h-4 text-orange-400 mx-auto mb-2" />
              <p className="text-xs text-orange-300 mb-1">DutyBoost Fee (2.5%)</p>
              <p className="text-2xl font-bold text-orange-300">€{commission.toFixed(2)}</p>
            </div>
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
              <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-2" />
              <p className="text-xs text-green-300 mb-1">Your Net Revenue</p>
              <p className="text-2xl font-bold text-green-300">€{netRevenue.toFixed(2)}</p>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
            <h3 className="font-bold text-white text-lg">Total acquisition cost</h3>
            <p className="text-slate-400 text-sm">What you give up to bring in a traveler who most likely would have walked past without DutyBoost.</p>
            <div className="space-y-2">
              {[
                { label: "Traveler saving", value: saving, pct: discountPct, barColor: "bg-red-400", textColor: "text-red-300" },
                { label: "DutyBoost fee", value: commission, pct: 2.5, barColor: "bg-orange-400", textColor: "text-orange-300" },
                { label: "Net revenue", value: netRevenue, pct: Math.round((netRevenue / spend) * 1000) / 10, barColor: "bg-green-400", textColor: "text-green-300" },
              ].map(({ label, value, pct, barColor, textColor }) => (
                <div key={label} className="flex items-center gap-3">
                  <div className="w-28 text-xs text-slate-400 shrink-0">{label}</div>
                  <div className="flex-1 h-6 bg-slate-700 rounded-lg overflow-hidden">
                    <div className={`h-full ${barColor} rounded-lg flex items-center justify-end pr-2 transition-all duration-300`} style={{ width: `${Math.min(100, (value / spend) * 100)}%` }}>
                      <span className="text-xs font-bold text-white">€{value.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className={`w-12 text-xs ${textColor} text-right shrink-0`}>{pct}%</div>
                </div>
              ))}
            </div>
            <div className="pt-3 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs text-slate-400">Total cost to acquire this traveler</p>
                <p className="text-2xl font-bold text-white">€{totalCost.toFixed(2)} <span className="text-sm font-normal text-slate-400">/ {Math.round((totalCost / spend) * 1000) / 10}% of basket</span></p>
              </div>
              <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 max-w-xs">
                <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <p className="text-xs text-blue-300 leading-relaxed">Without DutyBoost this traveler's spend was <strong>€0</strong>. Your acquisition cost is <strong>€{totalCost.toFixed(2)}</strong> on a sale of <strong>€{spend}</strong>.</p>
              </div>
            </div>
          </div>

          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-3">
            <h3 className="font-bold text-white text-sm uppercase tracking-widest">All tiers at a glance</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
                    <th className="pb-2 pr-4">Tier</th>
                    <th className="pb-2 pr-4">Spend</th>
                    <th className="pb-2 pr-4">Saving</th>
                    <th className="pb-2 pr-4">DutyBoost fee</th>
                    <th className="pb-2">Net % retained</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-700/50">
                  {TIER_BANDS.map((t) => {
                    const midSpend = t.min === 300 ? 350 : Math.round((t.min + t.max) / 2);
                    const midSaving = calcSaving(midSpend);
                    const midFee = Math.round(midSpend * 0.025 * 100) / 100;
                    const midNet = Math.round(((midSpend - midSaving - midFee) / midSpend) * 1000) / 10;
                    const isActive = tier?.name.startsWith(t.label);
                    return (
                      <tr key={t.label} className={`transition-colors ${isActive ? "bg-white/5" : ""}`}>
                        <td className={`py-2.5 pr-4 font-medium ${t.textColor}`}>{t.label}</td>
                        <td className="py-2.5 pr-4 text-slate-300">€{t.min}–{t.max === 500 ? "€300+" : `€${t.max}`}</td>
                        <td className="py-2.5 pr-4 text-slate-300">€{t.savMin}–€{t.savMax}</td>
                        <td className="py-2.5 pr-4 text-orange-300">€{(t.min * 0.025).toFixed(2)}–€{(t.max * 0.025).toFixed(2)}</td>
                        <td className="py-2.5 text-green-300">~{midNet}%</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-slate-500">Net % retained = (basket − saving − 2.5% fee) ÷ basket. Calculated at midpoint of each tier.</p>
          </div>
        </>
      ) : (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center">
          <p className="text-slate-400">Slide to at least <strong className="text-white">€70</strong> to activate a DutyCredit tier.</p>
        </div>
      )}
    </div>
  );
}

// ── Travel Partner tab ────────────────────────────────────────────────────────
function TravelPartnerTab() {
  const [bookingsPerYear, setBookingsPerYear] = useState(500);
  const [conversionRate, setConversionRate] = useState(20); // %
  const [avgBasket, setAvgBasket] = useState(150);

  const redemptions = useMemo(() => Math.round(bookingsPerYear * (conversionRate / 100)), [bookingsPerYear, conversionRate]);
  const agencyCommissionPerTx = useMemo(() => Math.round(avgBasket * AGENCY_COMMISSION_RATE * 100) / 100, [avgBasket]);
  const annualCommission = useMemo(() => Math.round(redemptions * agencyCommissionPerTx * 100) / 100, [redemptions, agencyCommissionPerTx]);
  const travelerSavingPerTx = useMemo(() => calcSaving(avgBasket), [avgBasket]);
  const totalTravelerSavings = useMemo(() => Math.round(redemptions * travelerSavingPerTx * 100) / 100, [redemptions, travelerSavingPerTx]);
  const tier = useMemo(() => getTier(avgBasket), [avgBasket]);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1">
        <h2 className="text-xl font-bold text-white">How much will you earn as a Travel Partner?</h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          You earn a <strong className="text-green-300">0.5% commission</strong> on every basket your travelers spend at the airport — with zero effort on your end. DutyBoost pays you out of its own fee.
        </p>
      </div>

      {/* Sliders */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6">
        {/* Bookings per year */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Bookings / year you send DutyCredits to</p>
              <p className="text-4xl font-bold text-white">{bookingsPerYear.toLocaleString()}</p>
            </div>
            <span className="text-slate-400 text-sm">travelers</span>
          </div>
          <Slider min={50} max={10000} step={50} value={[bookingsPerYear]} onValueChange={([v]) => setBookingsPerYear(v)} className="w-full" />
          <div className="flex justify-between text-xs text-slate-500"><span>50</span><span>10,000+</span></div>
        </div>

        {/* Conversion rate */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Estimated redemption rate</p>
              <p className="text-4xl font-bold text-white">{conversionRate}%</p>
            </div>
            <span className="text-slate-400 text-sm">of travelers redeem</span>
          </div>
          <Slider min={5} max={50} step={1} value={[conversionRate]} onValueChange={([v]) => setConversionRate(v)} className="w-full" />
          <div className="flex justify-between text-xs text-slate-500"><span>5%</span><span className="text-slate-400">Industry avg: ~15–25%</span><span>50%</span></div>
        </div>

        {/* Avg basket */}
        <div className="space-y-3">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest mb-0.5">Average basket size at airport store</p>
              <p className="text-4xl font-bold text-white">€{avgBasket}</p>
            </div>
            {tier && (
              <div className={`px-3 py-1.5 rounded-xl border text-xs font-semibold ${tier.bg} ${tier.color}`}>
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
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <Users className="w-4 h-4 text-slate-400 mx-auto mb-2" />
          <p className="text-xs text-slate-400 mb-1">Redemptions / year</p>
          <p className="text-2xl font-bold text-white">{redemptions.toLocaleString()}</p>
        </div>
        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 text-center">
          <ShoppingBag className="w-4 h-4 text-blue-400 mx-auto mb-2" />
          <p className="text-xs text-blue-300 mb-1">Commission / tx</p>
          <p className="text-2xl font-bold text-blue-300">€{agencyCommissionPerTx.toFixed(2)}</p>
          <p className="text-xs text-blue-400 mt-0.5">0.5% of basket</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
          <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-2" />
          <p className="text-xs text-green-300 mb-1">Annual commission</p>
          <p className="text-2xl font-bold text-green-300">€{annualCommission.toLocaleString()}</p>
        </div>
        <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
          <Percent className="w-4 h-4 text-purple-400 mx-auto mb-2" />
          <p className="text-xs text-purple-300 mb-1">Traveler savings / year</p>
          <p className="text-2xl font-bold text-purple-300">€{totalTravelerSavings.toLocaleString()}</p>
        </div>
      </div>

      {/* Commission breakdown */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-5">
        <div>
          <h3 className="font-bold text-white text-lg">Your annual revenue stream</h3>
          <p className="text-slate-400 text-sm mt-1">Passive income from your existing bookings — no extra work, no cost to your travelers.</p>
        </div>

        <div className="grid sm:grid-cols-3 gap-4">
          <div className="bg-slate-700/50 rounded-xl p-4 space-y-1">
            <p className="text-xs text-slate-400">You send DutyCredits to</p>
            <p className="text-2xl font-bold text-white">{bookingsPerYear.toLocaleString()} travelers</p>
          </div>
          <div className="bg-slate-700/50 rounded-xl p-4 space-y-1">
            <p className="text-xs text-slate-400">At {conversionRate}% redemption</p>
            <p className="text-2xl font-bold text-white">{redemptions.toLocaleString()} transact</p>
          </div>
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 space-y-1">
            <p className="text-xs text-green-300">You earn</p>
            <p className="text-2xl font-bold text-green-300">€{annualCommission.toLocaleString()} / year</p>
          </div>
        </div>

        <div className="flex items-start gap-3 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
          <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
          <p className="text-sm text-blue-300 leading-relaxed">
            Your commission is paid by DutyBoost — <strong>not by your traveler, not by the retailer</strong>. It comes out of DutyBoost's 2.5% transaction fee. Your travelers get a genuine airport discount, you earn a new revenue stream.
          </p>
        </div>
      </div>

      {/* Tier reference for agencies */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-3">
        <h3 className="font-bold text-white text-sm uppercase tracking-widest">Commission by tier</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
                <th className="pb-2 pr-4">Tier</th>
                <th className="pb-2 pr-4">Avg basket</th>
                <th className="pb-2 pr-4">Traveler saves</th>
                <th className="pb-2 pr-4">Your commission</th>
                <th className="pb-2">Per 100 redemptions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {TIER_BANDS.map((t) => {
                const mid = t.min === 300 ? 350 : Math.round((t.min + t.max) / 2);
                const saving = calcSaving(mid);
                const comm = Math.round(mid * AGENCY_COMMISSION_RATE * 100) / 100;
                const per100 = Math.round(comm * 100 * 100) / 100;
                const isActive = tier?.name.startsWith(t.label);
                return (
                  <tr key={t.label} className={`transition-colors ${isActive ? "bg-white/5" : ""}`}>
                    <td className={`py-2.5 pr-4 font-medium ${t.textColor}`}>{t.label}</td>
                    <td className="py-2.5 pr-4 text-slate-300">~€{mid}</td>
                    <td className="py-2.5 pr-4 text-red-300">€{saving.toFixed(2)}</td>
                    <td className="py-2.5 pr-4 text-green-300 font-semibold">€{comm.toFixed(2)}</td>
                    <td className="py-2.5 text-blue-300">€{per100.toFixed(0)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-slate-500">Commission = 0.5% of basket value per redemption, paid monthly by DutyBoost.</p>
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function RetailerCalculator() {
  const [activeTab, setActiveTab] = useState("retailer");

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs tracking-widest uppercase">
            DutyBoost ROI Calculator
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">See the numbers for yourself</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Whether you're an airport retailer or a travel partner — DutyBoost adds a measurable revenue stream. Pick your role below.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 bg-slate-800 border border-slate-700 rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab("retailer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "retailer"
                ? "bg-orange-500 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Store className="w-4 h-4" /> Airport Retailer
          </button>
          <button
            onClick={() => setActiveTab("partner")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "partner"
                ? "bg-green-600 text-white shadow"
                : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" /> Travel Partner
          </button>
        </div>

        {activeTab === "retailer" ? <RetailerTab /> : <TravelPartnerTab />}

        <p className="text-center text-xs text-slate-600 pb-4">hello@dutyboost.com · www.dutyboost.com</p>
      </div>
    </div>
  );
}