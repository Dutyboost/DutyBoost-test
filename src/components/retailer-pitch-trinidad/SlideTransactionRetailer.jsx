import { BarChart3 } from "lucide-react";
import { SlideWrapper, GridBg, ACCENT } from "./Shared";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import { MODEL, BASKET_CAP, DISCOUNT_CAP, tierFor, discountFor, usd, usd2 } from "./retailerModel";
import { useRevenueInputs, DEFAULT_BASKET } from "./RevenueContext";

const round2 = (n) => Math.round(n * 100) / 100;
const share = (part, total) => `${round2(total ? (part / total) * 100 : 0)}%`;

export default function SlideTransactionRetailer() {
  // The qualifying sale is the blended basket entered on the business-model
  // slide, so both slides always show the same scenario.
  const { inputs } = useRevenueInputs();
  const typed = inputs.basket === "" || inputs.basket == null ? DEFAULT_BASKET : Number(inputs.basket);
  const basket = Math.max(0, Math.round(typed || 0));
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
      party: "Traveller",
      Icon: TravelerIcon,
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
      party: "Airport Retailer",
      Icon: AirportRetailerIcon,
      value: usd2(retailerKeeps),
      raw: retailerKeeps,
      sub: `Net before normal costs (${share(retailerKeeps, qualifying)})`,
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
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4">
            <span className="text-xs md:text-sm font-semibold uppercase tracking-widest" style={{ color: ACCENT }}>
              One Transaction — Three Beneficiaries
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              {usd(qualifying)} {tier}-Tier Qualifying Sale
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              Every validated sale is split at the moment of checkout. The sale follows the blended basket entered
              on the business-model slide, with qualifying spend capped at {usd(BASKET_CAP)}.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            {PARTIES.map((p) => (
              <div key={p.party} className={`${p.bg} border ${p.border} rounded-2xl p-4 text-center`}>
                <p.Icon className={`w-9 h-9 mx-auto mb-2 ${p.text}`} />
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
                  {usd2(basket)} basket — the {usd2(aboveCap)} above the {usd(BASKET_CAP)} cap stays with the
                  retailer.
                </div>
              )}
              <div className="text-slate-400 text-xs mt-3">
                Qualifying spend is capped at {usd(BASKET_CAP)} and the traveller discount at {usd2(DISCOUNT_CAP)},
                so the platform fee tops out at {usd2(BASKET_CAP * MODEL.platformFee)} per transaction. The
                retailer keeps the balance of the sale.
              </div>
            </div>

            <div
              className="rounded-2xl p-5 text-white"
              style={{ background: "linear-gradient(135deg, #952d8b 0%, #6b1f66 100%)" }}
            >
              <h3 className="font-bold mb-3">Your Only Cost Is the 2.5% Platform Fee</h3>
              <div className="space-y-2 text-sm">
                {[
                  "Charged only on DutyBoost-validated transactions",
                  "Never applied to your existing, non-DutyBoost sales",
                  "No upfront cost, no subscription, no integration fee",
                  "Attributed and reported per transaction, automatically",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-200 mt-2 flex-shrink-0" />
                    <span className="text-purple-50">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-purple-100 text-sm mt-3 leading-snug">
                The traveller arrives already activated — the acquisition was funded by DutyBoost before they
                reached Trinidad &amp; Tobago.
              </p>
            </div>
          </div>

          <div className="mt-4 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-slate-700 text-sm leading-relaxed">
              <span className="font-bold">Customer acquisition cost happens after the sale — not before.</span> The
              retailer spends nothing to acquire the traveller: each DutyCredit redemption is validated through the
              POS and settled only once the sale is made, so every transaction is fully traceable and attributable.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}