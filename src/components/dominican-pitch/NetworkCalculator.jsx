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
import { useDeckLang } from "./LanguageContext";

export default function NetworkCalculator() {
  const { t } = useDeckLang();
  const c = t.calculator;

  // Shared with the transaction and network slides, so every slide agrees.
  const { inputs: f, set } = useNetworkInputs();

  const FIELDS = [
    { key: "passengers", label: c.fields.passengers, step: 50, fallback: DEFAULT_PASSENGERS_DAY },
    { key: "activation", label: c.fields.activation, suffix: "%", step: 0.1, fallback: DEFAULT_ACTIVATION },
    { key: "redemption", label: c.fields.redemption, suffix: "%", step: 1, fallback: DEFAULT_REDEMPTION },
    { key: "basket", label: c.fields.basket, prefix: "$", step: 1, fallback: DEFAULT_BASKET },
  ];

  const passengersDay = readInput(f, "passengers", DEFAULT_PASSENGERS_DAY);
  const activation = readInput(f, "activation", DEFAULT_ACTIVATION);
  const redemption = readInput(f, "redemption", DEFAULT_REDEMPTION);
  const basket = readInput(f, "basket", DEFAULT_BASKET);

  const activated = passengersDay * (activation / 100);
  const baskets = activated * (redemption / 100);
  const gross = baskets * basket;
  const saving = gross * discountFor(basket);
  const fee = gross * MODEL.platformFee;
  const retailerNet = gross - saving - fee;

  const ROWS = [
    { label: c.rows.passengers, val: numShort(passengersDay) },
    { label: c.rows.activated(activation), val: numShort(activated) },
    { label: c.rows.baskets(redemption), val: numShort(baskets) },
    { label: c.rows.gross, val: usdShort(gross), money: true },
    { label: c.rows.retailerNet, val: usdShort(retailerNet), money: true },
    { label: c.rows.fee(Math.round(MODEL.platformFee * 1000) / 10), val: usd2(fee) },
    { label: c.rows.combined, val: usdShort(retailerNet * 365), money: true },
  ];

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4 sm:p-5">
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Wallet className="w-5 h-5 text-blue-600" />
        <h3 className="font-bold text-blue-900">{c.title}</h3>
        <span className="text-blue-700 text-xs font-semibold ml-auto">{c.hint}</span>
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

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
        {ROWS.map((row) => (
          <div key={row.label} className="bg-white/70 border border-blue-200 rounded-xl px-2.5 py-2">
            <div className={`font-bold text-sm ${row.money ? "text-blue-700" : "text-slate-800"}`}>
              {row.val}
            </div>
            <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{row.label}</div>
          </div>
        ))}
      </div>

      <div className="text-slate-400 text-xs mt-3">{c.note}</div>
    </div>
  );
}