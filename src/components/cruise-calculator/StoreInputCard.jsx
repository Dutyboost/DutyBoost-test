import { Copy, Trash2, Store as StoreIcon } from "lucide-react";
import { useCurrency } from "@/components/calculator/CurrencyContext";
import { numShort } from "./model";

const NUM_FIELDS = [
  { key: "passengersPerCall", label: "Cruise passengers per call", step: 100 },
  { key: "callsPerYear", label: "Port calls per year", step: 1 },
  { key: "passRate", label: "Passengers passing your store", suffix: "%", step: 1 },
  { key: "activation", label: "DutyCredit pre-activation", suffix: "%", step: 0.1 },
  { key: "redemption", label: "Redemption rate", suffix: "%", step: 1 },
];

export default function StoreInputCard({ store, result, onChange, onRemove, onDuplicate }) {
  const { rate, symbol, fmt, fmtCompact } = useCurrency();

  const basketDisplay = Math.round((store.basket || 0) * rate);

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
      <div className="flex items-start gap-2 mb-3">
        <div className="w-9 h-9 rounded-lg bg-teal-50 flex items-center justify-center shrink-0">
          <StoreIcon className="w-4 h-4 text-teal-600" />
        </div>
        <div className="flex-1 grid sm:grid-cols-3 gap-2">
          <input
            value={store.name}
            onChange={(e) => onChange(store.id, "name", e.target.value)}
            placeholder="Store name"
            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
          />
          <input
            value={store.region}
            onChange={(e) => onChange(store.id, "region", e.target.value)}
            placeholder="Island / country / region"
            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
          />
          <input
            value={store.port}
            onChange={(e) => onChange(store.id, "port", e.target.value)}
            placeholder="Port / terminal / city"
            className="w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
          />
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onDuplicate(store.id)}
            title="Duplicate this store"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
          >
            <Copy className="w-4 h-4" />
          </button>
          <button
            onClick={() => onRemove(store.id)}
            title="Remove this store"
            className="p-1.5 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-4">
        {NUM_FIELDS.map((f) => (
          <label key={f.key} className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-500 mb-1 leading-tight">{f.label}</span>
            <span className="relative block mt-auto">
              <input
                type="number"
                min="0"
                step={f.step}
                value={store[f.key]}
                onChange={(e) => onChange(store.id, f.key, e.target.value)}
                className={`w-full rounded-lg border border-slate-300 bg-white py-1 pr-7 pl-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40`}
              />
              {f.suffix && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">{f.suffix}</span>
              )}
            </span>
          </label>
        ))}

        <label className="flex flex-col">
          <span className="text-[11px] font-semibold text-slate-500 mb-1 leading-tight">Average basket</span>
          <span className="relative block mt-auto">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">{symbol}</span>
            <input
              type="number"
              min="0"
              step={1}
              value={basketDisplay}
              onChange={(e) => onChange(store.id, "basket", Number(e.target.value || 0) / rate)}
              className="w-full rounded-lg border border-slate-300 bg-white py-1 pl-6 pr-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/40"
            />
          </span>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { label: "Cruise passengers / yr", val: numShort(result.annualPassengers) },
          { label: "Passing your store / yr", val: numShort(result.traffic) },
          { label: "Incremental baskets / yr", val: numShort(result.redemptions) },
          { label: "Incremental sales / yr", val: fmtCompact(result.gross) },
          { label: "Retailer net / yr", val: fmt(result.net), highlight: true },
        ].map((row) => (
          <div
            key={row.label}
            className={`rounded-xl px-2.5 py-2 border ${
              row.highlight ? "bg-teal-50 border-teal-200" : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className={`font-bold text-sm ${row.highlight ? "text-teal-700" : "text-slate-800"}`}>{row.val}</div>
            <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{row.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}