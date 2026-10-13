import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Anchor, TrendingUp, DollarSign, Users, MapPin } from "lucide-react";
import StatsCard from "../components/StatsCard";
import CruisePortCallMap from "../components/CruisePortCallMap";

const portData = [
  { port: "Barcelona", country: "Spain", calls: 42, passengers: 118400, redemptions: 2140, revenue: "€182,400" },
  { port: "Civitavecchia (Rome)", country: "Italy", calls: 36, passengers: 98400, redemptions: 1580, revenue: "€134,700" },
  { port: "Naples", country: "Italy", calls: 28, passengers: 76200, redemptions: 1205, revenue: "€101,900" },
  { port: "Dubrovnik", country: "Croatia", calls: 22, passengers: 58900, redemptions: 935, revenue: "€78,600" },
  { port: "Valletta", country: "Malta", calls: 18, passengers: 47600, redemptions: 780, revenue: "€64,200" },
  { port: "Piraeus (Athens)", country: "Greece", calls: 14, passengers: 39200, redemptions: 590, revenue: "€48,300" },
];

const revenueData = [
  { month: "Jan", revenue: 5100, passengers: 510 },
  { month: "Feb", revenue: 6300, passengers: 630 },
  { month: "Mar", revenue: 7800, passengers: 780 },
  { month: "Apr", revenue: 9200, passengers: 920 },
  { month: "May", revenue: 11400, passengers: 1140 },
  { month: "Jun", revenue: 13500, passengers: 1350 },
];

const participationData = [
  { name: "DutyCredit Users", value: 72 },
  { name: "Non-Users", value: 28 },
];

const COLORS = ["#1F6FFF", "#94a3b8"];

const recentPassengers = [
  { name: "Carlos Mendes", ship: "MS Solaris", port: "Barcelona", credit: "€55" },
  { name: "Hana Yoshida", ship: "MS Aurora", port: "Dubrovnik", credit: "€70" },
  { name: "Laura Bianchi", ship: "MS Solaris", port: "Naples", credit: "€45" },
  { name: "James Patel", ship: "MS Nordic Star", port: "Valletta", credit: "€60" },
];

export default function DemoCruiseDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Cruise Line Partner Demo Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track passenger participation and DutyCredit earnings across your fleet</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Passengers" value={7230} icon={Users} />
        <StatsCard title="DutyCredit Participants" value={5206} icon={Anchor} />
        <StatsCard title="Total Earnings" value="€24,800" icon={DollarSign} />
        <StatsCard title="Avg. Per Passenger" value="€4.77" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">Passenger Growth & Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#1F6FFF" name="Revenue (€)" />
              <Line type="monotone" dataKey="passengers" stroke="#00C48C" name="Passengers" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">DutyCredit Participation</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={participationData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                {participationData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-cyan-600" /> Port Call Redemption Map
        </h2>
        <CruisePortCallMap />
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Performance by Port of Call</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs uppercase tracking-wider text-muted-foreground border-b border-border">
                <th className="pb-2 pr-4 font-semibold">Port</th>
                <th className="pb-2 pr-4 font-semibold">Calls</th>
                <th className="pb-2 pr-4 font-semibold">Passengers</th>
                <th className="pb-2 pr-4 font-semibold">Redemptions</th>
                <th className="pb-2 font-semibold">Retail Revenue</th>
              </tr>
            </thead>
            <tbody>
              {portData.map((p) => (
                <tr key={p.port} className="border-b border-border/60 last:border-0">
                  <td className="py-2.5 pr-4">
                    <p className="font-medium">{p.port}</p>
                    <p className="text-xs text-muted-foreground">{p.country}</p>
                  </td>
                  <td className="py-2.5 pr-4">{p.calls}</td>
                  <td className="py-2.5 pr-4">{p.passengers.toLocaleString()}</td>
                  <td className="py-2.5 pr-4">{p.redemptions.toLocaleString()}</td>
                  <td className="py-2.5 font-semibold text-primary">{p.revenue}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Recent Passenger Redemptions</h2>
        <div className="space-y-2">
          {recentPassengers.map((p, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg text-sm">
              <div>
                <p className="font-medium">{p.name}</p>
                <p className="text-xs text-muted-foreground">{p.ship} · Port of {p.port}</p>
              </div>
              <span className="font-semibold text-primary">{p.credit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}