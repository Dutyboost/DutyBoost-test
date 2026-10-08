import { useState } from "react";
import { Wallet } from "lucide-react";
import { MODEL, discountFor, usd2, usdShort, numShort } from "./retailerModel";
import { TT_OPTIONS, walkedPerDay } from "./airports";
import { useRevenueInputs } from "./RevenueContext";
import { ACCENT } from "./Shared";

const FIELDS = [
  // Set by the airport picked above — never typed. This is the group the
  // pre-activation rate applies to.
  { key: "travellers", fixed: true, label: "Travellers to gates / day" },
  { key: "activation", label: "Pre-activation", suffix: "%", step: 0.1 },
  { key: "redemption", label: "Redemption", suffix: "%", step: 1 },
  { key: "basket", label: "Blended basket", prefix: "$", step: 1 },
];

// The airport-level model for Trinidad & Tobago's two gateways: the airport's
// own passengers set the travellers who walk straight to their gates, and the
// pre-activation and redemption rates do the rest.
export default function AirportRevenueCalculator() {
  const [airport, setAirport] = useState(null);
  const [values, setValues] = useState({ activation: "", redemption: "", basket: "" });
  // The transaction and estate slides read the same scenario, so the rates and
  // the basket typed here are mirrored into the deck's shared inputs.
  const { set: setShared } = useRevenueInputs();
  const set = (key, v) => {
    setValues((p) => ({ ...p, [key]: v }));
    setShared(key, v);
  };
  const n = (key) => (values[key] === "" ? 0 : Number(values[key]));

  const travellers = airport ? walkedPerDay(airport.annual_pax) : 0;
  const activated = travellers * (n("activation") / 100);
  const baskets = activated * (n("redemption") / 100);
  const gross = baskets * n("basket");
  const saving = gross * discountFor(n("basket"));
  const fee = gross * MODEL.platformFee;
  const retailerNet = gross - saving - fee;

  const ROWS = [
    { label: "Travellers to gates / day", val: numShort(travellers) },
    { label: `Pre-activated (${n("activation")}% of travellers) / day`, val: numShort(activated) },
    { label: `Incremental baskets (${n("redemption")}% redeem) / day`, val: numShort(baskets) },
    { label: "Incremental retail value / day", val: usdShort(gross), money: true },
    {
      label: `Retailer net (${gross ? Math.round((retailerNet / gross) * 100) : 0}%) / day`,
      val: usdShort(retailerNet),
      money: true,
    },
    { label: "Returned to travellers as DutyCredit savings / day", val: usdShort(saving) },
    { label: "Platform fee (2.5%) / day", val: usd2(fee) },
    { label: "Retailer net / Yr", val: usdShort(retailerNet * 365), money: true },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-green-50 border border-green-200 rounded-2xl p-5">
      <div className="flex flex-wrap items-center gap-3 mb-4 shrink-0">
        <Wallet className="w-6 h-6 text-green-600" />
        <h3 className="font-bold text-xl md:text-2xl text-green-900">Airport Revenue Potential, Per Day</h3>
        <span className="text-green-700 text-sm font-semibold ml-auto">
          Pick an airport — the model recalculates
        </span>
      </div>

      <div className="shrink-0">
        <div className="flex flex-wrap gap-2">
          {TT_OPTIONS.map((a) => {
            const active = airport?.code === a.code;
            return (
              <button
                key={a.code}
                type="button"
                onClick={() => setAirport(a)}
                className={`rounded-xl border px-4 py-2 text-left transition-colors ${
                  active
                    ? "border-transparent text-white"
                    : "border-green-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
                style={active ? { background: ACCENT } : undefined}
              >
                <span className="block text-sm font-semibold">{a.name}</span>
                <span className={`block text-xs ${active ? "text-white/80" : "text-slate-500"}`}>
                  {a.code} · {numShort(a.annual_pax)} passengers / yr
                </span>
              </button>
            );
          })}
        </div>

        {airport && (
          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-700">
            <span className="font-semibold text-slate-900">{airport.name}</span>
            <span className="text-slate-300">·</span>
            <span>{airport.city}</span>
            <span className="text-slate-300">·</span>
            <span>{numShort(airport.annual_pax)} passengers / yr</span>
            <span className="text-slate-300">·</span>
            <span>{numShort(Math.round(airport.annual_pax / 365))} passengers / day</span>
            <span className="text-slate-300">·</span>
            <span className="font-semibold" style={{ color: ACCENT }}>
              {numShort(walkedPerDay(airport.annual_pax))} walk to gates / day
            </span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 shrink-0">
        {FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col">
            <span className="text-xs font-semibold text-green-900/70 mb-1.5 leading-tight">
              {field.label}
            </span>
            {field.fixed ? (
              <span className="mt-auto block w-full rounded-xl border border-green-300 bg-green-100/60 px-3 py-2 text-lg font-bold text-green-900">
                {Math.round(travellers).toLocaleString("en-US")}
              </span>
            ) : (
              <span className="relative block mt-auto">
                {field.prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    {field.prefix}
                  </span>
                )}
                <input
                  type="number"
                  min="0"
                  step={field.step}
                  value={values[field.key]}
                  onChange={(e) => set(field.key, e.target.value)}
                  className={`w-full rounded-xl border border-green-300 bg-white py-2 pr-7 text-lg font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/40 ${
                    field.prefix ? "pl-7" : "pl-3"
                  }`}
                />
                {field.suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                    {field.suffix}
                  </span>
                )}
              </span>
            )}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 flex-1 min-h-0">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="flex flex-col justify-center rounded-2xl border border-green-200 bg-white/70 px-4 py-3"
          >
            <div className={`text-xl md:text-2xl font-bold ${row.money ? "text-green-700" : "text-slate-800"}`}>
              {row.val}
            </div>
            <div className="mt-1 text-xs leading-tight text-slate-600">{row.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-3 shrink-0 text-xs text-slate-500">
        Fixed base: the 73% of an airport's daily passengers who walk straight to their gates — the travellers
        DutyBoost pre-activates. Illustrative model, one day. A 2.5% platform fee on validated transactions only —
        the retailer keeps the rest of the sale. Volumes are counts; values in USD.
      </div>
    </div>
  );
}