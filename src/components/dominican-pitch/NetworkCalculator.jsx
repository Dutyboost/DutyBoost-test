import { Wallet } from "lucide-react";
import { MODEL, discountFor, usd2, usdShort, numShort } from "./figures";
import {
  useNetworkInputs,
  readInput,
  DEFAULT_PASSENGERS_DAY,
  DEFAULT_ACTIVATION,
  DEFAULT_REDEMPTION,
  DEFAULT_BASKET,
} from "./NetworkContext";

const FIELDS = [
  { key: "passengers", label: "Carrier passengers to/from the DR / day", step: 50, fallback: DEFAULT_PASSENGERS_DAY },
  { key: "activation", label: "Pre-activation", suffix: "%", step: 0.1, fallback: DEFAULT_ACTIVATION },
  { key: "redemption", label: "Redemption", suffix: "%", step: 1, fallback: DEFAULT_REDEMPTION },
  { key: "basket", label: "Blended basket", prefix: "$", step: 1, fallback: DEFAULT_BASKET },
];

export default function NetworkCalculator() {
  // Shared with the transaction and network slides, so every slide agrees.
  const { inputs: f, set } = useNetworkInputs();

  const passengersDay = readInput(f, "passengers", DEFAULT_PASSENGERS_DAY);
  const activation = readInput(f, "activation", DEFAULT_ACTIVATION);
  const redemption = readInput(f, "redemption", DEFAULT_REDEMPTION);
  const basket = readInput(f, "basket", DEFAULT_BASKET);

  const activated = passengersDay * (activation / 100);
  const baskets = activated * (redemption / 100);
  const gross = baskets * basket;
  const saving = gross * discountFor(basket);
  const fee = gross * MODEL.platformFee;
  const rebate = fee * MODEL.partnerRebate;
  const retailerNet = gross - saving - fee;

  const ROWS = [
    { label: "Carrier passengers / day", val: numShort(passengersDay) },
    { label: `Pre-activated (${activation}%) / day`, val: numShort(activated) },
    { label: `Baskets redeemed (${redemption}%) / day`, val: numShort(baskets) },
    { label: "Incremental retail value / day", val: usdShort(gross), money: true },
    { label: "Airport retail net / day", val: usdShort(retailerNet), money: true },
    { label: "Carrier share / day", val: usd2(rebate), money: true },
    { label: `Platform fee (${Math.round(MODEL.platformFee * 1000) / 10}%) / day`, val: usd2(fee) },
    { label: "Combined net / Yr", val: usdShort((retailerNet + rebate) * 365), money: true },
  ];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Wallet className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-blue-900">The Model Across the Three Gateways, Per Day</h3>
        <span className="text-blue-700 text-xs font-semibold ml-auto">
          Enter your own figures — every slide recalculates
        </span>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 mb-3">
        {FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="block text-[11px] font-semibold text-blue-900/70 mb-1 leading-tight">
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
                placeholder={field.fallback}
                value={f[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                className={`w-full rounded-lg border border-blue-300 bg-white py-1 pr-6 text-sm font-semibold text-slate-800 placeholder:font-normal placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 ${
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
          <div key={row.label} className="bg-white/70 border border-blue-200 rounded-xl px-2.5 py-2">
            <div className={`font-bold text-sm ${row.money ? "text-blue-700" : "text-slate-800"}`}>
              {row.val}
            </div>
            <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{row.label}</div>
          </div>
        ))}
      </div>

      <div className="text-slate-400 text-xs mt-3">
        Illustrative model, one day, across all carriers flying to and from the Dominican Republic. Blank fields
        use the figures shown as placeholders. Volumes are counts; values in USD.
      </div>
    </div>
  );
}