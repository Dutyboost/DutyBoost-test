import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import VoucherCard from "../components/VoucherCard";
import { TicketPercent, AlertCircle } from "lucide-react";

import {
  BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from "recharts";
import NotificationPreferences from "../components/NotificationPreferences";
import AgencyCommissionDownload from "../components/AgencyCommissionDownload";
import { Button } from "@/components/ui/button";


export default function AgencyDashboard() {
  const [vouchers, setVouchers] = useState([]);
  const [user, setUser] = useState(null);

  const loadData = async () => {
    const u = await base44.auth.me();
    setUser(u);
    const allVouchers = await base44.entities.Voucher.filter({ agency_email: u.email }, '-created_date', 50);
    setVouchers(allVouchers);
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeVouchers = vouchers.filter((v) => v.status === "active").length;
  const redeemedVouchers = vouchers.filter((v) => v.status === "redeemed").length;
  const avgIncentive = vouchers.length
    ? (vouchers.reduce((sum, v) => sum + v.discount_percentage, 0) / vouchers.length).toFixed(1)
    : 0;
  const totalPassengers = vouchers.reduce((s, v) => s + (v.traveler_count || 0), 0);
  
  const commissionPerBasket = 0.20;
  const totalForecastRevenue = (totalPassengers * commissionPerBasket).toFixed(2);

  // Vouchers by airport
  const airportMap = {};
  vouchers.forEach(v => {
    const a = v.airport || "Unknown";
    if (!airportMap[a]) airportMap[a] = { airport: a, active: 0, redeemed: 0, expired: 0 };
    airportMap[a][v.status] = (airportMap[a][v.status] || 0) + 1;
  });
  const airportData = Object.values(airportMap).sort((a, b) => (b.active + b.redeemed) - (a.active + a.redeemed));

  // Status pie
  const COLORS = ["#1F6FFF", "#00C48C", "#94a3b8"];
  const pieData = [
    { name: "Active", value: activeVouchers },
    { name: "Redeemed", value: redeemedVouchers },
    { name: "Expired", value: vouchers.filter(v => v.status === "expired").length },
  ].filter(d => d.value > 0);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Agency Dashboard</h1>
        <p className="text-muted-foreground mt-1">Earn commission from airport retail conversions made by travelers who purchased tickets through you.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Passengers" value={totalPassengers} icon={TicketPercent} />
        <StatsCard title="Active DutyCredits" value={activeVouchers} icon={TicketPercent} />
        <StatsCard title="Redeemed" value={redeemedVouchers} icon={TicketPercent} />
        <StatsCard title="Forecast Revenue" value={`€${totalForecastRevenue}`} subtitle={`€${commissionPerBasket} per basket × ${totalPassengers} travelers`} icon={TicketPercent} />
      </div>

      <div className="space-y-4">
        <h2 className="font-heading font-semibold text-lg">Your DutyCredits</h2>
        {vouchers.length === 0 ? (
          <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
            <AlertCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No DutyCredits yet. Once you install the integration script, bookings will automatically generate DutyCredits.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {vouchers.slice(0, 6).map((v) => <VoucherCard key={v.id} voucher={v} />)}
          </div>
        )}
      </div>

      {vouchers.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-semibold mb-4">DutyCredit Status</h2>
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                  {pieData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-semibold mb-4">DutyCredits by Airport</h2>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={airportData} margin={{ top: 4, right: 16, bottom: 4, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="airport" tick={{ fontSize: 10 }} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ background: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: 8, fontSize: 12 }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="active" fill="#1F6FFF" name="Active" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="redeemed" fill="#00C48C" name="Redeemed" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <NotificationPreferences />
      <AgencyCommissionDownload vouchers={vouchers} agencyName={user?.full_name} />
    </div>
  );
}