import { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, MapPin } from 'lucide-react';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#64748b'];

const GRANULARITIES = [
  { key: 'daily', label: 'Daily', windowSize: 14 },
  { key: 'weekly', label: 'Weekly', windowSize: 8 },
  { key: 'monthly', label: 'Monthly', windowSize: 12 },
  { key: 'yearly', label: 'Yearly', windowSize: 5 },
];

function getPeriodKey(dateStr, granularity) {
  const d = new Date(dateStr);
  if (granularity === 'daily') {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  }
  if (granularity === 'yearly') return String(d.getFullYear());
  if (granularity === 'monthly') {
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
  }
  // weekly — Monday of the week
  const tmp = new Date(d);
  tmp.setHours(0, 0, 0, 0);
  tmp.setDate(tmp.getDate() - ((tmp.getDay() + 6) % 7));
  return `${tmp.getFullYear()}-${String(tmp.getMonth() + 1).padStart(2, '0')}-${String(tmp.getDate()).padStart(2, '0')}`;
}

function formatPeriodLabel(key, granularity) {
  if (granularity === 'yearly') return key;
  if (granularity === 'monthly') {
    const [yr, mo] = key.split('-');
    return new Date(parseInt(yr), parseInt(mo) - 1, 1).toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
  }
  const d = new Date(key);
  return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
}

