import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Car, TrendingUp, DollarSign, Users } from "lucide-react";
import StatsCard from "../components/StatsCard";
import DemoBadge from "../components/DemoBadge";

export default function DemoCarRentalDashboard() {
  const [period, setPeriod] = useState("monthly");

  const rentalData = [
    { month: "Jan", revenue: 5200, rentals: 120 },
    { month: "Feb", revenue: 6100, rentals: 140 },
    { month: "Mar", revenue: 7200, rentals: 165 },
    { month: "Apr", revenue: 8100, rentals: 185 },
    { month: "May", revenue: 9200, rentals: 210 },
    { month: "Jun", revenue: 10100, rentals: 230 },
  ];

  const customerData = [
    { name: "DutyCredit Users", value: 72 },
    { name: "Non-Users", value: 28 },
  ];

  const COLORS = ["#1F6FFF", "#94a3b8"];

  return (
    <div className="space-y-6">
      <DemoBadge large />
      <div>
        <h1 className="text-3xl font-heading font-bold">Car Rental Partner Demo Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track customer rentals and DutyCredit earnings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Rentals" value={1290} icon={Car} />
        <StatsCard title="DutyCredit Users" value={928} icon={Users} />
        <StatsCard title="Total Earnings" value="€46.320" icon={DollarSign} />
        <StatsCard title="Avg. Per Rental" value="€35.89" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">Rental Trends & Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rentalData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#1F6FFF" name="Revenue (€)" />
              <Line type="monotone" dataKey="rentals" stroke="#00C48C" name="Rentals" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">DutyCredit Adoption</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={customerData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                {customerData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Recent Rentals</h2>
        <div className="space-y-2">
          {[
            { customer: "David Brown", vehicle: "BMW X5", dates: "2026-04-20 → 2026-04-27", credit: "€55" },
            { customer: "Laura Martinez", vehicle: "Audi A4", dates: "2026-04-19 → 2026-04-22", credit: "€42" },
            { customer: "James Wilson", vehicle: "Tesla Model 3", dates: "2026-04-18 → 2026-04-25", credit: "€48" },
          ].map((rental, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg text-sm">
              <div>
                <p className="font-medium">{rental.customer}</p>
                <p className="text-xs text-muted-foreground">{rental.vehicle} • {rental.dates}</p>
              </div>
              <span className="font-semibold text-primary">{rental.credit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}