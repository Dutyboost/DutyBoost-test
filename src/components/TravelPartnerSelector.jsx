import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { Search, MapPin, X, Plane, Globe, Loader2, BedDouble, Car } from "lucide-react";
import { TRAVEL_PARTNERS, PARTNER_CONTINENTS } from "../data/travelPartners";
import { fmtNum } from "../utils/formatNumber";
import { base44 } from "@/api/base44Client";

// Shared cache across all selector instances — repeated searches return instantly
const webSearchCache = {};

const VERTICAL_CONFIG = {
  flight: {
    label: "airline, OTA, tour operator, or travel agency that sells flight tickets",
    placeholder: "Search airlines, OTAs, tour operators, travel agencies…",
    searchHeading: "Search your organisation to calculate your potential revenue",
    searchDesc: "Not listed above? Search any airline, OTA, tour operator, or travel agency worldwide",
    Icon: Plane,
  },
  accommodation: {
    label: "hotel chain, booking platform, or accommodation provider",
    placeholder: "Search hotel chains, booking platforms, resorts…",
    searchHeading: "Search your property to calculate your potential revenue",
    searchDesc: "Not listed above? Search any hotel chain or accommodation provider worldwide",
    Icon: BedDouble,
  },
  car: {
    label: "car rental company",
    placeholder: "Search car rental companies…",
    searchHeading: "Search your company to calculate your potential revenue",
    searchDesc: "Not listed above? Search any car rental company worldwide",
    Icon: Car,
  },
};

