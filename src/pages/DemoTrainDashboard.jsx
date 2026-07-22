import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Train, TrendingUp, DollarSign, Users, MapPin } from "lucide-react";
import StatsCard from "../components/StatsCard";
import DemoBadge from "../components/DemoBadge";
import TrainStationMap from "../components/TrainStationMap";

const routeData = [
  { route: "AMS–PAR", passengers: 1840, redemptions: 192, revenue: 5280 },
  { route: "LON–BRU", passengers: 2100, redemptions: 247, revenue: 6790 },
  { route: "AMS–BRU", passengers: 980, redemptions: 88, revenue: 2420 },
  { route: "PAR–CDG", passengers: 1540, redemptions: 163, revenue: 4480 },
  { route: "FRA–KOL", passengers: 860, redemptions: 74, revenue: 2035 },
];

const monthlyData = [
  { month: "Jan", revenue: 4200, redemptions: 76 },
  { month: "Feb", revenue: 5800, redemptions: 105 },
  { month: "Mar", revenue: 7400, redemptions: 134 },
  { month: "Apr", revenue: 9100, redemptions: 165 },
  { month: "May", revenue: 11600, redemptions: 210 },
  { month: "Jun", revenue: 14200, redemptions: 258 },
];

const recentRedemptions = [
  { name: "Emma Dubois", station: "Paris Gare du Nord", shop: "Relay", amount: "€62" },
  { name: "Lars Eriksson", station: "Amsterdam Centraal", shop: "Starbucks", amount: "€48" },
  { name: "Sophie Williams", station: "London St Pancras", shop: "WHSmith", amount: "€55" },
  { name: "Marco Ferrari", station: "Frankfurt Hbf", shop: "Rituals", amount: "€79" },
];

export default function DemoTrainDashboard() {
  return (
    <div className="space-y-6">
      <DemoBadge />
      <div>
        <h1 className="text-3xl font-heading font-bold">Rail Partner Demo Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track passenger participation and DutyCredit earnings across your route network</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Passengers" value={8320} icon={Users} />
        <StatsCard title="DutyCredit Redemptions" value={764} icon={Train} />
        <StatsCard title="Total Earnings" value="€21,005" icon={DollarSign} />
        <StatsCard title="Conversion Rate" value="9.2%" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">Monthly Revenue & Redemptions</h2>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#6366f1" name="Revenue (€)" />
              <Line type="monotone" dataKey="redemptions" stroke="#00C48C" name="Redemptions" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">Top Routes by Redemptions</h2>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={routeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis type="number" tick={{ fontSize: 10 }} />
              <YAxis dataKey="route" type="category" tick={{ fontSize: 11 }} width={65} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Bar dataKey="redemptions" fill="#6366f1" name="Redemptions" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-indigo-500" /> Station Redemption Map
        </h2>
        <TrainStationMap />
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Recent Passenger Redemptions</h2>
        <div className="space-y-2">
          {recentRedemptions.map((r, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg text-sm">
              <div>
                <p className="font-medium">{r.name}</p>
                <p className="text-xs text-muted-foreground">{r.station} · {r.shop}</p>
              </div>
              <span className="font-semibold text-indigo-600">{r.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}