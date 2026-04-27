import { useState, useEffect, useMemo } from "react";
import { base44 } from "@/api/base44Client";
import { Badge } from "@/components/ui/badge";
import { Store, Users, BarChart2, ThumbsUp, Mail, Globe, CheckCircle2, Clock } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const RETAILER_PREFIX = "Airport Retailer – ";
const CHART_COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#a855f7", "#ef4444", "#06b6d4", "#ec4899", "#84cc16"];

function isRetailer(r) {
  return r.company_type?.startsWith(RETAILER_PREFIX);
}

function StatCard({ icon: Icon, label, value, color = "text-white" }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 text-center">
      <Icon className={`w-4 h-4 mx-auto mb-2 ${color}`} />
      <p className="text-xs text-slate-400 mb-1">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
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

function PieChartSection({ data }) {
  if (!data.length) return <p className="text-slate-500 text-sm text-center py-4">No data</p>;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <PieChart>
        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={75} label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
          {data.map((_, i) => <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />)}
        </Pie>
        <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f8fafc" }} formatter={(v, n) => [v, n]} />
      </PieChart>
    </ResponsiveContainer>
  );
}

function BarChartSection({ data, color = "#3b82f6" }) {
  if (!data.length) return <p className="text-slate-500 text-sm text-center py-4">No data</p>;
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="name" tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} />
        <Tooltip contentStyle={{ background: "#1e293b", border: "1px solid #334155", borderRadius: 8, color: "#f8fafc" }} />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}

function Legend({ data }) {
  return (
    <div className="space-y-1.5 mt-2">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-2 text-xs text-slate-300">
          <div className="w-3 h-3 rounded-sm shrink-0" style={{ background: CHART_COLORS[i % CHART_COLORS.length] }} />
          <span className="truncate flex-1">{d.name}</span>
          <span className="text-slate-400 shrink-0">{d.value}</span>
        </div>
      ))}
    </div>
  );
}

