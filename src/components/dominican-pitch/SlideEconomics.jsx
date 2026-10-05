import { BarChart3, Plane, Store, Check, User } from "lucide-react";
import { AIRLINE, RETAIL, SlideShell } from "./Shared";
import {
  MODEL,
  BASKET_CAP,
  DISCOUNT_CAP,
  NET_PLATFORM_RATE,
  tierFor,
  discountFor,
  usd,
  usd2,
} from "./figures";
import { useNetworkInputs, DEFAULT_BASKET } from "./NetworkContext";
import { useDeckLang } from "./LanguageContext";

const round2 = (n) => Math.round(n * 100) / 100;
const share = (part, total) => `${round2(total ? (part / total) * 100 : 0)}%`;

export default function SlideEconomics() {
  const { t } = useDeckLang();
  const c = t.economics;

  // The qualifying sale follows the blended basket entered on the model slide.
  const { inputs } = useNetworkInputs();
  const typed = inputs.basket === "" || inputs.basket == null ? DEFAULT_BASKET : Number(inputs.basket);
  const basket = Math.max(0, Math.round(typed || 0));
  const qualifying = Math.min(basket, BASKET_CAP);
  const aboveCap = basket - qualifying;

  const tier = tierFor(qualifying).tier;
  const discount = discountFor(qualifying);
  const discountCapped = round2(qualifying * discount) > DISCOUNT_CAP;

  const travellerSaves = Math.min(round2(qualifying * discount), DISCOUNT_CAP);
  const fee = round2(qualifying * MODEL.platformFee);
  const carrierShare = round2(fee * MODEL.partnerRebate);
  const retailerKeeps = round2(qualifying - travellerSaves - fee);

  const feePct = Math.round(MODEL.platformFee * 1000) / 10;
  const netPct = Math.round(NET_PLATFORM_RATE * 1000) / 10;

  const PARTIES = [
    {
      party: c.parties.traveller,
      Icon: User,
      value: usd2(travellerSaves),
      raw: travellerSaves,
      sub: discountCapped
        ? c.subs.savingCapped(usd2(DISCOUNT_CAP))
        : c.subs.savingPct(round2(discount * 100)),
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      color: "bg-green-500",
    },
    {
      party: c.parties.retailer,
      Icon: Store,
      value: usd2(retailerKeeps),
      raw: retailerKeeps,
      sub: c.subs.retailerNet(share(retailerKeeps, qualifying)),
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      color: "bg-blue-600",
    },
    {
      party: c.parties.platform,
      Icon: BarChart3,
      value: usd2(fee),
      raw: fee,
      sub: c.subs.fee(feePct),
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-600",
      color: "bg-orange-500",
    },
    {
      party: c.parties.carrier,
      Icon: Plane,
      value: usd2(carrierShare),
      raw: carrierShare,
      sub: c.subs.carrierShare(Math.round(MODEL.partnerRebate * 100)),
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      color: "bg-red-600",
    },
  ];

  const BULLETS = [
    { Icon: Store, color: RETAIL, text: c.bullets[0] },
    { Icon: Plane, color: AIRLINE, text: c.bullets[1] },
    { Icon: Check, color: "#16a34a", text: c.bullets[2](netPct) },
  ];

  return (
    <SlideShell
      eyebrow={c.eyebrow}
      eyebrowColor={RETAIL}
      title={
        <>
          {c.title(usd(qualifying), tier)} <span style={{ color: RETAIL }}>{c.titleAccent}</span>
        </>
      }
      subtitle={c.subtitle(usd(BASKET_CAP))}
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
            {c.total} {usd2(qualifying)}
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

          <div className="mt-4 rounded-xl px-4 py-3" style={{ background: `${AIRLINE}14` }}>
            <div className="flex items-center justify-between gap-3">
              <span className="text-sm font-semibold" style={{ color: AIRLINE }}>
                {c.carrierEarned}
              </span>
              <span className="font-bold text-lg" style={{ color: AIRLINE }}>
                {usd2(carrierShare)}
              </span>
            </div>
            <p className="text-slate-600 text-xs mt-1 leading-snug">
              {c.carrierNote(usd2(fee), usd2(carrierShare), feePct)}
            </p>
          </div>

          {aboveCap > 0 && (
            <div className="text-slate-600 text-xs mt-3 font-semibold">
              {c.capNote(usd2(basket), usd2(aboveCap), usd(BASKET_CAP))}
            </div>
          )}
          <div className="text-slate-400 text-xs mt-3">
            {c.capFootnote(usd2(DISCOUNT_CAP), usd2(BASKET_CAP * MODEL.platformFee))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div
            className="rounded-2xl p-6 text-white"
            style={{ background: `linear-gradient(135deg, ${RETAIL} 0%, ${AIRLINE} 100%)` }}
          >
            <div className="text-sm font-semibold uppercase tracking-widest opacity-80 mb-2">
              {c.netCostLabel}
            </div>
            <div className="text-4xl md:text-5xl font-bold mb-2">{feePct}%</div>
            <p className="text-white/90 text-sm leading-relaxed">{c.netCostBody()}</p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 space-y-2.5">
            {BULLETS.map((row) => (
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