import { useState, useMemo } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, ShoppingBag, Percent, Euro, ArrowRight, Info } from "lucide-react";

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

const TIER_BANDS = [
  { label: "Boarding", min: 70, max: 99, savMin: 5, savMax: 10, color: "bg-yellow-400", textColor: "text-yellow-400" },
  { label: "Priority", min: 100, max: 199, savMin: 15, savMax: 30, color: "bg-blue-400", textColor: "text-blue-400" },
  { label: "Lounge", min: 200, max: 299, savMin: 35, savMax: 45, color: "bg-green-400", textColor: "text-green-400" },
  { label: "VIP", min: 300, max: 500, savMin: 60, savMax: 60, color: "bg-purple-400", textColor: "text-purple-400" },
];

export default function RetailerCalculator() {
  const [spend, setSpend] = useState(150);

  const saving = useMemo(() => calcSaving(spend), [spend]);
  const commission = useMemo(() => Math.round(spend * 0.025 * 100) / 100, [spend]);
  const totalCost = useMemo(() => Math.round((saving + commission) * 100) / 100, [saving, commission]);
  const discountPct = useMemo(() => spend > 0 ? Math.round((saving / spend) * 1000) / 10 : 0, [saving, spend]);
  const netRevenue = useMemo(() => Math.round((spend - saving - commission) * 100) / 100, [spend, saving, commission]);
  const tier = useMemo(() => getTier(spend), [spend]);

  // Progress within current tier band
  const tierProgress = useMemo(() => {
    if (spend < 70) return 0;
    if (spend >= 300) return 100;
    if (spend >= 200) return ((spend - 200) / 99) * 100;
    if (spend >= 100) return ((spend - 100) / 99) * 100;
    return ((spend - 70) / 29) * 100;
  }, [spend]);

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-3xl mx-auto space-y-8">

        {/* Header */}
        <div className="text-center space-y-2">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs tracking-widest uppercase">
            Retailer ROI Calculator
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">What does a DutyBoost traveler cost you?</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Drag the slider to any basket size. See exactly what discount the traveler receives, what you pay DutyBoost, and your net revenue — on a sale that likely wouldn't have happened without us.
          </p>
        </div>

        {/* Slider Card */}
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-6">
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
              <div className="px-4 py-2 rounded-xl border border-slate-600 text-slate-500 text-sm">
                Below minimum (€70)
              </div>
            )}
          </div>

          <div className="space-y-3">
            <Slider
              min={0}
              max={500}
              step={1}
              value={[spend]}
              onValueChange={([v]) => setSpend(v)}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-slate-500">
              <span>€0</span>
              <span className="text-slate-400">Min basket: €70</span>
              <span>€500+</span>
            </div>
          </div>

          {/* Tier progress bar */}
          {tier && (
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Progress within {tier.name}</span>
                <span>{Math.round(tierProgress)}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-200 ${tier.bar}`}
                  style={{ width: `${tierProgress}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Main metrics */}
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

            {/* Acquisition cost breakdown */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-4">
              <h2 className="font-bold text-white text-lg">Total acquisition cost</h2>
              <p className="text-slate-400 text-sm">What you give up to bring in a traveler who most likely would have walked past without DutyBoost.</p>

              {/* Visual bar breakdown */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-28 text-xs text-slate-400 shrink-0">Traveler saving</div>
                  <div className="flex-1 h-6 bg-slate-700 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-red-400 rounded-lg flex items-center justify-end pr-2 transition-all duration-300"
                      style={{ width: `${Math.min(100, (saving / spend) * 100)}%` }}
                    >
                      <span className="text-xs font-bold text-white">€{saving.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="w-12 text-xs text-red-300 text-right shrink-0">{discountPct}%</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 text-xs text-slate-400 shrink-0">DutyBoost fee</div>
                  <div className="flex-1 h-6 bg-slate-700 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-orange-400 rounded-lg flex items-center justify-end pr-2 transition-all duration-300"
                      style={{ width: `${Math.min(100, (commission / spend) * 100)}%` }}
                    >
                      <span className="text-xs font-bold text-white">€{commission.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="w-12 text-xs text-orange-300 text-right shrink-0">2.5%</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-28 text-xs text-slate-400 shrink-0">Net revenue</div>
                  <div className="flex-1 h-6 bg-slate-700 rounded-lg overflow-hidden">
                    <div
                      className="h-full bg-green-400 rounded-lg flex items-center justify-end pr-2 transition-all duration-300"
                      style={{ width: `${Math.min(100, (netRevenue / spend) * 100)}%` }}
                    >
                      <span className="text-xs font-bold text-white">€{netRevenue.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="w-12 text-xs text-green-300 text-right shrink-0">{Math.round((netRevenue / spend) * 1000) / 10}%</div>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <p className="text-xs text-slate-400">Total cost to acquire this traveler</p>
                  <p className="text-2xl font-bold text-white">€{totalCost.toFixed(2)} <span className="text-sm font-normal text-slate-400">/ {Math.round((totalCost / spend) * 1000) / 10}% of basket</span></p>
                </div>
                <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3 max-w-xs">
                  <Info className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <p className="text-xs text-blue-300 leading-relaxed">Without DutyBoost, this traveler's spend was <strong>€0</strong>. Your acquisition cost is <strong>€{totalCost.toFixed(2)}</strong> on a sale of <strong>€{spend}</strong>.</p>
                </div>
              </div>
            </div>

            {/* Tier reference table */}
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-6 space-y-3">
              <h2 className="font-bold text-white text-sm uppercase tracking-widest">All tiers at a glance</h2>
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
          <div className="bg-slate-800 border border-slate-700 rounded-2xl p-10 text-center space-y-2">
            <p className="text-slate-400">Slide to at least <strong className="text-white">€70</strong> to activate a DutyCredit tier.</p>
          </div>
        )}

        <p className="text-center text-xs text-slate-600 pb-4">hello@dutyboost.com · www.dutyboost.com</p>
      </div>
    </div>
  );
}