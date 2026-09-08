import { TrendingDown, TrendingUp, AlertCircle } from "lucide-react";

function SlideWrapper({ children }) {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#0a0f1e]">
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

export default function SlideRevenueDip() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Retailer Revenue Trajectory</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A Temporary Dip, <span className="text-blue-600">Followed by Sustained Growth</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <svg viewBox="0 0 600 300" className="w-full">
                <line x1="60" y1="30" x2="60" y2="270" stroke="#cbd5e1" strokeWidth="2" />
                <polygon points="60,20 55,32 65,32" fill="#cbd5e1" />
                <line x1="60" y1="270" x2="570" y2="270" stroke="#cbd5e1" strokeWidth="2" />
                <text x="575" y="275" fill="#64748b" fontSize="16">Δ</text>
                <text x="25" y="150" fill="#64748b" fontSize="11" transform="rotate(-90, 25, 150)">Revenue</text>
                <text x="60" y="288" fill="#64748b" fontSize="10">2025</text>
                <text x="200" y="288" fill="#64748b" fontSize="10">2026</text>
                <text x="340" y="288" fill="#64748b" fontSize="10">2027</text>
                <text x="480" y="288" fill="#64748b" fontSize="10">2028+</text>
                <line x1="60" y1="160" x2="570" y2="160" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                <text x="400" y="155" fill="#94a3b8" fontSize="10">Without DutyBoost</text>
                <path d="M 60 160 C 90 160, 100 240, 135 240 C 165 240, 185 200, 225 170 L 225 160 L 60 160 Z" fill="#ef4444" fillOpacity="0.08" />
                <path d="M 60 160 C 90 160, 100 240, 135 240 C 165 240, 185 200, 225 170 C 290 115, 390 65, 480 42 C 525 32, 555 27, 575 22" fill="none" stroke="#3b82f6" strokeWidth="3" />
                <circle cx="135" cy="240" r="5" fill="#ef4444" />
                <text x="135" y="262" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">Initial Dip</text>
                <text x="420" y="32" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Sustained Growth</text>
              </svg>
            </div>
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-slate-800">Why a Dip May Occur</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  When DutyBoost launches, the first travellers to redeem DutyCredits are likely to be frequent buyers — passengers who were already purchasing at airport retailers. The 10% discount on their transactions temporarily reduces retailer revenue from these existing buyers before the non-purchasing segment is fully activated.
                </p>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-slate-800">Why It Recovers</h3>
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  As DutyBoost scales and reaches the 73% non-purchasing segment, incremental conversion generates new sales that more than offset the initial discount impact. Each new converted traveller represents net-new revenue the retailer would not have captured — driving sustained growth beyond the dip.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-xs leading-relaxed font-medium">
                    This projection is an assumption based on expected traveller behaviour, not hard facts or guaranteed outcomes. The timing and magnitude of the dip depend on adoption pace, retailer mix, and the ratio of frequent buyers to newly activated travellers at launch.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}