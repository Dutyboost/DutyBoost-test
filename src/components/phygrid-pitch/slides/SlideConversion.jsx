import { SlideWrapper, GridBg, Glow, SlideHeader, CARD } from "@/components/phygrid-pitch/Shared";
import { PER_STORE, RATIO, eur, millions } from "@/components/phygrid-pitch/model";
import { Users, TrendingUp, ShoppingCart, Euro, Store, ArrowRight, CheckCircle2 } from "lucide-react";

export default function SlideConversion() {
  const chain = [
    { Icon: Users, label: "Travellers through the store, per year", value: PER_STORE.travellers.toLocaleString("en-GB") },
    { Icon: TrendingUp, label: "Activated by DutyBoost before departure (2%)", value: PER_STORE.activated.toLocaleString("en-GB") },
    { Icon: ShoppingCart, label: "Convert into an incremental purchase (30%)", value: PER_STORE.baskets.toLocaleString("en-GB") },
    { Icon: Euro, label: "Average basket", value: eur(100) },
  ];

  const split = [
    { party: "Traveller saves", value: eur(PER_STORE.travellerSaving), tone: "text-amber-400" },
    { party: "Avolta store nets", value: eur(PER_STORE.avoltaNet), tone: "text-white" },
    { party: "Phygrid earns", value: eur(PER_STORE.phygrid), tone: "text-[#00E5FF]" },
    { party: "DutyBoost earns", value: eur(PER_STORE.dutyboost), tone: "text-slate-400" },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <Glow className="top-0 left-1/3 w-[420px] h-[420px]" />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="One Store, One Year"
            title={<>Converting Even 2% of Avolta's Travellers <span className="text-[#00E5FF]">Generates {millions(PER_STORE.gross)} in Sales</span></>}
            subtitle="This is a single Avolta-operated store inside Phygrid's estate. DutyBoost does not need a large share of footfall — a small activation rate compounds into material retail value, and every basket carries Phygrid's share."
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
            <div className={`${CARD} p-5`}>
              <div className="flex items-center gap-2 mb-4">
                <Store className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="font-bold text-white text-sm md:text-base">The Conversion Path</h3>
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
              <div className="mt-4 flex items-center justify-between rounded-xl px-4 py-3 bg-[#00E5FF]/10 border border-[#00E5FF]/30">
                <span className="text-[#00E5FF] text-xs md:text-sm font-semibold">Incremental retail sales in the store</span>
                <span className="text-[#00E5FF] font-bold text-lg">{eur(PER_STORE.gross)}</span>
              </div>
              <p className="text-slate-500 text-[11px] mt-2">
                Sales that would not otherwise happen — not a redistribution of existing trade.
              </p>
            </div>

            <div className={`${CARD} p-5`}>
              <h3 className="font-bold text-white text-sm md:text-base mb-4">The Same Store, Split Four Ways</h3>
              <div className="space-y-3">
                {split.map((r) => (
                  <div key={r.party} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-slate-300 text-xs md:text-sm">{r.party}</span>
                    <span className={`font-bold text-sm md:text-base ${r.tone}`}>{r.value}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-xl px-4 py-3 bg-gradient-to-br from-[#00E5FF]/15 to-transparent border border-[#00E5FF]/30">
                <p className="text-slate-200 text-xs md:text-sm leading-relaxed">
                  Avolta earns <span className="font-bold text-[#00E5FF]">€{RATIO} for every €1 Phygrid earns</span> on these transactions. Phygrid's income is the smallest line in the equation — and the one that is pure margin.
                </p>
              </div>
              <div className="mt-3 flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-[11px]">
                  The 2.5% platform fee is charged only on a completed, POS-validated sale. Phygrid receives 10% of it.
                </span>
              </div>
            </div>
          </div>

          <div className={`${CARD} px-5 py-3 flex items-start gap-3`}>
            <ArrowRight className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <p className="text-slate-400 text-[11px] md:text-xs leading-relaxed">
              Illustrative model, not a forecast: 250,000 travellers per store per year, 2% activated by DutyBoost, 30% of those converting into a purchase, €100 average basket, 5% DutyCredit saving.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}