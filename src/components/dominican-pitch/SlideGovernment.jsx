import { Landmark, ShieldCheck, BarChart3, Globe2, Users2 } from "lucide-react";
import { GOV, SlideShell } from "./Shared";
import { MARKET, usdShort } from "./figures";
import { useNetworkInputs, computeNetwork } from "./NetworkContext";

export default function SlideGovernment() {
  const { inputs } = useNetworkInputs();
  const { year } = computeNetwork(inputs);

  const PILLARS = [
    {
      Icon: Users2,
      title: "Spend retained on Dominican soil",
      body: "Every basket redeemed in a departure hall is spend captured at the last moment of the trip, instead of leaving with the traveller.",
    },
    {
      Icon: BarChart3,
      title: "A digitally recorded sales channel",
      body: "Each redemption is a validated, timestamped transaction. Travel-retail activity that is today largely invisible becomes measurable, store by store.",
    },
    {
      Icon: ShieldCheck,
      title: "No cost to the public purse",
      body: "The model is funded by the transaction, not the budget. There is no subsidy, no grant and no new levy on the traveller or the retailer.",
    },
    {
      Icon: Globe2,
      title: "A Caribbean-built platform, headquartered here",
      body: "The Dominican Republic becomes the regional reference market for a Dutch-Caribbean technology company, with the platform revenue earned and taxed locally.",
    },
  ];

  return (
    <SlideShell
      eyebrow="Value to the Dominican Government"
      eyebrowColor={GOV}
      title={
        <>
          Tourism Growth,{" "}
          <span style={{ color: GOV }}>Converted Into Domestic Value</span>
        </>
      }
      subtitle="The Dominican Republic already competes and wins on arrivals. DutyBoost adds the missing commercial layer: it turns the country's aviation strength into retail activity that stays on the island."
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
          <Landmark className="w-6 h-6 mb-2" style={{ color: GOV }} />
          <div className="text-3xl font-bold" style={{ color: GOV }}>
            {usdShort(year.gross)}
          </div>
          <p className="text-slate-600 text-sm mt-2 leading-snug">
            incremental retail value created a year, at the modelled scenario — activity that does not exist today
          </p>
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
          <div className="text-3xl font-bold" style={{ color: GOV }}>
            {usdShort(year.fee)}
          </div>
          <p className="text-slate-600 text-sm mt-2 leading-snug">
            platform revenue earned by the operating entity in the country, as a taxable base
          </p>
        </div>
        <div className="bg-teal-50 border border-teal-200 rounded-2xl p-5">
          <div className="text-3xl font-bold" style={{ color: GOV }}>
            {MARKET.drPassengers}
          </div>
          <p className="text-slate-600 text-sm mt-2 leading-snug">
            airport passengers already passing through the three gateways each year — the market this reaches
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {PILLARS.map((p) => (
          <div key={p.title} className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <p.Icon className="w-5 h-5" style={{ color: GOV }} />
              <h3 className="font-bold text-[#0a0f1e] text-sm">{p.title}</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-slate-800 text-white rounded-2xl p-5">
        <p className="text-sm leading-relaxed">
          <span className="font-bold">Nothing in this proposal asks the Dominican state to spend, legislate or
          guarantee anything.</span>{" "}
          It asks the country to allow a private, self-funding mechanism to operate inside its existing airports —
          and to be the first market in the Caribbean where it does.
        </p>
      </div>

      <p className="text-slate-400 text-xs mt-3">
        Figures are illustrative, in USD, at the assumptions entered on the model slide and standard DutyBoost
        terms. Tax treatment of platform revenue and of retail sales follows existing Dominican law; DutyBoost
        introduces no new levy and no cost to the traveller.
      </p>
    </SlideShell>
  );
}