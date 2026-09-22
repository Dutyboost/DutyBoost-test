import { Fragment } from "react";
import { Search, Video, Camera, Play, MessageCircle, Users, Globe } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";
import { GLOBAL_SOURCE_MARKETS } from "@/data/globalAirportRetailMarket";

const UNWTO_LINK = "https://www.unwto.org/";
const TFWA_LINK = "https://www.tfwa.com/";
const M1NDSET_LINK = "https://m1nd-set.com/";

// UNWTO figures are outbound trips only — doubled here to count the return leg too.
const SOURCE_MARKETS = GLOBAL_SOURCE_MARKETS.map((m) => ({
  ...m,
  journeys: `${parseInt(m.visitors, 10) * 2}M`,
}));

const CHANNELS = [
  { icon: Search, name: "Google SEO" },
  { icon: Video, name: "TikTok" },
  { icon: Camera, name: "Instagram Reels" },
  { icon: Play, name: "YouTube Shorts" },
  { icon: MessageCircle, name: "Reddit" },
  { icon: Users, name: "Facebook Groups" },
];

const FUNNEL = [
  "Curiosity Campaign",
  "Traveller sees curiosity content",
  "Visits DutyBoost.com",
  "Checks if they qualify",
  "Claims their free DutyCredit",
  "Arrives with purchase intent",
  "Redeems at airport retail",
];

export default function SlideAcquisitionGlobal() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Customer Acquisition — On Us</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              We Take On the Acquisition Cost. <span className="text-blue-600">You Take the Sale.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              DutyBoost funds and runs the Curiosity Campaign in the traveller's home country — before they ever reach the terminal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="font-bold text-slate-800 text-base mb-1">Where We Acquire Them — Global Source Markets</h3>
                <p className="text-slate-500 text-xs leading-snug mb-3">
                  <span className="font-bold text-blue-600">Over 1.7 billion outbound + return journeys a year</span> originate from our five primary source markets. The campaign runs in the traveller's own language, in every major market worldwide.
                </p>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-1.5">
                  {SOURCE_MARKETS.map((m) => (
                    <div key={m.name} className="bg-white border border-slate-200 rounded-lg px-1.5 py-2 text-center">
                      <p className="text-base leading-none mb-1">{m.flag}</p>
                      <p className="text-[11px] font-semibold text-slate-700 leading-tight">{m.name}</p>
                      <p className="text-xs text-blue-600 font-bold mt-0.5">{m.journeys}</p>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 mt-3 text-slate-500 text-[11px] leading-snug">
                  <Globe className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  <span>
                    Reach across 4,000 commercial airports — 2,800 with duty-free retail. Source:{' '}
                    <a href={UNWTO_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:text-blue-500">UNWTO</a>
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <h3 className="font-bold text-blue-900 text-base mb-1">How We Acquire Them — The Curiosity Campaign</h3>
                <p className="text-slate-600 text-xs italic mb-2">"We don't advertise airport shopping — we advertise curiosity."</p>
                <div className="bg-white border border-blue-200 rounded-lg px-2 py-1.5 text-center mb-2">
                  <p className="text-xs text-slate-600 italic">"What is a DutyCredit and how do I know if I qualify?"</p>
                </div>
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {CHANNELS.map(({ icon: Icon, name }) => (
                    <div key={name} className="flex items-center gap-1 px-2 py-1 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700">
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      {name}
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-[11px] mt-2 text-center leading-snug">
                  Paid and organic acquisition run by DutyBoost — in the traveller's own language, months before departure.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex flex-col justify-center">
              <h3 className="font-bold text-slate-800 text-base mb-3">The Curiosity Funnel</h3>
              <div className="space-y-2">
                {FUNNEL.map((step, i) => (
                  <Fragment key={step}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className="text-sm text-slate-700 leading-snug">{step}</span>
                    </div>
                    {i < FUNNEL.length - 1 && <div className="pl-[11px] text-slate-300 text-sm leading-none">↓</div>}
                  </Fragment>
                ))}
              </div>
              <div className="mt-4 bg-white border border-slate-200 rounded-xl p-3">
                <p className="text-slate-600 text-xs leading-snug">
                  <span className="font-bold text-slate-800">9.6B annual departure moments</span> worldwide — of which 73% currently walk past the stores.{' '}
                  <a href={M1NDSET_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:text-blue-500">m1nd-set</a>
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-4 h-full">
              <div className="bg-slate-800 text-white rounded-2xl p-4">
                <h3 className="font-bold text-white text-base mb-2">Who Carries the Acquisition Cost?</h3>
                <div className="space-y-2">
                  <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-2.5">
                    <p className="text-red-300 text-xs font-bold uppercase tracking-wide mb-1">Traditional Retail</p>
                    <p className="text-slate-300 text-sm leading-snug">
                      Retailer funds ads, promotions and loyalty upfront — and pays whether the traveller buys or not.
                    </p>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-2.5">
                    <p className="text-green-300 text-xs font-bold uppercase tracking-wide mb-1">With DutyBoost</p>
                    <p className="text-slate-300 text-sm leading-snug">
                      Acquisition is funded and executed by DutyBoost in the traveller's home country. The retailer pays $0 until a validated sale.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex-1 flex items-center justify-center text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-5 text-white">
                <p className="font-bold text-lg leading-snug">
                  The acquisition cost is on us. You pay only the 2.5% platform fee on validated transactions — never on your existing sales.
                </p>
              </div>

              <div className="text-slate-400 text-[10px] leading-snug text-center">
                Global DF&amp;TR market: €37.1B at airports —{' '}
                <a href={TFWA_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:text-blue-500">TFWA 2025</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}