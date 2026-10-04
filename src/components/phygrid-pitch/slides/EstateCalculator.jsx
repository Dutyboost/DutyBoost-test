import { useState } from "react";
import { Wallet } from "lucide-react";
import { MODEL, usd2, usdShort, numShort } from "@/components/phygrid-pitch/model";

const FIELDS = [
  { key: "stores", label: "Stores in the network", step: 1 },
  { key: "perStore", label: "Travel moments / store / yr", step: 1000 },
  { key: "activation", label: "Pre-activation", suffix: "%", step: 0.1 },
  { key: "redemption", label: "Redemption", suffix: "%", step: 1 },
  { key: "basket", label: "Blended basket", prefix: "$", step: 1 },
];

const DEFAULTS = { stores: 1000, perStore: 250000, activation: 0.1, redemption: 30, basket: 135 };

export default function EstateCalculator() {
  const [f, setF] = useState(DEFAULTS);
  const set = (key, value) => setF((p) => ({ ...p, [key]: value }));
  const n = (key) => (f[key] === "" ? 0 : Number(f[key]));

  const travellers = n("stores") * n("perStore");
  const activated = travellers * (n("activation") / 100);
  const baskets = activated * (n("redemption") / 100);
  const gross = baskets * n("basket");
  const saving = gross * MODEL.discount;
  const fee = gross * MODEL.platformFee;
  const pos = fee * MODEL.posShare;
  const retailerNet = gross - saving - fee;

  const ROWS = [
    { label: "Travel moments through the network", val: numShort(travellers) },
    { label: `Pre-activated (${n("activation")}% of travellers)`, val: numShort(Math.round(activated)) },
    { label: `Incremental baskets (${n("redemption")}% redeem)`, val: numShort(Math.round(baskets)) },
    { label: "Incremental retail value", val: usdShort(gross), money: true },
    { label: `Retailer net (${gross ? Math.round((retailerNet / gross) * 100) : 0}%)`, val: usdShort(retailerNet), money: true },
    { label: "Phygrid commission", val: usd2(pos), money: true },
  ];

  return (
    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Wallet className="w-5 h-5 text-green-600" />
        <h3 className="font-bold text-green-900">Phygrid's Airport Retail Network, Per Year</h3>
        <span className="text-green-700 text-xs font-semibold ml-auto">
          Enter your figures — the model recalculates
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mb-3">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
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
        Illustrative model, one year. A 2.5% platform fee on validated transactions only, of which Phygrid earns{" "}
        {Math.round(MODEL.posShare * 100)}%. Volumes are counts; values in USD. Full tier basis on the
        transaction-mix slide.
      </div>
    </div>
  );
}