function ResponseTable({ responses, isRetailerView }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-slate-400 border-b border-slate-700">
            <th className="pb-2 pr-4">Name</th>
            <th className="pb-2 pr-4">Company</th>
            <th className="pb-2 pr-4">{isRetailerView ? "Store type" : "Type"}</th>
            <th className="pb-2 pr-4">Interest</th>
            <th className="pb-2 pr-4">Demo?</th>
            <th className="pb-2">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-700/50">
          {responses.map((r) => (
            <tr key={r.id} className="hover:bg-slate-700/30 transition-colors">
              <td className="py-2.5 pr-4 text-white font-medium">{r.full_name || "—"}</td>
              <td className="py-2.5 pr-4 text-slate-300 text-xs">{r.company_name || "—"}</td>
              <td className="py-2.5 pr-4 text-slate-300 text-xs max-w-[160px] truncate">
                {isRetailerView ? r.company_type?.replace(RETAILER_PREFIX, "") : r.company_type}
              </td>
              <td className="py-2.5 pr-4 text-xs">
                <span className={`px-2 py-0.5 rounded-full ${
                  r.interest_level?.toLowerCase().includes("very") || r.interest_level?.toLowerCase().includes("muy") || r.interest_level?.toLowerCase().includes("sehr") || r.interest_level?.toLowerCase().includes("très") || r.interest_level?.toLowerCase().includes("molto") || r.interest_level?.toLowerCase().includes("zeer")
                    ? "bg-green-500/20 text-green-300"
                    : r.interest_level?.toLowerCase().includes("interested") || r.interest_level?.toLowerCase().includes("interesado") || r.interest_level?.toLowerCase().includes("interessé") || r.interest_level?.toLowerCase().includes("interessato") || r.interest_level?.toLowerCase().includes("geïnteresseerd")
                    ? "bg-blue-500/20 text-blue-300"
                    : "bg-slate-600/40 text-slate-300"
                }`}>
                  {r.interest_level?.split("–")[0]?.trim() || "—"}
                </span>
              </td>
              <td className="py-2.5 pr-4">
                {r.wants_demo
                  ? <CheckCircle2 className="w-4 h-4 text-green-400" />
                  : <span className="text-slate-600">—</span>}
              </td>
              <td className="py-2.5 text-xs text-slate-400">
                {r.created_date ? new Date(r.created_date).toLocaleDateString() : "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function tally(arr, key) {
  const map = {};
  arr.forEach(r => {
    const val = (r[key] || "Unknown").split("–")[0].trim();
    map[val] = (map[val] || 0) + 1;
  });
  return Object.entries(map).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);
}

// ── Retailer Dashboard ─────────────────────────────────────────────────────────
function RetailerDashboard({ responses }) {
  const wantsDemo = responses.filter(r => r.wants_demo).length;
  const storeTypes = tally(responses, "company_type").map(d => ({ ...d, name: d.name.replace(RETAILER_PREFIX, "") }));
  const interest = tally(responses, "interest_level");
  const voucher = tally(responses, "commission_attractive");
  const integration = tally(responses, "snippet_willingness");
  const visitors = tally(responses, "annual_bookings");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Store} label="Total responses" value={responses.length} color="text-orange-300" />
        <StatCard icon={ThumbsUp} label="Wants follow-up" value={wantsDemo} color="text-green-300" />
        <StatCard icon={Mail} label="Follow-up rate" value={responses.length ? `${Math.round((wantsDemo / responses.length) * 100)}%` : "—"} color="text-blue-300" />
        <StatCard icon={Globe} label="Store categories" value={new Set(responses.map(r => r.company_type?.replace(RETAILER_PREFIX, ""))).size} color="text-purple-300" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard title="Store type">
          <PieChartSection data={storeTypes.slice(0, 8)} />
          <Legend data={storeTypes.slice(0, 8)} />
        </ChartCard>
        <ChartCard title="Monthly visitors">
          <BarChartSection data={visitors} color="#f97316" />
        </ChartCard>
        <ChartCard title="Interest level">
          <BarChartSection data={interest} color="#10b981" />
        </ChartCard>
        <ChartCard title="Voucher model attractiveness">
          <BarChartSection data={voucher} color="#a855f7" />
        </ChartCard>
      </div>

      <ChartCard title="All responses">
        <ResponseTable responses={responses} isRetailerView={true} />
      </ChartCard>
    </div>
  );
}

// ── Travel Partner Dashboard ───────────────────────────────────────────────────
function TravelPartnerDashboard({ responses }) {
  const wantsDemo = responses.filter(r => r.wants_demo).length;
  const companyTypes = tally(responses, "company_type");
  const interest = tally(responses, "interest_level");
  const commission = tally(responses, "commission_attractive");
  const snippet = tally(responses, "snippet_willingness");
  const volume = tally(responses, "annual_bookings");

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard icon={Users} label="Total responses" value={responses.length} color="text-green-300" />
        <StatCard icon={ThumbsUp} label="Wants follow-up" value={wantsDemo} color="text-blue-300" />
        <StatCard icon={Mail} label="Follow-up rate" value={responses.length ? `${Math.round((wantsDemo / responses.length) * 100)}%` : "—"} color="text-orange-300" />
        <StatCard icon={Globe} label="Company types" value={new Set(responses.map(r => r.company_type)).size} color="text-purple-300" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <ChartCard title="Company type">
          <PieChartSection data={companyTypes} />
          <Legend data={companyTypes} />
        </ChartCard>
        <ChartCard title="Booking volume">
          <BarChartSection data={volume} color="#3b82f6" />
        </ChartCard>
        <ChartCard title="Interest level">
          <BarChartSection data={interest} color="#10b981" />
        </ChartCard>
        <ChartCard title="Commission model attractiveness">
          <BarChartSection data={commission} color="#a855f7" />
        </ChartCard>
      </div>

      <ChartCard title="All responses">
        <ResponseTable responses={responses} isRetailerView={false} />
      </ChartCard>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function SurveyDashboard() {
  const [activeTab, setActiveTab] = useState("retailer");
  const [allResponses, setAllResponses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.SurveyResponse.list("-created_date", 500).then(data => {
      setAllResponses(data);
      setLoading(false);
    });
  }, []);

  const retailerResponses = useMemo(() =>
    allResponses.filter(r => isRetailer(r)).map(r => ({ ...r, ...r.data, id: r.id, created_date: r.created_date })),
    [allResponses]
  );

  const partnerResponses = useMemo(() =>
    allResponses.filter(r => !isRetailer(r)).map(r => ({ ...r, ...r.data, id: r.id, created_date: r.created_date })),
    [allResponses]
  );

  return (
    <div className="min-h-screen bg-slate-900 text-white px-4 py-10">
      <div className="max-w-5xl mx-auto space-y-8">

        <div className="text-center space-y-2">
          <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs tracking-widest uppercase">
            Survey Analytics
          </Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-white">Survey Dashboard</h1>
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Overview of all survey responses — airport retailers and travel partners.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="flex gap-2 bg-slate-800 border border-slate-700 rounded-2xl p-1.5">
          <button
            onClick={() => setActiveTab("retailer")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "retailer" ? "bg-orange-500 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Store className="w-4 h-4" /> Airport Retailer
            <span className="ml-1 text-xs opacity-70">({retailerResponses.length})</span>
          </button>
          <button
            onClick={() => setActiveTab("partner")}
            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
              activeTab === "partner" ? "bg-green-600 text-white shadow" : "text-slate-400 hover:text-white"
            }`}
          >
            <Users className="w-4 h-4" /> Travel Partner
            <span className="ml-1 text-xs opacity-70">({partnerResponses.length})</span>
          </button>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <div className="w-8 h-8 border-4 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
          </div>
        ) : activeTab === "retailer" ? (
          <RetailerDashboard responses={retailerResponses} />
        ) : (
          <TravelPartnerDashboard responses={partnerResponses} />
        )}

        <p className="text-center text-xs text-slate-600 pb-4">hello@dutyboost.com · www.dutyboost.com</p>
      </div>
    </div>
  );
}