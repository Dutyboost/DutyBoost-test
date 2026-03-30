import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import StatsCard from "../components/StatsCard";
import BookingForm from "../components/BookingForm";
import VoucherCard from "../components/VoucherCard";
import { TicketPercent, Users, CreditCard, Plane } from "lucide-react";

export default function AgencyDashboard() {
  const [vouchers, setVouchers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const loadData = async () => {
    const user = await base44.auth.me();
    const allVouchers = await base44.entities.Voucher.filter({ agency_email: user.email }, '-created_date', 50);
    const allBookings = await base44.entities.Booking.filter({ agency_email: user.email }, '-created_date', 50);
    setVouchers(allVouchers);
    setBookings(allBookings);
  };

  useEffect(() => {
    loadData();
  }, []);

  const activeVouchers = vouchers.filter((v) => v.status === "active").length;
  const totalTravelers = bookings.reduce((sum, b) => sum + (b.number_of_travelers || 0), 0);
  const avgDiscount = vouchers.length
    ? (vouchers.reduce((sum, v) => sum + v.discount_percentage, 0) / vouchers.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Agency Dashboard</h1>
        <p className="text-muted-foreground mt-1">Create bookings and generate DutyCredits — exclusive incentives earned through your booking — for your travelers.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total DutyCredits" value={vouchers.length} icon={TicketPercent} />
        <StatsCard title="Active DutyCredits" value={activeVouchers} icon={CreditCard} />
        <StatsCard title="Total Travelers" value={totalTravelers} icon={Users} />
        <StatsCard title="Avg. Incentive" value={`${avgDiscount}%`} icon={Plane} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="font-heading font-semibold text-lg mb-5">New Booking</h2>
            <BookingForm onVoucherGenerated={loadData} />
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <h2 className="font-heading font-semibold text-lg">Recent DutyCredits</h2>
          {vouchers.length === 0 ? (
            <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
              <TicketPercent className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm">No DutyCredits yet. Create your first booking to earn one!</p>
            </div>
          ) : (
            vouchers.slice(0, 5).map((v) => <VoucherCard key={v.id} voucher={v} compact />)
          )}
        </div>
      </div>
    </div>
  );
}