export default function PaymentMethodSelector({ value, onChange, bankAccountName, bankIban, onBankAccountNameChange, onBankIbanChange }) {
  const methods = [
    {
      id: "creditcard",
      label: "Credit / Debit Card",
      description: "Visa, Mastercard, Amex",
      icon: "💳",
    },
    {
      id: "monthly_invoice",
      label: "Monthly Invoice via Bank Account",
      description: "SEPA Direct Debit with 14-day payment terms",
      icon: "🏦",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {methods.map((method) => (
          <button
            key={method.id}
            type="button"
            onClick={() => onChange(method.id)}
            className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all ${
              value === method.id
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/40"
            }`}
          >
            <span className="text-2xl">{method.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm">{method.label}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{method.description}</p>
            </div>
            <div
              className={`w-4 h-4 rounded-full border-2 shrink-0 ${
                value === method.id
                  ? "border-primary bg-primary"
                  : "border-muted-foreground"
              }`}
            />
          </button>
        ))}
      </div>

      {value === "monthly_invoice" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-4">
          <p className="text-sm text-blue-900">
            <strong>Bank Account Details Required:</strong> Provide your SEPA-enabled bank account for automated monthly invoicing and payment.
          </p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Account Holder Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="John Smith"
                value={bankAccountName}
                onChange={(e) => onBankAccountNameChange(e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2 bg-background text-sm"
                required={value === "monthly_invoice"}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">IBAN <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="NL91 ABNA 0417 1643 00"
                value={bankIban}
                onChange={(e) => onBankIbanChange(e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2 bg-background text-sm"
                required={value === "monthly_invoice"}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}