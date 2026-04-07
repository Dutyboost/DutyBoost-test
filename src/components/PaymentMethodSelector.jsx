export default function PaymentMethodSelector({
  value,
  onChange,
  cardNumber,
  onCardNumberChange,
  cardName,
  onCardNameChange,
  expiryDate,
  onExpiryDateChange,
  cvv,
  onCvvChange,
  bankAccountName,
  onBankAccountNameChange,
  bankIban,
  onBankIbanChange,
}) {
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

      {value === "creditcard" && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-4">
          <p className="text-sm text-blue-900">
            <strong>Card Details:</strong> Enter your credit or debit card information for payment processing.
          </p>
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Card Number <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="4532 1234 5678 9010"
                value={cardNumber}
                onChange={(e) => onCardNumberChange(e.target.value.replace(/\s/g, '').slice(0, 16))}
                maxLength="19"
                className="w-full border border-input rounded-lg px-3 py-2 bg-background text-sm font-mono"
                required={value === "creditcard"}
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Cardholder Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                placeholder="John Smith"
                value={cardName}
                onChange={(e) => onCardNameChange(e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-2 bg-background text-sm"
                required={value === "creditcard"}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Expiry (MM/YY) <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="12/25"
                  value={expiryDate}
                  onChange={(e) => {
                    let val = e.target.value.replace(/\D/g, '').slice(0, 4);
                    if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2);
                    onExpiryDateChange(val);
                  }}
                  maxLength="5"
                  className="w-full border border-input rounded-lg px-3 py-2 bg-background text-sm font-mono"
                  required={value === "creditcard"}
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">CVV <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  placeholder="123"
                  value={cvv}
                  onChange={(e) => onCvvChange(e.target.value.replace(/\D/g, '').slice(0, 4))}
                  maxLength="4"
                  className="w-full border border-input rounded-lg px-3 py-2 bg-background text-sm font-mono"
                  required={value === "creditcard"}
                />
              </div>
            </div>
          </div>
        </div>
      )}

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