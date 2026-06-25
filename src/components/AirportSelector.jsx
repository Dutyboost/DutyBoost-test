import { useState, useRef, useEffect } from "react";
import { Search, MapPin, Store, X } from "lucide-react";
import { GLOBAL_AIRPORTS } from "../data/globalAirports";
import { fmtNum } from "../utils/formatNumber";
import { estimateAvgBasketSpend } from "../utils/airportBasketEstimate";

export default function AirportSelector({ selectedAirport, onSelect, t }) {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filtered = query.trim()
    ? GLOBAL_AIRPORTS.filter(a => {
        const q = query.toLowerCase();
        return (
          a.name.toLowerCase().includes(q) ||
          a.code.toLowerCase().includes(q) ||
          a.city.toLowerCase().includes(q) ||
          a.country.toLowerCase().includes(q) ||
          (a.region || "").toLowerCase().includes(q)
        );
      }).slice(0, 30)
    : GLOBAL_AIRPORTS.slice(0, 30);

  const handleSelect = (airport) => {
    onSelect(airport);
    setQuery("");
    setIsOpen(false);
    setHighlightIndex(0);
  };

  const handleClear = () => {
    onSelect(null);
    setQuery("");
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
      setHighlightIndex(prev => Math.min(prev + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setHighlightIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[highlightIndex]) handleSelect(filtered[highlightIndex]);
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs text-slate-500 uppercase tracking-widest mb-1">{t('calculator.airport_select_label')}</p>
          <h3 className="font-bold text-slate-900 text-lg">{t('calculator.airport_select_title')}</h3>
          <p className="text-slate-600 text-sm mt-0.5">{t('calculator.airport_select_desc')}</p>
        </div>
        <Store className="w-8 h-8 text-orange-500" />
      </div>

      <div ref={containerRef} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            value={selectedAirport ? selectedAirport.name : query}
            onChange={(e) => {
              if (selectedAirport) {
                onSelect(null);
                setQuery(e.target.value);
              } else {
                setQuery(e.target.value);
              }
              setIsOpen(true);
              setHighlightIndex(0);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder={t('calculator.airport_search_placeholder')}
            className="w-full pl-10 pr-10 py-3.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-xl outline-none focus:border-blue-500 focus:bg-white transition-colors"
          />
          {selectedAirport && (
            <button
              onClick={handleClear}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isOpen && (
          <div className="absolute z-50 mt-1 w-full max-h-72 overflow-y-auto bg-white border border-slate-200 rounded-xl shadow-lg">
            {filtered.length === 0 ? (
              <div className="px-4 py-6 text-sm text-slate-500 text-center">
                {t('calculator.airport_no_results')}
              </div>
            ) : (
              filtered.map((airport, idx) => (
                <button
                  key={airport.code + idx}
                  onClick={() => handleSelect(airport)}
                  onMouseEnter={() => setHighlightIndex(idx)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors border-b border-slate-100 last:border-b-0 ${
                    idx === highlightIndex ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-100 text-blue-700 font-bold text-xs shrink-0">
                    {airport.code}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-slate-900 truncate">{airport.name}</p>
                      <span className="text-[10px] font-medium text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded shrink-0">{airport.region}</span>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {airport.city}, {airport.country}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-blue-600">{fmtNum(airport.daily_pax)}</p>
                    <p className="text-xs text-slate-400">{t('calculator.airport_daily_pax')}</p>
                  </div>
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {selectedAirport && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 text-white font-bold text-sm">
              {selectedAirport.code}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-bold text-slate-900">{selectedAirport.name}</p>
                <span className="text-[10px] font-medium text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded">{selectedAirport.region}</span>
              </div>
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {selectedAirport.city}, {selectedAirport.country}
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-slate-500">{t('calculator.airport_daily_pax')}</p>
            <p className="text-2xl font-bold text-blue-600">{fmtNum(selectedAirport.daily_pax)}</p>
            <p className="text-xs text-slate-400">{t('calculator.airport_annual_pax')}: {fmtNum(selectedAirport.annual_pax)}</p>
            <p className="text-xs text-slate-500 mt-1">{t('calculator.basket_spend')}: <span className="font-bold text-blue-600">€{estimateAvgBasketSpend(selectedAirport)}</span></p>
          </div>
        </div>
      )}
    </div>
  );
}