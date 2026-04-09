import { useState } from "react";
import { base44 } from "@/api/base44Client";
import QRScanner from "../components/QRScanner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScanLine, CheckCircle2, XCircle, QrCode, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect } from "react";

export default function ScanVoucher() {
  const [scanning, setScanning] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redeemed, setRedeemed] = useState(false);
  const [manualCode, setManualCode] = useState("");
  const [form, setForm] = useState({ retailer_id: "", transaction_value: "", num_items: "1" });

  const calcEffectiveDiscount = (baseDiscount, numItems) => {
    const n = Math.max(1, parseInt(numItems) || 1);
    return Math.max(5, Math.min(25, baseDiscount / n));
  };

  useEffect(() => {
    base44.entities.Retailer.list().then(setRetailers);
  }, []);

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
    setRedeemed(false);
  };

  const handleRedeem = async (e) => {
    e.preventDefault();
    if (!voucher || voucher.status !== "active") return;
    setLoading(true);

    const retailer = retailers.find((r) => r.id === form.retailer_id);
    const txnValue = parseFloat(form.transaction_value);
    const effectiveDiscount = calcEffectiveDiscount(voucher.discount_percentage, form.num_items);
    const discountAmount = (txnValue * effectiveDiscount) / 100;
    const platformRevenue = txnValue * 0.05;

    await base44.entities.Transaction.create({
      voucher_code: voucher.voucher_code,
      retailer_id: form.retailer_id,
      store_name: retailer?.store_name || "Unknown",
      transaction_value: txnValue,
      discount_applied: effectiveDiscount,
      discount_amount: discountAmount,
      platform_revenue: platformRevenue,
      airport: voucher.airport,
    });
    await base44.entities.Voucher.update(voucher.id, { status: "redeemed" });

    setLoading(false);
    setRedeemed(true);
    toast.success(`Travel Yield redeemed! ${effectiveDiscount.toFixed(1)}% discount applied — €${discountAmount.toFixed(2)} saved`);
  };

  const reset = () => {
    setVoucher(null);
    setRedeemed(false);
    setManualCode("");
    setForm({ retailer_id: "", transaction_value: "" });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Scan & Redeem Travel Yield</h1>
        <p className="text-muted-foreground mt-1">Scan a traveler's QR code or enter the code manually.</p>
      </div>

      {scanning && (
        <QRScanner
          onScan={lookupVoucher}
          onClose={() => setScanning(false)}
        />
      )}

      {!voucher && (
        <div className="max-w-md space-y-6">
          <Button
            className="w-full h-14 text-base gap-3"
            onClick={() => setScanning(true)}
          >
            <ScanLine className="w-5 h-5" />
            Open Camera Scanner
          </Button>

          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or enter manually</span>
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
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Look up"}
            </Button>
          </div>
        </div>
      )}

      {loading && !voucher && (
        <div className="flex items-center gap-3 text-muted-foreground">
          <Loader2 className="w-5 h-5 animate-spin" />
          <span>Looking up Travel Yield...</span>
        </div>
      )}

      {voucher && !redeemed && (
        <div className="max-w-md space-y-5">
          {/* Voucher preview */}
          <div className={`rounded-xl border p-5 ${
            voucher.status === "active"
              ? "bg-green-50 border-green-200"
              : "bg-red-50 border-red-200"
          }`}>
            <div className="flex items-center gap-3 mb-3">
              {voucher.status === "active" ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-500" />
              )}
              <div>
                <p className="font-semibold font-mono">{voucher.voucher_code}</p>
                <p className={`text-sm capitalize ${voucher.status === "active" ? "text-green-700" : "text-red-600"}`}>
                  {voucher.status}
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div>
                <p className="text-muted-foreground">Discount</p>
                <p className="font-bold text-2xl text-primary">{voucher.discount_percentage}%</p>
              </div>
              <div>
                <p className="text-muted-foreground">Airport</p>
                <p className="font-medium">{voucher.airport}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Booking</p>
                <p className="font-medium">{voucher.booking_id}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Expires</p>
                <p className="font-medium">{voucher.expiration_date}</p>
              </div>
            </div>
          </div>

          {voucher.status === "active" && (
            <form onSubmit={handleRedeem} className="space-y-4">
              <div className="space-y-2">
                <Label>Store</Label>
                <Select value={form.retailer_id} onValueChange={(v) => setForm({ ...form, retailer_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select your store" /></SelectTrigger>
                  <SelectContent>
                    {retailers.map((r) => (
                      <SelectItem key={r.id} value={r.id}>{r.store_name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Number of Items</Label>
                <Input
                  type="number"
                  min="1"
                  step="1"
                  placeholder="e.g. 3"
                  value={form.num_items}
                  onChange={(e) => setForm({ ...form, num_items: e.target.value })}
                  required
                />
                {voucher && form.num_items && (
                  <p className="text-xs text-muted-foreground">
                    Effective discount per item split: <span className="font-semibold text-primary">{calcEffectiveDiscount(voucher.discount_percentage, form.num_items).toFixed(1)}%</span>
                    <span className="ml-1 text-muted-foreground">(base {voucher.discount_percentage}% ÷ {form.num_items} item{parseInt(form.num_items) !== 1 ? 's' : ''}, capped 5–25%)</span>
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label>Transaction Value (EUR)</Label>
                <Input
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="e.g. 85.00"
                  value={form.transaction_value}
                  onChange={(e) => setForm({ ...form, transaction_value: e.target.value })}
                  required
                />
                {form.transaction_value && (
                  <p className="text-sm text-muted-foreground">
                    Traveler saves: <span className="font-semibold text-green-600">
                      €{((parseFloat(form.transaction_value) * calcEffectiveDiscount(voucher.discount_percentage, form.num_items)) / 100).toFixed(2)}
                    </span>
                    {` (${calcEffectiveDiscount(voucher.discount_percentage, form.num_items).toFixed(1)}% effective rate)`}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Button type="button" variant="outline" className="flex-1" onClick={reset}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={loading || !form.retailer_id || !form.transaction_value}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Redeem Travel Yield"}
                </Button>
              </div>
            </form>
          )}

          {voucher.status !== "active" && (
            <Button variant="outline" className="w-full" onClick={reset}>Scan Another</Button>
          )}
        </div>
      )}

      {redeemed && (
        <div className="max-w-md text-center space-y-4 py-8">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
          <h2 className="text-xl font-heading font-bold">Travel Yield Redeemed!</h2>
          <p className="text-muted-foreground">The transaction has been logged successfully.</p>
          <Button className="w-full gap-2" onClick={reset}>
            <ScanLine className="w-4 h-4" /> Scan Next Travel Yield
          </Button>
        </div>
      )}
    </div>
  );
}