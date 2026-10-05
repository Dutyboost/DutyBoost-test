import { BarChart3, Plane, Store, Check, User } from "lucide-react";
import { PARTNER, RETAIL, SlideShell } from "./Shared";
import { MODEL, BASKET_CAP, DISCOUNT_CAP, NET_PLATFORM_RATE, tierFor, discountFor, usd, usd2 } from "./dealModel";
import { useDealInputs, DEFAULT_BASKET } from "./DealContext";

const round2 = (n) => Math.round(n * 100) / 100;
const share = (part, total) => `${round2(total ? (part / total) * 100 : 0)}%`;

export default function SlideEconomics() {
  // The qualifying sale is the blended basket entered on the model slide, so
  // both slides always show the same scenario.
  const { inputs } = useDealInputs();
  const typed = inputs.basket === "" || inputs.basket == null ? DEFAULT_BASKET : Number(inputs.basket);
  const basket = Math.max(0, Math.round(typed || 0));
  const qualifying = Math.min(basket, BASKET_CAP);
  const aboveCap = basket - qualifying;

  const tier = tierFor(qualifying).tier;
  const discount = discountFor(qualifying);
  const discountCapped = round2(qualifying * discount) > DISCOUNT_CAP;

  const travellerSaves = Math.min(round2(qualifying * discount), DISCOUNT_CAP);
  const fee = round2(qualifying * MODEL.platformFee);
  const rebate = round2(fee * MODEL.partnerRebate);
  const netFee = round2(fee - rebate);
  const retailerKeeps = round2(qualifying - travellerSaves - fee);

  const PARTIES = [
    {
      party: "Traveller",
      Icon: User,
      value: usd2(travellerSaves),
      raw: travellerSaves,
      sub: discountCapped
        ? `DutyCredit saving (capped at ${usd2(DISCOUNT_CAP)})`
        : `DutyCredit saving (${round2(discount * 100)}%)`,
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      color: "bg-green-500",
    },
    {
      party: "Caribbean Duty Free",
      Icon: Store,
      value: usd2(retailerKeeps),
      raw: retailerKeeps,
      sub: `Retailer net (${share(retailerKeeps, qualifying)})`,
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-600",
      color: "bg-purple-500",
    },
    {
      party: "DutyBoost",
      Icon: BarChart3,
      value: usd2(fee),
      raw: fee,
      sub: `Platform fee (${Math.round(MODEL.platformFee * 1000) / 10}%)`,
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-600",
      color: "bg-orange-500",
    },
    {
      party: "Caribbean Airlines",
      Icon: Plane,
      value: usd2(rebate),
      raw: rebate,
      sub: `Travel Partner share (${Math.round(MODEL.partnerRebate * 100)}% of the fee)`,
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-700",
      color: "bg-teal-500",
    },
  ];

  return (
    <SlideShell
      eyebrow="Triple-Sided Economics"
      eyebrowColor={RETAIL}
      title={
        <>
          {usd(qualifying)} {tier}-Tier Sale —{" "}
          <span style={{ color: RETAIL }}>Both Positions at Once</span>
        </>
      }
      subtitle={`Every validated sale is split at the moment of checkout. The sale follows the blended basket entered on the model slide, with qualifying spend capped at ${usd(BASKET_CAP)}.`}
    >
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
        {PARTIES.map((p) => (
          <div key={p.party} className={`${p.bg} border ${p.border} rounded-2xl p-4 text-center`}>
            <p.Icon className={`w-8 h-8 mx-auto mb-2 ${p.text}`} />
            <div className="text-slate-800 font-semibold text-xs sm:text-sm mb-2">{p.party}</div>
            <div className={`text-2xl font-bold mb-1 ${p.text}`}>{p.value}</div>
            <div className="text-slate-500 text-xs leading-snug">{p.sub}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">
            Total = {usd2(qualifying)}
          </div>
          <div className="flex h-6 rounded-full overflow-hidden gap-px">
            {PARTIES.slice(0, 3).map((p) => (
              <div
                key={p.party}
                className={p.color}
                style={{ width: `${qualifying ? (p.raw / qualifying) * 100 : 0}%` }}
              />
            ))}
          </div>
          <div className="flex gap-3 mt-2 text-xs flex-wrap">
            {PARTIES.slice(0, 3).map((p) => (
              <div key={p.party} className="flex items-center gap-1.5">
                <div className={`w-3 h-3 rounded-sm ${p.color}`} />
                <span className="text-slate-600">
                  {p.party} {share(p.raw, qualifying)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl px-4 py-3" style={{ background: `${PARTNER}14` }}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold" style={{ color: PARTNER }}>
                Earned back as Travel Partner
              </span>
              <span className="font-bold text-lg" style={{ color: PARTNER }}>
                {usd2(rebate)}
              </span>
            </div>
            <p className="text-slate-600 text-xs mt-1 leading-snug">
              Of the {usd2(fee)} platform fee, {usd2(rebate)} returns to Caribbean Airlines as Travel Partner —
              a net platform cost of {usd2(netFee)} (
              {Math.round(NET_PLATFORM_RATE * 1000) / 10}% of the sale).
            </p>
          </div>

          {aboveCap > 0 && (
            <div className="text-slate-600 text-xs mt-3 font-semibold">
              {usd2(basket)} basket — the {usd2(aboveCap)} above the {usd(BASKET_CAP)} cap stays with the
              retailer.
            </div>
          )}
          <div className="text-slate-400 text-xs mt-3">
            Qualifying spend is capped at {usd(BASKET_CAP)} and the traveller discount at {usd2(DISCOUNT_CAP)}, so
            the platform fee tops out at {usd2(BASKET_CAP * MODEL.platformFee)} per transaction. The retailer
            keeps the balance of the sale.
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl p-6 text-white"
            style={{ background: `linear-gradient(135deg, ${PARTNER} 0%, ${RETAIL} 100%)` }}
          >
            <div className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">
              Net platform cost to Caribbean Airlines
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">
              {Math.round(NET_PLATFORM_RATE * 1000) / 10}%
            </div>
            <p className="text-white/90 text-sm leading-relaxed">
              It pays {Math.round(MODEL.platformFee * 1000) / 10}% as Retailer and earns{" "}
              {Math.round(MODEL.platformFee * MODEL.partnerRebate * 1000) / 10}% back as Travel Partner. The only
              true cost is the discount — which is only ever spent on a sale that would otherwise not have
              happened.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5">
            {[
              { Icon: Plane, color: PARTNER, text: "Earns on travellers it activates — even when they buy elsewhere" },
              { Icon: Store, color: RETAIL, text: "Pays only on sales that actually happen, through its own stores" },
              { Icon: Check, color: "#16a34a", text: "Zero upfront cost — no setup, subscription or integration fee" },
            ].map((row) => (
              <div key={row.text} className="flex items-start gap-2.5">
                <row.Icon className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: row.color }} />
                <span className="text-slate-600 text-sm leading-snug">{row.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideShell>
  );
}