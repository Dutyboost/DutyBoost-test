import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { Plane, MapPin, Clock, TicketPercent, Store, ShoppingBag } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { Badge } from "@/components/ui/badge";

export default function TravelerVoucher() {
  const urlParams = new URLSearchParams(window.location.search);
  const voucherCode = urlParams.get("code");

  const [voucher, setVoucher] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!voucherCode) {
      setLoading(false);
      setNotFound(true);
      return;
    }
    async function load() {
      const vouchers = await base44.entities.Voucher.filter({ voucher_code: voucherCode });
      if (vouchers.length === 0) {
        setNotFound(true);
      } else {
        setVoucher(vouchers[0]);
        const rets = await base44.entities.Retailer.filter({ airport: vouchers[0].airport });
        setRetailers(rets.filter(r => r.accepts_vouchers));
      }
      setLoading(false);
    }
    load();
  }, [voucherCode]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <TicketPercent className="w-16 h-16 text-muted-foreground/30 mb-4" />
        <h1 className="text-2xl font-heading font-bold">Travel Yield Not Found</h1>
        <p className="text-muted-foreground mt-2 max-w-sm">
          The Travel Yield code is invalid or has expired. Please check your link and try again.
        </p>
      </div>
    );
  }

  const isExpired = voucher.status === "expired" || new Date(voucher.expiration_date) < new Date();
  const isRedeemed = voucher.status === "redeemed";

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center mb-4">
            <DutyBoostLogo height={36} />
          </div>
          <h1 className="text-3xl font-heading font-bold">Your Travel Yield</h1>
        </div>

        {/* Voucher Card */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
          <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 text-center text-primary-foreground relative">
            <p className="text-sm opacity-80 mb-1">Your Discount</p>
            <p className="text-6xl font-heading font-bold">{voucher.discount_percentage}%</p>
            <p className="text-sm opacity-80 mt-2">off at participating stores</p>

            {(isExpired || isRedeemed) && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-white/20 text-white border-white/30">
                  {isRedeemed ? "Redeemed" : "Expired"}
                </Badge>
              </div>
            )}

            <div className="absolute -left-4 bottom-0 w-8 h-8 bg-background rounded-full translate-y-1/2" />
            <div className="absolute -right-4 bottom-0 w-8 h-8 bg-background rounded-full translate-y-1/2" />
          </div>

          <div className="p-6 space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className={isExpired || isRedeemed ? "opacity-20 blur-sm pointer-events-none select-none" : ""}>
                  <QRCodeDisplay value={voucher.voucher_code} size={180} />
                </div>
                {(isExpired || isRedeemed) && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="bg-white/90 rounded-xl px-5 py-3 text-center shadow">
                      <p className="text-2xl">🚫</p>
                      <p className="font-heading font-bold text-sm mt-1">
                        {isRedeemed ? "Already Redeemed" : "Expired"}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        This Travel Yield is no longer valid
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <p className="text-center font-mono text-lg font-bold tracking-wider">
              {voucher.voucher_code}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>{voucher.airport}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
                <span>Valid until {voucher.expiration_date}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Participating Stores */}
        {retailers.length > 0 && (
          <div>
            <h2 className="font-heading font-semibold text-lg mb-3 flex items-center gap-2">
              <Store className="w-5 h-5" /> Participating Stores
            </h2>
            <div className="space-y-2">
              {retailers.map((r) => (
                <div
                  key={r.id}
                  className="bg-card rounded-xl border border-border p-4 flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                    <ShoppingBag className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{r.store_name}</p>
                    <p className="text-xs text-muted-foreground">{r.category}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground pb-4">
          Show this QR code at the store to redeem your Travel Yield discount.
        </p>
      </div>
    </div>
  );
}