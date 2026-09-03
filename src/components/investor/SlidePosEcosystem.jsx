import { Cpu, ChevronDown } from "lucide-react";

const GRID_BG = {
  backgroundImage:
    "linear-gradient(rgba(59,130,246,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.4) 1px, transparent 1px)",
  backgroundSize: "40px 40px",
};

const FACTS = [
  {
    val: "8.3M",
    label: "Installed POS/mPOS systems across the 16 leading enterprise POS providers",
    sub: "IHL Group 2025 POS/mPOS Market Study",
  },
  {
    val: "50 / day",
    label: "Conservative modelling assumption per POS device",
    sub: "≈ 151 billion transactions annually",
  },
  {
    val: "2.6M+",
    label: "POS and self-checkout units Toshiba has installed worldwide",
    sub: "220K+ units shipped in 2025 alone — vendor-disclosed",
  },
  {
    val: "700M",
    label: "Annual transactions across Oracle Xstore deployments — 250+ retailers globally",
    sub: "1.5M daily transactions at a single retailer · 8,000+ store footprints",
  },
  {
    val: "150M",
    label: "Transactions if just 0.1% of the annual enterprise POS volume flows through DutyCredits",
    sub: "≈ €15B retail value · €262.5M DutyBoost infrastructure revenue",
  },
];

export default function SlidePosEcosystem() {
  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#0a0f1e]">
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <div className="absolute inset-0 opacity-[0.04]" style={GRID_BG} />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Infrastructure Reach</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              150+ Billion Annual <span className="text-blue-600">POS Transactions</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-5">
            {/* Three-layer opportunity funnel */}
            <div className="flex flex-col justify-center gap-2">
              <div className="bg-blue-50 border border-blue-200 rounded-2xl px-5 py-3 text-center">
                <div className="text-2xl font-bold text-blue-600 leading-tight">9.8B</div>
                <div className="text-slate-700 font-semibold text-sm">Airport passenger movements</div>
                <div className="text-slate-500 text-xs">Initial commercial market</div>
              </div>
              <ChevronDown className="text-blue-500 w-5 h-5 mx-auto flex-shrink-0" />
              <div className="bg-indigo-50 border border-indigo-200 rounded-2xl px-5 py-3 text-center">
                <div className="text-slate-800 font-semibold text-sm leading-tight">Existing airport retail transactions</div>
                <div className="text-slate-500 text-xs mt-1">Initial commercial focus</div>
              </div>
              <ChevronDown className="text-blue-500 w-5 h-5 mx-auto flex-shrink-0" />
              <div className="bg-slate-800 text-white rounded-2xl px-5 py-4 text-center border border-slate-700">
                <div className="text-2xl md:text-3xl font-bold text-blue-300 leading-tight">150+ Billion</div>
                <div className="text-white text-sm font-semibold mt-1 leading-tight">Annual transactions across the enterprise POS ecosystem</div>
                <div className="text-slate-400 text-xs mt-1">Scalability & infrastructure reach</div>
              </div>
            </div>

            {/* Supporting facts */}
            <div className="flex flex-col gap-3 justify-center">
              {FACTS.map((f) => (
                <div key={f.val} className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 flex items-center gap-4">
                  <div className="text-xl font-bold text-blue-600 whitespace-nowrap">{f.val}</div>
                  <div className="min-w-0">
                    <div className="text-slate-700 text-sm font-semibold leading-tight">{f.label}</div>
                    <div className="text-slate-500 text-xs mt-0.5">{f.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-4 sm:p-5 text-white mb-3">
            <div className="flex items-center gap-4">
              <Cpu className="w-8 h-8 text-blue-200 shrink-0 hidden sm:block" />
              <p className="text-base md:text-lg font-bold leading-snug">
                DutyBoost does not build this transaction infrastructure. It integrates into the existing enterprise POS ecosystem and creates a new attributable revenue layer on top of it.
              </p>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="text-slate-500 text-xs">
              Sources:{" "}
              <a href="https://www.gk-software.com/images/Industry_Recognition/download/20251217_IHL-POS-mPOS%20Market%20Study.pdf" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">IHL Group — The POS/mPOS Market Study 2025 (PDF)</a>
              {" · "}
              <a href="https://commerce.toshiba.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Toshiba Global Commerce — 2025 Shipped & Installed POS Units</a>
              {" · "}
              <a href="https://engage.oracle.com/modernretailpos/items/data-sheet-oracle-micros-workstation-8-series" target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold underline decoration-blue-600/50 hover:decoration-blue-400 hover:text-blue-500 transition-colors">Oracle Retail Xstore Data Sheet (registration required)</a>
            </p>
            <p className="text-slate-400 text-xs">
              Transaction volumes are conservatively modelled from the published installed base — vendor-disclosed volumes confirm the true figure is materially higher. The 0.1% scenario applies the DutyBoost fee structure (2.5% of retail value) at a €100 average basket.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}