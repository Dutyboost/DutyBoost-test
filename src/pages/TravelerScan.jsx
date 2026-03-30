import { useState } from "react";
import { base44 } from "@/api/base44Client";
import QRScanner from "../components/QRScanner";
import QRCodeDisplay from "../components/QRCodeDisplay";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScanLine, Plane, MapPin, Clock, TicketPercent, Loader2, ArrowLeft } from "lucide-react";
import DutyBoostLogo from "../components/DutyBoostLogo";
import { toast } from "sonner";

export default function TravelerScan() {
  const [scanning, setScanning] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [loading, setLoading] = useState(false);
  const [manualCode, setManualCode] = useState("");

  const lookupVoucher = async (code) => {
    setScanning(false);
    setLoading(true);
    const results = await base44.entities.Voucher.filter({ voucher_code: code.trim().toUpperCase() });
    setLoading(false);
    if (results.length === 0) {
      toast.error("Travel Yield not found");
      return;
    }
    setVoucher(results[0]);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="pt-2">
          <DutyBoostLogo height={32} />
        </div>

        {scanning && (
          <QRScanner onScan={lookupVoucher} onClose={() => setScanning(false)} />
        )}

        {!voucher && (
          <div className="space-y-6 pt-4">
            <div>
              <h1 className="text-2xl font-heading font-bold">Find Your Travel Yield</h1>
              <p className="text-muted-foreground mt-1">Scan your Travel Yield QR code or enter the code below.</p>
            </div>

            <Button className="w-full h-14 text-base gap-3" onClick={() => setScanning(true)}>
              <ScanLine className="w-5 h-5" />
              Scan QR Code
            </Button>

            <div className="relative flex items-center gap-3">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted-foreground">or enter code</span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="flex gap-2">
              <Input
                placeholder="DB-XXXXXXXX"
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                className="font-mono"
              />
              <Button onClick={() => lookupVoucher(manualCode)} disabled={!manualCode || loading}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Find"}
              </Button>
            </div>
          </div>
        )}

        {loading && !voucher && (
          <div className="flex items-center gap-3 text-muted-foreground py-6 justify-center">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Looking up Travel Yield...</span>
          </div>
        )}

        {voucher && (
          <div className="space-y-5">
            <Button variant="ghost" size="sm" className="gap-2 -ml-2" onClick={() => setVoucher(null)}>
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg">
              <div className="bg-gradient-to-br from-primary via-primary/90 to-primary/70 p-6 text-center text-primary-foreground relative">
                <p className="text-sm opacity-80 mb-1">Your Discount</p>
                <p className="text-5xl font-heading font-bold">{voucher.discount_percentage}%</p>
                <p className="text-sm opacity-80 mt-1">off at participating stores</p>
                <span className={`absolute top-3 right-3 text-xs px-2 py-1 rounded-full ${
                  voucher.status === 'active' ? 'bg-green-400/30 text-white' : 'bg-white/20 text-white'
                }`}>{voucher.status}</span>
                <div className="absolute -left-4 bottom-0 w-8 h-8 bg-background rounded-full translate-y-1/2" />
                <div className="absolute -right-4 bottom-0 w-8 h-8 bg-background rounded-full translate-y-1/2" />
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-center">
                  <div className="relative">
                    <div className={voucher.status !== 'active' ? "opacity-20 blur-sm pointer-events-none select-none" : ""}>
                      <QRCodeDisplay value={voucher.voucher_code} size={160} />
                    </div>
                    {voucher.status !== 'active' && (
                      <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="bg-white/90 rounded-xl px-4 py-3 text-center shadow">
                          <p className="text-xl">🚫</p>
                          <p className="font-heading font-bold text-sm mt-1">
                            {voucher.status === 'redeemed' ? 'Already Redeemed' : 'Expired'}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5">Not valid</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-center font-mono font-bold tracking-wider">{voucher.voucher_code}</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4" /><span>{voucher.airport}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Clock className="w-4 h-4" /><span>Expires: {voucher.expiration_date}</span>
                  </div>
                </div>
              </div>
            </div>

            <Button className="w-full gap-2" variant="outline" onClick={() => setVoucher(null)}>
              <ScanLine className="w-4 h-4" /> Find Another Travel Yield
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}