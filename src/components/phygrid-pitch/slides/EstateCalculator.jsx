import { useState } from "react";
import { Wallet } from "lucide-react";
import {
  MODEL,
  NON_PURCHASE_PER_STORE_DAY,
  walkedPerDay,
  usd2,
  usdShort,
  numShort,
} from "@/components/phygrid-pitch/model";
import { useEstateInputs } from "@/components/phygrid-pitch/EstateContext";
import AirportSearch from "@/components/phygrid-pitch/AirportSearch";

const FIELDS = [
  { key: "controlled", label: "Stores using POS across all airports", step: 1 },
  // Set by the airport picked from the global database — never typed. This is
  // the group the pre-activation rate applies to.
  { key: "travellersDay", fixed: true, label: "Travellers to gates / day" },
  { key: "activation", label: "Pre-activation", suffix: "%", step: 0.1 },
  { key: "redemption", label: "Redemption", suffix: "%", step: 1 },
  { key: "basket", label: "Blended basket", prefix: "$", step: 1 },
];

export default function EstateCalculator() {
  // Shared with the estate slide, so both always show the same scenario.
  const { inputs: f, set, setMany } = useEstateInputs();
  const [airport, setAirport] = useState(null);
  const n = (key) => (f[key] === "" ? 0 : Number(f[key]));

  // Picking an airport sets the traveller base from its own traffic: the 78% of
  // its daily passengers who walk straight to their gates.
  const chooseAirport = (a) => {
    setAirport(a);
    setMany({ travellersDay: a ? String(walkedPerDay(a.annual_pax)) : "" });
  };

  const stores = n("controlled");
  // With no airport selected yet, the estate's own per-store average stands in.
  const travellers =
    f.travellersDay === "" ? stores * NON_PURCHASE_PER_STORE_DAY : Number(f.travellersDay);
  const activated = travellers * (n("activation") / 100);
  const baskets = activated * (n("redemption") / 100);
  const gross = baskets * n("basket");
  const saving = gross * MODEL.discount;
  const fee = gross * MODEL.platformFee;
  const pos = fee * MODEL.posShare;
  const retailerNet = gross - saving - fee;

  const ROWS = [
    { label: "Stores controlled by POS", val: numShort(stores) },
    { label: "Travellers to gates / day", val: numShort(travellers) },
    {
      label: `Pre-activated (${n("activation")}% of travellers) / day`,
      val: numShort(Math.round(activated)),
    },
    {
      label: `Incremental baskets (${n("redemption")}% redeem) / day`,
      val: numShort(Math.round(baskets)),
    },
    { label: "Incremental retail value / day", val: usdShort(gross), money: true },
    {
      label: `Retailer net (${gross ? Math.round((retailerNet / gross) * 100) : 0}%) / day`,
      val: usdShort(retailerNet),
      money: true,
    },
    { label: "POS commission / day", val: usd2(pos), money: true },
    { label: "POS commission / Yr", val: usd2(pos * 365), money: true },
  ];

  return (
    <div className="w-full h-full flex flex-col bg-green-50 border border-green-200 rounded-2xl p-5 sm:p-7">
      <div className="flex flex-wrap items-center gap-3 mb-4 shrink-0">
        <Wallet className="w-7 h-7 text-green-600" />
        <h3 className="font-bold text-2xl text-green-900">Airport Revenue Potential, Per Day</h3>
        <span className="text-green-700 text-base font-semibold ml-auto">
          Pick an airport — the model recalculates
        </span>
      </div>

      <div className="shrink-0">
        <AirportSearch selected={airport} onSelect={chooseAirport} />
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-base text-slate-700">
          {airport ? (
            <>
              <span className="font-semibold text-slate-900">{airport.name}</span>
              <span className="text-slate-300">·</span>
              <span>
                {airport.city}, {airport.country}
              </span>
              <span className="text-slate-300">·</span>
              <span>{numShort(airport.annual_pax)} passengers / yr</span>
              <span className="text-slate-300">·</span>
              <span>{numShort(Math.round(airport.annual_pax / 365))} passengers / day</span>
              <span className="text-slate-300">·</span>
              <span className="font-semibold text-green-700">
                {numShort(walkedPerDay(airport.annual_pax))} walk to gates / day
              </span>
            </>
          ) : (
            <span className="text-slate-500">
              No airport selected — the estate's own average of {NON_PURCHASE_PER_STORE_DAY}{" "}
              travellers to gates per store per day is used.
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 my-4 shrink-0">
        {FIELDS.map((field) => (
          <label key={field.key} className="flex flex-col">
            <span className="text-sm font-semibold text-green-900/70 mb-1.5 leading-tight">
              {field.label}
            </span>
            {field.fixed ? (
              <span className="mt-auto block w-full rounded-xl border border-green-300 bg-green-100/60 px-3 py-2.5 text-xl font-bold text-green-900">
                {Math.round(travellers).toLocaleString("en-US")}
              </span>
            ) : (
              <span className="relative block mt-auto">
                {field.prefix && (
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base text-slate-500">
                    {field.prefix}
                  </span>
                )}
                <input
                  type="number"
                  min="0"
                  step={field.step}
                  value={f[field.key]}
                  onChange={(e) => set(field.key, e.target.value)}
                  className={`w-full rounded-xl border border-green-300 bg-white py-2.5 pr-8 text-xl font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-green-500/40 ${
                    field.prefix ? "pl-7" : "pl-3"
                  }`}
                />
                {field.suffix && (
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-base text-slate-500">
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
            <div className={`text-2xl font-bold ${row.money ? "text-green-700" : "text-slate-800"}`}>
              {row.val}
            </div>
            <div className="mt-1 text-sm leading-tight text-slate-600">{row.label}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 shrink-0 text-sm text-slate-500">
        Fixed base: the 78% of an airport's daily passengers who walk straight to their gates — the travellers
        DutyBoost activates. Illustrative model, one day. A 2.5% platform fee on validated transactions only, of
        which POS earns {Math.round(MODEL.posShare * 100)}%. Volumes are counts; values in USD. Full tier basis on
        the transaction-mix slide.
      </div>
    </div>
  );
}