import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { calculateDiscount, generateVoucherCode } from "@/lib/discountCalculator";
import { Loader2, Sparkles } from "lucide-react";
import { toast } from "sonner";

export default function BookingForm({ onVoucherGenerated }) {
  const [airports, setAirports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    booking_id: "",
    total_ticket_price: "",
    number_of_travelers: "1",
    travel_type: "Short-haul",
    departure_airport: "",
    travel_date: "",
    traveler_email: "",
  });

  useEffect(() => {
    base44.entities.Airport.list().then(setAirports);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const user = await base44.auth.me();

    const response = await base44.functions.invoke('generateDutyCredit', {
      booking_id: form.booking_id,
      total_ticket_price: parseFloat(form.total_ticket_price),
      number_of_travelers: parseInt(form.number_of_travelers),
      travel_type: form.travel_type,
      departure_airport: form.departure_airport,
      travel_date: form.travel_date,
      traveler_email: form.traveler_email,
      agency_email: user.email,
    });

    setLoading(false);

    if (response.data?.success) {
      toast.success(`DutyCredit generated: ${response.data.discount_percentage}% — sent to ${form.traveler_email}`);
      setForm({
        booking_id: "",
        total_ticket_price: "",
        number_of_travelers: "1",
        travel_type: "Short-haul",
        departure_airport: "",
        travel_date: "",
        traveler_email: "",
      });
      onVoucherGenerated?.(response.data);
    } else {
      toast.error(response.data?.error || 'Failed to generate DutyCredit');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
             <Label>Booking ID</Label>
             <Input
            placeholder="e.g. BK-20240101"
            value={form.booking_id}
            onChange={(e) => setForm({ ...form, booking_id: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Total Ticket Price (EUR)</Label>
          <Input
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 1500"
            value={form.total_ticket_price}
            onChange={(e) => setForm({ ...form, total_ticket_price: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Number of Travelers</Label>
          <Input
            type="number"
            min="1"
            value={form.number_of_travelers}
            onChange={(e) => setForm({ ...form, number_of_travelers: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2">
          <Label>Travel Type</Label>
          <Select
            value={form.travel_type}
            onValueChange={(val) => setForm({ ...form, travel_type: val })}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Short-haul">Short-haul</SelectItem>
              <SelectItem value="Long-haul">Long-haul</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Departure Airport</Label>
          <Select
            value={form.departure_airport}
            onValueChange={(val) => setForm({ ...form, departure_airport: val })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select airport" />
            </SelectTrigger>
            <SelectContent>
              {airports.map((a) => (
                <SelectItem key={a.id} value={`${a.code} - ${a.name}`}>
                  {a.code} — {a.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label>Travel Date</Label>
          <Input
            type="date"
            value={form.travel_date}
            onChange={(e) => setForm({ ...form, travel_date: e.target.value })}
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label>Traveler Email</Label>
          <Input
            type="email"
            placeholder="traveler@example.com"
            value={form.traveler_email}
            onChange={(e) => setForm({ ...form, traveler_email: e.target.value })}
            required
          />
        </div>
      </div>

      {form.total_ticket_price && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Estimated incentive</p>
          <p className="text-3xl font-heading font-bold text-primary">
            {calculateDiscount({
              ticketPrice: parseFloat(form.total_ticket_price) || 0,
              travelers: parseInt(form.number_of_travelers) || 1,
              travelType: form.travel_type,
            })}%
          </p>
        </div>
      )}

      <Button type="submit" disabled={loading} className="w-full gap-2 h-11">
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
        Generate DutyCredit
      </Button>
    </form>
  );
}