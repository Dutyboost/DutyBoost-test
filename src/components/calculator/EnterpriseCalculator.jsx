import { useState, useMemo, useEffect } from "react";
import { Zap, SlidersHorizontal, Briefcase, Building2, Info } from "lucide-react";
import RetailerSearchDropdown from "./RetailerSearchDropdown";
import NetworkSelector from "./NetworkSelector";
import BenchmarkPanel from "./BenchmarkPanel";
import SummaryCards from "./SummaryCards";
import CalculatorCharts from "./CalculatorCharts";
import EnterpriseActions from "./EnterpriseActions";
import {
  getRetailerByKey,
  computeSelectionBenchmarks,
  computeProjections,
  computeRegionBreakdown,
  computeTopAirports,
  getSelectedCountries,
} from "@/data/enterpriseCalculator";

const MODES = [
  { key: "quick", label: "Quick Estimate", icon: Zap, desc: "Retailer + region only" },
  { key: "detailed", label: "Detailed Estimate", icon: SlidersHorizontal, desc: "Full control" },
  { key: "enterprise", label: "Enterprise", icon: Briefcase, desc: "Multi-scenario + export" },
];

export default function EnterpriseCalculator() {
  const [mode, setMode] = useState("quick");
  const [retailerKey, setRetailerKey] = useState(null);
  const [selectedCodes, setSelectedCodes] = useState(new Set());
  const [assumptions, setAssumptions] = useState({ redemptionRate: 0.01, customBasket: null });
  const [scenarios, setScenarios] = useState([]);

  // Load from URL params (shared links)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rKey = params.get("retailer");
    if (rKey) {
      const r = getRetailerByKey(rKey);
      if (r) {
        setRetailerKey(r.key);
        setSelectedCodes(new Set(r.airports.map((a) => a.code)));
        setMode("enterprise");
      }
    }
  }, []);

  const retailer = useMemo(() => (retailerKey ? getRetailerByKey(retailerKey) : null), [retailerKey]);

  const handleRetailerSelect = (r) => {
    setRetailerKey(r?.key || null);
    if (r) {
      setSelectedCodes(new Set(r.airports.map((a) => a.code)));
    } else {
      setSelectedCodes(new Set());
    }
    setScenarios([]);
  };

  const handleToggleCodes = (codes, select) => {
    setSelectedCodes((prev) => {
      const next = new Set(prev);
      if (select) codes.forEach((c) => next.add(c));
      else codes.forEach((c) => next.delete(c));
      return next;
    });
  };

  const handleAssumptionChange = (key, value) => {
    setAssumptions((prev) => ({ ...prev, [key]: value }));
  };

  const selectedAirports = useMemo(() => {
    if (!retailer) return [];
    return retailer.airports.filter((a) => selectedCodes.has(a.code));
  }, [retailer, selectedCodes]);

  const benchmarks = useMemo(() => computeSelectionBenchmarks(selectedAirports), [selectedAirports]);
  const projections = useMemo(() => computeProjections(benchmarks, assumptions), [benchmarks, assumptions]);
  const regionBreakdown = useMemo(() => computeRegionBreakdown(selectedAirports, assumptions), [selectedAirports, assumptions]);
  const topAirports = useMemo(() => computeTopAirports(selectedAirports), [selectedAirports]);
  const countryCount = useMemo(() => getSelectedCountries(selectedAirports), [selectedAirports]);

  const handleSaveScenario = () => {
    const name = `Scenario ${scenarios.length + 1}`;
    setScenarios((prev) => [
      ...prev,
      {
        id: `s${Date.now()}`,
        name,
        retailerName: retailer?.name || "—",
        airportCount: selectedAirports.length,
        netRevenue: projections.retailerNetRevenue,
      },
    ]);
  };

  const handleDeleteScenario = (id) => {
    setScenarios((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Mode tabs */}
      <div className="grid grid-cols-3 gap-2 bg-slate-100 border border-slate-200 rounded-2xl p-1.5">
        {MODES.map((m) => {
          const active = mode === m.key;
          const Icon = m.icon;
          return (
            <button
              key={m.key}
              onClick={() => setMode(m.key)}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                active ? "bg-white text-primary shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{m.label}</span>
              <span className="sm:hidden">{m.label.split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      {/* Mode description */}
      <div className="flex items-center gap-2 text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
        <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <span>
          {mode === "quick" && "Quick mode: select a retailer and region — all benchmarks auto-populate. No manual input required."}
          {mode === "detailed" && "Detailed mode: fine-tune assumptions, select specific countries and airports, adjust conversion rates."}
          {mode === "enterprise" && "Enterprise mode: save multiple scenarios, compare side-by-side, export branded PDF, share reports, and request meetings."}
        </span>
      </div>

      {/* Step 1: Retailer selector */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Step 1 — Airport Retailer</p>
        <RetailerSearchDropdown selected={retailer} onSelect={handleRetailerSelect} />
      </div>

      {!retailer ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">Select an airport retailer above to auto-load network data</p>
        </div>
      ) : (
        <>
          {/* Step 2-3: Network selector */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Step 2 — Select Network Scope</p>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <NetworkSelector
                airports={retailer.airports}
                selectedCodes={selectedCodes}
                onToggleCodes={handleToggleCodes}
                mode={mode}
              />
            </div>
          </div>

          {/* Step 4: Benchmark panel */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Step 3 — Auto-Preloaded Benchmarks</p>
            <BenchmarkPanel
              benchmarks={benchmarks}
              assumptions={assumptions}
              onAssumptionChange={handleAssumptionChange}
              editable={mode !== "quick"}
            />
          </div>

          {/* Step 5: Summary cards */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Step 4 — Live Summary</p>
            <SummaryCards
              retailer={retailer}
              selectedCount={selectedAirports.length}
              countryCount={countryCount}
              benchmarks={benchmarks}
              projections={projections}
            />
          </div>

          {/* Charts */}
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Analytics</p>
            <CalculatorCharts
              regionBreakdown={regionBreakdown}
              monthlyData={projections.monthlyData}
              topAirports={topAirports}
            />
          </div>

          {/* Step 6: Enterprise actions */}
          {mode === "enterprise" && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">Step 5 — Enterprise Tools</p>
              <EnterpriseActions
                retailer={retailer}
                benchmarks={benchmarks}
                projections={projections}
                scenarios={scenarios}
                onSaveScenario={handleSaveScenario}
                onDeleteScenario={handleDeleteScenario}
              />
            </div>
          )}
        </>
      )}
    </div>
  );
}