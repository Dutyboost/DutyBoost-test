import { BarChart3 } from "lucide-react";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import { ACCENT, GridBg, SlideWrapper } from "../Shared";
import { MODEL, BASKET_CAP, DISCOUNT_CAP, tierFor, discountFor, usd, usd2 } from "../figures";
import { useRetailerRevenue, readInput, DEFAULT_BASKET } from "./RetailerRevenueContext";
import { useDeckLang } from "../LanguageContext";

const round2 = (n) => Math.round(n * 100) / 100;
const share = (part, total) => `${round2(total ? (part / total) * 100 : 0)}%`;

export default function SlideTransaction() {
  const { t } = useDeckLang();
  const c = t.retail.transaction;

  // The qualifying sale is the blended basket entered on the business-model
  // slide, so both slides always show the same scenario.
  const { inputs } = useRetailerRevenue();
  const basket = Math.max(0, Math.round(readInput(inputs, "basket", DEFAULT_BASKET)));
  const qualifying = Math.min(basket, BASKET_CAP);
  const aboveCap = basket - qualifying;

  const tier = tierFor(qualifying).tier;
  const discount = discountFor(qualifying);
  const discountCapped = round2(qualifying * discount) > DISCOUNT_CAP;

  const travellerSaves = Math.min(round2(qualifying * discount), DISCOUNT_CAP);
  const fee = round2(qualifying * MODEL.platformFee);
  const retailerKeeps = round2(qualifying - travellerSaves - fee);

  const PARTIES = [
    {
      party: c.parties.traveller,
      Icon: TravelerIcon,
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
      Icon: AirportRetailerIcon,
      value: usd2(retailerKeeps),
      raw: retailerKeeps,
      sub: c.subs.retailerNet(share(retailerKeeps, qualifying)),
      bg: "bg-slate-50",
      border: "border-slate-200",
      text: "text-slate-700",
      color: "bg-slate-700",
    },
    {
      party: c.parties.platform,
      Icon: BarChart3,
      value: usd2(fee),
      raw: fee,
      sub: c.subs.fee(round2(MODEL.platformFee * 100)),
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-600",
      color: "bg-amber-500",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              {c.eyebrow}
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              {c.title(usd(qualifying), tier)}
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">{c.subtitle(usd(BASKET_CAP))}</p>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            {PARTIES.map((p) => (
              <div key={p.party} className={`${p.bg} border ${p.border} rounded-2xl p-4 text-center`}>
                <p.Icon className={`w-9 h-9 mx-auto mb-2 ${p.text}`} />
                <div className="text-slate-800 font-semibold text-xs sm:text-sm mb-2">{p.party}</div>
                <div className={`text-2xl font-bold mb-1 ${p.text}`}>{p.value}</div>
                <div className="text-slate-500 text-xs leading-snug">{p.sub}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">{c.total(usd2(qualifying))}</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                {PARTIES.map((p) => (
                  <div
                    key={p.party}
                    className={p.color}
                    style={{ width: `${qualifying ? (p.raw / qualifying) * 100 : 0}%` }}
                  />
                ))}
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {PARTIES.map((p) => (
                  <div key={p.party} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${p.color}`} />
                    <span className="text-slate-600">
                      {p.party} {share(p.raw, qualifying)}
                    </span>
                  </div>
                ))}
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
            <div className="rounded-2xl p-5 text-white" style={{ background: `linear-gradient(135deg, ${ACCENT} 0%, #6b1f66 100%)` }}>
              <h3 className="font-bold mb-3">{c.integrateTitle}</h3>
              <p className="text-white/85 text-sm leading-relaxed">{c.integrateBody}</p>
              <div className="mt-3 text-white/80 font-semibold text-sm">{c.integrateFooter}</div>
            </div>
          </div>

          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-slate-700 text-sm leading-relaxed">
              <span className="font-bold">{c.cacTitle}</span> {c.cacBody}
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}