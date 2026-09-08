import { ShieldCheck, RefreshCw, Lock } from "lucide-react";
import { SlideWrapper, GridBg } from "./Shared";

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

export default function SlideTechnicalIntegration() {
  const request = `POST /v1/dutycredits/redeem
Secure partner authentication

{
  "dutycredit_token": "••••••",
  "transaction_reference": "••••••",
  "store_id": "••••••",
  "basket_amount": 100.00,
  "currency": "USD"
}`;

  const response = `HTTP/1.1 200 OK

{
  "status": "approved",
  "discount_amount": 10.00,
  "amount_due": 90.00,
  "pos_commission": 0.25,
  "currency": "USD"
}`;

  const features = [
    {
      icon: <ShieldCheck className="w-5 h-5 text-blue-300" />,
      title: "Secure authentication",
      desc: "Partner-specific access and encrypted HTTPS communication",
    },
    {
      icon: <RefreshCw className="w-5 h-5 text-blue-300" />,
      title: "Duplicate protection",
      desc: "Idempotent processing prevents accidental double redemption",
    },
    {
      icon: <Lock className="w-5 h-5 text-blue-300" />,
      title: "No PCI burden",
      desc: "DutyBoost never touches card data — it sits beside your payment flow",
    },
  ];

  return (
    <SlideWrapper>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4">
            <span className="text-blue-600 text-sm font-semibold uppercase tracking-widest">Technical POS Integration</span>
            <h2 className="text-xl md:text-3xl font-heading font-bold text-[#0a0f1e] mt-2">
              The Integration, <span className="text-blue-600">In One Call</span>
            </h2>
            <p className="text-slate-500 mt-1.5 text-sm max-w-4xl">
              Validate. Discount. Earn. One Request. One Response. — A single HTTPS call at checkout. DutyBoost validates the DutyCredit, returns the discount to apply, and credits your commission — all attributed and logged automatically.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-white text-[10px] font-bold">1</div>
                <span className="text-blue-700 font-semibold text-sm">POS sends the transaction essentials</span>
              </div>
              <CodeBlock title="illustrative request">
{request}
              </CodeBlock>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-5 h-5 rounded-full bg-green-600 flex items-center justify-center text-white text-[10px] font-bold">2</div>
                <span className="text-green-700 font-semibold text-sm">DutyBoost returns the checkout result</span>
              </div>
              <CodeBlock title="illustrative response">
{response}
              </CodeBlock>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
            {features.map((f) => (
              <div key={f.title} className="bg-slate-50 border border-slate-200 rounded-xl p-4 flex items-start gap-3">
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
    </SlideWrapper>
  );
}