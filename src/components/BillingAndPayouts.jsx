import { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Download, AlertCircle, CheckCircle2, Clock, CreditCard, Eye, EyeOff } from "lucide-react";

export default function BillingAndPayouts({ userEmail, isDemo = false, demoData = null }) {
  const [invoices, setInvoices] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [editingPayment, setEditingPayment] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [bankAccountName, setBankAccountName] = useState("");
  const [bankIban, setBankIban] = useState("");
  const [loading, setLoading] = useState(!isDemo);
  const [showCardNumber, setShowCardNumber] = useState(false);

  useEffect(() => {
    if (isDemo && demoData) {
      setInvoices(demoData.invoices || []);
      setPaymentMethod(demoData.paymentMethod || {});
    } else if (userEmail) {
      loadData();
    }
  }, [userEmail, isDemo]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [inv, sig] = await Promise.all([
        base44.entities.MonthlyInvoice.filter({ retailer_email: userEmail }),
        base44.entities.SignupApplication.filter({ email: userEmail }),
      ]);
      setInvoices(inv.sort((a, b) => new Date(b.invoice_date) - new Date(a.invoice_date)));
      if (sig.length > 0) {
        const app = sig[0];
        setPaymentMethod({
          method: app.payment_method,
          cardName: app.card_name,
          cardLast4: app.card_number ? app.card_number.slice(-4) : null,
          bankAccountName: app.bank_account_name,
          bankIban: app.bank_iban,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePayment = async () => {
    if (!cardNumber && !bankIban) return;
    try {
      setLoading(true);
      const sig = await base44.entities.SignupApplication.filter({ email: userEmail });
      if (sig.length > 0) {
        const data = {};
        if (cardNumber) {
          data.card_number = cardNumber;
          data.card_name = cardName;
          data.payment_method = "creditcard";
        }
        if (bankIban) {
          data.bank_account_name = bankAccountName;
          data.bank_iban = bankIban;
          data.payment_method = "monthly_invoice";
        }
        await base44.entities.SignupApplication.update(sig[0].id, data);
        setEditingPayment(false);
        await loadData();
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadInvoice = async (invoice) => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    doc.setFontSize(14);
    doc.text("Invoice", 20, 20);
    doc.setFontSize(10);
    doc.text(`Date: ${invoice.invoice_date}`, 20, 35);
    doc.text(`Amount Due: €${invoice.amount.toFixed(2)}`, 20, 45);
    doc.text(`Status: ${invoice.status}`, 20, 55);
    doc.text(`Period: ${invoice.month_year}`, 20, 65);
    doc.save(`Invoice_${invoice.month_year}.pdf`);
  };

  const outstandingBalance = invoices
    .filter(inv => inv.status === "pending" || inv.status === "overdue")
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === "paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Balance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Outstanding Balance</p>
          <p className="text-3xl font-heading font-bold text-destructive">€{outstandingBalance.toFixed(2)}</p>
          {outstandingBalance > 0 && (
            <p className="text-xs text-muted-foreground">{invoices.filter(i => i.status === "overdue").length} overdue invoices</p>
          )}
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Total Paid</p>
          <p className="text-3xl font-heading font-bold text-emerald-600">€{totalPaid.toFixed(2)}</p>
          <p className="text-xs text-muted-foreground">{invoices.filter(i => i.status === "paid").length} paid invoices</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 space-y-2">
          <p className="text-sm text-muted-foreground font-medium">Payment Method</p>
          <p className="text-sm font-semibold">
            {paymentMethod?.method === "creditcard" ? `Card ••••${paymentMethod.cardLast4}` : paymentMethod?.method === "monthly_invoice" ? "Monthly Invoice" : "Not Set"}
          </p>
          {!editingPayment && (
            <Button variant="outline" size="sm" className="w-full mt-2" onClick={() => setEditingPayment(true)}>
              Update
            </Button>
          )}
        </div>
      </div>

      {/* Update Payment Method */}
      {editingPayment && (
        <div className="bg-card border border-border rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">Update Payment Method</h3>
            <button onClick={() => setEditingPayment(false)} className="text-muted-foreground hover:text-foreground">✕</button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Payment Method</Label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="method" value="creditcard" onChange={() => { setCardNumber(""); setBankIban(""); }} />
                  <span className="text-sm">Credit/Debit Card</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="method" value="monthly_invoice" onChange={() => { setCardNumber(""); setBankIban(""); }} />
                  <span className="text-sm">Monthly Invoice</span>
                </label>
              </div>
            </div>

            {cardNumber !== "" && (
              <>
                <div className="space-y-1.5">
                  <Label>Card Number</Label>
                  <div className="flex gap-2">
                    <Input
                      type={showCardNumber ? "text" : "password"}
                      placeholder="4532 1234 5678 9010"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value.replace(/\s/g, ''))}
                    />
                    <Button variant="outline" size="icon" onClick={() => setShowCardNumber(!showCardNumber)}>
                      {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label>Cardholder Name</Label>
                    <Input placeholder="John Doe" value={cardName} onChange={e => setCardName(e.target.value)} />
                  </div>
                  <div className="space-y-1.5">
                    <Label>Expiry (MM/YY)</Label>
                    <Input placeholder="12/25" value={expiryDate} onChange={e => setExpiryDate(e.target.value)} />
                  </div>
                </div>
              </>
            )}

            {bankIban !== "" && (
              <>
                <div className="space-y-1.5">
                  <Label>Account Holder Name</Label>
                  <Input placeholder="John Doe" value={bankAccountName} onChange={e => setBankAccountName(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>IBAN</Label>
                  <Input placeholder="NL91ABNA0417164300" value={bankIban} onChange={e => setBankIban(e.target.value)} />
                </div>
              </>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setEditingPayment(false)}>Cancel</Button>
              <Button onClick={handleUpdatePayment} disabled={loading || (!cardNumber && !bankIban)}>
                {loading ? "Saving..." : "Save Payment Method"}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Invoice History */}
      <div className="bg-card border border-border rounded-xl p-6 space-y-4">
        <h3 className="font-semibold">Invoice History</h3>
        {invoices.length === 0 ? (
          <p className="text-sm text-muted-foreground py-6 text-center">No invoices yet</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Period</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Amount</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Due Date</th>
                  <th className="text-left py-3 px-3 font-medium text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-3 font-medium text-muted-foreground">Action</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map(inv => (
                  <tr key={inv.id} className="border-b border-border last:border-0 hover:bg-muted/30">
                    <td className="py-3 px-3">{inv.month_year}</td>
                    <td className="py-3 px-3 font-semibold">€{inv.amount.toFixed(2)}</td>
                    <td className="py-3 px-3 text-muted-foreground">{inv.due_date}</td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        {inv.status === "paid" ? (
                          <><CheckCircle2 className="w-4 h-4 text-emerald-600" /> <span className="text-emerald-600 font-medium">Paid</span></>
                        ) : inv.status === "overdue" ? (
                          <><AlertCircle className="w-4 h-4 text-destructive" /> <span className="text-destructive font-medium">Overdue</span></>
                        ) : (
                          <><Clock className="w-4 h-4 text-orange-600" /> <span className="text-orange-600 font-medium">Pending</span></>
                        )}
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        className="gap-1"
                        onClick={() => handleDownloadInvoice(inv)}
                      >
                        <Download className="w-3 h-3" /> Download
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Payment Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-800 space-y-2">
        <p className="font-semibold flex items-center gap-2">
          <CreditCard className="w-4 h-4" /> Payment Information
        </p>
        <ul className="list-disc list-inside space-y-1 text-xs">
          <li>Monthly invoices are generated on the 1st of each month for the previous month's fees</li>
          <li>Payment is due within 14 days of the invoice date</li>
          <li>If payment is not received by day 15, platform access will be suspended</li>
          <li>Update your payment method to ensure timely billing</li>
        </ul>
      </div>
    </div>
  );
}