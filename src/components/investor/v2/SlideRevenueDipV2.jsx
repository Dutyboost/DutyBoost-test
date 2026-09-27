import { TrendingDown, TrendingUp, Briefcase, AlertCircle, CheckCircle, Users } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

const GBTA_LINK = "https://gbta.org/global-business-travel-spending-to-hit-record-1-71-trillion-in-2026-while-trips-reach-1-84-billion-says-gbta-forecast/";

export default function SlideRevenueDipV2() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Retailer Revenue Trajectory</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              A 12% Dip from Q4 2026 — <span className="text-blue-600">Saved by Corporate Activation</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-center">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
              <svg viewBox="0 0 600 320" className="w-full">
                {/* Axes */}
                <line x1="60" y1="30" x2="60" y2="270" stroke="#cbd5e1" strokeWidth="2" />
                <polygon points="60,20 55,32 65,32" fill="#cbd5e1" />
                <line x1="60" y1="270" x2="570" y2="270" stroke="#cbd5e1" strokeWidth="2" />
                {/* Y-axis label */}
                <text x="25" y="150" fill="#64748b" fontSize="11" transform="rotate(-90, 25, 150)">Revenue (%)</text>
                {/* Baseline at 100% */}
                <line x1="60" y1="80" x2="570" y2="80" stroke="#94a3b8" strokeWidth="2" strokeDasharray="6,4" />
                <text x="440" y="75" fill="#94a3b8" fontSize="10">Baseline (100%)</text>
                {/* X-axis labels - quarters */}
                <text x="75" y="288" fill="#64748b" fontSize="9">Q4'26</text>
                <text x="140" y="288" fill="#64748b" fontSize="9">Q1'27</text>
                <text x="205" y="288" fill="#64748b" fontSize="9">Q2'27</text>
                <text x="270" y="288" fill="#64748b" fontSize="9">Q3'27</text>
                <text x="335" y="288" fill="#64748b" fontSize="9">Q4'27</text>
                <text x="400" y="288" fill="#64748b" fontSize="9">Q1'28</text>
                <text x="465" y="288" fill="#64748b" fontSize="9">Q2'28</text>
                <text x="530" y="288" fill="#64748b" fontSize="9">Q3'28</text>
                {/* Dip area (red shaded) - 12% dip = revenue drops to 88% */}
                {/* y=80 is 100%, y=270 is 0%. 12% dip = 88% → y = 80 + (12/100)*(270-80) = 80 + 22.8 = ~103 */}
                <path d="M 60 80 L 75 80 C 85 80, 90 103, 110 103 L 140 103 C 160 103, 170 95, 200 88 L 270 82 L 60 82 Z" fill="#ef4444" fillOpacity="0.08" />
                {/* Revenue curve: starts at baseline, dips 12%, then recovers */}
                <path d="M 60 80 L 75 80 C 85 80, 90 103, 110 103 C 130 103, 150 98, 180 93 C 210 88, 250 84, 300 81 C 350 78, 410 72, 470 60 C 510 52, 545 45, 570 38"
                  fill="none" stroke="#3b82f6" strokeWidth="3" />
                {/* Dip annotation */}
                <circle cx="110" cy="103" r="5" fill="#ef4444" />
                <text x="110" y="125" textAnchor="middle" fill="#ef4444" fontSize="11" fontWeight="bold">−12%</text>
                <text x="110" y="138" textAnchor="middle" fill="#ef4444" fontSize="9">Initial Dip</text>
                {/* Corporate activation annotation */}
                <line x1="200" y1="93" x2="200" y2="160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,2" />
                <text x="200" y="175" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Corporate</text>
                <text x="200" y="187" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Partners</text>
                <text x="200" y="199" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">Activate</text>
                {/* Growth annotation */}
                <text x="470" y="55" textAnchor="middle" fill="#3b82f6" fontSize="11" fontWeight="bold">Sustained Growth</text>
                {/* Arrow indicating recovery direction */}
                <path d="M 250 130 L 350 90" fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="4,3" />
                <polygon points="350,90 342,92 345,98" fill="#22c55e" />
              </svg>
            </div>
            <div className="space-y-3">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingDown className="w-5 h-5 text-red-500" />
                  <h3 className="font-bold text-slate-800 text-sm">Why a 12% Dip Occurs (Q4 2026)</h3>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  At launch, the first travellers to redeem DutyCredits are frequent buyers — passengers already purchasing at airport retailers. The DutyCredit discount on their existing transactions temporarily reduces retailer revenue by approximately 12% before the non-purchasing segment is fully activated.
                </p>
              </div>
              <div className="bg-amber-50 border border-amber-300 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-slate-800 text-sm">What Saves the Dip: Corporate Partners</h3>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  Corporate partner activation brings company-paid expense travellers into the ecosystem. These are employees whose airport F&amp;B and retail spend is reimbursed by their employer — they represent guaranteed, predictable redemption volume that offsets the initial discount impact on existing buyers. Each corporate traveller arrives pre-activated with a company-funded DutyCredit, driving net-new transactions the retailer would not have captured.
                </p>
                <div className="mt-2 flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 text-xs font-medium">Company-paid expenses = predictable, high-frequency redemption volume</span>
                </div>
                <div className="mt-2 bg-white/70 rounded-lg p-2 flex items-center gap-2">
                  <Users className="w-5 h-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <span className="text-slate-800 text-sm font-bold">1.8B business trips in 2025</span>
                    <span className="text-slate-500 text-xs ml-1">— the corporate traveller pool DutyBoost activates</span>
                    <div className="text-slate-400 text-xs">
                      <a href={GBTA_LINK} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">(GBTA)</a> — 1.82 billion global business trips
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h3 className="font-bold text-slate-800 text-sm">Why It Recovers &amp; Grows</h3>
                </div>
                <p className="text-slate-600 text-xs leading-relaxed">
                  As corporate travellers and the 73% non-purchasing segment activate, incremental conversion generates new sales that more than offset the initial discount impact — driving sustained growth beyond the dip.
                </p>
              </div>
              <div className="bg-slate-100 border border-slate-300 rounded-xl p-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-slate-600 text-xs leading-relaxed font-medium">
                    This projection is an assumption based on expected traveller behaviour, not hard facts. The 12% figure and Q4 2026 start reflect anticipated launch dynamics — actual timing and magnitude depend on adoption pace and corporate partner onboarding.
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