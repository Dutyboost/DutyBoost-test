import { useState } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RotateCcw, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const PLATFORM_FEE_PCT = 0.025;
const PLATFORM_FEE_CAP = 25;

// Progressive percentage — mirrors backend calcBasketCredit for live preview
const DISCOUNT_BREAKPOINTS = [
  { spend: 20, pct: 0.05 }, { spend: 50, pct: 0.075 }, { spend: 100, pct: 0.10 },
  { spend: 150, pct: 0.125 }, { spend: 200, pct: 0.15 }, { spend: 250, pct: 0.175 },
  { spend: 300, pct: 0.20 },
];
function calcBasketCredit(basketValue) {
  if (!basketValue || basketValue < 20) return 0;
  if (basketValue >= 300) return Math.round(basketValue * 0.20 * 100) / 100;
  let lower = DISCOUNT_BREAKPOINTS[0], upper = DISCOUNT_BREAKPOINTS[DISCOUNT_BREAKPOINTS.length - 1];
  for (let i = 0; i < DISCOUNT_BREAKPOINTS.length - 1; i++) {
    if (basketValue >= DISCOUNT_BREAKPOINTS[i].spend && basketValue < DISCOUNT_BREAKPOINTS[i + 1].spend) {
      lower = DISCOUNT_BREAKPOINTS[i]; upper = DISCOUNT_BREAKPOINTS[i + 1]; break;
    }
  }
  const t = (basketValue - lower.spend) / (upper.spend - lower.spend);
  const pct = lower.pct + t * (upper.pct - lower.pct);
  return Math.round(basketValue * pct * 100) / 100;
}

