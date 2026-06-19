import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import { Globe, TrendingUp, ExternalLink, ArrowUpRight, MapPin, Calendar } from 'lucide-react';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select';

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#a855f7', '#ef4444', '#06b6d4', '#ec4899', '#84cc16', '#f97316', '#64748b'];

function tally(arr, key) {
  const map = {};
  arr.forEach(r => {
    const val = r[key];
    if (val) map[val] = (map[val] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
}

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f8fafc' }
};

const CATEGORY_LABELS = {
  direct: { label: 'Direct / Bookmark', color: 'text-slate-400', bg: 'bg-slate-700/40' },
  internal: { label: 'Internal navigation', color: 'text-slate-500', bg: 'bg-slate-800/60' },
};

function categorizeDomain(domain) {
  if (!domain || domain === 'direct') return 'direct';
  if (domain === 'internal') return 'internal';
  if (/google\.|bing\.|yahoo\.|duckduck/i.test(domain)) return 'search';
  if (/linkedin/i.test(domain)) return 'social';
  if (/facebook|instagram|twitter|tiktok|reddit|youtube/i.test(domain)) return 'social';
  if (/mail\.|gmail|outlook|yahoo\.com/i.test(domain)) return 'email';
  if (/whatsapp/i.test(domain)) return 'messaging';
  return 'referral';
}

const CATEGORY_CONFIG = {
  search:    { label: '🔍 Search Engine', color: '#3b82f6' },
  social:    { label: '💬 Social Media',  color: '#a855f7' },
  email:     { label: '📧 Email',         color: '#10b981' },
  messaging: { label: '💬 Messaging',     color: '#06b6d4' },
  referral:  { label: '🔗 Website Referral', color: '#f59e0b' },
  direct:    { label: '🏠 Direct / Bookmark', color: '#64748b' },
  internal:  { label: '↩️ Internal',      color: '#334155' },
};

export default function TrafficDashboard() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState('all');

  useEffect(() => {
    base44.entities.PageVisit.list('-created_date', 5000).then(data => {
      setVisits(data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
      </div>
    );
  }

  // Strip out all base44 builder / internal visits — only real external traffic
  const realVisits = visits.filter(v =>
    !v.referrer_domain?.includes('base44') &&
    v.referrer_domain !== 'internal'
  );

  // ── Build list of available months from visit data ──
  const monthMap = {};
  realVisits.forEach(v => {
    if (!v.created_date) return;
    const d = new Date(v.created_date);
    const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
    monthMap[key] = (monthMap[key] || 0) + 1;
  });
  const availableMonths = Object.entries(monthMap)
    .map(([key, count]) => {
      const [yr, mo] = key.split('-');
      const label = new Date(parseInt(yr), parseInt(mo) - 1, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      return { key, label, count };
    })
    .sort((a, b) => b.key.localeCompare(a.key));

  // ── Monthly trend data for the chart ──
  const monthlyTrend = [...availableMonths].reverse().map(m => ({
    name: m.label.split(' ')[0].substring(0, 3) + ' ' + m.label.split(' ')[2]?.slice(2),
    fullName: m.label,
    visits: m.count,
  }));

  // ── Filter visits by selected month ──
  const filteredVisits = selectedMonth === 'all'
    ? realVisits
    : realVisits.filter(v => {
        if (!v.created_date) return false;
        const d = new Date(v.created_date);
        const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
        return key === selectedMonth;
      });

  const totalVisits = filteredVisits.length;
  const referrers = tally(filteredVisits.filter(v => v.referrer_domain), 'referrer_domain');

  // External referrers only (exclude direct for the "unique external domains" KPI)
  const externalReferrers = referrers.filter(r => r.name !== 'direct');

  // Category breakdown
  const categoryMap = {};
  filteredVisits.forEach(v => {
    const cat = categorizeDomain(v.referrer_domain);
    categoryMap[cat] = (categoryMap[cat] || 0) + 1;
  });
  const categories = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value, label: CATEGORY_CONFIG[name]?.label || name, color: CATEGORY_CONFIG[name]?.color || '#64748b' }))
    .sort((a, b) => b.value - a.value)
    .filter(c => c.name !== 'internal');

  const utmSources = tally(filteredVisits.filter(v => v.utm_source), 'utm_source');
  const utmCampaigns = tally(filteredVisits.filter(v => v.utm_campaign), 'utm_campaign');
  const countries = tally(filteredVisits.filter(v => v.country && v.country !== 'Unknown'), 'country');

  return (
    <div className="space-y-6">

      {/* Month selector + trend chart */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-0.5 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-300" />
              Time period
            </h3>
            <p className="text-xs text-slate-400">
              {selectedMonth === 'all'
                ? `Showing all-time data — ${realVisits.length} visits`
                : `Showing ${availableMonths.find(m => m.key === selectedMonth)?.label} — ${filteredVisits.length} visits`}
            </p>
          </div>
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-[200px] bg-slate-900 border-slate-600 text-white">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All time</SelectItem>
              {availableMonths.map(m => (
                <SelectItem key={m.key} value={m.key}>
                  {m.label} ({m.count})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Monthly trend bar chart */}
        {monthlyTrend.length > 0 && (
          <div>
            <p className="text-xs text-slate-500 mb-2">Visits per month — click a month above to drill in:</p>
            <ResponsiveContainer width="100%" height={140}>
              <BarChart data={monthlyTrend} margin={{ left: -20, right: 10, top: 4, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} allowDecimals={false} />
                <Tooltip
                  {...TOOLTIP_STYLE}
                  formatter={(v) => [v, 'Visits']}
                  labelFormatter={(l, payload) => payload?.[0]?.payload?.fullName || l}
                />
                <Bar
                  dataKey="visits"
                  fill={selectedMonth === 'all' ? '#3b82f6' : '#10b981'}
                  radius={[4, 4, 0, 0]}
                  cursor={{ fill: '#33415540' }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {/* Summary KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <TrendingUp className="w-4 h-4 mx-auto mb-2 text-blue-300" />
          <p className="text-xs text-slate-400 mb-1">Total visits tracked</p>
          <p className="text-2xl font-bold text-blue-300">{totalVisits}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <Globe className="w-4 h-4 mx-auto mb-2 text-green-300" />
          <p className="text-xs text-slate-400 mb-1">Unique referrer domains</p>
          <p className="text-2xl font-bold text-green-300">{new Set(externalReferrers.filter(r => r.name !== 'direct').map(r => r.name)).size}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <MapPin className="w-4 h-4 mx-auto mb-2 text-teal-300" />
          <p className="text-xs text-slate-400 mb-1">Visitor countries</p>
          <p className="text-2xl font-bold text-teal-300">{countries.length}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <ExternalLink className="w-4 h-4 mx-auto mb-2 text-purple-300" />
          <p className="text-xs text-slate-400 mb-1">External referral visits</p>
          <p className="text-2xl font-bold text-purple-300">{externalReferrers.filter(r => r.name !== 'direct').reduce((s, r) => s + r.value, 0)}</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
          <ArrowUpRight className="w-4 h-4 mx-auto mb-2 text-orange-300" />
          <p className="text-xs text-slate-400 mb-1">Top source</p>
          <p className="text-sm font-bold text-orange-300 break-all">{externalReferrers[0]?.name || '—'}</p>
        </div>
      </div>

      {/* PRIMARY: Referrer domain ranked table */}
      <div className="bg-slate-800 border border-blue-500/30 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-1">
          Where visitors come from
        </h3>
        <p className="text-xs text-slate-400 mb-5">Every domain that sent a visitor to DutyBoost, ranked by volume{selectedMonth !== 'all' ? ` in ${availableMonths.find(m => m.key === selectedMonth)?.label}` : ''}.</p>
        {externalReferrers.length === 0 ? (
          <p className="text-slate-500 text-sm text-center py-8">No referrer data yet — data accumulates as visitors arrive.</p>
        ) : (
          <div className="space-y-2">
            {externalReferrers.map((r, i) => {
              const pct = totalVisits > 0 ? ((r.value / totalVisits) * 100).toFixed(1) : 0;
              const barWidth = totalVisits > 0 ? (r.value / externalReferrers[0].value) * 100 : 0;
              const color = COLORS[i % COLORS.length];
              const cat = categorizeDomain(r.name);
              const catLabel = CATEGORY_CONFIG[cat]?.label || '';
              return (
                <div key={r.name} className="flex items-center gap-3 group">
                  <span className="text-xs text-slate-500 w-5 shrink-0 text-right">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-sm font-semibold text-white truncate">{r.name}</span>
                        <span className="text-xs text-slate-500 shrink-0">{catLabel}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0 ml-3">
                        <span className="text-xs text-slate-400">{pct}%</span>
                        <span className="text-sm font-bold" style={{ color }}>{r.value}</span>
                      </div>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%`, background: color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Countries of visitors */}
      {countries.length > 0 && (
        <div className="bg-slate-800 border border-teal-500/30 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-1">
            <MapPin className="w-4 h-4 inline mr-1.5 text-teal-300" />
            Visitor countries
          </h3>
          <p className="text-xs text-slate-400 mb-5">Geographic origin of visitors, detected from browser timezone.</p>
          <div className="space-y-2">
            {countries.map((c, i) => {
              const pct = totalVisits > 0 ? ((c.value / totalVisits) * 100).toFixed(1) : 0;
              const barWidth = countries[0].value > 0 ? (c.value / countries[0].value) * 100 : 0;
              const color = COLORS[i % COLORS.length];
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
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${barWidth}%`, background: color }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Traffic category breakdown chart */}
      {categories.length > 0 && (
        <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
          <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-1">Traffic by channel</h3>
          <p className="text-xs text-slate-400 mb-4">How visitors are categorised by source type.</p>
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={categories} margin={{ left: 0, right: 10, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="label" tick={{ fill: '#94a3b8', fontSize: 9 }} interval={0} angle={-20} textAnchor="end" height={50} />
                <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <Tooltip {...TOOLTIP_STYLE} />
                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                  {categories.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="space-y-2">
              {categories.map(c => {
                const pct = totalVisits > 0 ? ((c.value / totalVisits) * 100).toFixed(1) : 0;
                return (
                  <div key={c.name} className="flex items-center justify-between text-sm">
                    <span className="text-slate-300">{c.label}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-slate-500 text-xs">{pct}%</span>
                      <span className="font-bold" style={{ color: c.color }}>{c.value}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* UTM tracking — only show if data exists */}
      {(utmSources.length > 0 || utmCampaigns.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4">
          {utmSources.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">UTM Sources</h3>
              <div className="space-y-2">
                {utmSources.map((s, i) => {
                  const pct = totalVisits > 0 ? ((s.value / totalVisits) * 100).toFixed(1) : 0;
                  return (
                    <div key={s.name} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{s.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs">{pct}%</span>
                        <span className="font-bold text-purple-300">{s.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {utmCampaigns.length > 0 && (
            <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">UTM Campaigns</h3>
              <div className="space-y-2">
                {utmCampaigns.map((c, i) => {
                  const pct = totalVisits > 0 ? ((c.value / totalVisits) * 100).toFixed(1) : 0;
                  return (
                    <div key={c.name} className="flex items-center justify-between text-sm">
                      <span className="text-slate-300">{c.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-slate-500 text-xs">{pct}%</span>
                        <span className="font-bold text-yellow-300">{c.value}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Note about UTM */}
      {utmSources.length === 0 && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-5 py-4 text-xs text-slate-400">
          <span className="text-slate-300 font-semibold">Pro tip:</span> Add UTM parameters to links you share (e.g. in emails, LinkedIn, one-pagers) to track specific campaigns:
          <br />
          <code className="text-blue-300 mt-1 block">https://dutyboost.com?utm_source=linkedin&utm_medium=social&utm_campaign=retailer-outreach</code>
        </div>
      )}
    </div>
  );
}