import { BarChart3, Cpu } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";
import { MODEL } from "@/components/phygrid-pitch/model";
import { useEstateInputs, DEFAULT_BASKET } from "@/components/phygrid-pitch/EstateContext";
import { EUR_USD_RATE } from "@/lib/eurUsd";

// Tier bands exactly as shown on the business-model slide (USD). The discount
// rises across each band, so any blended basket — from the $23 minimum up to
// the caps — resolves to a tier and a discount rate.
const TIERS = [
  { tier: "Entry", min: 23, max: 56, discMin: 0.05, discMax: 0.075 },
  { tier: "Boarding", min: 57, max: 113, discMin: 0.075, discMax: 0.1 },
  { tier: "Standard", min: 114, max: 170, discMin: 0.1, discMax: 0.125 },
  { tier: "Plus", min: 171, max: 227, discMin: 0.125, discMax: 0.15 },
  { tier: "Lounge", min: 228, max: 284, discMin: 0.15, discMax: 0.175 },
  { tier: "Premium", min: 285, max: 341, discMin: 0.175, discMax: 0.2 },
  { tier: "VIP", min: 342, max: null, discMin: 0.2, discMax: 0.2 },
];

// Both caps are set in EUR (€60 discount, €25 platform fee) and converted at
// the deck's USD presentation rate.
const DISCOUNT_CAP = Math.round(60 * EUR_USD_RATE * 100) / 100;
const FEE_CAP = Math.round(25 * EUR_USD_RATE * 100) / 100;

const round2 = (n) => Math.round(n * 100) / 100;
const money = (n) =>
  `$${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const whole = (n) => `$${n.toLocaleString("en-US")}`;
const share = (part, wholeValue) =>
  `${round2(wholeValue ? (part / wholeValue) * 100 : 0)}%`;

const tierFor = (basket) =>
  TIERS.find((t) => basket <= (t.max ?? Infinity)) || TIERS[TIERS.length - 1];

const discountFor = (basket) => {
  const t = tierFor(basket);
  if (!t.max || basket <= t.min) return t.discMin;
  const position = (basket - t.min) / (t.max - t.min);
  return t.discMin + position * (t.discMax - t.discMin);
};

export default function SlideTransaction() {
  // The qualifying sale is whatever blended basket is entered on the
  // business-model slide, so both slides always show the same scenario.
  const { inputs } = useEstateInputs();
  const typed =
    inputs.basket === "" || inputs.basket == null ? DEFAULT_BASKET : Number(inputs.basket);
  const basket = Math.max(0, Math.round(typed || 0));

  const tier = tierFor(basket).tier;
  const discount = discountFor(basket);
  const discountCapped = round2(basket * discount) > DISCOUNT_CAP;

  const travellerSaves = Math.min(round2(basket * discount), DISCOUNT_CAP);
  const fee = Math.min(round2(basket * MODEL.platformFee), FEE_CAP);
  const posCommission = round2(fee * MODEL.posShare);
  const dutyboost = round2(fee - posCommission);
  const retailerKeeps = round2(basket - travellerSaves - fee);

  const PARTIES = [
    {
      party: "Traveller",
      Icon: TravelerIcon,
      value: money(travellerSaves),
      raw: travellerSaves,
      sub: discountCapped
        ? `DutyCredit saving (capped at ${money(DISCOUNT_CAP)})`
        : `DutyCredit saving (${round2(discount * 100)}%)`,
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-600",
      color: "bg-green-500",
    },
    {
      party: "Retailer",
      Icon: AirportRetailerIcon,
      value: money(retailerKeeps),
      raw: retailerKeeps,
      sub: `Net before normal costs (${share(retailerKeeps, basket)})`,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-600",
      color: "bg-blue-500",
    },
    {
      party: "DutyBoost",
      Icon: BarChart3,
      value: money(dutyboost),
      raw: dutyboost,
      sub: "Share of the 2.5% platform fee",
      bg: "bg-orange-50",
      border: "border-orange-200",
      text: "text-orange-600",
      color: "bg-orange-500",
    },
    {
      party: "POS Provider",
      Icon: Cpu,
      value: money(posCommission),
      raw: posCommission,
      sub: `${Math.round(MODEL.posShare * 100)}% of the platform fee`,
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-600",
      color: "bg-violet-500",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-6">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              One Transaction — Four Beneficiaries
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              {whole(basket)} {tier}-Tier Qualifying Sale
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Every validated sale is split at the moment of checkout — including the POS provider's share, which
              is settled automatically with no invoice and no reconciliation. The sale follows the blended basket
              entered on the business-model slide.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
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
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">
                Total = {money(basket)}
              </div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                {PARTIES.map((p) => (
                  <div
                    key={p.party}
                    className={p.color}
                    style={{ width: `${basket ? (p.raw / basket) * 100 : 0}%` }}
                  />
                ))}
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {PARTIES.map((p) => (
                  <div key={p.party} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${p.color}`} />
                    <span className="text-slate-600">
                      {p.party === "POS Provider" ? "POS provider" : p.party} {share(p.raw, basket)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">
                The traveller discount rises with the basket and is capped at €60 ({money(DISCOUNT_CAP)}); the
                platform fee is capped at €25 ({money(FEE_CAP)}) per transaction. The{" "}
                {Math.round(MODEL.posShare * 100)}% POS share applies to the platform fee, not the basket.
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
              <h3 className="font-bold mb-3">Integrate Once. Deploy Repeatedly.</h3>
              <p className="text-blue-50 text-sm leading-relaxed">
                A single POS integration enables DutyBoost across every retailer, store, airport and market
                connected to that POS — fundamentally better scaling economics than integrating retailer by
                retailer.
              </p>
              <div className="mt-3 text-blue-100 font-semibold text-sm">
                TECHNOLOGY STRATEGY: INTEGRATE ONCE. DEPLOY REPEATEDLY.
              </div>
            </div>
          </div>

          <div className="mt-5 bg-amber-50 border border-amber-200 rounded-2xl p-4">
            <p className="text-slate-700 text-sm leading-relaxed">
              <span className="font-bold">Small per transaction. Large in aggregate.</span> The commission on a
              single basket is cents — but it is earned on every validated sale, in every store running your POS,
              at no cost and with no incremental work. The next slide shows what that compounds to.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}