export default function TravelPartnerSelector({ vertical, selectedPartner, onSelect, t }) {
  const [query, setQuery] = useState("");
  const [continent, setContinent] = useState("all");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [webSearching, setWebSearching] = useState(false);
  const [webError, setWebError] = useState("");
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const searchIdRef = useRef(0);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Memoized base list — only recomputes when vertical or continent changes
  const baseList = useMemo(
    () => TRAVEL_PARTNERS.filter(
      (p) => p.vertical === vertical && (continent === "all" || p.continent === continent)
    ),
    [vertical, continent]
  );

  // Pre-built lowercase search index — avoids calling .toLowerCase() on every field of every entry per keystroke
  const searchIndex = useMemo(
    () => baseList.map((p) => ({
      partner: p,
      searchText: `${p.company_name} ${p.country} ${p.continent} ${(p.hubs || []).join(" ")}`.toLowerCase(),
    })),
    [baseList]
  );

  // Memoized filtered results — recomputes only when query or baseList changes, not on hover/highlight changes
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return baseList.slice(0, 30);
    return searchIndex
      .filter((entry) => entry.searchText.includes(q))
      .map((entry) => entry.partner)
      .slice(0, 30);
  }, [query, searchIndex, baseList]);

  // Web search is manual-only — the LLM call takes seconds, so auto-firing on every
  // keystroke with no static match made typing feel frozen. Static search is instant.

  const hasStaticResults = filtered.length > 0;
  const canSearchWeb = query.trim().length >= 2 && !webSearching;

  const handleWebSearch = useCallback(async (searchQuery) => {
    const q = (searchQuery ?? query).trim();
    if (q.length < 2) return;

    const cacheKey = `${vertical}:${q.toLowerCase()}`;

    // Instant return from cache
    if (webSearchCache[cacheKey]) {
      const cached = webSearchCache[cacheKey];
      if (cached.found && cached.annual_bookings > 0) {
        handleSelect(cached);
      } else {
        setWebError(t('calculator.partner_web_not_found'));
      }
      return;
    }

    const mySearchId = ++searchIdRef.current;
    setWebSearching(true);
    setWebError("");
    try {
      const prompt = `Find "${q}" annual volume. Vertical: ${vertical} only. Return: company_name, country, continent, annual_bookings (number), booking_unit, hubs (array), description, found (boolean). Estimate if no public data.`;

      const response = await base44.integrations.Core.InvokeLLM({
        prompt,
        add_context_from_internet: true,
        model: "gemini_3_flash",
        response_json_schema: {
          type: "object",
          properties: {
            company_name: { type: "string" },
            country: { type: "string" },
            continent: { type: "string" },
            annual_bookings: { type: "number" },
            booking_unit: { type: "string" },
            hubs: { type: "array", items: { type: "string" } },
            description: { type: "string" },
            found: { type: "boolean" },
          },
          required: ["company_name", "country", "continent", "annual_bookings", "booking_unit", "found"],
        },
      });

      // Stale guard — a newer search superseded this one
      if (mySearchId !== searchIdRef.current) return;

      const partner = {
        ...response,
        vertical,
        annual_bookings: Math.round(response.annual_bookings) || 0,
        monthly_bookings: Math.round((response.annual_bookings || 0) / 12),
      };

      webSearchCache[cacheKey] = partner;

      if (response.found && response.annual_bookings > 0) {
        handleSelect(partner);
      } else {
        setWebError(t('calculator.partner_web_not_found'));
      }
    } catch (err) {
      if (mySearchId !== searchIdRef.current) return;
      setWebError(t('calculator.partner_web_error'));
    } finally {
      if (mySearchId === searchIdRef.current) {
        setWebSearching(false);
      }
    }
  }, [query, vertical, t]);

  const handleSelect = (partner) => {
    onSelect(partner);
    setQuery("");
    setIsOpen(false);
    setHighlightIndex(0);
    setWebError("");
  };

  const handleClear = () => {
    onSelect(null);
    setQuery("");
    setWebError("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
        return;
      }
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlightIndex]) handleSelect(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const unitLabel = (unit) => {
    if (unit === "passengers") return t('calculator.partner_unit_passengers');
    if (unit === "bookings") return t('calculator.partner_unit_bookings', { defaultValue: 'bookings / yr' });
    if (unit === "reservations") return t('calculator.partner_unit_reservations');
    return t('calculator.partner_unit_rentals');
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('calculator.partner_select_label')}</p>
          <h3 className="font-bold text-slate-900 text-base">{t('calculator.partner_select_title')}</h3>
          <p className="text-slate-600 text-sm mt-0.5">{t('calculator.partner_select_desc')}</p>
        </div>
        {(() => { const VIcon = VERTICAL_CONFIG[vertical].Icon || Plane; return <VIcon className="w-6 h-6 text-slate-400" />; })()}
      </div>

      {/* Continent filter pills */}
      <div className="flex flex-wrap gap-1.5">
        <button
          onClick={() => { setContinent("all"); setHighlightIndex(0); }}
          className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${continent === "all" ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
        >
          {t('calculator.partner_all_continents') || "All"}
        </button>
        {PARTNER_CONTINENTS.map((c) => (
          <button
            key={c}
            onClick={() => { setContinent(c); setHighlightIndex(0); }}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${continent === c ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <div ref={containerRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={selectedPartner ? selectedPartner.company_name : query}
            onChange={(e) => {
              if (selectedPartner) {
                onSelect(null);
                setQuery(e.target.value);
              } else {
                setQuery(e.target.value);
              }
              setWebError("");
              setIsOpen(true);
              setHighlightIndex(0);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={VERTICAL_CONFIG[vertical].placeholder}
            className="w-full pl-10 pr-10 py-3.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
          {selectedPartner && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full max-h-80 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg">
            {hasStaticResults && (
              filtered.map((partner, idx) => (
                <button
                  key={partner.company_name + idx}
                  onClick={() => handleSelect(partner)}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors border-b border-slate-100 last:border-b-0 ${
                    idx === highlightIndex ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-slate-900 truncate">{partner.company_name}</p>
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">{partner.continent}</span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {partner.country}
                      {partner.hubs && partner.hubs.length > 0 && (
                        <span className="text-slate-400">· {t('calculator.partner_hubs')}: {partner.hubs.join(", ")}</span>
                      )}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-blue-600">{fmtNum(partner.annual_bookings)}</p>
                    <p className="text-xs text-slate-400">{unitLabel(partner.booking_unit)}</p>
                  </div>
                </button>
              ))
            )}

            {/* Web search — manual click. LLM call takes seconds, so never auto-fire. */}
            {!hasStaticResults && query.trim().length >= 2 && (canSearchWeb || webSearching) && (
              <button
                onClick={() => !webSearching && handleWebSearch()}
                disabled={webSearching}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors border-t-2 border-blue-100 ${
                  webSearching ? "bg-blue-50 opacity-70 cursor-wait" : "hover:bg-blue-50 cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-100 text-blue-600 shrink-0">
                  {webSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-blue-700">
                    {webSearching ? t('calculator.partner_web_searching') : VERTICAL_CONFIG[vertical].searchHeading}
                  </p>
                  <p className="text-xs text-slate-500">
                    {webSearching ? t('calculator.partner_web_searching_desc') : VERTICAL_CONFIG[vertical].searchDesc}
                  </p>

                </div>
              </button>
            )}

            {webError && (
              <div className="px-4 py-3 text-sm text-red-600 bg-red-50 border-t border-slate-100">
                {webError}
              </div>
            )}

            {!hasStaticResults && !canSearchWeb && !webSearching && (
              <div className="px-4 py-6 text-sm text-slate-500 text-center">
                {t('calculator.partner_no_results')}
              </div>
            )}
          </div>
        )}
      </div>

      {selectedPartner && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-slate-900">{selectedPartner.company_name}</p>
                <span className="text-[10px] font-medium text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">{selectedPartner.continent}</span>

              </div>
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selectedPartner.country}
                {selectedPartner.hubs && selectedPartner.hubs.length > 0 && (
                  <span className="text-slate-500">· {t('calculator.partner_hubs')}: {selectedPartner.hubs.join(", ")}</span>
                )}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">{selectedPartner.description}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">{t('calculator.partner_annual_bookings')}</p>
            <p className="text-xl font-bold text-blue-600">{fmtNum(selectedPartner.annual_bookings)}</p>
            <p className="text-xs text-slate-400">{t('calculator.partner_monthly_avg')}: {fmtNum(selectedPartner.monthly_bookings)}</p>
            <p className="text-xs text-slate-500 mt-1">{unitLabel(selectedPartner.booking_unit)}</p>
          </div>
        </div>
      )}
    </div>
  );
}