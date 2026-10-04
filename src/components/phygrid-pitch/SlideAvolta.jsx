import { SlideWrapper, GridBg, Glow, SlideHeader } from "@/components/phygrid-pitch/Shared";
import { Store, Users, ShoppingCart, TrendingUp, Euro, ArrowRight, CheckCircle2, Maximize2 } from "lucide-react";

const card = "bg-white/[0.04] border border-white/10 rounded-2xl";

// Illustrative per-store model.
// A DutyCredit is only counted here once it converts into an actual purchase.
const A = {
  travellers: 250000,
  activation: 0.02,
  conversion: 0.30,
  basket: 100,
  platformFee: 0.025,
  posShare: 0.10,
};

const activated = Math.round(A.travellers * A.activation);
const baskets = Math.round(activated * A.conversion);
const avoltaPerStore = baskets * A.basket;
const phygridPerStore = avoltaPerStore * A.platformFee * A.posShare;
const ratio = Math.round(avoltaPerStore / phygridPerStore);

const TIERS = [100, 250, 500];

const eur = (n) => `€${n.toLocaleString("en-GB")}`;
const millions = (n) => `€${(n / 1_000_000).toFixed(1)}M`;

export default function SlideAvolta() {
  const chain = [
    { Icon: Users, label: "Travellers through an Avolta-operated store", value: A.travellers.toLocaleString("en-GB") },
    { Icon: TrendingUp, label: "Activated by DutyBoost before departure (2%)", value: activated.toLocaleString("en-GB") },
    { Icon: ShoppingCart, label: "Convert into an incremental purchase (30%)", value: baskets.toLocaleString("en-GB") },
    { Icon: Euro, label: `Average basket`, value: eur(A.basket) },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <Glow className="top-0 left-1/3 w-[420px] h-[420px]" />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="The Avolta Opportunity"
            title={<>A Small Conversion Rate Inside Avolta Stores <span className="text-[#00E5FF]">Is Worth Millions</span></>}
            subtitle="Phygrid already connects the POS estate inside Avolta-operated stores. DutyBoost converts a small share of the travellers passing through those stores into purchasers — creating a documented revenue case Phygrid can take straight back into its Avolta agreement."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            {/* Per-store chain */}
            <div className={`${card} p-5`}>
              <div className="flex items-center gap-2 mb-4">
                <Store className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="font-bold text-white text-sm md:text-base">One Avolta Store, One Year</h3>
              </div>
              <div className="space-y-2">
                {chain.map((c) => (
                  <div key={c.label} className="flex items-center justify-between gap-3 py-1.5 border-b border-white/5 last:border-0">
                    <span className="flex items-center gap-2 text-slate-300 text-xs md:text-sm">
                      <c.Icon className="w-4 h-4 text-[#00E5FF]/70 flex-shrink-0" />
                      {c.label}
                    </span>
                    <span className="text-white font-semibold text-sm whitespace-nowrap">{c.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between rounded-xl px-4 py-3 bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                  <span className="text-[#00E5FF] text-xs md:text-sm font-semibold">Incremental retail revenue to Avolta</span>
                  <span className="text-[#00E5FF] font-bold text-lg">{eur(avoltaPerStore)}</span>
                </div>
                <div className="flex items-center justify-between rounded-xl px-4 py-2.5 bg-white/[0.03] border border-white/10">
                  <span className="text-slate-400 text-xs md:text-sm">Phygrid commission (0.25% of retail value)</span>
                  <span className="text-white font-bold text-base">{eur(phygridPerStore)}</span>
                </div>
              </div>
            </div>

            {/* Scale + leverage */}
            <div className="flex flex-col gap-4">
              <div className={`${card} p-5`}>
                <h3 className="text-white font-bold text-sm md:text-base mb-3">Across Phygrid's Avolta Store Estate</h3>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {TIERS.map((t) => (
                    <div key={t} className="text-center bg-white/[0.03] border border-white/10 rounded-xl py-3 px-2">
                      <div className="text-[11px] uppercase tracking-wide text-slate-500 mb-2">{t} stores</div>
                      <div className="text-[#00E5FF] font-bold text-sm md:text-base leading-tight">{millions(avoltaPerStore * t)}</div>
                      <div className="text-[10px] text-slate-500 mb-2 leading-tight">to Avolta</div>
                      <div className="text-white font-semibold text-xs md:text-sm leading-tight">{eur(phygridPerStore * t)}</div>
                      <div className="text-[10px] text-slate-500 leading-tight">to Phygrid</div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] flex-shrink-0" />
                  Every euro of Avolta revenue above is incremental — earned on sales that would not otherwise happen.
                </div>
              </div>

              <div className="rounded-2xl p-5 bg-gradient-to-br from-[#00E5FF]/15 to-transparent border border-[#00E5FF]/30">
                <div className="flex items-center gap-2 mb-2">
                  <Maximize2 className="w-5 h-5 text-[#00E5FF]" />
                  <h3 className="text-white font-bold text-sm md:text-base">Why This Grows Phygrid's Footprint with Avolta</h3>
                </div>
                <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
                  On the same transaction, Avolta earns roughly <span className="font-bold text-[#00E5FF]">€{ratio} for every €1 Phygrid earns</span>. That ratio is the negotiating position: it turns the POS layer inside Avolta stores from a cost line into a measured revenue contributor — the evidence that supports additional deployments, renewals and expanded scope.
                </p>
                <div className="mt-3 flex items-center gap-2 text-[#00E5FF] text-xs md:text-sm font-semibold">
                  <ArrowRight className="w-4 h-4 flex-shrink-0" />
                  More proven value per store → more stores Phygrid is invited into.
                </div>
              </div>
            </div>
          </div>

          <div className={`${card} px-5 py-3 flex items-start gap-3`}>
            <Euro className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed">
              Illustrative model, not a forecast: 250,000 travellers per store per year, 2% activated by DutyBoost, 30% of those converting into a purchase, €100 average basket. DutyBoost's 2.5% platform fee is charged only on a completed, POS-validated sale, of which Phygrid receives 10%. Store counts are illustrative of Phygrid's Avolta estate.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}