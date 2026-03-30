import { TicketPercent, Clock, MapPin, QrCode } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusColors = {
  active: "bg-green-100 text-green-700 border-green-200",
  redeemed: "bg-blue-100 text-blue-700 border-blue-200",
  expired: "bg-gray-100 text-gray-500 border-gray-200",
};

export default function VoucherCard({ voucher, compact = false }) {
  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all group">
      <div className="relative">
        <div className="bg-gradient-to-r from-primary to-primary/80 px-5 py-4 text-primary-foreground">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TicketPercent className="w-5 h-5" />
              <span className="font-heading font-bold text-lg">{voucher.discount_percentage}% Incentive</span>
            </div>
            <Badge className={`${statusColors[voucher.status]} border text-xs`}>
              {voucher.status}
            </Badge>
          </div>
          <p className="text-sm opacity-90 mt-1 font-mono">{voucher.voucher_code}</p>
        </div>
        {/* Ticket cutout effect */}
        <div className="absolute -left-3 bottom-0 w-6 h-6 bg-background rounded-full translate-y-1/2" />
        <div className="absolute -right-3 bottom-0 w-6 h-6 bg-background rounded-full translate-y-1/2" />
      </div>

      <div className="px-5 py-4 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4" />
          <span>{voucher.airport}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>Expires: {voucher.expiration_date}</span>
        </div>
        {!compact && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <QrCode className="w-4 h-4" />
            <span>Booking: {voucher.booking_id}</span>
          </div>
        )}
      </div>
    </div>
  );
}