export default function PartialRefundManager({ transactions, onRefundProcessed }) {
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [refundInput, setRefundInput] = useState("");
  const [processing, setProcessing] = useState(false);

  const eligibleTransactions = transactions
    .filter(t => t.refund_status !== "full")
    .slice(0, 50);

  const handleOpen = (txn) => {
    setSelectedTxn(txn);
    setRefundInput("");
  };

  const handleClose = () => {
    setSelectedTxn(null);
    setRefundInput("");
  };

  // Live preview calculations
  const refundAmount = parseFloat(refundInput) || 0;
  const originalValue = selectedTxn?.transaction_value || 0;
  const alreadyRefunded = selectedTxn?.refunded_amount || 0;
  const remainingBasket = originalValue - alreadyRefunded;
  const newBasket = Math.max(0, remainingBasket - refundAmount);
  const originalDiscount = selectedTxn?.discount_amount || 0;
  const newDiscount = calcBasketCredit(newBasket);
  const discountAdjustment = originalDiscount - newDiscount;
  const refundDueToTraveler = refundAmount - discountAdjustment;
  const originalCommission = selectedTxn?.platform_revenue || 0;
  const newCommission = newBasket > 1000 ? 0 : Math.min(newBasket * PLATFORM_FEE_PCT, PLATFORM_FEE_CAP);
  const maxRefundable = remainingBasket;

  const handleConfirm = async () => {
    if (!selectedTxn) return;
    if (refundAmount <= 0) {
      toast.error("Refund amount must be greater than 0");
      return;
    }
    if (refundAmount > maxRefundable) {
      toast.error(`Refund cannot exceed €${maxRefundable.toFixed(2)}`);
      return;
    }

    setProcessing(true);
    try {
      const response = await base44.functions.invoke("processPartialRefund", {
        transaction_id: selectedTxn.id,
        refund_amount: refundAmount,
      });
      const result = response.data || response;
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.message || "Partial refund processed successfully");
        handleClose();
        if (onRefundProcessed) onRefundProcessed();
      }
    } catch (err) {
      toast.error(err.message || "Failed to process refund");
    }
    setProcessing(false);
  };

  const fmt = (n) => (n || 0).toLocaleString("nl-NL", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold tracking-tight">Returns & Refunds</h1>
        <p className="text-muted-foreground mt-1">Process partial or full returns. The system automatically recalculates the discount tier and commission for the adjusted basket.</p>
      </div>

      {/* How it works */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-start gap-3">
        <AlertCircle className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-800 space-y-1">
          <p className="font-semibold">How partial refunds work</p>
          <p>When a traveler returns goods, the basket is recalculated to the new value. The discount is adjusted to the correct tier, and the commission is recalculated at 2.5% of the new basket. The traveler is refunded the returned goods minus the discount difference.</p>
          <p className="font-mono text-xs bg-blue-100 rounded px-2 py-1 mt-1">Refund to traveler = Goods returned − (Original discount − New discount)</p>
        </div>
      </div>

      {/* Transactions table */}
      {eligibleTransactions.length === 0 ? (
        <div className="bg-card rounded-xl border border-border p-8 text-center text-muted-foreground">
          <RotateCcw className="w-10 h-10 mx-auto mb-3 opacity-40" />
          <p className="text-sm">No transactions available for refund.</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/30">
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Voucher</th>
                  <th className="text-left py-3 px-4 text-xs text-muted-foreground font-medium">Store</th>
                  <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Basket</th>
                  <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Discount</th>
                  <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Commission</th>
                  <th className="text-center py-3 px-4 text-xs text-muted-foreground font-medium">Refund Status</th>
                  <th className="text-right py-3 px-4 text-xs text-muted-foreground font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {eligibleTransactions.map(t => {
                  const currentBasket = t.adjusted_transaction_value || t.transaction_value;
                  const currentDiscount = t.adjusted_discount_amount ?? t.discount_amount;
                  const currentCommission = t.adjusted_platform_revenue ?? t.platform_revenue;
                  return (
                    <tr key={t.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                      <td className="py-3 px-4 font-mono text-xs">{t.voucher_code}</td>
                      <td className="py-3 px-4">{t.store_name}</td>
                      <td className="py-3 px-4 text-right font-semibold">€{fmt(currentBasket)}</td>
                      <td className="py-3 px-4 text-right text-orange-600">€{fmt(currentDiscount)}</td>
                      <td className="py-3 px-4 text-right text-purple-600">€{fmt(currentCommission)}</td>
                      <td className="py-3 px-4 text-center">
                        {t.refund_status === "partial" ? (
                          <span className="text-xs px-2 py-1 rounded-full bg-amber-100 text-amber-700">Partial</span>
                        ) : (
                          <span className="text-xs px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">None</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button size="sm" variant="outline" onClick={() => handleOpen(t)} className="gap-1.5">
                          <RotateCcw className="w-3.5 h-3.5" /> Refund
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Refund Dialog */}
      <Dialog open={!!selectedTxn} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Process Partial Refund</DialogTitle>
          </DialogHeader>
          {selectedTxn && (
            <div className="space-y-4">
              {/* Original transaction summary */}
              <div className="bg-muted/40 rounded-lg p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Voucher</span>
                  <span className="font-mono font-medium">{selectedTxn.voucher_code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original basket</span>
                  <span className="font-semibold">€{fmt(originalValue)}</span>
                </div>
                {alreadyRefunded > 0 && (
                  <div className="flex justify-between text-amber-600">
                    <span>Already refunded</span>
                    <span className="font-semibold">€{fmt(alreadyRefunded)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Remaining basket</span>
                  <span className="font-semibold">€{fmt(remainingBasket)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Original discount</span>
                  <span className="font-semibold text-orange-600">€{fmt(originalDiscount)}</span>
                </div>
              </div>

              {/* Refund input */}
              <div className="space-y-2">
                <Label>Goods returned value (€)</Label>
                <Input
                  type="number"
                  step="0.01"
                  min="0.01"
                  max={maxRefundable}
                  placeholder="e.g. 100"
                  value={refundInput}
                  onChange={e => setRefundInput(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">Maximum refundable: €{fmt(maxRefundable)}</p>
              </div>

              {/* Live preview */}
              {refundAmount > 0 && refundAmount <= maxRefundable && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2 text-sm">
                  <p className="font-semibold text-blue-800 text-xs uppercase tracking-wide">Recalculation Preview</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground">New basket</p>
                      <p className="font-bold">€{fmt(newBasket)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">New discount</p>
                      <p className="font-bold text-orange-600">€{fmt(newDiscount)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Discount adjustment</p>
                      <p className="font-bold text-rose-600">− €{fmt(discountAdjustment)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">New commission</p>
                      <p className="font-bold text-purple-600">€{fmt(newCommission)}</p>
                    </div>
                  </div>
                  <div className="border-t border-blue-200 pt-2 flex justify-between items-center">
                    <span className="font-semibold text-blue-800">Refund to traveler</span>
                    <span className="text-xl font-bold text-blue-900">€{fmt(refundDueToTraveler)}</span>
                  </div>
                </div>
              )}

              {/* Confirm */}
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="outline" onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm} disabled={processing || refundAmount <= 0 || refundAmount > maxRefundable}>
                  {processing ? "Processing..." : "Confirm Refund"}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}