export default function CountryTimeline({ visits }) {
  const [granularity, setGranularity] = useState('monthly');
  const [offset, setOffset] = useState(0);
  const [selectedPeriod, setSelectedPeriod] = useState(null);
  const [detailExpanded, setDetailExpanded] = useState(false);

  const config = GRANULARITIES.find(g => g.key === granularity);

  // period → country → count
  const periodCountryMap = useMemo(() => {
    const map = {};
    visits.forEach(v => {
      if (!v.created_date) return;
      const country = v.country && v.country !== 'Unknown' ? v.country : null;
      if (!country) return;
      const pk = getPeriodKey(v.created_date, granularity);
      if (!map[pk]) map[pk] = {};
      map[pk][country] = (map[pk][country] || 0) + 1;
    });
    return map;
  }, [visits, granularity]);

  const allPeriods = useMemo(() => Object.keys(periodCountryMap).sort(), [periodCountryMap]);

  // Top 8 countries overall (rest grouped as "Other")
  const { topCountries, otherCountriesSet } = useMemo(() => {
    const totals = {};
    Object.values(periodCountryMap).forEach(pm => {
      Object.entries(pm).forEach(([c, n]) => { totals[c] = (totals[c] || 0) + n; });
    });
    const sorted = Object.entries(totals).sort((a, b) => b[1] - a[1]);
    const top = sorted.slice(0, 8).map(([c]) => c);
    const others = new Set(sorted.slice(8).map(([c]) => c));
    return { topCountries: top, otherCountriesSet: others };
  }, [periodCountryMap]);

  // Window of periods to display
  const windowPeriods = useMemo(() => {
    const start = Math.max(0, allPeriods.length - config.windowSize - offset);
    const end = Math.max(start, allPeriods.length - offset);
    return allPeriods.slice(start, end);
  }, [allPeriods, offset, config]);

  // Chart data (stacked by country)
  const chartData = useMemo(() => {
    return windowPeriods.map(pk => {
      const row = { period: pk, label: formatPeriodLabel(pk, granularity) };
      topCountries.forEach(c => { row[c] = periodCountryMap[pk]?.[c] || 0; });
      let otherTotal = 0;
      if (periodCountryMap[pk]) {
        Object.entries(periodCountryMap[pk]).forEach(([c, n]) => {
          if (otherCountriesSet.has(c)) otherTotal += n;
        });
      }
      if (otherTotal > 0) row['Other'] = otherTotal;
      return row;
    });
  }, [windowPeriods, topCountries, otherCountriesSet, periodCountryMap, granularity]);

  const chartCountries = [...topCountries, ...(otherCountriesSet.size > 0 ? ['Other'] : [])];

  // Detail for selected (or latest) period
  const effectiveSelected = (selectedPeriod && windowPeriods.includes(selectedPeriod))
    ? selectedPeriod
    : windowPeriods[windowPeriods.length - 1] || null;

  const detailCountries = effectiveSelected && periodCountryMap[effectiveSelected]
    ? Object.entries(periodCountryMap[effectiveSelected])
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
    : [];
  const detailTotal = detailCountries.reduce((s, c) => s + c.value, 0);

  const canGoBack = allPeriods.length - config.windowSize - offset > 0;
  const canGoForward = offset > 0;

  const handleGranularityChange = (g) => {
    setGranularity(g);
    setOffset(0);
    setSelectedPeriod(null);
  };

  const handleBarClick = (data) => {
    if (data?.period) setSelectedPeriod(data.period);
  };

  return (
    <div className="bg-slate-800 border border-teal-500/30 rounded-2xl p-5 space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-teal-300" />
            Visitor countries over time
          </h3>
          <p className="text-xs text-slate-400">
            {effectiveSelected
              ? `${formatPeriodLabel(effectiveSelected, granularity)} — ${detailTotal} visits from ${detailCountries.length} ${detailCountries.length === 1 ? 'country' : 'countries'}`
              : 'No data available'}
          </p>
        </div>

        {/* Granularity toggle */}
        <div className="flex gap-1 bg-slate-900 rounded-lg p-1">
          {GRANULARITIES.map(g => (
            <button
              key={g.key}
              onClick={() => handleGranularityChange(g.key)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                granularity === g.key ? 'bg-teal-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              {g.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => { setOffset(o => o + 1); setSelectedPeriod(null); }}
          disabled={!canGoBack}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" /> Older
        </button>
        <span className="text-xs text-slate-500">
          {windowPeriods.length > 0
            ? `${formatPeriodLabel(windowPeriods[0], granularity)} — ${formatPeriodLabel(windowPeriods[windowPeriods.length - 1], granularity)}`
            : 'No periods'}
        </span>
        <button
          onClick={() => { setOffset(o => Math.max(0, o - 1)); setSelectedPeriod(null); }}
          disabled={!canGoForward}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all bg-slate-700 text-slate-300 hover:bg-slate-600 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          Newer <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Stacked bar chart — click a bar to see its country breakdown */}
      {chartData.length > 0 ? (
        <>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ left: -20, right: 10, top: 4, bottom: 4 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 10 }} interval={0} angle={-25} textAnchor="end" height={60} />
              <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} allowDecimals={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f8fafc', fontSize: 11 }}
                cursor={{ fill: '#33415540' }}
              />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 4 }} />
              {chartCountries.map((c, i) => (
                <Bar
                  key={c}
                  dataKey={c}
                  stackId="countries"
                  fill={COLORS[i % COLORS.length]}
                  onClick={handleBarClick}
                  cursor="pointer"
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-slate-500 text-center">Click any bar to see the country breakdown for that period.</p>
        </>
      ) : (
        <p className="text-slate-500 text-sm text-center py-8">No country data available for this period.</p>
      )}

      {/* Detail table for selected/latest period */}
      {detailCountries.length > 0 && (
        <div className="border-t border-slate-700 pt-4">
          <p className="text-xs text-slate-400 uppercase tracking-widest mb-3">
            Countries — {formatPeriodLabel(effectiveSelected, granularity)}
          </p>
          <div className="space-y-2">
            {(detailExpanded ? detailCountries : detailCountries.slice(0, 3)).map((c, i) => {
              const pct = detailTotal > 0 ? ((c.value / detailTotal) * 100).toFixed(1) : 0;
              const barWidth = detailCountries[0].value > 0 ? (c.value / detailCountries[0].value) * 100 : 0;
              const colorIdx = topCountries.indexOf(c.name);
              const color = colorIdx >= 0 ? COLORS[colorIdx % COLORS.length] : COLORS[8];
              return (
                <div key={c.name} className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-5 shrink-0 text-right">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-semibold text-white truncate">{c.name}</span>
                      <div className="flex items-center gap-3 shrink-0 ml-3">
                        <span className="text-xs text-slate-400">{pct}%</span>
                        <span className="text-sm font-bold" style={{ color }}>{c.value}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-500" style={{ width: `${barWidth}%`, background: color }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {detailCountries.length > 3 && (
            <button
              onClick={() => setDetailExpanded(!detailExpanded)}
              className="mt-3 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors py-2"
            >
              {detailExpanded
                ? <>Show top 3 <ChevronUp className="w-3.5 h-3.5" /></>
                : <>Show all {detailCountries.length} countries <ChevronDown className="w-3.5 h-3.5" /></>}
            </button>
          )}
        </div>
      )}
    </div>
  );
}