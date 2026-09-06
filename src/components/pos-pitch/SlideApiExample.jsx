import { ShieldCheck, RefreshCw, Lock } from "lucide-react";

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

function CodeBlock({ title, children }) {
  return (
    <div className="bg-slate-950/80 border border-white/10 rounded-2xl overflow-hidden flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-white/10 bg-white/5">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
          <div className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
        </div>
        <span className="text-slate-400 text-xs font-mono ml-1">{title}</span>
      </div>
      <pre className="p-3 text-[10px] md:text-[11px] lg:text-xs leading-relaxed text-slate-200 overflow-x-auto font-mono whitespace-pre">{children}</pre>
    </div>
  );
}

export default function SlideApiExample({ currency = "€" }) {
  const request = `POST /v1/dutycredits/redeem
Secure partner authentication

{
  "dutycredit_token": "••••••",
  "transaction_reference": "••••••",
  "store_id": "••••••",
  "basket_amount": 100.00,
  "currency": "${currency === "€" ? "EUR" : "USD"}"
}`;

  const response = `HTTP/1.1 200 OK

{
  "status": "approved",
  "discount_amount": 10.00,
  "amount_due": 90.00,
  "pos_commission": 0.25,
  "currency": "${currency === "€" ? "EUR" : "USD"}"
}`;

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-violet-300" />,
      title: "Secure authentication",
      desc: "Partner-specific access and encrypted HTTPS communication",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-violet-300" />,
      title: "Duplicate protection",
      desc: "Idempotent processing prevents accidental double redemption",
    },
    {
      icon: <Lock className="w-5 h-5 text-violet-300" />,
      title: "No PCI burden",
      desc: "DutyBoost never touches card data — it sits beside your payment flow",
    },
  ];

  return (
    <div className="w-full flex flex-col overflow-y-auto lg:overflow-hidden bg-white text-[#0a0f1e]">
      <div className="flex-1 flex flex-col justify-center px-5 py-4 md:px-10 md:py-5 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-3 lg:mb-4">
            <span className="text-violet-600 text-xs font-semibold uppercase tracking-widest">The Integration, In One Call</span>
            <h2 className="text-lg md:text-2xl lg:text-3xl font-heading font-bold text-[#0a0f1e] mt-1.5">
              Validate. Discount. Earn. <span className="text-violet-600">One Request. One Response.</span>
            </h2>
            <p className="text-slate-500 mt-1.5 text-xs lg:text-sm max-w-4xl">
              A single HTTPS call at checkout. DutyBoost validates the DutyCredit, returns the discount to apply, and credits your commission — all attributed and logged automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4 items-stretch">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-violet-600 flex items-center justify-center text-white text-[10px] font-bold">1</div>
                <span className="text-violet-700 font-semibold text-xs lg:text-sm">POS sends the transaction essentials</span>
              </div>
              <CodeBlock title="illustrative request">
{request}
              </CodeBlock>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">2</div>
                <span className="text-green-700 font-semibold text-xs lg:text-sm">DutyBoost returns the checkout result</span>
              </div>
              <CodeBlock title="illustrative response">
{response}
              </CodeBlock>
            </div>
          </div>

          <div className="mt-3 lg:mt-4 grid grid-cols-1 md:grid-cols-3 gap-2.5">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-xl p-3 lg:p-4 flex items-start gap-3">
                <div className="flex-shrink-0 mt-0.5">{f.icon}</div>
                <div>
                  <div className="text-slate-900 font-semibold text-sm">{f.title}</div>
                  <div className="text-slate-600 text-xs mt-0.5 leading-relaxed">{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}