import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
  { key: "quick", labelKey: "entCalc.mode_quick", icon: Zap, descKey: "entCalc.mode_quick_desc" },
  { key: "detailed", labelKey: "entCalc.mode_detailed", icon: SlidersHorizontal, descKey: "entCalc.mode_detailed_desc" },
  { key: "enterprise", labelKey: "entCalc.mode_enterprise", icon: Briefcase, descKey: "entCalc.mode_enterprise_desc" },
];

export default function EnterpriseCalculator() {
  const { t } = useTranslation();
  const [mode, setMode] = useState("quick");
  const [retailerKey, setRetailerKey] = useState(null);
  const [selectedCodes, setSelectedCodes] = useState(new Set());
  const [assumptions, setAssumptions] = useState({ redemptionRate: 0.01, customBasket: null });
  const [scenarios, setScenarios] = useState([]);

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

  const benchmarks = useMemo(() => computeSelectionBenchmarks(selectedAirports, retailer?.demoRetailers), [selectedAirports, retailer]);
  const projections = useMemo(() => computeProjections(benchmarks, assumptions), [benchmarks, assumptions]);
  const regionBreakdown = useMemo(() => computeRegionBreakdown(selectedAirports, assumptions, retailer?.demoRetailers), [selectedAirports, assumptions, retailer]);
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
              <span className="hidden sm:inline">{t(m.labelKey)}</span>
              <span className="sm:hidden">{t(m.labelKey).split(" ")[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-2 text-xs text-slate-500 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
        <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
        <span>
          {mode === "quick" && t("entCalc.mode_quick_info")}
          {mode === "detailed" && t("entCalc.mode_detailed_info")}
          {mode === "enterprise" && t("entCalc.mode_enterprise_info")}
        </span>
      </div>

      <div className="bg-slate-900 text-white rounded-xl px-4 py-3 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
        <p className="text-xs leading-relaxed text-slate-200" dangerouslySetInnerHTML={{ __html: t("entCalc.etrc_note") }} />
      </div>

      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("entCalc.step1")}</p>
        <RetailerSearchDropdown selected={retailer} onSelect={handleRetailerSelect} />
      </div>

      {!retailer ? (
        <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
          <Building2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-slate-400 text-sm">{t("entCalc.select_retailer_placeholder")}</p>
        </div>
      ) : (
        <>
          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("entCalc.step2")}</p>
            <div className="bg-white border border-slate-200 rounded-2xl p-5">
              <NetworkSelector
                airports={retailer.airports}
                selectedCodes={selectedCodes}
                onToggleCodes={handleToggleCodes}
                mode={mode}
              />
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("entCalc.step3")}</p>
            <BenchmarkPanel
              benchmarks={benchmarks}
              assumptions={assumptions}
              onAssumptionChange={handleAssumptionChange}
              editable={mode !== "quick"}
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("entCalc.step4")}</p>
            <SummaryCards
              retailer={retailer}
              selectedCount={selectedAirports.length}
              countryCount={countryCount}
              benchmarks={benchmarks}
              projections={projections}
            />
          </div>

          <div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("entCalc.analytics")}</p>
            <CalculatorCharts
              regionBreakdown={regionBreakdown}
              monthlyData={projections.monthlyData}
              topAirports={topAirports}
            />
          </div>

          {mode === "enterprise" && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">{t("entCalc.step5")}</p>
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