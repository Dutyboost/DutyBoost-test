import { SlideWrapper, GridBg, Glow, SlideHeader, CARD } from "@/components/phygrid-pitch/Shared";
import { MARKET_LINK, NON_PURCHASE_LINK } from "@/components/phygrid-pitch/model";
import { Users, Plane, Briefcase, TrendingUp } from "lucide-react";

const sources = [
  { Icon: Users, title: "Direct Travellers", desc: "Travellers generate their own DutyCredits on the DutyBoost platform ahead of departure." },
  { Icon: Plane, title: "Travel Partners", desc: "Airlines, OTAs, hotels and car rental companies distribute DutyCredits with their booking confirmations." },
  { Icon: Briefcase, title: "Corporate Travel", desc: "DutyCredits embedded in corporate travel and expense programmes, redeemed by business travellers." },
];

export default function SlideOpportunity() {
  const stats = [
    {
      value: "€37.1B",
      label: "Airport duty-free & travel retail market",
      source: "DutyBoost estimate — Grand View Research",
      href: MARKET_LINK,
    },
    {
      value: "73%",
      label: "Of airport passengers currently leave without purchasing",
      source: "m1nd-set (via DFNI)",
      href: NON_PURCHASE_LINK,
    },
    { value: "10%", label: "Of every DutyBoost platform fee earned by Phygrid" },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <Glow className="top-0 left-0 w-[420px] h-[420px]" />
        <div className="relative z-10">
          <SlideHeader
            eyebrow="The Opportunity"
            title={<>73% of Travellers Leave Avolta's Stores <span className="text-[#00E5FF]">Without Buying</span></>}
            subtitle="DutyBoost activates airport shoppers before they reach the terminal. Every DutyCredit is redeemed inside a participating store — and every redemption is validated at the POS layer Phygrid already provides."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
            {sources.map((s) => (
              <div key={s.title} className={`${CARD} p-5`}>
                <div className="w-10 h-10 rounded-xl bg-[#00E5FF]/10 border border-[#00E5FF]/30 flex items-center justify-center mb-3">
                  <s.Icon className="w-5 h-5 text-[#00E5FF]" />
                </div>
                <div className="text-white font-semibold text-sm md:text-base">{s.title}</div>
                <div className="text-slate-400 text-xs md:text-sm mt-1 leading-relaxed">{s.desc}</div>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((s) => (
              <div key={s.label} className={`${CARD} p-5 text-center`}>
                <div className="text-2xl font-bold text-[#00E5FF]">{s.value}</div>
                <div className="text-slate-400 text-xs mt-1 leading-snug">{s.label}</div>
                {s.href && (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-[11px] text-[#00E5FF]/80 underline decoration-[#00E5FF]/40 hover:text-[#00E5FF] hover:decoration-[#00E5FF] transition-colors mt-1.5"
                  >
                    Source: {s.source}
                  </a>
                )}
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-2xl p-5 bg-gradient-to-r from-[#00E5FF]/15 to-transparent border border-[#00E5FF]/30 flex items-start gap-3">
            <TrendingUp className="w-5 h-5 text-[#00E5FF] flex-shrink-0 mt-0.5" />
            <p className="text-slate-200 text-sm md:text-base leading-relaxed">
              <span className="font-bold text-white">Whichever source the DutyCredit comes from, the redemption lands in an Avolta store and is validated at the POS</span> — making Phygrid the participant that earns on every one.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}