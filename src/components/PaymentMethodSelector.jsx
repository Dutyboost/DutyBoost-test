export default function PaymentMethodSelector({ invoiceEmail, onInvoiceEmailChange }) {
  return (
    <div className="bg-green-50 border border-green-200 rounded-xl p-5 space-y-4">
      <div>
        <p className="text-sm text-green-900 font-semibold mb-1">📄 Monthly Invoice — 14-Day Payment Terms</p>
        <p className="text-sm text-green-800 leading-relaxed">
          At the end of each month, you will receive an invoice by email. You have <strong>14 days</strong> to pay it via your preferred method — bank transfer, card, or any other means. No automatic deductions.
        </p>
      </div>
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-foreground">Invoice Email Address <span className="text-red-500">*</span></label>
        <input
          type="email"
          placeholder="billing@yourcompany.com"
          value={invoiceEmail || ""}
          onChange={(e) => onInvoiceEmailChange && onInvoiceEmailChange(e.target.value)}
          className="w-full border border-input rounded-lg px-3 py-2 bg-background text-sm"
          required
        />
        <p className="text-xs text-green-700">Monthly invoices will be sent to this address.</p>
      </div>
    </div>
  );
}