import { Copy, Trash2, Store as StoreIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useCurrency } from "@/components/calculator/CurrencyContext";
import SearchCombobox from "@/components/onboarding/SearchCombobox";
import { COUNTRY_OPTIONS } from "@/data/unCountries";
import { terminalsForCountry } from "@/data/cruiseTerminals";
import { getCruiseCalculatorStrings } from "@/lib/i18nCruiseCalculator";
import { numShort } from "./model";
import { useCalculatorTheme } from "./theme";

const NUM_FIELDS = [
  { key: "passengersPerCall", labelKey: "passengers", step: 100 },
  { key: "callsPerYear", labelKey: "calls", step: 1 },
  { key: "passRate", labelKey: "passRate", suffix: "%", step: 1 },
  { key: "activation", labelKey: "activation", suffix: "%", step: 0.1 },
  { key: "redemption", labelKey: "redemption", suffix: "%", step: 1 },
];

const FIELD_CLASS =
  "[&_input]:h-[34px] [&_input]:rounded-lg [&_input]:border-slate-300 [&_input]:bg-white [&_input]:px-2.5 [&_input]:text-sm [&_input]:shadow-none [&_input]:focus-visible:ring-2";

export default function StoreInputCard({ store, result, onChange, onRemove, onDuplicate }) {
  const th = useCalculatorTheme();
  const { i18n } = useTranslation();
  const s = getCruiseCalculatorStrings(i18n.language).card;
  const { rate, symbol, fmt, fmtCompact } = useCurrency();

  const basketDisplay =
    store.basket === "" || store.basket === null || store.basket === undefined
      ? ""
      : Math.round(store.basket * rate);
  const terminalOptions = terminalsForCountry(store.country);

  const pickCountry = (country) => {
    onChange(store.id, "country", country);
    onChange(store.id, "port", "");
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5">
      <div className="flex items-start gap-2 mb-3">
        <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${th.softBg}`}>
          <StoreIcon className={`w-4 h-4 ${th.accentText}`} />
        </div>
        <div className="flex-1 grid sm:grid-cols-3 gap-2 items-end">
          <label className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-500 mb-1 leading-tight">{s.storeCount}</span>
            <input
              type="number"
              min="1"
              step="1"
              value={store.stores}
              onChange={(e) => onChange(store.id, "stores", e.target.value)}
              className={`w-full h-[34px] rounded-lg border border-slate-300 bg-white px-2.5 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 ${th.inputRing}`}
            />
          </label>
          <SearchCombobox
            value={store.country}
            onChange={(v) => onChange(store.id, "country", v)}
            onPick={(o) => pickCountry(o.label)}
            options={COUNTRY_OPTIONS}
            placeholder={s.countryPlaceholder}
            emptyText={s.countryEmpty}
            className={`${FIELD_CLASS} ${th.fieldRing}`}
          />
          <SearchCombobox
            value={store.port}
            onChange={(v) => onChange(store.id, "port", v)}
            onPick={(o) => onChange(store.id, "port", o.label)}
            options={terminalOptions}
            placeholder={store.country ? s.terminalPlaceholder : s.terminalPlaceholderNoCountry}
            emptyText={store.country ? s.terminalEmpty : s.terminalEmptyNoCountry}
            className={`${FIELD_CLASS} ${th.fieldRing}`}
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
            <span className="text-[11px] font-semibold text-slate-500 mb-1 leading-tight">{s[f.labelKey]}</span>
            <span className="relative block mt-auto">
              <input
                type="number"
                min="0"
                step={f.step}
                value={store[f.key]}
                onChange={(e) => onChange(store.id, f.key, e.target.value)}
                className={`w-full h-[34px] rounded-lg border border-slate-300 bg-white py-1 pr-7 pl-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 ${th.inputRing}`}
              />
              {f.suffix && (
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">{f.suffix}</span>
              )}
            </span>
          </label>
        ))}

        <label className="flex flex-col">
          <span className="text-[11px] font-semibold text-slate-500 mb-1 leading-tight">{s.basket}</span>
          <span className="relative block mt-auto">
            <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-400">{symbol}</span>
            <input
              type="number"
              min="0"
              step={1}
              value={basketDisplay}
              onChange={(e) =>
                onChange(store.id, "basket", e.target.value === "" ? "" : Number(e.target.value) / rate)
              }
              className={`w-full h-[34px] rounded-lg border border-slate-300 bg-white py-1 pl-6 pr-2 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 ${th.inputRing}`}
            />
          </span>
        </label>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {[
          { label: s.kPassengers, val: numShort(result.annualPassengers) },
          { label: s.kTraffic, val: numShort(result.traffic) },
          { label: s.kBaskets, val: numShort(result.redemptions) },
          { label: s.kSales, val: fmtCompact(result.gross) },
          { label: s.kNet, val: fmt(result.net), highlight: true },
        ].map((row) => (
          <div
            key={row.label}
            className={`rounded-xl px-2.5 py-2 border ${
              row.highlight ? th.highlightBox : "bg-slate-50 border-slate-200"
            }`}
          >
            <div className={`font-bold text-sm ${row.highlight ? th.highlightText : "text-slate-800"}`}>{row.val}</div>
            <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{row.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}