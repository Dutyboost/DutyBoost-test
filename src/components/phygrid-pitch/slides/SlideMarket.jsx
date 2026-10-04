import { DollarSign, Building2, Plane, TrendingUp, Globe } from "lucide-react";
import { SlideWrapper, GridBg } from "@/components/phygrid-pitch/Shared";
import { AVOLTA, AVOLTA_FY2025, AVOLTA_H1_2025, AVOLTA_SITE, linkCls } from "@/components/phygrid-pitch/model";

const MOMENTUM = [
  { reg: "Europe, MEA", val: "+9.2%", note: "Largest region; strong EMEA recovery" },
  { reg: "Latin America", val: "+8.1%", note: "Brazil, Mexico, Caribbean growth" },
  { reg: "Asia Pacific", val: "+5.1%", note: "Expanding footprint" },
  { reg: "North America", val: "−0.2%", note: "Hudson; stabilising" },
];

export default function SlideMarket() {
  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-5">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">
              The Estate at a Glance
            </span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The World's Largest Travel Retailer <span className="text-blue-600">Is One Estate</span>
            </h2>
            <p className="text-slate-500 mt-1 text-sm">
              Avolta's published scale is the clearest measure of the travel-retail estate POS providers serve.
              Figures from{" "}
              <a href={AVOLTA_FY2025} target="_blank" rel="noopener noreferrer" className={linkCls}>
                Avolta FY 2025 results
              </a>{" "}
              and{" "}
              <a href={AVOLTA_SITE} target="_blank" rel="noopener noreferrer" className={linkCls}>
                avoltaworld.com
              </a>
              .
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-center">
              <DollarSign className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-blue-700 mb-1">{AVOLTA.turnover}</div>
              <div className="text-slate-600 font-semibold text-sm">Revenue 2025</div>
              <div className="text-slate-500 text-xs mt-1">+1.9% reported</div>
            </div>
            <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-5 text-center">
              <Building2 className="w-8 h-8 text-indigo-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-indigo-700 mb-1">{AVOLTA.outlets}</div>
              <div className="text-slate-600 font-semibold text-sm">Outlets Worldwide</div>
              <div className="text-slate-500 text-xs mt-1">Across {AVOLTA.countries} countries</div>
            </div>
            <div className="bg-violet-50 border border-violet-200 rounded-2xl p-5 text-center">
              <Plane className="w-8 h-8 text-violet-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-violet-700 mb-1">{AVOLTA.passengerReach}</div>
              <div className="text-slate-600 font-semibold text-sm">Passenger Reach</div>
              <div className="text-slate-500 text-xs mt-1">Across {AVOLTA.airports} airports</div>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl md:text-3xl font-bold text-green-700 mb-1">{AVOLTA.ebitda}</div>
              <div className="text-slate-600 font-semibold text-sm">CORE EBITDA 2025</div>
              <div className="text-slate-500 text-xs mt-1">9.7% margin (+0.3pp)</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="font-bold text-slate-700 mb-3">Regional Momentum (H1 2025, organic)</h3>
              <div className="space-y-2 text-sm">
                {MOMENTUM.map((r) => (
                  <div
                    key={r.reg}
                    className="flex items-center gap-3 py-1.5 px-3 rounded-lg bg-white border border-slate-100"
                  >
                    <span className="text-blue-700 font-semibold w-36">{r.reg}</span>
                    <span className="text-green-600 font-bold w-14">{r.val}</span>
                    <span className="text-slate-500 text-xs flex-1">{r.note}</span>
                  </div>
                ))}
              </div>
              <div className="text-slate-400 text-xs mt-3">
                Source:{" "}
                <a href={AVOLTA_H1_2025} target="_blank" rel="noopener noreferrer" className={linkCls}>
                  Avolta H1 2025 results
                </a>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Globe className="w-5 h-5" />
                <h3 className="font-bold">One Estate. Every Store Runs a POS.</h3>
              </div>
              <p className="text-blue-50 text-sm leading-relaxed mb-3">
                This is the scale a single travel retailer reaches — and every outlet in it is served by a POS
                provider. A feature switched on once, at the POS layer, reaches the whole estate without a single
                store-level project.
              </p>
              <div className="grid grid-cols-3 gap-3 text-center">
                {[
                  { val: AVOLTA.locations, label: "Locations" },
                  { val: AVOLTA.countries, label: "Countries" },
                  { val: AVOLTA.airports, label: "Airports" },
                ].map((s) => (
                  <div key={s.label} className="bg-white/10 rounded-lg p-2">
                    <div className="text-sm font-bold">{s.val}</div>
                    <div className="text-blue-200 text-xs">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}