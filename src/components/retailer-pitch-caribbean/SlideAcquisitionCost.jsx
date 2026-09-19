import { Fragment } from "react";
import { ArrowRight, Search, Video, Camera, Play, MessageCircle, Users } from "lucide-react";

function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto bg-white text-[#0a0f1e]">
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-[0.04]" style={{
      backgroundImage: "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

// Sint Maarten source markets — St. Maarten Tourism Bureau visitor arrivals by air.
const SOURCE_MARKETS = [
  { flag: "🇺🇸", name: "USA", visitors: "300K" },
  { flag: "🇫🇷", name: "France", visitors: "120K" },
  { flag: "🇳🇱", name: "Netherlands", visitors: "70K" },
  { flag: "🇨🇦", name: "Canada", visitors: "45K" },
  { flag: "🇬🇧", name: "UK", visitors: "30K" },
];

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
  "Redeems at SXM airport retail",
];

export default function SlideAcquisitionCost() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Customer Acquisition — On Us</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              We Take On the Acquisition Cost.<br />
              <span className="text-blue-600">You Take the Sale.</span>
            </h2>
            <p className="text-slate-500 mt-2 text-sm md:text-base">
              DutyBoost funds and runs the Curiosity Campaign in the countries Sint Maarten's travellers fly from — before they ever reach the terminal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-800 mb-1">Where We Acquire Them — SXM Source Markets</h3>
                <p className="text-slate-500 text-xs mb-3">
                  Over 565,000 annual visitors to Sint Maarten arrive by air from these 5 source markets. Sint Maarten has no domestic flights — 100% of passengers are international.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {SOURCE_MARKETS.map((m) => (
                    <div key={m.name} className="bg-white border border-slate-200 rounded-xl p-3 text-center">
                      <p className="text-xl leading-none mb-1">{m.flag}</p>
                      <p className="text-xs font-semibold text-slate-700 leading-tight">{m.name}</p>
                      <p className="text-xs text-blue-600 font-semibold mt-1">{m.visitors}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5">
                <h3 className="font-bold text-blue-900 mb-1">How We Acquire Them — The Curiosity Campaign</h3>
                <p className="text-slate-600 text-xs italic mb-3">"We don't advertise airport shopping — we advertise curiosity."</p>
                <div className="bg-white border border-blue-200 rounded-xl px-3 py-2 text-center mb-3">
                  <p className="text-xs text-slate-600 italic">"What is a DutyCredit and how do I know if I qualify?"</p>
                </div>
                <div className="flex flex-wrap gap-2 justify-center">
                  {CHANNELS.map(({ icon: Icon, name }) => (
                    <div key={name} className="flex items-center gap-1.5 px-2.5 py-1.5 bg-white border border-slate-200 rounded-full text-xs font-medium text-slate-700">
                      <Icon className="w-3.5 h-3.5 text-blue-600" />
                      {name}
                    </div>
                  ))}
                </div>
                <p className="text-slate-500 text-xs mt-3 text-center">
                  Paid and organic acquisition run by DutyBoost — in the traveller's own language, months before departure.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
                <h3 className="font-bold text-slate-800 mb-3">The Curiosity Funnel</h3>
                <div className="space-y-1.5">
                  {FUNNEL.map((step, i) => (
                    <Fragment key={step}>
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                        <span className="text-xs text-slate-700">{step}</span>
                      </div>
                      {i < FUNNEL.length - 1 && (
                        <div className="pl-[9px]"><ArrowRight className="w-3 h-3 text-slate-300 rotate-90" /></div>
                      )}
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="bg-slate-800 text-white rounded-2xl p-5">
                <h3 className="font-bold text-white mb-3">Who Carries the Acquisition Cost?</h3>
                <div className="space-y-2.5">
                  <div className="bg-red-900/30 border border-red-500/30 rounded-xl p-3">
                    <p className="text-red-300 text-xs font-bold uppercase tracking-wide mb-1">Traditional Retail</p>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Retailer funds ads, promotions and loyalty programmes upfront — and pays whether the traveller buys or not.
                    </p>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-3">
                    <p className="text-green-300 text-xs font-bold uppercase tracking-wide mb-1">With DutyBoost</p>
                    <p className="text-slate-300 text-xs leading-relaxed">
                      Acquisition is funded and executed by DutyBoost in the traveller's home country. The retailer pays $0 until a validated sale.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white">
                <p className="font-bold text-sm leading-snug">
                  The acquisition cost is on us. You pay only the 2.5% platform fee on validated transactions — never on your existing sales.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}