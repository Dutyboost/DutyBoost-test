const PAYMENT_METHODS = [
  {
    id: "ideal",
    label: "iDEAL",
    description: "Direct bank transfer (NL)",
    icon: "🏦",
    badge: "Most popular in NL",
  },
  {
    id: "wero",
    label: "Wero",
    description: "Instant European payments",
    icon: "⚡",
    badge: null,
  },
  {
    id: "creditcard",
    label: "Credit / Debit Card",
    description: "Visa, Mastercard, Amex",
    icon: "💳",
    badge: null,
  },
  {
    id: "directdebit",
    label: "SEPA Direct Debit",
    description: "Automatic EU bank debit",
    icon: "🔄",
    badge: "Recommended for recurring",
  },
  {
    id: "bancontact",
    label: "Bancontact",
    description: "Belgian bank payments",
    icon: "🇧🇪",
    badge: null,
  },
  {
    id: "sofort",
    label: "SOFORT",
    description: "German / Austrian bank",
    icon: "🇩🇪",
    badge: null,
  },
  {
    id: "paypal",
    label: "PayPal",
    description: "Pay with your PayPal account",
    icon: "🅿️",
    badge: null,
  },
  {
    id: "monthly_invoice",
    label: "Monthly Invoice (Retailers only)",
    description: "Receive a monthly invoice with 14-day payment terms",
    icon: "🧾",
    badge: "Airport Retailers only",
    retailerOnly: true,
  },
];

export default function PaymentMethodSelector({ value, onChange, businessType }) {
  const filteredMethods = PAYMENT_METHODS.filter(m => {
    if (m.retailerOnly && businessType !== 'Airport Retailer') return false;
    return true;
  });

  return (
    <div className="space-y-3">
      {filteredMethods.map((method) => (
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
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm">{method.label}</span>
              {method.badge && (
                <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {method.badge}
                </span>
              )}
            </div>
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
  );
}