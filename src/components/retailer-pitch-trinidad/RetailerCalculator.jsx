import { Wallet } from "lucide-react";
import { MODEL, discountFor, usd2, usdShort, numShort } from "./retailerModel";
import { useRevenueInputs } from "./RevenueContext";

const FIELDS = [
  { key: "stores", label: "Stores you operate at Piarco & Tobago", step: 1 },
  { key: "travellers", label: "Travellers entering store / day", step: 100 },
  { key: "activation", label: "Pre-activation", suffix: "%", step: 0.1 },
  { key: "redemption", label: "Redemption", suffix: "%", step: 1 },
  { key: "basket", label: "Blended basket", prefix: "$", step: 1 },
];

export default function RetailerCalculator() {
  // Shared with the transaction and estate slides, so every slide shows the
  // same scenario.
  const { inputs: f, set } = useRevenueInputs();
  const n = (key) => (f[key] === "" ? 0 : Number(f[key]));

  const stores = n("stores");
  const travellers = stores * n("travellers");
  const activated = travellers * (n("activation") / 100);
  const baskets = activated * (n("redemption") / 100);
  const gross = baskets * n("basket");
  const saving = gross * discountFor(n("basket"));
  const fee = gross * MODEL.platformFee;
  const retailerNet = gross - saving - fee;

  const ROWS = [
    { label: "Stores in the model", val: numShort(stores) },
    { label: "Travellers through those stores / day", val: numShort(travellers) },
    { label: `Pre-activated (${n("activation")}% of travellers) / day`, val: numShort(activated) },
    { label: `Incremental baskets (${n("redemption")}% redeem) / day`, val: numShort(baskets) },
    { label: "Incremental retail value / day", val: usdShort(gross), money: true },
    { label: `Retailer net (${gross ? Math.round((retailerNet / gross) * 100) : 0}%) / day`, val: usdShort(retailerNet), money: true },
    { label: "Platform fee (2.5%) / day", val: usd2(fee) },
    { label: "Retailer net / Yr", val: usdShort(retailerNet * 365), money: true },
  ];

  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Wallet className="w-5 h-5 text-green-600" />
        <h3 className="font-bold text-green-900">Your Incremental Revenue Potential, Per Day</h3>
        <span className="text-green-700 text-xs font-semibold ml-auto">
          Enter your own figures — the model recalculates
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
        {FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="block text-[11px] font-semibold text-green-900/70 mb-1 leading-tight">
              {field.label}
            </span>
            <span className="relative block">
              {field.prefix && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  {field.prefix}
                </span>
              )}
              <input
                type="number"
                min="0"
                step={field.step}
                value={f[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                className={`w-full rounded-lg border border-green-300 bg-white py-1 pr-6 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/40 ${
                  field.prefix ? "pl-5" : "pl-2"
                }`}
              />
              {field.suffix && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">
                  {field.suffix}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
        {ROWS.map((row) => (
          <div key={row.label} className="bg-white/70 border border-green-200 rounded-xl px-2.5 py-2">
            <div className={`font-bold text-sm ${row.money ? "text-green-700" : "text-slate-800"}`}>
              {row.val}
            </div>
            <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{row.label}</div>
          </div>
        ))}
      </div>

      <div className="text-slate-400 text-xs mt-3">
        Illustrative model, one day. A 2.5% platform fee on validated transactions only — the retailer keeps the
        rest of the sale. Volumes are counts; values in USD.
      </div>
    </div>
  );
}