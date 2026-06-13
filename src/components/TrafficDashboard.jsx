import { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { Globe, TrendingUp, FileText, Clock } from 'lucide-react';

function tally(arr, key, limit = 15) {
  const map = {};
  arr.forEach(r => {
    const val = r[key];
    if (val) map[val] = (map[val] || 0) + 1;
  });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, limit);
}

function StatCard({ icon: Icon, label, value, color, small }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
      <Icon className={`w-4 h-4 mx-auto mb-2 ${color}`} />
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`${small ? 'text-sm break-all' : 'text-2xl'} font-bold ${color}`}>{value}</p>
    </div>
  );
}

function ChartCard({ title, children }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5 space-y-4">
      <h3 className="text-sm font-semibold text-white uppercase tracking-widest">{title}</h3>
      {children}
    </div>
  );
}

const TOOLTIP_STYLE = {
  contentStyle: { background: '#1e293b', border: '1px solid #334155', borderRadius: 8, color: '#f8fafc' }
};

export default function TrafficDashboard() {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.PageVisit.list('-created_date', 2000).then(data => {
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

  const externalVisits = visits.filter(v => v.referrer_domain && v.referrer_domain !== 'internal' && v.referrer_domain !== 'direct');
  const referrers = tally(visits.filter(v => v.referrer_domain), 'referrer_domain');
  const pages = tally(visits, 'page_path');
  const utmSources = tally(visits.filter(v => v.utm_source), 'utm_source');
  const utmCampaigns = tally(visits.filter(v => v.utm_campaign), 'utm_campaign');
  const topReferrer = referrers[0]?.name || '—';
  const uniquePages = new Set(visits.map(v => v.page_path)).size;

  return (
    <div className="space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={TrendingUp} label="Total page views" value={visits.length} color="text-blue-300" />
        <StatCard icon={FileText} label="Unique pages" value={uniquePages} color="text-green-300" />
        <StatCard icon={Globe} label="Unique external referrers" value={new Set(externalVisits.map(v => v.referrer_domain)).size} color="text-purple-300" />
        <StatCard icon={Clock} label="Top referrer" value={topReferrer} color="text-orange-300" small />
      </div>

      {/* Referrer + Pages charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard title="Referrer Domains">
          {referrers.length ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={referrers} layout="vertical" margin={{ left: 10, right: 20, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} width={130} />
                <Tooltip {...TOOLTIP_STYLE} />
                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-500 text-sm text-center py-8">No referrer data yet — data will appear as visitors arrive.</p>
          )}
        </ChartCard>

        <ChartCard title="Top Pages Visited">
          {pages.length ? (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={pages} layout="vertical" margin={{ left: 10, right: 20, top: 4, bottom: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis type="number" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                <YAxis type="category" dataKey="name" tick={{ fill: '#94a3b8', fontSize: 10 }} width={130} />
                <Tooltip {...TOOLTIP_STYLE} />
                <Bar dataKey="value" fill="#10b981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-slate-500 text-sm text-center py-8">No page data yet.</p>
          )}
        </ChartCard>
      </div>

      {/* UTM charts — only show if there's UTM data */}
      {(utmSources.length > 0 || utmCampaigns.length > 0) && (
        <div className="grid md:grid-cols-2 gap-4">
          {utmSources.length > 0 && (
            <ChartCard title="UTM Sources">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={utmSources} margin={{ left: 10, right: 20, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip {...TOOLTIP_STYLE} />
                  <Bar dataKey="value" fill="#a855f7" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
          {utmCampaigns.length > 0 && (
            <ChartCard title="UTM Campaigns">
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={utmCampaigns} margin={{ left: 10, right: 20, top: 4, bottom: 4 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                  <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <YAxis tick={{ fill: '#94a3b8', fontSize: 11 }} />
                  <Tooltip {...TOOLTIP_STYLE} />
                  <Bar dataKey="value" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartCard>
          )}
        </div>
      )}

      {/* Recent visits table */}
      <div className="bg-slate-800 border border-slate-700 rounded-2xl p-5">
        <h3 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">
          Recent Visits <span className="text-slate-500 font-normal normal-case">(last 50)</span>
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-left text-slate-400 border-b border-slate-700">
                <th className="pb-2 pr-4">Page</th>
                <th className="pb-2 pr-4">Referrer</th>
                <th className="pb-2 pr-4">UTM Source</th>
                <th className="pb-2 pr-4">UTM Campaign</th>
                <th className="pb-2">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700/50">
              {visits.slice(0, 50).map(v => (
                <tr key={v.id} className="hover:bg-slate-700/30 transition-colors">
                  <td className="py-2 pr-4 text-white font-medium">{v.page_path || '—'}</td>
                  <td className="py-2 pr-4 text-slate-300">{v.referrer_domain || 'direct'}</td>
                  <td className="py-2 pr-4 text-purple-300">{v.utm_source || '—'}</td>
                  <td className="py-2 pr-4 text-yellow-300">{v.utm_campaign || '—'}</td>
                  <td className="py-2 text-slate-400">
                    {v.created_date ? new Date(v.created_date).toLocaleDateString() : '—'}
                  </td>
                </tr>
              ))}
              {visits.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-slate-500">No visits recorded yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}