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

import { calcBasketCredit } from "@/lib/discountCalculator";

const PLATFORM_FEE_PCT = 0.025;         // 2.5% of gross to DutyBoost
const AGENCY_COMMISSION_PCT = 0.005;    // 0.5% of gross

export default function RetailerScanQR() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // POS systems can pre-fill basket data via URL params:
  // ?value=200.00&items=3
  // This simulates what happens automatically when a POS integration calls the scan page.
  const urlParams = new URLSearchParams(window.location.search);
  const posValue = urlParams.get('value') || '';
  const posItems = urlParams.get('items') || '1';

  const [scanning, setScanning] = useState(false);
  const [voucher, setVoucher] = useState(null);
  const [retailers, setRetailers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [redeemed, setRedeemed] = useState(null);
  const [form, setForm] = useState({ retailer_id: "", transaction_value: posValue });

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
    const discountAmount = parseFloat(calcBasketCredit(txnValue).toFixed(2));
    const effectiveDiscount = txnValue > 0 ? parseFloat(((discountAmount / txnValue) * 100).toFixed(2)) : 0;
    const platformRevenue = parseFloat((txnValue * PLATFORM_FEE_PCT).toFixed(2));
    const agencyCommission = parseFloat((txnValue * AGENCY_COMMISSION_PCT).toFixed(2));

    await base44.entities.Transaction.create({
      voucher_code: voucher.voucher_code,
      retailer_id: form.retailer_id,
      store_name: retailer?.store_name || "Unknown",
      transaction_value: txnValue,
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

  const previewCredit = form.transaction_value ? calcBasketCredit(parseFloat(form.transaction_value)) : null;

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
            <Row label="Gross transaction" value={`€${redeemed.txnValue.toFixed(2)}`} />
            <Row label="DutyCredit applied" value={`€${redeemed.discountAmount.toFixed(2)}`} highlight />
            <Row label="Traveler saves" value={`€${redeemed.discountAmount.toFixed(2)}`} green />
            <Row label="DutyBoost fee (2.5%)" value={`€${redeemed.platformRevenue.toFixed(2)}`} />
            <Row label="Agency commission (0.5%)" value={`€${redeemed.agencyCommission.toFixed(2)}`} />
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
    const isPosAutoFilled = !!posValue;
    return (
      <div className="max-w-md mx-auto p-4 space-y-4">
        {isPosAutoFilled && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex items-center gap-2 text-xs text-blue-700">
            <span className="font-bold">🔗 POS Connected:</span> Basket value pre-filled automatically from your POS system.
          </div>
        )}
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
              <Label className="flex items-center gap-1.5"><Receipt className="w-4 h-4" /> Gross Transaction Value (EUR)</Label>
              <Input type="number" min="50" step="0.01" placeholder="min. €50.00" value={form.transaction_value}
                onChange={e => setForm({ ...form, transaction_value: e.target.value })} required />
              {previewCredit !== null && (
                parseFloat(form.transaction_value) < 50 ? (
                  <p className="text-sm text-destructive">Minimum basket is €50 to redeem a DutyCredit.</p>
                ) : (
                  <div className="bg-primary/5 rounded-lg p-3 text-sm space-y-1">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        DutyCredit ({parseFloat(form.transaction_value) >= 300 ? "20%" : parseFloat(form.transaction_value) >= 100 ? "10%" : "5%"} of basket, max €25)
                      </span>
                      <span className="font-semibold text-green-600">€{previewCredit.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between"><span className="text-muted-foreground">DutyBoost fee (2.5%)</span><span className="font-medium">€{(parseFloat(form.transaction_value) * 0.025).toFixed(2)}</span></div>
                    <div className="flex justify-between"><span className="text-muted-foreground">Agency commission (0.5%)</span><span className="font-medium">€{(parseFloat(form.transaction_value) * 0.005).toFixed(2)}</span></div>
                  </div>
                )
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