import { useState } from "react";
import { Link } from "react-router-dom";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Plane, TrendingUp, Users, TicketPercent, Euro, ArrowLeft, ChevronRight } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { TRAVEL_AGENCIES, AIRPORTS, AGENCY_MONTHLY } from "../data/demoData";

const COLORS = ["#2563eb", "#f97316", "#10b981", "#8b5cf6", "#ec4899"];

const agencyOptions = TRAVEL_AGENCIES;

export default function DemoAgencyDashboard() {
  const [selectedAgency, setSelectedAgency] = useState(TRAVEL_AGENCIES[0]);

  const conversionRate = ((selectedAgency.redeemed / selectedAgency.travelers) * 100).toFixed(1);
  const pendingEarnings = (selectedAgency.commission * 0.18).toFixed(2);

  const airportDist = AIRPORTS.map((a, i) => ({
    name: a.code,
    value: Math.round(selectedAgency.redeemed * [0.48, 0.15, 0.18, 0.09, 0.10][i]),
  }));

  const recentVouchers = [
    { code: "DC-AMS-4821", traveler: "J. van der Berg", airport: "AMS", date: "2 Apr 2026", status: "Redeemed", amount: "€ 214" },
    { code: "DC-RTM-3102", traveler: "M. Jansen", airport: "RTM", date: "1 Apr 2026", status: "Active", amount: "€ 95" },
    { code: "DC-AMS-4790", traveler: "S. de Vries", airport: "AMS", date: "1 Apr 2026", status: "Redeemed", amount: "€ 340" },
    { code: "DC-EIN-2241", traveler: "P. Bakker", airport: "EIN", date: "31 Mar 2026", status: "Active", amount: "€ 180" },
    { code: "DC-AMS-4755", traveler: "L. Smits", airport: "AMS", date: "30 Mar 2026", status: "Expired", amount: "€ 120" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="bg-card border-b border-border px-6 h-16 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-4">
          <Link to="/demo" className="text-muted-foreground hover:text-foreground flex items-center gap-1 text-sm">
            <ArrowLeft className="w-4 h-4" /> Demo Home
          </Link>
          <span className="text-border">|</span>
          <DutyBoostLogo height={110} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground bg-muted px-3 py-1 rounded-full">Demo — Travel Agency</span>
          <select
            className="text-sm border border-input rounded-lg px-3 py-1.5 bg-background"
            value={selectedAgency.id}
            onChange={e => setSelectedAgency(TRAVEL_AGENCIES.find(a => a.id === e.target.value))}
          >
            {TRAVEL_AGENCIES.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
          </select>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6 md:p-8 space-y-8">
        {/* Welcome */}
        <div>
          <h1 className="text-2xl font-heading font-bold">{selectedAgency.name} — Agency Dashboard</h1>
          <p className="text-muted-foreground text-sm mt-1">Your DutyBoost performance overview · {selectedAgency.city}</p>
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Bookings", value: selectedAgency.bookings.toLocaleString(), icon: Plane, color: "text-blue-500" },
            { label: "DutyCredits Issued", value: selectedAgency.travelers.toLocaleString(), icon: TicketPercent, color: "text-orange-500" },
            { label: "Vouchers Redeemed", value: selectedAgency.redeemed.toLocaleString(), icon: Users, color: "text-emerald-500" },
            { label: "Commission Earned", value: `€ ${selectedAgency.commission.toLocaleString("nl-NL", { minimumFractionDigits: 2 })}`, icon: Euro, color: "text-purple-500" },
          ].map(({ label, value, icon: Icon, color }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground font-medium">{label}</p>
                <Icon className={`w-4 h-4 ${color}`} />
              </div>
              <p className="text-2xl font-heading font-bold">{value}</p>
            </div>
          ))}
        </div>

        {/* Conversion + pending */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Redemption Rate</p>
            <div>
              <p className="text-4xl font-heading font-bold text-primary">{conversionRate}%</p>
              <p className="text-xs text-muted-foreground mt-1">of issued DutyCredits redeemed at airport</p>
            </div>
            <div className="w-full bg-muted rounded-full h-2 mt-3">
              <div className="bg-primary h-2 rounded-full" style={{ width: `${conversionRate}%` }} />
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 flex flex-col justify-between">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Pending Payout</p>
            <div>
              <p className="text-4xl font-heading font-bold text-emerald-600">€ {pendingEarnings}</p>
              <p className="text-xs text-muted-foreground mt-1">Due by 15 Apr 2026</p>
            </div>
            <div className="text-xs text-muted-foreground mt-2 bg-emerald-50 text-emerald-700 rounded-lg p-2">20% of DutyBoost's 5% retailer fee</div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-3">Redemptions by Airport</p>
            <ResponsiveContainer width="100%" height={120}>
              <PieChart>
                <Pie data={airportDist} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={50} label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`} labelLine={false} fontSize={10}>
                  {airportDist.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Monthly chart */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="font-semibold">Monthly Performance</p>
            <p className="text-xs text-muted-foreground">Oct 2025 – Mar 2026</p>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={AGENCY_MONTHLY}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="left" tick={{ fontSize: 12 }} />
              <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} />
              <Tooltip />
              <Bar yAxisId="left" dataKey="bookings" name="Bookings" fill="#dbeafe" radius={[4,4,0,0]} />
              <Bar yAxisId="left" dataKey="redeemed" name="Redeemed" fill="#2563eb" radius={[4,4,0,0]} />
              <Line yAxisId="right" type="monotone" dataKey="earned" name="Earned (€)" stroke="#f97316" strokeWidth={2} dot={{ r: 4 }} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Recent vouchers */}
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <p className="font-semibold">Recent DutyCredit Vouchers</p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Code</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Traveler</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Airport</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Date</th>
                  <th className="text-left py-2 px-3 text-xs text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-2 px-3 text-xs text-muted-foreground font-medium">Sale Value</th>
                </tr>
              </thead>
              <tbody>
                {recentVouchers.map(v => (
                  <tr key={v.code} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-2.5 px-3 font-mono text-xs">{v.code}</td>
                    <td className="py-2.5 px-3">{v.traveler}</td>
                    <td className="py-2.5 px-3 font-semibold text-primary">{v.airport}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{v.date}</td>
                    <td className="py-2.5 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                        v.status === "Redeemed" ? "bg-emerald-100 text-emerald-700" :
                        v.status === "Active" ? "bg-blue-100 text-blue-700" :
                        "bg-muted text-muted-foreground"
                      }`}>{v.status}</span>
                    </td>
                    <td className="py-2.5 px-3 text-right font-medium">{v.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* How it works */}
        <div className="bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 space-y-4">
          <p className="font-semibold font-heading text-lg">How the Revenue Share Works</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {[
              { step: "1", title: "Traveler Books", desc: "Your customer books a flight through your platform." },
              { step: "2", title: "DutyCredit Issued", desc: "DutyBoost automatically issues a voucher to the traveler's email." },
              { step: "3", title: "Traveler Redeems", desc: "At the airport, traveler uses the DutyCredit at a partner retailer." },
              { step: "4", title: "Agency Earns", desc: "DutyBoost collects 5% from the retailer and credits 20% of that to your account monthly." },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{step}</div>
                <div>
                  <p className="font-semibold text-sm">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}