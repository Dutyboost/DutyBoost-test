import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const COLORS = [
  '#3b82f6', '#f97316', '#22c55e', '#a855f7', '#ec4899',
  '#14b8a6', '#eab308', '#ef4444', '#8b5cf6', '#06b6d4',
];

export default function PagesVisitedCard({
  pages,
  totalVisits,
  uniqueCounts,
  monthLabel,
  pagesPeriod,
  setPagesPeriod,
  hasMore,
}) {
  const [expanded, setExpanded] = useState(false);
  const TOP_N = 5;
  const visiblePages = expanded ? pages : pages.slice(0, TOP_N);

  return (
    <div className="bg-slate-800 border border-teal-500/30 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div>
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5">
            Pages visited on DutyBoost
          </h3>
          <p className="text-xs text-slate-400">
            Which pages visitors land on, ranked by volume.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={pagesPeriod} onValueChange={setPagesPeriod}>
            <SelectTrigger className="w-[140px] bg-slate-900 border-slate-600 text-white text-xs h-8">
              <SelectValue placeholder="Period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Last 24h</SelectItem>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="year">Last 12 months</SelectItem>
            </SelectContent>
          </Select>
          <span className="text-xs px-2 py-1 rounded-full bg-slate-700 text-slate-300">{monthLabel}</span>
        </div>
      </div>
      <div className="space-y-3">
        {visiblePages.map((r, i) => {
          const pct = totalVisits > 0 ? ((r.value / totalVisits) * 100).toFixed(1) : 0;
          const barWidth = pages[0].value > 0 ? (r.value / pages[0].value) * 100 : 0;
          const color = COLORS[i % COLORS.length];
          const uniqueVisitors = uniqueCounts[r.name] || 0;
          return (
            <div key={r.name} className="flex items-center gap-3">
              <span className="text-xs text-slate-500 w-5 shrink-0 text-right">{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-slate-200 truncate">{r.name || '/'}</span>
                  <div className="flex items-center gap-4 shrink-0 ml-3 text-xs">
                    <div className="text-right">
                      <div className="text-slate-400">Visits</div>
                      <div className="text-sm font-bold" style={{ color }}>{r.value}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400">Unique</div>
                      <div className="font-bold text-teal-300">{uniqueVisitors}</div>
                    </div>
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
      {hasMore && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 w-full flex items-center justify-center gap-1.5 text-xs font-semibold text-teal-300 hover:text-teal-200 transition-colors py-2 border-t border-slate-700/50"
        >
          {expanded ? (
            <>Show top 5 <ChevronUp className="w-3.5 h-3.5" /></>
          ) : (
            <>Show all {pages.length} pages <ChevronDown className="w-3.5 h-3.5" /></>
          )}
        </button>
      )}
    </div>
  );
}