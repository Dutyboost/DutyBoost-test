import { BarChart3, Cpu } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import AirportRetailerIcon from "@/components/AirportRetailerIcon";
import TravelerIcon from "@/components/TravelerIcon";

// One $115 qualifying sale — the mid tier, and the most common basket in the mix.
const BASKET = 115;
const DISCOUNT_RATE = 0.1;
const FEE_RATE = 0.025;
const POS_SHARE = 0.1;

const travellerSaves = BASKET * DISCOUNT_RATE;
const fee = BASKET * FEE_RATE;
const posCommission = fee * POS_SHARE;
const dutyboost = fee - posCommission;
const retailerKeeps = BASKET - travellerSaves - fee;

const PARTIES = [
  {
    party: "Traveller",
    Icon: TravelerIcon,
    value: `$${travellerSaves.toFixed(2)}`,
    sub: "DutyCredit saving (10%)",
    bg: "bg-green-50",
    border: "border-green-200",
    text: "text-green-600",
  },
  {
    party: "Retailer",
    Icon: AirportRetailerIcon,
    value: `$${retailerKeeps.toFixed(2)}`,
    sub: "Net before normal costs (87.5%)",
    bg: "bg-blue-50",
    border: "border-blue-200",
    text: "text-blue-600",
  },
  {
    party: "DutyBoost",
    Icon: BarChart3,
    value: `$${dutyboost.toFixed(2)}`,
    sub: "Share of the 2.5% platform fee",
    bg: "bg-orange-50",
    border: "border-orange-200",
    text: "text-orange-600",
  },
  {
    party: "POS Provider",
    Icon: Cpu,
    value: `$${posCommission.toFixed(2)}`,
    sub: "10% of the platform fee",
    bg: "bg-violet-50",
    border: "border-violet-200",
    text: "text-violet-600",
  },
];

export default function SlideTransaction() {
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
              ${BASKET} Standard-Tier Qualifying Sale
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Every validated sale is split at the moment of checkout — including the POS provider's share, which
              is settled automatically with no invoice and no reconciliation.
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
              <div className="text-slate-500 text-xs uppercase tracking-wide mb-2">Total = ${BASKET}.00</div>
              <div className="flex h-6 rounded-full overflow-hidden gap-px">
                <div className="bg-green-500" style={{ width: "10%" }} />
                <div className="bg-blue-500" style={{ width: "87.5%" }} />
                <div className="bg-orange-500" style={{ width: "2.25%" }} />
                <div className="bg-violet-500" style={{ width: "0.25%" }} />
              </div>
              <div className="flex gap-3 mt-2 text-xs flex-wrap">
                {[
                  { color: "bg-green-500", label: "Traveller 10%" },
                  { color: "bg-blue-500", label: "Retailer 87.5%" },
                  { color: "bg-orange-500", label: "DutyBoost 2.25%" },
                  { color: "bg-violet-500", label: "POS provider 0.25%" },
                ].map((l) => (
                  <div key={l.label} className="flex items-center gap-1.5">
                    <div className={`w-3 h-3 rounded-sm ${l.color}`} />
                    <span className="text-slate-600">{l.label}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">
                Tier mix, blended basket and discount assumptions are on the transaction-mix slide. The 10% POS
                share applies to the platform fee, not the basket.
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