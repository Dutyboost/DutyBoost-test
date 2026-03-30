import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import VoucherCard from "../components/VoucherCard";
import { TicketPercent, Settings, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";


export default function AgencyDashboard() {
  const [vouchers, setVouchers] = useState([]);

  const loadData = async () => {
    const user = await base44.auth.me();
    const allVouchers = await base44.entities.Voucher.filter({ agency_email: user.email }, '-created_date', 50);
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
  const totalBasketValue = totalPassengers * 20;
  const agencyRevenue = (totalBasketValue * 0.05 * 0.20).toFixed(2);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Agency Dashboard</h1>
        <p className="text-muted-foreground mt-1">Create bookings and generate DutyCredits — exclusive incentives earned through your booking — for your travelers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Passengers" value={totalPassengers} icon={TicketPercent} />
        <StatsCard title="Active DutyCredits" value={activeVouchers} icon={TicketPercent} />
        <StatsCard title="Redeemed" value={redeemedVouchers} icon={TicketPercent} />
        <StatsCard title="Your Revenue (1%)" value={`€${agencyRevenue}`} subtitle="20% of DutyBoost 5% fee" icon={TicketPercent} />
      </div>

      <div className="space-y-8">
        <div className="bg-card rounded-xl border border-border p-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Settings className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-lg mb-2">Automatic Booking Integration</h3>
              <p className="text-muted-foreground mb-4">
                DutyCredits are generated automatically from your booking system. Our integration script collects booking data (price, passenger count, destination) and creates incentives in real-time.
              </p>
              <Button variant="outline" onClick={() => window.location.href = '/integration-guide'}>
                View Integration Setup
              </Button>
            </div>
          </div>
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
      </div>
    </div>
  );
}