import { Wallet } from "lucide-react";
import { MODEL, discountFor, usd2, usdShort, numShort } from "../figures";
import { ACCENT } from "../Shared";
import { useDeckLang } from "../LanguageContext";
import {
  useRetailerRevenue,
  readInput,
  DEFAULT_STORES,
  DEFAULT_TRAVELLERS_DAY,
  DEFAULT_ACTIVATION,
  DEFAULT_REDEMPTION,
  DEFAULT_BASKET,
} from "./RetailerRevenueContext";

const FIELDS = [
  { key: "stores", step: 1 },
  { key: "travellers", step: 100 },
  { key: "activation", suffix: "%", step: 0.1 },
  { key: "redemption", suffix: "%", step: 1 },
  { key: "basket", prefix: "$", step: 1 },
];

export default function RetailerCalculator() {
  const { t } = useDeckLang();
  const c = t.retail.revenueCalculator;

  // Shared with the transaction and estate slides, so every slide shows the
  // same scenario.
  const { inputs, set } = useRetailerRevenue();

  const stores = readInput(inputs, "stores", DEFAULT_STORES);
  const travellersDay = readInput(inputs, "travellers", DEFAULT_TRAVELLERS_DAY);
  const activation = readInput(inputs, "activation", DEFAULT_ACTIVATION);
  const redemption = readInput(inputs, "redemption", DEFAULT_REDEMPTION);
  const basket = readInput(inputs, "basket", DEFAULT_BASKET);

  const travellers = stores * travellersDay;
  const activated = travellers * (activation / 100);
  const baskets = activated * (redemption / 100);
  const gross = baskets * basket;
  const saving = gross * discountFor(basket);
  const fee = gross * MODEL.platformFee;
  const retailerNet = gross - saving - fee;

  const ROWS = [
    { label: c.rows.stores, val: numShort(stores) },
    { label: c.rows.travellers, val: numShort(travellers) },
    { label: c.rows.activated(activation), val: numShort(activated) },
    { label: c.rows.baskets(redemption), val: numShort(baskets) },
    { label: c.rows.gross, val: usdShort(gross), money: true },
    {
      label: c.rows.net(gross ? Math.round((retailerNet / gross) * 100) : 0),
      val: usdShort(retailerNet),
      money: true,
    },
    { label: c.rows.fee(Math.round(MODEL.platformFee * 1000) / 10), val: usd2(fee) },
    { label: c.rows.netYear, val: usdShort(retailerNet * 365), money: true },
  ];

  return (
    <div className="rounded-2xl p-4 sm:p-5" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Wallet className="w-5 h-5" style={{ color: ACCENT }} />
        <h3 className="font-bold" style={{ color: ACCENT }}>
          {c.title}
        </h3>
        <span className="text-xs font-semibold ml-auto" style={{ color: ACCENT }}>
          {c.hint}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-3">
        {FIELDS.map((field) => (
          <label key={field.key} className="block">
            <span className="block text-[11px] font-semibold text-slate-500 mb-1 leading-tight min-h-[1.8rem]">
              {c.fields[field.key]}
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
                value={inputs[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                className={`w-full rounded-lg border border-slate-300 bg-white py-1.5 pr-6 text-sm font-semibold text-slate-800 focus:outline-none ${
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
          <div key={row.label} className="bg-white/70 border border-slate-200 rounded-xl px-2.5 py-2">
            <div
              className={`font-bold text-sm ${row.money ? "" : "text-slate-800"}`}
              style={row.money ? { color: ACCENT } : undefined}
            >
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