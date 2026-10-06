import { Wallet } from "lucide-react";
import { MODEL, SOURCES, discountFor, usd2, usdShort, numShort } from "../figures";
import { ACCENT } from "../Shared";
import { useDeckLang } from "../LanguageContext";
import { AIRPORT_OPTIONS } from "../airportData";
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
  const { inputs, set, setMany } = useRetailerRevenue();

  const selectedAirport = AIRPORT_OPTIONS.find((a) => a.code === inputs.airport) || null;

  // Picking an airport loads its researched store count and its store footfall,
  // so the model recalculates from real figures instead of guessed ones.
  const chooseAirport = (a) =>
    setMany({ airport: a.code, stores: String(a.stores), travellers: String(a.storeFootfallDay) });

  const stores = readInput(inputs, "stores", DEFAULT_STORES);
  const travellersDay = readInput(inputs, "travellers", DEFAULT_TRAVELLERS_DAY);
  const activation = readInput(inputs, "activation", DEFAULT_ACTIVATION);
  const redemption = readInput(inputs, "redemption", DEFAULT_REDEMPTION);
  const basket = readInput(inputs, "basket", DEFAULT_BASKET);

  // The figure entered is the airport's total store footfall, so it is already
  // the traffic through the retailer's stores — the store count does not multiply it.
  const travellers = travellersDay;
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
    <div className="rounded-2xl p-3 sm:p-4" style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        <Wallet className="w-5 h-5" style={{ color: ACCENT }} />
        <h3 className="font-bold" style={{ color: ACCENT }}>
          {c.title}
        </h3>
        <span className="text-xs font-semibold ml-auto" style={{ color: ACCENT }}>
          {c.hint}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 mb-1.5">
        <span className="text-[11px] font-semibold text-slate-800 mr-1">{c.airport.label}</span>
        {AIRPORT_OPTIONS.map((a) => {
          const isActive = selectedAirport?.code === a.code;
          return (
            <button
              key={a.code}
              type="button"
              onClick={() => chooseAirport(a)}
              className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border transition-colors ${
                isActive ? "text-white" : "bg-white text-slate-800 border-slate-300 hover:border-slate-400"
              }`}
              style={isActive ? { background: ACCENT, borderColor: ACCENT } : undefined}
            >
              {a.code === "ALL" ? c.airport.all : a.label}
            </button>
          );
        })}
      </div>

      {selectedAirport && (
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[11px] text-slate-800 mb-1">
          <span>{c.airport.stores(selectedAirport.stores)}</span>
          <span className="text-slate-300">·</span>
          <span>{c.airport.pax(`${(selectedAirport.annualPassengers / 1000000).toFixed(1)}M`)}</span>
          <span className="text-slate-300">·</span>
          <span>
            {c.airport.paxDay(
              Math.round(selectedAirport.annualPassengers / 365).toLocaleString("en-US")
            )}
          </span>
          <a
            href={selectedAirport.source}
            target="_blank"
            rel="noreferrer"
            className="font-semibold underline"
            style={{ color: ACCENT }}
          >
            {c.airport.source} ↗
          </a>
        </div>
      )}
      <div className="text-[10px] text-slate-800">{c.airport.note}</div>
      <div className="text-[10px] text-slate-800 mb-2">
        {c.footfall} —{" "}
        <a
          href={SOURCES.footfall}
          target="_blank"
          rel="noreferrer"
          className="font-semibold underline"
          style={{ color: ACCENT }}
        >
          {c.footfallSource} ↗
        </a>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-2">
        {FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col">
            <span className="text-[11px] font-semibold text-slate-800 mb-1 leading-tight">
              {c.fields[field.key]}
            </span>
            <span className="relative block mt-auto">
              {field.prefix && (
                <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-slate-800">
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
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-slate-800">
                  {field.suffix}
                </span>
              )}
            </span>
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-1.5">
        {ROWS.map((row) => (
          <div key={row.label} className="bg-white/70 border border-slate-200 rounded-xl px-2 py-1.5">
            <div
              className={`font-bold text-sm ${row.money ? "" : "text-slate-800"}`}
              style={row.money ? { color: ACCENT } : undefined}
            >
              {row.val}
            </div>
            <div className="text-[10px] text-slate-800 leading-tight mt-0.5">{row.label}</div>
          </div>
        ))}
      </div>

      <div className="text-slate-800 text-[10px] mt-2">{c.note}</div>
    </div>
  );
}