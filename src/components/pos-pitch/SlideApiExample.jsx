import { ArrowRight } from "lucide-react";

function SlideWrapper({ children, dark = false }) {
  return (
    <div className={`w-full flex flex-col overflow-y-auto lg:overflow-hidden ${dark ? "bg-[#0a0f1e] text-white" : "bg-white text-[#0a0f1e]"}`}>
      {children}
    </div>
  );
}

function GridBg() {
  return (
    <div className="absolute inset-0 opacity-5" style={{
      backgroundImage: "linear-gradient(rgba(124,58,237,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.4) 1px, transparent 1px)",
      backgroundSize: "40px 40px"
    }} />
  );
}

function CodeBlock({ title, children, accent = "violet" }) {
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
      <pre className="p-4 text-xs lg:text-sm leading-relaxed text-slate-200 overflow-x-auto font-mono whitespace-pre">{children}</pre>
    </div>
  );
}

export default function SlideApiExample({ currency = "€" }) {
  const endpoint = "https://duty-boost-deals.base44.app/functions/posWebhook";

  const request = `POST ${endpoint}
Host: duty-boost-deals.base44.app
Content-Type: application/json
X-POS-Secret: <your-shared-secret>

{
  "voucher_code": "DBC-7F3A9K2",
  "transaction_value": 100.00,
  "retailer_id": "ret_avolta_001",
  "store_name": "Avolta Duty Free - Schiphol",
  "airport": "AMS",
  "num_items": 3
}`;

  const response = `HTTP/1.1 200 OK
Content-Type: application/json

{
  "success": true,
  "transaction_id": "txn_01HABCD9F2K3M5N7",
  "voucher_code": "DBC-7F3A9K2",
  "gross_value": 100.00,
  "effective_discount_pct": 10.0,
  "discount_amount": 10.00,
  "amount_due": 90.00,
  "platform_fee": 2.50,
  "agency_commission": 0.50,
  "message": "DutyCredit applied. Traveler saves ${currency}10.00."
}`;

  return (
    <SlideWrapper dark>
      <div className="flex-1 flex flex-col justify-center px-5 py-6 md:px-12 md:py-6 relative">
        <GridBg />
        <div className="relative z-10">
          <div className="mb-4 lg:mb-6">
            <span className="text-violet-400 text-sm font-semibold uppercase tracking-widest">The Integration, In One Call</span>
            <h2 className="text-xl md:text-3xl lg:text-4xl font-heading font-bold text-white mt-2">
              Validate. Discount. Earn.<br /><span className="text-violet-400">One Request. One Response.</span>
            </h2>
            <p className="text-slate-400 mt-2 text-sm lg:text-base max-w-4xl">
              A single HTTPS call at checkout. DutyBoost validates the DutyCredit, returns the discount and your POS commission, and logs the transaction. No SDK, no state to manage on your side.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 items-stretch">
            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-violet-600 flex items-center justify-center text-white text-xs font-bold">1</div>
                <span className="text-violet-300 font-semibold text-sm">Request — POS sends basket & voucher</span>
              </div>
              <CodeBlock title="request">
{request}
              </CodeBlock>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center text-white text-xs font-bold">2</div>
                <span className="text-green-300 font-semibold text-sm">Response — DutyBoost returns everything</span>
              </div>
              <CodeBlock title="response" accent="green">
{response}
              </CodeBlock>
            </div>
          </div>

          <div className="mt-4 lg:mt-5 grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { label: "Discount to apply", val: `${currency}10.00`, sub: `Print on receipt — traveler pays ${currency}90.00` },
              { label: "Your POS commission", val: `${currency}0.25`, sub: "10% of the 2.5% platform fee — already attributed" },
              { label: "Latency", val: "< 300 ms", sub: "A single validation call — no batch processing" },
            ].map((s) => (
              <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-3 lg:p-4">
                <div className="text-violet-300 font-bold text-base lg:text-lg">{s.val}</div>
                <div className="text-white text-xs lg:text-sm font-semibold mt-0.5">{s.label}</div>
                <div className="text-slate-400 text-xs mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          <div className="mt-4 lg:mt-5 bg-gradient-to-br from-violet-900/50 to-indigo-900/50 border border-violet-500/30 rounded-2xl p-4 lg:p-5 flex items-center gap-3">
            <ArrowRight className="w-5 h-5 text-violet-300 flex-shrink-0" />
            <p className="text-violet-200 text-sm lg:text-base leading-relaxed">
              That is the entire integration. One endpoint, one shared secret, one JSON response your POS already knows how to read — and every validated sale pays your recurring commission.
            </p>
          </div>
        </div>
      </div>
    </SlideWrapper>
  );
}