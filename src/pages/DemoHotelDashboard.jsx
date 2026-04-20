import { useState } from "react";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Building2, TrendingUp, DollarSign, Users } from "lucide-react";
import StatsCard from "../components/StatsCard";

export default function DemoHotelDashboard() {
  const [period, setPeriod] = useState("monthly");

  const revenueData = [
    { month: "Jan", revenue: 4200, guests: 420 },
    { month: "Feb", revenue: 5100, guests: 510 },
    { month: "Mar", revenue: 6200, guests: 620 },
    { month: "Apr", revenue: 7100, guests: 710 },
    { month: "May", revenue: 8200, guests: 820 },
    { month: "Jun", revenue: 9100, guests: 910 },
  ];

  const guestData = [
    { name: "DutyCredit Users", value: 65 },
    { name: "Non-Users", value: 35 },
  ];

  const COLORS = ["#1F6FFF", "#94a3b8"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Hotel Partner Demo Dashboard</h1>
        <p className="text-muted-foreground mt-2">Track guest participation and DutyCredit earnings</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Guests" value={5890} icon={Users} />
        <StatsCard title="DutyCredit Participants" value={3827} icon={Building2} />
        <StatsCard title="Total Earnings" value="€14,200" icon={DollarSign} />
        <StatsCard title="Avg. Per Guest" value="€3.71" icon={TrendingUp} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">Guest Growth & Revenue</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))" }} />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#1F6FFF" name="Revenue (€)" />
              <Line type="monotone" dataKey="guests" stroke="#00C48C" name="Guests" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-card rounded-xl border border-border p-6">
          <h2 className="font-heading font-semibold mb-4">DutyCredit Participation</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={guestData} cx="50%" cy="50%" innerRadius={40} outerRadius={80} dataKey="value">
                {guestData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-6">
        <h2 className="font-heading font-semibold mb-4">Recent Guest Bookings</h2>
        <div className="space-y-2">
          {[
            { name: "Sarah Johnson", checkIn: "2026-04-20", checkOut: "2026-04-22", credit: "€45" },
            { name: "Michael Chen", checkIn: "2026-04-19", checkOut: "2026-04-23", credit: "€60" },
            { name: "Emma Williams", checkIn: "2026-04-18", checkOut: "2026-04-21", credit: "€50" },
          ].map((guest, i) => (
            <div key={i} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg text-sm">
              <div>
                <p className="font-medium">{guest.name}</p>
                <p className="text-xs text-muted-foreground">{guest.checkIn} → {guest.checkOut}</p>
              </div>
              <span className="font-semibold text-primary">{guest.credit}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}