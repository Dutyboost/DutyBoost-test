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
  // Fixed: the 64% who walk straight to their gates — the group the
  // pre-activation rate applies to. Set by the airport, never typed.
  { key: "travellers", fixed: true },
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

  // Picking an airport loads its researched store count and the travellers who
  // walk straight to their gates, so the model recalculates from real figures.
  const chooseAirport = (a) =>
    setMany({ airport: a.code, stores: String(a.stores), travellers: String(a.walkedDay) });

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

  // Nothing is shown until the retailer enters a figure or picks an airport, so
  // the model never presents a scenario nobody asked for.
  const live = Object.values(inputs).some((v) => v !== "" && v != null);
  const val = (v) => (live ? v : "—");

  const ROWS = [
    { label: c.rows.stores, val: val(numShort(stores)) },
    { label: c.rows.travellers, val: val(numShort(travellers)) },
    { label: c.rows.activated(activation), val: val(numShort(activated)) },
    { label: c.rows.baskets(redemption), val: val(numShort(baskets)) },
    { label: c.rows.gross, val: val(usdShort(gross)), money: true },
    {
      label: c.rows.net(gross ? Math.round((retailerNet / gross) * 100) : 0),
      val: val(usdShort(retailerNet)),
      money: true,
    },
    { label: c.rows.fee(Math.round(MODEL.platformFee * 1000) / 10), val: val(usd2(fee)) },
    { label: c.rows.netYear, val: val(usdShort(retailerNet * 365)), money: true },
  ];

  return (
    <div
      className="w-full h-full flex flex-col rounded-2xl p-4 sm:p-5"
      style={{ background: `${ACCENT}0d`, border: `1px solid ${ACCENT}33` }}
    >
      <div className="flex flex-wrap items-center gap-2 mb-3 shrink-0">
        <Wallet className="w-6 h-6" style={{ color: ACCENT }} />
        <h3 className="font-bold text-xl" style={{ color: ACCENT }}>
          {c.title}
        </h3>
        <span className="text-sm font-semibold ml-auto" style={{ color: ACCENT }}>
          {c.hint}
        </span>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-2 shrink-0">
        <span className="text-sm font-semibold text-slate-800 mr-1">{c.airport.label}</span>
        {AIRPORT_OPTIONS.map((a) => {
          const isActive = selectedAirport?.code === a.code;
          return (
            <button
              key={a.code}
              type="button"
              onClick={() => chooseAirport(a)}
              className={`text-sm font-semibold px-3 py-1 rounded-full border transition-colors ${
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
        <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 text-base text-slate-800 mb-1 shrink-0">
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
      <div className="text-sm text-slate-800 shrink-0">{c.airport.note}</div>
      <div className="text-sm text-slate-800 mb-3 shrink-0">
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

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-3 shrink-0">
        {FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col">
            <span className="text-sm font-semibold text-slate-800 mb-1.5 leading-tight">
              {c.fields[field.key]}
            </span>
            {field.fixed ? (
              <span className="mt-auto block w-full rounded-xl border border-slate-300 bg-slate-100 px-3 py-2.5 text-lg font-bold text-slate-600">
                {selectedAirport ? selectedAirport.walkedDay.toLocaleString("en-US") : "—"}
              </span>
            ) : (
            <span className="relative block mt-auto">
              {field.prefix && (
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-800">
                  {field.prefix}
                </span>
              )}
              <input
                type="number"
                min="0"
                step={field.step}
                // Blank until an airport is chosen — the airport sets the
                // scenario, the retailer then adjusts it.
                disabled={!selectedAirport}
                value={inputs[field.key]}
                onChange={(e) => set(field.key, e.target.value)}
                className={`w-full rounded-xl border border-slate-300 bg-white py-2.5 pr-8 text-lg font-bold text-slate-800 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400 ${
                  field.prefix ? "pl-7" : "pl-3"
                }`}
              />
              {field.suffix && (
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-slate-800">
                  {field.suffix}
                </span>
              )}
            </span>
            )}
          </label>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 shrink-0">
        {ROWS.map((row) => (
          <div
            key={row.label}
            className="bg-white/70 border border-slate-200 rounded-2xl px-4 py-3 flex flex-col justify-center"
          >
            <div
              className={`font-bold text-2xl ${row.money ? "" : "text-slate-800"}`}
              style={row.money ? { color: ACCENT } : undefined}
            >
              {row.val}
            </div>
            <div className="text-sm text-slate-800 leading-tight mt-1">{row.label}</div>
          </div>
        ))}
      </div>

      <div className="text-slate-800 text-xs mt-auto pt-3 shrink-0">{c.note}</div>
    </div>
  );
}