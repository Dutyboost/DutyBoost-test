import { Fragment } from "react";
import { Search, Video, Camera, Play, MessageCircle, Users } from "lucide-react";

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

const SXM_LINK = "https://www.sintmaartengov.org/news/pages/Passenger-Arrivals-and-Cruise-Arrivals-Show-Growth-in-2025.aspx";

// Sint Maarten 2025 air passenger arrivals by source market (SXM Gov).
// USA, France and Netherlands are published directly; Canada, Other EU and
// Regional/LatAm are derived from the release's regional totals.
const SOURCE_MARKETS = [
  { flag: "🇺🇸", name: "USA", arrivals: "462,038", share: "53.9%" },
  { flag: "🇫🇷", name: "France", arrivals: "87,952", share: "10.3%" },
  { flag: "🇳🇱", name: "Netherlands", arrivals: "85,741", share: "10.0%" },
  { flag: "🇨🇦", name: "Canada", arrivals: "79,577", share: "9.3%" },
  { flag: "🌎", name: "Regional/LatAm", arrivals: "93,200", share: "10.9%" },
  { flag: "🇪🇺", name: "Other EU", arrivals: "47,486", share: "5.5%" },
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
      <div className="flex-1 flex flex-col justify-center px-5 py-5 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3">
            <span className="text-blue-600 text-xs md:text-sm font-semibold uppercase tracking-widest">Customer Acquisition — On Us</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              We Take On the Acquisition Cost. <span className="text-blue-600">You Take the Sale.</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm md:text-base">
              DutyBoost funds and runs the Curiosity Campaign in the countries Sint Maarten's travellers fly from — before they ever reach the terminal.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
            <div className="space-y-3">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
                <h3 className="font-bold text-slate-800 text-sm md:text-base mb-1">Where We Acquire Them — SXM Source Markets</h3>
                <p className="text-slate-500 text-xs leading-snug mb-2">
                  <span className="font-bold text-blue-600">715,308 of Sint Maarten's 855,994 air arrivals (83.6%)</span> come from our four primary source markets — USA, France, Netherlands and Canada. SXM has no domestic flights — 100% of passengers are international.
                </p>
                <div className="grid grid-cols-3 gap-1.5">
                  {SOURCE_MARKETS.map((m) => (
                    <div key={m.name} className="bg-white border border-slate-200 rounded-lg px-1.5 py-2 text-center">
                      <p className="text-base leading-none mb-1">{m.flag}</p>
                      <p className="text-[11px] font-semibold text-slate-700 leading-tight">{m.name}</p>
                      <p className="text-xs text-blue-600 font-bold mt-0.5">{m.arrivals}</p>
                      <p className="text-[10px] text-slate-400 leading-tight">{m.share} of arrivals</p>
                    </div>
                  ))}
                </div>
                <p className="text-slate-400 text-[10px] mt-2 leading-snug">
                  2025 air passenger arrivals, all passengers. Canada, Other EU and Regional/LatAm derived from regional totals —{" "}
                  <a href={SXM_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:text-blue-500">SXM Gov</a>
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
                <h3 className="font-bold text-blue-900 text-sm md:text-base mb-1">How We Acquire Them — The Curiosity Campaign</h3>
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
              <h3 className="font-bold text-slate-800 text-base md:text-lg mb-3">The Curiosity Funnel</h3>
              <div className="space-y-2.5">
                {FUNNEL.map((step, i) => (
                  <Fragment key={step}>
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                      <span className="text-sm md:text-base text-slate-700 leading-snug">{step}</span>
                    </div>
                    {i < FUNNEL.length - 1 && <div className="pl-[11px] text-slate-300 text-sm leading-none">↓</div>}
                  </Fragment>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 h-full">
              <div className="bg-slate-800 text-white rounded-2xl p-4">
                <h3 className="font-bold text-white text-sm md:text-base mb-2">Who Carries the Acquisition Cost?</h3>
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

              <div className="flex-1 flex items-center justify-center text-center bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-4 text-white">
                <p className="font-bold text-base leading-snug">
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