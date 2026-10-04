import { SlideWrapper, GridBg, Glow, SlideHeader, CARD } from "@/components/phygrid-pitch/Shared";
import { PER_STORE, ESTATE, ACTIVATION_SENSITIVITY, RATIO, perStoreAt, eur, millions } from "@/components/phygrid-pitch/model";
import { Store, TrendingUp, CheckCircle2 } from "lucide-react";

export default function SlideEstate() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <Glow className="top-0 left-0 w-[420px] h-[420px]" />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="Across the Avolta Estate"
            title={<>The Same Store Economics, <span className="text-[#00E5FF]">Multiplied Across Phygrid's Footprint</span></>}
            subtitle="Every Avolta-operated store Phygrid already connects becomes an independent revenue unit. Store counts below are illustrative of the estate — the economics per store are the ones shown on the previous slides."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {ESTATE.map((t) => (
              <div key={t} className={`${CARD} p-5 text-center`}>
                <div className="flex items-center justify-center gap-2 text-[#00E5FF] text-xs font-semibold uppercase tracking-widest mb-3">
                  <Store className="w-4 h-4" />
                  {t} stores
                </div>
                <div className="text-2xl md:text-3xl font-bold text-white mb-1">{millions(PER_STORE.avoltaNet * t)}</div>
                <div className="text-slate-400 text-xs mb-3">net retail revenue to Avolta</div>
                <div className="border-t border-white/10 pt-3">
                  <div className="text-[#00E5FF] font-bold text-lg">{eur(PER_STORE.phygrid * t)}</div>
                  <div className="text-slate-500 text-xs">annual Phygrid commission</div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className={`${CARD} p-5`}>
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="w-5 h-5 text-[#00E5FF]" />
                <h3 className="text-white font-bold text-sm md:text-base">What Drives the Number</h3>
              </div>
              <div className="space-y-1.5 text-sm">
                {ACTIVATION_SENSITIVITY.map((rate) => {
                  const s = perStoreAt(rate);
                  const isBase = rate === 0.02;
                  return (
                    <div
                      key={rate}
                      className={`flex items-center justify-between py-2 px-3 rounded-lg ${isBase ? "bg-[#00E5FF]/10 border border-[#00E5FF]/30" : ""}`}
                    >
                      <span className={isBase ? "text-[#00E5FF] font-semibold" : "text-slate-400"}>
                        {rate * 100}% activation
                        <span className="text-slate-500 text-xs ml-2">{s.baskets.toLocaleString("en-GB")} baskets</span>
                      </span>
                      <span className={`${isBase ? "text-[#00E5FF] font-bold" : "text-slate-300"} whitespace-nowrap`}>
                        {eur(s.phygrid)} <span className="text-slate-500 text-xs">/ store</span>
                      </span>
                    </div>
                  );
                })}
              </div>
              <p className="text-slate-500 text-[11px] mt-3">
                Phygrid's commission per store scales directly with the activation rate — at zero cost and zero risk.
              </p>
            </div>

            <div className={`${CARD} p-5`}>
              <h3 className="text-white font-bold text-sm md:text-base mb-3">The Ratio That Does Not Move</h3>
              <div className="rounded-xl px-4 py-4 bg-gradient-to-br from-[#00E5FF]/15 to-transparent border border-[#00E5FF]/30 mb-3">
                <div className="text-3xl font-bold text-[#00E5FF] mb-1">€{RATIO} : €1</div>
                <div className="text-slate-300 text-xs md:text-sm">Avolta's net revenue vs Phygrid's commission, on the same transactions.</div>
              </div>
              <ul className="space-y-2">
                {[
                  "100% incremental — earned on sales that otherwise would not happen",
                  "Zero up-front cost — no setup fee, no subscription, no licence",
                  "Performance-based — nothing is charged unless a sale completes",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#00E5FF] flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-xs md:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}