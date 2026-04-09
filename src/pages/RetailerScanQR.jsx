import { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertCircle, ScanLine, Loader2, ShoppingBag, Receipt } from "lucide-react";
import jsQR from "jsqr";
import { toast } from "sonner";

const PLATFORM_FEE_PCT = 0.05;   // 5% of gross to DutyBoost
const AGENCY_COMMISSION_PCT = 0.02; // 2% of gross to agency (from within the 5%)

function calcEffectiveDiscount(baseDiscount, numItems) {
  const n = Math.max(1, parseInt(numItems) || 1);
  return Math.max(5, Math.min(25, baseDiscount / n));
}

export default function RetailerScanQR() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [scanning, setScanning] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redeemed, setRedeemed] = useState(null); // holds final transaction summary
  const [form, setForm] = useState({ retailer_id: "", num_items: "1", transaction_value: "" });

  // Load this retailer's stores
  useEffect(() => {
    base44.auth.me().then(u =>
      base44.entities.Retailer.filter({ owner_email: u.email }).then(r => {
        setRetailers(r);
        if (r.length === 1) setForm(f => ({ ...f, retailer_id: r[0].id }));
      })
    );
  }, []);

  // Camera start/stop
  useEffect(() => {
    if (!scanning) return;
    let stream;
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } })
      .then(s => { stream = s; if (videoRef.current) videoRef.current.srcObject = s; })
      .catch(() => { toast.error("Camera access denied. Please enable camera permissions."); setScanning(false); });
    return () => stream?.getTracks().forEach(t => t.stop());
  }, [scanning]);

  // QR scanning loop
  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(async () => {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (!canvas || !video || !video.videoWidth) return;
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx.drawImage(video, 0, 0);
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const code = jsQR(imageData.data, imageData.width, imageData.height);
      if (code) {
        setScanning(false);
        await lookupVoucher(code.data);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [scanning]);

  const lookupVoucher = async (raw) => {
    // Extract voucher code: could be a URL like /voucher?code=DB-XXXXX or just the code
    const match = raw.match(/(?:code=)([A-Z0-9-]+)/);
    const code = match ? match[1] : raw.trim().toUpperCase();
    setLoading(true);
    const results = await base44.entities.Voucher.filter({ voucher_code: code });
    setLoading(false);
    if (results.length === 0) { toast.error("No DutyCredit found for this QR code."); return; }
    setVoucher(results[0]);
  };

  const handleRedeem = async (e) => {
    e.preventDefault();
    if (!voucher || voucher.status !== "active") return;
    setLoading(true);

    const retailer = retailers.find(r => r.id === form.retailer_id);
    const txnValue = parseFloat(form.transaction_value);
    const numItems = Math.max(1, parseInt(form.num_items) || 1);
    const effectiveDiscount = calcEffectiveDiscount(voucher.discount_percentage, numItems);
    const discountAmount = parseFloat((txnValue * effectiveDiscount / 100).toFixed(2));
    const platformRevenue = parseFloat((txnValue * PLATFORM_FEE_PCT).toFixed(2));
    const agencyCommission = parseFloat((txnValue * AGENCY_COMMISSION_PCT).toFixed(2));

    await base44.entities.Transaction.create({
      voucher_code: voucher.voucher_code,
      retailer_id: form.retailer_id,
      store_name: retailer?.store_name || "Unknown",
      transaction_value: txnValue,
      num_items: numItems,
      base_discount: voucher.discount_percentage,
      discount_applied: effectiveDiscount,
      discount_amount: discountAmount,
      platform_revenue: platformRevenue,
      agency_commission: agencyCommission,
      agency_email: voucher.agency_email || null,
      airport: voucher.airport,
    });

    await base44.entities.Voucher.update(voucher.id, { status: "redeemed" });

    setLoading(false);
    setRedeemed({
      txnValue,
      numItems,
      effectiveDiscount,
      discountAmount,
      platformRevenue,
      agencyCommission,
      storeName: retailer?.store_name,
      voucherCode: voucher.voucher_code,
    });
  };

  const reset = () => {
    setVoucher(null);
    setRedeemed(null);
    setForm(f => ({ ...f, num_items: "1", transaction_value: "" }));
  };

  const effective = voucher ? calcEffectiveDiscount(voucher.discount_percentage, form.num_items) : 0;
  const previewSaving = form.transaction_value ? parseFloat(((parseFloat(form.transaction_value) * effective) / 100).toFixed(2)) : null;

  // ── Success screen ──────────────────────────────────────────────────
  if (redeemed) {
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        <Card className="bg-green-50 border-green-200 p-6 space-y-5">
          <div className="flex justify-center"><CheckCircle2 className="w-16 h-16 text-green-600" /></div>
          <h2 className="text-2xl font-heading font-bold text-center text-green-900">DutyCredit Redeemed!</h2>
          <div className="bg-white rounded-xl p-4 space-y-2.5 text-sm divide-y divide-border">
            <Row label="Voucher" value={redeemed.voucherCode} mono />
            <Row label="Store" value={redeemed.storeName} />
            <Row label="Items scanned" value={redeemed.numItems} />
            <Row label="Gross transaction" value={`€${redeemed.txnValue.toFixed(2)}`} />
            <Row label={`Base discount`} value={`${voucher?.discount_percentage || "–"}%`} />
            <Row label={`Effective discount (÷${redeemed.numItems} items)`} value={`${redeemed.effectiveDiscount.toFixed(1)}%`} highlight />
            <Row label="Traveler saves" value={`€${redeemed.discountAmount.toFixed(2)}`} green />
            <Row label="DutyBoost fee (5%)" value={`€${redeemed.platformRevenue.toFixed(2)}`} />
            <Row label="Agency commission (2%)" value={`€${redeemed.agencyCommission.toFixed(2)}`} />
          </div>
          <Button onClick={reset} className="w-full bg-green-600 hover:bg-green-700 gap-2">
            <ScanLine className="w-4 h-4" /> Scan Next DutyCredit
          </Button>
        </Card>
      </div>
    );
  }

  // ── Redemption form (after scan) ────────────────────────────────────
  if (voucher) {
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        {/* Voucher status badge */}
        <div className={`rounded-xl border p-4 ${voucher.status === "active" ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
          <div className="flex items-center gap-3">
            {voucher.status === "active"
              ? <CheckCircle2 className="w-6 h-6 text-green-600" />
              : <AlertCircle className="w-6 h-6 text-red-500" />}
            <div>
              <p className="font-mono font-semibold">{voucher.voucher_code}</p>
              <p className={`text-sm capitalize ${voucher.status === "active" ? "text-green-700" : "text-red-600"}`}>{voucher.status}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
            <div><p className="text-muted-foreground text-xs">Base Discount</p><p className="font-bold text-2xl text-primary">{voucher.discount_percentage}%</p></div>
            <div><p className="text-muted-foreground text-xs">Airport</p><p className="font-medium">{voucher.airport}</p></div>
            <div><p className="text-muted-foreground text-xs">Booking</p><p className="font-medium text-xs">{voucher.booking_id}</p></div>
            <div><p className="text-muted-foreground text-xs">Expires</p><p className="font-medium text-xs">{voucher.expiration_date}</p></div>
          </div>
        </div>

        {voucher.status === "active" ? (
          <form onSubmit={handleRedeem} className="space-y-4">
            {/* Store selector — only shown if >1 store */}
            {retailers.length > 1 && (
              <div className="space-y-2">
                <Label>Your Store</Label>
                <Select value={form.retailer_id} onValueChange={v => setForm({ ...form, retailer_id: v })}>
                  <SelectTrigger><SelectValue placeholder="Select store" /></SelectTrigger>
                  <SelectContent>
                    {retailers.map(r => <SelectItem key={r.id} value={r.id}>{r.store_name}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><ShoppingBag className="w-4 h-4" /> Number of Items in Basket</Label>
              <Input type="number" min="1" step="1" placeholder="e.g. 3" value={form.num_items}
                onChange={e => setForm({ ...form, num_items: e.target.value })} required />
              <p className="text-xs text-muted-foreground">
                Effective discount: <span className="font-semibold text-primary">{effective.toFixed(1)}%</span>
                <span className="ml-1">(base {voucher.discount_percentage}% ÷ {form.num_items || 1} item{parseInt(form.num_items) !== 1 ? "s" : ""}, capped 5–25%)</span>
              </p>
            </div>

            <div className="space-y-2">
              <Label className="flex items-center gap-1.5"><Receipt className="w-4 h-4" /> Gross Transaction Value (EUR)</Label>
              <Input type="number" min="50" step="0.01" placeholder="min. €50.00" value={form.transaction_value}
                onChange={e => setForm({ ...form, transaction_value: e.target.value })} required />
              {previewSaving !== null && (
                <div className="bg-primary/5 rounded-lg p-3 text-sm space-y-1">
                  <div className="flex justify-between"><span className="text-muted-foreground">Traveler saves</span><span className="font-semibold text-green-600">€{previewSaving.toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">DutyBoost fee (5%)</span><span className="font-medium">€{(parseFloat(form.transaction_value) * 0.05).toFixed(2)}</span></div>
                  <div className="flex justify-between"><span className="text-muted-foreground">Agency commission (2%)</span><span className="font-medium">€{(parseFloat(form.transaction_value) * 0.02).toFixed(2)}</span></div>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button type="button" variant="outline" className="flex-1" onClick={reset}>Cancel</Button>
              <Button type="submit" className="flex-1" disabled={loading || !form.retailer_id || !form.transaction_value}>
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Confirm Redemption"}
              </Button>
            </div>
          </form>
        ) : (
          <Button variant="outline" className="w-full" onClick={reset}>Scan Another</Button>
        )}
      </div>
    );
  }

  // ── Scanner / lookup screen ─────────────────────────────────────────
  return (
    <div className="max-w-md mx-auto p-4 space-y-4">
      <div className="text-center space-y-1">
        <h1 className="text-2xl font-heading font-bold">Scan DutyCredit</h1>
        <p className="text-muted-foreground text-sm">Point camera at the traveler's QR code or enter the code manually.</p>
      </div>

      {scanning ? (
        <div className="space-y-3">
          <div className="relative bg-black rounded-2xl overflow-hidden aspect-square border-4 border-primary">
            <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
            <canvas ref={canvasRef} className="hidden" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-1/2 h-1/2 border-2 border-primary rounded-lg" />
            </div>
            {loading && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            )}
          </div>
          <Button variant="outline" className="w-full" onClick={() => setScanning(false)}>Cancel</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <Button className="w-full h-14 text-base gap-3" onClick={() => setScanning(true)}>
            <ScanLine className="w-5 h-5" /> Open Camera Scanner
          </Button>
          <div className="relative flex items-center gap-3">
            <div className="flex-1 h-px bg-border" />
            <span className="text-xs text-muted-foreground">or enter code manually</span>
            <div className="flex-1 h-px bg-border" />
          </div>
          <div className="flex gap-2">
            <Input placeholder="DB-XXXXXXXX" className="font-mono"
              onChange={e => e.target.value && e.target.value.length >= 10 && lookupVoucher(e.target.value.toUpperCase())} />
            <Button disabled={loading}>{loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Look up"}</Button>
          </div>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, mono, highlight, green }) {
  return (
    <div className="flex justify-between items-center pt-2 first:pt-0">
      <span className="text-muted-foreground">{label}</span>
      <span className={`font-medium ${mono ? "font-mono text-xs" : ""} ${highlight ? "text-primary font-bold" : ""} ${green ? "text-green-600 font-bold" : ""}`}>
        {value}
      </span>
    </div>
  );
}